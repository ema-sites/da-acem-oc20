/* eslint-disable */
/* global WebImporter */

/**
 * Parser for product-details (extension / theme PDP body).
 *
 * Source: #maincontent .product-info-details-container > div:nth-child(2)
 *   nav.product-page-left-navigation ("CONTENTS")   -> dropped (the block builds its own nav)
 *   .product.info.detailed .product-data__item       -> one row per section
 *     .box-head h3                                   -> section title ("Back to top" dropped)
 *     [data-role="content"]                          -> section content
 *       .technical-specs-section h3 + p...           -> "Label: value" list (Trader Information,
 *                                                       Technical Specifications, Quality Report)
 *       .product.attribute.description .value        -> Overview rich text
 *       #release_notes h3 + ul                       -> version entries
 *       [data-bv-show="questions"]                   -> Bazaarvoice Q&A -> questions + answers
 *       [data-bv-show="reviews"]                     -> Bazaarvoice reviews -> review list
 *
 * Target (blocks/product-details/product-details.js): one row per section
 *   | Section title | section content (rich text, lists, links) |
 * "Label: value" lists in Specifications / Information sections render as a grid.
 *
 * Skipped: empty sections (e.g. Trader Information loaded client-side, Reviews with
 * no reviews), hidden elements (display:none documentation links), BV widget chrome
 * (sort menus, filters, feedback buttons). Links stay absolute; the cleanup
 * transformer rewrites same-site links.
 *
 * Variant: catalog options (alt, grey, ...) are capture-time colour noise, so the
 * plain block is always used.
 */

const SITE = 'https://commercemarketplace.adobe.com';
const squash = (s) => (s || '').replace(/\s+/g, ' ').trim();
const BLOCK_TAGS = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'TABLE', 'PRE', 'BLOCKQUOTE', 'HR', 'FIGURE', 'DL']);

function abs(url) {
  if (!url || url.startsWith('#') || /^(mailto|tel|javascript):/i.test(url)) return url;
  try { return new URL(url, SITE).href; } catch (e) { return url; }
}

function isHiddenStyle(el) {
  return /display:\s*none/i.test(el.getAttribute('style') || '');
}

function el(document, tag, text) {
  const e = document.createElement(tag);
  if (text != null) e.textContent = text;
  return e;
}

// Remove non-content nodes, hidden elements, comments; absolutize links/images.
function sanitize(document, root) {
  root.querySelectorAll('script, style, noscript, link, meta, button, input, select, form, svg').forEach((n) => n.remove());
  root.querySelectorAll('[style]').forEach((n) => { if (n.parentNode && isHiddenStyle(n)) n.remove(); });
  root.querySelectorAll('[style], [id]').forEach((n) => { n.removeAttribute('style'); n.removeAttribute('id'); });
  const walker = document.createTreeWalker(root, 128 /* NodeFilter.SHOW_COMMENT */);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((c) => c.remove());
  root.querySelectorAll('iframe[src], video[src], video source[src]').forEach((f) => {
    const src = abs(f.getAttribute('src'));
    const target = f.tagName === 'SOURCE' ? f.closest('video') : f;
    const p = el(document, 'p');
    const a = el(document, 'a', src);
    a.href = src;
    p.append(a);
    if (target && target.parentNode) target.replaceWith(p);
  });
  root.querySelectorAll('a[href]').forEach((a) => a.setAttribute('href', abs(a.getAttribute('href'))));
  root.querySelectorAll('img[src]').forEach((img) => img.setAttribute('src', abs(img.getAttribute('src'))));
  // vendor pseudo-headings (<p class="heading1|heading2">) are headings on the source
  root.querySelectorAll('p.heading1, p.heading2').forEach((p) => {
    const h = el(document, p.classList.contains('heading1') ? 'h2' : 'h3');
    h.innerHTML = p.innerHTML;
    p.replaceWith(h);
  });
  // <br> directly inside lists is invalid and breaks list conversion
  root.querySelectorAll('ul > br, ol > br').forEach((br) => br.remove());
  // labels like "<b>Compatible with X   :</b>" -> "Compatible with X:"
  root.querySelectorAll('b, strong').forEach((b) => {
    if (b.children.length) return;
    const t = squash(b.textContent).replace(/\s+:$/, ':');
    if (t !== b.textContent) b.textContent = t;
  });
}

// Unwrap div/span/section wrappers; group loose inline content into <p>.
function flatten(document, root) {
  const out = [];
  let para = null;
  const flush = () => { if (para && squash(para.textContent) || (para && para.querySelector('img, a'))) out.push(para); para = null; };
  const visit = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        if (!n.textContent.trim()) { if (para) para.append(n); return; }
        if (!para) para = el(document, 'p');
        para.append(n);
        return;
      }
      if (n.nodeType !== 1) return;
      if (['DIV', 'SECTION', 'ARTICLE', 'MAIN', 'ASIDE', 'HEADER', 'FOOTER', 'CENTER', 'FONT'].includes(n.tagName)) {
        flush();
        visit(n);
        flush();
        return;
      }
      if (BLOCK_TAGS.has(n.tagName)) {
        flush();
        if (n.tagName === 'P' && !squash(n.textContent) && !n.querySelector('img, a, iframe')) return;
        out.push(n);
        return;
      }
      if (n.tagName === 'BR' && !para) return;
      if (!para) para = el(document, 'p');
      para.append(n);
    });
  };
  visit(root);
  flush();
  return out;
}

// .technical-specs-section: h3 label followed by value paragraphs -> "Label: value" items.
function specsToList(document, box) {
  const groups = [...box.querySelectorAll('.technical-specs')];
  if (!groups.length) return;
  const ul = el(document, 'ul');
  groups.forEach((group) => {
    group.querySelectorAll('h3, h4').forEach((h) => {
      const label = squash(h.textContent).replace(/:$/, '');
      const values = [];
      let sib = h.nextElementSibling;
      while (sib && !/^H[1-6]$/.test(sib.tagName)) {
        if (squash(sib.textContent) || sib.querySelector('img')) values.push(sib);
        sib = sib.nextElementSibling;
      }
      if (!label || !values.length) return;
      const li = el(document, 'li');
      li.append(el(document, 'strong', label), ': ');
      values.forEach((v, i) => {
        if (i) li.append(el(document, 'br'));
        const nodes = v.tagName === 'P' || v.tagName === 'DIV' ? [...v.childNodes] : [v];
        // trim leading/trailing whitespace text nodes
        nodes.forEach((n) => {
          if (n.nodeType === 3) {
            const t = n.textContent.replace(/\s+/g, ' ');
            if (t.trim()) li.append(document.createTextNode(t));
          } else if (n.nodeType === 1) {
            if (n.tagName === 'A') n.textContent = squash(n.textContent);
            li.append(n);
          }
        });
      });
      // collapse edge whitespace
      if (li.lastChild && li.lastChild.nodeType === 3) li.lastChild.textContent = li.lastChild.textContent.replace(/\s+$/, '');
      ul.append(li);
    });
  });
  groups[0].replaceWith(ul);
  groups.slice(1).forEach((g) => g.remove());
  if (!ul.children.length) ul.remove();
}

function bvMeta(item) {
  const author = squash((item.querySelector('.bv-author [itemprop="name"], .bv-author') || {}).textContent);
  const date = squash((item.querySelector('.bv-content-datetime-stamp') || {}).textContent);
  return [author, date].filter(Boolean).join(' · ');
}

function bvBody(document, item) {
  const body = item.querySelector(':scope .bv-content-summary-body-text');
  if (!body) return [];
  const clone = body.cloneNode(true);
  sanitize(document, clone);
  return flatten(document, clone);
}

function buildQuestions(document, box) {
  const out = [];
  const items = [...box.querySelectorAll('li.bv-content-question, li.bv-content-item.bv-content-top-question')];
  if (!items.length) {
    const cta = box.querySelector('.bv-ask-question-label, .bv-ask-question');
    out.push(el(document, 'p', squash(cta && cta.textContent) || 'Be the first to ask a question'));
    return out;
  }
  items.forEach((q) => {
    const title = squash((q.querySelector('.bv-content-title-container .bv-content-title, h3.bv-content-title') || {}).textContent);
    if (!title) return;
    out.push(el(document, 'h3', title));
    const meta = bvMeta(q.querySelector('.bv-content-header') || q);
    if (meta) {
      const p = el(document, 'p');
      p.append(el(document, 'em', meta));
      out.push(p);
    }
    q.querySelectorAll('li.bv-secondary-content-answer').forEach((ans) => {
      const p = el(document, 'p');
      const who = bvMeta(ans);
      p.append(el(document, 'strong', 'Answer'));
      if (who) p.append(` (${who})`);
      out.push(p);
      out.push(...bvBody(document, ans));
    });
  });
  return out;
}

function buildReviews(document, box) {
  const out = [];
  box.querySelectorAll('li.bv-content-review, li.bv-content-item.bv-content-top-review').forEach((r) => {
    const title = squash((r.querySelector('h3.bv-content-title') || {}).textContent);
    const ratingMeta = r.querySelector('[itemprop="reviewRating"] meta[itemprop="ratingValue"]');
    const ratingAbbr = r.querySelector('abbr.bv-rating[title]');
    let rating = ratingMeta ? ratingMeta.getAttribute('content') : '';
    if (!rating && ratingAbbr) rating = (ratingAbbr.getAttribute('title').match(/^(\d(?:\.\d)?)/) || [])[1] || '';
    out.push(el(document, 'h3', title || (rating ? `${rating} out of 5 stars` : 'Review')));
    const meta = [rating && title ? `${rating} out of 5 stars` : '', bvMeta(r)].filter(Boolean).join(' · ');
    if (meta) {
      const p = el(document, 'p');
      p.append(el(document, 'em', meta));
      out.push(p);
    }
    out.push(...bvBody(document, r));
  });
  return out;
}

function buildContent(document, box) {
  if (box.querySelector('[data-bv-show="questions"], #BVQAContainer')) return buildQuestions(document, box);
  if (box.querySelector('[data-bv-show="reviews"], #BVRRContainer')) return buildReviews(document, box);
  const clone = box.cloneNode(true);
  sanitize(document, clone);
  specsToList(document, clone);
  return flatten(document, clone);
}

export default function parse(element, { document }) {
  const cells = [];
  const items = [...element.querySelectorAll('.product-data__item')];

  items.forEach((item) => {
    const head = item.querySelector('.box-head');
    const titleEl = head ? head.querySelector('h1, h2, h3, h4') : null;
    const title = squash(titleEl ? titleEl.textContent : '');
    const box = item.querySelector('[data-role="content"]') || item.querySelector('.box');
    if (!title || !box) return;
    const content = buildContent(document, box);
    const meaningful = content.some((n) => squash(n.textContent) || (n.querySelector && n.querySelector('img')));
    if (!meaningful) return;
    cells.push([title, content]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'product-details', cells });
  element.replaceWith(block);
}
