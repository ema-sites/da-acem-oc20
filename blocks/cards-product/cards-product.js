import { createOptimizedPicture } from '../../scripts/aem.js';

/*
 * Cards Product block
 * Grid of extension/product cards: logo, name, vendor, star rating, partner
 * tier and price.
 *
 * Authoring: one row per card.
 *   Cell 1: logo image (optional)
 *   Cell 2: name (heading or link), vendor, rating ("4.5" or "★★★★☆"),
 *           partner tier, price ("$99.00", "$49.00 / year", "Free")
 * Cells may be merged or omitted; content is classified by its shape.
 *
 * Output per card:
 *   li.cards-product-card
 *     div.cards-product-card-image      (always present: grey logo tile)
 *     div.cards-product-card-body
 *       .cards-product-name, .cards-product-vendor, .cards-product-rating,
 *       div.cards-product-footer > .cards-product-tier + .cards-product-price
 */

const PRICE_RE = /^(free|[$€£¥]\s?\d|\d[\d.,]*\s?(usd|eur|gbp))/i;
const STARS_RE = /^[★☆]{1,5}$/;
const RATING_RE = /^(rating[:\s]*)?([0-5](\.\d+)?)\s*(\/\s*5)?(\s*stars?)?$/i;

function buildStars(value) {
  const rating = Math.max(0, Math.min(5, value));
  const wrap = document.createElement('div');
  wrap.className = 'cards-product-rating';
  const stars = document.createElement('span');
  stars.className = 'cards-product-stars';
  stars.setAttribute('role', 'img');
  stars.setAttribute('aria-label', `Rated ${rating} out of 5`);
  stars.style.setProperty('--rating', `${(rating / 5) * 100}%`);
  wrap.append(stars);
  return wrap;
}

function ratingValue(text) {
  const t = text.trim();
  if (STARS_RE.test(t)) return (t.match(/★/g) || []).length;
  const m = t.match(RATING_RE);
  return m ? parseFloat(m[2]) : null;
}

/* "Gold Solution Partner" -> <strong>Gold</strong><span>Solution Partner</span> */
function decorateTier(el) {
  if (el.querySelector('img, picture')) return;
  const words = el.textContent.trim().split(/\s+/);
  const level = document.createElement('strong');
  [level.textContent] = words;
  el.replaceChildren(level);
  if (words.length > 1) {
    const type = document.createElement('span');
    type.textContent = words.slice(1).join(' ');
    el.append(type);
  }
}

function classifyBody(body) {
  let titled = false;
  let rated = false;
  [...body.children].forEach((el) => {
    const text = el.textContent.trim();
    const looksLikeName = /^H[1-6]$/.test(el.tagName)
      || (el.querySelector('strong, a') && !PRICE_RE.test(text));
    if (!titled && looksLikeName) {
      el.classList.add('cards-product-name');
      titled = true;
      return;
    }
    if (!text && !el.querySelector('picture, img')) {
      el.remove();
      return;
    }
    const rating = ratingValue(text);
    if (!rated && rating !== null && text.length <= 16) {
      el.replaceWith(buildStars(rating));
      rated = true;
      return;
    }
    if (PRICE_RE.test(text)) {
      el.classList.add('cards-product-price');
      return;
    }
    if (/partner/i.test(text)) {
      el.classList.add('cards-product-tier');
      decorateTier(el);
      return;
    }
    if (titled && !body.querySelector('.cards-product-vendor')) {
      el.classList.add('cards-product-vendor');
      return;
    }
    if (!titled) {
      el.classList.add('cards-product-name');
      titled = true;
    }
  });

  // source always shows the star row (grey when unrated)
  if (!rated) {
    const stars = buildStars(0);
    const anchor = body.querySelector('.cards-product-vendor') || body.querySelector('.cards-product-name');
    if (anchor) anchor.after(stars);
    else body.prepend(stars);
  }

  // tier (left) and price (right) share the bottom row
  const tier = body.querySelector('.cards-product-tier');
  const price = body.querySelector('.cards-product-price');
  const footer = document.createElement('div');
  footer.className = 'cards-product-footer';
  if (tier) footer.append(tier);
  if (price) footer.append(price);
  body.append(footer);
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-product-card';
    const image = document.createElement('div');
    image.className = 'cards-product-card-image';
    const body = document.createElement('div');
    body.className = 'cards-product-card-body';

    [...row.children].forEach((cell) => {
      const onlyImage = cell.querySelector('picture, img')
        && cell.textContent.trim() === '';
      if (onlyImage && !image.childNodes.length) {
        image.append(...cell.childNodes);
      } else {
        // a picture mixed into the body still becomes the logo
        const pic = cell.querySelector('picture');
        if (pic && !image.childNodes.length) {
          const holder = pic.closest('p') || pic;
          image.append(holder);
        }
        // bare text cell -> paragraph
        if (cell.children.length === 0 && cell.textContent.trim()) {
          const p = document.createElement('p');
          p.append(...cell.childNodes);
          body.append(p);
        } else {
          body.append(...cell.childNodes);
        }
      }
    });

    classifyBody(body);

    // make the whole card clickable via the name link (stretched link in CSS)
    const nameLink = body.querySelector('.cards-product-name a') || body.querySelector('a');
    if (nameLink) {
      nameLink.classList.add('cards-product-link');
      li.classList.add('has-link');
    }

    // keep the logo tile even without an image (source shows a grey placeholder)
    li.append(image, body);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]));
  });

  block.replaceChildren(ul);
}
