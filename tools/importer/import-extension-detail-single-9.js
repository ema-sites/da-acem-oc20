/* eslint-disable */
/* global WebImporter */

import tagListParser from './parsers/tag-list.js';
import productBuyBoxParser from './parsers/product-buy-box.js';
import productDetailsParser from './parsers/product-details.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "extension-detail-single-9",
  "urls": [
    "https://commercemarketplace.adobe.com/extendware-module-repricing.html"
  ],
  "description": "Single product detail page with product title, buy box and details body; page layout could not be captured so it was not grouped with extension-detail",
  "blocks": [
    {
      "name": "tag-list",
      "instances": [
        "#maincontent .column.main > div.breadcrumbs:has(li)"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extendware-module-repricing.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2) > div > div > div:nth-child(3) > div.box",
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2) > div > div > div:nth-child(4) > div.box > div.technical-specs"
        ]
      }
    },
    {
      "name": "product-buy-box",
      "instances": [
        "#maincontent .product-info-details-container > div:nth-child(1)"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extendware-module-repricing.html": [
          "#maincontent .product-info-details-container > div:nth-child(1)"
        ]
      }
    },
    {
      "name": "product-details",
      "instances": [
        "#maincontent .product-info-details-container > div:nth-child(2)"
      ]
    }
  ],
  "sections": [
    {
      "id": "product-summary",
      "name": "Product summary / buy box",
      "selector": [
        "#maincontent .product-info-details-container > div:nth-child(1)"
      ],
      "style": null,
      "blocks": [
        "product-buy-box"
      ],
      "defaultContent": []
    },
    {
      "id": "product-details",
      "name": "Product details",
      "selector": [
        "#maincontent .product-info-details-container > div:nth-child(2)"
      ],
      "style": null,
      "blocks": [
        "product-details"
      ],
      "defaultContent": []
    }
  ],
  "basedOn": "extension-detail",
  "pageCleanup": {
    "https://commercemarketplace.adobe.com/extendware-module-repricing.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ]
  }
};

const parsers = {
  'tag-list': tagListParser,
  'product-buy-box': productBuyBoxParser,
  'product-details': productDetailsParser,
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
