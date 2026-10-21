/* eslint-disable */
/* global WebImporter */

import tagListParser from './parsers/tag-list.js';
import noticeParser from './parsers/notice.js';
import productTitleParser from './parsers/product-title.js';
import activeFilterParser from './parsers/active-filter.js';
import cardsProductParser from './parsers/cards-product.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "seller-profile-single-a",
  "urls": [
    "https://commercemarketplace.adobe.com/i95devconnect-axbase.html"
  ],
  "description": "Single seller profile page with notice, seller header, tabs, about text and product card grid whose layout differs slightly from seller-profile",
  "blocks": [
    {
      "name": "tag-list",
      "instances": [
        "div.page-wrapper > div.breadcrumbs:has(li)"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/i95devconnect-axbase.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs"
        ]
      }
    },
    {
      "name": "notice",
      "instances": [
        "#maincontent > div.page.messages:has(.message)",
        "#maincontent .partner.product-info-details-container > div.product-info-main > div.box-profile",
        "#maincontent .partner.product-info-details-container > div.product-info-main > div.case-specifications"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/i95devconnect-axbase.html": [
          "#maincontent > div.page.messages",
          "#maincontent > div.columns > div > div.partner.product-info-details-container.abs-add-clearfix > div.product-info-main > div.box-profile.box.box--lightgray.text-center",
          "#maincontent > div.columns > div > div.partner.product-info-details-container.abs-add-clearfix > div.product-info-main > div.case-specifications"
        ]
      }
    },
    {
      "name": "product-title",
      "instances": [
        "#maincontent .partner.product-info-details-container > div.product.media"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/i95devconnect-axbase.html": [
          "#maincontent > div.columns > div > div.partner.product-info-details-container.abs-add-clearfix > div.product.media"
        ]
      }
    },
    {
      "name": "active-filter",
      "instances": [
        "#partner\\.products\\.info"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/i95devconnect-axbase.html": [
          "#partner\\.products\\.info"
        ]
      }
    },
    {
      "name": "cards-product",
      "instances": [
        "#instant-search-results-container .products-grid"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/i95devconnect-axbase.html": [
          "#instant-search-results-container .products-grid"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "seller-header",
      "name": "Seller header",
      "selector": [
        "#maincontent > div.page.messages",
        "#maincontent .partner.product-info-details-container > div.product.media"
      ],
      "style": null,
      "blocks": [
        "tag-list",
        "notice",
        "product-title"
      ],
      "defaultContent": [
        "#maincontent .partner.product-info-details-container > div.product-info-main > div:nth-child(1)"
      ]
    },
    {
      "id": "seller-about",
      "name": "About seller",
      "selector": [
        "#maincontent .partner.product-info-details-container .product-data-items > .product-data__item:first-child"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": [
        "#partner\\.biography\\.info",
        "#maincontent .partner.product-info-details-container .product-data-items > .product-data__item:first-child > div.box"
      ]
    },
    {
      "id": "seller-products",
      "name": "All products",
      "selector": [
        "#partner_instant_selector"
      ],
      "style": null,
      "blocks": [
        "active-filter",
        "cards-product"
      ],
      "defaultContent": []
    }
  ],
  "removeAfterParse": [
    ".product-info-nav",
    "#instant-search-results-container .products-loading",
    "#instant-search-results-container .products-error"
  ],
  "pageCleanup": {
    "https://commercemarketplace.adobe.com/i95devconnect-axbase.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ]
  },
  "becomePartner": true
};

const parsers = {
  'tag-list': tagListParser,
  'notice': noticeParser,
  'product-title': productTitleParser,
  'active-filter': activeFilterParser,
  'cards-product': cardsProductParser,
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
