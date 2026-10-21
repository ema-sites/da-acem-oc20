/* eslint-disable */
/* global WebImporter */
/**
 * Parser for table-plain.
 * Source: <table class="data-table data-table-definition-list"> with a <thead>
 * header row (th | th) and body rows (th | td).
 * Output (EDS Table convention): first row = block name; each further row = one
 * source table row, header row kept as the first data row.
 */
export default function parse(element, { document }) {
  const table = element.matches('table') ? element : element.querySelector('table');
  if (!table) return;

  // Document-order rows; scoped so nested tables are not double-selected.
  const rows = [...table.querySelectorAll(':scope > thead > tr, :scope > tbody > tr, :scope > tfoot > tr, :scope > tr')];

  const sourceRows = rows
    .map((tr) => [...tr.querySelectorAll(':scope > th, :scope > td')])
    .filter((cellEls) => cellEls.some((c) => c.textContent.trim() || c.querySelector('img, a, picture')));

  if (!sourceRows.length) return;

  const columns = Math.max(...sourceRows.map((r) => r.length), 1);

  const cells = sourceRows.map((cellEls) => {
    const row = cellEls.map((cellEl) => {
      const nodes = [...cellEl.childNodes];
      return nodes.length ? nodes : '';
    });
    while (row.length < columns) row.push('');
    return row;
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-plain', cells });
  element.replaceWith(block);
}
