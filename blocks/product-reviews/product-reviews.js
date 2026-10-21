/*
 * Product Reviews block
 * Customer review entries: star rating, author and age, optional "Verified
 * Purchaser" badge, review title and text, per-criterion ratings, and
 * "Helpful? Yes · n / No · n / Report" voting.
 *
 * Authoring: one row per review. Cells are classified by shape, so any may be
 * omitted or reordered after the first:
 *   | rating + author · date (+ "Verified Purchaser") |
 *   | title (bold or heading) + review text |
 *   | criteria list (Usefulness, Functions as Described, ...; "Name: 4" for a score) |
 *   | helpful counts, e.g. "Yes 1, No 0" |
 *   | action links (Comment) |
 * Rating forms: "★★★★★", "5", "4.5/5", "Rating: 4".
 * Votes dispatch a `product-reviews:vote` event; no backend is called.
 */

const STAR_RE = /^\s*([★☆]{1,5})/;
const NUM_RE = /^\s*(?:rating[:\s]*)?([0-5](?:\.\d+)?)\s*(?:\/\s*5|stars?)?(?=\s|$|·|-)/i;

function starMeter(value, cls) {
  const wrap = document.createElement('span');
  wrap.className = cls;
  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', `Rated ${value} out of 5`);
  for (let i = 1; i <= 5; i += 1) {
    const s = document.createElement('span');
    s.className = 'product-reviews-star';
    if (value >= i) s.classList.add('full');
    else if (value > i - 1) s.classList.add('half');
    wrap.append(s);
  }
  return wrap;
}

/** Strip a leading rating from the first text node of `cell`; return its value. */
function extractRating(cell) {
  const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node && !node.textContent.trim()) node = walker.nextNode();
  if (!node) return null;
  const text = node.textContent;
  let m = text.match(STAR_RE);
  if (m) {
    node.textContent = text.slice(m[0].length);
    return (m[1].match(/★/g) || []).length;
  }
  m = text.match(NUM_RE);
  if (m) {
    node.textContent = text.slice(m[0].length);
    return parseFloat(m[1]);
  }
  return null;
}

function isLinkOnly(el) {
  const links = [...el.querySelectorAll('a')];
  if (!links.length) return false;
  return el.textContent.replace(/\s+/g, '') === links.map((a) => a.textContent).join('').replace(/\s+/g, '');
}

function buildHelpful(text) {
  const yes = (text.match(/yes\D*(\d+)/i) || [])[1] || '0';
  const no = (text.match(/no\D*(\d+)/i) || [])[1] || '0';
  const bar = document.createElement('div');
  bar.className = 'product-reviews-helpful';
  bar.innerHTML = `<span class="product-reviews-helpful-label">Helpful?</span>
    <button type="button" class="product-reviews-vote" data-vote="yes">Yes · <span>${yes}</span></button>
    <button type="button" class="product-reviews-vote" data-vote="no">No · <span>${no}</span></button>
    <button type="button" class="product-reviews-report" data-vote="report">Report</button>`;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn || btn.disabled) return;
    const { vote } = btn.dataset;
    if (vote !== 'report') {
      const n = btn.querySelector('span');
      n.textContent = Number(n.textContent) + 1;
      bar.querySelectorAll('.product-reviews-vote').forEach((b) => { b.disabled = true; });
    } else {
      btn.disabled = true;
    }
    btn.setAttribute('aria-pressed', 'true');
    bar.dispatchEvent(new CustomEvent('product-reviews:vote', { bubbles: true, detail: { vote } }));
  });
  return bar;
}

function buildCriteria(list) {
  const dl = document.createElement('dl');
  dl.className = 'product-reviews-criteria';
  [...list.children].forEach((li) => {
    const [name, score] = li.textContent.split(/[:–-]\s*(?=[\d★☆])/);
    const dt = document.createElement('dt');
    dt.textContent = name.trim();
    const dd = document.createElement('dd');
    const value = score ? parseFloat(score) || (score.match(/★/g) || []).length : null;
    if (value) dd.append(starMeter(value, 'product-reviews-criterion-stars'));
    dl.append(dt, dd);
  });
  return dl;
}

function buildReview(row) {
  const cells = [...row.children].filter((c) => c.textContent.trim() || c.querySelector('a, picture'));
  const li = document.createElement('li');
  li.className = 'product-reviews-item';
  if (!cells.length) return null;

  const [metaCell, ...rest] = cells;
  const header = document.createElement('div');
  header.className = 'product-reviews-header';
  const rating = extractRating(metaCell);
  if (rating !== null) header.append(starMeter(rating, 'product-reviews-stars'));

  const meta = document.createElement('div');
  meta.className = 'product-reviews-meta';
  let verified = null;
  [...metaCell.children].forEach((el) => {
    if (/verified/i.test(el.textContent) && el.textContent.trim().length < 40) verified = el;
  });
  if (verified) {
    verified.remove();
    const badge = document.createElement('span');
    badge.className = 'product-reviews-verified';
    badge.textContent = verified.textContent.trim();
    header.append(meta, badge);
    li.classList.add('is-verified');
  } else {
    header.append(meta);
  }
  meta.append(...metaCell.childNodes);
  li.append(header);

  const content = document.createElement('div');
  content.className = 'product-reviews-content';
  const body = document.createElement('div');
  body.className = 'product-reviews-body';
  const footer = document.createElement('div');
  footer.className = 'product-reviews-footer';

  rest.forEach((cell) => {
    const text = cell.textContent.trim();
    const list = cell.querySelector('ul, ol');
    if (list && [...list.children].every((i) => i.textContent.trim().length < 60)) {
      content.append(buildCriteria(list));
      return;
    }
    if (/^(helpful\??\s*)?yes\D*\d+.*no\D*\d+/i.test(text)) {
      footer.prepend(buildHelpful(text));
      return;
    }
    if (isLinkOnly(cell)) {
      const actions = document.createElement('div');
      actions.className = 'product-reviews-actions';
      cell.querySelectorAll('a').forEach((a) => actions.append(a));
      footer.append(actions);
      return;
    }
    if (cell.children.length === 0) {
      const p = document.createElement('p');
      p.append(...cell.childNodes);
      body.append(p);
    } else {
      body.append(...cell.childNodes);
    }
  });

  const first = body.firstElementChild;
  if (first && (/^H[1-6]$/.test(first.tagName)
    || (first.querySelector(':scope > strong:only-child, :scope > b:only-child')
      && first.textContent.trim() === first.querySelector('strong, b').textContent.trim()))) {
    first.classList.add('product-reviews-title');
    li.append(first);
  }
  if (body.childNodes.length) content.prepend(body);
  if (content.childNodes.length) li.append(content);
  if (footer.childNodes.length) li.append(footer);
  return li;
}

export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'product-reviews-list';
  [...block.children].forEach((row) => {
    const review = buildReview(row);
    if (review) list.append(review);
  });
  block.replaceChildren(list);
}
