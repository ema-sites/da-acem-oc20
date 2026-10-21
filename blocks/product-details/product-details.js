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
 * In a "Specifications"/"Details"/"Information"/"Quality Report" section, a list whose
 * items are all "Label: value" is rendered as a three-column definition grid.
 * In Q & A / Reviews sections the italic "author · date" line moves above its title,
 * "N out of 5 stars" gets a star rating, and a text-only cell ("Be the first to ask
 * a question") is wrapped in a paragraph. Sections carry data-section="<title>" and the
 * nav marks the section in view (li.is-selected, aria-current).
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
  // multi-line values ("a<br>b") become one paragraph per line, as on the source
  if (dd.querySelector(':scope > br')) {
    const lines = [[]];
    [...dd.childNodes].forEach((n) => {
      if (n.nodeName === 'BR') lines.push([]);
      else lines[lines.length - 1].push(n);
    });
    dd.replaceChildren(...lines
      .filter((nodes) => nodes.some((n) => n.textContent.trim()))
      .map((nodes) => {
        const p = document.createElement('p');
        p.append(...nodes);
        return p;
      }));
  }
  return [dt, dd];
}

const SPEC_COLUMNS = 3;

// "Label: value" lists in a specifications-type section become a definition grid,
// split in order into up to three columns (source .technical-specs-section).
function decorateSpecs(title, content) {
  if (!/spec|detail|information|quality|report/i.test(title)) return;
  content.querySelectorAll(':scope > ul').forEach((ul) => {
    const items = [...ul.children];
    const isPairs = items.every((li) => /^[^:]{1,60}:/.test(li.textContent.trim()));
    if (items.length < 2 || !isPairs) return;
    const pairs = items.map(splitPair).filter(Boolean);
    const grid = document.createElement('div');
    grid.className = 'product-details-specs';
    let start = 0;
    for (let col = SPEC_COLUMNS; col > 0 && start < pairs.length; col -= 1) {
      const size = Math.ceil((pairs.length - start) / col);
      const dl = document.createElement('dl');
      pairs.slice(start, start + size).forEach((pair) => {
        const wrap = document.createElement('div');
        wrap.append(...pair);
        dl.append(wrap);
      });
      grid.append(dl);
      start += size;
    }
    ul.replaceWith(grid);
  });
}

// Q&A / review entries: the italic "author · date" line under each title is shown
// above it (source order); "N out of 5 stars" lines also get a visual star rating.
function decorateEntries(title, content) {
  if (!/q\s*&\s*a|question|review/i.test(title)) return;
  // a lone plain paragraph is the empty state ("Be the first to ask a question")
  const only = content.children.length === 1 ? content.firstElementChild : null;
  if (only && only.tagName === 'P' && !only.children.length) {
    only.classList.add('product-details-empty');
    return;
  }
  content.querySelectorAll(':scope > p > em:only-child').forEach((em) => {
    const p = em.parentElement;
    if (p.textContent.trim() !== em.textContent.trim()) return;
    p.classList.add('product-details-meta');
    const heading = p.previousElementSibling;
    if (heading && /^H[2-6]$/.test(heading.tagName)) heading.before(p);
    const match = em.textContent.trim().match(/^([0-5]) out of 5 stars/i);
    if (!match) return;
    const stars = document.createElement('span');
    stars.className = 'product-details-stars';
    stars.setAttribute('aria-hidden', 'true');
    stars.textContent = '★'.repeat(Number(match[1]));
    em.before(stars);
    // the "N out of 5 stars" text stays for screen readers only (source bv-off-screen)
    const rest = em.textContent.trim().slice(match[0].length).replace(/^\s*·\s*/, '');
    if (rest) {
      const sr = document.createElement('span');
      sr.className = 'product-details-sr';
      sr.textContent = `${match[0]} · `;
      em.replaceChildren(sr, rest);
    }
  });
  // "Answer (vendor · date)" lines and the entry texts
  content.querySelectorAll(':scope > p:not(.product-details-meta, .product-details-empty)').forEach((p) => {
    const first = p.firstElementChild;
    const isAnswer = first && first.tagName === 'STRONG' && /^answer/i.test(first.textContent.trim())
      && p.textContent.trim().startsWith(first.textContent.trim());
    p.classList.add(isAnswer ? 'product-details-answer' : 'product-details-text');
  });
}

// Keep the nav entry of the section in view marked as current.
function trackCurrent(nav, sections) {
  const links = [...nav.querySelectorAll('a')];
  if (!links.length) return;
  const setCurrent = (id) => {
    links.forEach((a) => {
      const on = a.getAttribute('href') === `#${id}`;
      a.parentElement.classList.toggle('is-selected', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };
  setCurrent(sections[0].id);
  let ticking = false;
  const update = () => {
    ticking = false;
    const offset = 200;
    let current = sections[0];
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= offset) current = s;
    });
    setCurrent(current.id);
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });
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
  const navTitle = document.createElement('p');
  navTitle.className = 'product-details-nav-title';
  navTitle.textContent = 'Contents';
  const navList = document.createElement('ul');
  nav.append(navTitle, navList);

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
      section.dataset.section = toClassName(title);
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
      // bare text (e.g. "Be the first to ask a question") gets a paragraph to style
      if (!panel.children.length && panel.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = panel.textContent.trim();
        panel.replaceChildren(p);
      }
      decorateSpecs(title, panel);
      decorateEntries(title, panel);
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

  const hasNav = navList.children.length > 1;
  block.replaceChildren(...(hasNav ? [nav, body] : [body]));
  if (hasNav) trackCurrent(nav, [...body.querySelectorAll(':scope > .product-details-section[id]')]);
  await Promise.all(pending);
}
