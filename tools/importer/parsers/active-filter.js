/* eslint-disable */
/* global WebImporter */

/**
 * Parser for active-filter (selected filter chips).
 *
 * Source: #selected-filters-container > div.selected-filters-list
 *   a.selected-filter-item.remove-filter
 *     span.livesearch-filter-meta-* (hidden data)  -> dropped
 *     span.remove-icon "X"                          -> dropped (decorative)
 *     span.filter-label > strong "Category:" + " Extensions"
 *
 * Target (blocks/active-filter/README.md): one row per bar | label | action links |.
 * The bar here holds only chips, so the single cell contains one link paragraph per
 * chip; the block treats a link-only first cell as chips / actions.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

// Heading bar (seller profile "All Products | Back to top"): | label | action links |.
function parseHeadingBar(element, document) {
  const heading = element.querySelector('h1, h2, h3, h4, h5, h6, .box-title, strong');
  const labelText = clean(heading ? heading.textContent : '');
  if (!labelText) return null;
  const actions = [];
  element.querySelectorAll('a[href]').forEach((a) => {
    const text = clean(a.textContent);
    if (!text || (heading && heading.contains(a))) return;
    const link = document.createElement('a');
    link.href = a.getAttribute('href');
    link.textContent = text;
    const p = document.createElement('p');
    p.append(link);
    actions.push(p);
  });
  const h = document.createElement('h2');
  h.textContent = labelText;
  return [[h, actions]];
}

export default function parse(element, { document }) {
  if (!element.querySelector('a.selected-filter-item')) {
    const barCells = parseHeadingBar(element, document);
    if (barCells) {
      element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'active-filter', cells: barCells }));
      return;
    }
  }
  const cells = [];
  let chips = [...element.querySelectorAll('a.selected-filter-item')];
  if (!chips.length) chips = [...element.querySelectorAll('a[href]')];

  const cell = [];
  chips.forEach((chip) => {
    const labelEl = chip.querySelector('.filter-label') || chip;
    const a = document.createElement('a');
    a.href = chip.getAttribute('href') || '#';
    if (chip.getAttribute('title')) a.title = chip.getAttribute('title');

    const key = labelEl.querySelector('strong, b');
    const keyText = clean(key ? key.textContent : '');
    let valueText = clean(labelEl.textContent);
    if (keyText) {
      valueText = clean(valueText.slice(valueText.indexOf(keyText) + keyText.length));
      const strong = document.createElement('strong');
      strong.textContent = keyText;
      a.append(strong, document.createTextNode(valueText ? ` ${valueText}` : ''));
    } else {
      a.textContent = valueText;
    }
    if (!clean(a.textContent)) return;

    const p = document.createElement('p');
    p.append(a);
    cell.push(p);
  });

  if (cell.length) cells.push([cell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'active-filter', cells });
  element.replaceWith(block);
}
