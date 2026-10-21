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

const SOCIAL_HOSTS = [
  ['facebook', /(^|\.)facebook\.com$/],
  ['twitter', /(^|\.)(twitter|x)\.com$/],
  ['linkedin', /(^|\.)linkedin\.com$/],
  ['youtube', /(^|\.)(youtube\.com|youtu\.be)$/],
  ['instagram', /(^|\.)instagram\.com$/],
];

/* returns the social network of a paragraph that holds a single profile link, else null */
function socialNetwork(el) {
  if (el.tagName !== 'P') return null;
  const links = el.querySelectorAll('a[href]');
  if (links.length !== 1 || el.textContent.trim() !== links[0].textContent.trim()) return null;
  let host;
  try {
    host = new URL(links[0].href).hostname.toLowerCase();
  } catch (e) {
    return null;
  }
  const match = SOCIAL_HOSTS.find(([, re]) => re.test(host));
  return match ? match[0] : null;
}

/* partner profile: social profile links become an icon list (source .social-list) */
function buildSocialList(items) {
  const ul = document.createElement('ul');
  ul.className = 'product-title-links product-title-social';
  items.forEach(({ el, network }) => {
    const a = el.querySelector('a');
    a.className = '';
    a.setAttribute('aria-label', network.charAt(0).toUpperCase() + network.slice(1));
    a.target = '_blank';
    a.rel = 'noopener';
    const icon = document.createElement('span');
    icon.className = `product-title-social-icon product-title-social-${network}`;
    icon.setAttribute('aria-hidden', 'true');
    a.replaceChildren(icon);
    const li = document.createElement('li');
    li.append(a);
    ul.append(li);
  });
  return ul;
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

  const profile = block.classList.contains('partner-profile');
  const social = [];
  let titled = false;
  let website = false;
  elements.forEach((el) => {
    const text = el.textContent.trim();
    const network = profile ? socialNetwork(el) : null;
    if (network) {
      if (!social.length) {
        // placeholder keeps the list where the first profile link was authored
        const slot = document.createElement('ul');
        info.append(slot);
        social.push({ slot });
      }
      social.push({ el, network });
      return;
    }
    if (profile && !website && el.tagName === 'P' && el.querySelector('a[href]') && !el.querySelector('picture, img')) {
      el.classList.add('product-title-website');
      el.querySelectorAll('a.button').forEach((a) => a.classList.remove('button'));
      el.classList.remove('button-container');
      website = true;
    }
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

  if (social.length) {
    const [{ slot }, ...items] = social;
    slot.replaceWith(buildSocialList(items));
  }

  logo.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]));
  });

  const parts = [logo, info, aside].filter((p) => p.childNodes.length);
  block.replaceChildren(...parts);
}
