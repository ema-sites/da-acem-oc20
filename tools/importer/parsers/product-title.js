/* eslint-disable */
/* global WebImporter */

/**
 * Parser for product-title (compact logo + title + vendor header).
 *
 * Source (seller profile): div.product.media > div.case-box-ov > div.page-title-wrapper
 *   div.ico-product img (avatar) | div.box-ov-title > h1.page-title, div.by-company links
 *   (website + optional social links).
 *
 * Target (blocks/product-title/README.md): one row
 *   | logo | title heading + vendor/website link + extra lines | rating |.
 * Seller profiles use the `partner-profile` option.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

export default function parse(element, { document }) {
  const logoCell = [];
  const img = element.querySelector('.ico-product img, img');
  if (img && img.getAttribute('src') && !/no_selection|placeholder/.test(img.getAttribute('src'))) {
    const pic = document.createElement('img');
    pic.src = img.getAttribute('src');
    pic.alt = img.getAttribute('alt') || '';
    logoCell.push(pic);
  }

  const textCell = [];
  const title = element.querySelector('h1, .page-title');
  if (title && clean(title.textContent)) {
    const h1 = document.createElement('h1');
    h1.textContent = clean(title.textContent);
    textCell.push(h1);
  }

  const seen = new Set();
  element.querySelectorAll('.by-company a[href], .box-ov-title a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || seen.has(href)) return;
    seen.add(href);
    const link = document.createElement('a');
    link.href = href;
    link.textContent = clean(a.textContent) || clean(a.getAttribute('title')) || clean(a.getAttribute('aria-label')) || href;
    const p = document.createElement('p');
    p.append(link);
    textCell.push(p);
  });

  if (!textCell.length && !logoCell.length) {
    element.remove();
    return;
  }

  const ratingCell = [];
  const rating = element.querySelector('.rating-result, .product-reviews-summary');
  if (rating && clean(rating.textContent)) ratingCell.push(clean(rating.textContent));

  const row = [logoCell, textCell];
  if (ratingCell.length) row.push(ratingCell);
  const isProfile = !!element.closest('.partner') || !!element.querySelector('.box-ov-title');
  const name = isProfile ? 'product-title (partner-profile)' : 'product-title';
  const block = WebImporter.Blocks.createBlock(document, { name, cells: [row] });
  element.replaceWith(block);
}
