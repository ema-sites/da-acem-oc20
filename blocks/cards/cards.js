import { createOptimizedPicture } from '../../scripts/aem.js';

/*
 * Cards block (partner card grid, source #developer-hits-results .hit-instance)
 * Rows: | logo (picture, may be empty) | name heading + "Learn More" link |
 * The first cell of a multi-cell row is the logo slot even when it is empty:
 * the source keeps the logo box height for partners without a logo.
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const cells = [...row.children];
    cells.forEach((div, i) => {
      const hasImage = div.querySelector('picture, img') && !div.textContent.trim();
      const isEmptyLogoSlot = i === 0 && cells.length > 1 && !div.textContent.trim();
      div.className = hasImage || isEmptyLogoSlot ? 'cards-card-image' : 'cards-card-body';
      li.append(div);
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
