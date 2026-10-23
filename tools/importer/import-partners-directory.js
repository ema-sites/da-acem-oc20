/* eslint-disable */
/* global WebImporter */

import tagListParser from './parsers/tag-list.js';
import facetFilterParser from './parsers/facet-filter.js';
import cardsParser from './parsers/cards.js';
import paginationParser from './parsers/pagination.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "partners-directory",
  "description": "Partner directory: breadcrumb + title, facet sidebar (partner type, certification, solutions type, country), partner card grid, pagination. Added after the preview crawl (not in the source sitemap).",
  "urls": [
    "https://commercemarketplace.adobe.com/partners"
  ],
  "blocks": [
    {
      "name": "tag-list",
      "instances": [
        "#magento-developer-main > div.breadcrumbs:has(li)"
      ]
    },
    {
      "name": "facet-filter",
      "instances": [
        "#magento-developer-main #current-refinements > .facet > div[id^=\"developer-\"]"
      ]
    },
    {
      "name": "cards",
      "instances": [
        "#magento-developer-main #developer-hits-results"
      ]
    },
    {
      "name": "pagination",
      "instances": [
        "#magento-developer-main #partners-controls"
      ]
    }
  ],
  "sections": [
    {
      "id": "listing-header",
      "name": "Breadcrumb and title",
      "selector": [
        "#magento-developer-main > div.breadcrumbs"
      ],
      "style": null,
      "blocks": [
        "tag-list"
      ],
      "defaultContent": [
        "#magento-developer-main .partners-page-title"
      ]
    },
    {
      "id": "listing-sidebar",
      "name": "Filters sidebar",
      "selector": [
        "#magento-developers-left-column"
      ],
      "style": "sidebar",
      "blocks": [
        "facet-filter"
      ],
      "defaultContent": [
        "#current-refinements > .facet > h3"
      ]
    },
    {
      "id": "listing-results",
      "name": "Results",
      "selector": [
        "#magento-developers-right-column"
      ],
      "style": "results",
      "blocks": [
        "cards",
        "pagination"
      ],
      "defaultContent": [
        "#developer-search-stats"
      ]
    }
  ],
  "removeAfterParse": [
    "#developer-instant-search-input"
  ]
};

const parsers = {
  'tag-list': tagListParser,
  'facet-filter': facetFilterParser,
  'cards': cardsParser,
  'pagination': paginationParser,
};
// Section transformers insert <hr> markers, so their beforeTransform runs after block discovery.
const sectionTransformers = [commercemarketplaceSectionsTransformer];
const transformers = [commercemarketplaceCleanupTransformer, ...sectionTransformers];

function executeTransformers(hookName, element, payload, list = transformers) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  list.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template, url) {
  const pageBlocks = [];
  const pageKey = (u) => {
    try { const { origin, pathname } = new URL(u); return `${origin}${pathname.replace(/\/$/, '')}`; }
    catch { return u; }
  };
  const key = pageKey(url);
  const claim = (blockDef, selector) => {
    let matches = [];
    try { matches = document.querySelectorAll(selector); } catch { return; }
    matches.forEach((element) => {
      if (pageBlocks.some((b) => b.element === element || b.element.contains(element) || element.contains(b.element))) return;
      pageBlocks.push({ name: blockDef.name, selector, element });
    });
  };
  template.blocks.forEach((blockDef) => {
    const entry = Object.entries(blockDef.pageInstances || {}).find(([u]) => pageKey(u) === key);
    (entry ? entry[1] : []).forEach((selector) => claim(blockDef, selector));
  });
  template.blocks.forEach((blockDef) => (blockDef.instances || []).forEach((selector) => claim(blockDef, selector)));
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    params.fragments = [];

    executeTransformers('beforeTransform', main, payload, transformers.filter((fn) => !sectionTransformers.includes(fn)));
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE, params.originalURL);
    executeTransformers('beforeTransform', main, payload, sectionTransformers);

    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }, ...params.fragments];
  },
};
