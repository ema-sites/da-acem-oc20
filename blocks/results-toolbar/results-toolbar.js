/*
 * Results Toolbar block
 * Bar above a listing / reviews / questions list: result count on the left,
 * "Sort By" dropdown (and optionally a filter button) on the right.
 *
 * Authoring: one row.
 *   | 134 Results | Sort By | Relevance, Newest, Price |
 * Cells are classified by shape: a cell with a list or comma-separated choices
 * becomes the sort select (a bold choice is the default), the cell before it
 * its label, a link becomes a button (filter-button option), any other text
 * the result count. Changing the sort writes `?sort=` and dispatches
 * `results-toolbar:sort`.
 */

let toolbarId = 0;

function choicesOf(cell) {
  const list = cell.querySelector('ul, ol');
  if (list) return [...list.children].map((li) => li.textContent.trim()).filter(Boolean);
  const text = cell.textContent.trim();
  if (!text.includes(',')) return null;
  return text.split(',').map((s) => s.trim()).filter(Boolean);
}

export default function decorate(block) {
  toolbarId += 1;
  const cells = [...block.querySelectorAll(':scope > div > div')];

  const count = document.createElement('div');
  count.className = 'results-toolbar-count';
  const controls = document.createElement('div');
  controls.className = 'results-toolbar-controls';

  let pendingLabel = null;
  cells.forEach((cell, i) => {
    const choices = choicesOf(cell);
    if (choices && choices.length) {
      const id = `results-toolbar-sort-${toolbarId}`;
      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = pendingLabel || 'Sort By';
      pendingLabel = null;
      const select = document.createElement('select');
      select.id = id;
      const preferred = new URLSearchParams(window.location.search).get('sort')
        || cell.querySelector('strong, b')?.textContent.trim();
      choices.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        if (c === preferred) opt.selected = true;
        select.append(opt);
      });
      select.addEventListener('change', () => {
        block.dispatchEvent(new CustomEvent('results-toolbar:sort', { bubbles: true, detail: { value: select.value } }));
        const url = new URL(window.location.href);
        url.searchParams.set('sort', select.value);
        window.history.replaceState({}, '', url);
      });
      const wrap = document.createElement('div');
      wrap.className = 'results-toolbar-sort';
      wrap.append(label, select);
      controls.append(wrap);
      return;
    }
    const link = cell.querySelector('a');
    if (link) {
      link.classList.add('results-toolbar-button');
      controls.append(link);
      return;
    }
    const text = cell.textContent.trim();
    if (!text) return;
    const next = cells[i + 1];
    if (/sort/i.test(text) || (next && choicesOf(next) && count.childNodes.length)) {
      pendingLabel = text;
      return;
    }
    if (!count.childNodes.length) count.textContent = text;
    else controls.prepend(Object.assign(document.createElement('span'), { textContent: text }));
  });

  const parts = [];
  if (count.childNodes.length) parts.push(count);
  if (controls.childNodes.length) parts.push(controls);
  block.replaceChildren(...parts);
}
