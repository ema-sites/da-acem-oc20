/* eslint-disable */
/* global WebImporter */

/**
 * Parser for price-filter (min/max price range + Go).
 *
 * Source: div.facet-group.facet-price > div.price-range-input > div.price-input-group
 *   input#price-from[placeholder=Min] + span.price-separator + input#price-to[placeholder=Max]
 *   + button.price-go-btn "Go"
 *
 * Target (blocks/price-filter/README.md): key/value rows
 *   | Min | Min |  | Max | Max |  | Button | Go |
 * Form controls are turned into authorable text; the block rebuilds the form.
 */

function clean(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

export default function parse(element, { document }) {
  const cells = [];
  const inputs = [...element.querySelectorAll('input')];
  const minInput = element.querySelector('#price-from') || inputs[0];
  const maxInput = element.querySelector('#price-to') || inputs[1];
  const button = element.querySelector('button, input[type="submit"]');

  const min = clean(minInput && minInput.getAttribute('placeholder')) || 'Min';
  const max = clean(maxInput && maxInput.getAttribute('placeholder')) || 'Max';
  const go = clean(button && (button.textContent || button.getAttribute('value'))) || 'Go';

  cells.push(['Min', min]);
  cells.push(['Max', max]);
  cells.push(['Button', go]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'price-filter', cells });
  element.replaceWith(block);
}
