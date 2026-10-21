/* eslint-disable */
/* global WebImporter */

/**
 * Parser for pagination (results-per-page + page links).
 *
 * Source: #livesearch-controls
 *   div.limiter-wrapper > b "Results per page:" + select#livesearch-limiter > option*
 *   ul.pages-items (optional) > li.item.current > strong.page "1"
 *                              li.item > a.page[data-page] "2" ...
 *                              li.item.pages-item-next > a.action.next "Next Page"
 *
 * Target (blocks/pagination/README.md):
 *   | Results per page: | **36**, 72, 144 |   (selected option bold = default)
 *   | list of page links |                  (current page unlinked, bold)
 * Variant (variants.json): page-numbers when page links exist, plain otherwise.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

export default function parse(element, { document }) {
  const cells = [];

  // results per page
  const limiter = element.querySelector('.limiter-wrapper') || element;
  const labelEl = limiter.querySelector('b, strong, label');
  const label = clean(labelEl ? labelEl.textContent : '') || 'Results per page:';
  const options = [...limiter.querySelectorAll('select option')];
  if (options.length) {
    const choices = document.createElement('p');
    options.forEach((opt, i) => {
      const text = clean(opt.textContent);
      if (!text) return;
      if (choices.childNodes.length) choices.append(document.createTextNode(', '));
      if (opt.hasAttribute('selected')) {
        const strong = document.createElement('strong');
        strong.textContent = text;
        choices.append(strong);
      } else {
        choices.append(document.createTextNode(text));
      }
    });
    cells.push([label, choices]);
  }

  // page links
  const pageItems = [...element.querySelectorAll('ul.pages-items > li')];
  const ul = document.createElement('ul');
  pageItems.forEach((item) => {
    const link = item.querySelector('a[href]');
    const text = clean((link || item).textContent);
    if (!text) return;
    const li = document.createElement('li');
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href') || '#';
      if (link.getAttribute('title')) a.title = link.getAttribute('title');
      a.textContent = text;
      li.append(a);
    } else {
      const strong = document.createElement('strong');
      strong.textContent = text;
      li.append(strong);
    }
    ul.append(li);
  });
  const hasPages = ul.querySelector('a') !== null;
  if (ul.children.length) cells.push([ul, '']);

  const name = hasPages ? 'pagination (page-numbers)' : 'pagination';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
