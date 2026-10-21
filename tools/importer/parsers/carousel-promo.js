/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-promo (Magento Page Builder banner slider).
 *
 * Source: #maincontent > div.widget.block.block-banners
 *   Each slide is [data-content-type="slide"] holding
 *   a[data-element="link"] > .pagebuilder-slide-wrapper (background image via
 *   data-background-images JSON or an inline <style> rule) > button (CTA text).
 *
 * Target (blocks/carousel-promo/README.md): one row per slide
 *   | banner image | heading, text, CTA link | optional tab label |
 *
 * Slide parts are paired by document order (invalid <button> inside <a> nesting
 * can be flattened on re-parse), never by walking up to a shared ancestor.
 */

function bgFromDataAttr(wrapper) {
  if (!wrapper) return '';
  const raw = (wrapper.getAttribute('data-background-images') || '').replace(/\\"/g, '"').replace(/\\\//g, '/');
  if (!raw || raw === '{}') return '';
  try {
    const json = JSON.parse(raw);
    return json.desktop_image || json.mobile_image || '';
  } catch (e) {
    const m = raw.match(/desktop_image"?\s*:\s*"?([^"\\,}]+)/);
    return m ? m[1] : '';
  }
}

function bgFromStyleTags(root, wrapper) {
  if (!wrapper) return '';
  const cls = [...wrapper.classList].find((c) => c.startsWith('background-image-'));
  const inline = wrapper.getAttribute('style') || '';
  const inlineMatch = inline.match(/background-image\s*:\s*url\(\s*['"]?([^'")]+)['"]?\s*\)/i);
  if (inlineMatch) return inlineMatch[1];
  if (!cls) return '';
  const re = new RegExp(`\\.${cls}\\s*\\{[^}]*background-image\\s*:\\s*url\\(\\s*['"]?([^'")]+)['"]?\\s*\\)`, 'i');
  for (const style of root.querySelectorAll('style')) {
    const m = (style.textContent || '').match(re);
    if (m) return m[1];
  }
  return '';
}

export default function parse(element, { document }) {
  const cells = [];

  const slides = [...element.querySelectorAll('[data-content-type="slide"]')];
  const wrappers = [...element.querySelectorAll('.pagebuilder-slide-wrapper')];
  const links = [...element.querySelectorAll('a[data-element="link"]')];
  const buttons = [...element.querySelectorAll('[data-element="button"], .pagebuilder-slide-button')];
  const contents = [...element.querySelectorAll('.pagebuilder-poster-content [data-element="content"], .pagebuilder-collage-content [data-element="content"]')];

  slides.forEach((slide, i) => {
    const wrapper = wrappers[i] || slide.querySelector('.pagebuilder-slide-wrapper');
    const link = links[i] || slide.querySelector('a[href]');
    const button = buttons[i];
    const content = contents[i];
    const name = (slide.getAttribute('data-slide-name') || '').trim();

    // Image cell: prefer a real <img>, then data-background-images, then CSS.
    const imageCell = [];
    const existingImg = slide.querySelector('img[src]');
    let src = existingImg ? existingImg.getAttribute('src') : '';
    if (!src) src = bgFromDataAttr(wrapper) || bgFromStyleTags(element, wrapper);
    if (src) {
      const img = document.createElement('img');
      img.src = src.trim();
      img.alt = (existingImg && existingImg.getAttribute('alt')) || name;
      imageCell.push(img);
    }

    // Content cell: heading / text from the slide content area, then CTA.
    const contentCell = [];
    if (content) {
      content.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol').forEach((el) => {
        if (el.textContent.trim()) contentCell.push(el);
      });
      if (!contentCell.length && content.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = content.textContent.trim();
        contentCell.push(p);
      }
    }
    const ctaText = (button && button.textContent.trim()) || '';
    const href = link ? link.getAttribute('href') : '';
    if (href) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = href.trim().replace(/(%20)+$/i, '');
      a.textContent = ctaText || name || 'Learn more';
      p.append(a);
      contentCell.push(p);
    } else if (ctaText) {
      const p = document.createElement('p');
      p.textContent = ctaText;
      contentCell.push(p);
    }

    if (!imageCell.length && !contentCell.length) return;
    cells.push([imageCell, contentCell, name]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-promo', cells });
  element.replaceWith(block);
}
