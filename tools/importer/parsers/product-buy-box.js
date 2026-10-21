/* eslint-disable */
/* global WebImporter */

/**
 * Parser for product-buy-box (extension / theme PDP purchase area).
 *
 * Source: #maincontent .product-info-details-container > div:nth-child(1)
 *   .product.media
 *     .case-box-ov .ico-product img                 -> logo
 *     h1.page-title .base                           -> title
 *     .by-company .case-left-name ("by <a>")        -> vendor
 *     .by-company img[src*="partner-levels"]        -> partner badge
 *     .box-right-reviews [data-bv-show=inline_rating] -> rating "5.0 (1)"
 *     fotorama nav thumbs / stage frames / gallery init JSON / placeholder -> gallery
 *   .product-info-main
 *     select#editions, select#compatible_with, select#support_service -> select rows
 *     #installation_service (visible)               -> "[ ] Installation service" | price
 *     .box-in.vbe                                   -> notice (info)
 *     .product-info-price .price-box (visible)      -> price lines (Product / Installation / Support / Total)
 *     #product-addtocart-button / Buy link, Contact Vendor -> actions row
 *
 * Target (blocks/product-buy-box/product-buy-box.js): one row per part, label | value
 *   | logo | h1 title, "by Vendor" link, partner badge |
 *   | Gallery | images (full size) [+ video links] |
 *   | Edition | list of choices (selected one in <strong>) |
 *   | [ ] Installation service | $100.00 |
 *   | Product | $99.00 |  ...  | Total | $99.00 |
 *   | Add to cart | Contact Vendor |
 *   | 5.0 (1) |
 *   | notice text |
 *
 * Unrendered captures (Magento JS not executed) fall back to the page's own data:
 * gallery/selectService init JSON, product:price meta, and the Technical
 * Specifications compatibility list for store versions.
 *
 * Variant: only `contact-only` is derived from the DOM (no Add to cart / Buy action).
 * The other catalog options only record which parts exist and are rebuilt from content.
 */

const SITE = 'https://commercemarketplace.adobe.com';
const CURRENCY = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' };

const squash = (s) => (s || '').replace(/\s+/g, ' ').trim();
const MONEY_RE = /[$€£¥]\s?\d/;

function abs(url) {
  if (!url) return '';
  try { return new URL(url, SITE).href; } catch (e) { return url; }
}

function isHidden(el, root) {
  let cur = el;
  while (cur && cur.nodeType === 1) {
    const style = (cur.getAttribute('style') || '').replace(/\s+/g, '');
    if (/display:none/i.test(style)) return true;
    if (cur === root) break;
    cur = cur.parentElement;
  }
  return false;
}

function para(document, content) {
  const p = document.createElement('p');
  if (typeof content === 'string') p.textContent = content;
  else if (content) p.append(content);
  return p;
}

function makeImg(document, src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = squash(alt);
  return img;
}

function makeLink(document, href, text) {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = text;
  return a;
}

// Full-size media URL: drop the resize params, keep the image type.
function fullImageUrl(src) {
  const url = abs(src);
  try {
    const u = new URL(url);
    if (!/\/media\/catalog\/product\//.test(u.pathname)) return url;
    u.searchParams.delete('width');
    u.searchParams.delete('height');
    if (u.searchParams.has('image-type')) u.searchParams.set('image-type', 'image');
    return u.href;
  } catch (e) {
    return url;
  }
}

function isPlaceholder(src) {
  return !src || /\/placeholder\/|no_selection|\.gif(\?|$)/i.test(src);
}

function imageKey(src) {
  try { return new URL(abs(src)).pathname; } catch (e) { return src; }
}

// Magento x-magento-init JSON blobs that are still present (unrendered captures).
function initConfigs(element) {
  const configs = [];
  element.querySelectorAll('script').forEach((s) => {
    const t = (s.textContent || '').trim();
    if (!t.startsWith('{')) return;
    try { configs.push(JSON.parse(t)); } catch (e) { /* not JSON */ }
  });
  return configs;
}

function findConfig(configs, moduleName) {
  for (const cfg of configs) {
    for (const target of Object.values(cfg)) {
      if (target && typeof target === 'object' && target[moduleName]) return target[moduleName];
    }
  }
  return null;
}

function formatMoney(amount, symbol) {
  const n = Number(amount);
  if (Number.isNaN(n)) return '';
  const fixed = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${symbol}${fixed}`;
}

function parseAmount(text) {
  const m = (text || '').match(/(\d[\d,]*(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : NaN;
}

function labelCase(text) {
  const t = squash(text).replace(/:\s*$/, '');
  return t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t;
}

function buildHeader(document, media) {
  const logoCell = [];
  const info = [];
  const logo = media.querySelector('.ico-product img, .page-title-wrapper img.product-image-photo');
  const logoSrc = logo && logo.getAttribute('src');
  // wrapped in <p>: the block's header builder detects the logo as an image-only child element
  if (logoSrc && !isPlaceholder(logoSrc)) logoCell.push(para(document, makeImg(document, fullImageUrl(logoSrc), logo.getAttribute('alt'))));

  const titleEl = media.querySelector('h1.page-title .base, h1.page-title, h1');
  const title = squash(titleEl && titleEl.textContent);
  if (title) {
    const h1 = document.createElement('h1');
    h1.textContent = title;
    info.push(h1);
  }

  const vendorWrap = media.querySelector('.by-company .case-left-name, .by-company');
  const vendorLink = vendorWrap && vendorWrap.querySelector('a[href]');
  if (vendorLink) {
    const p = document.createElement('p');
    p.append('by ', makeLink(document, abs(vendorLink.getAttribute('href')), squash(vendorLink.textContent)));
    info.push(p);
  } else if (vendorWrap && squash(vendorWrap.textContent)) {
    info.push(para(document, squash(vendorWrap.textContent)));
  }

  media.querySelectorAll('.by-company img').forEach((badge) => {
    const src = badge.getAttribute('src');
    if (!src || isPlaceholder(src)) return;
    info.push(para(document, makeImg(document, abs(src), badge.getAttribute('alt'))));
  });

  if (!info.length && !logoCell.length) return null;
  return logoCell.length ? [logoCell, info] : [info, ''];
}

function collectGallery(document, media, configs) {
  const images = [];
  const seen = new Set();
  const add = (src, alt) => {
    if (isPlaceholder(src)) return;
    const full = fullImageUrl(src);
    const key = imageKey(full);
    if (seen.has(key)) return;
    seen.add(key);
    images.push(makeImg(document, full, alt));
  };
  const videos = [];
  const addVideo = (href) => { if (href && !videos.includes(href)) videos.push(href); };

  // 1. Rendered fotorama: the thumbnail nav lists every item; the stage may be partial.
  media.querySelectorAll('.fotorama__nav__frame img').forEach((img) => add(img.getAttribute('src'), img.getAttribute('alt')));
  if (!images.length) {
    media.querySelectorAll('.fotorama__stage__frame').forEach((frame) => {
      const img = frame.querySelector('img');
      add((img && img.getAttribute('src')) || frame.getAttribute('href'), img && img.getAttribute('alt'));
    });
  }
  media.querySelectorAll('.product-video[data-code]').forEach((v) => {
    const code = v.getAttribute('data-code');
    const type = (v.getAttribute('data-type') || '').toLowerCase();
    if (type === 'vimeo') addVideo(`https://vimeo.com/${code}`);
    else addVideo(`https://www.youtube.com/watch?v=${code}`);
  });

  // 2. Unrendered: gallery init JSON.
  const gallery = findConfig(configs, 'mage/gallery/gallery');
  if (gallery && Array.isArray(gallery.data)) {
    if (!images.length) gallery.data.forEach((item) => add(item.full || item.img || item.thumb, item.caption));
    gallery.data.forEach((item) => { if (item.videoUrl) addVideo(item.videoUrl); });
  }

  // 3. Placeholder main image (first gallery image).
  if (!images.length) {
    const ph = media.querySelector('.gallery-placeholder__image, .gallery-placeholder img');
    if (ph) add(ph.getAttribute('src'), ph.getAttribute('alt') === 'main product photo' ? '' : ph.getAttribute('alt'));
  }

  if (!images.length) return null;
  const cell = [...images];
  videos.forEach((href) => cell.push(para(document, makeLink(document, href, href))));
  return cell;
}

function selectLabel(select) {
  const wrap = select.closest('#extension_compatibility, #extension_support, .box-tocart, .box-in') || select.parentElement;
  const label = (wrap && wrap.querySelector('label')) || null;
  const text = squash(label && label.textContent);
  if (text) return text.replace(/:$/, '');
  const name = select.getAttribute('name') || select.id || 'Option';
  if (/edition/i.test(name)) return 'Edition';
  if (/compatib/i.test(name)) return 'Your store version';
  if (/support/i.test(name)) return 'Support';
  return labelCase(name.replace(/[_-]+/g, ' '));
}

function choiceList(document, choices, selected) {
  const ul = document.createElement('ul');
  choices.forEach((c) => {
    const li = document.createElement('li');
    if (selected && c === selected) {
      const strong = document.createElement('strong');
      strong.textContent = c;
      li.append(strong);
    } else {
      li.textContent = c;
    }
    ul.append(li);
  });
  return ul;
}

// Store versions for an unrendered capture: selectService JSON, else Technical Specifications.
function fallbackVersions(document, element, configs, editionId, editionName) {
  const service = findConfig(configs, 'selectService');
  const compat = service && service.spConfig && service.spConfig.versionCompatibility;
  if (compat && editionId && compat[editionId]) return Object.values(compat[editionId]).map(squash);

  const specs = document.querySelector('[id="product.info.details.tech_specs"]');
  const box = specs && specs.parentElement && specs.parentElement.querySelector('[data-role="content"]');
  if (!box || !editionName) return [];
  const out = [];
  box.querySelectorAll('p').forEach((p) => {
    const b = p.querySelector('b, strong');
    if (!b || squash(b.textContent).replace(/:$/, '') !== editionName) return;
    const rest = squash(p.textContent.replace(b.textContent, ''));
    rest.split(',').map((v) => squash(v.replace(/\(current\)/i, ''))).filter(Boolean)
      .forEach((v) => out.push(`${v} (${editionName})`));
  });
  return out;
}

export default function parse(element, { document }) {
  const cells = [];
  const configs = initConfigs(element);
  const media = element.querySelector('.product.media') || element;
  const main = element.querySelector('.product-info-main') || element;

  const metaAmount = document.querySelector('meta[property="product:price:amount"]');
  const metaCurrency = document.querySelector('meta[property="product:price:currency"]');
  const symbol = CURRENCY[(metaCurrency && metaCurrency.getAttribute('content')) || 'USD'] || '$';

  // header + gallery (media column)
  if (media !== element || !element.matches('select')) {
    const header = buildHeader(document, media);
    if (header) cells.push(header);
    const gallery = collectGallery(document, media, configs);
    if (gallery) cells.push(['Gallery', gallery]);
  }

  const editionSelect = main.matches('select#editions, select[name="editions"]')
    ? main : main.querySelector('select#editions, select[name="editions"]');
  const editionOpt = editionSelect
    && (editionSelect.querySelector('option[selected]') || editionSelect.querySelector('option'));
  const editionId = editionOpt ? editionOpt.getAttribute('value') : '';
  const editionName = editionOpt ? squash(editionOpt.textContent) : '';
  const service = findConfig(configs, 'selectService');
  const optionPrices = service && service.spConfig && service.spConfig.optionPrices;

  // selects (edition, store version, support) in source order
  const selects = main.matches('select') ? [main] : [...main.querySelectorAll('select')];
  selects.forEach((select) => {
    if (isHidden(select, main)) return;
    const opts = [...select.querySelectorAll('option')];
    let choices = opts.map((o) => squash(o.textContent)).filter(Boolean);
    const sel = select.querySelector('option[selected]');
    const label = selectLabel(select);
    const placeholderOnly = choices.length <= 1 && opts.every((o) => !o.getAttribute('value') || o.getAttribute('value') === '0');
    if (placeholderOnly && /compatib/i.test(select.getAttribute('name') || select.id || '')) {
      const versions = fallbackVersions(document, element, configs, editionId, editionName);
      choices = choices.concat(versions.filter((v) => !choices.includes(v)));
    }
    // a dropdown holding only its "Choose ..." prompt has nothing to author
    if (!choices.length || (placeholderOnly && choices.length <= 1)) return;
    cells.push([label, choiceList(document, choices, sel ? squash(sel.textContent) : '')]);
  });

  // installation service add-on
  const install = main.querySelector('#installation_service');
  if (install && !isHidden(install, main)) {
    const priceEl = install.querySelector('#installation_service_price');
    const price = squash(priceEl && priceEl.textContent);
    const labelText = squash([...install.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ')) || 'Installation service';
    cells.push([`[ ] ${labelText}`, MONEY_RE.test(price) ? price : formatMoney(parseAmount(price) || 0, symbol)]);
  }

  // notices and any other visible informational boxes
  [...(main.matches('select') ? [] : main.children)].forEach((child) => {
    if (child.matches('script, style, form, .product-info-price') || isHidden(child, main)) return;
    if (child.querySelector('select, form, #installation_service, .product-add-form')) return;
    if (child.querySelector('a.spectrum-Button') && /contact vendor/i.test(child.textContent)) return;
    const text = squash(child.textContent);
    if (!text) return;
    cells.push([para(document, text), '']);
  });

  // price lines
  const priceBoxes = [...main.querySelectorAll('.product-info-price .price-box.price-final_price > .price-box, .product-info-price .price-box > .price-box')]
    .filter((b, i, arr) => arr.indexOf(b) === i && !isHidden(b, main));
  let running = 0;
  priceBoxes.forEach((box) => {
    const left = box.querySelector('.column.left') || box.firstElementChild;
    const right = box.querySelector('.column.right') || box.lastElementChild;
    const label = labelCase(left && left.textContent);
    let value = squash(right && right.textContent);
    if (!label) return;
    const isTotal = /^total/i.test(label);
    if (!MONEY_RE.test(value)) {
      if (isTotal) {
        value = formatMoney(running, symbol);
      } else if (/^product/i.test(label)) {
        const fromConfig = optionPrices && editionId && optionPrices[editionId] && optionPrices[editionId].price;
        const amount = fromConfig != null ? fromConfig : (metaAmount && metaAmount.getAttribute('content'));
        value = formatMoney(amount != null && amount !== '' ? amount : (parseAmount(value) || 0), symbol);
      } else {
        value = formatMoney(parseAmount(value) || 0, symbol);
      }
    }
    // "Then" (subscription renewal) is not part of the amount due today
    if (!isTotal && !/^then\b/i.test(label)) running += parseAmount(value) || 0;
    cells.push([label, value]);
  });

  // actions
  const actions = [];
  const addToCart = main.querySelector('#product-addtocart-button');
  if (addToCart) actions.push(makeLink(document, '#add-to-cart', squash(addToCart.textContent) || 'Add to cart'));
  main.querySelectorAll('.product-add-form a[href]').forEach((a) => {
    const t = squash(a.textContent);
    if (t) actions.push(makeLink(document, abs(a.getAttribute('href')), t));
  });
  const hasPurchase = actions.length > 0;
  main.querySelectorAll('a.spectrum-Button[href]').forEach((a) => {
    if (a.closest('.product-add-form')) return;
    const t = squash(a.textContent);
    if (t) actions.push(makeLink(document, abs(a.getAttribute('href')), t));
  });
  if (actions.length) {
    const row = actions.map((a) => a);
    while (row.length < 2) row.push('');
    cells.push(row);
  }

  // rating (Bazaarvoice inline rating, when rendered)
  const avg = media.querySelector('.box-right-reviews .bv_averageRating_component_container .bv_text');
  const count = media.querySelector('.box-right-reviews .bv_numReviews_component_container .bv_text');
  const avgText = squash(avg && avg.textContent);
  if (/^\d(\.\d+)?$/.test(avgText)) {
    const countText = squash(count && count.textContent);
    cells.push([`${avgText}${/^\(\d[\d,]*\)$/.test(countText) ? ` ${countText}` : ''}`, '']);
  }

  const contactOnly = !hasPurchase && actions.length > 0 && main !== element;
  const name = contactOnly ? 'product-buy-box (contact-only)' : 'product-buy-box';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
