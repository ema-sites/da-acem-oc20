/* eslint-disable */
/* global WebImporter */

/**
 * Parser for facet-filter (checkbox facet list with counts).
 *
 * Source: div.facet-group.facet-<attr> > ul.facet-items
 *   li.facet-item > label > input[type=checkbox] + span.facet-label + span.facet-count
 * The facet title (div.facet-title) is a sibling of the ul, outside this element.
 *
 * Target (blocks/facet-filter/README.md): one row per value | label | count |.
 * Form controls are not carried over; the block rebuilds the checkboxes.
 * Facet groups with no values (empty ul) are dropped.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

export default function parse(element, { document }) {
  const cells = [];
  // Extension listings: ul > li; partner directory: div > label (span label + span.filter-count).
  let items = [...element.querySelectorAll(':scope > li')];
  if (!items.length) items = [...element.querySelectorAll(':scope > label')];

  items.forEach((li) => {
    const labelEl = li.querySelector('.facet-label, .label-content > span');
    const countEl = li.querySelector('.facet-count, .filter-count');
    const input = li.querySelector('input');
    const label = clean(labelEl ? labelEl.textContent : '')
      || clean(input ? input.getAttribute('value') : '');
    if (!label) return;
    const count = clean(countEl ? countEl.textContent : '');
    const link = li.querySelector('a[href]');
    let labelCell = label;
    if (link && link.getAttribute('href') !== '#') {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.textContent = label;
      labelCell = a;
    }
    cells.push([labelCell, count]);
  });

  if (!cells.length) {
    element.remove();
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'facet-filter', cells });
  element.replaceWith(block);
}
