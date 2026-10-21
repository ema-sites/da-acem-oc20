// media query match that indicates desktop width
const isDesktop = window.matchMedia('(width >= 900px)');

const SECTION_NAMES = ['brand', 'sections', 'tools', 'bar'];

/**
 * Fetches the nav fragment. Metadata-independent dual fetch:
 * /content/nav.plain.html (local preview) first, then /nav.plain.html (DA/EDS).
 * @returns {Promise<{html: string, base: string}|null>}
 */
async function fetchNav() {
  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) resp = await fetch('/nav.plain.html');
  if (!resp.ok) return null;
  return { html: await resp.text(), base: resp.url };
}

/**
 * Resolves relative image paths against the fragment URL so they work on any page depth.
 * @param {Element} root fragment root
 * @param {string} base fragment URL
 */
function resolveImages(root, base) {
  root.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (!/^(https?:|data:|\/)/.test(src)) img.src = new URL(src, base).href;
    img.loading = 'eager';
  });
}

/**
 * Returns the leading label paragraph of a section (a <p> without links), if any.
 * @param {Element} section nav section
 * @returns {Element|null}
 */
function getLabel(section) {
  const first = section.firstElementChild;
  if (first && first.tagName === 'P' && !first.querySelector('a, img')) return first;
  return null;
}

/**
 * Opens external links of the main nav in a new tab (same as source behaviour).
 * @param {Element} list link list
 */
function markExternalLinks(list) {
  list.querySelectorAll('a[href]').forEach((a) => {
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });
}

/**
 * Builds the search form from a link (href = form action, text = placeholder).
 * @param {Element} link the search link
 * @returns {HTMLFormElement}
 */
function buildSearch(link) {
  const form = document.createElement('form');
  form.className = 'nav-search';
  form.action = link.href;
  form.method = 'get';
  form.setAttribute('role', 'search');
  const label = document.createElement('label');
  label.className = 'nav-search-label';
  label.htmlFor = 'nav-search-input';
  label.textContent = 'Search';
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'nav-search-input';
  input.name = 'q';
  input.maxLength = 128;
  input.autocomplete = 'off';
  input.placeholder = link.textContent.trim();
  const icon = document.createElement('span');
  icon.className = 'nav-search-icon';
  icon.setAttribute('aria-hidden', 'true');
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'nav-search-submit';
  submit.setAttribute('aria-label', 'Search');
  form.append(label, input, icon, submit);
  return form;
}

/**
 * Activates one drawer tab and its panel.
 * @param {Element} tablist tab list element
 * @param {number} index tab index
 */
function selectTab(tablist, index) {
  tablist.querySelectorAll('[role="tab"]').forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', selected);
    tab.tabIndex = selected ? 0 : -1;
    const panel = tablist.parentElement.querySelector(`#${tab.getAttribute('aria-controls')}`);
    if (panel) panel.setAttribute('aria-hidden', !selected);
  });
}

/**
 * Opens/closes the mobile drawer.
 * @param {Element} wrapper nav wrapper
 * @param {boolean|null} force force state
 */
function toggleMenu(wrapper, force = null) {
  const nav = wrapper.querySelector('.nav-main');
  const open = force !== null ? force : nav.getAttribute('aria-expanded') !== 'true';
  const effective = open && !isDesktop.matches;
  nav.setAttribute('aria-expanded', effective);
  wrapper.classList.toggle('is-open', effective);
  const button = wrapper.querySelector('.nav-hamburger button');
  if (button) {
    button.setAttribute('aria-expanded', effective);
    button.setAttribute('aria-label', effective ? 'Close navigation' : 'Open navigation');
  }
  document.body.style.overflowY = effective ? 'hidden' : '';
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navData = await fetchNav();
  if (!navData) return;
  const fragment = document.createElement('div');
  fragment.innerHTML = navData.html;
  resolveImages(fragment, navData.base);

  const sections = {};
  [...fragment.children].filter((el) => el.tagName === 'DIV').forEach((section, i) => {
    if (SECTION_NAMES[i]) sections[SECTION_NAMES[i]] = section;
  });

  block.textContent = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  // row 0 bar; only the menu itself is the <nav> landmark
  const nav = document.createElement('div');
  nav.className = 'nav-main';
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  // hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = `<button type="button" aria-controls="nav-sections" aria-expanded="false" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  nav.append(hamburger);

  // brand
  if (sections.brand) {
    const brand = document.createElement('div');
    brand.className = 'nav-brand';
    const link = sections.brand.querySelector('a');
    if (link) brand.append(link);
    else brand.append(...sections.brand.childNodes);
    nav.append(brand);
  }

  // drawer / desktop sections: one tab per labelled section
  const navSections = document.createElement('nav');
  navSections.className = 'nav-sections';
  navSections.setAttribute('aria-label', 'Main');
  navSections.id = 'nav-sections';
  const tablist = document.createElement('div');
  tablist.className = 'nav-tabs';
  tablist.setAttribute('role', 'tablist');
  navSections.append(tablist);

  const addTab = (labelText, list, key) => {
    const index = tablist.children.length;
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'nav-tab';
    tab.id = `nav-tab-${key}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `nav-panel-${key}`);
    tab.textContent = labelText;
    tab.addEventListener('click', () => selectTab(tablist, index));
    tablist.append(tab);
    const panel = document.createElement('div');
    panel.className = `nav-panel nav-panel-${key}`;
    panel.id = `nav-panel-${key}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.append(list);
    navSections.append(panel);
  };

  if (sections.sections) {
    const label = getLabel(sections.sections);
    const list = sections.sections.querySelector('ul');
    if (list) {
      list.classList.add('nav-list');
      list.querySelectorAll(':scope > li').forEach((li) => {
        li.classList.add('nav-item');
        li.querySelector(':scope > a')?.classList.add('nav-trigger');
      });
      markExternalLinks(list);
      addTab(label ? label.textContent.trim() : 'Menu', list, 'menu');
    }
  }

  // tools: icon links stay in the bar; text links also appear in the drawer tab
  let tools;
  if (sections.tools) {
    tools = document.createElement('div');
    tools.className = 'nav-tools';
    const list = sections.tools.querySelector('ul');
    if (list) {
      list.querySelectorAll(':scope > li').forEach((li) => {
        li.classList.add(li.querySelector('img') ? 'nav-tool-icon' : 'nav-tool-text');
        const img = li.querySelector('a img');
        if (img) {
          // icon link: keep its text (or alt) as a visually hidden label
          const link = img.closest('a');
          const label = link.textContent.trim() || img.alt;
          [...link.childNodes]
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .forEach((n) => n.remove());
          const text = document.createElement('span');
          text.className = 'nav-tool-label';
          text.textContent = label;
          img.alt = '';
          link.append(text);
        }
      });
      tools.append(list);
      const label = getLabel(sections.tools);
      const textItems = [...list.querySelectorAll(':scope > li.nav-tool-text')];
      if (label && textItems.length) {
        const drawerList = document.createElement('ul');
        drawerList.className = 'nav-list nav-list-secondary';
        textItems.forEach((li) => {
          const clone = li.cloneNode(true);
          clone.className = 'nav-item';
          drawerList.append(clone);
        });
        addTab(label.textContent.trim(), drawerList, 'account');
      }
    }
  }

  nav.append(navSections);
  if (tools) nav.append(tools);
  if (tablist.children.length) selectTab(tablist, 0);
  wrapper.append(nav);

  // second row: search bar + info text
  if (sections.bar) {
    const bar = document.createElement('div');
    bar.className = 'nav-bar';
    const inner = document.createElement('div');
    inner.className = 'nav-bar-inner';
    [...sections.bar.children].forEach((el) => {
      const link = el.querySelector('a');
      if (link && !inner.querySelector('.nav-search')) {
        inner.append(buildSearch(link));
      } else {
        el.classList.add('nav-bar-info');
        inner.append(el);
      }
    });
    bar.append(inner);
    wrapper.append(bar);
  }

  // overlay behind the mobile drawer
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.addEventListener('click', () => toggleMenu(wrapper, false));
  wrapper.append(overlay);

  hamburger.querySelector('button').addEventListener('click', () => toggleMenu(wrapper));
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && nav.getAttribute('aria-expanded') === 'true') {
      toggleMenu(wrapper, false);
      hamburger.querySelector('button').focus();
    }
  });
  // reset mobile state when crossing breakpoints
  isDesktop.addEventListener('change', () => {
    toggleMenu(wrapper, false);
    if (tablist.children.length) selectTab(tablist, 0);
  });

  block.append(wrapper);
}
