/* eslint-disable */
/* global WebImporter */

import tagListParser from './parsers/tag-list.js';
import activeFilterParser from './parsers/active-filter.js';
import facetFilterParser from './parsers/facet-filter.js';
import priceFilterParser from './parsers/price-filter.js';
import resultsToolbarParser from './parsers/results-toolbar.js';
import cardsProductParser from './parsers/cards-product.js';
import paginationParser from './parsers/pagination.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "listing-category",
  "urls": [
    "https://commercemarketplace.adobe.com/extensions.html",
    "https://commercemarketplace.adobe.com/extensions/accounting-finance.html",
    "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html",
    "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html",
    "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html",
    "https://commercemarketplace.adobe.com/extensions/customer-support.html",
    "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html",
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html",
    "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html",
    "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html",
    "https://commercemarketplace.adobe.com/extensions/sales.html",
    "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html",
    "https://commercemarketplace.adobe.com/extensions/sales/gifts.html",
    "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html",
    "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html",
    "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html",
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html",
    "https://commercemarketplace.adobe.com/extensions/site-optimization.html",
    "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html",
    "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html",
    "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html",
    "https://commercemarketplace.adobe.com/themes.html"
  ],
  "description": "Category listing page with breadcrumb, title, left facet sidebar (categories, checkbox filters, price range, ratings), results toolbar with sort, product card grid and numbered pagination",
  "blocks": [
    {
      "name": "tag-list",
      "instances": [
        "div.page-wrapper > div.breadcrumbs",
        "#selected-filters-container > div.selected-filters-header"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
          "#html-body > div.page-wrapper > div.breadcrumbs",
          "#selected-filters-container > div.selected-filters-header"
        ]
      }
    },
    {
      "name": "active-filter",
      "instances": [
        "#selected-filters-container > div.selected-filters-list"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#selected-filters-container > div.selected-filters-list"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
          "#selected-filters-container > div.selected-filters-list",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title"
        ]
      }
    },
    {
      "name": "facet-filter",
      "instances": [
        "#instant-search-facets-container div.facet-group:is(.facet-ext-all-editions, .facet-ext-certification, .facet-ext-connect-partner-level-title, .facet-ext-mde-compatibility, .facet-ext-package-type, .facet-subscription-available) > ul"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-certification > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-mde-compatibility > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-connect-partner-level-title > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-ext-all-editions > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-subscription-available > ul",
          "#instant-search-facets-container > div > div.facet-group.facet-ext-package-type > ul"
        ]
      }
    },
    {
      "name": "price-filter",
      "instances": [
        "#instant-search-facets-container div.facet-group.facet-price > div.price-range-input"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
          "#instant-search-facets-container > div > div.facet-group.facet-price > div.price-range-input"
        ]
      }
    },
    {
      "name": "results-toolbar",
      "instances": [
        "#livesearch-category-view > div.products-header"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#livesearch-category-view > div.products-header"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
          "#livesearch-category-view > div.products-header"
        ]
      }
    },
    {
      "name": "cards-product",
      "instances": [
        "#products-grid"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#products-grid"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
          "#products-grid"
        ]
      }
    },
    {
      "name": "pagination",
      "instances": [
        "#livesearch-controls"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/extensions.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
          "#livesearch-controls"
        ],
        "https://commercemarketplace.adobe.com/themes.html": [
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
        "active-filter",
        "facet-filter",
        "price-filter"
      ],
      "defaultContent": [
        "#instant-search-facets-container div.facet-group > div.facet-title",
        "#instant-search-facets-container div.facet-group.facet-category-hierarchical > ul",
        "#instant-search-facets-container div.facet-group.facet-price > ul",
        "#instant-search-facets-container div.facet-group.facet-ratings > ul"
      ]
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
        "cards-product",
        "pagination"
      ],
      "defaultContent": []
    }
  ],
  "pageCleanup": {
    "https://commercemarketplace.adobe.com/extensions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/accounting-finance.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/accounting-finance/erp-accounting.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/extensions/accounting-finance/taxes.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/mobile.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/personalization-experience-management.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/product-content.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/rich-media.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/site-search-navigation.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/content-customizations/translations-localization.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/customer-support.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/customer-support/live-chat.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/advertising.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/crm.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/email-marketing.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/marketing-automation.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/marketing-automation-email-marketing/seo-sem.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security/checkout-enhancements.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security/fraud.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/payments-security/payment-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/reporting-analytics.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/comparison-shopping-engines.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/gifts.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/marketplace-feeds.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/point-of-service-pos.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/sales/rewards-loyalty.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/address-verification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/cross-border-fulfillment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/order-management-oms.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/shipping-fulfillment/warehouse-management-system.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/site-optimization.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/site-optimization/hosting.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/site-optimization/performance.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/extensions/site-optimization/site-monitoring.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themes.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ]
  }
};

const parsers = {
  'tag-list': tagListParser,
  'active-filter': activeFilterParser,
  'facet-filter': facetFilterParser,
  'price-filter': priceFilterParser,
  'results-toolbar': resultsToolbarParser,
  'cards-product': cardsProductParser,
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
