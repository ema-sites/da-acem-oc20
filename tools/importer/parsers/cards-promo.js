/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo (bordered promo cards).
 *
 * Source: #maincontent > div.columns .col-box
 *   div.col > .box-header h2 + span.icon-<name> (CSS icon) + .txt p + .actions a
 *
 * Target (blocks/cards-promo/README.md): one row per card
 *   | heading | icon | text | CTA link |
 * The CSS icon span is carried through as an :<name>: icon token.
 */

function iconName(span) {
  if (!span) return '';
  const cls = [...span.classList].find((c) => c.startsWith('icon-') && c.length > 5);
  return cls ? cls.slice(5).toLowerCase().replace(/[^a-z0-9-]/g, '-') : '';
}

export default function parse(element, { document }) {
  const cells = [];

  const cards = [...element.querySelectorAll(':scope > .col')];

  cards.forEach((card) => {
    // heading
    const headingCell = [];
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && heading.textContent.trim()) {
      const h = document.createElement(heading.tagName.toLowerCase());
      h.textContent = heading.textContent.trim();
      headingCell.push(h);
    }

    // icon (CSS icon span; real <img> if present)
    const iconCell = [];
    const img = card.querySelector('img[src]');
    if (img) {
      iconCell.push(img);
    } else {
      const name = iconName(card.querySelector(':scope > span[class*="icon-"], span[class*="icon-"]'));
      if (name) {
        const p = document.createElement('p');
        p.textContent = `:${name}:`;
        iconCell.push(p);
      }
    }

    // text
    const textCell = [];
    card.querySelectorAll('.txt p').forEach((p) => {
      if (!p.textContent.trim()) return;
      const np = document.createElement('p');
      np.textContent = p.textContent.replace(/\s+/g, ' ').trim();
      textCell.push(np);
    });

    // CTA
    const ctaCell = [];
    const link = card.querySelector('.actions a[href], .txt a[href]');
    if (link && link.textContent.trim()) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = link.textContent.trim();
      p.append(a);
      ctaCell.push(p);
    }

    if (!headingCell.length && !textCell.length && !ctaCell.length) return;
    cells.push([headingCell, iconCell, textCell, ctaCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
