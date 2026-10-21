/*
 * Facet Filter block
 * Checkbox facet list with result counts (e.g. "Adobe Commerce (cloud)  80").
 *
 * Authoring:
 *   Optional first row with a single heading cell: the facet title.
 *   One row per facet value: | label (text or link) | count (optional) |
 *   A list (ul/ol) in a single cell is also accepted; a trailing number in an
 *   item ("Magento Open Source 98" or "... (98)") is read as its count.
 * Selecting a value whose label is a link navigates to it; otherwise the block
 * toggles a `facet` query parameter and dispatches `facet-filter:change`.
 */

let facetId = 0;

function splitCount(text) {
  const m = text.trim().match(/^(.*?)\s*\(?(\d[\d,]*)\)?$/);
  if (m && m[1]) return { label: m[1].trim(), count: m[2] };
  return { label: text.trim(), count: '' };
}

function collectItems(block) {
  const items = [];
  let title = null;
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (!cells.length) return;
    const heading = cells[0].querySelector('h1, h2, h3, h4, h5, h6');
    if (cells.length === 1 && heading && !items.length && !title) {
      title = heading;
      return;
    }
    const list = cells[0].querySelector('ul, ol');
    if (list) {
      [...list.children].forEach((li) => {
        const link = li.querySelector('a');
        const { label, count } = splitCount(li.textContent);
        items.push({ label, count, href: link?.getAttribute('href') });
      });
      return;
    }
    const link = cells[0].querySelector('a');
    const text = cells[0].textContent.trim();
    if (!text) return;
    if (cells[1]) {
      items.push({ label: text, count: cells[1].textContent.trim(), href: link?.getAttribute('href') });
    } else {
      const { label, count } = splitCount(text);
      items.push({ label, count, href: link?.getAttribute('href') });
    }
  });
  return { title, items };
}

export default function decorate(block) {
  facetId += 1;
  const { title, items } = collectItems(block);
  const params = new URLSearchParams(window.location.search);
  const selected = new Set(params.getAll('facet'));

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'facet-filter-group';
  if (title) {
    const legend = document.createElement('legend');
    legend.className = 'facet-filter-title';
    legend.textContent = title.textContent.trim();
    fieldset.append(legend);
  }

  const list = document.createElement('ul');
  list.className = 'facet-filter-list';
  items.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'facet-filter-item';
    const id = `facet-filter-${facetId}-${i}`;

    // source markup: li > label > input + span.facet-label + span.facet-count
    const label = document.createElement('label');
    label.htmlFor = id;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.value = item.label;
    input.checked = selected.has(item.label);

    const text = document.createElement('span');
    text.className = 'facet-filter-label';
    text.textContent = item.label;

    label.append(input, text);
    if (item.count) {
      const count = document.createElement('span');
      count.className = 'facet-filter-count';
      count.textContent = item.count;
      label.append(count);
    }
    li.append(label);

    input.addEventListener('change', () => {
      if (item.href && input.checked) {
        window.location.href = item.href;
        return;
      }
      const values = [...list.querySelectorAll('input:checked')].map((el) => el.value);
      block.dispatchEvent(new CustomEvent('facet-filter:change', { bubbles: true, detail: { values } }));
      const url = new URL(window.location.href);
      url.searchParams.delete('facet');
      values.forEach((v) => url.searchParams.append('facet', v));
      window.history.replaceState({}, '', url);
    });
    list.append(li);
  });

  fieldset.append(list);
  block.replaceChildren(fieldset);
}
