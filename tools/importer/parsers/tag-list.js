/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tag-list.
 *
 * Handles three source shapes (blocks/tag-list/README.md: links in cells, one per row):
 *
 * 1. Homepage category icon links (variant: none)
 *    #maincontent > div.widget.block.block-static-block .fotorama
 *      div.col > a[href] > span.icon.icon-<name> + span.text-link
 *    The CSS icon span is carried through as an :<name>: icon token inside the link
 *    so EDS renders it as span.icon.icon-<name> (from /icons/<name>.svg).
 *
 * 2. Listing breadcrumb (variant: breadcrumb)
 *    div.page-wrapper > div.breadcrumbs > ul.items > li.item > a | strong
 *    One row per crumb: a link for linked crumbs, plain text for the current page
 *    (its own row so the block's breadcrumb mode keeps it as aria-current).
 *
 * 3. Listing "Selected Filters" header (variant: none, per variants.json)
 *    #selected-filters-container > div.selected-filters-header
 *      span.selected-filters-title + a.clear-all-filters
 *    One row for the title text, one row for the "Clear All" link.
 */

function iconName(span) {
  if (!span) return '';
  const cls = [...span.classList].find((c) => c.startsWith('icon-') && c.length > 5);
  return cls ? cls.slice(5).toLowerCase().replace(/[^a-z0-9-]/g, '-') : '';
}

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function makeLink(document, src, text) {
  const a = document.createElement('a');
  a.href = src.getAttribute('href') || '#';
  a.textContent = text;
  return a;
}

function parseBreadcrumb(element, document) {
  const cells = [];
  const items = [...element.querySelectorAll('ul > li')];
  const crumbs = items.length ? items : [...element.querySelectorAll('a[href], strong')];
  crumbs.forEach((item) => {
    const link = item.matches('a[href]') ? item : item.querySelector('a[href]');
    const text = clean((link || item).textContent);
    if (!text) return;
    if (link) {
      cells.push([makeLink(document, link, text)]);
    } else {
      // current page: plain text in its own row
      const p = document.createElement('p');
      p.textContent = text;
      cells.push([p]);
    }
  });
  return cells;
}

function parseFiltersHeader(element, document) {
  const cells = [];
  const title = element.querySelector('.selected-filters-title');
  const titleText = clean(title ? title.textContent : '');
  if (titleText) {
    const p = document.createElement('p');
    p.textContent = titleText;
    cells.push([p]);
  }
  element.querySelectorAll('a[href]').forEach((src) => {
    const text = clean(src.textContent);
    if (text) cells.push([makeLink(document, src, text)]);
  });
  return cells;
}

function parseIconLinks(element, document) {
  const cells = [];
  const items = [...element.querySelectorAll(':scope > .col')];
  const anchors = items.length
    ? items.map((col) => col.querySelector('a[href]')).filter(Boolean)
    : [...element.querySelectorAll('a[href]')];

  anchors.forEach((src) => {
    const label = clean((src.querySelector('.text-link') || src).textContent);
    if (!label) return;
    const icon = iconName(src.querySelector('span[class*="icon-"]'));
    cells.push([makeLink(document, src, icon ? `:${icon}: ${label}` : label)]);
  });
  return cells;
}

export default function parse(element, { document }) {
  const isBreadcrumb = element.matches('.breadcrumbs')
    || !!element.querySelector(':scope > ul.items > li.item.home');
  const isFiltersHeader = element.matches('.selected-filters-header')
    || !!element.querySelector(':scope > .selected-filters-title, :scope > .clear-all-filters');

  let cells;
  let name = 'tag-list';
  if (isBreadcrumb) {
    cells = parseBreadcrumb(element, document);
    name = 'tag-list (breadcrumb)';
  } else if (isFiltersHeader) {
    cells = parseFiltersHeader(element, document);
  } else {
    cells = parseIconLinks(element, document);
  }

  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
