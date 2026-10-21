/* eslint-disable */
/* global WebImporter */

/**
 * Parser for notice (bordered callout of notice text).
 *
 * Instances (block-context/notice):
 *   - product pages: div.product-details-row > div.pci-notice | div.box-in.vbe  → plain
 *   - seller profile: #maincontent > div.page.messages (Magento page message,
 *     wrapper with 1–2 children: placeholder + knockout scope) → `warning`
 *   - seller profile: div.case-specifications (div.box-head h4 "Location" +
 *     div.box.box-produce address lines) → `location`
 *   - seller profile: div.box-profile ("Contact Seller" button) → plain
 * The repeating unit differs per instance (text vs nested divs) and child counts vary,
 * so content is located with fallback selectors and every row is optional.
 *
 * Target (blocks/notice/README.md): single cell of rich text with links;
 * an optional heading becomes the title. Empty notices are dropped.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function variantOf(element) {
  if (element.matches('.page.messages, .messages')
    || element.querySelector('.messages .message, .message-notice, .message-warning, .message-error, .message-success')) {
    return 'warning';
  }
  if (element.matches('.case-specifications') || element.querySelector(':scope > .case-specifications, .box-head + .box-produce')) {
    return 'location';
  }
  return null;
}

// The node whose children hold the notice content, per instance shape (fallbacks in order).
function contentRoot(element, variant) {
  const pick = (selectors) => selectors.map((s) => (element.matches(s) ? element : element.querySelector(s))).find(Boolean);
  if (variant === 'warning') {
    return pick(['.message-notice > div', '.message-warning > div', '.message > div', '.message', '[data-ui-id*="message"]']) || element;
  }
  if (variant === 'location') {
    return pick(['.case-specifications']) || element;
  }
  return pick(['.pci-notice', '.box-in.vbe', '.box-profile', '[class*="notice"]']) || element;
}

// Inline runs become paragraphs; block-level children are kept (or flattened if they only wrap inline content).
function appendContent(document, cell, root) {
  let p = null;
  const flush = () => {
    if (p && (clean(p.textContent) || p.querySelector('img'))) cell.push(p);
    p = null;
  };
  [...root.childNodes].forEach((node) => {
    if (node.nodeType === 8) return; // comments (knockout bindings)
    if (node.nodeType === 1 && /^(SCRIPT|STYLE|TEMPLATE|INPUT)$/.test(node.tagName)) return;
    const isBlock = node.nodeType === 1 && /^(P|UL|OL|DIV|TABLE|BLOCKQUOTE|H[1-6])$/.test(node.tagName);
    if (isBlock) {
      flush();
      if (/^H[1-6]$/.test(node.tagName)) {
        const h = document.createElement('h3');
        h.textContent = clean(node.textContent);
        if (h.textContent) cell.push(h);
      } else if (node.tagName === 'DIV') {
        appendContent(document, cell, node);
      } else if (clean(node.textContent)) {
        cell.push(node);
      }
      return;
    }
    if (node.nodeType === 3 && !clean(node.textContent) && !p) return;
    if (!p) p = document.createElement('p');
    p.append(node);
  });
  flush();
}

export default function parse(element, { document }) {
  const variant = variantOf(element);
  const root = contentRoot(element, variant);
  const cell = [];
  appendContent(document, cell, root);

  cell.forEach((node) => {
    if (node.querySelectorAll) node.querySelectorAll('a[target]').forEach((a) => a.removeAttribute('target'));
  });
  const text = cell.map((n) => clean(n.textContent)).join(' ');
  if (!text) {
    element.remove();
    return;
  }
  const name = variant ? `notice (${variant})` : 'notice';
  const block = WebImporter.Blocks.createBlock(document, { name, cells: [[cell]] });
  element.replaceWith(block);
}
