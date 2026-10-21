/* eslint-disable */
/* global WebImporter */

import carouselPromoParser from './parsers/carousel-promo.js';
import tagListParser from './parsers/tag-list.js';
import cardsPromoParser from './parsers/cards-promo.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "homepage",
  "urls": [
    "https://commercemarketplace.adobe.com/"
  ],
  "description": "Landing page with promo carousel, icon category links row, resource card grid and global footer",
  "blocks": [
    {
      "name": "carousel-promo",
      "instances": [
        "#maincontent > div.widget.block.block-banners"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/": [
          "#maincontent > div.widget.block.block-banners"
        ]
      }
    },
    {
      "name": "tag-list",
      "instances": [
        "#maincontent > div.widget.block.block-static-block .fotorama"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/": [
          "#maincontent > div.widget.block.block-static-block > section > div > div"
        ]
      }
    },
    {
      "name": "cards-promo",
      "instances": [
        "#maincontent > div.columns .col-box"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/": [
          "#maincontent > div.columns > div > div:nth-child(4) > section > div > div > div"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "promo-carousel",
      "name": "Promo carousel",
      "selector": [
        "#maincontent > div.widget.block.block-banners"
      ],
      "style": null,
      "blocks": [
        "carousel-promo"
      ],
      "defaultContent": []
    },
    {
      "id": "featured-categories",
      "name": "Featured categories",
      "selector": [
        "#maincontent > div.widget.block.block-static-block"
      ],
      "style": null,
      "blocks": [
        "tag-list"
      ],
      "defaultContent": [
        "#maincontent > div.widget.block.block-static-block > section > div > h2"
      ]
    },
    {
      "id": "commerce-resources",
      "name": "Adobe Commerce resources",
      "selector": [
        "#maincontent > div.columns"
      ],
      "style": "light-grey",
      "blocks": [
        "cards-promo"
      ],
      "defaultContent": [
        "#maincontent > div.columns > div > div:nth-child(4) > section > div > div > h2"
      ]
    }
  ],
  "pageCleanup": {
    "https://commercemarketplace.adobe.com/": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ]
  }
};

const parsers = {
  'carousel-promo': carouselPromoParser,
  'tag-list': tagListParser,
  'cards-promo': cardsPromoParser,
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
