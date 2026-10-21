/* eslint-disable */
/* global WebImporter */

/**
 * Parser for results-toolbar (result count + sort options).
 *
 * Source: #livesearch-category-view > div.products-header
 *   div.products-count > span#toolbar-amount > strong "3948" + " Results"
 *   div.products-sort > label.sort-label "Sort By" + select#sorter > option*
 *
 * Target (blocks/results-toolbar/README.md): one row
 *   | 3948 Results | Sort By | list of sort options |
 * The select is turned into an authorable list; the selected option (if any) is bold
 * so the block uses it as the default.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

export default function parse(element, { document }) {
  const cells = [];

  const countEl = element.querySelector('.products-count, #toolbar-amount');
  const count = clean(countEl ? countEl.textContent : '');

  const labelEl = element.querySelector('.sort-label, .products-sort label');
  const label = clean(labelEl ? labelEl.textContent : '') || 'Sort By';

  const options = [...element.querySelectorAll('select option')];
  const ul = document.createElement('ul');
  options.forEach((opt) => {
    const text = clean(opt.textContent);
    if (!text) return;
    const li = document.createElement('li');
    if (opt.hasAttribute('selected')) {
      const strong = document.createElement('strong');
      strong.textContent = text;
      li.append(strong);
    } else {
      li.textContent = text;
    }
    ul.append(li);
  });

  const row = [count];
  if (ul.children.length) row.push(label, ul);
  else row.push('', '');
  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'results-toolbar', cells });
  element.replaceWith(block);
}
