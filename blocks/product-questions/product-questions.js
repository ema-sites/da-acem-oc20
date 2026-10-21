/*
 * Product Questions block
 * Customer Q&A list: author and date, question text, answer count and an
 * "Answer this Question" action; plus an optional header bar ("Questions" +
 * "Ask a question" button).
 *
 * Authoring:
 *   Header row (optional, one cell): heading/label and/or an action link.
 *   One row per question:
 *     | author · date | question text | answer count (number) | answer link (optional) |
 *   A row holding only links becomes the actions bar (e.g. "Be the first to ask
 *   a question"). Answers may follow as extra paragraphs in the question cell.
 * Options: ask-button-only, header-bar, header-bar-error-actions.
 */

function isLinkOnly(el) {
  const links = [...el.querySelectorAll('a')];
  if (!links.length) return false;
  return el.textContent.replace(/\s+/g, '') === links.map((a) => a.textContent).join('').replace(/\s+/g, '');
}

function buildActions(nodes) {
  const actions = document.createElement('div');
  actions.className = 'product-questions-actions';
  nodes.forEach((n) => {
    n.querySelectorAll('a').forEach((a) => {
      a.classList.add('button');
      actions.append(a);
    });
  });
  return actions;
}

function buildQuestion(cells) {
  const item = document.createElement('li');
  item.className = 'product-questions-item';
  const main = document.createElement('div');
  main.className = 'product-questions-main';

  const [meta, ...rest] = cells;
  const metaEl = document.createElement('div');
  metaEl.className = 'product-questions-meta';
  metaEl.append(...meta.childNodes);
  main.append(metaEl);

  let countEl = null;
  const actionNodes = [];
  rest.forEach((cell) => {
    const text = cell.textContent.trim();
    if (!text) return;
    if (/^\d[\d,]*(\s*answers?)?$/i.test(text) && !countEl) {
      countEl = document.createElement('div');
      countEl.className = 'product-questions-count';
      const [num] = text.match(/\d[\d,]*/);
      countEl.innerHTML = `<span class="product-questions-count-number">${num}</span><span class="product-questions-count-label">${Number(num.replace(/,/g, '')) === 1 ? 'answer' : 'answers'}</span>`;
      return;
    }
    if (isLinkOnly(cell)) {
      actionNodes.push(cell);
      return;
    }
    const body = document.createElement('div');
    body.className = 'product-questions-text';
    body.append(...cell.childNodes);
    main.append(body);
  });

  if (actionNodes.length) main.append(buildActions(actionNodes));
  item.append(main);
  if (countEl) item.append(countEl);
  return item;
}

export default function decorate(block) {
  const rows = [...block.children];
  const list = document.createElement('ul');
  list.className = 'product-questions-list';
  const parts = [];

  rows.forEach((row, idx) => {
    const cells = [...row.children].filter((c) => c.textContent.trim() || c.querySelector('a, picture'));
    if (!cells.length) return;

    if (cells.every((c) => isLinkOnly(c))) {
      parts.push({ type: 'actions', el: buildActions(cells) });
      return;
    }

    const hasHeading = cells.some((c) => c.querySelector('h1, h2, h3, h4, h5, h6'));
    const shortLabel = cells.every((c) => isLinkOnly(c) || c.textContent.trim().length < 40)
      && (cells.length === 1 || cells.some((c) => isLinkOnly(c)));
    const hasCount = cells.some((c) => /^\d[\d,]*(\s*answers?)?$/i.test(c.textContent.trim()));
    const isHeader = idx === 0 && (hasHeading || shortLabel) && !hasCount;
    if (isHeader) {
      const header = document.createElement('div');
      header.className = 'product-questions-header';
      const title = document.createElement('div');
      title.className = 'product-questions-title';
      const actions = [];
      cells.forEach((c) => {
        [...c.children].forEach((el) => (isLinkOnly(el) ? actions.push(el) : title.append(el)));
        if (!c.children.length) title.append(...c.childNodes);
      });
      if (title.childNodes.length) header.append(title);
      if (actions.length) header.append(buildActions(actions));
      parts.push({ type: 'header', el: header });
      return;
    }

    list.append(buildQuestion(cells));
  });

  const out = [];
  const header = parts.find((p) => p.type === 'header');
  if (header) out.push(header.el);
  if (list.children.length) out.push(list);
  parts.filter((p) => p.type === 'actions').forEach((p) => out.push(p.el));
  block.replaceChildren(...out);
}
