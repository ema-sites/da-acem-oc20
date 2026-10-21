import { createOptimizedPicture } from '../../scripts/aem.js';

/*
 * Product Buy Box block
 * Marketplace PDP purchase area: product header (logo, title, vendor, partner
 * badge, rating), image gallery with thumbnail strip, edition/version/support
 * selects, add-on checkboxes (installation service), price lines with a
 * running total, and Add to cart / Contact Vendor actions.
 *
 * Authoring: one row per part, label | value. Rows are classified by shape, so
 * any part may be omitted and order within the panel is kept.
 *   | logo | Title (heading), "by Vendor" link, "Silver Technology Partner" |   header
 *   | Gallery | image, image, image ... |                                       gallery
 *   | Edition | Adobe Commerce (cloud), Adobe Commerce (on-prem) | (or a list) select
 *   | [ ] Installation service | $10.00 |                                      checkbox
 *   | Product | $0.00 |  | Installation: | $0.00 |  | Total | $0.00 |          price lines
 *   | Add to cart (link) | Contact Vendor (link) |                             actions
 *   | 5.0 (7) |                                                                 rating
 *   | any other text (fee notice, support note, badges) |                      info
 * A select choice like "12 months support - $50.00" or a checkbox price feeds
 * the price line whose label starts with the same word; the Total line is
 * recomputed. Actions dispatch `product-buy-box:action` with the selection.
 * Many catalog options only record which parts a product has; structural
 * branches exist for: single-image, main-image-only, thumbnail-strip-only,
 * three-thumbnail-strip, gallery-after-panel, panel-first, wide-banner-gallery,
 * contact-only (and any option containing it), version-select-only,
 * price-line-only, installation-checkbox-only.
 */

let buyBoxId = 0;
const MONEY_RE = /([$€£¥])\s?(\d[\d,]*(?:\.\d+)?)/;
const RATING_RE = /^([★☆]{1,5})?\s*([0-5](?:\.\d+)?)?\s*(\(\s*\d[\d,]*\s*\))?$/;
const PRICE_ONLY_RE = /^\s*(?:[$€£¥]\s?\d[\d,]*(?:\.\d+)?|free)\s*(?:\/\s*\w+)?\s*$/i;
const CHECKBOX_RE = /^\s*(\[\s?[xX]?\s?\]|☐|☑|☒)\s*/;

const text = (el) => (el ? el.textContent.trim() : '');
const hasHeading = (el) => !!el.querySelector('h1, h2, h3, h4, h5, h6');
const lineKey = (label) => label.toLowerCase().replace(CHECKBOX_RE, '').trim().split(/[\s:]+/)[0];

function isLinkOnly(el) {
  const links = [...el.querySelectorAll('a')];
  if (!links.length) return false;
  return el.textContent.replace(/\s+/g, '') === links.map((a) => a.textContent).join('').replace(/\s+/g, '');
}

function parseMoney(str) {
  if (/^\s*free\s*$/i.test(str)) return { symbol: '', amount: 0 };
  const m = str.match(MONEY_RE);
  return m ? { symbol: m[1], amount: parseFloat(m[2].replace(/,/g, '')) } : null;
}

function parseRating(str) {
  const t = str.trim();
  if (!t || t.length > 24) return null;
  const m = t.match(RATING_RE);
  if (!m || (!m[1] && !m[2]) || (!m[1] && !m[3] && !m[2].includes('.'))) return null;
  return {
    value: m[2] ? parseFloat(m[2]) : (m[1].match(/★/g) || []).length,
    count: m[3] ? m[3].replace(/[()\s]/g, '') : '',
  };
}

function choicesOf(cell) {
  const list = cell.querySelector('ul, ol');
  if (list) return [...list.children].map((li) => li.textContent.trim()).filter(Boolean);
  const t = text(cell);
  return t.includes(',') ? t.split(',').map((s) => s.trim()).filter(Boolean) : null;
}

function classifyRow(cells) {
  const [first, second] = cells;
  const all = cells.map(text).join(' ');
  if (cells.some(hasHeading)) return 'header';
  if (cells.every((c) => isLinkOnly(c) || !text(c))) return 'actions';
  if (/^(gallery|images?|media|screenshots?)$/i.test(text(first))) return 'gallery';
  const pics = cells.reduce((n, c) => n + c.querySelectorAll('picture, img').length, 0);
  if (pics && !all.replace(/^(gallery|images?)/i, '').trim()) return 'gallery';
  if (CHECKBOX_RE.test(text(first)) || /^(checkbox|add-?on|option)$/i.test(text(first))) return 'checkbox';
  if (cells.length === 1 && parseRating(all)) return 'rating';
  if (second && cells.length === 2 && PRICE_ONLY_RE.test(text(second)) && text(first).length < 40) return 'price';
  if (second && (choicesOf(second) || /^select$/i.test(text(first)))) return 'select';
  return 'info';
}

function stars(value, count) {
  const wrap = document.createElement('div');
  wrap.className = 'product-buy-box-rating';
  const meter = document.createElement('span');
  meter.className = 'product-buy-box-stars';
  meter.setAttribute('role', 'img');
  meter.setAttribute('aria-label', `Rated ${value} out of 5`);
  for (let i = 1; i <= 5; i += 1) {
    const s = document.createElement('span');
    s.className = 'product-buy-box-star';
    if (value >= i) s.classList.add('full');
    else if (value > i - 1) s.classList.add('half');
    meter.append(s);
  }
  const score = document.createElement('span');
  score.className = 'product-buy-box-score';
  score.textContent = `${value.toFixed(1)}${count ? ` (${count})` : ''}`;
  wrap.append(meter, score);
  return wrap;
}

function buildHeader(cells) {
  const header = document.createElement('div');
  header.className = 'product-buy-box-header';
  const logo = document.createElement('div');
  logo.className = 'product-buy-box-logo';
  const info = document.createElement('div');
  info.className = 'product-buy-box-title';
  const aside = document.createElement('div');
  aside.className = 'product-buy-box-badges';

  cells.forEach((cell) => {
    const els = cell.children.length ? [...cell.children] : [cell];
    els.forEach((el) => {
      const t = text(el);
      if (el.querySelector('picture, img') && !t && !logo.childNodes.length && !info.childNodes.length) {
        logo.append(el);
      } else if (parseRating(t)) {
        const r = parseRating(t);
        aside.append(stars(r.value, r.count));
      } else if (/partner$/i.test(t) && t.length < 60) {
        el.classList.add('product-buy-box-partner');
        aside.prepend(el);
      } else if (t || el.querySelector('picture, img')) {
        if (/^by\s/i.test(t)) el.classList.add('product-buy-box-vendor');
        info.append(el);
      }
    });
  });
  [logo, info, aside].forEach((p) => { if (p.childNodes.length) header.append(p); });
  return header;
}

function buildGallery(cells, block) {
  const pictures = cells.flatMap((c) => [...c.querySelectorAll('picture')]);
  cells.forEach((c) => c.querySelectorAll('img:not(picture img)').forEach((img) => {
    const pic = document.createElement('picture');
    img.replaceWith(pic);
    pic.append(img);
    pictures.push(pic);
  }));
  if (!pictures.length) return null;

  const gallery = document.createElement('div');
  gallery.className = 'product-buy-box-gallery';
  const main = document.createElement('div');
  main.className = 'product-buy-box-main-image';
  main.append(pictures[0].cloneNode(true));
  gallery.append(main);

  if (pictures.length > 1) {
    const strip = document.createElement('div');
    strip.className = 'product-buy-box-thumbnails';
    const list = document.createElement('ul');
    pictures.forEach((pic, i) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'product-buy-box-thumb';
      btn.setAttribute('aria-label', `Show image ${i + 1} of ${pictures.length}`);
      if (i === 0) btn.setAttribute('aria-current', 'true');
      btn.append(pic);
      btn.addEventListener('click', () => {
        main.replaceChildren(pic.cloneNode(true));
        list.querySelectorAll('[aria-current]').forEach((b) => b.removeAttribute('aria-current'));
        btn.setAttribute('aria-current', 'true');
      });
      li.append(btn);
      list.append(li);
    });
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'product-buy-box-thumbs-prev';
    prev.setAttribute('aria-label', 'Previous images');
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'product-buy-box-thumbs-next';
    next.setAttribute('aria-label', 'Next images');
    const scrollBy = (dir) => list.scrollBy({ left: dir * list.clientWidth, behavior: 'smooth' });
    prev.addEventListener('click', () => scrollBy(-1));
    next.addEventListener('click', () => scrollBy(1));
    strip.append(prev, list, next);
    gallery.append(strip);
  } else {
    block.classList.add('has-single-image');
  }
  return gallery;
}

function buildSelect(cells, id) {
  const [labelCell, choiceCell] = cells;
  const choices = choicesOf(choiceCell) || [];
  const field = document.createElement('div');
  field.className = 'product-buy-box-field';
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = text(labelCell).replace(/:$/, '');
  const select = document.createElement('select');
  select.id = id;
  select.name = lineKey(label.textContent) || id;
  select.dataset.line = lineKey(label.textContent);
  const preferred = text(choiceCell.querySelector('strong, b'));
  choices.forEach((c, i) => {
    const opt = document.createElement('option');
    opt.textContent = c;
    opt.value = c;
    const money = parseMoney(c);
    if (money) opt.dataset.price = money.amount;
    // a leading "Choose ..." entry acts as an empty placeholder
    if (i === 0 && /^(choose|select)\b/i.test(c)) opt.value = '';
    if (c === preferred) opt.selected = true;
    select.append(opt);
  });
  field.append(label, select);
  return field;
}

function buildCheckbox(cells, id) {
  const [first, second] = cells;
  const raw = /^(checkbox|add-?on|option)$/i.test(text(first)) ? text(second) : text(first);
  const checked = /\[\s?[xX]\s?\]|☑|☒/.test(raw);
  const labelText = raw.replace(CHECKBOX_RE, '').trim();
  const priceSource = second && !/^(checkbox|add-?on|option)$/i.test(text(first)) ? text(second) : labelText;
  const money = parseMoney(priceSource);

  const field = document.createElement('div');
  field.className = 'product-buy-box-checkbox';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = id;
  input.checked = checked;
  input.name = lineKey(labelText) || id;
  input.dataset.line = lineKey(labelText);
  if (money) input.dataset.price = money.amount;
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = money && !MONEY_RE.test(labelText) && priceSource !== labelText
    ? `${labelText} ${priceSource}` : labelText;
  field.append(input, label);
  return field;
}

function buildPriceLine(cells) {
  const [labelCell, valueCell] = cells;
  const label = text(labelCell);
  const money = parseMoney(text(valueCell)) || { symbol: '', amount: 0 };
  const row = document.createElement('div');
  row.className = 'product-buy-box-price-line';
  row.dataset.line = lineKey(label);
  row.dataset.amount = money.amount;
  row.dataset.symbol = money.symbol;
  if (/^total/i.test(label)) row.classList.add('is-total');
  // recurring renewal price ("Then $x / year") is informational, not part of today's total
  if (/^then\b/i.test(label)) row.classList.add('is-recurring');
  const dt = document.createElement('dt');
  // the trailing colon is presentational (added in CSS), so keep labels bare
  dt.textContent = label.replace(/\s*:\s*$/, '');
  const dd = document.createElement('dd');
  dd.textContent = text(valueCell);
  row.append(dt, dd);
  return row;
}

function format(symbol, amount) {
  return `${symbol}${amount.toFixed(2)}`;
}

function bindPricing(panel) {
  const lines = [...panel.querySelectorAll('.product-buy-box-price-line')];
  if (!lines.length) return;
  const symbol = lines.find((l) => l.dataset.symbol)?.dataset.symbol || '$';
  const total = lines.find((l) => l.classList.contains('is-total'));

  const update = () => {
    panel.querySelectorAll('select[data-line], input[type="checkbox"][data-line]').forEach((ctl) => {
      const line = lines.find((l) => l.dataset.line === ctl.dataset.line && !l.classList.contains('is-total'));
      if (!line) return;
      let amount = 0;
      if (ctl.tagName === 'SELECT') amount = Number(ctl.selectedOptions[0]?.dataset.price || 0);
      else if (ctl.checked) amount = Number(ctl.dataset.price || 0);
      line.dataset.amount = amount;
      line.querySelector('dd').textContent = format(symbol, amount);
    });
    if (total) {
      const sum = lines.filter((l) => l !== total && !l.classList.contains('is-recurring'))
        .reduce((acc, l) => acc + Number(l.dataset.amount || 0), 0);
      total.dataset.amount = sum;
      total.querySelector('dd').textContent = format(symbol, sum);
    }
  };

  const controls = panel.querySelectorAll('select[data-line], input[type="checkbox"][data-line]');
  // only recompute if some control actually feeds a price line
  const feeds = [...controls].some((c) => lines.some((l) => l.dataset.line === c.dataset.line));
  if (!feeds) return;
  controls.forEach((c) => c.addEventListener('change', update));
}

function selection(panel) {
  const data = {};
  panel.querySelectorAll('select, input[type="checkbox"]').forEach((ctl) => {
    data[ctl.name] = ctl.type === 'checkbox' ? ctl.checked : ctl.value;
  });
  return data;
}

export default function decorate(block) {
  buyBoxId += 1;
  const media = document.createElement('div');
  media.className = 'product-buy-box-media';
  const panel = document.createElement('div');
  panel.className = 'product-buy-box-panel';
  const fields = document.createElement('div');
  fields.className = 'product-buy-box-fields';
  const prices = document.createElement('dl');
  prices.className = 'product-buy-box-prices';
  const actions = document.createElement('div');
  actions.className = 'product-buy-box-actions';

  const order = [];
  const place = (el) => { if (!order.includes(el)) order.push(el); };

  [...block.children].forEach((row, idx) => {
    const cells = [...row.children].filter((c) => text(c) || c.querySelector('a, picture, img, ul, ol'));
    if (!cells.length) return;
    const id = `product-buy-box-${buyBoxId}-${idx}`;
    switch (classifyRow(cells)) {
      case 'header':
        media.prepend(buildHeader(cells));
        break;
      case 'gallery': {
        const gallery = buildGallery(cells, block);
        if (gallery) media.append(gallery);
        break;
      }
      case 'select':
        fields.append(buildSelect(cells, id));
        place(fields);
        break;
      case 'checkbox':
        fields.append(buildCheckbox(cells, id));
        place(fields);
        break;
      case 'price':
        prices.append(buildPriceLine(cells));
        place(prices);
        break;
      case 'rating': {
        const r = parseRating(cells.map(text).join(' '));
        const header = media.querySelector('.product-buy-box-header');
        const el = stars(r.value, r.count);
        if (header) header.append(el); else { panel.append(el); place(el); }
        break;
      }
      case 'actions':
        cells.forEach((c) => c.querySelectorAll('a').forEach((a) => {
          // purchase links are the blue accent button, contact links the outlined one
          a.classList.add('button', /contact/i.test(text(a)) ? 'secondary' : 'accent');
          a.addEventListener('click', (e) => {
            const evt = new CustomEvent('product-buy-box:action', {
              bubbles: true,
              cancelable: true,
              detail: { action: text(a), href: a.href, selection: selection(panel) },
            });
            if (!block.dispatchEvent(evt)) e.preventDefault();
          });
          actions.append(a);
        }));
        place(actions);
        break;
      default: {
        const info = document.createElement('div');
        info.className = 'product-buy-box-info';
        cells.forEach((c) => {
          if (c.children.length) info.append(...c.childNodes);
          else if (text(c)) info.append(Object.assign(document.createElement('p'), { textContent: text(c) }));
        });
        place(info);
      }
    }
  });

  order.forEach((el) => panel.append(el));

  [media, panel].forEach((part) => part.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '900' }]));
  }));

  bindPricing(panel);

  const parts = [];
  if (media.childNodes.length) parts.push(media);
  if (panel.childNodes.length) parts.push(panel);
  block.replaceChildren(...parts);
}
