/**
 * Footer block.
 * Content lives in the footer fragment (footer.plain.html); this file only reads that DOM
 * and arranges it into layout containers. No copy is hardcoded here.
 *
 * Fragment contract (flat, semantic):
 *  - A section with headings + lists becomes the link-column band
 *    (each heading and the elements up to the next heading form one column).
 *  - Any other section becomes a bottom bar:
 *      image-only paragraphs        -> brand cell
 *      list of image links          -> social list (paragraph right before it is its label)
 *      other paragraphs before it   -> info cell
 *      content after the social list -> legal row (paragraphs = copyright, lists = legal links)
 *  - A link whose hash is #cookie-preferences opens the consent manager instead of navigating.
 */

const CONSENT_HASH = '#cookie-preferences';

/**
 * Fetches the footer fragment. Metadata-independent dual fetch:
 * /content first (local aem up), then the site root (DA/EDS).
 * @returns {Promise<HTMLElement|null>} container holding the fragment sections
 */
async function fetchFooterFragment() {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) resp = await fetch('/footer.plain.html');
  if (!resp.ok) return null;
  const container = document.createElement('div');
  container.innerHTML = await resp.text();
  // resolve relative media against the fragment location
  const base = new URL(resp.url, window.location.href);
  container.querySelectorAll('img[src], source[srcset]').forEach((el) => {
    const attr = el.tagName === 'IMG' ? 'src' : 'srcset';
    const value = el.getAttribute(attr);
    if (value && !/^(https?:|data:|\/\/)/.test(value)) {
      el.setAttribute(attr, new URL(value, base).href);
    }
  });
  return container;
}

function createEl(tag, className, children = []) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  children.filter(Boolean).forEach((child) => el.append(child));
  return el;
}

function isImageOnly(el) {
  return el.tagName === 'P' && el.querySelector('img') && !el.textContent.trim();
}

function isImageLinkList(el) {
  if (el.tagName !== 'UL' && el.tagName !== 'OL') return false;
  const links = [...el.querySelectorAll('a')];
  return links.length > 0 && links.every((a) => a.querySelector('img') && !a.textContent.trim());
}

/**
 * Builds the multi-column link band from a heading + list section.
 * @param {Element} section fragment section
 * @returns {Element}
 */
function buildLinkColumns(section) {
  const band = createEl('div', 'footer-nav');
  let column = null;
  [...section.children].forEach((child) => {
    if (/^H[1-6]$/.test(child.tagName) || !column) {
      column = createEl('div', 'footer-column');
      band.append(column);
    }
    column.append(child);
  });
  return band;
}

/**
 * Builds the bottom bar (brand row + legal row) from a mixed section.
 * @param {Element} section fragment section
 * @returns {Element}
 */
function buildBottomBar(section) {
  const children = [...section.children];
  const socialIndex = children.findIndex(isImageLinkList);
  const brandRow = createEl('div', 'footer-brand-row');
  const legalRow = createEl('div', 'footer-legal-row');
  const logoCell = createEl('div', 'footer-cell footer-logo');
  const infoCell = createEl('div', 'footer-cell footer-info');
  const socialCell = createEl('div', 'footer-cell footer-social');

  children.forEach((child, i) => {
    if (socialIndex >= 0 && i <= socialIndex) {
      if (isImageOnly(child)) {
        logoCell.append(child);
      } else if (i === socialIndex) {
        child.classList.add('footer-social-list');
        child.querySelectorAll('a').forEach((a) => {
          const img = a.querySelector('img');
          if (img) {
            if (!a.getAttribute('aria-label')) a.setAttribute('aria-label', img.alt || a.title);
            // render the authored image as a glyph mask so hover can recolor it
            const icon = createEl('span', 'footer-social-icon');
            icon.setAttribute('aria-hidden', 'true');
            icon.style.setProperty('--footer-icon', `url("${img.src}")`);
            img.replaceWith(icon);
          }
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        });
        socialCell.append(child);
      } else if (i === socialIndex - 1 && child.tagName === 'P') {
        child.classList.add('footer-social-label');
        socialCell.prepend(child);
      } else {
        infoCell.append(child);
      }
    } else if (isImageOnly(child)) {
      logoCell.append(child);
    } else {
      child.classList.add(child.tagName === 'P' ? 'footer-copyright' : 'footer-legal');
      legalRow.append(child);
    }
  });

  [logoCell, infoCell, socialCell].forEach((cell) => {
    if (cell.childElementCount) brandRow.append(cell);
  });
  return createEl('div', 'footer-bottom', [
    brandRow.childElementCount ? brandRow : null,
    legalRow.childElementCount ? legalRow : null,
  ]);
}

/**
 * Wires #cookie-preferences links to the page's consent manager when one is present.
 * @param {Element} root footer root
 */
function bindConsentLinks(root) {
  root.querySelectorAll('a[href]').forEach((a) => {
    const url = new URL(a.getAttribute('href'), window.location.href);
    if (url.hash !== CONSENT_HASH) return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const { adobePrivacy } = window;
      if (adobePrivacy && typeof adobePrivacy.showConsentPopup === 'function') {
        adobePrivacy.showConsentPopup();
      } else {
        document.dispatchEvent(new CustomEvent('consent:open', { bubbles: true }));
      }
    });
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragment = await fetchFooterFragment();
  block.textContent = '';
  if (!fragment) return;

  const sections = [...fragment.children].filter((el) => el.tagName === 'DIV');
  sections.forEach((section) => {
    const hasHeadings = section.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6');
    const hasImages = section.querySelector('img');
    const built = hasHeadings && !hasImages ? buildLinkColumns(section) : buildBottomBar(section);
    block.append(createEl('div', 'footer-section', [built]));
  });

  bindConsentLinks(block);
}
