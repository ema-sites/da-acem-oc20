/*
 * Active Filter block
 * A heading bar for a listing: the active filter / result-set label on the left
 * and its action links (remove filter, clear all, back to top) on the right.
 *
 * Authoring: one row per bar. First cell: label or heading (a paragraph holding
 * only a link is treated as an action). Any further cells: actions.
 */

function isLinkOnly(el) {
  const a = el.tagName === 'A' ? el : el.querySelector(':scope > a:only-child');
  return !!a && el.textContent.trim() === a.textContent.trim();
}

export default function decorate(block) {
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    row.classList.add('active-filter-bar');
    const cells = [...row.querySelectorAll(':scope > div')];
    if (!cells.length) return;

    const label = document.createElement('div');
    label.className = 'active-filter-label';
    const actions = document.createElement('div');
    actions.className = 'active-filter-actions';

    const [first, ...rest] = cells;
    const children = [...first.children];
    const hasLabel = children.some((el) => !isLinkOnly(el)) || !children.length;
    if (hasLabel) {
      children.forEach((el) => (isLinkOnly(el) ? actions : label).append(el));
      // bare text nodes (no wrapping <p>)
      if (!children.length) label.append(...first.childNodes);
    } else {
      // first cell is only links: they are chips / actions
      actions.append(...first.childNodes);
    }
    rest.forEach((cell) => actions.append(...cell.childNodes));

    actions.querySelectorAll('a').forEach((a) => {
      a.classList.add('active-filter-action');
      const href = a.getAttribute('href');
      if (/back to top/i.test(a.textContent) && (!href || href === '#')) {
        a.setAttribute('href', '#');
        a.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    });

    const content = [];
    if (label.childNodes.length) content.push(label);
    if (actions.childNodes.length) content.push(actions);
    row.replaceChildren(...content);
  });
}
