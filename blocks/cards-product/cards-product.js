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
 */

const PRICE_RE = /^(free|[$€£¥]\s?\d|\d[\d.,]*\s?(usd|eur|gbp))/i;
const STARS_RE = /^[★☆]{1,5}$/;
const RATING_RE = /^(rating[:\s]*)?([0-5](\.\d+)?)\s*(\/\s*5)?(\s*stars?)?$/i;

function buildStars(value) {
  const wrap = document.createElement('div');
  wrap.className = 'cards-product-rating';
  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', `Rated ${value} out of 5`);
  wrap.style.setProperty('--rating', value);
  for (let i = 1; i <= 5; i += 1) {
    const star = document.createElement('span');
    star.className = 'cards-product-star';
    if (value >= i) star.classList.add('full');
    else if (value > i - 1) star.classList.add('half');
    star.setAttribute('aria-hidden', 'true');
    wrap.append(star);
  }
  return wrap;
}

function ratingValue(text) {
  const t = text.trim();
  if (STARS_RE.test(t)) return (t.match(/★/g) || []).length;
  const m = t.match(RATING_RE);
  return m ? parseFloat(m[2]) : null;
}

function classifyBody(body) {
  let titled = false;
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
    if (rating !== null && text.length <= 16) {
      el.replaceWith(buildStars(rating));
      return;
    }
    if (PRICE_RE.test(text)) {
      el.classList.add('cards-product-price');
      return;
    }
    if (/partner/i.test(text)) {
      el.classList.add('cards-product-tier');
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

    if (image.childNodes.length) li.append(image);
    li.append(body);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]));
  });

  block.replaceChildren(ul);
}
