/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tag-list (category icon links).
 *
 * Source: #maincontent > div.widget.block.block-static-block .fotorama
 *   div.col > a[href] > span.icon.icon-<name> + span.text-link
 *
 * Target (blocks/tag-list/README.md): links in cells, one per row.
 * The CSS icon span is carried through as an :<name>: icon token inside the link
 * so EDS renders it as span.icon.icon-<name> (from /icons/<name>.svg).
 */

function iconName(span) {
  if (!span) return '';
  const cls = [...span.classList].find((c) => c.startsWith('icon-') && c.length > 5);
  return cls ? cls.slice(5).toLowerCase().replace(/[^a-z0-9-]/g, '-') : '';
}

export default function parse(element, { document }) {
  const cells = [];

  const items = [...element.querySelectorAll(':scope > .col')];
  const anchors = items.length
    ? items.map((col) => col.querySelector('a[href]')).filter(Boolean)
    : [...element.querySelectorAll('a[href]')];

  anchors.forEach((src) => {
    const label = (src.querySelector('.text-link') || src).textContent.replace(/\s+/g, ' ').trim();
    if (!label) return;
    const icon = iconName(src.querySelector('span[class*="icon-"]'));

    const a = document.createElement('a');
    a.href = src.getAttribute('href');
    a.textContent = icon ? `:${icon}: ${label}` : label;
    cells.push([a]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tag-list', cells });
  element.replaceWith(block);
}
