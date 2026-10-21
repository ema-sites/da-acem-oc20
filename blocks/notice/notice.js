/*
 * Notice block
 * Bordered callout box of notice text (category policy notes, location
 * restrictions, warnings).
 *
 * Authoring: one or more rows, one cell each, holding rich text and links.
 * A heading at the top becomes the notice title.
 * Options: `location` (regional availability note), `warning` (alert tone,
 * announced to assistive tech with role="alert" semantics kept polite).
 */

export default function decorate(block) {
  const content = document.createElement('div');
  content.className = 'notice-content';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      if (cell.children.length === 0 && cell.textContent.trim()) {
        const p = document.createElement('p');
        p.append(...cell.childNodes);
        content.append(p);
      } else {
        content.append(...cell.childNodes);
      }
    });
  });

  const first = content.firstElementChild;
  if (first && /^H[1-6]$/.test(first.tagName)) first.classList.add('notice-title');

  const icon = document.createElement('span');
  icon.className = 'notice-icon';
  icon.setAttribute('aria-hidden', 'true');

  block.setAttribute('role', block.classList.contains('warning') ? 'status' : 'note');
  if (block.classList.contains('warning') || block.classList.contains('location')) {
    block.replaceChildren(icon, content);
  } else {
    block.replaceChildren(content);
  }
}
