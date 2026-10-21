/* eslint-disable */
/* global WebImporter */

/**
 * Cleanup transformer for commercemarketplace.adobe.com (Magento 2 storefront).
 * Generic across templates (homepage, listing, extension detail, seller profile).
 *
 * beforeTransform (runs BEFORE block matching):
 *   1. Replays payload.template.pageCleanup for the current page (page key matched
 *      like pageInstances: origin + pathname without trailing slash). Each selector is
 *      applied in order and removes its element only when it matches exactly one.
 *   2. Removes elements still matching the catalog cleanup rules outside <main>
 *      (late-loading consent popups / dialogs). Pages not listed in pageCleanup get
 *      only this step from the catalog.
 *   3. Removes site chrome outside <main> (header, after-header search, footer,
 *      OneTrust cookie settings). Header/footer are migrated separately.
 *   Nothing inside <main> is removed here so nth-child parser selectors stay valid.
 *
 * afterTransform (runs AFTER parsers):
 *   Removes non-authorable widgets inside <main>, scripts/styles, and tracking /
 *   framework attributes. HTML comments are never removed (XWalk field hints).
 */

// Mirrors migration-work/catalog-template.json cleanup.rules[]; a template may
// override via payload.template.cleanupRules (array of strings or { rule }).
const CATALOG_CLEANUP_RULES = [
  '[id*="onetrust"]',
  '[role="dialog"]',
];

// Site chrome outside <main>: removed on every template.
const CHROME_SELECTORS = [
  'header.page-header',
  'div.after-header-container',
  'footer.page-footer',
  '#ot-cookie-button',
  '#ot-cookie-settings',
  '.ot-sdk-show-settings',
  'div.cookie-status-message',
  '.page-wrapper > .nav-sections',
  '.page-wrapper > .breadcrumbs',
];

// Non-authorable widgets that may live inside <main>: removed after parsing.
const MAIN_WIDGET_SELECTORS = [
  '#authenticationPopup',
  '.block-authentication',
  '.page.messages',
  '[data-role="checkout-messages"]',
  'a#contentarea',
  '.loading-mask',
  'input[type="hidden"]',
  'input[name="form_key"]',
];

const NON_CONTENT_SELECTORS = [
  'script',
  'style',
  'noscript',
  'link',
  'iframe[src*="googletagmanager"]',
  'iframe[src*="doubleclick"]',
];

const STRIP_ATTRIBUTES = [
  'data-bind',
  'data-mage-init',
  'data-role',
  'data-action',
  'data-placeholder',
  'data-requirecontext',
  'data-requiremodule',
  'onclick',
  'onload',
  'data-gtm',
  'data-track',
  'data-analytics',
];

function pageKey(u) {
  try {
    const { origin, pathname } = new URL(u);
    return `${origin}${pathname.replace(/\/$/, '')}`;
  } catch (e) {
    return u;
  }
}

function getPageUrl(payload) {
  return (payload && payload.params && payload.params.originalURL)
    || (payload && payload.url)
    || (payload && payload.document && payload.document.location && payload.document.location.href)
    || '';
}

function getPageCleanup(template, url) {
  const map = (template && template.pageCleanup) || {};
  const key = pageKey(url);
  const entry = Object.entries(map).find(([u]) => pageKey(u) === key);
  return entry ? entry[1] : null;
}

function getCatalogRules(template) {
  const rules = (template && Array.isArray(template.cleanupRules) && template.cleanupRules.length)
    ? template.cleanupRules
    : CATALOG_CLEANUP_RULES;
  return rules.map((r) => (typeof r === 'string' ? r : r && r.rule)).filter(Boolean);
}

function safeQueryAll(root, selector) {
  try {
    return [...root.querySelectorAll(selector)];
  } catch (e) {
    return [];
  }
}

function findMain(document) {
  return document.querySelector('main') || document.querySelector('#maincontent');
}

function isInsideMain(el, main) {
  return !!main && (main === el || main.contains(el));
}

// Remove matches of selectors that sit outside <main> (and do not contain it).
function removeOutsideMain(document, root, selectors) {
  const main = findMain(document);
  selectors.forEach((selector) => {
    safeQueryAll(root, selector).forEach((el) => {
      if (!el.parentNode) return;
      if (isInsideMain(el, main)) return;
      if (main && el.contains(main)) return;
      el.remove();
    });
  });
}

function replayPageCleanup(root, selectors) {
  selectors.forEach((selector) => {
    const matches = safeQueryAll(root, selector);
    if (matches.length !== 1) return; // skip none or ambiguous
    matches[0].remove();
  });
}

export default function transform(hookName, element, payload) {
  const document = (payload && payload.document) || element.ownerDocument;
  const template = payload && payload.template;

  if (hookName === 'beforeTransform') {
    const pageCleanup = getPageCleanup(template, getPageUrl(payload));
    if (pageCleanup && pageCleanup.length) replayPageCleanup(element, pageCleanup);

    removeOutsideMain(document, element, getCatalogRules(template));
    removeOutsideMain(document, element, CHROME_SELECTORS);
  }

  if (hookName === 'afterTransform') {
    // Late-loading consent popups injected after the first pass.
    removeOutsideMain(document, element, getCatalogRules(template));
    removeOutsideMain(document, element, CHROME_SELECTORS);

    WebImporter.DOMUtils.remove(element, MAIN_WIDGET_SELECTORS);
    WebImporter.DOMUtils.remove(element, NON_CONTENT_SELECTORS);

    element.querySelectorAll('*').forEach((el) => {
      STRIP_ATTRIBUTES.forEach((attr) => el.removeAttribute(attr));
    });

    rewriteInternalLinks(element);
  }
}

// Same-site links become site-relative EDS paths: drop the host and the .html
// extension (pages import to extension-less paths), keep query and hash.
const SITE_HOSTS = ['commercemarketplace.adobe.com', 'marketplace.magento.com'];

function rewriteInternalLinks(element) {
  element.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    let u;
    try { u = new URL(href, 'https://commercemarketplace.adobe.com/'); } catch (e) { return; }
    if (!SITE_HOSTS.includes(u.hostname)) return;
    if (/^\/(media|static|pub)\//.test(u.pathname)) return; // assets stay absolute
    let p = u.pathname.replace(/\.html?$/, '').replace(/\/$/, '');
    if (p === '') p = '/';
    a.setAttribute('href', `${p}${u.search}${u.hash}`);
  });
}
