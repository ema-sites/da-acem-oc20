/* eslint-disable */
/* global WebImporter */

/**
 * Parser for notice (bordered callout of notice text).
 *
 * Source (product pages): .product-info-details-container > div.product-details-row
 *   > div.pci-notice | div.box-in.vbe | any notice box — rich text with links.
 *
 * Target (blocks/notice/README.md): single cell of rich text with links;
 * an optional heading becomes the title. Empty notices are dropped (element removed).
 */

const NOTICE_SELECTORS = ['.pci-notice', '.box-in.vbe', '[class*="notice"]', '.message'];

function findNotice(element) {
  for (const sel of NOTICE_SELECTORS) {
    const el = element.matches(sel) ? element : element.querySelector(sel);
    if (el) return el;
  }
  return element;
}

export default function parse(element, { document }) {
  const source = findNotice(element);
  const cell = document.createElement('div');

  const heading = source.querySelector('h1, h2, h3, h4, h5, h6, strong.title');
  if (heading && heading.textContent.trim()) {
    const h = document.createElement('h3');
    h.textContent = heading.textContent.trim();
    cell.append(h);
    heading.remove();
  }

  // Keep block-level children as-is; wrap loose text + inline nodes into paragraphs.
  let p = null;
  [...source.childNodes].forEach((node) => {
    const isBlock = node.nodeType === 1 && /^(P|UL|OL|DIV|TABLE|BLOCKQUOTE)$/.test(node.tagName);
    if (isBlock) {
      p = null;
      if (node.textContent.trim()) cell.append(node);
      return;
    }
    if (node.nodeType === 3 && !node.textContent.trim() && !p) return;
    if (!p) {
      p = document.createElement('p');
      cell.append(p);
    }
    p.append(node);
  });
  cell.querySelectorAll('p').forEach((para) => {
    para.innerHTML = para.innerHTML.replace(/^\s+|\s+$/g, '');
    if (!para.textContent.trim() && !para.querySelector('img')) para.remove();
  });
  cell.querySelectorAll('a[target]').forEach((a) => a.removeAttribute('target'));

  if (!cell.textContent.trim()) {
    element.remove();
    return;
  }
  const block = WebImporter.Blocks.createBlock(document, { name: 'notice', cells: [[cell]] });
  element.replaceWith(block);
}
