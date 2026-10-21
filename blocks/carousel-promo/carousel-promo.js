/*
 * Carousel Promo block
 * Banner image slides with an overlaid call-to-action button, switched by
 * dot controls and auto-advancing (source: 4s autoplay, sliding track).
 *
 * Authoring: one row per slide.
 *   Cell 1: banner image (optional)
 *   Cell 2: call-to-action link (optionally heading / text)
 * An optional third cell sets the dot label; otherwise the slide heading,
 * the image alt text, or "Slide N" is used.
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

const AUTOPLAY_DELAY = 4000;

let carouselId = 0;

function setActive(block, index) {
  const slides = [...block.querySelectorAll('.carousel-promo-slide')];
  if (!slides.length) return;
  const count = slides.length;
  const idx = ((index % count) + count) % count;
  block.dataset.activeSlide = idx;

  const track = block.querySelector('.carousel-promo-slides');
  track.style.transform = `translateX(${idx * -100}%)`;

  slides.forEach((slide, i) => {
    const active = i === idx;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', !active);
    slide.querySelectorAll('a, button').forEach((el) => {
      if (active) el.removeAttribute('tabindex');
      else el.setAttribute('tabindex', '-1');
    });
  });

  block.querySelectorAll('.carousel-promo-tab').forEach((tab, i) => {
    const active = i === idx;
    tab.setAttribute('aria-selected', active);
    tab.setAttribute('tabindex', active ? '0' : '-1');
  });
}

function createSlide(row, index, id) {
  const slide = document.createElement('li');
  slide.className = 'carousel-promo-slide';
  slide.id = `carousel-promo-${id}-slide-${index}`;
  slide.setAttribute('role', 'tabpanel');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.dataset.slideIndex = index;

  const cells = [...row.children];
  let label = '';
  cells.forEach((cell, i) => {
    const text = cell.textContent.trim();
    const onlyImage = cell.querySelector('picture, img') && !text;
    if (i === 2 && !cell.querySelector('picture, img, a, h1, h2, h3, h4, h5, h6')) {
      label = text;
      return;
    }
    if (!onlyImage && !text) return;
    cell.classList.add(onlyImage ? 'carousel-promo-slide-image' : 'carousel-promo-slide-content');
    slide.append(cell);
  });

  // CTA links render as the primary (orange) button
  slide.querySelectorAll('.carousel-promo-slide-content a[href]').forEach((a) => {
    if (a.querySelector('img')) return;
    a.classList.add('button', 'primary');
    const p = a.closest('p');
    if (p && p.textContent.trim() === a.textContent.trim()) p.classList.add('button-wrapper');
  });

  const heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
  const img = slide.querySelector('img[alt]');
  if (!label && heading) label = heading.textContent.trim();
  if (!label && img) label = img.alt.trim();
  return { slide, label: label || `Slide ${index + 1}` };
}

function startAutoplay(block, count) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let timer;
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    const next = () => setActive(block, Number(block.dataset.activeSlide) + 1);
    timer = setInterval(next, AUTOPLAY_DELAY);
  };
  block.addEventListener('mouseenter', stop);
  block.addEventListener('mouseleave', start);
  block.addEventListener('focusin', stop);
  block.addEventListener('focusout', (e) => {
    if (!block.contains(e.relatedTarget)) start();
  });
  if (count > 1) start();
}

export default function decorate(block) {
  carouselId += 1;
  const id = carouselId;
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'carousel');
  block.setAttribute('aria-label', 'Promotions');

  const slides = document.createElement('ul');
  slides.className = 'carousel-promo-slides';

  const tabs = document.createElement('div');
  tabs.className = 'carousel-promo-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Promotions');

  rows.forEach((row, i) => {
    const { slide, label } = createSlide(row, i, id);
    slides.append(slide);

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'carousel-promo-tab';
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', slide.id);
    tab.setAttribute('aria-label', label);
    tab.id = `${slide.id}-tab`;
    tab.textContent = String(i + 1);
    tab.dataset.slideIndex = i;
    slide.setAttribute('aria-labelledby', tab.id);
    tabs.append(tab);
    row.remove();
  });

  slides.querySelectorAll('picture > img').forEach((img, i) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin === window.location.origin && !/\.svg$/i.test(url.pathname)) {
      img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, i === 0, [{ width: '1600' }]));
    } else if (i === 0) {
      img.loading = 'eager';
    }
  });

  const container = document.createElement('div');
  container.className = 'carousel-promo-slides-container';
  container.append(slides);
  block.replaceChildren(container);

  if (rows.length > 1) {
    tabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.carousel-promo-tab');
      if (!tab) return;
      setActive(block, Number(tab.dataset.slideIndex));
    });
    tabs.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = Number(block.dataset.activeSlide) + (e.key === 'ArrowRight' ? 1 : -1);
      setActive(block, next);
      block.querySelector('.carousel-promo-tab[aria-selected="true"]')?.focus();
    });
    block.append(tabs);
    startAutoplay(block, rows.length);
  }

  setActive(block, 0);
}
