/*
 * Tag List block
 * Row of tag / category links, optionally with an icon above each label.
 * With the `breadcrumb` option the same links render as a breadcrumb trail.
 *
 * Authoring: links in any arrangement — one per cell, one per row, or a list.
 * An icon (`:name:` token / span.icon) or image placed inside a link, next to
 * it in the same cell, or alone in the cell before it becomes that link's icon.
 * In breadcrumb mode trailing plain text is the current page.
 */
import { decorateIcons } from '../../scripts/aem.js';

const ICON_TOKEN = /(^|\s):([a-z][a-z0-9-]*):(?=\s|$)/gi;
const ICON_SELECTOR = 'span.icon, picture, img:not(picture img):not(.icon img)';

/**
 * Turns raw `:name:` tokens (left as text when content is not run through the
 * DA icon conversion, e.g. local preview) into `span.icon.icon-name`.
 */
function convertIconTokens(block) {
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    ICON_TOKEN.lastIndex = 0;
    if (ICON_TOKEN.test(walker.currentNode.nodeValue)) nodes.push(walker.currentNode);
  }
  nodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    let last = 0;
    const text = node.nodeValue;
    text.replace(ICON_TOKEN, (match, lead, name, offset) => {
      frag.append(text.slice(last, offset) + lead);
      const span = document.createElement('span');
      span.className = `icon icon-${name.toLowerCase()}`;
      frag.append(span);
      last = offset + match.length;
      return match;
    });
    frag.append(text.slice(last).replace(/^\s+/, ''));
    node.replaceWith(frag);
  });
  decorateIcons(block);
}

function collectItems(block) {
  const items = [];
  let pendingIcon = null;
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const units = cell.querySelector('ul, ol') ? [...cell.querySelectorAll('li')] : [cell];
    units.forEach((unit) => {
      const links = [...unit.querySelectorAll('a')];
      if (!links.length) {
        const pics = [...unit.querySelectorAll(ICON_SELECTOR)];
        if (pics.length && !unit.textContent.trim()) {
          [pendingIcon] = pics;
          return;
        }
        // plain text segments (breadcrumb current page); split on separators
        unit.textContent.split(/\s[>/›»]\s|\n/).map((t) => t.trim()).filter((t) => t && !/^[>/›»]$/.test(t))
          .forEach((text) => items.push({ text }));
        return;
      }
      const outside = [...unit.querySelectorAll(ICON_SELECTOR)].filter((p) => !p.closest('a'));
      links.forEach((a, i) => {
        const inside = a.querySelector(ICON_SELECTOR);
        const icon = inside || outside[i] || (i === 0 ? pendingIcon : null);
        items.push({ link: a, icon });
      });
      pendingIcon = null;
    });
  });
  return items;
}

function buildLink(a, icon) {
  a.classList.add('tag-list-link');
  // titles auto-filled from the link text would otherwise still carry the `:name:` token
  if (a.title) a.title = a.title.replace(ICON_TOKEN, '$1').trim();
  if (!icon) return a;
  const wrap = document.createElement('span');
  wrap.className = 'tag-list-icon';
  wrap.append(icon);
  const label = document.createElement('span');
  label.className = 'tag-list-label';
  label.append(...a.childNodes);
  label.normalize();
  if (label.firstChild?.nodeType === Node.TEXT_NODE) {
    label.firstChild.nodeValue = label.firstChild.nodeValue.replace(/^\s+/, '');
  }
  a.replaceChildren(wrap, label);
  return a;
}

export default function decorate(block) {
  const breadcrumb = block.classList.contains('breadcrumb');
  convertIconTokens(block);
  const items = collectItems(block);
  const list = document.createElement(breadcrumb ? 'ol' : 'ul');
  list.className = 'tag-list-items';

  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'tag-list-item';
    if (item.link) {
      li.append(buildLink(item.link, item.icon));
    } else {
      const span = document.createElement('span');
      span.textContent = item.text;
      li.append(span);
    }
    if (breadcrumb && idx === items.length - 1) {
      (li.querySelector('a, span')).setAttribute('aria-current', 'page');
    }
    list.append(li);
  });

  if (breadcrumb) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Breadcrumb');
    nav.append(list);
    block.replaceChildren(nav);
    return;
  }

  const links = items.filter((item) => item.link);
  if (links.length && links.every((item) => item.icon)) block.classList.add('has-icons');
  block.replaceChildren(list);
}
