/* eslint-disable */
/* global WebImporter */

import tagListParser from './parsers/tag-list.js';
import activeFilterParser from './parsers/active-filter.js';
import resultsToolbarParser from './parsers/results-toolbar.js';
import paginationParser from './parsers/pagination.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "listing-curated",
  "urls": [
    "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management/top-m2-extension-for-personalization.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content/top-m2-extension-for-product-content.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media/top-m2-extension-for-rich-media.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation/top-m2-extension-for-search.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/top-m2-extension-for-content-customization.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization/top-m2-extension-for-translation.html",
    "https://commercemarketplace.adobe.com/extensions/featured-extensions.html",
    "https://commercemarketplace.adobe.com/extensions/featured-m2-extensions.html",
    "https://commercemarketplace.adobe.com/extensions/magento-premier-partners-extensions.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing/top-m2-extension-for-email-marketing.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/top-m2-extension-for-marketing.html",
    "https://commercemarketplace.adobe.com/extensions/partner-extensions.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements/top-m2-extension-for-checkout.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration/top-m2-extension-for-payment-integration.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security/top-m2-extension-for-payment-security.html",
    "https://commercemarketplace.adobe.com/extensions/reporting-analytics/top-m2-extension-for-reporting.html",
    "https://commercemarketplace.adobe.com/extensions/sales/pricing-promotions.html",
    "https://commercemarketplace.adobe.com/extensions/sales/top-m2-extension-for-sales.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms/top-m2-for-oms.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/top-m2-extension-for-shipping-fulfillment.html",
    "https://commercemarketplace.adobe.com/extensions/site-optimization/testing-segmentation.html",
    "https://commercemarketplace.adobe.com/extensions/site-optimization/top-m2-extension-for-site-optimization.html",
    "https://commercemarketplace.adobe.com/extensions/started-kit.html",
    "https://commercemarketplace.adobe.com/themes/featured-themes.html",
    "https://commercemarketplace.adobe.com/themes/industry.html",
    "https://commercemarketplace.adobe.com/themes/industry/all-purpose.html",
    "https://commercemarketplace.adobe.com/themes/industry/apparel.html",
    "https://commercemarketplace.adobe.com/themes/industry/automotive.html",
    "https://commercemarketplace.adobe.com/themes/industry/electronics.html",
    "https://commercemarketplace.adobe.com/themes/industry/food.html",
    "https://commercemarketplace.adobe.com/themes/industry/home.html",
    "https://commercemarketplace.adobe.com/themes/industry/pets.html",
    "https://commercemarketplace.adobe.com/themes/industry/services.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/colorful.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/elegant.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/grungy.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/lush.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/minimal.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/modern.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/organic.html",
    "https://commercemarketplace.adobe.com/themes/styles/look/retro.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/bold.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/cool.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/creative.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/dark.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/fun.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/neutral.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/upbeat.html",
    "https://commercemarketplace.adobe.com/themes/styles/mood/warm.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/corporate.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/diy.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/exotic.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/family.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/holiday.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/nature.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/scifi.html",
    "https://commercemarketplace.adobe.com/themes/styles/motif/urban.html"
  ],
  "description": "Listing page with breadcrumb, page title, selected-filters panel, results toolbar with sort, product card grid or empty-results message with suggested searches, and results-per-page pagination",
  "blocks": [
    {
      "name": "tag-list",
      "instances": [
        "div.page-wrapper > div.breadcrumbs",
        "#selected-filters-container > div.selected-filters-header",
        "#products-grid ul.popular-queries"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management/top-m2-extension-for-personalization.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content/top-m2-extension-for-product-content.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media/top-m2-extension-for-rich-media.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation/top-m2-extension-for-search.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/top-m2-extension-for-content-customization.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization/top-m2-extension-for-translation.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-extensions.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-m2-extensions.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/magento-premier-partners-extensions.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing/top-m2-extension-for-email-marketing.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/top-m2-extension-for-marketing.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/partner-extensions.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements/top-m2-extension-for-checkout.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration/top-m2-extension-for-payment-integration.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/top-m2-extension-for-payment-security.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics/top-m2-extension-for-reporting.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/pricing-promotions.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/top-m2-extension-for-sales.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms/top-m2-for-oms.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/top-m2-extension-for-shipping-fulfillment.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/testing-segmentation.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/top-m2-extension-for-site-optimization.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/started-kit.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/featured-themes.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/all-purpose.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/apparel.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/automotive.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/electronics.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/food.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/home.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/pets.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/services.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/colorful.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/elegant.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/grungy.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/lush.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/minimal.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/modern.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/organic.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/retro.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/bold.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/cool.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/creative.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/dark.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/fun.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/neutral.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/upbeat.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/warm.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/corporate.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/diy.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/exotic.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/family.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/holiday.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/nature.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/scifi.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/urban.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header",
          "#products-grid > div > div > ul"
        ]
      }
    },
    {
      "name": "active-filter",
      "instances": [
        "#selected-filters-container > div.selected-filters-list"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management/top-m2-extension-for-personalization.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content/top-m2-extension-for-product-content.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media/top-m2-extension-for-rich-media.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation/top-m2-extension-for-search.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/top-m2-extension-for-content-customization.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization/top-m2-extension-for-translation.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-extensions.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-m2-extensions.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/magento-premier-partners-extensions.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing/top-m2-extension-for-email-marketing.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/top-m2-extension-for-marketing.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/partner-extensions.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements/top-m2-extension-for-checkout.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration/top-m2-extension-for-payment-integration.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/top-m2-extension-for-payment-security.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics/top-m2-extension-for-reporting.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/pricing-promotions.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/top-m2-extension-for-sales.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms/top-m2-for-oms.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/top-m2-extension-for-shipping-fulfillment.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/testing-segmentation.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/top-m2-extension-for-site-optimization.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/started-kit.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/featured-themes.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/all-purpose.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/apparel.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/automotive.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/electronics.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/food.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/home.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/pets.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/services.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/colorful.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/elegant.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/grungy.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/lush.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/minimal.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/modern.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/organic.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/retro.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/bold.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/cool.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/creative.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/dark.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/fun.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/neutral.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/upbeat.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/warm.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/corporate.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/diy.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/exotic.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/family.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/holiday.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/nature.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/scifi.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/urban.html": [
          "#selected-filters-container > div.selected-filters-list"
        ]
      }
    },
    {
      "name": "results-toolbar",
      "instances": [
        "#livesearch-category-view > div.products-header"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management/top-m2-extension-for-personalization.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content/top-m2-extension-for-product-content.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media/top-m2-extension-for-rich-media.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation/top-m2-extension-for-search.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/top-m2-extension-for-content-customization.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization/top-m2-extension-for-translation.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-extensions.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-m2-extensions.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/magento-premier-partners-extensions.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing/top-m2-extension-for-email-marketing.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/top-m2-extension-for-marketing.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/partner-extensions.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements/top-m2-extension-for-checkout.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration/top-m2-extension-for-payment-integration.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/top-m2-extension-for-payment-security.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics/top-m2-extension-for-reporting.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/pricing-promotions.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/top-m2-extension-for-sales.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms/top-m2-for-oms.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/top-m2-extension-for-shipping-fulfillment.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/testing-segmentation.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/top-m2-extension-for-site-optimization.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/started-kit.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/featured-themes.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/all-purpose.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/apparel.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/automotive.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/electronics.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/food.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/home.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/pets.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/services.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/colorful.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/elegant.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/grungy.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/lush.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/minimal.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/modern.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/organic.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/retro.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/bold.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/cool.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/creative.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/dark.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/fun.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/neutral.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/upbeat.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/warm.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/corporate.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/diy.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/exotic.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/family.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/holiday.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/nature.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/scifi.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/urban.html": [
          "#livesearch-category-view > div.products-header"
        ]
      }
    },
    {
      "name": "pagination",
      "instances": [
        "#livesearch-controls"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management/top-m2-extension-for-personalization.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content/top-m2-extension-for-product-content.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media/top-m2-extension-for-rich-media.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation/top-m2-extension-for-search.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/top-m2-extension-for-content-customization.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization/top-m2-extension-for-translation.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-extensions.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/featured-m2-extensions.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/magento-premier-partners-extensions.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing/top-m2-extension-for-email-marketing.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/top-m2-extension-for-marketing.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/partner-extensions.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements/top-m2-extension-for-checkout.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration/top-m2-extension-for-payment-integration.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/top-m2-extension-for-payment-security.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics/top-m2-extension-for-reporting.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/pricing-promotions.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/top-m2-extension-for-sales.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms/top-m2-for-oms.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/top-m2-extension-for-shipping-fulfillment.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/testing-segmentation.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/top-m2-extension-for-site-optimization.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/started-kit.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/featured-themes.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/all-purpose.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/apparel.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/automotive.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/electronics.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/food.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/home.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/pets.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/industry/services.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/colorful.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/elegant.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/grungy.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/lush.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/minimal.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/modern.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/organic.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/look/retro.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/bold.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/cool.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/creative.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/dark.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/fun.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/neutral.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/upbeat.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/mood/warm.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/corporate.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/diy.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/exotic.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/family.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/holiday.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/nature.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/scifi.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes/styles/motif/urban.html": [
          "#livesearch-controls"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "listing-header",
      "name": "Breadcrumb and title",
      "selector": [
        "div.page-wrapper > div.breadcrumbs"
      ],
      "style": null,
      "blocks": [
        "tag-list"
      ],
      "defaultContent": [
        "#maincontent > div.columns > div.page-title-wrapper"
      ]
    },
    {
      "id": "listing-sidebar",
      "name": "Filters sidebar",
      "selector": [
        "#appstore-plp-facets"
      ],
      "style": "sidebar",
      "blocks": [
        "tag-list",
        "active-filter"
      ],
      "defaultContent": []
    },
    {
      "id": "listing-results",
      "name": "Results",
      "selector": [
        "#livesearch-category-view"
      ],
      "style": "results",
      "blocks": [
        "results-toolbar",
        "tag-list",
        "pagination"
      ],
      "defaultContent": [
        "#products-grid > div > p",
        "#products-grid > div > div > p.suggestions-label",
        "#products-grid > div > div > p.or-divider",
        "#products-grid > div > div > a"
      ]
    }
  ],
  "removeAfterParse": [
    "#instant-search-facets-container"
  ],
  "pageCleanup": {
    "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management/top-m2-extension-for-personalization.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content/top-m2-extension-for-product-content.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media/top-m2-extension-for-rich-media.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation/top-m2-extension-for-search.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/top-m2-extension-for-content-customization.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization/top-m2-extension-for-translation.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/featured-extensions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/featured-m2-extensions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/magento-premier-partners-extensions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing/top-m2-extension-for-email-marketing.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/top-m2-extension-for-marketing.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/partner-extensions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements/top-m2-extension-for-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration/top-m2-extension-for-payment-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security/top-m2-extension-for-payment-security.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/reporting-analytics/top-m2-extension-for-reporting.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/pricing-promotions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/top-m2-extension-for-sales.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms/top-m2-for-oms.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/top-m2-extension-for-shipping-fulfillment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/site-optimization/testing-segmentation.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/site-optimization/top-m2-extension-for-site-optimization.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/started-kit.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/featured-themes.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/all-purpose.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/apparel.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/automotive.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/electronics.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/food.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/home.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/pets.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/industry/services.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/colorful.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/elegant.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/grungy.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/lush.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/minimal.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/modern.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/organic.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/look/retro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/bold.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/cool.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/creative.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/dark.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/fun.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/neutral.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/upbeat.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/mood/warm.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/corporate.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/diy.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/exotic.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/family.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/holiday.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/nature.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/scifi.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/themes/styles/motif/urban.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ]
  }
};

const parsers = {
  'tag-list': tagListParser,
  'active-filter': activeFilterParser,
  'results-toolbar': resultsToolbarParser,
  'pagination': paginationParser,
};
// Section transformers insert <hr> markers, so their beforeTransform runs after block discovery.
const sectionTransformers = [commercemarketplaceSectionsTransformer];
const transformers = [commercemarketplaceCleanupTransformer, ...sectionTransformers];

function executeTransformers(hookName, element, payload, list = transformers) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  list.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template, url) {
  const pageBlocks = [];
  const pageKey = (u) => {
    try { const { origin, pathname } = new URL(u); return `${origin}${pathname.replace(/\/$/, '')}`; }
    catch { return u; }
  };
  const key = pageKey(url);
  const claim = (blockDef, selector) => {
    let matches = [];
    try { matches = document.querySelectorAll(selector); } catch { return; }
    matches.forEach((element) => {
      if (pageBlocks.some((b) => b.element === element || b.element.contains(element) || element.contains(b.element))) return;
      pageBlocks.push({ name: blockDef.name, selector, element });
    });
  };
  template.blocks.forEach((blockDef) => {
    const entry = Object.entries(blockDef.pageInstances || {}).find(([u]) => pageKey(u) === key);
    (entry ? entry[1] : []).forEach((selector) => claim(blockDef, selector));
  });
  template.blocks.forEach((blockDef) => (blockDef.instances || []).forEach((selector) => claim(blockDef, selector)));
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    params.fragments = [];

    executeTransformers('beforeTransform', main, payload, transformers.filter((fn) => !sectionTransformers.includes(fn)));
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE, params.originalURL);
    executeTransformers('beforeTransform', main, payload, sectionTransformers);

    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }, ...params.fragments];
  },
};
