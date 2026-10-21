/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product (extension card grid).
 *
 * Source: #products-grid > div.ais-hits--item (one per product)
 *   a.result[href]                                  -> card link (on the title)
 *     .result-thumbnail > img.product-item-photo    -> logo (cell 1)
 *     span.assurance-program-badge                  -> empty CSS badge, not authorable
 *     h3.result-title                               -> name
 *     h4.result-subtitle                            -> vendor
 *     .rating-result[title="80%"]                   -> rating "4" (out of 5)
 *     .hit-partner-badge img[alt="Adobe Gold Solution Partner"] -> "Gold Solution Partner"
 *     .price-box span.price                         -> "$149.00 / year"
 *
 * Target (blocks/cards-product/README.md): one row per card
 *   | logo image | name (h3 link), vendor, rating, partner tier, price |
 * Links are kept absolute; the cleanup transformer makes same-site links relative.
 *
 * Variant: the catalog split identical grids between the plain block and the `image`
 * option (capture-time noise), so every grid imports as the plain block for a consistent look.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function para(document, text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

export default function parse(element, { document }) {
  const cells = [];
  const cards = [...element.querySelectorAll(':scope > .ais-hits--item')];

  cards.forEach((card) => {
    const link = card.querySelector('a.result[href]') || card.querySelector('a[href]');
    const href = link ? link.getAttribute('href') : '';

    // cell 1: logo
    const imageCell = [];
    const img = card.querySelector('.result-thumbnail img, img.product-item-photo');
    const src = img ? img.getAttribute('src') || '' : '';
    if (img && src && !/no_selection$/.test(src)) {
      const logo = document.createElement('img');
      logo.src = src;
      logo.alt = clean(img.getAttribute('alt'));
      imageCell.push(logo);
    }

    // cell 2: body
    const body = [];
    const titleEl = card.querySelector('h3.result-title, h3');
    const title = clean(titleEl ? titleEl.textContent : '') || clean(img && img.getAttribute('alt'));
    if (title) {
      const h3 = document.createElement('h3');
      if (href) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = title;
        h3.append(a);
      } else {
        h3.textContent = title;
      }
      body.push(h3);
    }

    const vendorEl = card.querySelector('h4.result-subtitle, h4');
    const vendor = clean(vendorEl ? vendorEl.textContent : '');
    if (vendor) body.push(para(document, vendor));

    const ratingEl = card.querySelector('.rating-result[title]');
    if (ratingEl) {
      const pct = parseFloat(ratingEl.getAttribute('title'));
      if (!Number.isNaN(pct)) {
        const stars = Math.round((pct / 20) * 10) / 10;
        body.push(para(document, String(stars)));
      }
    }

    const badgeImg = card.querySelector('.hit-partner-badge img[alt]');
    const tier = clean(badgeImg ? badgeImg.getAttribute('alt') : '').replace(/^Adobe\s+/i, '');
    if (tier) body.push(para(document, tier));

    const priceEl = card.querySelector('.price-box span.price, span.price');
    const price = clean(priceEl ? priceEl.textContent : '');
    if (price) body.push(para(document, price));

    if (!imageCell.length && !body.length) return;
    cells.push([imageCell, body]);
  });

  const name = 'cards-product';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
