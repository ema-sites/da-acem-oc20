import { loadFragment } from '../fragment/fragment.js';
import { toClassName } from '../../scripts/aem.js';

/*
 * Product Details block
 * Long PDP body (Overview, Technical Specifications, Release Notes, Support,
 * Q&A, Reviews ...) with an in-page section nav and "Back to top" links.
 *
 * Authoring: one row per section.
 *   | Section title | section content (rich text, lists, links) |
 * A single-cell row uses its first heading as the section title; a single-cell
 * row with no heading is appended to the previous section (or becomes an intro).
 * If the content cell holds only a link to a fragment (/fragments/...), the
 * fragment is loaded in place, so a section can carry blocks (Q&A, reviews).
 * In a "Specifications"/"Details"/"Information" section, a list whose items are
 * all "Label: value" is rendered as a definition grid.
 * Options (alt, grey, dark-grey, dark, grey-2, grey-3, image-dark-grey) are
 * tonal variants styled in the design pass.
 */

let detailsId = 0;

function isFragmentLink(cell) {
  const links = cell.querySelectorAll('a');
  if (links.length !== 1) return null;
  const a = links[0];
  if (cell.textContent.trim() !== a.textContent.trim()) return null;
  try {
    const url = new URL(a.href, window.location.href);
    if (url.origin === window.location.origin && url.pathname.includes('/fragments/')) return url.pathname;
  } catch (e) {
    // ignore malformed href
  }
  return null;
}

/** Split `li` at its first ":" (keeping markup on both sides) into dt/dd. */
function splitPair(li) {
  const walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node && !node.textContent.includes(':')) node = walker.nextNode();
  if (!node) return null;
  const range = document.createRange();
  range.setStart(li, 0);
  range.setEnd(node, node.textContent.indexOf(':'));
  const dt = document.createElement('dt');
  dt.append(range.extractContents());
  node.textContent = node.textContent.replace(/^\s*:\s*/, '');
  const dd = document.createElement('dd');
  dd.append(...li.childNodes);
  dt.querySelectorAll('*').forEach((el) => { if (!el.textContent.trim()) el.remove(); });
  return [dt, dd];
}

// "Label: value" lists in a specifications-type section become a definition grid.
function decorateSpecs(title, content) {
  if (!/spec|detail|information/i.test(title)) return;
  content.querySelectorAll(':scope > ul').forEach((ul) => {
    const items = [...ul.children];
    const isPairs = items.every((li) => /^[^:]{1,60}:/.test(li.textContent.trim()));
    if (items.length < 2 || !isPairs) return;
    const dl = document.createElement('dl');
    dl.className = 'product-details-specs';
    items.forEach((li) => {
      const pair = splitPair(li);
      if (!pair) return;
      const wrap = document.createElement('div');
      wrap.append(...pair);
      dl.append(wrap);
    });
    ul.replaceWith(dl);
  });
}

export default async function decorate(block) {
  detailsId += 1;
  const blockId = block.id || `product-details-${detailsId}`;
  block.id = blockId;

  const sections = [];
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;
    let title = '';
    let content;
    if (cells.length >= 2 && cells[0].textContent.trim()) {
      title = cells[0].textContent.trim();
      [, content] = cells;
      cells.slice(2).forEach((c) => content.append(...c.childNodes));
    } else {
      content = cells.length >= 2 ? cells[1] : cells[0];
      const heading = content.querySelector(':scope > h1, :scope > h2, :scope > h3');
      if (heading) {
        title = heading.textContent.trim();
        heading.remove();
      }
    }
    if (!title && sections.length) {
      sections[sections.length - 1].content.append(...content.childNodes);
      return;
    }
    sections.push({ title, content });
  });

  const nav = document.createElement('nav');
  nav.className = 'product-details-nav';
  nav.setAttribute('aria-label', 'Product sections');
  const navList = document.createElement('ul');
  nav.append(navList);

  const body = document.createElement('div');
  body.className = 'product-details-body';

  const usedIds = new Set();
  const pending = [];
  sections.forEach(({ title, content }) => {
    const section = document.createElement('section');
    section.className = 'product-details-section';
    const panel = document.createElement('div');
    panel.className = 'product-details-content';

    if (title) {
      let id = `${blockId}-${toClassName(title) || 'section'}`;
      while (usedIds.has(id)) id += '-x';
      usedIds.add(id);
      section.id = id;
      section.setAttribute('aria-labelledby', `${id}-heading`);

      const header = document.createElement('div');
      header.className = 'product-details-section-header';
      const h2 = document.createElement('h2');
      h2.id = `${id}-heading`;
      h2.textContent = title;
      const top = document.createElement('a');
      top.className = 'product-details-top';
      top.href = `#${blockId}`;
      top.textContent = 'Back to top';
      header.append(h2, top);
      section.append(header);

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = title;
      li.append(a);
      navList.append(li);
    } else {
      section.classList.add('product-details-intro');
    }

    const fragmentPath = isFragmentLink(content);
    if (fragmentPath) {
      pending.push(loadFragment(fragmentPath).then((fragment) => {
        if (fragment) panel.append(...fragment.childNodes);
      }));
    } else {
      panel.append(...content.childNodes);
      decorateSpecs(title, panel);
    }
    section.append(panel);
    body.append(section);
  });

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState({}, '', a.getAttribute('href'));
  });

  block.replaceChildren(...(navList.children.length > 1 ? [nav, body] : [body]));
  await Promise.all(pending);
}
