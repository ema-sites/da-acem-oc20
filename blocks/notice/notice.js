/*
 * Notice block
 * Bordered callout box of notice text (category policy notes, location
 * restrictions, warnings).
 *
 * Authoring: one or more rows, one cell each, holding rich text and links.
 * A heading at the top becomes the notice title.
 * Options: `location` (titled address card: the heading becomes a grey
 * header bar), `warning` (pale orange alert banner with a warning icon,
 * announced politely via role="status").
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

  // drop empty paragraphs/wrappers left over from authoring
  [...content.children].forEach((el) => {
    if (!el.textContent.trim() && !el.querySelector('img, picture, svg')) el.remove();
  });

  const first = content.firstElementChild;
  const title = first && /^H[1-6]$/.test(first.tagName) ? first : null;
  if (title) title.classList.add('notice-title');

  const isWarning = block.classList.contains('warning');
  const isLocation = block.classList.contains('location');
  block.setAttribute('role', isWarning ? 'status' : 'note');

  if (isLocation) {
    const children = [];
    if (title) {
      const head = document.createElement('div');
      head.className = 'notice-head';
      head.append(title);
      children.push(head);
    }
    content.classList.add('notice-body');
    children.push(content);
    block.replaceChildren(...children);
    return;
  }

  if (isWarning) {
    const icon = document.createElement('span');
    icon.className = 'notice-icon';
    icon.setAttribute('aria-hidden', 'true');
    block.replaceChildren(icon, content);
    return;
  }

  block.replaceChildren(content);
}
