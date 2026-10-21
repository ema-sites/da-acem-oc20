import { createOptimizedPicture, decorateIcons } from '../../scripts/aem.js';

/*
 * Cards Promo block
 * Bordered promo cards: heading, icon, short text and a "Learn more" button.
 *
 * Authoring: one row per card. Cells (any order, any may be omitted):
 *   heading, icon/image (or an icon token such as :arm:), text, call-to-action link.
 */

const BLOCK_TAGS = /^(P|H[1-6]|UL|OL|DIV|PICTURE|BLOCKQUOTE|PRE|TABLE)$/;
const ICON_TOKEN = /^:([a-z0-9-]+):$/i;

/**
 * Returns the block-level elements of a cell, wrapping loose inline content in a <p>.
 * @param {Element} cell
 * @returns {Element[]}
 */
function cellNodes(cell) {
  const hasBlockChild = [...cell.children].some((c) => BLOCK_TAGS.test(c.tagName));
  if (hasBlockChild) return [...cell.children];
  if (!cell.textContent.trim() && !cell.querySelector('img, picture, span.icon')) return [];
  const p = document.createElement('p');
  p.append(...cell.childNodes);
  return [p];
}

/**
 * Converts a plain-text icon token (e.g. ":arm:") into an EDS icon span.
 * The aem.page pipeline does this server side; local previews leave the text as-is.
 * @param {Element} el
 */
function decorateIconToken(el) {
  if (el.children.length) return;
  const match = el.textContent.trim().match(ICON_TOKEN);
  if (!match) return;
  const span = document.createElement('span');
  span.className = `icon icon-${match[1].toLowerCase()}`;
  el.replaceChildren(span);
  decorateIcons(el);
}

/**
 * Returns the link if the element contains nothing but a single link.
 * @param {Element} el
 * @returns {HTMLAnchorElement|null}
 */
function soleLink(el) {
  if (el.tagName === 'A') return el;
  const links = el.querySelectorAll('a');
  if (links.length !== 1 || el.querySelector('img, picture')) return null;
  return links[0].textContent.trim() === el.textContent.trim() ? links[0] : null;
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-promo-card';

    const heading = document.createElement('div');
    heading.className = 'cards-promo-card-heading';
    const image = document.createElement('div');
    image.className = 'cards-promo-card-image';
    const body = document.createElement('div');
    body.className = 'cards-promo-card-body';
    const cta = document.createElement('div');
    cta.className = 'cards-promo-card-cta';

    [...row.children].flatMap(cellNodes).forEach((el) => {
      decorateIconToken(el);
      const text = el.textContent.trim();
      const link = text ? soleLink(el) : null;
      if (/^H[1-6]$/.test(el.tagName) && !heading.childNodes.length) {
        heading.append(el);
      } else if (!text && el.querySelector('picture, img, span.icon')) {
        image.append(el);
      } else if (link && !cta.childNodes.length) {
        link.className = 'button secondary';
        const p = document.createElement('p');
        p.className = 'button-wrapper';
        p.append(link);
        cta.append(p);
      } else if (text || el.querySelector('picture, img')) {
        body.append(el);
      }
    });

    [heading, image, body, cta].forEach((part) => {
      if (part.childNodes.length) li.append(part);
    });
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]));
  });

  block.replaceChildren(ul);
}
