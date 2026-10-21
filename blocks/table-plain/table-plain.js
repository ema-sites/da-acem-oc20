/*
 * Table Plain block
 * Unadorned data table (e.g. two-column cookie name / description reference).
 *
 * Authoring: first row is the header row (add the `no-header` option to treat
 * it as data); each further row is a table row. Rows may have differing cell
 * counts; short rows are padded so columns stay aligned.
 */

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const header = !block.classList.contains('no-header') && rows.length > 1;
  const columns = Math.max(...rows.map((r) => r.children.length), 1);

  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    const isHead = i === 0 && header;
    const cells = [...row.children];
    for (let c = 0; c < columns; c += 1) {
      const cell = document.createElement(isHead ? 'th' : 'td');
      if (isHead) cell.setAttribute('scope', 'col');
      if (cells[c]) cell.append(...cells[c].childNodes);
      tr.append(cell);
    }
    (isHead ? thead : tbody).append(tr);
  });

  if (thead.children.length) table.append(thead);
  table.append(tbody);

  const wrapper = document.createElement('div');
  wrapper.className = 'table-plain-scroll';
  wrapper.append(table);
  block.replaceChildren(wrapper);
}
