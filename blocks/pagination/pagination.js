/*
 * Pagination block
 * Listing footer: "Results per page" selector and, with the `page-numbers`
 * option or when page links are authored, a row of page number links.
 *
 * Authoring (rows in any order, all optional):
 *   | Results per page: | 12, 24, 36 |   label + choices (comma list or ul);
 *                                         a bold choice is the default
 *   | 1, 2, 3 ... Next Page links |      page links (list or paragraph of links);
 *                                         an unlinked or bold number is the current page
 *   | Param | limit |                     query parameter for the page size
 */

let paginationId = 0;

function parseChoices(cell) {
  const list = cell.querySelector('ul, ol');
  const bold = cell.querySelector('strong, b')?.textContent.trim();
  const raw = list
    ? [...list.children].map((li) => li.textContent.trim())
    : cell.textContent.split(/[,|/]/).map((s) => s.trim());
  return { choices: raw.filter(Boolean), preferred: bold };
}

function buildPageSize(label, cell, param) {
  const { choices, preferred } = parseChoices(cell);
  if (!choices.length) return null;
  paginationId += 1;
  const id = `pagination-size-${paginationId}`;

  const wrap = document.createElement('div');
  wrap.className = 'pagination-size';
  const lbl = document.createElement('label');
  lbl.htmlFor = id;
  lbl.textContent = label || 'Results per page:';
  const select = document.createElement('select');
  select.id = id;
  const current = new URLSearchParams(window.location.search).get(param) || preferred;
  choices.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    if (c === current) opt.selected = true;
    select.append(opt);
  });
  select.addEventListener('change', () => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, select.value);
    url.searchParams.delete('p');
    window.location.href = url.toString();
  });
  wrap.append(lbl, select);
  return wrap;
}

function buildPages(cell) {
  const nav = document.createElement('nav');
  nav.className = 'pagination-pages';
  nav.setAttribute('aria-label', 'Pagination');
  const ol = document.createElement('ol');

  const nodes = cell.querySelector('ul, ol')
    ? [...cell.querySelector('ul, ol').children]
    : [...cell.querySelectorAll('a, strong, b')];
  const seen = new Set();
  nodes.forEach((node) => {
    const el = node.matches('a') ? node : (node.querySelector('a') || node);
    if (seen.has(el)) return;
    seen.add(el);
    const text = el.textContent.trim();
    if (!text) return;
    const li = document.createElement('li');
    if (el.matches('a') && !el.closest('strong, b')) {
      const a = el.cloneNode(true);
      if (/next|prev/i.test(text)) li.classList.add(/next/i.test(text) ? 'pagination-next' : 'pagination-prev');
      li.append(a);
    } else {
      const span = document.createElement('span');
      span.className = 'pagination-current';
      span.setAttribute('aria-current', 'page');
      span.textContent = text;
      li.append(span);
    }
    ol.append(li);
  });
  if (!ol.children.length) return null;
  nav.append(ol);
  return nav;
}

export default function decorate(block) {
  let param = 'limit';
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2 && /^param/i.test(cells[0].textContent.trim())) {
      param = cells[1].textContent.trim() || param;
      row.dataset.config = 'true';
    }
  });

  const parts = [];
  rows.forEach((row) => {
    if (row.dataset.config) return;
    const cells = [...row.children];
    if (!cells.length) return;
    const hasLinks = row.querySelectorAll('a').length > 1;
    if (hasLinks) {
      const pages = buildPages(cells[cells.length - 1].querySelector('a') ? cells[cells.length - 1] : row);
      if (pages) parts.push(pages);
      return;
    }
    if (cells.length >= 2) {
      const size = buildPageSize(cells[0].textContent.trim(), cells[1], param);
      if (size) parts.push(size);
    } else {
      const size = buildPageSize('', cells[0], param);
      if (size) parts.push(size);
    }
  });

  block.replaceChildren(...parts);
}
