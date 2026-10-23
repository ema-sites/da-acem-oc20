/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards (EDS library "Cards" convention) — partner directory grid.
 *
 * Convention: 2 columns; first row is the block name (createBlock adds it); each subsequent
 * row is one card: | image (logo) | text content: title heading + call-to-action link |.
 *
 * Source: #developer-hits-results > div.hits-wrapper > div.hit-instance (one per partner)
 *   div.hit-logo > a > img | div.hit-name a > .hit-name-title | div.hit-learn-more a "Learn More"
 * Cards whose logo is missing keep an empty image cell so every row stays 2 columns.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

export default function parse(element, { document }) {
  const cells = [];
  [...element.querySelectorAll('.hit-instance')].forEach((hit) => {
    const imageCell = [];
    const img = hit.querySelector('.hit-logo img');
    if (img && img.getAttribute('src')) {
      const pic = document.createElement('img');
      pic.src = new URL(img.getAttribute('src'), 'https://commercemarketplace.adobe.com/').href;
      pic.alt = img.getAttribute('alt') || '';
      imageCell.push(pic);
    }
    const nameLink = hit.querySelector('.hit-name a');
    const name = clean(hit.querySelector('.hit-name-title')?.textContent || nameLink?.textContent);
    if (!name) return;
    const textCell = [];
    const h3 = document.createElement('h3');
    if (nameLink) {
      const a = document.createElement('a');
      a.href = nameLink.getAttribute('href');
      a.textContent = name;
      h3.append(a);
    } else {
      h3.textContent = name;
    }
    textCell.push(h3);
    const more = hit.querySelector('.hit-learn-more a');
    if (more) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = more.getAttribute('href');
      a.textContent = clean(more.textContent) || 'Learn More';
      p.append(a);
      textCell.push(p);
    }
    cells.push([imageCell, textCell]);
  });
  if (!cells.length) {
    element.remove();
    return;
  }
  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
