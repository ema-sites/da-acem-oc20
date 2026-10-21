/*
 * Price Filter block
 * Min / max price inputs with a "Go" button.
 *
 * Authoring (all rows optional, key | value):
 *   | Min    | Min |      placeholder for the lower bound
 *   | Max    | Max |      placeholder for the upper bound
 *   | Button | Go  |      submit label
 *   | Param  | price |    query parameter written as "<min>-<max>"
 * A single-cell row holding a heading becomes the filter title.
 * Submitting updates the URL and dispatches `price-filter:change`.
 */

let priceFilterId = 0;

function readConfig(block) {
  const config = {
    min: 'Min', max: 'Max', button: 'Go', param: 'price',
  };
  let title = '';
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) {
      const heading = cells[0].querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) title = heading.textContent.trim();
      return;
    }
    if (cells.length < 2) return;
    const key = cells[0].textContent.trim().toLowerCase();
    const value = cells[1].textContent.trim();
    if (!value) return;
    if (/^min/.test(key)) config.min = value;
    else if (/^max/.test(key)) config.max = value;
    else if (/button|submit|go/.test(key)) config.button = value;
    else if (/param/.test(key)) config.param = value;
  });
  return { config, title };
}

function makeInput(name, placeholder, id) {
  const label = document.createElement('label');
  label.className = 'price-filter-sr-only';
  label.htmlFor = id;
  label.textContent = placeholder;
  const input = document.createElement('input');
  input.type = 'number';
  input.min = '0';
  input.step = 'any';
  input.inputMode = 'decimal';
  input.id = id;
  input.name = name;
  input.placeholder = placeholder;
  input.className = `price-filter-input price-filter-${name}`;
  return [label, input];
}

export default function decorate(block) {
  priceFilterId += 1;
  const { config, title } = readConfig(block);
  const current = new URLSearchParams(window.location.search).get(config.param) || '';
  const [curMin = '', curMax = ''] = current.split('-');

  const form = document.createElement('form');
  form.className = 'price-filter-form';
  if (title) {
    const heading = document.createElement('p');
    heading.className = 'price-filter-title';
    heading.textContent = title;
    form.append(heading);
  }

  const fields = document.createElement('div');
  fields.className = 'price-filter-fields';
  const [minLabel, min] = makeInput('min', config.min, `price-filter-${priceFilterId}-min`);
  const [maxLabel, max] = makeInput('max', config.max, `price-filter-${priceFilterId}-max`);
  min.value = curMin;
  max.value = curMax;
  const sep = document.createElement('span');
  sep.className = 'price-filter-separator';
  sep.setAttribute('aria-hidden', 'true');
  sep.textContent = '-';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'price-filter-submit';
  button.textContent = config.button;
  fields.append(minLabel, min, sep, maxLabel, max, button);
  form.append(fields);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let lo = min.value;
    let hi = max.value;
    if (lo && hi && Number(lo) > Number(hi)) [lo, hi] = [hi, lo];
    const url = new URL(window.location.href);
    if (lo || hi) url.searchParams.set(config.param, `${lo}-${hi}`);
    else url.searchParams.delete(config.param);
    block.dispatchEvent(new CustomEvent('price-filter:change', { bubbles: true, detail: { min: lo, max: hi } }));
    window.location.href = url.toString();
  });

  block.replaceChildren(form);
}
