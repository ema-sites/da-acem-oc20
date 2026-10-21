import { createOptimizedPicture } from '../../scripts/aem.js';

/*
 * Product Title block
 * Compact product (or partner) header: logo, title, "by <vendor>" link and,
 * optionally, partner tier badge and star rating.
 *
 * Authoring: one row; cells in any order, any may be omitted.
 *   | logo image | title (heading) + "by Vendor" link + extra lines | rating "5.0 (7)" |
 * Content is classified by shape: an image-only element is the logo, the first
 * heading the title, "4.5 (12)" / "★★★★★" the rating, "... Partner" the tier
 * badge, a list of links the social/profile links.
 * Options: partner-profile, partner-badge, rating, rating-only.
 */

const RATING_RE = /^([★☆]{1,5})?\s*([0-5](?:\.\d+)?)?\s*(\(\s*\d[\d,]*\s*\))?$/;

function parseRating(text) {
  const t = text.trim();
  if (!t || t.length > 24) return null;
  const m = t.match(RATING_RE);
  if (!m || (!m[1] && !m[2])) return null;
  // plain small numbers alone are ambiguous; require stars, decimals or a count
  if (!m[1] && !m[3] && !m[2].includes('.')) return null;
  const value = m[2] ? parseFloat(m[2]) : (m[1].match(/★/g) || []).length;
  return { value, count: m[3] ? m[3].replace(/[()\s]/g, '') : '' };
}

function buildRating({ value, count }) {
  const wrap = document.createElement('div');
  wrap.className = 'product-title-rating';
  const stars = document.createElement('span');
  stars.className = 'product-title-stars';
  stars.setAttribute('role', 'img');
  stars.setAttribute('aria-label', `Rated ${value} out of 5`);
  for (let i = 1; i <= 5; i += 1) {
    const s = document.createElement('span');
    s.className = 'product-title-star';
    if (value >= i) s.classList.add('full');
    else if (value > i - 1) s.classList.add('half');
    stars.append(s);
  }
  const score = document.createElement('span');
  score.className = 'product-title-score';
  score.textContent = `${value.toFixed(1)}${count ? ` (${count})` : ''}`;
  wrap.append(stars, score);
  return wrap;
}

export default function decorate(block) {
  const logo = document.createElement('div');
  logo.className = 'product-title-logo';
  const info = document.createElement('div');
  info.className = 'product-title-info';
  const aside = document.createElement('div');
  aside.className = 'product-title-aside';

  const elements = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    if (cell.children.length === 0 && cell.textContent.trim()) {
      const p = document.createElement('p');
      p.append(...cell.childNodes);
      elements.push(p);
    } else {
      elements.push(...cell.children);
    }
  });

  let titled = false;
  elements.forEach((el) => {
    const text = el.textContent.trim();
    if (el.querySelector('picture, img') && !text && !logo.childNodes.length) {
      logo.append(el);
      return;
    }
    if (/^H[1-6]$/.test(el.tagName) && !titled) {
      el.classList.add('product-title-name');
      titled = true;
      info.prepend(el);
      return;
    }
    const rating = parseRating(text);
    if (rating) {
      aside.append(buildRating(rating));
      return;
    }
    if (/partner$/i.test(text) && text.length < 60) {
      el.classList.add('product-title-badge');
      aside.prepend(el);
      return;
    }
    if (/^by\s/i.test(text)) el.classList.add('product-title-vendor');
    if (el.matches('ul, ol') && el.querySelector('a')) el.classList.add('product-title-links');
    if (text || el.querySelector('picture, img')) info.append(el);
  });

  logo.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]));
  });

  const parts = [logo, info, aside].filter((p) => p.childNodes.length);
  block.replaceChildren(...parts);
}
