# CSS Migration Plan

Generated on: 2025-07-23T10:56:56.191Z

## Overview
This document outlines the remaining CSS blocks that need to be migrated from the old monolithic CSS file to the new modular structure.

## Migration Tasks

### dev/css/base/reset.css
**Missing blocks:** 6

```css
@tailwind base;
@tailwind components;
@tailwind utilities;






html { text-rendering: optimizeLegibility;
  
  -webkit-font-smoothing: antialiased;
  
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%; }
```

```css
.creators-carousel .text-base { font-size: 0.75rem; }
```

```css
@layer base { html {
    font-size: 16px; }
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;






html { text-rendering: optimizeLegibility;
  
  -webkit-font-smoothing: antialiased;
  
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%; }
```

```css
.creators-carousel .text-base { font-size: 0.75rem; }
```

```css
@layer base { html {
    font-size: 16px; }
```

---

### dev/css/utilities/helpers.css
**Missing blocks:** 441

```css
body { font-feature-settings:
    "kern" 1,
    "liga" 1;
  
  font-variant-ligatures: common-ligatures discretionary-ligatures;
  line-height: 1.5;
  
  letter-spacing: 0.01em;
  
  -webkit-font-smoothing: antialiased; }
```

```css
@media (max-width: 768px) { .header--dynamic {
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
@media (max-width: 480px) { .header__icon-button {
    width: 36px;
    height: 36px; }
```

```css
body { font-family:
    var(--font-family),
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-weight: var(--font-weight-normal);
  font-style: var(--font-style-normal);
  font-size: calc(16px * var(--font-body-scale)); }
```

```css
h1,
h2,
h3,
h4,
h5,
h6 { font-family:
    var(--font-family),
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-weight: var(--font-weight-bold);
  font-style: var(--font-style-normal);
  font-size: calc(1.2em * var(--font-heading-scale));
  
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; }
```

```css
.creators-carousel .md\:w-24.md\:h-24 { width: 4rem;
    height: 4rem; }
```

```css
.creators-carousel .space-x-16 > * + * { margin-left: 0.5rem; }
```

```css
.creators-carousel .md\:space-x-20 > * + * { margin-left: 0.75rem; }
```

```css
to { transform: rotate(360deg); }
```

```css
to { transform: rotate(360deg); }
```

```css
@media (prefers-contrast: high) { .accessible-button {
    border-width: 2px;
    border-color: currentColor; }
```

```css
@media (pointer: coarse) { .accessible-button {
    min-height: 48px;
    
    min-width: 48px; }
```

```css
to { opacity: 1;
    transform: translateY(0); }
```

```css
to { opacity: 1;
    transform: translateY(0); }
```

```css
.half-star::after { content: "";
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  background-color: #4b5563;
  
  z-index: 1; }
```

```css
.rating-star.active { color: #fbbf24 !important; }
```

```css
.rating-feedback { transition: all var(--duration-default) var(--easing-smooth);
  min-height: 1.5rem; }
```

```css
.rating-star svg { -webkit-filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3)); }
```

```css
.rating-star:hover svg { -webkit-filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4));
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4)); }
```

```css
.rating-star:focus-within { outline: 2px solid #fbbf24;
  outline-offset: 2px;
  border-radius: 4px; }
```

```css
@media (max-width: 768px) { .add-to-cart-btn {
    padding: 0.5rem 0.75rem; }
```

```css
@media (max-width: 480px) { .add-to-cart-btn {
    padding: 0.375rem 0.625rem;
    font-size: 0.8rem; }
```

```css
.pagination-wrapper { margin-top: 5rem;
  margin-bottom: 5rem; }
```

```css
.pagination__item { margin: 0 0.2rem; }
```

```css
.pagination__item-link:hover,
.pagination__item-link:focus { border-color: rgb(var(--color-base-accent-1));
  color: rgb(var(--color-base-accent-1)); }
```

```css
.pagination__item--current .pagination__item-link { background-color: rgb(var(--color-base-accent-1));
  border-color: rgb(var(--color-base-accent-1));
  color: rgb(var(--color-base-solid-button-labels)); }
```

```css
.pagination__item--prev .pagination__item-link,
.pagination__item--next .pagination__item-link { padding: 1rem 1.5rem;
  gap: 0.5rem; }
```

```css
.pagination__item--prev .icon { transform: rotate(90deg); }
```

```css
.pagination__item--next .icon { transform: rotate(-90deg); }
```

```css
.pagination__item .icon { width: 1rem;
  height: 1rem; }
```

```css
@media screen and (max-width: 749px) { .pagination__item-link {
    min-width: 3.6rem;
    height: 3.6rem;
    font-size: 1.2rem; }
```

```css
.pagination__item--prev .pagination__item-link,
  .pagination__item--next .pagination__item-link { padding: 0.8rem 1.2rem; }
```

```css
.inventory-status { font-size: 0.875rem;
  font-weight: 500; }
```

```css
.inventory-status svg { flex-shrink: 0; }
```

```css
50% { opacity: 0.7; }
```

```css
.collection-card-wrapper .card,
.contains-card--collection { --border-radius: var(--collection-card-corner-radius, 1rem);
  --border-width: var(--collection-card-border-width, 1px);
  --border-opacity: var(--collection-card-border-opacity, 0.1);
  --shadow-horizontal-offset: var(--collection-card-shadow-horizontal-offset, 0);
  --shadow-vertical-offset: var(--collection-card-shadow-vertical-offset, 4px);
  --shadow-blur-radius: var(--collection-card-shadow-blur-radius, 8px);
  --shadow-opacity: var(--collection-card-shadow-opacity, 0.1);
  --image-padding: var(--collection-card-image-padding, 0);
  --text-alignment: var(--collection-card-text-alignment, center); }
```

```css
.page-width { max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 var(--container-padding); }
```

```css
@layer components { .hero-section .hero-description {
    font-size: 1rem !important;
    line-height: 1.6 !important;
    color: rgb(209, 213, 219) !important;
    max-width: 60rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
    font-weight: 400 !important; }
```

```css
@media (min-width: 640px) { .hero-section .hero-description {
      font-size: 1.125rem !important; }
```

```css
@media (min-width: 1024px) { .hero-section .hero-description {
      font-size: 1.25rem !important; }
```

```css
.card { @apply bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm;
    transition: all var(--duration-card) var(--easing-smooth);
    transform: translateZ(0); }
```

```css
.card-hover { @apply hover:border-primary hover:shadow-lg hover:shadow-primary/20;
    transition: all var(--duration-card) var(--easing-smooth);
    transform: translateZ(0);
    will-change: transform; }
```

```css
.card-hover:hover { transform: translateY(-4px) scale(1.02) translateZ(0); }
```

```css
.text-gradient { @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent; }
```

```css
.skip-to-content-link { @apply absolute -top-40 left-6 z-50 bg-primary text-black px-4 py-2 rounded-md font-medium;
    transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.skip-to-content-link:focus { @apply top-6;
    transform: translateY(0); }
```

```css
.visually-hidden { @apply absolute w-px h-px p-0 -m-px overflow-hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0; }
```

```css
.visually-hidden:focus { @apply static w-auto h-auto p-1 m-0 overflow-visible;
    clip: auto;
    white-space: normal; }
```

```css
body { @apply bg-background text-white font-sans antialiased;
    width: 100%;
    overflow-x: hidden; }
```

```css
body { padding-top: 0; }
```

```css
main { margin-top: 0;
    padding-top: 2.5rem;
    
    
    padding-bottom: 80px; }
```

```css
html { scroll-behavior: smooth;
    scroll-padding-top: 2.5rem; }
```

```css
*:focus { @apply outline-none; }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1; }
```

```css
to { opacity: 1; }
```

```css
to { opacity: 1;
      transform: scale(1); }
```

```css
to { opacity: 1;
      transform: scale(1); }
```

```css
.line-clamp-2 { display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden; }
```

```css
.line-clamp-3 { display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden; }
```

```css
@layer utilities { .backdrop-blur-xs {
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px); }
```

```css
.backdrop-blur-sm { -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px); }
```

```css
.backdrop-blur-md { -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px); }
```

```css
.backdrop-blur-lg { -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px); }
```

```css
.backdrop-blur-xl { -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px); }
```

```css
.smooth-hover { transition: all var(--duration-default) var(--easing-smooth);
    transform: translateZ(0); }
```

```css
.smooth-focus { transition: all var(--duration-short) var(--easing-smooth); }
```

```css
.smooth-scale { transition: transform var(--duration-default) var(--easing-spring);
    transform: translateZ(0); }
```

```css
.smooth-opacity { transition: opacity var(--duration-default) var(--easing-smooth); }
```

```css
.smooth-color { transition:
      color var(--duration-default) var(--easing-smooth),
      background-color var(--duration-default) var(--easing-smooth),
      border-color var(--duration-default) var(--easing-smooth); }
```

```css
.smooth-shadow { transition: box-shadow var(--duration-default) var(--easing-smooth); }
```

```css
.password-page { display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
    min-height: 100vh; }
```

```css
.section-padding { padding-top: var(--section-padding-top, 3rem);
    padding-bottom: var(--section-padding-bottom, 3rem); }
```

```css
@media screen and (min-width: 750px) { .section-padding {
      padding-top: var(--section-padding-top-desktop, 4rem);
      padding-bottom: var(--section-padding-bottom-desktop, 4rem); }
```

```css
.why-choose-us-section { background-image: var(--why-choose-bg-image); }
```

```css
.faq-pattern { background-image:
      radial-gradient(circle 1px at 20% 30%, rgba(255, 216, 0, 0.3) 1px, transparent 1px),
      radial-gradient(circle 1px at 80% 15%, rgba(255, 216, 0, 0.25) 1px, transparent 1px),
      radial-gradient(circle 1px at 35% 75%, rgba(255, 216, 0, 0.3) 1px, transparent 1px),
      radial-gradient(circle 1px at 75% 60%, rgba(255, 216, 0, 0.25) 1px, transparent 1px),
      radial-gradient(circle 1px at 15% 85%, rgba(255, 216, 0, 0.3) 1px, transparent 1px);
    background-size:
      200px 200px,
      180px 180px,
      220px 220px,
      190px 190px,
      210px 210px; }
```

```css
.faq-answer { max-height: 0;
    overflow: hidden;
    transition: max-height var(--duration-default) var(--easing-smooth); }
```

```css
.faq-answer.active { max-height: 500px; }
```

```css
.faq-icon { transition: transform var(--duration-default) var(--easing-spring); }
```

```css
.faq-question[aria-expanded="true"] .faq-icon { transform: rotate(45deg); }
```

```css
.faq-question { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.faq-question:hover { transform: translateX(4px); }
```

```css
.bg-slate-800.active { border-color: rgb(255, 216, 0);
    box-shadow: 0 0 20px rgba(255, 216, 0, 0.2); }
```

```css
@media (min-width: 1024px) { .header__icon {
    width: 22px;
    height: 22px; }
```

```css
50% { transform: translateZ(0) translateY(-2px); }
```

```css
50% { transform: translateZ(0) translateY(-2px); }
```

```css
@media (max-width: 768px) { .header--dynamic {
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
@media (max-width: 480px) { .header__icon-button {
    width: 36px;
    height: 36px; }
```

```css
@media (prefers-reduced-motion: reduce) { .header,
  .header__button,
  .nav-link,
  .mobile-menu a {
    transition: none; }
```

```css
.glow-primary { box-shadow: 0 0 20px rgba(255, 216, 0, 0.5); }
```

```css
.glow-secondary { box-shadow: 0 0 20px rgba(71, 145, 240, 0.5); }
```

```css
.glow-accent { box-shadow: 0 0 20px rgba(89, 186, 185, 0.5); }
```

```css
.quantity:hover { background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: scale(1.02); }
```

```css
.quantity:focus { outline: none !important;
  border-color: rgba(255, 255, 255, 0.15) !important; }
```

```css
.quantity:focus-within { outline: none !important;
  border-color: rgba(255, 255, 255, 0.15) !important; }
```

```css
.quantity__value { font-size: 1.4rem;
  font-weight: 500;
  color: white;
  line-height: 1; }
```

```css
.totals { text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.08); }
```

```css
.totals__total { font-size: 1.5rem;
  font-weight: 500;
  color: #94a3b8;
  margin: 0 0 0.8rem 0; }
```

```css
.totals__total-value { font-size: 2.4rem;
  font-weight: 600;
  color: white;
  margin: 0; }
```

```css
.tax-note { text-align: center;
  margin-top: 0.8rem;
  color: #94a3b8;
  font-size: 1.2rem; }
```

```css
.discounts { margin: 1rem 0; }
```

```css
.discounts__discount .icon { width: 1.4rem;
  height: 1.4rem; }
```

```css
to { transform: rotate(360deg); }
```

```css
a { transition: color var(--duration-default) var(--easing-smooth); }
```

```css
a:hover { transition: color var(--duration-short) var(--easing-smooth); }
```

```css
img { transition: transform var(--duration-default) var(--easing-smooth); }
```

```css
img:hover { transform: scale(1.02); }
```

```css
.badge { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.badge:hover { transform: scale(1.05); }
```

```css
.icon:hover { transform: scale(1.1); }
```

```css
.loading { transition: opacity var(--duration-default) var(--easing-smooth); }
```

```css
25% { transform: translateX(-5px); }
```

```css
75% { transform: translateX(5px); }
```

```css
25% { transform: translateX(-5px); }
```

```css
75% { transform: translateX(5px); }
```

```css
50% { transform: scale(1.02);
    box-shadow:
      0 16px 50px rgba(0, 0, 0, 0.5),
      0 0 0 2px rgba(251, 191, 36, 0.3); }
```

```css
100% { transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
50% { transform: scale(1.02);
    box-shadow:
      0 16px 50px rgba(0, 0, 0, 0.5),
      0 0 0 2px rgba(251, 191, 36, 0.3); }
```

```css
100% { transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
@media screen and (max-width: 768px) { .cart-page .page-width {
    padding: 0 1rem; }
```

```css
.totals__total-value { font-size: 2rem; }
```

```css
@media screen and (max-width: 480px) { .cart-item__name {
    font-size: 1.5rem; }
```

```css
.price__container { @apply flex items-center gap-3; }
```

```css
.price__regular { @apply text-2xl lg:text-3xl font-bold text-white; }
```

```css
.price__sale { @apply text-2xl lg:text-3xl font-bold text-red-400; }
```

```css
.price--on-sale .price__regular { @apply text-lg text-gray-400 line-through; }
```

```css
.price-item { @apply text-2xl font-bold; }
```

```css
.price-item--regular { @apply text-white; }
```

```css
.price-item--sale { @apply text-red-400; }
```

```css
.price-item--compare { @apply text-lg text-gray-400 line-through; }
```

```css
.unit-price { @apply text-sm text-gray-400; }
```

```css
.price__badges { @apply flex flex-wrap gap-2; }
```

```css
.badge { @apply inline-flex items-center px-2 py-1 text-xs font-medium rounded-md; }
```

```css
.badge--sale { @apply bg-red-500 text-white; }
```

```css
.badge--save { @apply bg-green-500 text-white; }
```

```css
.badge--sold-out { @apply bg-gray-500 text-white; }
```

```css
.rating-stars { @apply flex items-center gap-1; }
```

```css
.rating-text { @apply text-sm text-gray-400; }
```

```css
.rating-value { @apply font-medium text-white; }
```

```css
.inventory-status { @apply inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium; }
```

```css
.inventory-status--in-stock { @apply bg-green-500/20 text-green-400; }
```

```css
.inventory-status--low-stock { @apply bg-yellow-500/20 text-yellow-400; }
```

```css
.inventory-status--out-of-stock { @apply bg-red-500/20 text-red-400; }
```

```css
.main-media-container { @apply relative overflow-hidden rounded-2xl; }
```

```css
.main-media { @apply relative aspect-square; }
```

```css
body { font-feature-settings:
    "kern" 1,
    "liga" 1;
  
  font-variant-ligatures: common-ligatures discretionary-ligatures;
  line-height: 1.5;
  
  letter-spacing: 0.01em;
  
  -webkit-font-smoothing: antialiased; }
```

```css
@media (max-width: 768px) { .header--dynamic {
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
@media (max-width: 480px) { .header__icon-button {
    width: 36px;
    height: 36px; }
```

```css
body { font-family:
    var(--font-family),
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-weight: var(--font-weight-normal);
  font-style: var(--font-style-normal);
  font-size: calc(16px * var(--font-body-scale)); }
```

```css
h1,
h2,
h3,
h4,
h5,
h6 { font-family:
    var(--font-family),
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-weight: var(--font-weight-bold);
  font-style: var(--font-style-normal);
  font-size: calc(1.2em * var(--font-heading-scale));
  
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; }
```

```css
.creators-carousel .md\:w-24.md\:h-24 { width: 4rem;
    height: 4rem; }
```

```css
.creators-carousel .space-x-16 > * + * { margin-left: 0.5rem; }
```

```css
.creators-carousel .md\:space-x-20 > * + * { margin-left: 0.75rem; }
```

```css
to { transform: rotate(360deg); }
```

```css
to { transform: rotate(360deg); }
```

```css
@media (prefers-contrast: high) { .accessible-button {
    border-width: 2px;
    border-color: currentColor; }
```

```css
@media (pointer: coarse) { .accessible-button {
    min-height: 48px;
    
    min-width: 48px; }
```

```css
to { opacity: 1;
    transform: translateY(0); }
```

```css
to { opacity: 1;
    transform: translateY(0); }
```

```css
.half-star::after { content: "";
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  background-color: #4b5563;
  
  z-index: 1; }
```

```css
.rating-star.active { color: #fbbf24 !important; }
```

```css
.rating-feedback { transition: all var(--duration-default) var(--easing-smooth);
  min-height: 1.5rem; }
```

```css
.rating-star svg { -webkit-filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3)); }
```

```css
.rating-star:hover svg { -webkit-filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4));
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4)); }
```

```css
.rating-star:focus-within { outline: 2px solid #fbbf24;
  outline-offset: 2px;
  border-radius: 4px; }
```

```css
@media (max-width: 768px) { .add-to-cart-btn {
    padding: 0.5rem 0.75rem; }
```

```css
@media (max-width: 480px) { .add-to-cart-btn {
    padding: 0.375rem 0.625rem;
    font-size: 0.8rem; }
```

```css
.pagination-wrapper { margin-top: 5rem;
  margin-bottom: 5rem; }
```

```css
.pagination__item { margin: 0 0.2rem; }
```

```css
.pagination__item-link:hover,
.pagination__item-link:focus { border-color: rgb(var(--color-base-accent-1));
  color: rgb(var(--color-base-accent-1)); }
```

```css
.pagination__item--current .pagination__item-link { background-color: rgb(var(--color-base-accent-1));
  border-color: rgb(var(--color-base-accent-1));
  color: rgb(var(--color-base-solid-button-labels)); }
```

```css
.pagination__item--prev .pagination__item-link,
.pagination__item--next .pagination__item-link { padding: 1rem 1.5rem;
  gap: 0.5rem; }
```

```css
.pagination__item--prev .icon { transform: rotate(90deg); }
```

```css
.pagination__item--next .icon { transform: rotate(-90deg); }
```

```css
.pagination__item .icon { width: 1rem;
  height: 1rem; }
```

```css
@media screen and (max-width: 749px) { .pagination__item-link {
    min-width: 3.6rem;
    height: 3.6rem;
    font-size: 1.2rem; }
```

```css
.pagination__item--prev .pagination__item-link,
  .pagination__item--next .pagination__item-link { padding: 0.8rem 1.2rem; }
```

```css
.inventory-status { font-size: 0.875rem;
  font-weight: 500; }
```

```css
.inventory-status svg { flex-shrink: 0; }
```

```css
50% { opacity: 0.7; }
```

```css
.collection-card-wrapper .card,
.contains-card--collection { --border-radius: var(--collection-card-corner-radius, 1rem);
  --border-width: var(--collection-card-border-width, 1px);
  --border-opacity: var(--collection-card-border-opacity, 0.1);
  --shadow-horizontal-offset: var(--collection-card-shadow-horizontal-offset, 0);
  --shadow-vertical-offset: var(--collection-card-shadow-vertical-offset, 4px);
  --shadow-blur-radius: var(--collection-card-shadow-blur-radius, 8px);
  --shadow-opacity: var(--collection-card-shadow-opacity, 0.1);
  --image-padding: var(--collection-card-image-padding, 0);
  --text-alignment: var(--collection-card-text-alignment, center); }
```

```css
.page-width { max-width: var(--page-width);
  margin: 0 auto;
  padding: 0 var(--container-padding); }
```

```css
@layer components { .hero-section .hero-description {
    font-size: 1rem !important;
    line-height: 1.6 !important;
    color: rgb(209, 213, 219) !important;
    max-width: 60rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
    font-weight: 400 !important; }
```

```css
@media (min-width: 640px) { .hero-section .hero-description {
      font-size: 1.125rem !important; }
```

```css
@media (min-width: 1024px) { .hero-section .hero-description {
      font-size: 1.25rem !important; }
```

```css
.card { @apply bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm;
    transition: all var(--duration-card) var(--easing-smooth);
    transform: translateZ(0); }
```

```css
.card-hover { @apply hover:border-primary hover:shadow-lg hover:shadow-primary/20;
    transition: all var(--duration-card) var(--easing-smooth);
    transform: translateZ(0);
    will-change: transform; }
```

```css
.card-hover:hover { transform: translateY(-4px) scale(1.02) translateZ(0); }
```

```css
.text-gradient { @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent; }
```

```css
.skip-to-content-link { @apply absolute -top-40 left-6 z-50 bg-primary text-black px-4 py-2 rounded-md font-medium;
    transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.skip-to-content-link:focus { @apply top-6;
    transform: translateY(0); }
```

```css
.visually-hidden { @apply absolute w-px h-px p-0 -m-px overflow-hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0; }
```

```css
.visually-hidden:focus { @apply static w-auto h-auto p-1 m-0 overflow-visible;
    clip: auto;
    white-space: normal; }
```

```css
body { @apply bg-background text-white font-sans antialiased;
    width: 100%;
    overflow-x: hidden; }
```

```css
body { padding-top: 0; }
```

```css
main { margin-top: 0;
    padding-top: 3rem; }
```

```css
html { scroll-behavior: smooth;
    scroll-padding-top: 3rem; }
```

```css
*:focus { @apply outline-none; }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateY(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1;
      transform: translateX(0); }
```

```css
to { opacity: 1; }
```

```css
to { opacity: 1; }
```

```css
to { opacity: 1;
      transform: scale(1); }
```

```css
to { opacity: 1;
      transform: scale(1); }
```

```css
.line-clamp-2 { display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden; }
```

```css
.line-clamp-3 { display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden; }
```

```css
@layer utilities { .backdrop-blur-xs {
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px); }
```

```css
.backdrop-blur-sm { -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px); }
```

```css
.backdrop-blur-md { -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px); }
```

```css
.backdrop-blur-lg { -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px); }
```

```css
.backdrop-blur-xl { -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px); }
```

```css
.smooth-hover { transition: all var(--duration-default) var(--easing-smooth);
    transform: translateZ(0); }
```

```css
.smooth-focus { transition: all var(--duration-short) var(--easing-smooth); }
```

```css
.smooth-scale { transition: transform var(--duration-default) var(--easing-spring);
    transform: translateZ(0); }
```

```css
.smooth-opacity { transition: opacity var(--duration-default) var(--easing-smooth); }
```

```css
.smooth-color { transition:
      color var(--duration-default) var(--easing-smooth),
      background-color var(--duration-default) var(--easing-smooth),
      border-color var(--duration-default) var(--easing-smooth); }
```

```css
.smooth-shadow { transition: box-shadow var(--duration-default) var(--easing-smooth); }
```

```css
.password-page { display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
    min-height: 100vh; }
```

```css
.section-padding { padding-top: var(--section-padding-top, 3rem);
    padding-bottom: var(--section-padding-bottom, 3rem); }
```

```css
@media screen and (min-width: 750px) { .section-padding {
      padding-top: var(--section-padding-top-desktop, 4rem);
      padding-bottom: var(--section-padding-bottom-desktop, 4rem); }
```

```css
.why-choose-us-section { background-image: var(--why-choose-bg-image); }
```

```css
.faq-pattern { background-image:
      radial-gradient(circle 1px at 20% 30%, rgba(255, 216, 0, 0.3) 1px, transparent 1px),
      radial-gradient(circle 1px at 80% 15%, rgba(255, 216, 0, 0.25) 1px, transparent 1px),
      radial-gradient(circle 1px at 35% 75%, rgba(255, 216, 0, 0.3) 1px, transparent 1px),
      radial-gradient(circle 1px at 75% 60%, rgba(255, 216, 0, 0.25) 1px, transparent 1px),
      radial-gradient(circle 1px at 15% 85%, rgba(255, 216, 0, 0.3) 1px, transparent 1px);
    background-size:
      200px 200px,
      180px 180px,
      220px 220px,
      190px 190px,
      210px 210px; }
```

```css
.faq-answer { max-height: 0;
    overflow: hidden;
    transition: max-height var(--duration-default) var(--easing-smooth); }
```

```css
.faq-answer.active { max-height: 500px; }
```

```css
.faq-icon { transition: transform var(--duration-default) var(--easing-spring); }
```

```css
.faq-question[aria-expanded="true"] .faq-icon { transform: rotate(45deg); }
```

```css
.faq-question { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.faq-question:hover { transform: translateX(4px); }
```

```css
.bg-slate-800.active { border-color: rgb(255, 216, 0);
    box-shadow: 0 0 20px rgba(255, 216, 0, 0.2); }
```

```css
@media (min-width: 1024px) { .header__icon {
    width: 22px;
    height: 22px; }
```

```css
50% { transform: translateZ(0) translateY(-2px); }
```

```css
50% { transform: translateZ(0) translateY(-2px); }
```

```css
@media (max-width: 768px) { .header--dynamic {
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
@media (max-width: 480px) { .header__icon-button {
    width: 36px;
    height: 36px; }
```

```css
@media (prefers-reduced-motion: reduce) { .header,
  .header__button,
  .nav-link,
  .mobile-menu a {
    transition: none; }
```

```css
.glow-primary { box-shadow: 0 0 20px rgba(255, 216, 0, 0.5); }
```

```css
.glow-secondary { box-shadow: 0 0 20px rgba(71, 145, 240, 0.5); }
```

```css
.glow-accent { box-shadow: 0 0 20px rgba(89, 186, 185, 0.5); }
```

```css
.quantity:hover { background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: scale(1.02); }
```

```css
.quantity:focus { outline: none !important;
  border-color: rgba(255, 255, 255, 0.15) !important; }
```

```css
.quantity:focus-within { outline: none !important;
  border-color: rgba(255, 255, 255, 0.15) !important; }
```

```css
.quantity__value { font-size: 1.4rem;
  font-weight: 500;
  color: white;
  line-height: 1; }
```

```css
.totals { text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.08); }
```

```css
.totals__total { font-size: 1.5rem;
  font-weight: 500;
  color: #94a3b8;
  margin: 0 0 0.8rem 0; }
```

```css
.totals__total-value { font-size: 2.4rem;
  font-weight: 600;
  color: white;
  margin: 0; }
```

```css
.tax-note { text-align: center;
  margin-top: 0.8rem;
  color: #94a3b8;
  font-size: 1.2rem; }
```

```css
.discounts { margin: 1rem 0; }
```

```css
.discounts__discount .icon { width: 1.4rem;
  height: 1.4rem; }
```

```css
to { transform: rotate(360deg); }
```

```css
a { transition: color var(--duration-default) var(--easing-smooth); }
```

```css
a:hover { transition: color var(--duration-short) var(--easing-smooth); }
```

```css
img { transition: transform var(--duration-default) var(--easing-smooth); }
```

```css
img:hover { transform: scale(1.02); }
```

```css
.badge { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.badge:hover { transform: scale(1.05); }
```

```css
.icon:hover { transform: scale(1.1); }
```

```css
.loading { transition: opacity var(--duration-default) var(--easing-smooth); }
```

```css
25% { transform: translateX(-5px); }
```

```css
75% { transform: translateX(5px); }
```

```css
25% { transform: translateX(-5px); }
```

```css
75% { transform: translateX(5px); }
```

```css
50% { transform: scale(1.02);
    box-shadow:
      0 16px 50px rgba(0, 0, 0, 0.5),
      0 0 0 2px rgba(251, 191, 36, 0.3); }
```

```css
100% { transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
50% { transform: scale(1.02);
    box-shadow:
      0 16px 50px rgba(0, 0, 0, 0.5),
      0 0 0 2px rgba(251, 191, 36, 0.3); }
```

```css
100% { transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
@media screen and (max-width: 768px) { .cart-page .page-width {
    padding: 0 1rem; }
```

```css
.totals__total-value { font-size: 2rem; }
```

```css
@media screen and (max-width: 480px) { .cart-item__name {
    font-size: 1.5rem; }
```

```css
.price__container { @apply flex items-center gap-3; }
```

```css
.price__regular { @apply text-2xl lg:text-3xl font-bold text-white; }
```

```css
.price__sale { @apply text-2xl lg:text-3xl font-bold text-red-400; }
```

```css
.price--on-sale .price__regular { @apply text-lg text-gray-400 line-through; }
```

```css
.price-item { @apply text-2xl font-bold; }
```

```css
.price-item--regular { @apply text-white; }
```

```css
.price-item--sale { @apply text-red-400; }
```

```css
.price-item--compare { @apply text-lg text-gray-400 line-through; }
```

```css
.unit-price { @apply text-sm text-gray-400; }
```

```css
.price__badges { @apply flex flex-wrap gap-2; }
```

```css
.badge { @apply inline-flex items-center px-2 py-1 text-xs font-medium rounded-md; }
```

```css
.badge--sale { @apply bg-red-500 text-white; }
```

```css
.badge--save { @apply bg-green-500 text-white; }
```

```css
.badge--sold-out { @apply bg-gray-500 text-white; }
```

```css
.rating-stars { @apply flex items-center gap-1; }
```

```css
.rating-text { @apply text-sm text-gray-400; }
```

```css
.rating-value { @apply font-medium text-white; }
```

```css
.inventory-status { @apply inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium; }
```

```css
.inventory-status--in-stock { @apply bg-green-500/20 text-green-400; }
```

```css
.inventory-status--low-stock { @apply bg-yellow-500/20 text-yellow-400; }
```

```css
.inventory-status--out-of-stock { @apply bg-red-500/20 text-red-400; }
```

```css
.main-media-container { @apply relative overflow-hidden rounded-2xl; }
```

```css
.main-media { @apply relative aspect-square; }
```

```css
.thumbnail-gallery { @apply grid grid-cols-4 gap-4 mt-4; }
```

```css
.external-video-container { @apply relative aspect-video; }
```

```css
.no-media-placeholder { @apply flex items-center justify-center aspect-square bg-gray-800 rounded-2xl; }
```

```css
.zoom-lens { @apply absolute w-32 h-32 bg-white/20 border-2 border-white rounded-full pointer-events-none; }
```

```css
.zoom-result { @apply absolute top-0 right-0 w-96 h-96 bg-white rounded-lg overflow-hidden; }
```

```css
@media screen and (max-width: 768px) { .product-title h1 {
    @apply text-2xl lg:text-3xl; }
```

```css
.price__regular,
  .price__sale { @apply text-xl lg:text-2xl; }
```

```css
.thumbnail-gallery { @apply grid-cols-3 gap-2; }
```

```css
@media screen and (max-width: 480px) { .product-title h1 {
    @apply text-xl lg:text-2xl; }
```

```css
.price__regular,
  .price__sale { @apply text-lg lg:text-xl; }
```

```css
.thumbnail-gallery { @apply grid-cols-2 gap-2; }
```

```css
.prose,
.prose * { color: white !important; }
```

```css
.prose a { color: #ffd800 !important; }
```

```css
.prose a:hover { color: #d97706 !important; }
```

```css
.prose blockquote { color: white !important;
  border-left-color: #ffd800 !important; }
```

```css
.prose code,
.prose pre { color: white !important;
  background-color: #1f2937 !important; }
```

```css
.prose { margin-top: 0.5rem !important;
  margin-bottom: 1rem !important; }
```

```css
.prose p { margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important; }
```

```css
.prose p:first-child { margin-top: 0 !important; }
```

```css
@media screen and (max-width: 1279px) { .product-media-gallery {
    order: 1; }
```

```css
@media screen and (min-width: 1280px) { .product-media-gallery {
    order: 1; }
```

```css
@media screen and (min-width: 768px) { .product-accordion .grid {
    grid-template-columns: repeat(2, 1fr); }
```

```css
.collapsible-content { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.collapsible-content:hover { border-color: rgb(var(--color-primary));
  box-shadow: 0 4px 12px rgba(var(--color-primary), 0.1); }
```

```css
.collapsible-summary { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.collapsible-summary:hover { background-color: rgba(var(--color-primary), 0.05); }
```

```css
@media screen and (min-width: 640px) { .product-key-info .flex.flex-col.sm\:flex-row {
    align-items: center;
    justify-content: space-between; }
```

```css
@media screen and (max-width: 767px) { .product-key-info .space-y-6 > div {
    margin-bottom: 1.5rem; }
```

```css
.grid.grid-cols-1.lg\:grid-cols-3 { gap: 2rem; }
```

```css
@media screen and (min-width: 1024px) { .grid.grid-cols-1.lg\:grid-cols-3 {
    gap: 3rem; }
```

```css
@media screen and (min-width: 768px) { .product-accordion .grid.grid-cols-1.md\:grid-cols-2 {
    gap: 1.5rem; }
```

```css
@media screen and (min-width: 1280px) { .xl\:grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr)); }
```

```css
.xl\:col-span-3 { grid-column: span 3 / span 3; }
```

```css
.xl\:col-span-2 { grid-column: span 2 / span 2; }
```

```css
@media (min-width: 640px) { .products-grid.grid {
    gap: 2rem; }
```

```css
@media (min-width: 1024px) { .products-grid.grid {
    gap: 2.5rem; }
```

```css
.guarantee-heading-container { position: relative;
  margin-bottom: 1rem; }
```

```css
.guarantee-heading { font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  position: relative;
  z-index: 10; }
```

```css
.guarantee-description { font-size: 1.125rem;
  color: rgb(209, 213, 219);
  margin-bottom: 1.5rem; }
```

```css
.guarantee-tag { display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all var(--duration-default) var(--easing-smooth);
  transform: scale(1);
  border: 1px solid;
  cursor: default; }
```

```css
.guarantee-tag--blue { background-color: rgba(59, 130, 246, 0.9);
  color: white;
  border-color: rgba(59, 130, 246, 0.3); }
```

```css
.guarantee-tag--blue:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
  border-color: rgba(59, 130, 246, 0.6); }
```

```css
.guarantee-tag--yellow { background-color: rgba(255, 216, 0, 0.9);
  color: rgb(24, 25, 38);
  border-color: rgba(255, 216, 0, 0.3); }
```

```css
.guarantee-tag--yellow:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
  border-color: rgba(255, 216, 0, 0.6); }
```

```css
.guarantee-card:hover { transform: scale(1.05);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
```

```css
.guarantee-icon { position: relative;
  margin-bottom: 1rem; }
```

```css
.guarantee-card-title { font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: rgb(255, 216, 0); }
```

```css
.guarantee-card-description { color: rgb(229, 231, 235);
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  text-align: center; }
```

```css
.guarantee-list { text-align: left;
  color: rgb(209, 213, 219);
  margin-bottom: 1.5rem;
  list-style: none;
  padding: 0; }
```

```css
.guarantee-list li { margin-bottom: 0.75rem; }
```

```css
.guarantee-disclaimer { font-size: 0.875rem;
  color: rgb(156, 163, 175);
  text-align: center; }
```

```css
.guarantee-promo-content { flex: 1;
  text-align: center; }
```

```css
.guarantee-promo-heading { font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.1; }
```

```css
.guarantee-promo-description { font-size: 1.125rem;
  color: rgb(209, 213, 219);
  margin-bottom: 2rem;
  line-height: 1.6; }
```

```css
.guarantee-icon-container { display: none; }
```

```css
.guarantee-icon-float { width: 6rem;
  height: 6rem;
  opacity: 0.6;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.guarantee-icon-float--orange { -webkit-filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.6));
  filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.6)); }
```

```css
.guarantee-icon-float--purple { -webkit-filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6));
  filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.6)); }
```

```css
.guarantee-icon-float--blue { -webkit-filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6));
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)); }
```

```css
.guarantee-icon-float--yellow { -webkit-filter: drop-shadow(0 0 20px rgba(255, 216, 0, 0.6));
  filter: drop-shadow(0 0 20px rgba(255, 216, 0, 0.6)); }
```

```css
.guarantee-icon-float--green { -webkit-filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6));
  filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6)); }
```

```css
.guarantee-icon-float--red { -webkit-filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6));
  filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6)); }
```

```css
@media (min-width: 640px) { .guarantee-heading {
    font-size: 3rem; }
```

```css
.guarantee-tags { flex-direction: row; }
```

```css
@media (min-width: 768px) { .guarantee-card {
    padding: 2rem 3rem; }
```

```css
.guarantee-card-title { font-size: 1.875rem; }
```

```css
.guarantee-promo-heading { font-size: 1.875rem; }
```

```css
@media (min-width: 1024px) { .guarantee-heading {
    font-size: 3.125rem; }
```

```css
.guarantee-promo { flex-direction: row;
    gap: 3rem; }
```

```css
.guarantee-promo-content { text-align: left; }
```

```css
.guarantee-promo-heading { font-size: 2.25rem; }
```

```css
.guarantee-icon-container { display: block; }
```

```css
@media (min-width: 1280px) { .guarantee-promo-heading {
    font-size: 2.5rem; }
```

```css
@media (max-width: 768px) { .template-search {
    padding: 1rem 0; }
```

```css
@media (max-width: 480px) { .template-search__results .product-grid {
    grid-template-columns: 1fr; }
```

```css
@media (max-width: 480px) { .search-modal__content {
    padding: 0.5rem; }
```

```css
to { transform: rotate(360deg); }
```

```css
@media (prefers-contrast: high) { .search-modal__container {
    border-width: 2px;
    border-color: rgb(255, 216, 0); }
```

```css
@media print { .search-modal {
    display: none !important; }
```

```css
.template-404 .helpful-links h2 { font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem; }
```

```css
.template-404 .helpful-links a { color: var(--primary-color);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  font-size: 0.95rem; }
```

```css
.template-404 .helpful-links a:hover { background-color: var(--primary-color);
  color: var(--background);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 216, 0, 0.3); }
```

```css
@media (max-width: 768px) { .template-404 {
    padding: 2rem 0; }
```

```css
.template-404 .error-code { font-size: 6rem; }
```

```css
.template-404 .title { font-size: 2rem; }
```

```css
.template-404 p { font-size: 1rem; }
```

```css
.template-404 .helpful-links ul { flex-direction: column;
    align-items: center; }
```

```css
.template-404 .helpful-links a { width: 200px;
    text-align: center; }
```

```css
@media (min-width: 768px) { .search-form__submit {
    padding: 0.625rem; }
```

```css
@media (max-width: 767px) { .search-form__input {
    padding: 0.875rem 3rem 0.875rem 2.5rem;
    font-size: 1rem; }
```

```css
@media (prefers-contrast: high) { .search-form__input {
    border-width: 2px; }
```

```css
@media (prefers-reduced-motion: reduce) { .search-form__input,
  .search-form__submit,
  .search-form__clear,
  .search-form__icon {
    transition: none; }
```

```css
@media (max-width: 768px) { .template-search {
    padding: 1rem 0;
    min-height: 70vh; }
```

```css
@media (max-width: 480px) { .template-search__header h1 {
    font-size: 2rem; }
```

```css
@media (max-width: 768px) { .search-page {
    padding: 2rem 1rem; }
```

```css
@media (max-width: 480px) { .search-page {
    padding: 1.5rem 0.75rem; }
```

```css
@media (min-width: 768px) { .customer-reviews-grid {
    grid-template-columns: repeat(2, 1fr); }
```

```css
@media (min-width: 640px) { .customer-review-text {
    font-size: 1.25rem; }
```

```css
@media (min-width: 1024px) { .customer-review-text {
    font-size: 1.375rem; }
```

```css
50% { transform: translateX(-50%) translateY(-8px); }
```

```css
50% { transform: translateX(-50%) translateY(-8px); }
```

```css
40% { transform: translateY(-5px); }
```

```css
60% { transform: translateY(-3px); }
```

```css
40% { transform: translateY(-5px); }
```

```css
60% { transform: translateY(-3px); }
```

```css
50% { transform: scale(1.1);
    opacity: 0.4; }
```

```css
@media (max-width: 768px) { .cart-page.is-empty .cart__warnings {
    padding: 3rem 2rem;
    margin: 1rem; }
```

```css
@media (max-width: 480px) { .cart-page.is-empty .cart__warnings {
    padding: 2.5rem 1.5rem; }
```

```css
@property --angle { syntax: "<angle>";
  initial-value: 0deg;
  inherits: false; }
```

```css
to { --angle: 360deg; }
```

```css
to { --angle: 360deg; }
```

```css
.creators-carousel .space-x-16 > * + * { margin-left: 2rem; }
```

```css
.creators-carousel .md\:space-x-20 > * + * { margin-left: 2.5rem; }
```

```css
.creators-carousel .md\:w-24.md\:h-24 { width: 4rem;
    height: 4rem; }
```

```css
main { padding-top: 4rem;
    
    padding-bottom: 80px; }
```

```css
50% { transform: scale(1.1); }
```

```css
50% { transform: scale(1.1); }
```

```css
@media (prefers-reduced-motion: reduce) { .bottom-nav-item,
  .bottom-nav-icon,
  .bottom-nav-label {
    transition: none; }
```

```css
@media (prefers-contrast: high) { .mobile-bottom-nav {
    background: rgba(0, 0, 0, 0.95);
    border-top: 2px solid #ffd800; }
```

```css
@media (max-width: 768px) and (orientation: landscape) { .mobile-bottom-nav {
    padding: 8px 16px;
    padding-bottom: calc(8px + env(safe-area-inset-bottom)); }
```

```css
main { padding-top: 4rem;
    
    padding-bottom: 70px; }
```

```css
@media (min-width: 480px) and (max-width: 768px) { .mobile-bottom-nav {
    padding: 16px 24px;
    padding-bottom: calc(16px + env(safe-area-inset-bottom)); }
```

```css
main { padding-top: 4rem;
    
    padding-bottom: 90px; }
```

```css
@media (min-width: 769px) and (max-width: 1023px) { .header {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important; }
```

```css
@media (min-width: 769px) and (max-width: 850px) { .header > div {
    padding-left: 0.25rem !important;
    padding-right: 0.25rem !important; }
```

```css
@media (min-width: 769px) and (max-width: 800px) { .header nav a {
    font-size: 0.65rem !important;
    padding: 0.125rem 0.25rem !important; }
```

```css
50% { transform: scale(1.1); }
```

```css
@media (min-width: 1024px) { .header__nav-list {
    gap: 3rem; }
```

```css
@media (min-width: 1280px) { .header__nav-list {
    gap: 3.5rem; }
```

```css
@media (prefers-reduced-motion: reduce) { .header,
  .header__menu-toggle,
  .header__action-button,
  .mobile-menu,
  .search-modal,
  .search-modal__content {
    transition: none; }
```

```css
@media (prefers-contrast: high) { .header__menu-toggle,
  .header__action-button {
    border: 2px solid white; }
```

```css
@media print { .header,
  .mobile-menu,
  .mobile-bottom-nav,
  .search-modal {
    display: none !important; }
```

```css
@media (max-width: 480px) { .mobile-menu__header {
    padding: 1rem; }
```

```css
@media (prefers-reduced-motion: reduce) { .mobile-menu,
  .mobile-menu__close,
  .mobile-menu__logo-link,
  .mobile-menu__user-action-btn,
  .mobile-menu__search-input,
  .mobile-menu__quick-action,
  .mobile-menu__nav-link,
  .mobile-menu__social-link,
  .mobile-menu__footer-link {
    transition: none; }
```

```css
@media (prefers-contrast: high) { .mobile-menu {
    background: rgba(0, 0, 0, 0.95);
    border-right: 2px solid white; }
```

```css
@media print { .mobile-menu {
    display: none !important; }
```

```css
@media screen and (min-width: 990px) { .customer {
    padding: 0 2rem; }
```

---

### dev/css/layout/header.css
**Missing blocks:** 325

```css
.header--transparent { -webkit-backdrop-filter: none;
    backdrop-filter: none; }
```

```css
.header--scrolled { -webkit-backdrop-filter: blur(16px) saturate(180%);
    backdrop-filter: blur(16px) saturate(180%); }
```

```css
.header__icon-button { width: 40px;
    height: 40px;
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
.header__icon-button:hover { -webkit-backdrop-filter: blur(14px) saturate(180%);
    backdrop-filter: blur(14px) saturate(180%); }
```

```css
.header__icon { width: 18px;
    height: 18px; }
```

```css
.header__cart-badge { top: -10px;
    right: -10px;
    min-width: 24px;
    height: 24px;
    font-size: 13px;
    line-height: 24px;
    padding: 0 8px; }
```

```css
.header__icon { width: 16px;
    height: 16px; }
```

```css
.header__cart-badge { top: -9px;
    right: -9px;
    min-width: 22px;
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    padding: 0 7px; }
```

```css
nav a,
.nav-link,
.header__nav-link,
.mobile-menu__nav-link { text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-feature-settings:
    "kern" 1,
    "liga" 1; }
```

```css
.template-search__header { margin-bottom: 3rem; }
```

```css
.cart-notification__header { display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px; }
```

```css
nav a:focus,
  .header a:focus,
  .nav-link:focus,
  nav a:active,
  .header a:active,
  .nav-link:active { @apply ring-0 outline-none border-0; }
```

```css
.nav-link:focus,
  .nav-link:active,
  .nav-link:focus-visible { @apply ring-0 outline-none border-0 shadow-none; }
```

```css
nav a,
  .header a,
  .nav-link { @apply ring-0 outline-none border-0; }
```

```css
nav a:focus,
  nav a:active,
  .header a:focus,
  .header a:active,
  .nav-link:focus,
  .nav-link:active { @apply ring-0 outline-none border-0 shadow-none; }
```

```css
.password-header { padding: 1rem 0;
    text-align: center;
    border-bottom: 1px solid hsl(var(--border)); }
```

```css
.header { position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    will-change: auto;
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    
    --scroll-progress: 0;
    --bg-opacity-start: 0.05;
    --bg-opacity-end: 0.6;
    --blur-start: 0px;
    --blur-end: 16px;
    --border-opacity-start: 0.03;
    --border-opacity-end: 0.08; }
```

```css
.header--transparent { background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    border-bottom: none;
    box-shadow: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
```

```css
.header--blurred { background: rgba(0, 0, 0, calc(0.1 + 0.4 * var(--header-blur-progress, 0)));
    -webkit-backdrop-filter: blur(calc(8px + 8px * var(--header-blur-progress, 0))) saturate(calc(150% + 30% * var(--header-blur-progress, 0)));
    backdrop-filter: blur(calc(8px + 8px * var(--header-blur-progress, 0))) saturate(calc(150% + 30% * var(--header-blur-progress, 0)));
    border-bottom: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, calc(0.1 * var(--header-blur-progress, 0)));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
```

```css
.header__icon-button { position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: radial-gradient(circle at 30% 30%,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 40%,
        rgba(255, 255, 255, 0.03) 70%,
        transparent 100%);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: visible;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translateZ(0);
    cursor: pointer;
    
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.25),
      0 3px 12px rgba(255, 255, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15); }
```

```css
.header__icon-button::before { content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none; }
```

```css
.header__icon-button:hover { transform: translateY(-4px) scale(1.05) translateZ(0);
    color: #ffd800;
    box-shadow:
      0 10px 32px rgba(0, 0, 0, 0.35),
      0 6px 20px rgba(255, 216, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.25); }
```

```css
.header__icon-button:hover::before { transform: translate(-50%, -50%) scale(1); }
```

```css
.header__icon-button:focus,
  .header__icon-button:focus-visible { outline: none;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 4px 16px rgba(255, 216, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 0 3px rgba(255, 216, 0, 0.4); }
```

```css
.header__icon-button:active { transform: translateY(-2px) scale(1.02);
    transition: all 0.1s ease; }
```

```css
.header__icon-button:focus:not(:focus-visible) { box-shadow: none; }
```

```css
.header__icon-button { -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  perspective: 1000px; }
```

```css
.header__icon { width: 20px;
  height: 20px;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.header__cart-badge { position: absolute;
  top: -8px;
  right: -8px;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 216, 0, 0.9) 0%,
      rgba(255, 216, 0, 0.7) 50%,
      rgba(255, 216, 0, 0.5) 100%);
  color: #000;
  font-size: 13px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 16px rgba(255, 216, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  white-space: nowrap;
  overflow: visible;
  transform: translateZ(0);
  
  -webkit-animation: badgeFloat 3s ease-in-out infinite;
  animation: badgeFloat 3s ease-in-out infinite; }
```

```css
.header__button { background: linear-gradient(135deg,
      rgba(255, 216, 0, 0.15) 0%,
      rgba(255, 216, 0, 0.08) 50%,
      rgba(255, 216, 0, 0.15) 100%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 216, 0, 0.2);
  transition: all var(--duration-default) var(--easing-smooth);
  position: relative;
  overflow: hidden; }
```

```css
.header__button::before { content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 216, 0, 0.1), transparent);
  transition: left 0.5s ease; }
```

```css
.header__button:hover { background: linear-gradient(135deg,
      rgba(255, 216, 0, 0.25) 0%,
      rgba(255, 216, 0, 0.15) 50%,
      rgba(255, 216, 0, 0.25) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  backdrop-filter: blur(16px) saturate(200%);
  border-color: rgba(255, 216, 0, 0.4);
  transform: translateY(-1px);
  box-shadow:
    0 4px 12px rgba(255, 216, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.1); }
```

```css
.header__button:focus { outline: none;
  box-shadow:
    0 0 0 2px rgba(255, 216, 0, 0.5),
    0 4px 12px rgba(255, 216, 0, 0.2); }
```

```css
.mobile-menu { background: linear-gradient(135deg,
      rgba(15, 23, 42, 0.98) 0%,
      rgba(15, 23, 42, 0.95) 50%,
      rgba(15, 23, 42, 0.98) 100%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  backdrop-filter: blur(24px) saturate(200%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    8px 0 32px rgba(0, 0, 0, 0.4),
    inset 1px 0 0 rgba(255, 255, 255, 0.05); }
```

```css
.mobile-menu__header { background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
```

```css
.header--transparent { -webkit-backdrop-filter: none;
    backdrop-filter: none; }
```

```css
.header--scrolled { -webkit-backdrop-filter: blur(16px) saturate(180%);
    backdrop-filter: blur(16px) saturate(180%); }
```

```css
.header__icon-button { width: 40px;
    height: 40px;
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
.header__icon-button:hover { -webkit-backdrop-filter: blur(14px) saturate(180%);
    backdrop-filter: blur(14px) saturate(180%); }
```

```css
.header__icon { width: 18px;
    height: 18px; }
```

```css
.header__cart-badge { top: -10px;
    right: -10px;
    min-width: 24px;
    height: 24px;
    font-size: 13px;
    line-height: 24px;
    padding: 0 8px; }
```

```css
.header__icon { width: 16px;
    height: 16px; }
```

```css
.header__cart-badge { top: -9px;
    right: -9px;
    min-width: 22px;
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    padding: 0 7px; }
```

```css
.header__button:focus-visible { outline: 2px solid rgba(255, 216, 0, 0.8);
  outline-offset: 2px;
  box-shadow:
    0 0 0 4px rgba(255, 216, 0, 0.2),
    0 4px 12px rgba(255, 216, 0, 0.2); }
```

```css
.header__button::before { transition: none; }
```

```css
.nav-link::after { transition: none; }
```

```css
.mobile-menu a::before { transition: none; }
```

```css
.header--scrolled { -webkit-animation: none;
    animation: none; }
```

```css
.header--dynamic { --scroll-progress: 0; }
```

```css
.nav-link { position: relative;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.nav-link::after { content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.8), rgba(255, 216, 0, 1), rgba(255, 216, 0, 0.8));
  transition: width var(--duration-default) var(--easing-smooth);
  box-shadow: 0 0 8px rgba(255, 216, 0, 0.5); }
```

```css
.nav-link:hover { text-shadow: 0 0 8px rgba(255, 216, 0, 0.3);
  transform: translateY(-1px); }
```

```css
.mobile-menu a { position: relative;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.mobile-menu a::before { content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.1), transparent);
  transition: width var(--duration-default) var(--easing-smooth); }
```

```css
.mobile-menu a:hover { transform: translateX(8px);
  text-shadow: 0 0 12px rgba(255, 216, 0, 0.4); }
```

```css
.header-transparent { background-color: rgba(0, 0, 0, 0.1) !important;
  border-color: transparent !important;
  -webkit-backdrop-filter: blur(6px) saturate(150%);
  backdrop-filter: blur(6px) saturate(150%);
  box-shadow: none; }
```

```css
.header-scrolled { background-color: rgba(0, 0, 0, 0.5) !important;
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: none;
  box-shadow: none; }
```

```css
header { will-change: auto;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; }
```

```css
header.transition-colors { transition:
    background-color var(--duration-default) var(--easing-smooth),
    border-color var(--duration-default) var(--easing-smooth),
    box-shadow var(--duration-default) var(--easing-smooth),
    -webkit-backdrop-filter var(--duration-default) var(--easing-smooth);
  transition:
    background-color var(--duration-default) var(--easing-smooth),
    border-color var(--duration-default) var(--easing-smooth),
    backdrop-filter var(--duration-default) var(--easing-smooth),
    box-shadow var(--duration-default) var(--easing-smooth);
  transition:
    background-color var(--duration-default) var(--easing-smooth),
    border-color var(--duration-default) var(--easing-smooth),
    backdrop-filter var(--duration-default) var(--easing-smooth),
    box-shadow var(--duration-default) var(--easing-smooth),
    -webkit-backdrop-filter var(--duration-default) var(--easing-smooth); }
```

```css
.cart__header { text-align: center;
  margin-bottom: 2rem; }
```

```css
nav a,
.nav-link { transition: all var(--duration-default) var(--easing-smooth);
  position: relative; }
```

```css
nav a::after,
.nav-link::after { content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(var(--color-primary));
  transition: width var(--duration-default) var(--easing-smooth); }
```

```css
nav a:hover::after,
.nav-link:hover::after { width: 100%; }
```

```css
.media-nav-btn { @apply absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 bg-black/50 text-white rounded-full;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.header--transparent { -webkit-backdrop-filter: none;
    backdrop-filter: none; }
```

```css
.header--scrolled { -webkit-backdrop-filter: blur(16px) saturate(180%);
    backdrop-filter: blur(16px) saturate(180%); }
```

```css
.header__icon-button { width: 40px;
    height: 40px;
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
.header__icon-button:hover { -webkit-backdrop-filter: blur(14px) saturate(180%);
    backdrop-filter: blur(14px) saturate(180%); }
```

```css
.header__icon { width: 18px;
    height: 18px; }
```

```css
.header__cart-badge { top: -10px;
    right: -10px;
    min-width: 24px;
    height: 24px;
    font-size: 13px;
    line-height: 24px;
    padding: 0 8px; }
```

```css
.header__icon { width: 16px;
    height: 16px; }
```

```css
.header__cart-badge { top: -9px;
    right: -9px;
    min-width: 22px;
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    padding: 0 7px; }
```

```css
nav a,
.nav-link,
.header__nav-link,
.mobile-menu__nav-link { text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-feature-settings:
    "kern" 1,
    "liga" 1; }
```

```css
.template-search__header { margin-bottom: 3rem; }
```

```css
.cart-notification__header { display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px; }
```

```css
nav a:focus,
  .header a:focus,
  .nav-link:focus,
  nav a:active,
  .header a:active,
  .nav-link:active { @apply ring-0 outline-none border-0; }
```

```css
.nav-link:focus,
  .nav-link:active,
  .nav-link:focus-visible { @apply ring-0 outline-none border-0 shadow-none; }
```

```css
nav a,
  .header a,
  .nav-link { @apply ring-0 outline-none border-0; }
```

```css
nav a:focus,
  nav a:active,
  .header a:focus,
  .header a:active,
  .nav-link:focus,
  .nav-link:active { @apply ring-0 outline-none border-0 shadow-none; }
```

```css
.password-header { padding: 1rem 0;
    text-align: center;
    border-bottom: 1px solid hsl(var(--border)); }
```

```css
.header { position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    will-change: auto;
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    
    --scroll-progress: 0;
    --bg-opacity-start: 0.05;
    --bg-opacity-end: 0.6;
    --blur-start: 0px;
    --blur-end: 16px;
    --border-opacity-start: 0.03;
    --border-opacity-end: 0.08; }
```

```css
.header--transparent { background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    border-bottom: none;
    box-shadow: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
```

```css
.header--blurred { background: rgba(0, 0, 0, calc(0.1 + 0.4 * var(--header-blur-progress, 0)));
    -webkit-backdrop-filter: blur(calc(8px + 8px * var(--header-blur-progress, 0))) saturate(calc(150% + 30% * var(--header-blur-progress, 0)));
    backdrop-filter: blur(calc(8px + 8px * var(--header-blur-progress, 0))) saturate(calc(150% + 30% * var(--header-blur-progress, 0)));
    border-bottom: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, calc(0.1 * var(--header-blur-progress, 0)));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
```

```css
.header__icon-button { position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: radial-gradient(circle at 30% 30%,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 40%,
        rgba(255, 255, 255, 0.03) 70%,
        transparent 100%);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: visible;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translateZ(0);
    cursor: pointer;
    
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.25),
      0 3px 12px rgba(255, 255, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15); }
```

```css
.header__icon-button::before { content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none; }
```

```css
.header__icon-button:hover { transform: translateY(-4px) scale(1.05) translateZ(0);
    color: #ffd800;
    box-shadow:
      0 10px 32px rgba(0, 0, 0, 0.35),
      0 6px 20px rgba(255, 216, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.25); }
```

```css
.header__icon-button:hover::before { transform: translate(-50%, -50%) scale(1); }
```

```css
.header__icon-button:focus,
  .header__icon-button:focus-visible { outline: none;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 4px 16px rgba(255, 216, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 0 3px rgba(255, 216, 0, 0.4); }
```

```css
.header__icon-button:active { transform: translateY(-2px) scale(1.02);
    transition: all 0.1s ease; }
```

```css
.header__icon-button:focus:not(:focus-visible) { box-shadow: none; }
```

```css
.header__icon-button { -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  perspective: 1000px; }
```

```css
.header__icon { width: 20px;
  height: 20px;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.header__cart-badge { position: absolute;
  top: -8px;
  right: -8px;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 216, 0, 0.9) 0%,
      rgba(255, 216, 0, 0.7) 50%,
      rgba(255, 216, 0, 0.5) 100%);
  color: #000;
  font-size: 13px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 16px rgba(255, 216, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  z-index: 10;
  white-space: nowrap;
  overflow: visible;
  transform: translateZ(0);
  
  -webkit-animation: badgeFloat 3s ease-in-out infinite;
  animation: badgeFloat 3s ease-in-out infinite; }
```

```css
.header__button { background: linear-gradient(135deg,
      rgba(255, 216, 0, 0.15) 0%,
      rgba(255, 216, 0, 0.08) 50%,
      rgba(255, 216, 0, 0.15) 100%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 216, 0, 0.2);
  transition: all var(--duration-default) var(--easing-smooth);
  position: relative;
  overflow: hidden; }
```

```css
.header__button::before { content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 216, 0, 0.1), transparent);
  transition: left 0.5s ease; }
```

```css
.header__button:hover { background: linear-gradient(135deg,
      rgba(255, 216, 0, 0.25) 0%,
      rgba(255, 216, 0, 0.15) 50%,
      rgba(255, 216, 0, 0.25) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  backdrop-filter: blur(16px) saturate(200%);
  border-color: rgba(255, 216, 0, 0.4);
  transform: translateY(-1px);
  box-shadow:
    0 4px 12px rgba(255, 216, 0, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.1); }
```

```css
.header__button:focus { outline: none;
  box-shadow:
    0 0 0 2px rgba(255, 216, 0, 0.5),
    0 4px 12px rgba(255, 216, 0, 0.2); }
```

```css
.mobile-menu { background: linear-gradient(135deg,
      rgba(15, 23, 42, 0.98) 0%,
      rgba(15, 23, 42, 0.95) 50%,
      rgba(15, 23, 42, 0.98) 100%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  backdrop-filter: blur(24px) saturate(200%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    8px 0 32px rgba(0, 0, 0, 0.4),
    inset 1px 0 0 rgba(255, 255, 255, 0.05); }
```

```css
.mobile-menu__header { background: linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
```

```css
.header--transparent { -webkit-backdrop-filter: none;
    backdrop-filter: none; }
```

```css
.header--scrolled { -webkit-backdrop-filter: blur(16px) saturate(180%);
    backdrop-filter: blur(16px) saturate(180%); }
```

```css
.header__icon-button { width: 40px;
    height: 40px;
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    backdrop-filter: blur(10px) saturate(160%); }
```

```css
.header__icon-button:hover { -webkit-backdrop-filter: blur(14px) saturate(180%);
    backdrop-filter: blur(14px) saturate(180%); }
```

```css
.header__icon { width: 18px;
    height: 18px; }
```

```css
.header__cart-badge { top: -10px;
    right: -10px;
    min-width: 24px;
    height: 24px;
    font-size: 13px;
    line-height: 24px;
    padding: 0 8px; }
```

```css
.header__icon { width: 16px;
    height: 16px; }
```

```css
.header__cart-badge { top: -9px;
    right: -9px;
    min-width: 22px;
    height: 22px;
    font-size: 12px;
    line-height: 22px;
    padding: 0 7px; }
```

```css
.header__button:focus-visible { outline: 2px solid rgba(255, 216, 0, 0.8);
  outline-offset: 2px;
  box-shadow:
    0 0 0 4px rgba(255, 216, 0, 0.2),
    0 4px 12px rgba(255, 216, 0, 0.2); }
```

```css
.header__button::before { transition: none; }
```

```css
.nav-link::after { transition: none; }
```

```css
.mobile-menu a::before { transition: none; }
```

```css
.header--scrolled { -webkit-animation: none;
    animation: none; }
```

```css
.header--dynamic { --scroll-progress: 0; }
```

```css
.nav-link { position: relative;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.nav-link::after { content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.8), rgba(255, 216, 0, 1), rgba(255, 216, 0, 0.8));
  transition: width var(--duration-default) var(--easing-smooth);
  box-shadow: 0 0 8px rgba(255, 216, 0, 0.5); }
```

```css
.nav-link:hover { text-shadow: 0 0 8px rgba(255, 216, 0, 0.3);
  transform: translateY(-1px); }
```

```css
.mobile-menu a { position: relative;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.mobile-menu a::before { content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.1), transparent);
  transition: width var(--duration-default) var(--easing-smooth); }
```

```css
.mobile-menu a:hover { transform: translateX(8px);
  text-shadow: 0 0 12px rgba(255, 216, 0, 0.4); }
```

```css
.header-transparent { background-color: rgba(0, 0, 0, 0.1) !important;
  border-color: transparent !important;
  -webkit-backdrop-filter: blur(6px) saturate(150%);
  backdrop-filter: blur(6px) saturate(150%);
  box-shadow: none; }
```

```css
.header-scrolled { background-color: rgba(0, 0, 0, 0.5) !important;
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: none;
  box-shadow: none; }
```

```css
header { will-change: auto;
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; }
```

```css
header.transition-colors { transition:
    background-color var(--duration-default) var(--easing-smooth),
    border-color var(--duration-default) var(--easing-smooth),
    box-shadow var(--duration-default) var(--easing-smooth),
    -webkit-backdrop-filter var(--duration-default) var(--easing-smooth);
  transition:
    background-color var(--duration-default) var(--easing-smooth),
    border-color var(--duration-default) var(--easing-smooth),
    backdrop-filter var(--duration-default) var(--easing-smooth),
    box-shadow var(--duration-default) var(--easing-smooth);
  transition:
    background-color var(--duration-default) var(--easing-smooth),
    border-color var(--duration-default) var(--easing-smooth),
    backdrop-filter var(--duration-default) var(--easing-smooth),
    box-shadow var(--duration-default) var(--easing-smooth),
    -webkit-backdrop-filter var(--duration-default) var(--easing-smooth); }
```

```css
.cart__header { text-align: center;
  margin-bottom: 2rem; }
```

```css
nav a,
.nav-link { transition: all var(--duration-default) var(--easing-smooth);
  position: relative; }
```

```css
nav a::after,
.nav-link::after { content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(var(--color-primary));
  transition: width var(--duration-default) var(--easing-smooth); }
```

```css
nav a:hover::after,
.nav-link:hover::after { width: 100%; }
```

```css
.media-nav-btn { @apply absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 bg-black/50 text-white rounded-full;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.media-nav-btn:hover { @apply bg-black/70;
  transform: translateY(-50%) scale(1.1); }
```

```css
.media-nav-btn--prev { @apply left-4; }
```

```css
.media-nav-btn--next { @apply right-4; }
```

```css
.media-nav-btn { @apply w-10 h-10; }
```

```css
.media-nav-btn--prev { @apply left-2; }
```

```css
.media-nav-btn--next { @apply right-2; }
```

```css
.search-page__header { max-width: 800px;
  margin: 0 auto 4rem auto;
  text-align: center; }
```

```css
.template-search--empty .template-search__header { text-align: center;
  max-width: 500px; }
```

```css
.template-search--empty .template-search__header h1 { margin-bottom: 1rem; }
```

```css
.template-search--empty .template-search__header p { color: rgba(156, 163, 175, 0.8);
  font-size: 1.125rem;
  margin-bottom: 2rem; }
```

```css
.template-search__header { padding: 1.5rem;
    margin: 1rem; }
```

```css
.template-search__header h1 { font-size: 2rem; }
```

```css
.search-modal__header h2 { font-size: 1.125rem; }
```

```css
.search-modal__header { display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.template-search__header { width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem auto;
  padding: 0 2rem;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  opacity: 0; }
```

```css
.template-search__header h1 { font-size: 4rem;
  font-weight: 900;
  color: white;
  margin-bottom: 3rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
  opacity: 0; }
```

```css
.template-search__header { padding: 0 1rem;
    margin-bottom: 2rem; }
```

```css
.template-search__header h1 { font-size: 2.5rem;
    margin-bottom: 2rem; }
```

```css
.search-page__header { margin-bottom: 2rem; }
```

```css
.mobile-bottom-nav { position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 50;
  display: none;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3); }
```

```css
.header__icon-button.search-toggle,
  .header__icon-button.header__cart-button { display: none !important; }
```

```css
.bottom-nav-item { display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #94a3b8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px 12px;
  border-radius: 12px;
  text-decoration: none;
  position: relative;
  min-width: 60px; }
```

```css
.bottom-nav-item:hover { color: #ffd800;
  background: rgba(255, 216, 0, 0.1);
  transform: translateY(-2px); }
```

```css
.bottom-nav-item:active { transform: translateY(0);
  transition: transform 0.1s ease; }
```

```css
.bottom-nav-item.active { color: #ffd800;
  background: rgba(255, 216, 0, 0.15); }
```

```css
.bottom-nav-icon { width: 24px;
  height: 24px;
  transition: all 0.3s ease; }
```

```css
.bottom-nav-label { font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease; }
```

```css
.bottom-nav-item:hover .bottom-nav-label { color: #ffd800; }
```

```css
.bottom-nav-cart-badge { position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #ffd800, #ffa500);
  color: #000;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 2px solid rgba(15, 23, 42, 0.95);
  box-shadow: 0 2px 8px rgba(255, 216, 0, 0.3);
  -webkit-animation: badgePulse 2s infinite;
  animation: badgePulse 2s infinite; }
```

```css
.bottom-nav-item:focus-visible { outline: 2px solid rgba(255, 216, 0, 0.8);
  outline-offset: 2px;
  background: rgba(255, 216, 0, 0.15); }
```

```css
.bottom-nav-cart-badge { -webkit-animation: none;
    animation: none; }
```

```css
.bottom-nav-item { color: #ffffff; }
```

```css
.bottom-nav-item:hover,
  .bottom-nav-item.active { color: #ffd800;
    background: rgba(255, 216, 0, 0.2); }
```

```css
.bottom-nav-item { padding: 6px 10px; }
```

```css
.bottom-nav-label { font-size: 9px; }
```

```css
.bottom-nav-item { padding: 10px 16px;
    min-width: 70px; }
```

```css
.bottom-nav-label { font-size: 11px; }
```

```css
.mobile-menu,
.search-modal { z-index: 60; }
```

```css
.mobile-bottom-nav { z-index: 50; }
```

```css
.header > div { padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    gap: 0.5rem !important; }
```

```css
.header nav { gap: 0.5rem !important; }
```

```css
.header nav a { font-size: 0.75rem !important;
    padding: 0.25rem 0.5rem !important;
    white-space: nowrap !important; }
```

```css
.header .header__icon-button { width: 40px !important;
    height: 40px !important;
    margin: 0 0.125rem !important; }
```

```css
.header * { white-space: nowrap !important;
    overflow: visible !important; }
```

```css
.header nav { gap: 0.25rem !important; }
```

```css
.header nav a { font-size: 0.7rem !important;
    padding: 0.25rem 0.25rem !important; }
```

```css
.header .header__icon-button { width: 36px !important;
    height: 36px !important;
    margin: 0 0.0625rem !important; }
```

```css
.header .header__icon-button { width: 32px !important;
    height: 32px !important; }
```

```css
.header__container { padding: 1.5rem 0; }
```

```css
.header__left { display: flex;
  align-items: center;
  flex-shrink: 0; }
```

```css
.header__center { display: flex;
  justify-content: center;
  flex: 1;
  min-width: 0; }
```

```css
.header__right { display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-shrink: 0; }
```

```css
.header__menu-toggle { display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.03) 70%,
      transparent 100%);
  border-radius: 50%;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.25),
    0 3px 12px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15); }
```

```css
.header__menu-toggle:hover { transform: translateY(-4px) scale(1.05) translateZ(0);
  color: #ffd800;
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    0 6px 20px rgba(255, 216, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25); }
```

```css
.header__menu-icon { width: 24px;
  height: 24px;
  transition: transform 0.3s ease; }
```

```css
.header__logo-desktop { display: none; }
```

```css
.header__logo-mobile { display: block; }
```

```css
.header__logo-link { display: block;
  transition: transform 0.3s ease; }
```

```css
.header__logo-link:hover { transform: scale(1.05); }
```

```css
.header__logo-image { height: 48px;
  width: auto;
  transition: transform 0.3s ease; }
```

```css
.header__nav-list { display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0; }
```

```css
.header__nav-item { display: flex;
  align-items: center; }
```

```css
.header__nav-link { display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d1d5db;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0; }
```

```css
.header__nav-link:hover { color: #ffd800;
  transform: translateY(-1px); }
```

```css
.header__nav-link::after { content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.8), rgba(255, 216, 0, 1), rgba(255, 216, 0, 0.8));
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(255, 216, 0, 0.5); }
```

```css
.header__nav-icon { width: 20px;
  height: 20px;
  transition: transform 0.3s ease; }
```

```css
.header__nav-text { white-space: nowrap; }
```

```css
.header__action-button { display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.03) 70%,
      transparent 100%);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.25),
    0 3px 12px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15); }
```

```css
.header__action-button:hover { transform: translateY(-4px) scale(1.05) translateZ(0);
  color: #ffd800;
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    0 6px 20px rgba(255, 216, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25); }
```

```css
.header__action-icon { width: 20px;
  height: 20px;
  transition: transform 0.3s ease; }
```

```css
.header__cart-badge { position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd800;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  -webkit-animation: badgeFloat 2s ease-in-out infinite;
  animation: badgeFloat 2s ease-in-out infinite; }
```

```css
.mobile-menu { position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  opacity: 0;
  visibility: hidden; }
```

```css
.mobile-menu--open { transform: translateX(0);
  opacity: 1;
  visibility: visible; }
```

```css
.mobile-menu__header { display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.mobile-menu__logo { height: 56px;
  width: auto; }
```

```css
.mobile-menu__close { display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease; }
```

```css
.mobile-menu__close:hover { background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1); }
```

```css
.mobile-menu__close-icon { width: 24px;
  height: 24px; }
```

```css
.mobile-menu__navigation { flex: 1;
  padding: 1.5rem;
  overflow-y: auto; }
```

```css
.mobile-menu__nav-list { list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem; }
```

```css
.mobile-menu__nav-item { border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.mobile-menu__nav-item:last-child { border-bottom: none; }
```

```css
.mobile-menu__nav-link { display: flex;
  align-items: center;
  gap: 1rem;
  color: #d1d5db;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
  position: relative; }
```

```css
.mobile-menu__nav-link:hover { color: #ffd800;
  transform: translateX(8px); }
```

```css
.mobile-menu__nav-link::before { content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.1), transparent);
  transition: width 0.3s ease; }
```

```css
.mobile-menu__nav-link:hover::before { width: 100%; }
```

```css
.mobile-menu__nav-icon { width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: transform 0.3s ease; }
```

```css
.mobile-menu__nav-link:hover .mobile-menu__nav-icon { transform: scale(1.1); }
```

```css
.mobile-menu__nav-text { font-size: 1.125rem;
  font-weight: 500; }
```

```css
.mobile-bottom-nav { position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 40;
  display: none;
  justify-content: space-around;
  padding: 0.75rem 0;
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom)); }
```

```css
.mobile-bottom-nav__item { display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: #d1d5db;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.5rem;
  min-width: 60px; }
```

```css
.mobile-bottom-nav__item:hover { color: #ffd800;
  transform: translateY(-2px); }
```

```css
.mobile-bottom-nav__icon { width: 24px;
  height: 24px;
  transition: transform 0.3s ease; }
```

```css
.mobile-bottom-nav__item:hover .mobile-bottom-nav__icon { transform: scale(1.1); }
```

```css
.mobile-bottom-nav__label { font-size: 0.75rem;
  font-weight: 500;
  text-align: center; }
```

```css
.mobile-bottom-nav__cart-wrapper { position: relative;
  display: flex;
  align-items: center;
  justify-content: center; }
```

```css
.mobile-bottom-nav__cart-badge { position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd800;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  -webkit-animation: badgePulse 2s ease-in-out infinite;
  animation: badgePulse 2s ease-in-out infinite; }
```

```css
.search-modal__header { display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.header__nav-list { gap: 2.5rem; }
```

```css
.header__nav-link { font-size: 1.125rem; }
```

```css
.header__nav-icon { width: 24px;
    height: 24px; }
```

```css
.header__logo-image { height: 56px; }
```

```css
.header__nav-link { font-size: 1.25rem; }
```

```css
.header__nav-icon { width: 28px;
    height: 28px; }
```

```css
.header__logo-image { height: 64px; }
```

```css
.header__nav-link { font-size: 1.375rem; }
```

```css
.header__nav-icon { width: 32px;
    height: 32px; }
```

```css
.header__logo-image { height: 72px; }
```

```css
.header__nav-link::after,
  .mobile-menu__nav-link::before { transition: none; }
```

```css
.header__cart-badge,
  .mobile-bottom-nav__cart-badge { -webkit-animation: none;
    animation: none; }
```

```css
.mobile-menu,
  .search-modal { border: 2px solid white; }
```

```css
.mobile-menu { position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
      rgba(15, 23, 42, 0.85) 0%,
      rgba(15, 23, 42, 0.8) 50%,
      rgba(15, 23, 42, 0.85) 100%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  backdrop-filter: blur(32px) saturate(200%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    8px 0 32px rgba(0, 0, 0, 0.4),
    inset 1px 0 0 rgba(255, 255, 255, 0.05);
  z-index: 60;
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  visibility: hidden; }
```

```css
.mobile-menu--open { transform: translateX(0);
  opacity: 1;
  visibility: visible; }
```

```css
.mobile-menu__header { display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.65) 100%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0; }
```

```css
.mobile-menu__logo-link { display: block;
  transition: transform 0.3s ease; }
```

```css
.mobile-menu__logo-link:hover { transform: scale(1.05); }
```

```css
.mobile-menu__logo { height: 40px;
  width: auto;
  transition: transform 0.3s ease; }
```

```css
.mobile-menu__close { display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.03) 70%,
      transparent 100%);
  border-radius: 50%;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.25),
    0 3px 12px rgba(255, 255, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15); }
```

```css
.mobile-menu__close:hover { transform: translateY(-4px) scale(1.05) translateZ(0);
  color: #ffd800;
  box-shadow:
    0 10px 32px rgba(0, 0, 0, 0.35),
    0 6px 20px rgba(255, 216, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.25); }
```

```css
.mobile-menu__close-icon { width: 24px;
  height: 24px;
  transition: transform 0.3s ease; }
```

```css
.mobile-menu__close:hover .mobile-menu__close-icon { transform: scale(1.1); }
```

```css
.mobile-menu__content { flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent; }
```

```css
.mobile-menu__content::-webkit-scrollbar { width: 4px; }
```

```css
.mobile-menu__content::-webkit-scrollbar-track { background: transparent; }
```

```css
.mobile-menu__content::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2);
  border-radius: 2px; }
```

```css
.mobile-menu__content::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
```

```css
.mobile-menu__user-section { padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255, 216, 0, 0.05) 0%, rgba(255, 216, 0, 0.02) 100%); }
```

```css
.mobile-menu__user-info { display: flex;
  align-items: center;
  gap: 1rem; }
```

```css
.mobile-menu__user-avatar { display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 216, 0, 0.2) 0%,
      rgba(255, 216, 0, 0.1) 40%,
      rgba(255, 216, 0, 0.05) 70%,
      transparent 100%);
  border-radius: 50%;
  border: 1px solid rgba(255, 216, 0, 0.2); }
```

```css
.mobile-menu__user-details { flex: 1;
  min-width: 0; }
```

```css
.mobile-menu__user-name { color: white;
  font-weight: 600;
  font-size: 1.125rem;
  margin: 0;
  line-height: 1.2; }
```

```css
.mobile-menu__user-email { color: #9ca3af;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
  line-height: 1.2; }
```

```css
.mobile-menu__user-actions { display: flex;
  gap: 0.5rem;
  margin-top: 1rem; }
```

```css
.mobile-menu__user-action-btn { display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px); }
```

```css
.mobile-menu__user-action-btn:hover { background: rgba(255, 216, 0, 0.15);
  border-color: rgba(255, 216, 0, 0.3);
  color: #ffd800;
  transform: translateY(-1px); }
```

```css
.mobile-menu__search { padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.mobile-menu__search-form { width: 100%; }
```

```css
.mobile-menu__search-wrapper { position: relative;
  width: 100%; }
```

```css
.mobile-menu__search-input { width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  backdrop-filter: blur(12px) saturate(150%); }
```

```css
.mobile-menu__search-input::placeholder { color: rgba(255, 255, 255, 0.6); }
```

```css
.mobile-menu__search-input:focus { outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 216, 0, 0.4);
  box-shadow: 0 0 0 3px rgba(255, 216, 0, 0.1); }
```

```css
.mobile-menu__search-submit { position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.3s ease; }
```

```css
.mobile-menu__search-submit:hover { color: #ffd800; }
```

```css
.mobile-menu__search-icon { width: 20px;
  height: 20px; }
```

```css
.mobile-menu__quick-actions { padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.mobile-menu__section-title { color: white;
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  line-height: 1.2; }
```

```css
.mobile-menu__quick-actions-grid { display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem; }
```

```css
.mobile-menu__quick-action { display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  backdrop-filter: blur(16px) saturate(150%);
  position: relative; }
```

```css
.mobile-menu__quick-action:hover { background: rgba(255, 216, 0, 0.1);
  border-color: rgba(255, 216, 0, 0.2);
  color: #ffd800;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 216, 0, 0.15); }
```

```css
.mobile-menu__quick-action-icon { position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 30% 30%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 40%,
      transparent 70%);
  border-radius: 50%;
  transition: all 0.3s ease; }
```

```css
.mobile-menu__quick-action:hover .mobile-menu__quick-action-icon { background: radial-gradient(circle at 30% 30%,
      rgba(255, 216, 0, 0.2) 0%,
      rgba(255, 216, 0, 0.1) 40%,
      transparent 70%);
  transform: scale(1.1); }
```

```css
.mobile-menu__cart-badge { position: absolute;
  top: -8px;
  right: -8px;
  background: #ffd800;
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  animation: badgeFloat 2s ease-in-out infinite; }
```

```css
.mobile-menu__quick-action-text { font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.2; }
```

```css
.mobile-menu__navigation { flex: 1; }
```

```css
.mobile-menu__nav-section { padding: 1rem; }
```

```css
.mobile-menu__nav-list { display: flex;
  flex-direction: column;
  gap: 0.5rem; }
```

```css
.mobile-menu__nav-link { display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  backdrop-filter: blur(12px) saturate(150%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden; }
```

```css
.mobile-menu__nav-link::before { content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.1), transparent);
  transition: width 0.3s ease; }
```

```css
.mobile-menu__nav-link:hover { background: rgba(255, 216, 0, 0.1);
  border-color: rgba(255, 216, 0, 0.2);
  color: #ffd800;
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(255, 216, 0, 0.15); }
```

```css
.mobile-menu__nav-link:hover::before { width: 100%; }
```

```css
.mobile-menu__nav-icon { width: 24px;
  height: 24px;
  flex-shrink: 0;
  transition: transform 0.3s ease; }
```

```css
.mobile-menu__nav-link:hover .mobile-menu__nav-icon { transform: scale(1.1); }
```

```css
.mobile-menu__nav-text { font-size: 1rem;
  font-weight: 500;
  line-height: 1.2; }
```

```css
.mobile-menu__social { padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.mobile-menu__social-links { display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: space-between; }
```

```css
.mobile-menu__social-link { display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  backdrop-filter: blur(16px) saturate(150%);
  position: relative;
  overflow: hidden;
  flex: 1;
  min-width: 0; }
```

```css
.mobile-menu__social-link::before { content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 216, 0, 0.15), transparent);
  transition: width 0.3s ease; }
```

```css
.mobile-menu__social-link:hover { background: linear-gradient(135deg, rgba(255, 216, 0, 0.12) 0%, rgba(255, 216, 0, 0.06) 100%);
  border-color: rgba(255, 216, 0, 0.3);
  color: #ffd800;
  transform: translateX(8px);
  box-shadow: 0 4px 16px rgba(255, 216, 0, 0.2); }
```

```css
.mobile-menu__social-link:hover::before { width: 100%; }
```

```css
.mobile-menu__social-icon { width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease; }
```

```css
.mobile-menu__social-link:hover .mobile-menu__social-icon { transform: scale(1.1); }
```

```css
.mobile-menu__social-text { font-weight: 500;
  line-height: 1.2; }
```

```css
.mobile-menu__footer { padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.5) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  backdrop-filter: blur(16px) saturate(150%); }
```

```css
.mobile-menu__footer-links { display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%; }
```

```css
.mobile-menu__footer-link { color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  padding: 0.125rem 0.25rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 1.5rem; }
```

```css
.mobile-menu__footer-link:hover { color: #ffd800;
  transform: translateX(4px); }
```

```css
.mobile-menu__footer-copyright { margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.625rem;
  line-height: 1.4; }
```

```css
.mobile-menu__logo { height: 40px; }
```

```css
.mobile-menu__close { width: 40px;
    height: 40px; }
```

```css
.mobile-menu__close-icon { width: 20px;
    height: 20px; }
```

```css
.mobile-menu__user-section,
  .mobile-menu__search,
  .mobile-menu__quick-actions,
  .mobile-menu__nav-section,
  .mobile-menu__social,
  .mobile-menu__footer { padding: 1rem; }
```

```css
.mobile-menu__quick-actions-grid { gap: 0.5rem; }
```

```css
.mobile-menu__quick-action { padding: 0.75rem; }
```

```css
.mobile-menu__quick-action-icon { width: 40px;
    height: 40px; }
```

```css
.mobile-menu__nav-link { padding: 0.75rem; }
```

```css
.mobile-menu__social-link { width: 32px;
    height: 32px; }
```

```css
.mobile-menu__social-icon { width: 16px;
    height: 16px; }
```

```css
.mobile-menu__footer-link { font-size: 0.6875rem;
    padding: 0.125rem 0; }
```

```css
.mobile-menu__footer-copyright { font-size: 0.5625rem;
    margin-top: 0.5rem; }
```

```css
.mobile-menu__close:hover,
  .mobile-menu__quick-action:hover,
  .mobile-menu__nav-link:hover,
  .mobile-menu__social-link:hover { transform: none; }
```

```css
.mobile-menu__cart-badge { animation: none; }
```

```css
.mobile-menu__header { border-bottom: 2px solid white; }
```

```css
.mobile-menu__close { background: white;
    color: black; }
```

```css
.mobile-menu__search-input { border: 2px solid white;
    background: white;
    color: black; }
```

```css
.mobile-menu__search-input::placeholder { color: rgba(0, 0, 0, 0.6); }
```

```css
.mobile-menu__nav-link,
  .mobile-menu__quick-action { border: 1px solid white; }
```

```css
.mobile-menu__close:focus,
.mobile-menu__search-input:focus,
.mobile-menu__search-submit:focus,
.mobile-menu__user-action-btn:focus,
.mobile-menu__quick-action:focus,
.mobile-menu__nav-link:focus,
.mobile-menu__social-link:focus,
.mobile-menu__footer-link:focus { outline: 2px solid #ffd800;
  outline-offset: 2px; }
```

---

### dev/css/components/product-cards.css
**Missing blocks:** 112

```css
.product-card-widget .bg-gray-800-60 { background-color: rgba(31, 41, 55, 0.6); }
```

```css
.product-card-widget:hover .bg-gray-800-60 { background-color: rgba(31, 41, 55, 0.8); }
```

```css
.product-card-widget { min-height: 280px;
  display: flex;
  flex-direction: column; }
```

```css
.product-card-list-modern .bg-red-900\/50 { background: linear-gradient(135deg, rgba(127, 29, 29, 0.5) 0%, rgba(185, 28, 28, 0.5) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3); }
```

```css
.product-card-list-modern .text-primary { background: linear-gradient(135deg, #ffd800 0%, #ffed4e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(255, 216, 0, 0.3); }
```

```css
.product-card-list-modern .gap-6 { gap: 1rem; }
```

```css
.product-card-list-modern .text-2xl { font-size: 1.25rem; }
```

```css
.product-card-list-modern .flex.items-center.gap-3 { flex-direction: column;
    gap: 0.5rem;
    width: 100%; }
```

```css
.product-card-widget { background-image: url('{{ "image-widget-backing.png" | asset_url }
```

```css
.product-card-wrapper .card,
.contains-card--product { --border-radius: var(--product-card-corner-radius, 1rem);
  --border-width: var(--product-card-border-width, 1px);
  --border-opacity: var(--product-card-border-opacity, 0.1);
  --shadow-horizontal-offset: var(--product-card-shadow-horizontal-offset, 0);
  --shadow-vertical-offset: var(--product-card-shadow-vertical-offset, 4px);
  --shadow-blur-radius: var(--product-card-shadow-blur-radius, 8px);
  --shadow-opacity: var(--product-card-shadow-opacity, 0.1);
  --image-padding: var(--product-card-image-padding, 0);
  --text-alignment: var(--product-card-text-alignment, center); }
```

```css
.product-card-widget { background-image: var(--widget-bg-image);
    background-color: rgba(31, 41, 55, 0.5);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(75, 85, 99, 1);
    border-radius: 1rem;
    overflow: hidden;
    transition: all var(--duration-card) var(--easing-smooth);
    min-height: 300px;
    max-height: none;
    display: flex;
    flex-direction: column;
    transform: translateZ(0);
    will-change: transform; }
```

```css
.product-card-widget:hover { border-color: rgb(255, 216, 0);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(255, 216, 0, 0.2);
    transform: translateY(-6px) scale(1.03) translateZ(0); }
```

```css
.product-card-widget img { -o-object-fit: cover;
    object-fit: cover;
    max-width: 160px;
    max-height: 160px;
    transition: all var(--duration-card) var(--easing-smooth); }
```

```css
.product-card-widget:not(:hover) { transition-delay: 0ms; }
```

```css
.product-card-widget:hover { transition-delay: 0ms; }
```

```css
.product-card-widget,
  .card-hover,
  .product-card-list-modern { -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    perspective: 1000px; }
```

```css
.product-card-widget .p-4,
  .product-card-widget .sm\:p-6,
  .product-card-widget .lg\:p-8 { display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0; }
```

```css
.product-card-widget .text-center { margin-top: auto;
    padding-top: 1rem; }
```

```css
.product-card-widget h3 { margin-bottom: 0.5rem;
    line-height: 1.3;
    word-wrap: break-word;
    overflow-wrap: break-word; }
```

```css
.product-card-widget .text-xs { margin-bottom: 0.5rem;
    line-height: 1.2; }
```

```css
.product-card-widget .font-bold { margin-bottom: 0.5rem;
    line-height: 1.2; }
```

```css
.product-form { @apply space-y-6;
  -webkit-animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards;
  animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.product-form__error-message-wrapper { @apply hidden; }
```

```css
.product-form__error-message-wrapper:not([hidden]) { @apply flex items-start text-sm leading-relaxed mb-6; }
```

```css
.product-form__error-message-wrapper .svg-wrapper { @apply flex-shrink-0 w-6 h-6 mr-3 mt-1; }
```

```css
.product-form__variants { @apply space-y-4; }
```

```css
.product-form__variant-group { @apply space-y-2; }
```

```css
.product-form__variant-label { @apply block text-sm font-medium text-white mb-2; }
```

```css
.product-form__variant-options { @apply grid gap-2; }
```

```css
.product-form__variant-input { @apply relative; }
```

```css
.product-form__variant-label-option { @apply flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg cursor-pointer;
  transition: all var(--duration-default) var(--easing-spring);
  transform: translateZ(0); }
```

```css
.product-form__variant-label-option:hover { @apply border-primary bg-primary/10;
  transform: translateY(-2px) scale(1.02); }
```

```css
.product-form__variant-label-option.selected { @apply border-primary bg-primary text-black;
  transform: scale(1.05); }
```

```css
.product-form__variant-label-option.disabled { @apply opacity-50 cursor-not-allowed; }
```

```css
.product-form__quantity { @apply space-y-2; }
```

```css
.product-form__quantity-label { @apply block text-sm font-medium text-white; }
```

```css
.product-form__quantity-wrapper { @apply flex items-center border border-white/20 rounded-lg overflow-hidden; }
```

```css
.product-form__quantity-button { @apply flex items-center justify-center w-12 h-12 bg-white/5 text-white;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.product-form__quantity-button:hover { @apply bg-white/10;
  transform: scale(1.1); }
```

```css
.product-form__quantity-input { @apply flex-1 text-center bg-transparent text-white border-none outline-none px-4 py-3; }
```

```css
.product-form__info { @apply space-y-4; }
```

```css
.product-form__price { @apply text-2xl font-bold text-white; }
```

```css
.product-form__price--compare { @apply text-lg text-gray-400 line-through; }
```

```css
.product-form__price--sale { @apply text-red-400; }
```

```css
.product-form__inventory { @apply text-sm; }
```

```css
.product-form__inventory--low { @apply text-yellow-400; }
```

```css
.product-form__inventory--out { @apply text-red-400; }
```

```css
.product-form__dynamic-checkout { @apply mt-4; }
```

```css
.product-card-widget .bg-gray-800-60 { background-color: rgba(31, 41, 55, 0.6); }
```

```css
.product-card-widget:hover .bg-gray-800-60 { background-color: rgba(31, 41, 55, 0.8); }
```

```css
.product-card-widget { min-height: 280px;
  display: flex;
  flex-direction: column; }
```

```css
.product-card-list-modern .bg-red-900\/50 { background: linear-gradient(135deg, rgba(127, 29, 29, 0.5) 0%, rgba(185, 28, 28, 0.5) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3); }
```

```css
.product-card-list-modern .text-primary { background: linear-gradient(135deg, #ffd800 0%, #ffed4e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(255, 216, 0, 0.3); }
```

```css
.product-card-list-modern .gap-6 { gap: 1rem; }
```

```css
.product-card-list-modern .text-2xl { font-size: 1.25rem; }
```

```css
.product-card-list-modern .flex.items-center.gap-3 { flex-direction: column;
    gap: 0.5rem;
    width: 100%; }
```

```css
.product-card-widget { background-image: url('{{ "image-widget-backing.png" | asset_url }
```

```css
.product-card-wrapper .card,
.contains-card--product { --border-radius: var(--product-card-corner-radius, 1rem);
  --border-width: var(--product-card-border-width, 1px);
  --border-opacity: var(--product-card-border-opacity, 0.1);
  --shadow-horizontal-offset: var(--product-card-shadow-horizontal-offset, 0);
  --shadow-vertical-offset: var(--product-card-shadow-vertical-offset, 4px);
  --shadow-blur-radius: var(--product-card-shadow-blur-radius, 8px);
  --shadow-opacity: var(--product-card-shadow-opacity, 0.1);
  --image-padding: var(--product-card-image-padding, 0);
  --text-alignment: var(--product-card-text-alignment, center); }
```

```css
.product-card-widget { background-image: var(--widget-bg-image);
    background-color: rgba(31, 41, 55, 0.5);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(75, 85, 99, 1);
    border-radius: 1rem;
    overflow: hidden;
    transition: all var(--duration-card) var(--easing-smooth);
    min-height: 300px;
    max-height: none;
    display: flex;
    flex-direction: column;
    transform: translateZ(0);
    will-change: transform; }
```

```css
.product-card-widget:hover { border-color: rgb(255, 216, 0);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(255, 216, 0, 0.2);
    transform: translateY(-6px) scale(1.03) translateZ(0); }
```

```css
.product-card-widget img { -o-object-fit: cover;
    object-fit: cover;
    max-width: 160px;
    max-height: 160px;
    transition: all var(--duration-card) var(--easing-smooth); }
```

```css
.product-card-widget:not(:hover) { transition-delay: 0ms; }
```

```css
.product-card-widget:hover { transition-delay: 0ms; }
```

```css
.product-card-widget,
  .card-hover,
  .product-card-list-modern { -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    perspective: 1000px; }
```

```css
.product-card-widget .p-4,
  .product-card-widget .sm\:p-6,
  .product-card-widget .lg\:p-8 { display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0; }
```

```css
.product-card-widget .text-center { margin-top: auto;
    padding-top: 1rem; }
```

```css
.product-card-widget h3 { margin-bottom: 0.5rem;
    line-height: 1.3;
    word-wrap: break-word;
    overflow-wrap: break-word; }
```

```css
.product-card-widget .text-xs { margin-bottom: 0.5rem;
    line-height: 1.2; }
```

```css
.product-card-widget .font-bold { margin-bottom: 0.5rem;
    line-height: 1.2; }
```

```css
.product-form { @apply space-y-6;
  -webkit-animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards;
  animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.product-form__error-message-wrapper { @apply hidden; }
```

```css
.product-form__error-message-wrapper:not([hidden]) { @apply flex items-start text-sm leading-relaxed mb-6; }
```

```css
.product-form__error-message-wrapper .svg-wrapper { @apply flex-shrink-0 w-6 h-6 mr-3 mt-1; }
```

```css
.product-form__variants { @apply space-y-4; }
```

```css
.product-form__variant-group { @apply space-y-2; }
```

```css
.product-form__variant-label { @apply block text-sm font-medium text-white mb-2; }
```

```css
.product-form__variant-options { @apply grid gap-2; }
```

```css
.product-form__variant-input { @apply relative; }
```

```css
.product-form__variant-label-option { @apply flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg cursor-pointer;
  transition: all var(--duration-default) var(--easing-spring);
  transform: translateZ(0); }
```

```css
.product-form__variant-label-option:hover { @apply border-primary bg-primary/10;
  transform: translateY(-2px) scale(1.02); }
```

```css
.product-form__variant-label-option.selected { @apply border-primary bg-primary text-black;
  transform: scale(1.05); }
```

```css
.product-form__variant-label-option.disabled { @apply opacity-50 cursor-not-allowed; }
```

```css
.product-form__quantity { @apply space-y-2; }
```

```css
.product-form__quantity-label { @apply block text-sm font-medium text-white; }
```

```css
.product-form__quantity-wrapper { @apply flex items-center border border-white/20 rounded-lg overflow-hidden; }
```

```css
.product-form__quantity-button { @apply flex items-center justify-center w-12 h-12 bg-white/5 text-white;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.product-form__quantity-button:hover { @apply bg-white/10;
  transform: scale(1.1); }
```

```css
.product-form__quantity-input { @apply flex-1 text-center bg-transparent text-white border-none outline-none px-4 py-3; }
```

```css
.product-form__info { @apply space-y-4; }
```

```css
.product-form__price { @apply text-2xl font-bold text-white; }
```

```css
.product-form__price--compare { @apply text-lg text-gray-400 line-through; }
```

```css
.product-form__price--sale { @apply text-red-400; }
```

```css
.product-form__inventory { @apply text-sm; }
```

```css
.product-form__inventory--low { @apply text-yellow-400; }
```

```css
.product-form__inventory--out { @apply text-red-400; }
```

```css
.product-form__dynamic-checkout { @apply mt-4; }
```

```css
.product-item .product-card-widget { height: 100%;
  display: flex;
  flex-direction: column; }
```

```css
.product-card-widget .text-center > * { margin-bottom: 0.75rem; }
```

```css
.product-card-widget .text-center > *:last-child { margin-bottom: 0; }
```

```css
.search-page__product-card { display: flex;
  flex-direction: column;
  height: 100%; }
```

```css
.template-search__results .product-card-widget { height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent !important; }
```

```css
.template-search__results .product-card-list-modern { height: 100%; }
```

```css
.template-search__results .product-card-widget { border: none !important;
  background: transparent !important; }
```

```css
.template-search__results .product-card-widget .p-4,
.template-search__results .product-card-widget .sm\:p-6,
.template-search__results .product-card-widget .lg\:p-8 { padding: 1.5rem !important; }
```

```css
.template-search__results .product-card-widget img { width: 100% !important;
  height: auto !important;
  max-width: 200px !important;
  margin: 0 auto 1rem !important; }
```

```css
.template-search__results .product-card-widget h3 { font-size: 1.125rem !important;
  line-height: 1.4 !important;
  margin-bottom: 0.75rem !important; }
```

```css
.template-search__results .product-card-widget .font-bold { font-size: 1.25rem !important;
  margin-top: 0.5rem !important; }
```

```css
.template-search__results .product-card-widget .p-4,
  .template-search__results .product-card-widget .sm\:p-6,
  .template-search__results .product-card-widget .lg\:p-8 { padding: 1rem !important; }
```

```css
.template-search__results .product-card-widget img { max-width: 150px !important; }
```

```css
.template-search__results .product-card-widget h3 { font-size: 1rem !important; }
```

```css
.template-search__results .product-card-widget .font-bold { font-size: 1.125rem !important; }
```

```css
.template-search__results .product-card-widget img { max-width: 120px !important; }
```

---

### dev/css/components/buttons.css
**Missing blocks:** 95

```css
p,
span,
div,
a,
button,
input,
textarea,
label { text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; }
```

```css
button,
input,
textarea,
select { font-family: inherit;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; }
```

```css
.hero-section__button { display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: black;
  background: rgb(255, 216, 0);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease; }
```

```css
.hero-section__button:hover { background: rgb(251, 191, 36);
  transform: translateY(-1px); }
```

```css
.hero-section__button-icon { width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0; }
```

```css
.hero-section__button { padding: 1rem 2rem;
    font-size: 1.125rem; }
```

```css
.hero-section__button { padding: 1.25rem 2.5rem;
    font-size: 1.25rem; }
```

```css
.hero-section__button { margin-bottom: 0.125rem; }
```

```css
.search__button .icon { height: 1.8rem; }
```

```css
.cta-button { margin-top: 2.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1.0625rem;
  font-weight: 600; }
```

```css
.quantity__button.disabled:hover,
.quantity__button:disabled:hover { background-color: transparent;
  transform: none; }
```

```css
.accessible-button { position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--primary);
  color: var(--primary-foreground);
  min-height: 44px;
  
  min-width: 44px; }
```

```css
.accessible-button:hover:not(:disabled) { opacity: 0.9;
  transform: translateY(-1px); }
```

```css
.accessible-button:focus { outline: 2px solid var(--ring);
  outline-offset: 2px; }
```

```css
.button-content { display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease; }
```

```css
.button-icon { display: flex;
  align-items: center;
  justify-content: center; }
```

```css
.accessible-button.btn-secondary { background-color: var(--secondary);
  color: var(--secondary-foreground); }
```

```css
.accessible-button.btn-outline { background-color: transparent;
  border-color: var(--border);
  color: var(--foreground); }
```

```css
.accessible-button.btn-outline:hover:not(:disabled) { background-color: var(--accent);
  color: var(--accent-foreground); }
```

```css
.accessible-button.btn-ghost { background-color: transparent;
  border-color: transparent;
  color: var(--foreground); }
```

```css
.accessible-button.btn-ghost:hover:not(:disabled) { background-color: var(--accent);
  color: var(--accent-foreground); }
```

```css
.accessible-button.btn-destructive { background-color: var(--destructive);
  color: var(--destructive-foreground); }
```

```css
.accessible-button.btn-sm { padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-height: 36px; }
```

```css
.accessible-button.btn-lg { padding: 1rem 2rem;
  font-size: 1.125rem;
  min-height: 52px; }
```

```css
.accessible-button:focus { outline-width: 3px;
    outline-color: #000; }
```

```css
.share-buttons { grid-template-columns: 1fr; }
```

```css
.btn-primary { @apply inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-medium rounded-lg;
    transition: all var(--duration-default) var(--easing-spring);
    transform: translateZ(0);
    text-decoration: none;
    border: none;
    cursor: pointer; }
```

```css
.btn-primary:hover { @apply bg-primary-600 shadow-lg;
    transform: translateY(-2px) scale(1.02); }
```

```css
.btn-secondary { @apply inline-flex items-center gap-2 px-6 py-3 bg-transparent text-primary border border-primary font-medium rounded-lg;
    transition: all var(--duration-default) var(--easing-smooth);
    transform: translateZ(0); }
```

```css
.btn-secondary:hover { @apply bg-primary text-black;
    transform: translateY(-1px); }
```

```css
button:focus,
  input:focus,
  textarea:focus,
  select:focus,
  [tabindex]:focus:not([tabindex="-1"]) { @apply ring-2 ring-primary ring-opacity-50; }
```

```css
.quantity__button .icon { width: 1.6rem;
  height: 1.6rem; }
```

```css
.button--tertiary { background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ef4444;
  padding: 0.8rem;
  border-radius: 0.5rem;
  transition: all var(--duration-default) var(--easing-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; }
```

```css
.button--tertiary:hover { background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  transform: scale(1.05); }
```

```css
.button--tertiary .icon { width: 1.4rem;
  height: 1.4rem; }
```

```css
button { transition: all var(--duration-default) var(--easing-smooth);
  transform: translateZ(0); }
```

```css
button:hover { transform: translateY(-1px); }
```

```css
button:active { transform: translateY(0) scale(0.98); }
```

```css
.product-media-gallery .thumbnail-btn { @apply flex-shrink-0 overflow-hidden;
  transition: all 0.2s ease;
  position: relative; }
```

```css
.product-media-gallery .thumbnail-btn:hover { @apply ring-1 ring-primary; }
```

```css
.product-media-gallery .thumbnail-btn img { @apply w-full h-full object-cover;
  display: block;
  transition: transform 0.2s ease; }
```

```css
.product-media-gallery .thumbnail-btn:hover img { transform: scale(1.05); }
```

```css
p,
span,
div,
a,
button,
input,
textarea,
label { text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; }
```

```css
button,
input,
textarea,
select { font-family: inherit;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased; }
```

```css
.hero-section__button { display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: black;
  background: rgb(255, 216, 0);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease; }
```

```css
.hero-section__button:hover { background: rgb(251, 191, 36);
  transform: translateY(-1px); }
```

```css
.hero-section__button-icon { width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0; }
```

```css
.hero-section__button { padding: 1rem 2rem;
    font-size: 1.125rem; }
```

```css
.hero-section__button { padding: 1.25rem 2.5rem;
    font-size: 1.25rem; }
```

```css
.hero-section__button { margin-bottom: 0.125rem; }
```

```css
.search__button .icon { height: 1.8rem; }
```

```css
.cta-button { margin-top: 2.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1.0625rem;
  font-weight: 600; }
```

```css
.quantity__button.disabled:hover,
.quantity__button:disabled:hover { background-color: transparent;
  transform: none; }
```

```css
.accessible-button { position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--primary);
  color: var(--primary-foreground);
  min-height: 44px;
  
  min-width: 44px; }
```

```css
.accessible-button:hover:not(:disabled) { opacity: 0.9;
  transform: translateY(-1px); }
```

```css
.accessible-button:focus { outline: 2px solid var(--ring);
  outline-offset: 2px; }
```

```css
.button-content { display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s ease; }
```

```css
.button-icon { display: flex;
  align-items: center;
  justify-content: center; }
```

```css
.accessible-button.btn-secondary { background-color: var(--secondary);
  color: var(--secondary-foreground); }
```

```css
.accessible-button.btn-outline { background-color: transparent;
  border-color: var(--border);
  color: var(--foreground); }
```

```css
.accessible-button.btn-outline:hover:not(:disabled) { background-color: var(--accent);
  color: var(--accent-foreground); }
```

```css
.accessible-button.btn-ghost { background-color: transparent;
  border-color: transparent;
  color: var(--foreground); }
```

```css
.accessible-button.btn-ghost:hover:not(:disabled) { background-color: var(--accent);
  color: var(--accent-foreground); }
```

```css
.accessible-button.btn-destructive { background-color: var(--destructive);
  color: var(--destructive-foreground); }
```

```css
.accessible-button.btn-sm { padding: 0.5rem 1rem;
  font-size: 0.875rem;
  min-height: 36px; }
```

```css
.accessible-button.btn-lg { padding: 1rem 2rem;
  font-size: 1.125rem;
  min-height: 52px; }
```

```css
.accessible-button:focus { outline-width: 3px;
    outline-color: #000; }
```

```css
.share-buttons { grid-template-columns: 1fr; }
```

```css
.btn-primary { @apply inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-medium rounded-lg;
    transition: all var(--duration-default) var(--easing-spring);
    transform: translateZ(0);
    text-decoration: none;
    border: none;
    cursor: pointer; }
```

```css
.btn-primary:hover { @apply bg-primary-600 shadow-lg;
    transform: translateY(-2px) scale(1.02); }
```

```css
.btn-secondary { @apply inline-flex items-center gap-2 px-6 py-3 bg-transparent text-primary border border-primary font-medium rounded-lg;
    transition: all var(--duration-default) var(--easing-smooth);
    transform: translateZ(0); }
```

```css
.btn-secondary:hover { @apply bg-primary text-black;
    transform: translateY(-1px); }
```

```css
button:focus,
  input:focus,
  textarea:focus,
  select:focus,
  [tabindex]:focus:not([tabindex="-1"]) { @apply ring-2 ring-primary ring-opacity-50; }
```

```css
.quantity__button .icon { width: 1.6rem;
  height: 1.6rem; }
```

```css
.button--tertiary { background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ef4444;
  padding: 0.8rem;
  border-radius: 0.5rem;
  transition: all var(--duration-default) var(--easing-smooth);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; }
```

```css
.button--tertiary:hover { background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  transform: scale(1.05); }
```

```css
.button--tertiary .icon { width: 1.4rem;
  height: 1.4rem; }
```

```css
button { transition: all var(--duration-default) var(--easing-smooth);
  transform: translateZ(0); }
```

```css
button:hover { transform: translateY(-1px); }
```

```css
button:active { transform: translateY(0) scale(0.98); }
```

```css
.product-media-gallery .thumbnail-btn { @apply flex-shrink-0 overflow-hidden;
  transition: all 0.2s ease;
  position: relative; }
```

```css
.product-media-gallery .thumbnail-btn:hover { @apply ring-1 ring-primary; }
```

```css
.product-media-gallery .thumbnail-btn img { @apply w-full h-full object-cover;
  display: block;
  transition: transform 0.2s ease; }
```

```css
.product-media-gallery .thumbnail-btn:hover img { transform: scale(1.05); }
```

```css
.thumbnail-btn { @apply relative aspect-square overflow-hidden rounded-lg cursor-pointer;
  transition: all var(--duration-default) var(--easing-smooth);
  transform: translateZ(0); }
```

```css
.thumbnail-btn:hover { @apply ring-2 ring-primary;
  transform: scale(1.05); }
```

```css
.thumbnail-btn.active { @apply ring-2 ring-primary;
  transform: scale(1.05); }
```

```css
.thumbnail-btn img { @apply w-full h-full object-cover; }
```

```css
.product-key-info button:focus,
.product-key-info input:focus,
.product-key-info select:focus { outline: 2px solid rgb(var(--color-primary));
  outline-offset: 2px;
  border-radius: 0.375rem; }
```

```css
.product-media-gallery .thumbnail-btn { flex-shrink: 0;
  max-width: 80px;
  max-height: 80px; }
```

```css
.guarantee-button { background-color: rgb(255, 216, 0);
  color: black;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all var(--duration-default) var(--easing-smooth);
  transform: scale(1);
  cursor: pointer;
  text-decoration: none;
  display: inline-block; }
```

```css
.guarantee-button:hover { background-color: rgb(230, 194, 0);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: scale(1.05); }
```

```css
.template-404 .cta-button { margin-top: 2.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1.0625rem;
  font-weight: 600;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
  opacity: 0; }
```

```css
.search-form input:focus,
.search-form button:focus { outline: none !important;
  box-shadow: none !important; }
```

```css
.hero-section__button { margin-bottom: 0.125rem; }
```

---

### dev/css/pages/hero.css
**Missing blocks:** 60

```css
.hero-section { background-image:
    linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url("image-hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: calc(100vh - 6rem);
  
  position: relative;
  overflow: hidden;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%); }
```

```css
.hero-section__title { font-family:
    system-ui,
    -apple-system,
    sans-serif;
  line-height: 1.1;
  color: white;
  margin-bottom: 1.75rem !important; }
```

```css
.hero-section__title-primary { display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
```

```css
.hero-section__title-accent { display: block;
  font-size: 3rem;
  font-weight: 800;
  color: rgb(255, 216, 0);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
```

```css
.hero-section__trusted { padding-top: 0.5rem; }
```

```css
.hero-section__trusted-title { font-size: 1.75rem;
  font-weight: 600;
  color: white;
  line-height: 1.3; }
```

```css
.hero-section__trusted-subtitle { font-size: 1rem;
  line-height: 1.5;
  color: rgb(156, 163, 175);
  font-weight: 400; }
```

```css
.hero-section__title-accent { font-size: 3.5rem; }
```

```css
.hero-section__title { margin-bottom: 2rem !important; }
```

```css
.hero-section__trusted-title { font-size: 2rem; }
```

```css
.hero-section__title-accent { font-size: 4rem; }
```

```css
.hero-section__title { margin-bottom: 2.5rem !important; }
```

```css
.hero-section__trusted-title { font-size: 2.25rem; }
```

```css
.hero-section__trusted-subtitle { font-size: 1.25rem; }
```

```css
.hero-section__title-primary { font-size: 2.25rem; }
```

```css
.hero-section__title-accent { font-size: 1.75rem; }
```

```css
.hero-section__trusted-subtitle { font-size: 0.875rem; }
```

```css
.hero-section__title { margin-bottom: 0.125rem; }
```

```css
.hero-cta.mb-16 { margin-bottom: 1rem !important; }
```

```css
.hero-section__trusted { margin-top: 0.0625rem;
    margin-bottom: 0.0625rem; }
```

```css
.hero-section__trusted .relative.overflow-hidden.rounded-2xl { padding: 0.125rem 0.0625rem; }
```

```css
.hero-section__title-accent { font-size: 1.5rem; }
```

```css
.hero-section__trusted { padding-top: 0.25rem; }
```

```css
.hero-cta.mb-16 { margin-bottom: 0.75rem !important; }
```

```css
.hero-section__trusted .relative.overflow-hidden.rounded-2xl { padding: 0.0625rem; }
```

```css
.hero-section { background-image:
    linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url("image-hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: calc(100vh - 6rem);
  
  position: relative;
  overflow: hidden;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100vw;
  margin-left: calc(-50vw + 50%); }
```

```css
.hero-section__title { font-family:
    system-ui,
    -apple-system,
    sans-serif;
  line-height: 1.1;
  color: white;
  margin-bottom: 1.75rem !important; }
```

```css
.hero-section__title-primary { display: block;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
```

```css
.hero-section__title-accent { display: block;
  font-size: 3rem;
  font-weight: 800;
  color: rgb(255, 216, 0);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
```

```css
.hero-section__trusted { padding-top: 0.5rem; }
```

```css
.hero-section__trusted-title { font-size: 1.75rem;
  font-weight: 600;
  color: white;
  line-height: 1.3; }
```

```css
.hero-section__trusted-subtitle { font-size: 1rem;
  line-height: 1.5;
  color: rgb(156, 163, 175);
  font-weight: 400; }
```

```css
.hero-section__title-accent { font-size: 3.5rem; }
```

```css
.hero-section__title { margin-bottom: 2rem !important; }
```

```css
.hero-section__trusted-title { font-size: 2rem; }
```

```css
.hero-section__title-accent { font-size: 4rem; }
```

```css
.hero-section__title { margin-bottom: 2.5rem !important; }
```

```css
.hero-section__trusted-title { font-size: 2.25rem; }
```

```css
.hero-section__trusted-subtitle { font-size: 1.25rem; }
```

```css
.hero-section__title-primary { font-size: 2.25rem; }
```

```css
.hero-section__title-accent { font-size: 1.75rem; }
```

```css
.hero-section__trusted-subtitle { font-size: 0.875rem; }
```

```css
.hero-section__title { margin-bottom: 0.125rem; }
```

```css
.hero-cta.mb-16 { margin-bottom: 1rem !important; }
```

```css
.hero-section__trusted { margin-top: 0.0625rem;
    margin-bottom: 0.0625rem; }
```

```css
.hero-section__trusted .relative.overflow-hidden.rounded-2xl { padding: 0.125rem 0.0625rem; }
```

```css
.hero-section__title-accent { font-size: 1.5rem; }
```

```css
.hero-section__trusted { padding-top: 0.25rem; }
```

```css
.hero-cta.mb-16 { margin-bottom: 0.75rem !important; }
```

```css
.hero-section__trusted .relative.overflow-hidden.rounded-2xl { padding: 0.0625rem; }
```

```css
.guarantee-hero { min-height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative; }
```

```css
.guarantee-hero-content { max-width: 42rem;
  width: 100%;
  margin-bottom: 3rem;
  padding-top: 8rem; }
```

```css
.hero-section { background-image:
      radial-gradient(circle at 20% 80%, rgba(255, 216, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 216, 0, 0.05) 0%, transparent 50%),
      linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.6)), url("image-hero-bg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; }
```

```css
.hero-section__title-primary { font-size: 2.25rem; }
```

```css
.hero-section__title-accent { font-size: 1.75rem; }
```

```css
.hero-section__trusted-subtitle { font-size: 0.875rem; }
```

```css
.hero-section__title { margin-bottom: 0.125rem; }
```

```css
.hero-cta.mb-16 { margin-bottom: 1rem !important; }
```

```css
.hero-section__trusted { margin-top: 0.0625rem;
    margin-bottom: 0.0625rem; }
```

```css
.hero-section__trusted .relative.overflow-hidden.rounded-2xl { padding: 0.125rem 0.0625rem; }
```

---

### dev/css/components/search.css
**Missing blocks:** 69

```css
.template-search__search { margin: 0 auto 3.5rem;
  max-width: 74.1rem; }
```

```css
.template-search__search .search { margin-top: 3rem; }
```

```css
.template-search--empty { padding-bottom: 18rem; }
```

```css
.search-card-ratio { --ratio-percent: 100%; }
```

```css
.template-search__search { margin: 0 auto 3.5rem;
  max-width: 74.1rem; }
```

```css
.template-search__search .search { margin-top: 3rem; }
```

```css
.template-search--empty { padding-bottom: 18rem; }
```

```css
.search-card-ratio { --ratio-percent: 100%; }
```

```css
.search-page { background: #181b30;
  min-height: 100vh;
  padding: 4rem 2rem;
  color: #ffffff;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif; }
```

```css
.search-page__title { font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
  line-height: 1.2;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); }
```

```css
.search-page__results-count { font-size: 1.125rem;
  color: #9ca3af;
  margin-top: 2rem;
  text-align: center; }
```

```css
.search-page__no-results { font-size: 1.125rem;
  color: #9ca3af;
  margin-top: 2rem;
  text-align: center; }
```

```css
.search-page__results { max-width: 1200px;
  margin: 0 auto; }
```

```css
.search-page__empty-state { text-align: center;
  padding: 4rem 2rem; }
```

```css
.search-page__empty-title { font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff; }
```

```css
.search-page__empty-text { font-size: 1.125rem;
  color: #9ca3af;
  line-height: 1.6; }
```

```css
.search-page__link { color: #ffd800;
  text-decoration: underline;
  transition: color 0.2s ease; }
```

```css
.search-page__link:hover { color: #e6c200; }
```

```css
.search-page__grid { width: 100%; }
```

```css
.search-page__products { display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0; }
```

```css
.search-page__product { background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(255, 216, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: border-color 0.2s ease; }
```

```css
.search-page__product:hover { border-color: rgba(255, 216, 0, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 216, 0, 0.1); }
```

```css
.search-page__product-image { aspect-ratio: 1;
  overflow: hidden;
  background: #000000; }
```

```css
.search-page__product-image img { width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  transition: transform 0.2s ease; }
```

```css
.search-page__product:hover .search-page__product-image img { transform: scale(1.05); }
```

```css
.search-page__product-info { padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem; }
```

```css
.search-page__product-title { font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4; }
```

```css
.search-page__product-link { color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease; }
```

```css
.search-page__product-link:hover { color: #ffd800; }
```

```css
.search-page__product-price { display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap; }
```

```css
.search-page__product-price--regular { font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff; }
```

```css
.search-page__product-price--sale { font-size: 1.25rem;
  font-weight: 700;
  color: #ffd800; }
```

```css
.search-page__product-price--compare { font-size: 1rem;
  color: #9ca3af;
  text-decoration: line-through; }
```

```css
.search-page__article-card,
.search-page__page-card { background: rgba(31, 41, 55, 0.8);
  border: 1px solid rgba(255, 216, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: border-color 0.2s ease; }
```

```css
.search-page__article-card:hover,
.search-page__page-card:hover { border-color: rgba(255, 216, 0, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 216, 0, 0.1); }
```

```css
.search-page__article-title,
.search-page__page-title { font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  line-height: 1.4; }
```

```css
.search-page__article-link,
.search-page__page-link { color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease; }
```

```css
.search-page__article-link:hover,
.search-page__page-link:hover { color: #ffd800; }
```

```css
.search-page__article-badge,
.search-page__page-badge { display: inline-block;
  background: #ffd800;
  color: #000000;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.25rem; }
```

```css
.template-search--empty { display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh; }
```

```css
.template-search__search { margin-bottom: 1rem; }
```

```css
.template-search__results { padding: 1rem; }
```

```css
.template-search__results .product-grid { gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
```

```css
.search-result-item:focus { outline: 2px solid rgb(255, 216, 0);
  outline-offset: 2px;
  border-color: rgb(255, 216, 0); }
```

```css
.search-result-item:focus-visible { outline: 2px solid rgb(255, 216, 0);
  outline-offset: 2px; }
```

```css
.search-result-item { display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit; }
```

```css
.search-result-item:hover { background-color: rgba(55, 65, 81, 0.6); }
```

```css
.search-result-item .flex-shrink-0 { flex-shrink: 0; }
```

```css
.search-result-item .flex-1 { flex: 1;
  min-width: 0;
  overflow: hidden; }
```

```css
.search-result-item h3 { color: white;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; }
```

```css
.search-result-item p { margin: 0.25rem 0 0 0;
  line-height: 1.3; }
```

```css
.search-result-item .text-sm { font-size: 0.875rem;
  color: rgba(156, 163, 175, 0.9); }
```

```css
.search-result-item .text-xs { font-size: 0.75rem;
  color: rgba(107, 114, 128, 0.8); }
```

```css
.search-result-item .text-primary { color: #ffd800; }
```

```css
.search-result-item mark { background-color: rgba(255, 216, 0, 0.2);
  color: #ffd800;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem; }
```

```css
.template-search { text-align: center;
  padding: 2rem 0;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%); }
```

```css
.template-search__search { margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  padding: 3rem;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
  opacity: 0;
  background: rgba(31, 41, 55, 0.95);
  border: 2px solid rgba(255, 216, 0, 0.3);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
```

```css
.template-search__results-count { font-size: 1.25rem;
  color: rgba(156, 163, 175, 0.9);
  margin: 3rem 0 2rem 0;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  opacity: 0; }
```

```css
.template-search__no-results { font-size: 1.25rem;
  color: rgba(156, 163, 175, 0.9);
  margin: 3rem 0 2rem 0;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  opacity: 0; }
```

```css
.template-search__results { width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
  opacity: 0; }
```

```css
.template-search__search { max-width: 90%;
    padding: 2rem; }
```

```css
.template-search__results-count,
  .template-search__no-results { font-size: 1.125rem;
    margin: 2rem 0 1rem 0; }
```

```css
.search-page__title { font-size: 2rem;
    margin-bottom: 1.5rem; }
```

```css
.search-page__products { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem; }
```

```css
.search-page__product-info { padding: 1rem; }
```

```css
.search-page__product-title { font-size: 1rem; }
```

```css
.search-page__product-price--regular,
  .search-page__product-price--sale { font-size: 1.125rem; }
```

```css
.search-page__products { grid-template-columns: 1fr;
    gap: 1rem; }
```

```css
.search-page__product-info { padding: 0.875rem; }
```

---

### dev/css/components/forms.css
**Missing blocks:** 116

```css
.quantity__input[type="number"] { -moz-appearance: textfield;
  appearance: textfield; }
```

```css
.input-wrapper { margin-bottom: 1rem; }
```

```css
.input-label { display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--foreground); }
```

```css
.input-label.required .required-indicator { color: #ef4444;
  margin-left: 0.25rem; }
```

```css
.input-field { width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--input);
  color: var(--foreground);
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease; }
```

```css
.input-field:focus { outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px rgba(89, 186, 185, 0.2); }
```

```css
.input-field:invalid { border-color: #ef4444; }
```

```css
.input-field:invalid:focus { box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2); }
```

```css
.input-field:disabled { opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--muted); }
```

```css
.input-field:focus { border-color: #000;
    box-shadow: 0 0 0 3px #000; }
```

```css
.rating-input-container { position: relative; }
```

```css
.rating-input { position: relative;
  z-index: 1; }
```

```css
.search-modal__input { background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.search-modal__input:focus { background: linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  backdrop-filter: blur(16px) saturate(200%);
  border-color: rgba(255, 216, 0, 0.4);
  box-shadow:
    0 0 0 2px rgba(255, 216, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.2); }
```

```css
.quantity__input { background: transparent;
  border: none;
  color: white;
  text-align: center;
  padding: 0.8rem;
  width: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: textfield;
  
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  
  -webkit-touch-callout: none !important;
  -webkit-tap-highlight-color: transparent !important;
  
  outline: none !important;
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }
```

```css
.quantity__input:focus { outline: none !important;
  background: rgba(255, 255, 255, 0.08);
  
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  
  -webkit-touch-callout: none !important;
  -webkit-tap-highlight-color: transparent !important; }
```

```css
.quantity__input::-moz-selection { background: transparent !important;
  color: white !important; }
```

```css
.quantity__input::selection { background: transparent !important;
  color: white !important; }
```

```css
.quantity__input::-moz-selection { background: transparent !important;
  color: white !important; }
```

```css
input,
textarea,
select { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
input:focus,
textarea:focus,
select:focus { transform: scale(1.01); }
```

```css
.search-form__icon:hover,
.search-form__submit-icon:hover,
.search-form__clear-icon:hover,
.template-search__form .search-form__icon:hover,
.template-search__form .search-form__submit-icon:hover,
.template-search__form .search-form__clear-icon:hover { transform: none; }
```

```css
.template-search__form .search-form__icon { pointer-events: none; }
```

```css
.quantity__input { width: 4rem;
    font-size: 1.3rem; }
```

```css
.quantity__input[type="number"] { -moz-appearance: textfield;
  appearance: textfield; }
```

```css
.input-wrapper { margin-bottom: 1rem; }
```

```css
.input-label { display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--foreground); }
```

```css
.input-label.required .required-indicator { color: #ef4444;
  margin-left: 0.25rem; }
```

```css
.input-field { width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--input);
  color: var(--foreground);
  font-size: 1rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease; }
```

```css
.input-field:focus { outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px rgba(89, 186, 185, 0.2); }
```

```css
.input-field:invalid { border-color: #ef4444; }
```

```css
.input-field:invalid:focus { box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2); }
```

```css
.input-field:disabled { opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--muted); }
```

```css
.input-field:focus { border-color: #000;
    box-shadow: 0 0 0 3px #000; }
```

```css
.rating-input-container { position: relative; }
```

```css
.rating-input { position: relative;
  z-index: 1; }
```

```css
.search-modal__input { background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.search-modal__input:focus { background: linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  backdrop-filter: blur(16px) saturate(200%);
  border-color: rgba(255, 216, 0, 0.4);
  box-shadow:
    0 0 0 2px rgba(255, 216, 0, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.2); }
```

```css
.quantity__input { background: transparent;
  border: none;
  color: white;
  text-align: center;
  padding: 0.8rem;
  width: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: textfield;
  
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  
  -webkit-touch-callout: none !important;
  -webkit-tap-highlight-color: transparent !important;
  
  outline: none !important;
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; }
```

```css
.quantity__input:focus { outline: none !important;
  background: rgba(255, 255, 255, 0.08);
  
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  
  -webkit-touch-callout: none !important;
  -webkit-tap-highlight-color: transparent !important; }
```

```css
.quantity__input::-moz-selection { background: transparent !important;
  color: white !important; }
```

```css
.quantity__input::selection { background: transparent !important;
  color: white !important; }
```

```css
.quantity__input::-moz-selection { background: transparent !important;
  color: white !important; }
```

```css
input,
textarea,
select { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
input:focus,
textarea:focus,
select:focus { transform: scale(1.01); }
```

```css
.search-form__icon:hover,
.search-form__submit-icon:hover,
.search-form__clear-icon:hover,
.template-search__form .search-form__icon:hover,
.template-search__form .search-form__submit-icon:hover,
.template-search__form .search-form__clear-icon:hover { transform: none; }
```

```css
.template-search__form .search-form__icon { pointer-events: none; }
```

```css
.quantity__input { width: 4rem;
    font-size: 1.3rem; }
```

```css
.search-page__form-wrapper { max-width: 600px;
  margin: 0 auto 2rem auto; }
```

```css
.search-page__form { width: 100%; }
```

```css
.search-modal__input:focus { outline: 2px solid rgb(255, 216, 0);
  outline-offset: 2px; }
```

```css
.search-modal__input { border-width: 2px; }
```

```css
.search-modal__input:focus { border-color: rgb(255, 216, 0); }
```

```css
.search-modal__input-wrapper { position: relative;
  margin-bottom: 1.5rem; }
```

```css
.search-modal__input { width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: rgba(31, 41, 55, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease; }
```

```css
.search-modal__input:focus { outline: none;
  border-color: #ffd800;
  box-shadow: 0 0 0 3px rgba(255, 216, 0, 0.1); }
```

```css
.search-modal__input::-webkit-input-placeholder { color: rgba(156, 163, 175, 0.8); }
```

```css
.search-modal__input::-moz-placeholder { color: rgba(156, 163, 175, 0.8); }
```

```css
.search-modal__input:-ms-input-placeholder { color: rgba(156, 163, 175, 0.8); }
```

```css
.search-modal__input::-ms-input-placeholder { color: rgba(156, 163, 175, 0.8); }
```

```css
.search-modal__input::placeholder { color: rgba(156, 163, 175, 0.8); }
```

```css
.template-404__search-form { margin: 2rem auto;
  max-width: 600px;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
  opacity: 0; }
```

```css
.template-404__search-form { margin: 1.5rem auto; }
```

```css
.search-form { width: 100%; }
```

```css
.search-form *:focus { outline: none !important;
  box-shadow: none !important; }
```

```css
.search-form__container { width: 100%; }
```

```css
.search-form__input-wrapper { position: relative;
  display: flex;
  align-items: center;
  background: rgba(55, 65, 81, 0.9);
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem;
  gap: 0.75rem; }
```

```css
.search-form__input-wrapper:focus-within { background: rgba(55, 65, 81, 0.95); }
```

```css
.search-form__input { flex: 1;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  padding: 0;
  box-shadow: none; }
```

```css
.search-form__input:focus { outline: none;
  box-shadow: none; }
```

```css
.search-form__input::-webkit-input-placeholder { color: #9ca3af; }
```

```css
.search-form__input::-moz-placeholder { color: #9ca3af; }
```

```css
.search-form__input:-ms-input-placeholder { color: #9ca3af; }
```

```css
.search-form__input::-ms-input-placeholder { color: #9ca3af; }
```

```css
.search-form__input::placeholder { color: #9ca3af; }
```

```css
.search-form__icon { color: #9ca3af;
  flex-shrink: 0; }
```

```css
.search-form__icon-svg { width: 1.25rem;
  height: 1.25rem;
  display: block; }
```

```css
.search-form__submit { background: #ffd800;
  color: #000000;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; }
```

```css
.search-form__submit:hover { background: #e6c200; }
```

```css
.search-form__submit:active { background: #d4b800; }
```

```css
.search-form__submit-icon { width: 1rem;
  height: 1rem;
  display: block; }
```

```css
.search-form__clear { background: transparent;
  color: #9ca3af;
  border: none;
  border-radius: 0.25rem;
  padding: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; }
```

```css
.search-form__clear:hover { color: #ffffff; }
```

```css
.search-form__clear-icon { width: 0.875rem;
  height: 0.875rem;
  display: block; }
```

```css
.search-form__clear { right: 4.5rem; }
```

```css
.search-form__icon-svg { width: 1rem;
    height: 1rem; }
```

```css
.search-form__submit { padding: 0.5rem; }
```

```css
.search-form__submit-icon { width: 0.875rem;
    height: 0.875rem; }
```

```css
.search-form__clear { right: 3.5rem;
    padding: 0.375rem; }
```

```css
.search-form__clear-icon { width: 0.875rem;
    height: 0.875rem; }
```

```css
.search-form__input:focus + .search-form__icon { color: rgb(255, 216, 0); }
```

```css
.search-form__submit:focus,
.search-form__clear:focus { outline: 2px solid rgb(255, 216, 0);
  outline-offset: 2px; }
```

```css
.search-form__input:focus { border-width: 3px; }
```

```css
.template-search__form { width: 100%;
  position: relative;
  max-width: 100%; }
```

```css
.template-search__form .search-form__input { padding: 1.5rem 5rem 1.5rem 4rem;
  font-size: 1.25rem;
  background: rgba(55, 65, 81, 0.9);
  border: 2px solid rgba(255, 216, 0, 0.4);
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;
  max-width: 100%; }
```

```css
.template-search__form .search-form__input:focus { border-color: rgb(255, 216, 0);
  box-shadow: 0 8px 32px rgba(255, 216, 0, 0.2);
  background: rgba(55, 65, 81, 0.95); }
```

```css
.template-search__form .search-form__icon { left: 1.5rem;
  z-index: 2; }
```

```css
.template-search__form .search-form__icon-svg { width: 1.5rem;
  height: 1.5rem; }
```

```css
.template-search__form .search-form__submit { right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.875rem;
  border-radius: 0.75rem;
  z-index: 3;
  position: absolute; }
```

```css
.template-search__form .search-form__submit-icon { width: 1.25rem;
  height: 1.25rem; }
```

```css
.template-search__form .search-form__input { padding: 1.25rem 4rem 1.25rem 3.5rem;
    font-size: 1.125rem; }
```

```css
.template-search__form .search-form__icon-svg { width: 1.25rem;
    height: 1.25rem; }
```

```css
.template-search__form .search-form__submit { right: 0.375rem;
    padding: 0.75rem; }
```

```css
.template-search__form .search-form__submit-icon { width: 1rem;
    height: 1rem; }
```

```css
.template-search__form .search-form__input { padding: 1rem 3.5rem 1rem 3rem;
    font-size: 1rem; }
```

```css
.template-search__form .search-form__submit { right: 0.25rem;
    padding: 0.625rem; }
```

```css
.search-page__form-wrapper { margin-bottom: 1.5rem; }
```

```css
.search-modal__input-wrapper { position: relative;
  margin-bottom: 1.5rem; }
```

```css
.search-modal__input { width: 100%;
  padding: 1rem 4rem 1rem 3.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease; }
```

```css
.search-modal__input:focus { outline: none;
  border-color: #ffd800;
  box-shadow: 0 0 0 3px rgba(255, 216, 0, 0.1);
  background: rgba(255, 255, 255, 0.15); }
```

```css
.search-modal__input::-webkit-input-placeholder { color: rgba(255, 255, 255, 0.6); }
```

```css
.search-modal__input::-moz-placeholder { color: rgba(255, 255, 255, 0.6); }
```

```css
.search-modal__input:-ms-input-placeholder { color: rgba(255, 255, 255, 0.6); }
```

```css
.search-modal__input::-ms-input-placeholder { color: rgba(255, 255, 255, 0.6); }
```

```css
.search-modal__input::placeholder { color: rgba(255, 255, 255, 0.6); }
```

```css
.search-modal__input { border: 2px solid white; }
```

---

### dev/css/layout.css
**Missing blocks:** 26

```css
.loading-content { position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.5rem; }
```

```css
.loading-spinner { display: flex;
  align-items: center;
  justify-content: center; }
```

```css
.error-message { font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: flex;
  align-items: center; }
```

```css
.pagination { display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0; }
```

```css
.pagination__item-link { display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4.4rem;
  height: 4.4rem;
  padding: 1rem;
  border: 0.1rem solid rgba(var(--color-foreground), 0.08);
  border-radius: var(--buttons-radius);
  color: rgb(var(--color-foreground));
  text-decoration: none;
  font-size: 1.4rem;
  transition: all var(--duration-short) ease; }
```

```css
.creators-carousel { display: flex;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content; }
```

```css
.quantity { display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.6rem;
  overflow: hidden;
  
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 140px;
  position: relative; }
```

```css
.quantity__display { background: transparent;
  border: none;
  color: white;
  text-align: center;
  padding: 0.8rem;
  width: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  flex-shrink: 0;
  min-width: 5rem;
  position: relative;
  z-index: 1; }
```

```css
.discounts__discount { display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: #22c55e;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 0.6rem;
  border: 1px solid rgba(34, 197, 94, 0.2); }
```

```css
.loading-content { position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.5rem; }
```

```css
.loading-spinner { display: flex;
  align-items: center;
  justify-content: center; }
```

```css
.error-message { font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: flex;
  align-items: center; }
```

```css
.pagination { display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0; }
```

```css
.pagination__item-link { display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4.4rem;
  height: 4.4rem;
  padding: 1rem;
  border: 0.1rem solid rgba(var(--color-foreground), 0.08);
  border-radius: var(--buttons-radius);
  color: rgb(var(--color-foreground));
  text-decoration: none;
  font-size: 1.4rem;
  transition: all var(--duration-short) ease; }
```

```css
.creators-carousel { display: flex;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content; }
```

```css
.quantity { display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.6rem;
  overflow: hidden;
  
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  min-width: 140px;
  position: relative; }
```

```css
.quantity__display { background: transparent;
  border: none;
  color: white;
  text-align: center;
  padding: 0.8rem;
  width: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  flex-shrink: 0;
  min-width: 5rem;
  position: relative;
  z-index: 1; }
```

```css
.discounts__discount { display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: #22c55e;
  padding: 0.5rem 1rem;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 0.6rem;
  border: 1px solid rgba(34, 197, 94, 0.2); }
```

```css
.guarantee-rating { display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem; }
```

```css
.guarantee-tags { display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem; }
```

```css
.guarantee-card { max-width: 48rem;
  width: 100%;
  background-color: rgb(35, 36, 58);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.15);
  transition: all var(--duration-default) var(--easing-smooth);
  transform: scale(1);
  cursor: pointer; }
```

```css
.guarantee-promo { max-width: 72rem;
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0; }
```

```css
.guarantee-promo-image { flex: 1;
  display: flex;
  justify-content: center; }
```

```css
.template-404 { text-align: center;
  padding: 4rem 0;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; }
```

```css
.template-404 .helpful-links ul { list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem; }
```

```css
@media (max-width: 768px) { .mobile-bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center; }
```

---

### dev/css/utilities/animations.css
**Missing blocks:** 119

```css
@-webkit-keyframes spin { from {
    transform: rotate(0deg); }
```

```css
@keyframes spin { from {
    transform: rotate(0deg); }
```

```css
.animate-spin { -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite; }
```

```css
.animate-spin { -webkit-animation: none;
    animation: none; }
```

```css
@-webkit-keyframes fadeInUp { from {
    opacity: 0;
    transform: translateY(30px); }
```

```css
@keyframes fadeInUp { from {
    opacity: 0;
    transform: translateY(30px); }
```

```css
@media (prefers-reduced-motion: reduce) { .related-products-grid,
  .related-product-item {
    -webkit-animation: none;
    animation: none; }
```

```css
.inventory-status--low { -webkit-animation: pulse 2s infinite;
  animation: pulse 2s infinite; }
```

```css
@media (prefers-reduced-motion: reduce) { .inventory-status--low {
    -webkit-animation: none;
    animation: none; }
```

```css
@-webkit-keyframes scroll { 0% {
      transform: translateX(0); }
```

```css
@keyframes scroll { 0% {
      transform: translateX(0); }
```

```css
.animate-scroll { -webkit-animation: scroll 20s linear infinite;
    animation: scroll 20s linear infinite; }
```

```css
.creators-container:hover .animate-scroll { -webkit-animation-play-state: paused;
    animation-play-state: paused; }
```

```css
.creators-carousel.animate-scroll { -webkit-animation: scroll 20s linear infinite;
    animation: scroll 20s linear infinite; }
```

```css
@-webkit-keyframes fadeInUp { from {
      opacity: 0;
      transform: translateY(30px); }
```

```css
@keyframes fadeInUp { from {
      opacity: 0;
      transform: translateY(30px); }
```

```css
@-webkit-keyframes fadeInDown { from {
      opacity: 0;
      transform: translateY(-30px); }
```

```css
@keyframes fadeInDown { from {
      opacity: 0;
      transform: translateY(-30px); }
```

```css
@-webkit-keyframes fadeInLeft { from {
      opacity: 0;
      transform: translateX(-30px); }
```

```css
@keyframes fadeInLeft { from {
      opacity: 0;
      transform: translateX(-30px); }
```

```css
@-webkit-keyframes fadeInRight { from {
      opacity: 0;
      transform: translateX(30px); }
```

```css
@keyframes fadeInRight { from {
      opacity: 0;
      transform: translateX(30px); }
```

```css
@-webkit-keyframes fadeIn { from {
      opacity: 0; }
```

```css
@keyframes fadeIn { from {
      opacity: 0; }
```

```css
@-webkit-keyframes scaleIn { from {
      opacity: 0;
      transform: scale(0.9); }
```

```css
@keyframes scaleIn { from {
      opacity: 0;
      transform: scale(0.9); }
```

```css
.animate-fade-in-up { -webkit-animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in-down { -webkit-animation: fadeInDown var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInDown var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in-left { -webkit-animation: fadeInLeft var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInLeft var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in-right { -webkit-animation: fadeInRight var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInRight var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in { -webkit-animation: fadeIn var(--duration-default) var(--easing-smooth) forwards;
    animation: fadeIn var(--duration-default) var(--easing-smooth) forwards; }
```

```css
.animate-scale-in { -webkit-animation: scaleIn var(--duration-default) var(--easing-spring) forwards;
    animation: scaleIn var(--duration-default) var(--easing-spring) forwards; }
```

```css
.animate-stagger > * { opacity: 0;
    -webkit-animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-stagger > *:nth-child(1) { -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s; }
```

```css
.animate-stagger > *:nth-child(2) { -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s; }
```

```css
.animate-stagger > *:nth-child(3) { -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s; }
```

```css
.animate-stagger > *:nth-child(4) { -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s; }
```

```css
.animate-stagger > *:nth-child(5) { -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s; }
```

```css
.animate-stagger > *:nth-child(6) { -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s; }
```

```css
.animate-float { -webkit-animation: float 3s ease-in-out infinite;
    animation: float 3s ease-in-out infinite; }
```

```css
@-webkit-keyframes float { 0%,
    100% {
      transform: translateY(0px); }
```

```css
@keyframes float { 0%,
    100% {
      transform: translateY(0px); }
```

```css
.animate-pulse-slow { -webkit-animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```

```css
@-webkit-keyframes badgeFloat { 0%,
  100% {
    transform: translateZ(0) translateY(0); }
```

```css
@keyframes badgeFloat { 0%,
  100% {
    transform: translateZ(0) translateY(0); }
```

```css
.spinner { -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite; }
```

```css
@keyframes spin { from {
    transform: rotate(0deg); }
```

```css
.page-transition { opacity: 0;
  transform: translateY(20px);
  -webkit-animation: pageFadeIn var(--duration-slow) var(--easing-smooth) forwards;
  animation: pageFadeIn var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.section-transition { opacity: 0;
  transform: translateY(30px);
  transition: all var(--duration-slow) var(--easing-smooth); }
```

```css
.error { -webkit-animation: errorShake var(--duration-default) var(--easing-smooth);
  animation: errorShake var(--duration-default) var(--easing-smooth); }
```

```css
.success { -webkit-animation: successPulse var(--duration-slow) var(--easing-spring);
  animation: successPulse var(--duration-slow) var(--easing-spring); }
```

```css
@-webkit-keyframes spin { from {
    transform: rotate(0deg); }
```

```css
@keyframes spin { from {
    transform: rotate(0deg); }
```

```css
.animate-spin { -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite; }
```

```css
.animate-spin { -webkit-animation: none;
    animation: none; }
```

```css
@-webkit-keyframes fadeInUp { from {
    opacity: 0;
    transform: translateY(30px); }
```

```css
@keyframes fadeInUp { from {
    opacity: 0;
    transform: translateY(30px); }
```

```css
@media (prefers-reduced-motion: reduce) { .related-products-grid,
  .related-product-item {
    -webkit-animation: none;
    animation: none; }
```

```css
.inventory-status--low { -webkit-animation: pulse 2s infinite;
  animation: pulse 2s infinite; }
```

```css
@media (prefers-reduced-motion: reduce) { .inventory-status--low {
    -webkit-animation: none;
    animation: none; }
```

```css
@-webkit-keyframes scroll { 0% {
      transform: translateX(0); }
```

```css
@keyframes scroll { 0% {
      transform: translateX(0); }
```

```css
.animate-scroll { -webkit-animation: scroll 20s linear infinite;
    animation: scroll 20s linear infinite; }
```

```css
.creators-container:hover .animate-scroll { -webkit-animation-play-state: paused;
    animation-play-state: paused; }
```

```css
.creators-carousel.animate-scroll { -webkit-animation: scroll 20s linear infinite;
    animation: scroll 20s linear infinite; }
```

```css
@-webkit-keyframes fadeInUp { from {
      opacity: 0;
      transform: translateY(30px); }
```

```css
@keyframes fadeInUp { from {
      opacity: 0;
      transform: translateY(30px); }
```

```css
@-webkit-keyframes fadeInDown { from {
      opacity: 0;
      transform: translateY(-30px); }
```

```css
@keyframes fadeInDown { from {
      opacity: 0;
      transform: translateY(-30px); }
```

```css
@-webkit-keyframes fadeInLeft { from {
      opacity: 0;
      transform: translateX(-30px); }
```

```css
@keyframes fadeInLeft { from {
      opacity: 0;
      transform: translateX(-30px); }
```

```css
@-webkit-keyframes fadeInRight { from {
      opacity: 0;
      transform: translateX(30px); }
```

```css
@keyframes fadeInRight { from {
      opacity: 0;
      transform: translateX(30px); }
```

```css
@-webkit-keyframes fadeIn { from {
      opacity: 0; }
```

```css
@keyframes fadeIn { from {
      opacity: 0; }
```

```css
@-webkit-keyframes scaleIn { from {
      opacity: 0;
      transform: scale(0.9); }
```

```css
@keyframes scaleIn { from {
      opacity: 0;
      transform: scale(0.9); }
```

```css
.animate-fade-in-up { -webkit-animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in-down { -webkit-animation: fadeInDown var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInDown var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in-left { -webkit-animation: fadeInLeft var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInLeft var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in-right { -webkit-animation: fadeInRight var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInRight var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-fade-in { -webkit-animation: fadeIn var(--duration-default) var(--easing-smooth) forwards;
    animation: fadeIn var(--duration-default) var(--easing-smooth) forwards; }
```

```css
.animate-scale-in { -webkit-animation: scaleIn var(--duration-default) var(--easing-spring) forwards;
    animation: scaleIn var(--duration-default) var(--easing-spring) forwards; }
```

```css
.animate-stagger > * { opacity: 0;
    -webkit-animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards;
    animation: fadeInUp var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.animate-stagger > *:nth-child(1) { -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s; }
```

```css
.animate-stagger > *:nth-child(2) { -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s; }
```

```css
.animate-stagger > *:nth-child(3) { -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s; }
```

```css
.animate-stagger > *:nth-child(4) { -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s; }
```

```css
.animate-stagger > *:nth-child(5) { -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s; }
```

```css
.animate-stagger > *:nth-child(6) { -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s; }
```

```css
.animate-float { -webkit-animation: float 3s ease-in-out infinite;
    animation: float 3s ease-in-out infinite; }
```

```css
@-webkit-keyframes float { 0%,
    100% {
      transform: translateY(0px); }
```

```css
@keyframes float { 0%,
    100% {
      transform: translateY(0px); }
```

```css
.animate-pulse-slow { -webkit-animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```

```css
@-webkit-keyframes badgeFloat { 0%,
  100% {
    transform: translateZ(0) translateY(0); }
```

```css
@keyframes badgeFloat { 0%,
  100% {
    transform: translateZ(0) translateY(0); }
```

```css
.spinner { -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite; }
```

```css
@keyframes spin { from {
    transform: rotate(0deg); }
```

```css
.page-transition { opacity: 0;
  transform: translateY(20px);
  -webkit-animation: pageFadeIn var(--duration-slow) var(--easing-smooth) forwards;
  animation: pageFadeIn var(--duration-slow) var(--easing-smooth) forwards; }
```

```css
.section-transition { opacity: 0;
  transform: translateY(30px);
  transition: all var(--duration-slow) var(--easing-smooth); }
```

```css
.error { -webkit-animation: errorShake var(--duration-default) var(--easing-smooth);
  animation: errorShake var(--duration-default) var(--easing-smooth); }
```

```css
.success { -webkit-animation: successPulse var(--duration-slow) var(--easing-spring);
  animation: successPulse var(--duration-slow) var(--easing-spring); }
```

```css
@media (prefers-reduced-motion: reduce) { .search-modal,
  .search-modal__overlay,
  .search-modal__container {
    -webkit-animation: none;
    animation: none; }
```

```css
@keyframes spin { from {
    transform: rotate(0deg); }
```

```css
.template-404 .error-code { font-size: 8rem;
  font-weight: 900;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  opacity: 0; }
```

```css
.template-404 .title { font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
  opacity: 0; }
```

```css
.template-404 p { font-size: 1.125rem;
  color: rgba(156, 163, 175, 0.9);
  margin-bottom: 2rem;
  max-width: 600px;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
  opacity: 0; }
```

```css
.template-404 .helpful-links { margin-top: 3rem;
  -webkit-animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
  animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
  opacity: 0; }
```

```css
@-webkit-keyframes float { 0%,
  100% {
    transform: translateX(-50%) translateY(0px); }
```

```css
@keyframes float { 0%,
  100% {
    transform: translateX(-50%) translateY(0px); }
```

```css
@-webkit-keyframes bounce { 0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0); }
```

```css
@keyframes bounce { 0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0); }
```

```css
@keyframes pulse { 0%,
  100% {
    transform: scale(1);
    opacity: 0.2; }
```

```css
@media (prefers-reduced-motion: reduce) { .cart-page.is-empty .cart__warnings .decorative-dot-1,
  .cart-page.is-empty .cart__warnings .decorative-dot-2,
  .cart-page.is-empty .cart__warnings .button::after,
  .cart-page.is-empty .cart__warnings-ring {
    -webkit-animation: none;
    animation: none; }
```

```css
@-webkit-keyframes rotate { from {
    --angle: 0deg; }
```

```css
@keyframes rotate { from {
    --angle: 0deg; }
```

```css
@-webkit-keyframes badgePulse { 0%,
  100% {
    transform: scale(1); }
```

```css
@keyframes badgePulse { 0%,
  100% {
    transform: scale(1); }
```

```css
@keyframes badgePulse { 0%,
  100% {
    transform: scale(1); }
```

---

### dev/css/pages/product.css
**Missing blocks:** 138

```css
.related-products-grid { -webkit-animation: fadeInUp 0.6s ease-out;
  animation: fadeInUp 0.6s ease-out; }
```

```css
.related-product-item { -webkit-animation: fadeInUp 0.6s ease-out;
  animation: fadeInUp 0.6s ease-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both; }
```

```css
.related-product-item:nth-child(1) { -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s; }
```

```css
.related-product-item:nth-child(2) { -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s; }
```

```css
.related-product-item:nth-child(3) { -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s; }
```

```css
.related-product-item:nth-child(4) { -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s; }
```

```css
.product-rating:hover .rating-stars svg { color: #fbbf24; }
```

```css
.product-rating:hover .rating-stars svg.text-gray-600 { color: #9ca3af; }
```

```css
.featured-products-section { background-image: var(--featured-bg-image); }
```

```css
.product-accordion-answer { max-height: 0;
    overflow: hidden;
    transition: max-height var(--duration-default) var(--easing-smooth); }
```

```css
.product-accordion-answer.active { max-height: 500px; }
```

```css
.product-accordion-question[aria-expanded="true"] .faq-icon { transform: rotate(45deg); }
```

```css
.product-accordion-question { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.product-accordion-question:hover { transform: translateX(4px); }
```

```css
.product-option { color: #94a3b8;
  font-size: 1.4rem;
  margin: 0.5rem 0; }
```

```css
.product-image { @apply w-full h-full min-h-0 overflow-hidden rounded-lg; }
```

```css
.product-image img,
.product-image video { @apply w-full h-auto object-cover rounded-lg; }
```

```css
.product-media-gallery { @apply w-full; }
```

```css
.product-media-gallery .main-media-container { @apply w-full; }
```

```css
.product-media-gallery .thumbnail-gallery { @apply w-full; }
```

```css
.product-media-gallery .thumbnail-gallery .flex { @apply w-full; }
```

```css
.product-media-gallery .thumbnail-gallery { @apply w-full overflow-x-auto; }
```

```css
.product-media-gallery .thumbnail-gallery .flex { @apply w-full flex-nowrap gap-2; }
```

```css
.product-info { @apply space-y-6; }
```

```css
.product-vendor { @apply text-sm font-medium text-gray-400 uppercase tracking-wider; }
```

```css
.product-title { @apply mb-4; }
```

```css
.product-title h1 { @apply text-3xl lg:text-4xl font-bold text-white mb-2; }
```

```css
.product-price { @apply space-y-1; }
```

```css
.product-rating { @apply flex items-center gap-2; }
```

```css
.product-description { @apply max-w-none text-white; }
```

```css
.product-description h1,
.product-description h2,
.product-description h3,
.product-description h4,
.product-description h5,
.product-description h6 { @apply font-bold text-white mb-4; }
```

```css
.product-description p { @apply mb-4 leading-relaxed; }
```

```css
.product-description ul,
.product-description ol { @apply mb-4 pl-6; }
```

```css
.product-description li { @apply mb-2; }
```

```css
.product-description a { @apply text-primary hover:text-primary-600 underline; }
```

```css
.product-description blockquote { @apply border-l-4 border-primary pl-4 italic my-4; }
```

```css
.product-description code { @apply bg-gray-800 px-2 py-1 rounded text-sm; }
```

```css
.product-description pre { @apply bg-gray-800 p-4 rounded-lg overflow-x-auto my-4; }
```

```css
.product-features { @apply space-y-4; }
```

```css
.product-accordion { @apply space-y-4; }
```

```css
.product-share { @apply flex items-center gap-4; }
```

```css
.product-inventory { @apply text-sm; }
```

```css
.product-info--sticky { @apply sticky top-6; }
```

```css
.product-media-gallery { @apply relative; }
```

```css
.related-products-grid { -webkit-animation: fadeInUp 0.6s ease-out;
  animation: fadeInUp 0.6s ease-out; }
```

```css
.related-product-item { -webkit-animation: fadeInUp 0.6s ease-out;
  animation: fadeInUp 0.6s ease-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both; }
```

```css
.related-product-item:nth-child(1) { -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s; }
```

```css
.related-product-item:nth-child(2) { -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s; }
```

```css
.related-product-item:nth-child(3) { -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s; }
```

```css
.related-product-item:nth-child(4) { -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s; }
```

```css
.product-rating:hover .rating-stars svg { color: #fbbf24; }
```

```css
.product-rating:hover .rating-stars svg.text-gray-600 { color: #9ca3af; }
```

```css
.featured-products-section { background-image: var(--featured-bg-image); }
```

```css
.product-accordion-answer { max-height: 0;
    overflow: hidden;
    transition: max-height var(--duration-default) var(--easing-smooth); }
```

```css
.product-accordion-answer.active { max-height: 500px; }
```

```css
.product-accordion-question[aria-expanded="true"] .faq-icon { transform: rotate(45deg); }
```

```css
.product-accordion-question { transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.product-accordion-question:hover { transform: translateX(4px); }
```

```css
.product-option { color: #94a3b8;
  font-size: 1.4rem;
  margin: 0.5rem 0; }
```

```css
.product-image { @apply w-full h-full min-h-0 overflow-hidden rounded-lg; }
```

```css
.product-image img,
.product-image video { @apply w-full h-auto object-cover rounded-lg; }
```

```css
.product-media-gallery { @apply w-full; }
```

```css
.product-media-gallery .main-media-container { @apply w-full; }
```

```css
.product-media-gallery .thumbnail-gallery { @apply w-full; }
```

```css
.product-media-gallery .thumbnail-gallery .flex { @apply w-full; }
```

```css
.product-media-gallery .thumbnail-gallery { @apply w-full overflow-x-auto; }
```

```css
.product-media-gallery .thumbnail-gallery .flex { @apply w-full flex-nowrap gap-2; }
```

```css
.product-info { @apply space-y-6; }
```

```css
.product-vendor { @apply text-sm font-medium text-gray-400 uppercase tracking-wider; }
```

```css
.product-title { @apply mb-4; }
```

```css
.product-title h1 { @apply text-3xl lg:text-4xl font-bold text-white mb-2; }
```

```css
.product-price { @apply space-y-1; }
```

```css
.product-rating { @apply flex items-center gap-2; }
```

```css
.product-description { @apply max-w-none text-white; }
```

```css
.product-description h1,
.product-description h2,
.product-description h3,
.product-description h4,
.product-description h5,
.product-description h6 { @apply font-bold text-white mb-4; }
```

```css
.product-description p { @apply mb-4 leading-relaxed; }
```

```css
.product-description ul,
.product-description ol { @apply mb-4 pl-6; }
```

```css
.product-description li { @apply mb-2; }
```

```css
.product-description a { @apply text-primary hover:text-primary-600 underline; }
```

```css
.product-description blockquote { @apply border-l-4 border-primary pl-4 italic my-4; }
```

```css
.product-description code { @apply bg-gray-800 px-2 py-1 rounded text-sm; }
```

```css
.product-description pre { @apply bg-gray-800 p-4 rounded-lg overflow-x-auto my-4; }
```

```css
.product-features { @apply space-y-4; }
```

```css
.product-accordion { @apply space-y-4; }
```

```css
.product-share { @apply flex items-center gap-4; }
```

```css
.product-inventory { @apply text-sm; }
```

```css
.product-info--sticky { @apply sticky top-6; }
```

```css
.product-media-gallery { @apply relative; }
```

```css
.product-image { @apply order-1; }
```

```css
.product-info { @apply order-2; }
```

```css
.product-description,
.product-description * { color: white !important; }
```

```css
.product-description a { color: #ffd800 !important; }
```

```css
.product-description a:hover { color: #d97706 !important; }
```

```css
.product-description blockquote { color: white !important;
  border-left-color: #ffd800 !important; }
```

```css
.product-description code,
.product-description pre { color: white !important;
  background-color: #1f2937 !important; }
```

```css
.product-description { margin-top: 0.5rem !important;
  margin-bottom: 1rem !important; }
```

```css
.product-description p { margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important; }
```

```css
.product-description p:first-child { margin-top: 0 !important; }
```

```css
.product-key-info { position: relative; }
```

```css
.product-key-info .product-price { flex-shrink: 0; }
```

```css
.product-key-info .product-rating { flex-shrink: 0; }
```

```css
.product-key-info { order: 2; }
```

```css
.product-key-info { order: 2; }
```

```css
.product-media-gallery { max-width: 100%;
  overflow: hidden; }
```

```css
.product-media-gallery img,
.product-media-gallery video { max-width: 100%;
  height: auto;
  -o-object-fit: contain;
  object-fit: contain; }
```

```css
.product-key-info { min-width: 0; }
```

```css
.product-key-info .product-title h1 { word-wrap: break-word;
  overflow-wrap: break-word; }
```

```css
.product-accordion .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
```

```css
.product-features .bg-gray-900\/50 { position: -webkit-sticky;
  position: sticky;
  top: 2rem; }
```

```css
.product-key-info .flex.flex-col.sm\:flex-row { align-items: flex-start;
  gap: 1rem; }
```

```css
.product-key-info .space-y-4 > div { margin-bottom: 1rem; }
```

```css
.product-key-info .space-y-4 > div:last-child { margin-bottom: 0; }
```

```css
.product-share.md\:col-span-2 { margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgb(var(--color-border)); }
```

```css
.product-key-info .space-y-6 > div:last-child { margin-bottom: 0; }
```

```css
.product-accordion .grid { grid-template-columns: 1fr; }
```

```css
.product-features .bg-gray-900\/50 { position: static; }
```

```css
.product-key-info > div { -webkit-animation: fadeInUp 0.6s ease-out;
  animation: fadeInUp 0.6s ease-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both; }
```

```css
.product-key-info > div:nth-child(1) { -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s; }
```

```css
.product-key-info > div:nth-child(2) { -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s; }
```

```css
.product-key-info > div:nth-child(3) { -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s; }
```

```css
.product-key-info > div:nth-child(4) { -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s; }
```

```css
.product-key-info > div:nth-child(5) { -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s; }
```

```css
.product-key-info > div:nth-child(6) { -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s; }
```

```css
.product-key-info > div:nth-child(7) { -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s; }
```

```css
.product-key-info .space-y-6 > div { margin-bottom: 1.5rem; }
```

```css
.product-key-info .space-y-6 > div:last-child { margin-bottom: 0; }
```

```css
.product-features ul { display: flex;
  flex-direction: column;
  gap: 0.75rem; }
```

```css
.product-features li { display: flex;
  align-items: center;
  padding: 0.5rem 0;
  transition: all 0.2s ease; }
```

```css
.product-features li:hover { transform: translateX(4px);
  color: rgb(var(--color-primary)); }
```

```css
.product-accordion .grid.grid-cols-1.md\:grid-cols-2 { gap: 1rem; }
```

```css
.product-media-gallery .main-media-container { max-width: 100%;
  overflow: hidden;
  background-color: rgb(17, 24, 39);
  border-radius: 1rem; }
```

```css
.product-media-gallery .main-media { width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem; }
```

```css
.product-media-gallery .main-media img { max-width: 100%;
  max-height: 600px;
  width: 100%;
  height: auto;
  -o-object-fit: contain;
  object-fit: contain; }
```

```css
.product-media-gallery .thumbnail-gallery { max-width: 100%;
  overflow-x: auto; }
```

```css
.products-grid { align-items: start; }
```

```css
.product-item { display: flex;
  flex-direction: column;
  height: 100%; }
```

```css
.products-grid.grid { gap: 1.5rem; }
```

```css
.product-page { padding-bottom: 80px; }
```

---

### dev/css/layout/cart.css
**Missing blocks:** 224

```css
.cart-notification { position: fixed;
  top: 20px;
  right: 20px;
  background: var(--surface-color);
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition:
    opacity var(--duration-default) var(--easing-smooth),
    visibility var(--duration-default) var(--easing-smooth); }
```

```css
.cart-notification--hidden { display: none !important;
  visibility: hidden;
  opacity: 0; }
```

```css
.cart-notification--visible { display: block;
  visibility: visible;
  opacity: 1; }
```

```css
.cart-notification__heading { margin: 0;
  font-size: 18px;
  color: var(--text-color); }
```

```css
.cart-notification__close { background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 5px; }
```

```css
.cart-notification__item { display: flex;
  gap: 15px;
  margin-bottom: 15px; }
```

```css
.cart-notification__image { border-radius: 4px;
  -o-object-fit: cover;
  object-fit: cover; }
```

```css
.cart-notification__title { margin: 0 0 5px 0;
  font-size: 16px;
  color: var(--text-color); }
```

```css
.cart-notification__price { margin: 0 0 5px 0;
  color: var(--primary-color);
  font-weight: bold; }
```

```css
.cart-notification__quantity { margin: 0;
  color: var(--text-muted);
  font-size: 14px; }
```

```css
.add-to-cart-btn { border: none;
  border-radius: 6px;
  font-weight: 600;
  transition:
    background-color var(--duration-default) var(--easing-smooth),
    transform var(--duration-default) var(--easing-smooth);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: -webkit-fit-content;
  min-width: -moz-fit-content;
  min-width: fit-content; }
```

```css
.add-to-cart-btn:hover { transform: translateY(-1px); }
```

```css
.add-to-cart-btn:disabled { opacity: 0.5;
  cursor: not-allowed;
  transform: none; }
```

```css
.add-to-cart-btn.loading { color: transparent; }
```

```css
.add-to-cart-btn.loading .loading-overlay__spinner { display: flex !important; }
```

```css
.add-to-cart-btn .loading-overlay__spinner { position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); }
```

```css
.quantity button:focus,
  .quantity input:focus,
  .cart-item .quantity button:focus,
  .cart-item .quantity input:focus,
  .quantity:focus,
  .quantity:focus-within,
  .cart-item .quantity:focus,
  .cart-item .quantity:focus-within { @apply ring-0 outline-none; }
```

```css
.cart-page { min-height: 100vh;
  background: #0f172a;
  margin-top: 1rem;
  padding-top: 1rem; }
```

```css
.cart-page .page-width { max-width: 700px;
  margin: 0 auto;
  padding: 0 1.5rem; }
```

```css
.cart__warnings { text-align: center;
  padding: 4rem 2rem;
  color: white; }
```

```css
.cart__empty-text { font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white; }
```

```css
.cart__login-title { font-size: 1.8rem;
  font-weight: 500;
  margin: 2rem 0 0.8rem 0;
  color: white; }
```

```css
.cart__login-paragraph { margin-bottom: 1.5rem;
  color: #94a3b8;
  font-size: 1.4rem; }
```

```css
.cart__contents { margin-top: 1.5rem; }
```

```css
.cart-page.is-empty .cart__form { display: none !important; }
```

```css
.cart-page.is-empty .cart__warnings { display: block !important; }
```

```css
.cart-page:not(.is-empty) .cart__warnings { display: none !important; }
```

```css
.cart__warnings { text-align: center;
  padding: 2rem 0; }
```

```css
.cart__empty-text { font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #374151; }
```

```css
.cart__warnings .button { display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s; }
```

```css
.cart__warnings .button:hover { background-color: #333; }
```

```css
.cart__title { font-weight: 600;
  color: white;
  margin: 0;
  font-size: 2rem; }
```

```css
.cart__count { font-weight: 400;
  color: #94a3b8;
  margin: 0.5rem 0 0 0;
  font-size: 1.3rem; }
```

```css
.cart-items { display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem; }
```

```css
.cart-item { background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  padding: 1.5rem;
  transition: all var(--duration-default) var(--easing-smooth);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  transform: translateZ(0); }
```

```css
.cart-item:hover { background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px); }
```

```css
.cart-item__media { flex-shrink: 0;
  width: 120px;
  height: 120px;
  position: relative; }
```

```css
.cart-item__image-container { width: 100%;
  height: 100%;
  border-radius: 0.6rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.cart-item__image { width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 0.6rem; }
```

```css
.cart-item__name { font-size: 1.6rem;
  font-weight: 500;
  color: white;
  margin: 0 0 0.5rem 0;
  text-decoration: none;
  display: block; }
```

```css
.cart-item__discounted-prices { display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem; }
```

```css
.cart-item__old-price { color: #64748b;
  text-decoration: line-through;
  font-size: 1.2rem; }
```

```css
.cart-item__final-price { color: white;
  font-weight: 500;
  font-size: 1.5rem; }
```

```css
.cart-item__quantity-wrapper { display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem; }
```

```css
.quantity .quantity__button,
.cart-item .quantity__button { background: transparent !important;
  border: none !important;
  color: white !important;
  padding: 0.8rem !important;
  cursor: pointer !important;
  transition: all var(--duration-default) var(--easing-smooth) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 36px !important;
  position: relative !important;
  overflow: hidden !important;
  border-radius: inherit !important; }
```

```css
.quantity .quantity__button:hover,
.cart-item .quantity__button:hover { background: rgba(255, 255, 255, 0.1) !important;
  color: white !important; }
```

```css
.quantity .quantity__button:active,
.cart-item .quantity__button:active { background: rgba(255, 255, 255, 0.15) !important; }
```

```css
.quantity .quantity__button:focus,
.cart-item .quantity__button:focus { outline: none !important;
  box-shadow: none !important; }
```

```css
.quantity .quantity__button:focus-visible,
.cart-item .quantity__button:focus-visible { outline: none !important;
  box-shadow: none !important; }
```

```css
.cart__note { margin-bottom: 2rem; }
```

```css
.cart__note label { display: block;
  margin-bottom: 0.8rem;
  font-weight: 500;
  color: white;
  font-size: 1.4rem; }
```

```css
.cart__note textarea { width: 100%;
  min-height: 8rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  color: white;
  resize: vertical;
  font-size: 1.3rem;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.cart__note textarea:focus { outline: none;
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  transform: scale(1.01); }
```

```css
.cart__note textarea::-webkit-input-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea::-moz-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea:-ms-input-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea::-ms-input-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea::placeholder { color: #94a3b8; }
```

```css
.cart__blocks { max-width: 500px;
  margin: 0 auto; }
```

```css
.cart__ctas { text-align: center; }
```

```css
.cart__checkout-button { width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all var(--duration-default) var(--easing-spring);
  background: #fbbf24;
  color: #1e293b;
  transform: translateZ(0); }
```

```css
.cart__checkout-button:hover:not(:disabled) { background: #f59e0b;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3); }
```

```css
.cart__checkout-button:disabled { background: #475569;
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.6; }
```

```css
.cart__dynamic-checkout-buttons { margin-top: 2rem; }
```

```css
.cart-item__error { display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: none !important; }
```

```css
.cart-item__error:has(.cart-item__error-text:not(:empty)) { display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  color: #ef4444;
  font-size: 1.4rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
  border-radius: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
  position: relative;
  overflow: hidden; }
```

```css
.cart-item__error.show-error { display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  color: #ef4444;
  font-size: 1.4rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
  border-radius: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
  position: relative;
  overflow: hidden; }
```

```css
.cart-item__error::before { content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.6), transparent); }
```

```css
.cart-item__error .icon { width: 1.6rem;
  height: 1.6rem; }
```

```css
.cart-item.updating { position: relative;
  opacity: 0.7;
  pointer-events: none; }
```

```css
.cart-item.updating::after { content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 1.6rem;
  z-index: 1; }
```

```css
.cart-item.updating .quantity__input { background: rgba(251, 191, 36, 0.2); }
```

```css
.cart-item.updating::before { content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-top: 2px solid #fbbf24;
  border-radius: 50%;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  z-index: 2; }
```

```css
.cart-item.updated { -webkit-animation: cartItemUpdated var(--duration-slow) var(--easing-spring);
  animation: cartItemUpdated var(--duration-slow) var(--easing-spring); }
```

```css
@-webkit-keyframes cartItemUpdated { 0% {
    transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
@keyframes cartItemUpdated { 0% {
    transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
.cart-item { flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem; }
```

```css
.cart-item__media { width: 100px;
    height: 100px; }
```

```css
.cart-item__quantity-wrapper { justify-content: center;
    flex-wrap: wrap; }
```

```css
.cart__checkout-button { padding: 0.8rem 1.5rem;
    font-size: 1.3rem; }
```

```css
.cart-item__final-price { font-size: 1.4rem; }
```

```css
.cart__checkout-button { padding: 0.8rem 1.2rem;
    font-size: 1.2rem; }
```

```css
.cart-item__error[style*="display: none"],
.cart-item__error { display: none !important; }
```

```css
.cart-item__error:has(.cart-item__error-text:not(:empty)) { display: block !important; }
```

```css
.cart-item__error.show-error { display: block !important; }
```

```css
.cart__update-button { display: none !important; }
```

```css
.cart__errors[style*="display: none"],
.cart__errors { display: none !important; }
```

```css
.cart__errors:has(.cart__error-text:not(:empty)) { display: block !important; }
```

```css
.cart__errors.show-error { display: block !important; }
```

```css
.product-form__cart-submit { @apply text-black font-medium py-3 px-8 rounded-lg;
  background: #ffd800;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  transform: translateZ(0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  box-shadow: none;
  border: none;
  outline: none; }
```

```css
.product-form__cart-submit:hover { background: #e6c200;
  transform: translateY(-1px); }
```

```css
.product-form__cart-submit:focus { outline: none; }
```

```css
.product-form__cart-submit--loading { @apply opacity-75 cursor-not-allowed; }
```

```css
.cart-notification { position: fixed;
  top: 20px;
  right: 20px;
  background: var(--surface-color);
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition:
    opacity var(--duration-default) var(--easing-smooth),
    visibility var(--duration-default) var(--easing-smooth); }
```

```css
.cart-notification--hidden { display: none !important;
  visibility: hidden;
  opacity: 0; }
```

```css
.cart-notification--visible { display: block;
  visibility: visible;
  opacity: 1; }
```

```css
.cart-notification__heading { margin: 0;
  font-size: 18px;
  color: var(--text-color); }
```

```css
.cart-notification__close { background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 5px; }
```

```css
.cart-notification__item { display: flex;
  gap: 15px;
  margin-bottom: 15px; }
```

```css
.cart-notification__image { border-radius: 4px;
  -o-object-fit: cover;
  object-fit: cover; }
```

```css
.cart-notification__title { margin: 0 0 5px 0;
  font-size: 16px;
  color: var(--text-color); }
```

```css
.cart-notification__price { margin: 0 0 5px 0;
  color: var(--primary-color);
  font-weight: bold; }
```

```css
.cart-notification__quantity { margin: 0;
  color: var(--text-muted);
  font-size: 14px; }
```

```css
.add-to-cart-btn { border: none;
  border-radius: 6px;
  font-weight: 600;
  transition:
    background-color var(--duration-default) var(--easing-smooth),
    transform var(--duration-default) var(--easing-smooth);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: -webkit-fit-content;
  min-width: -moz-fit-content;
  min-width: fit-content; }
```

```css
.add-to-cart-btn:hover { transform: translateY(-1px); }
```

```css
.add-to-cart-btn:disabled { opacity: 0.5;
  cursor: not-allowed;
  transform: none; }
```

```css
.add-to-cart-btn.loading { color: transparent; }
```

```css
.add-to-cart-btn.loading .loading-overlay__spinner { display: flex !important; }
```

```css
.add-to-cart-btn .loading-overlay__spinner { position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); }
```

```css
.quantity button:focus,
  .quantity input:focus,
  .cart-item .quantity button:focus,
  .cart-item .quantity input:focus,
  .quantity:focus,
  .quantity:focus-within,
  .cart-item .quantity:focus,
  .cart-item .quantity:focus-within { @apply ring-0 outline-none; }
```

```css
.cart-page { min-height: 100vh;
  background: #0f172a;
  margin-top: 1rem;
  padding-top: 1rem; }
```

```css
.cart-page .page-width { max-width: 700px;
  margin: 0 auto;
  padding: 0 1.5rem; }
```

```css
.cart__warnings { text-align: center;
  padding: 4rem 2rem;
  color: white; }
```

```css
.cart__empty-text { font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white; }
```

```css
.cart__login-title { font-size: 1.8rem;
  font-weight: 500;
  margin: 2rem 0 0.8rem 0;
  color: white; }
```

```css
.cart__login-paragraph { margin-bottom: 1.5rem;
  color: #94a3b8;
  font-size: 1.4rem; }
```

```css
.cart__contents { margin-top: 1.5rem; }
```

```css
.cart-page.is-empty .cart__form { display: none !important; }
```

```css
.cart-page.is-empty .cart__warnings { display: block !important; }
```

```css
.cart-page:not(.is-empty) .cart__warnings { display: none !important; }
```

```css
.cart__warnings { text-align: center;
  padding: 2rem 0; }
```

```css
.cart__empty-text { font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #374151; }
```

```css
.cart__warnings .button { display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s; }
```

```css
.cart__warnings .button:hover { background-color: #333; }
```

```css
.cart__title { font-weight: 600;
  color: white;
  margin: 0;
  font-size: 2rem; }
```

```css
.cart__count { font-weight: 400;
  color: #94a3b8;
  margin: 0.5rem 0 0 0;
  font-size: 1.3rem; }
```

```css
.cart-items { display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem; }
```

```css
.cart-item { background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.8rem;
  padding: 1.5rem;
  transition: all var(--duration-default) var(--easing-smooth);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  transform: translateZ(0); }
```

```css
.cart-item:hover { background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px); }
```

```css
.cart-item__media { flex-shrink: 0;
  width: 120px;
  height: 120px;
  position: relative; }
```

```css
.cart-item__image-container { width: 100%;
  height: 100%;
  border-radius: 0.6rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1); }
```

```css
.cart-item__image { width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 0.6rem; }
```

```css
.cart-item__name { font-size: 1.6rem;
  font-weight: 500;
  color: white;
  margin: 0 0 0.5rem 0;
  text-decoration: none;
  display: block; }
```

```css
.cart-item__discounted-prices { display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem; }
```

```css
.cart-item__old-price { color: #64748b;
  text-decoration: line-through;
  font-size: 1.2rem; }
```

```css
.cart-item__final-price { color: white;
  font-weight: 500;
  font-size: 1.5rem; }
```

```css
.cart-item__quantity-wrapper { display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem; }
```

```css
.quantity .quantity__button,
.cart-item .quantity__button { background: transparent !important;
  border: none !important;
  color: white !important;
  padding: 0.8rem !important;
  cursor: pointer !important;
  transition: all var(--duration-default) var(--easing-smooth) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 36px !important;
  position: relative !important;
  overflow: hidden !important;
  border-radius: inherit !important; }
```

```css
.quantity .quantity__button:hover,
.cart-item .quantity__button:hover { background: rgba(255, 255, 255, 0.1) !important;
  color: white !important; }
```

```css
.quantity .quantity__button:active,
.cart-item .quantity__button:active { background: rgba(255, 255, 255, 0.15) !important; }
```

```css
.quantity .quantity__button:focus,
.cart-item .quantity__button:focus { outline: none !important;
  box-shadow: none !important; }
```

```css
.quantity .quantity__button:focus-visible,
.cart-item .quantity__button:focus-visible { outline: none !important;
  box-shadow: none !important; }
```

```css
.cart__note { margin-bottom: 2rem; }
```

```css
.cart__note label { display: block;
  margin-bottom: 0.8rem;
  font-weight: 500;
  color: white;
  font-size: 1.4rem; }
```

```css
.cart__note textarea { width: 100%;
  min-height: 8rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  color: white;
  resize: vertical;
  font-size: 1.3rem;
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.cart__note textarea:focus { outline: none;
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  transform: scale(1.01); }
```

```css
.cart__note textarea::-webkit-input-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea::-moz-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea:-ms-input-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea::-ms-input-placeholder { color: #94a3b8; }
```

```css
.cart__note textarea::placeholder { color: #94a3b8; }
```

```css
.cart__blocks { max-width: 500px;
  margin: 0 auto; }
```

```css
.cart__ctas { text-align: center; }
```

```css
.cart__checkout-button { width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all var(--duration-default) var(--easing-spring);
  background: #fbbf24;
  color: #1e293b;
  transform: translateZ(0); }
```

```css
.cart__checkout-button:hover:not(:disabled) { background: #f59e0b;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3); }
```

```css
.cart__checkout-button:disabled { background: #475569;
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.6; }
```

```css
.cart__dynamic-checkout-buttons { margin-top: 2rem; }
```

```css
.cart-item__error { display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: none !important; }
```

```css
.cart-item__error:has(.cart-item__error-text:not(:empty)) { display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  color: #ef4444;
  font-size: 1.4rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
  border-radius: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
  position: relative;
  overflow: hidden; }
```

```css
.cart-item__error.show-error { display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  height: auto !important;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  color: #ef4444;
  font-size: 1.4rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05));
  border-radius: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
  position: relative;
  overflow: hidden; }
```

```css
.cart-item__error::before { content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.6), transparent); }
```

```css
.cart-item__error .icon { width: 1.6rem;
  height: 1.6rem; }
```

```css
.cart-item.updating { position: relative;
  opacity: 0.7;
  pointer-events: none; }
```

```css
.cart-item.updating::after { content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 1.6rem;
  z-index: 1; }
```

```css
.cart-item.updating .quantity__input { background: rgba(251, 191, 36, 0.2); }
```

```css
.cart-item.updating::before { content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-top: 2px solid #fbbf24;
  border-radius: 50%;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  z-index: 2; }
```

```css
.cart-item.updated { -webkit-animation: cartItemUpdated var(--duration-slow) var(--easing-spring);
  animation: cartItemUpdated var(--duration-slow) var(--easing-spring); }
```

```css
@-webkit-keyframes cartItemUpdated { 0% {
    transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
@keyframes cartItemUpdated { 0% {
    transform: scale(1);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(251, 191, 36, 0.1); }
```

```css
.cart-item { flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem; }
```

```css
.cart-item__media { width: 100px;
    height: 100px; }
```

```css
.cart-item__quantity-wrapper { justify-content: center;
    flex-wrap: wrap; }
```

```css
.cart__checkout-button { padding: 0.8rem 1.5rem;
    font-size: 1.3rem; }
```

```css
.cart-item__final-price { font-size: 1.4rem; }
```

```css
.cart__checkout-button { padding: 0.8rem 1.2rem;
    font-size: 1.2rem; }
```

```css
.cart-item__error[style*="display: none"],
.cart-item__error { display: none !important; }
```

```css
.cart-item__error:has(.cart-item__error-text:not(:empty)) { display: block !important; }
```

```css
.cart-item__error.show-error { display: block !important; }
```

```css
.cart__update-button { display: none !important; }
```

```css
.cart__errors[style*="display: none"],
.cart__errors { display: none !important; }
```

```css
.cart__errors:has(.cart__error-text:not(:empty)) { display: block !important; }
```

```css
.cart__errors.show-error { display: block !important; }
```

```css
.product-form__cart-submit { @apply text-black font-medium py-3 px-8 rounded-lg;
  background: #ffd800;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  transform: translateZ(0);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  box-shadow: none;
  border: none;
  outline: none; }
```

```css
.product-form__cart-submit:hover { background: #e6c200;
  transform: translateY(-1px); }
```

```css
.product-form__cart-submit:focus { outline: none; }
```

```css
.product-form__cart-submit--loading { @apply opacity-75 cursor-not-allowed; }
```

```css
.search-page__add-to-cart { background: #ffd800;
  color: #000000;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto; }
```

```css
.search-page__add-to-cart:hover { background: #e6c200;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 216, 0, 0.3); }
```

```css
.search-page__add-to-cart { padding: 0.625rem 1rem;
    font-size: 0.875rem; }
```

```css
.search-page__add-to-cart { padding: 0.5rem 0.875rem;
    font-size: 0.8125rem; }
```

```css
.cart-page.is-empty { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden; }
```

```css
.cart-page.is-empty::before { content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 216, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(71, 145, 240, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(89, 186, 185, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1; }
```

```css
.cart-page.is-empty .page-width { position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; }
```

```css
.cart-page.is-empty { margin-top: 0 !important;
  padding-top: 0 !important;
  top: 0 !important; }
```

```css
.cart-page.is-empty body { margin-top: 0 !important;
  padding-top: 0 !important; }
```

```css
.cart-page.is-empty main { margin-top: 0 !important;
  padding-top: 0 !important; }
```

```css
.cart-page.is-empty .cart__warnings { text-align: center;
  max-width: 600px;
  width: 100%;
  background: #2d2d3a;
  border: none;
  border-radius: 20px;
  padding: 4rem 3rem;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: visible; }
```

```css
.cart-page.is-empty .cart__warnings-ring { position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: conic-gradient(from 0deg,
      #ff0000,
      #ff8000,
      #ffff00,
      #80ff00,
      #00ff00,
      #00ff80,
      #00ffff,
      #0080ff,
      #0000ff,
      #8000ff,
      #ff00ff,
      #ff0080,
      #ff0000);
  border-radius: 22px;
  z-index: -1;
  -webkit-animation: rotate 3s linear infinite;
  animation: rotate 3s linear infinite;
  -webkit-filter: blur(0.5px);
  filter: blur(0.5px);
  box-shadow:
    0 0 10px rgba(255, 0, 0, 0.5),
    0 0 20px rgba(0, 255, 255, 0.3),
    0 0 30px rgba(255, 255, 0, 0.2); }
```

```css
.cart-page.is-empty .cart__warnings-ring::before { content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: #1f1f23;
  border-radius: 20px;
  z-index: -1; }
```

```css
.cart-page.is-empty .cart__warnings::after { content: "🛒";
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
  background: linear-gradient(135deg, #ffd800, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-filter: drop-shadow(0 0 20px rgba(255, 216, 0, 0.5));
  filter: drop-shadow(0 0 20px rgba(255, 216, 0, 0.5));
  -webkit-animation: float 3s ease-in-out infinite;
  animation: float 3s ease-in-out infinite;
  z-index: 10; }
```

```css
.cart-page.is-empty .cart__empty-text { font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffd800 0%, #ffed4e 50%, #ffd800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 216, 0, 0.3);
  letter-spacing: -0.02em;
  position: relative; }
```

```css
.cart-page.is-empty .cart__empty-text::after { content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ffd800, #4791f0);
  border-radius: 2px; }
```

```css
.cart-page.is-empty .cart__empty-description { font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 2.5rem;
  font-weight: 500;
  letter-spacing: 0.02em; }
```

```css
.cart-page.is-empty .cart__warnings .button { display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 50px;
  background: linear-gradient(135deg, #ffd800 0%, #ffed4e 100%);
  color: #0f172a;
  border: 2px solid transparent;
  box-shadow:
    0 10px 30px rgba(255, 216, 0, 0.3),
    0 0 0 1px rgba(255, 216, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.05em; }
```

```css
.cart-page.is-empty .cart__warnings .button::before { content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s; }
```

```css
.cart-page.is-empty .cart__warnings .button:hover { transform: translateY(-3px) scale(1.05);
  box-shadow:
    0 20px 40px rgba(255, 216, 0, 0.4),
    0 0 0 1px rgba(255, 216, 0, 0.3);
  background: linear-gradient(135deg, #ffed4e 0%, #ffd800 100%); }
```

```css
.cart-page.is-empty .cart__warnings .button:hover::before { left: 100%; }
```

```css
.cart-page.is-empty .cart__warnings .button:active { transform: translateY(-1px) scale(1.02); }
```

```css
.cart-page.is-empty .cart__login-title { font-size: 1.5rem;
  font-weight: 600;
  margin: 3rem 0 1rem 0;
  color: #59bab9;
  text-shadow: 0 0 20px rgba(89, 186, 185, 0.3); }
```

```css
.cart-page.is-empty .cart__login-paragraph { margin-bottom: 2rem;
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.6; }
```

```css
.cart-page.is-empty .cart__login-paragraph a { color: #4791f0;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent; }
```

```css
.cart-page.is-empty .cart__login-paragraph a:hover { color: #ffd800;
  border-bottom-color: #ffd800;
  text-shadow: 0 0 10px rgba(255, 216, 0, 0.3); }
```

```css
.cart-page.is-empty .cart__warnings .decorative-dot-1 { position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4791f0, #59bab9);
  border-radius: 50%;
  opacity: 0.3;
  -webkit-animation: pulse 2s ease-in-out infinite;
  animation: pulse 2s ease-in-out infinite; }
```

```css
.cart-page.is-empty .cart__warnings .decorative-dot-2 { position: absolute;
  bottom: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #ffd800, #ffed4e);
  border-radius: 50%;
  opacity: 0.2;
  -webkit-animation: pulse 2s ease-in-out infinite 1s;
  animation: pulse 2s ease-in-out infinite 1s; }
```

```css
.cart-page.is-empty .cart__empty-text { font-size: 2.5rem; }
```

```css
.cart-page.is-empty .cart__warnings .button { padding: 0.875rem 2rem;
    font-size: 1rem; }
```

```css
.cart-page.is-empty .cart__empty-text { font-size: 2rem; }
```

```css
.cart-page.is-empty .cart__warnings .button { padding: 0.75rem 1.5rem;
    font-size: 0.9rem; }
```

```css
.cart-page.is-empty .cart__warnings .button:focus { outline: 2px solid #ffd800;
  outline-offset: 4px;
  box-shadow:
    0 10px 30px rgba(255, 216, 0, 0.3),
    0 0 0 1px rgba(255, 216, 0, 0.2),
    0 0 0 4px rgba(255, 216, 0, 0.1); }
```

```css
.cart-page.is-empty .cart__warnings .button:hover { transform: none; }
```

```css
.cart-page.is-empty .cart__warnings::before,
.cart-page.is-empty .cart__warnings::after { content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 1px;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
  background-image: conic-gradient(from var(--angle), #ff0000, #00ff00, #0000ff, #ff00ff, #ffff00, #00ffff, #ff0000);
  -webkit-animation: rotate 4s linear infinite;
  animation: rotate 4s linear infinite; }
```

```css
.cart-page.is-empty .cart__warnings::before { -webkit-filter: blur(8px);
  filter: blur(8px);
  opacity: 0.3; }
```

```css
.cart-page { padding-bottom: 100px; }
```

```css
.cart-notification { z-index: 55; }
```

---

### dev/css/layout/footer.css
**Missing blocks:** 9

```css
.cart-notification__footer { display: flex;
  gap: 10px; }
```

```css
.password-footer { padding: 1rem 0;
    text-align: center;
    border-top: 1px solid hsl(var(--border)); }
```

```css
.cart__footer { background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem; }
```

```css
.cart__footer { padding: 1.5rem 1rem; }
```

```css
.cart-notification__footer { display: flex;
  gap: 10px; }
```

```css
.password-footer { padding: 1rem 0;
    text-align: center;
    border-top: 1px solid hsl(var(--border)); }
```

```css
.cart__footer { background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem; }
```

```css
.cart__footer { padding: 1.5rem 1rem; }
```

```css
.customer-review-footer { display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  flex-shrink: 0; }
```

---

### dev/css/base/variables.css
**Missing blocks:** 2

```css
:root { --color-background: 29 30 38;
  --color-surface: 37 39 48;
  --color-foreground: 255 255 255;
  --color-primary: 255 216 0;
  --color-secondary: 71 145 240;
  --color-accent: 89 186 185;
  --color-border: 51 52 65;
  --color-shadow: 0 0 0;

  
  --primary-color: rgb(var(--color-primary));
  --background: rgb(var(--color-background));
  --foreground: rgb(var(--color-foreground));

  
  --color-button: var(--color-primary);
  --color-button-text: 0 0 0;
  --color-button-hover: 217 119 6;

  
  --alpha-button-background: 1;
  --alpha-button-border: 1;
  --alpha-link: 0.85;
  --alpha-badge-border: 0.1;

  
  --page-width: 1280px;
  --container-padding: 1.5rem;

  
  --font-body-scale: 1;
  --font-heading-scale: 1.2;

  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  
  --border-radius-sm: 0.25rem;
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;

  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  
  --duration-short: 200ms;
  --duration-default: 400ms;
  --duration-long: 600ms;
  --duration-slow: 1000ms;
  --duration-card: 600ms;
  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  
  --focused-base-outline: 0.2rem solid rgba(var(--color-primary), 0.5);
  --focused-base-outline-offset: 0.3rem;
  --focused-base-box-shadow:
    0 0 0 0.3rem rgb(var(--color-background)), 0 0 0.5rem 0.4rem rgba(var(--color-primary), 0.3);

  
  --header-background-opacity: 0.95;
  --header-border-opacity: 0.1;
  --header-blur: 12px;

  
  --logo-width: 100px;

  
  --widget-bg-image: none;
  
  --hero-bg-image: none;
  
  --featured-bg-image: none;
  
  --why-choose-bg-image: none;
  

  
  --animation-order: 0;
  --rating: 0;
  --padding-top-mobile: 0px;
  --padding-bottom-mobile: 0px;
  --padding-top-desktop: 0px;
  --padding-bottom-desktop: 0px; }
```

```css
:root { --color-background: 29 30 38;
  --color-surface: 37 39 48;
  --color-foreground: 255 255 255;
  --color-primary: 255 216 0;
  --color-secondary: 71 145 240;
  --color-accent: 89 186 185;
  --color-border: 51 52 65;
  --color-shadow: 0 0 0;

  
  --primary-color: rgb(var(--color-primary));
  --background: rgb(var(--color-background));
  --foreground: rgb(var(--color-foreground));

  
  --color-button: var(--color-primary);
  --color-button-text: 0 0 0;
  --color-button-hover: 217 119 6;

  
  --alpha-button-background: 1;
  --alpha-button-border: 1;
  --alpha-link: 0.85;
  --alpha-badge-border: 0.1;

  
  --page-width: 1280px;
  --container-padding: 1.5rem;

  
  --font-body-scale: 1;
  --font-heading-scale: 1.2;

  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  
  --border-radius-sm: 0.25rem;
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;

  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  
  --duration-short: 200ms;
  --duration-default: 400ms;
  --duration-long: 600ms;
  --duration-slow: 1000ms;
  --duration-card: 600ms;
  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  
  --focused-base-outline: 0.2rem solid rgba(var(--color-primary), 0.5);
  --focused-base-outline-offset: 0.3rem;
  --focused-base-box-shadow:
    0 0 0 0.3rem rgb(var(--color-background)), 0 0 0.5rem 0.4rem rgba(var(--color-primary), 0.3);

  
  --header-background-opacity: 0.95;
  --header-border-opacity: 0.1;
  --header-blur: 12px;

  
  --logo-width: 100px;

  
  --widget-bg-image: none;
  
  --hero-bg-image: none;
  
  --featured-bg-image: none;
  
  --why-choose-bg-image: none;
  

  
  --animation-order: 0;
  --rating: 0;
  --padding-top-mobile: 0px;
  --padding-bottom-mobile: 0px;
  --padding-top-desktop: 0px;
  --padding-bottom-desktop: 0px; }
```

---

### dev/css/pages/customer-account.css
**Missing blocks:** 16

```css
.smooth-border { transition:
      border-color var(--duration-default) var(--easing-smooth),
      border-width var(--duration-default) var(--easing-smooth); }
```

```css
.inventory-status--backorder { @apply bg-blue-500/20 text-blue-400; }
```

```css
.smooth-border { transition:
      border-color var(--duration-default) var(--easing-smooth),
      border-width var(--duration-default) var(--easing-smooth); }
```

```css
.inventory-status--backorder { @apply bg-blue-500/20 text-blue-400; }
```

```css
.customer-reviews-section { position: relative;
  overflow: hidden; }
```

```css
.customer-reviews-section::before { content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  pointer-events: none; }
```

```css
.customer-reviews-grid { display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem; }
```

```css
.customer-review-card { background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 200px; }
```

```css
.customer-review-card:hover { background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 216, 0, 0.3); }
```

```css
.customer-review-stars { display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem; }
```

```css
.customer-review-stars .star { color: rgb(255, 216, 0);
  font-size: 1.125rem; }
```

```css
.customer-review-text { color: white;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1.125rem;
  flex-grow: 1;
  display: flex;
  align-items: flex-start; }
```

```css
.customer-review-author { color: rgb(255, 216, 0);
  font-size: 0.875rem;
  font-weight: 500; }
```

```css
.customer-review-date { color: rgb(74, 222, 128);
  font-size: 0.75rem;
  font-weight: 400;
  background: rgba(74, 222, 128, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  white-space: nowrap; }
```

```css
.customer-review-stars .star { font-size: 1.25rem; }
```

```css
.customer-review-stars .star { font-size: 1.375rem; }
```

---

### dev/css/components/modals.css
**Missing blocks:** 74

```css
.password-modal { position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; }
```

```css
.password-modal__content { background: hsl(var(--card));
    padding: 2rem;
    border-radius: var(--radius);
    max-width: 400px;
    width: 90%;
    position: relative; }
```

```css
.password-modal__close { position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: hsl(var(--foreground));
    cursor: pointer;
    font-size: 1.5rem; }
```

```css
.password-modal--hidden { display: none; }
```

```css
.password-modal--visible { display: flex; }
```

```css
.search-modal__overlay { background: linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
  -webkit-backdrop-filter: blur(4px) saturate(120%);
  backdrop-filter: blur(4px) saturate(120%); }
```

```css
.search-modal__container { background: linear-gradient(135deg, rgba(31, 41, 55, 0.6) 0%, rgba(31, 41, 55, 0.5) 50%, rgba(31, 41, 55, 0.6) 100%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(255, 216, 0, 0.4);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.03); }
```

```css
.search-modal__submit { background: linear-gradient(135deg, rgba(255, 216, 0, 0.9) 0%, rgba(255, 216, 0, 0.8) 100%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid rgba(255, 216, 0, 0.3);
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.search-modal__submit:hover { background: linear-gradient(135deg, rgba(255, 216, 0, 1) 0%, rgba(255, 216, 0, 0.9) 100%);
  transform: translateY(-1px);
  box-shadow:
    0 4px 12px rgba(255, 216, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.1); }
```

```css
.loading-overlay { position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 1.6rem; }
```

```css
.loading-overlay.hidden { display: none; }
```

```css
.loading-overlay__spinner { width: 3rem;
  height: 3rem; }
```

```css
.password-modal { position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; }
```

```css
.password-modal__content { background: hsl(var(--card));
    padding: 2rem;
    border-radius: var(--radius);
    max-width: 400px;
    width: 90%;
    position: relative; }
```

```css
.password-modal__close { position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: hsl(var(--foreground));
    cursor: pointer;
    font-size: 1.5rem; }
```

```css
.password-modal--hidden { display: none; }
```

```css
.password-modal--visible { display: flex; }
```

```css
.search-modal__overlay { background: linear-gradient(135deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 100%);
  -webkit-backdrop-filter: blur(4px) saturate(120%);
  backdrop-filter: blur(4px) saturate(120%); }
```

```css
.search-modal__container { background: linear-gradient(135deg, rgba(31, 41, 55, 0.6) 0%, rgba(31, 41, 55, 0.5) 50%, rgba(31, 41, 55, 0.6) 100%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(255, 216, 0, 0.4);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.03); }
```

```css
.search-modal__submit { background: linear-gradient(135deg, rgba(255, 216, 0, 0.9) 0%, rgba(255, 216, 0, 0.8) 100%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid rgba(255, 216, 0, 0.3);
  transition: all var(--duration-default) var(--easing-smooth); }
```

```css
.search-modal__submit:hover { background: linear-gradient(135deg, rgba(255, 216, 0, 1) 0%, rgba(255, 216, 0, 0.9) 100%);
  transform: translateY(-1px);
  box-shadow:
    0 4px 12px rgba(255, 216, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.1); }
```

```css
.loading-overlay { position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 1.6rem; }
```

```css
.loading-overlay.hidden { display: none; }
```

```css
.loading-overlay__spinner { width: 3rem;
  height: 3rem; }
```

```css
.zoom-overlay { @apply fixed inset-0 z-50 hidden; }
```

```css
.zoom-overlay.active { @apply block; }
```

```css
.search-modal__container { margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem; }
```

```css
.search-modal__results { max-height: 60vh; }
```

```css
.search-modal__close:focus,
.search-modal__submit:focus { outline: 2px solid rgb(255, 216, 0);
  outline-offset: 2px; }
```

```css
.search-modal__loading .animate-spin { -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite; }
```

```css
.search-modal__results:focus-within { outline: none; }
```

```css
.search-modal__container { max-width: 32rem;
  width: 100%;
  background: rgba(17, 24, 39, 0.95);
  -webkit-backdrop-filter: blur(1rem);
  backdrop-filter: blur(1rem);
  border: 1px solid rgba(255, 216, 0, 0.2);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
```

```css
.search-modal__body { padding: 1.5rem; }
```

```css
.search-modal__icon { position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(156, 163, 175, 0.8); }
```

```css
.search-modal__submit { position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  background: #ffd800;
  color: black;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease; }
```

```css
.search-modal__submit:hover { background: #e6c200;
  transform: translateY(-50%) scale(1.02); }
```

```css
.search-modal__results { max-height: 24rem;
  overflow-y: auto; }
```

```css
.search-modal__loading { text-align: center;
  padding: 2rem; }
```

```css
.search-modal__loading.hidden { display: none !important; }
```

```css
.search-modal__no-results { text-align: center;
  padding: 2rem;
  color: rgba(156, 163, 175, 0.8); }
```

```css
.search-modal__results::-webkit-scrollbar { width: 6px; }
```

```css
.search-modal__results::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.3);
  border-radius: 3px; }
```

```css
.search-modal__results::-webkit-scrollbar-thumb { background: rgba(255, 216, 0, 0.3);
  border-radius: 3px; }
```

```css
.search-modal__results::-webkit-scrollbar-thumb:hover { background: rgba(255, 216, 0, 0.5); }
```

```css
.search-modal { position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  overflow: hidden; }
```

```css
.search-modal.hidden { opacity: 0;
  visibility: hidden;
  display: none; }
```

```css
.search-modal__overlay { position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  pointer-events: none; }
```

```css
.search-modal__content { position: relative;
  width: 100%;
  max-width: 500px;
  background: rgba(17, 24, 39, 0.95);
  border-radius: 1rem;
  border: 1px solid rgba(255, 216, 0, 0.4);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transform: translateY(-20px);
  transition: transform 0.3s ease;
  z-index: 10; }
```

```css
.search-modal__container { padding: 0;
  background: transparent; }
```

```css
.search-modal__content-results { padding: 0;
  background: transparent; }
```

```css
.search-modal__heading { color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0; }
```

```css
.search-modal__close { display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease; }
```

```css
.search-modal__close:hover { background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1); }
```

```css
.search-modal__body { padding: 1.5rem; }
```

```css
.search-modal__icon { position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none; }
```

```css
.search-modal__submit { position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: #ffd800;
  color: #000;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease; }
```

```css
.search-modal__submit:hover { background: #e6c200;
  transform: translateY(-50%) scale(1.05); }
```

```css
.search-modal__results { max-height: 400px;
  overflow-y: auto; }
```

```css
.search-modal__loading { display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem; }
```

```css
.search-modal__loading.hidden { display: none !important; }
```

```css
.search-modal__spinner { width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffd800;
  border-radius: 50%;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite; }
```

```css
.search-modal__no-results { text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 2rem; }
```

```css
.search-modal__results-list { display: flex;
  flex-direction: column;
  gap: 0.5rem; }
```

```css
.search-modal__result-item { display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent; }
```

```css
.search-modal__result-item:hover { background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 216, 0, 0.3);
  transform: translateY(-2px); }
```

```css
.search-modal__result-image { width: 48px;
  height: 48px;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 0.5rem; }
```

```css
.search-modal__result-title { font-size: 1rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: white; }
```

```css
.search-modal__result-price-text { font-size: 0.875rem;
  margin: 0 0 0.25rem 0; }
```

```css
.search-modal__result-price { color: #ffd800;
  font-weight: 600; }
```

```css
.search-modal__result-type { font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0; }
```

```css
.search-modal__result-arrow { flex-shrink: 0;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease; }
```

```css
.search-modal__result-item:hover .search-modal__result-arrow { color: #ffd800;
  transform: translateX(4px); }
```

```css
.search-modal__result-arrow svg { width: 20px;
  height: 20px; }
```

```css
.search-modal__highlight { background: rgba(255, 216, 0, 0.2);
  color: #ffd800;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem; }
```

---

## Migration Instructions

1. For each category above, open the corresponding CSS file
2. Add the missing blocks to the appropriate section
3. Ensure BEM naming conventions are followed
4. Update CSS custom properties where applicable
5. Test the changes to ensure no regressions

## Notes
- Some blocks may need to be refactored to follow BEM conventions
- Consider consolidating similar styles
- Remove the old CSS file once migration is complete
