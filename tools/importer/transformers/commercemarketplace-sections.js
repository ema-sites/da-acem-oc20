/* eslint-disable */
/* global WebImporter */

/**
 * Section transformer for commercemarketplace.adobe.com. Generic: driven entirely by
 * payload.template.sections[] ({ id, name, selector: string[], style, ... }).
 *
 * beforeTransform: walk sections in reverse, insert <hr> before every non-first
 *   section while parser targets still exist. Styled sections get a temporary
 *   data-excat-section-id marker on their <hr>. A styled first section gets a
 *   temporary marked <hr> (removed later) so its metadata can be placed.
 * afterTransform: walk reverse again, insert Section Metadata (style) right before
 *   the next section's <hr> (i.e. at the end of the styled section), drop markers,
 *   and delete the first section's temporary <hr>.
 */

const MARKER = 'data-excat-section-id';
const FIRST_MARKER = 'data-excat-section-first';

function findSectionElement(document, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (let i = 0; i < selectors.length; i += 1) {
    const sel = selectors[i];
    if (!sel) continue;
    try {
      const el = document.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // invalid selector: try next
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const document = (payload && payload.document) || element.ownerDocument;
  const sections = (payload && payload.template && payload.template.sections) || [];
  if (sections.length < 2) return;

  if (hookName === 'beforeTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = findSectionElement(document, section);
      if (!el || !el.parentNode) continue;
      const isFirst = i === 0;
      if (isFirst && !section.style) continue;
      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(MARKER, section.id);
      if (isFirst) hr.setAttribute(FIRST_MARKER, 'true');
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === 'afterTransform') {
    const markers = [...document.querySelectorAll(`hr[${MARKER}]`)];
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;
      const hr = markers.find((m) => m.getAttribute(MARKER) === section.id);
      const anchor = hr || findSectionElement(document, section);
      if (!anchor || !anchor.parentNode) continue;

      const metadata = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });

      // Section content runs from this marker up to the next <hr> section break
      // among the following siblings; place metadata at the end of that range.
      let end = hr ? hr.nextElementSibling : anchor;
      let last = hr || anchor;
      while (end && end.tagName !== 'HR') {
        last = end;
        end = end.nextElementSibling;
      }
      last.parentNode.insertBefore(metadata, last.nextSibling);
    }

    markers.forEach((m) => {
      if (m.hasAttribute(FIRST_MARKER)) {
        m.remove();
      } else {
        m.removeAttribute(MARKER);
      }
    });
    document.querySelectorAll(`hr[${FIRST_MARKER}]`).forEach((m) => m.remove());
  }
}
