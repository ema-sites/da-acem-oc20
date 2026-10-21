/* eslint-disable */
/* global WebImporter */

import tagListParser from './parsers/tag-list.js';
import noticeParser from './parsers/notice.js';
import productBuyBoxParser from './parsers/product-buy-box.js';
import productDetailsParser from './parsers/product-details.js';
import commercemarketplaceCleanupTransformer from './transformers/commercemarketplace-cleanup.js';
import commercemarketplaceSectionsTransformer from './transformers/commercemarketplace-sections.js';

const PAGE_TEMPLATE = {
  "name": "extension-detail-notice",
  "urls": [
    "https://commercemarketplace.adobe.com/abeta-io-magento2.html",
    "https://commercemarketplace.adobe.com/aciworldwide-payment.html",
    "https://commercemarketplace.adobe.com/adyen-adyen-magento2-expresscheckout.html",
    "https://commercemarketplace.adobe.com/adyen-module-payment.html",
    "https://commercemarketplace.adobe.com/ae-allure-tech-llc-cartnxs.html",
    "https://commercemarketplace.adobe.com/ae-amasty-mass-order-actions.html",
    "https://commercemarketplace.adobe.com/ae-comwrap-reply-gmbh-kount-fraud-detection.html",
    "https://commercemarketplace.adobe.com/affirm-magento2.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-captcha-subscription.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-credit-limit-subscription.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-net30-subscription.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-nmi-subscription.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-onestepcheckout-subscription.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-passwordless-login-subscription.html",
    "https://commercemarketplace.adobe.com/aheadworks-module-sarp3.html",
    "https://commercemarketplace.adobe.com/airwallex-payments-plugin-magento.html",
    "https://commercemarketplace.adobe.com/aitoc-checkout-fields-manager.html",
    "https://commercemarketplace.adobe.com/aitoc-module-invoice-payment.html",
    "https://commercemarketplace.adobe.com/aitoc-payment-restrictions.html",
    "https://commercemarketplace.adobe.com/albaitconsulting-module-multiship-graphql.html",
    "https://commercemarketplace.adobe.com/albaitconsulting-module-partial-store-credit.html",
    "https://commercemarketplace.adobe.com/almapay-alma-monthlypayments-magento2.html",
    "https://commercemarketplace.adobe.com/amasty-google-accounts-login.html",
    "https://commercemarketplace.adobe.com/amasty-invisiblecaptcha.html",
    "https://commercemarketplace.adobe.com/amasty-method.html",
    "https://commercemarketplace.adobe.com/amasty-module-extra-fees.html",
    "https://commercemarketplace.adobe.com/amasty-module-securityauth.html",
    "https://commercemarketplace.adobe.com/amasty-one-step-checkout-pro.html",
    "https://commercemarketplace.adobe.com/amasty-payments-restriction.html",
    "https://commercemarketplace.adobe.com/amasty-subscriptions-and-recurring-payments.html",
    "https://commercemarketplace.adobe.com/amazonpaymentservices-module-fort.html",
    "https://commercemarketplace.adobe.com/amwalpay-magento2-payment.html",
    "https://commercemarketplace.adobe.com/amzn-amazon-pay-magento-2-module.html",
    "https://commercemarketplace.adobe.com/ananta-module-improvedcheckout.html",
    "https://commercemarketplace.adobe.com/antom-magento2.html",
    "https://commercemarketplace.adobe.com/aplazame-magento2.html",
    "https://commercemarketplace.adobe.com/appifycommerce-cookiefy.html",
    "https://commercemarketplace.adobe.com/apruvd-apruvd-fraud-protector.html",
    "https://commercemarketplace.adobe.com/apspayments-aps.html",
    "https://commercemarketplace.adobe.com/asaas-module-magento2.html",
    "https://commercemarketplace.adobe.com/ascure-module-restrictcustomerip.html",
    "https://commercemarketplace.adobe.com/auraspay-module-payment.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-authipay-payment.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-cardstreampayment.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-clover.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-lloydscardnetpayment.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-novunafinance.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-omnicapital.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-paynow.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-taylrpayment.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-tyl-by-natwest.html",
    "https://commercemarketplace.adobe.com/autifydigital-module-v12finance.html",
    "https://commercemarketplace.adobe.com/awesoft-module-maya-checkout.html",
    "https://commercemarketplace.adobe.com/azupay-payments.html",
    "https://commercemarketplace.adobe.com/bambora-module-payment-magento2.html",
    "https://commercemarketplace.adobe.com/beehexacorp-module-hexa-sync.html",
    "https://commercemarketplace.adobe.com/blackbird-monetico.html",
    "https://commercemarketplace.adobe.com/bluesnap-m2-module-payment.html",
    "https://commercemarketplace.adobe.com/bluetape-module-payment.html",
    "https://commercemarketplace.adobe.com/borica-payment.html",
    "https://commercemarketplace.adobe.com/bread-module-breadcheckout.html",
    "https://commercemarketplace.adobe.com/bridge-module-partialpayment.html",
    "https://commercemarketplace.adobe.com/bridgepay-bridge-module-magento2.html",
    "https://commercemarketplace.adobe.com/bsscommerce-module-one-step-checkout.html",
    "https://commercemarketplace.adobe.com/cardgate-magento2.html",
    "https://commercemarketplace.adobe.com/cardknox-cardknox.html",
    "https://commercemarketplace.adobe.com/cash-app-commerce-afterpay-for-adobe-commerce.html",
    "https://commercemarketplace.adobe.com/cash-app-commerce-clearpay-for-adobe-commerce.html",
    "https://commercemarketplace.adobe.com/chargeafter1-magento-extention.html",
    "https://commercemarketplace.adobe.com/checkoutcom-magento2.html",
    "https://commercemarketplace.adobe.com/chk-cashfree.html",
    "https://commercemarketplace.adobe.com/chk-magento-2-paytm-payment-method.html",
    "https://commercemarketplace.adobe.com/clearsale-integration.html",
    "https://commercemarketplace.adobe.com/codebrainbv-cashflows.html",
    "https://commercemarketplace.adobe.com/codebrainbv-omnikassapayment.html",
    "https://commercemarketplace.adobe.com/codedecorator-juspay-payment.html",
    "https://commercemarketplace.adobe.com/coinremitter-magento2.html",
    "https://commercemarketplace.adobe.com/coinspaid-extensions-payment.html",
    "https://commercemarketplace.adobe.com/cointopay-paymentgateway.html",
    "https://commercemarketplace.adobe.com/compunnel-otp-verification.html",
    "https://commercemarketplace.adobe.com/comviva-technology-payment-orchestration-platform.html",
    "https://commercemarketplace.adobe.com/conekta-conekta-payments.html",
    "https://commercemarketplace.adobe.com/corvus-pay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/creditkey-b2bgateway.html",
    "https://commercemarketplace.adobe.com/credova-module-financial.html",
    "https://commercemarketplace.adobe.com/cybersource-global-payment-management.html",
    "https://commercemarketplace.adobe.com/cybersource-module-payment.html",
    "https://commercemarketplace.adobe.com/cybersource-module-visa-acceptance-smb.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-couponcodehelper.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-icicipayment.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-paymentcharge.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-paymentrestrictions.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-paystackpayment.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-ravepayment.html",
    "https://commercemarketplace.adobe.com/cynoinfotech-worldpaypayment.html",
    "https://commercemarketplace.adobe.com/digitalfemsa-spin-payments.html",
    "https://commercemarketplace.adobe.com/dintero-hp.html",
    "https://commercemarketplace.adobe.com/easynolo-ecommercesella.html",
    "https://commercemarketplace.adobe.com/ebizcharge-ebizcharge.html",
    "https://commercemarketplace.adobe.com/ebizmarts-sagepaysuite.html",
    "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-otp.html",
    "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-stripe-payment.html",
    "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-wallet-system.html",
    "https://commercemarketplace.adobe.com/ecommet-customer-group-payment-restriction.html",
    "https://commercemarketplace.adobe.com/ecommpay-module-payments.html",
    "https://commercemarketplace.adobe.com/ecomplugins-frauddetection.html",
    "https://commercemarketplace.adobe.com/ecopay-mkpayment.html",
    "https://commercemarketplace.adobe.com/ecrypt-payment-gateway.html",
    "https://commercemarketplace.adobe.com/edifference-in3-onsite-messaging.html",
    "https://commercemarketplace.adobe.com/elsnertech-accept-blue.html",
    "https://commercemarketplace.adobe.com/elsnertech-module-multicurrency.html",
    "https://commercemarketplace.adobe.com/elsnertech-module-paytrace.html",
    "https://commercemarketplace.adobe.com/emerchantpay-magento2-emp-plugin.html",
    "https://commercemarketplace.adobe.com/emmo-checkout-custom-fields.html",
    "https://commercemarketplace.adobe.com/emvigo-extensions-custompin.html",
    "https://commercemarketplace.adobe.com/emvigo-extensions-extra-fee.html",
    "https://commercemarketplace.adobe.com/equinox-userblock.html",
    "https://commercemarketplace.adobe.com/eshopworld-module-checkout.html",
    "https://commercemarketplace.adobe.com/etechflow-module-pos.html",
    "https://commercemarketplace.adobe.com/eway-eway-rapid-magento2.html",
    "https://commercemarketplace.adobe.com/extensionmagic-magento2-altcha.html",
    "https://commercemarketplace.adobe.com/eye4fraud-connector.html",
    "https://commercemarketplace.adobe.com/fero-fero-smart-checkout.html",
    "https://commercemarketplace.adobe.com/fintecture-payment.html",
    "https://commercemarketplace.adobe.com/fiserv-ipg-checkout.html",
    "https://commercemarketplace.adobe.com/floa-payment.html",
    "https://commercemarketplace.adobe.com/fme-checkout-order-attributes-fields.html",
    "https://commercemarketplace.adobe.com/fme-custom-messages.html",
    "https://commercemarketplace.adobe.com/fme-extended-mini-cart.html",
    "https://commercemarketplace.adobe.com/fme-fakeregistration.html",
    "https://commercemarketplace.adobe.com/fme-layaway.html",
    "https://commercemarketplace.adobe.com/fme-moa.html",
    "https://commercemarketplace.adobe.com/fme-otp-login-and-verification.html",
    "https://commercemarketplace.adobe.com/fme-price-by-customer-group.html",
    "https://commercemarketplace.adobe.com/fme-restrict-payment-method.html",
    "https://commercemarketplace.adobe.com/fme-store-pickup.html",
    "https://commercemarketplace.adobe.com/fme-subscription.html",
    "https://commercemarketplace.adobe.com/forter-magento2-module-forter.html",
    "https://commercemarketplace.adobe.com/fortispay-magento-2-payment-gateway.html",
    "https://commercemarketplace.adobe.com/fraudlogix-module-core.html",
    "https://commercemarketplace.adobe.com/freedompay-payment.html",
    "https://commercemarketplace.adobe.com/friendly-captcha-magento2-friendly-captcha.html",
    "https://commercemarketplace.adobe.com/fs20studio-module-extra-fee.html",
    "https://commercemarketplace.adobe.com/grafeco-network-instantpay.html",
    "https://commercemarketplace.adobe.com/greenwing-technology-module-puchout.html",
    "https://commercemarketplace.adobe.com/greenworld-magento2-module-general.html",
    "https://commercemarketplace.adobe.com/harriswebworks-harriswebworks-addressautofill.html",
    "https://commercemarketplace.adobe.com/hbl-module-hbl-payment-gateway.html",
    "https://commercemarketplace.adobe.com/hepsipay-payment.html",
    "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabspro.html",
    "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabsprosmsverification.html",
    "https://commercemarketplace.adobe.com/humm-payment-module-humm-payment-gateway.html",
    "https://commercemarketplace.adobe.com/hutko-module-hutko.html",
    "https://commercemarketplace.adobe.com/idenfy-module-customer-verification.html",
    "https://commercemarketplace.adobe.com/improntus-module-astropay.html",
    "https://commercemarketplace.adobe.com/improntus-module-klap.html",
    "https://commercemarketplace.adobe.com/improntus-module-mach-pay.html",
    "https://commercemarketplace.adobe.com/improntus-module-powerpay.html",
    "https://commercemarketplace.adobe.com/improntus-module-prontopaga.html",
    "https://commercemarketplace.adobe.com/iplusservice-xpay.html",
    "https://commercemarketplace.adobe.com/isapp-m2-honeypot.html",
    "https://commercemarketplace.adobe.com/itegration-module-simplepay.html",
    "https://commercemarketplace.adobe.com/iwd-dominate-saas.html",
    "https://commercemarketplace.adobe.com/jifiti-module-payment.html",
    "https://commercemarketplace.adobe.com/jscriptz-module-checkout-enterprise.html",
    "https://commercemarketplace.adobe.com/jscriptz-module-checkout-pro.html",
    "https://commercemarketplace.adobe.com/jscriptz-module-checkout.html",
    "https://commercemarketplace.adobe.com/jscriptz-module-sociallogin.html",
    "https://commercemarketplace.adobe.com/jugaad-module-payment-gateway.html",
    "https://commercemarketplace.adobe.com/katapult-module-katapult-gateway.html",
    "https://commercemarketplace.adobe.com/keyone-verwaltungs-gmbh-fast-checkout.html",
    "https://commercemarketplace.adobe.com/klarna-m2-klarna.html",
    "https://commercemarketplace.adobe.com/klizer-module-taxbycity.html",
    "https://commercemarketplace.adobe.com/komoju-payments.html",
    "https://commercemarketplace.adobe.com/kount-magento2-kount.html",
    "https://commercemarketplace.adobe.com/kount-magento2-kount360.html",
    "https://commercemarketplace.adobe.com/kustom-module-checkout.html",
    "https://commercemarketplace.adobe.com/layup-technologies-module-layup.html",
    "https://commercemarketplace.adobe.com/lemonway-payment.html",
    "https://commercemarketplace.adobe.com/linked2pay-magento2-payments.html",
    "https://commercemarketplace.adobe.com/ltc-komfortkasse.html",
    "https://commercemarketplace.adobe.com/madit-paypal-graphql.html",
    "https://commercemarketplace.adobe.com/madit-sips2.html",
    "https://commercemarketplace.adobe.com/madit-stripeql.html",
    "https://commercemarketplace.adobe.com/mage-delight-authorizecim-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-cybersource-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-firstdata-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-giftwrapper-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-orderbysku-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-payment-restriction-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-shippingrestrict-module.html",
    "https://commercemarketplace.adobe.com/mage-delight-wiretransfer-module.html",
    "https://commercemarketplace.adobe.com/mage2-au-module-swish-pay.html",
    "https://commercemarketplace.adobe.com/mage2expert-module-int-telephone.html",
    "https://commercemarketplace.adobe.com/mage2expert-module-limit-cart.html",
    "https://commercemarketplace.adobe.com/mage2expert-module-payment-surcharge.html",
    "https://commercemarketplace.adobe.com/mage2expert-module-quick-order.html",
    "https://commercemarketplace.adobe.com/mageants-module-googlerecaptcha.html",
    "https://commercemarketplace.adobe.com/mageants-module-paymentrestriction.html",
    "https://commercemarketplace.adobe.com/mageants-module-securitysuite.html",
    "https://commercemarketplace.adobe.com/mageants-storecredit.html",
    "https://commercemarketplace.adobe.com/magearray-checkoutsignup.html",
    "https://commercemarketplace.adobe.com/magearray-customeractivation.html",
    "https://commercemarketplace.adobe.com/magearray-extrafees.html",
    "https://commercemarketplace.adobe.com/magearray-orderattachments.html",
    "https://commercemarketplace.adobe.com/magearray-ordercomment.html",
    "https://commercemarketplace.adobe.com/magebees-module-onepagecheckout.html",
    "https://commercemarketplace.adobe.com/magecan-module-moneris.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-alipay-cross-border.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-axisbank-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-extra-fee.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-per-product-category.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-ccavenue.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-clave-payment.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-cod-verification.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-coupon-code-link.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-ebs-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-edge-express-payment.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-email-quote.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fee-pro.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fees.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-first-data-icici-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-gst-india.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-hcaptcha-integration.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-hdfc-bank-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-icici-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-international-telephone-input.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-invisible-google-recaptcha.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-juspay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-minimum-order-fees.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-multiple-shipping-flat-rates.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-one-step-checkout.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-product-surcharge-additional-fee.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-proxy-pay-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-razorpay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-restrict-cod.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-save-cart-and-buy-later.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-sbi-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-shipping-and-payment-by-customer-groups.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-square-payments.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-sticky-add-to-cart.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-store-credit-refund.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-ubi-payment-gateway.html",
    "https://commercemarketplace.adobe.com/magecomp-magento-2-wepay-payment.html",
    "https://commercemarketplace.adobe.com/magecurious-magento-2-coupenlist.html",
    "https://commercemarketplace.adobe.com/magecurious-magento-2-onepagecheckout.html",
    "https://commercemarketplace.adobe.com/magecurious-magento-2-paymentfee.html",
    "https://commercemarketplace.adobe.com/magecurious-magento-2-phonepe.html",
    "https://commercemarketplace.adobe.com/magecurious-magento-2-unipaas.html",
    "https://commercemarketplace.adobe.com/magehqm2-module-one-step-checkout.html",
    "https://commercemarketplace.adobe.com/magemaclean-mage2-offlinepaymentscontrol.html",
    "https://commercemarketplace.adobe.com/magenable-module-quickorder.html",
    "https://commercemarketplace.adobe.com/magento-payment-services.html",
    "https://commercemarketplace.adobe.com/mageplaza-magento-2-one-step-checkout-extension-mkp.html",
    "https://commercemarketplace.adobe.com/magerocket-module-gocuotas.html",
    "https://commercemarketplace.adobe.com/mageside-backup-to-dropbox.html",
    "https://commercemarketplace.adobe.com/mageside-paypal-invoices.html",
    "https://commercemarketplace.adobe.com/mageworx-module-checkoutsuite.html",
    "https://commercemarketplace.adobe.com/magezon-module-admin-payment-method.html",
    "https://commercemarketplace.adobe.com/magezon-module-elavon-converge-payment.html",
    "https://commercemarketplace.adobe.com/makecommerce-module-ecommerce.html",
    "https://commercemarketplace.adobe.com/mango-loworderfee.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-anz-egate-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-bambora-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-bluesnap-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-braintree-multi-currency.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-c2b-mpesa-via-openapiportal.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-ccavenue-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-cloud-backup.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-cybersource-secure-acceptance-hosted-checkout.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-digicel-moncash-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-emis-online-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-extra-fee.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-first-data-payeezy-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-freecharge-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-gocardless-instant-bank-pay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchant-warrior-payframe-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchantwarrior-direct-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-myuser-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-nmi-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-opayo-direct-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-orange-money-web-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-partial-payment-layaway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-pay-with-specta.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-connect.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-exchange-virtual-desktop.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-payeezy-first-data-global-gateway-e4.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfi-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfonte-integration.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-account-per-customer-group.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-website-payments-pro.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paytrace-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-phonepe-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-pin-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-direct-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-hosted-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-quickbooks-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-securepay-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-stripe-becs-direct-debit.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-surcharge-fee.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-tap-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-unitel-money.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-wallet.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-westpac-payway-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-worldpay-business.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay-hong-kong-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-easy-pay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payments-via-juspay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-billdesk-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-c2b-mpesa-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-direct-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-hosted-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cashfree-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cbk-payments.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-eway-recurring-and-subscriptions.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-google-invisible-recaptcha.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-icici-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-juspay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-knet-payments-integration.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-lipa-na-mpesa-payment.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-momo-api.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-qosic.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-momo-pay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-pay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-oab-ipay.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-payments-cameroon.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-senegal.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-order-verification.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-paybox-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-fee.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-restrictions.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-paystack-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-proxypay-integration.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-rave-payment-gateway.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-restrict-fake-registration.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-sage-pay-form.html",
    "https://commercemarketplace.adobe.com/meetanshi-magento2-worldpay-secure-acceptance-hosted-checkout.html",
    "https://commercemarketplace.adobe.com/meetanshi-module-payshiprestriction.html",
    "https://commercemarketplace.adobe.com/mercadopago-adb-payment.html",
    "https://commercemarketplace.adobe.com/merchantesolutions-module-gateway.html",
    "https://commercemarketplace.adobe.com/milople-accountverification.html",
    "https://commercemarketplace.adobe.com/milople-depositpayment.html",
    "https://commercemarketplace.adobe.com/milople-module-extrafeexp.html",
    "https://commercemarketplace.adobe.com/milople-recurringandsubscriptionpayments.html",
    "https://commercemarketplace.adobe.com/milople-restricpaymentmethod.html",
    "https://commercemarketplace.adobe.com/milople-security.html",
    "https://commercemarketplace.adobe.com/milople-vatexempt.html",
    "https://commercemarketplace.adobe.com/miniorange-inc-miniorange-2fa.html",
    "https://commercemarketplace.adobe.com/mollie-magento2.html",
    "https://commercemarketplace.adobe.com/monei-module-monei-payment.html",
    "https://commercemarketplace.adobe.com/moneyspace-payment.html",
    "https://commercemarketplace.adobe.com/monripayments-magento2.html",
    "https://commercemarketplace.adobe.com/moogento-m2-nomorespam.html",
    "https://commercemarketplace.adobe.com/moogento-m2-nomorespampro.html",
    "https://commercemarketplace.adobe.com/mr-quadpay.html",
    "https://commercemarketplace.adobe.com/msp-concepts-checkoutcustomfield.html",
    "https://commercemarketplace.adobe.com/msp-concepts-extra-fee.html",
    "https://commercemarketplace.adobe.com/msp-concepts-module-one-step-checkout.html",
    "https://commercemarketplace.adobe.com/msp-concepts-securityauth.html",
    "https://commercemarketplace.adobe.com/msts-trevipay-magento.html",
    "https://commercemarketplace.adobe.com/multisafepay-magento2.html",
    "https://commercemarketplace.adobe.com/networkinternational-ngenius.html",
    "https://commercemarketplace.adobe.com/nexi-checkout-adobe-commerce-checkout.html",
    "https://commercemarketplace.adobe.com/ninebits-customer-security.html",
    "https://commercemarketplace.adobe.com/novalnet-module-payment.html",
    "https://commercemarketplace.adobe.com/oceanpayment-alipay.html",
    "https://commercemarketplace.adobe.com/oceanpayment-alipayhk.html",
    "https://commercemarketplace.adobe.com/oceanpayment-creditcard.html",
    "https://commercemarketplace.adobe.com/oceanpayment-fps.html",
    "https://commercemarketplace.adobe.com/oceanpayment-klarna.html",
    "https://commercemarketplace.adobe.com/oceanpayment-module-applepay.html",
    "https://commercemarketplace.adobe.com/oceanpayment-module-googlepay.html",
    "https://commercemarketplace.adobe.com/oceanpayment-union.html",
    "https://commercemarketplace.adobe.com/oceanpayment-wechat.html",
    "https://commercemarketplace.adobe.com/oceanpayment-yunshanfuapp.html",
    "https://commercemarketplace.adobe.com/oginnovation-casheercheckout.html",
    "https://commercemarketplace.adobe.com/onetree-module-crediviva-payment.html",
    "https://commercemarketplace.adobe.com/onetree-module-yappy-payment.html",
    "https://commercemarketplace.adobe.com/orangemantra-module-mobile-otp.html",
    "https://commercemarketplace.adobe.com/ozowpayments-ozow.html",
    "https://commercemarketplace.adobe.com/paghiper-module-magento2.html",
    "https://commercemarketplace.adobe.com/paradoxlabs-authnetcim.html",
    "https://commercemarketplace.adobe.com/paradoxlabs-carat.html",
    "https://commercemarketplace.adobe.com/paradoxlabs-clover.html",
    "https://commercemarketplace.adobe.com/paradoxlabs-cybersource.html",
    "https://commercemarketplace.adobe.com/paradoxlabs-stripe.html",
    "https://commercemarketplace.adobe.com/paradoxlabs-subscriptions.html",
    "https://commercemarketplace.adobe.com/payabl-payabl-payments.html",
    "https://commercemarketplace.adobe.com/paydibs-module-paymentgateway.html",
    "https://commercemarketplace.adobe.com/paydock-magento2-powerboard.html",
    "https://commercemarketplace.adobe.com/payever-magento2-hsbc-payments.html",
    "https://commercemarketplace.adobe.com/payever-magento2-payments.html",
    "https://commercemarketplace.adobe.com/payever-magento2-zinia-payments.html",
    "https://commercemarketplace.adobe.com/payitmonthly-module-payment-gateway.html",
    "https://commercemarketplace.adobe.com/paymaya-philippines-paymaya-payment.html",
    "https://commercemarketplace.adobe.com/paymob-magento-payment.html",
    "https://commercemarketplace.adobe.com/paynl-ingcheckout.html",
    "https://commercemarketplace.adobe.com/paynl-magento2-plugin.html",
    "https://commercemarketplace.adobe.com/paypal-module-fastlane.html",
    "https://commercemarketplace.adobe.com/paypal-module-ppcp.html",
    "https://commercemarketplace.adobe.com/paypal-module-subscription.html",
    "https://commercemarketplace.adobe.com/paypercut-module-payment.html",
    "https://commercemarketplace.adobe.com/payplug-payplug-magento2.html",
    "https://commercemarketplace.adobe.com/payserauk-magento2-paysera-module.html",
    "https://commercemarketplace.adobe.com/paystand-paystandmagento.html",
    "https://commercemarketplace.adobe.com/paytomorrow-paytomorrow.html",
    "https://commercemarketplace.adobe.com/paytr-magento2-banktransfer.html",
    "https://commercemarketplace.adobe.com/paytr-magento2-payment.html",
    "https://commercemarketplace.adobe.com/paytrail-paytrail-for-adobe-commerce.html",
    "https://commercemarketplace.adobe.com/payware-mobile-payments-magento.html",
    "https://commercemarketplace.adobe.com/pennies-charity.html",
    "https://commercemarketplace.adobe.com/php4u-module-magicloginlink.html",
    "https://commercemarketplace.adobe.com/pits-additional-fee.html",
    "https://commercemarketplace.adobe.com/pits-datatranspayment.html",
    "https://commercemarketplace.adobe.com/pixxles-payment-gateway.html",
    "https://commercemarketplace.adobe.com/pl-epn.html",
    "https://commercemarketplace.adobe.com/pl-etisalat.html",
    "https://commercemarketplace.adobe.com/pl-nmi.html",
    "https://commercemarketplace.adobe.com/pl-qpay.html",
    "https://commercemarketplace.adobe.com/plationline-plationline.html",
    "https://commercemarketplace.adobe.com/plugin-partner-activation-cart.html",
    "https://commercemarketplace.adobe.com/plugin-partner-auto-invoice-generate.html",
    "https://commercemarketplace.adobe.com/plugin-partner-offline-payments.html",
    "https://commercemarketplace.adobe.com/plumrocket-checkout-success-page.html",
    "https://commercemarketplace.adobe.com/posteitaliane-module-sia.html",
    "https://commercemarketplace.adobe.com/precisionpay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/pronko-authorizenet.html",
    "https://commercemarketplace.adobe.com/pronko-module-realex-html.html",
    "https://commercemarketplace.adobe.com/prowebconcepts-module-frontend-two-factor-auth.html",
    "https://commercemarketplace.adobe.com/przelewy24-magento2-przelewy24.html",
    "https://commercemarketplace.adobe.com/pstk-paystack-magento2-module.html",
    "https://commercemarketplace.adobe.com/punchout2go-module-punchout.html",
    "https://commercemarketplace.adobe.com/pure-mashiro-module-payment-restrictions.html",
    "https://commercemarketplace.adobe.com/px-payments.html",
    "https://commercemarketplace.adobe.com/realexpayments-module-payment-gateway.html",
    "https://commercemarketplace.adobe.com/reepay-payment-billwerk-plus-subscription.html",
    "https://commercemarketplace.adobe.com/reepay-payment-reepay.html",
    "https://commercemarketplace.adobe.com/resolve-magento2.html",
    "https://commercemarketplace.adobe.com/resursbank-magento-all.html",
    "https://commercemarketplace.adobe.com/revolut-module-payment.html",
    "https://commercemarketplace.adobe.com/ricardomartins-pagbank-magento2.html",
    "https://commercemarketplace.adobe.com/rootways-bamboratoken.html",
    "https://commercemarketplace.adobe.com/rootways-cardconnect.html",
    "https://commercemarketplace.adobe.com/rootways-elavon.html",
    "https://commercemarketplace.adobe.com/rootways-module-authorizecim.html",
    "https://commercemarketplace.adobe.com/rootways-module-authorizenetcim.html",
    "https://commercemarketplace.adobe.com/rootways-module-nmi.html",
    "https://commercemarketplace.adobe.com/rootways-module-usaepay.html",
    "https://commercemarketplace.adobe.com/rootways-moneris.html",
    "https://commercemarketplace.adobe.com/saferpay-package.html",
    "https://commercemarketplace.adobe.com/sanjay-module-anti-cosmic-sting.html",
    "https://commercemarketplace.adobe.com/sapient-module-worldpay.html",
    "https://commercemarketplace.adobe.com/satispay-magento2-plugin.html",
    "https://commercemarketplace.adobe.com/scommerce-m2-handlingfee.html",
    "https://commercemarketplace.adobe.com/scommerce-m2-surcharge.html",
    "https://commercemarketplace.adobe.com/seoulwebdesign-kakaopay.html",
    "https://commercemarketplace.adobe.com/sezzle-sezzlepay.html",
    "https://commercemarketplace.adobe.com/shiprocket-module-checkout.html",
    "https://commercemarketplace.adobe.com/sift-module-payment-protection.html",
    "https://commercemarketplace.adobe.com/signifyd-module-connect.html",
    "https://commercemarketplace.adobe.com/sistemapay-module-plazox.html",
    "https://commercemarketplace.adobe.com/sixtomartin-onelogin-module-saml2-extend.html",
    "https://commercemarketplace.adobe.com/skipify-skipifycheckout.html",
    "https://commercemarketplace.adobe.com/skrill-skrill.html",
    "https://commercemarketplace.adobe.com/snap-finance-payment.html",
    "https://commercemarketplace.adobe.com/snap-finance-uk-payment.html",
    "https://commercemarketplace.adobe.com/snapfinance-payment.html",
    "https://commercemarketplace.adobe.com/sparsh-magento-2-gdpr-extension.html",
    "https://commercemarketplace.adobe.com/sparsh-magento-2-smtp-extension.html",
    "https://commercemarketplace.adobe.com/splitit-module-payment-gateway.html",
    "https://commercemarketplace.adobe.com/square-module-squareup-omni.html",
    "https://commercemarketplace.adobe.com/startbutton-module-sbgateway.html",
    "https://commercemarketplace.adobe.com/stich-tech-module-sepa-qr-payment.html",
    "https://commercemarketplace.adobe.com/storetown-media-module-onepagecheckout.html",
    "https://commercemarketplace.adobe.com/stripe-stripe-payments.html",
    "https://commercemarketplace.adobe.com/subscriptionflow-app-module-setting.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipay.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipaycross.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipayhk.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipayopen.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-fachostedpage.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-powertranz.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-unionpay.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayb2b.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayintl.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-wechat.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-wechathk.html",
    "https://commercemarketplace.adobe.com/sunflowerbiz-wechatoversea.html",
    "https://commercemarketplace.adobe.com/superpayments-superpayment.html",
    "https://commercemarketplace.adobe.com/swapped-module-pay-crypto.html",
    "https://commercemarketplace.adobe.com/swissup-address-autocomplete.html",
    "https://commercemarketplace.adobe.com/swissup-akismet.html",
    "https://commercemarketplace.adobe.com/swissup-firecheckout.html",
    "https://commercemarketplace.adobe.com/swissup-product-address-field-manager.html",
    "https://commercemarketplace.adobe.com/switro-cryptopayments.html",
    "https://commercemarketplace.adobe.com/synchrony-digital-buy-magento2-module.html",
    "https://commercemarketplace.adobe.com/syncpayments-module-payments.html",
    "https://commercemarketplace.adobe.com/syspay-module-payment.html",
    "https://commercemarketplace.adobe.com/tabby-m2-payments.html",
    "https://commercemarketplace.adobe.com/talypay-talypays.html",
    "https://commercemarketplace.adobe.com/tatrabanka-paymentgateway.html",
    "https://commercemarketplace.adobe.com/tech9logy-indian-gst.html",
    "https://commercemarketplace.adobe.com/tech9logy-module-admin-order-payments.html",
    "https://commercemarketplace.adobe.com/test-input-onclick-alert-document-domain-svg-onload-alert-1",
    "https://commercemarketplace.adobe.com/themagearmy-module-intltelinput-subscription.html",
    "https://commercemarketplace.adobe.com/themagearmy-module-restrict-fake-registration.html",
    "https://commercemarketplace.adobe.com/tigrensolutions-module-split-cart.html",
    "https://commercemarketplace.adobe.com/tngdigital-payment.html",
    "https://commercemarketplace.adobe.com/toogas-reduniq-payments.html",
    "https://commercemarketplace.adobe.com/trust-payments-limited-module-trust.html",
    "https://commercemarketplace.adobe.com/tryspeed-magento-payment-plugin.html",
    "https://commercemarketplace.adobe.com/ulmod-ordercomment.html",
    "https://commercemarketplace.adobe.com/valorpaytech-plugin-magento.html",
    "https://commercemarketplace.adobe.com/vdcstore-magento2-ageverification.html",
    "https://commercemarketplace.adobe.com/vdcstore-magento2-outofstock.html",
    "https://commercemarketplace.adobe.com/vdcstore-module-gdpr.html",
    "https://commercemarketplace.adobe.com/vdcstore-razorpay-google-subscriptions.html",
    "https://commercemarketplace.adobe.com/versapay-versapay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/viabillhq-module-payment.html",
    "https://commercemarketplace.adobe.com/waffy-module-payment.html",
    "https://commercemarketplace.adobe.com/wagento-module-subscription.html",
    "https://commercemarketplace.adobe.com/webkul-2fa.html",
    "https://commercemarketplace.adobe.com/webkul-digipin.html",
    "https://commercemarketplace.adobe.com/webkul-dlocal-payment.html",
    "https://commercemarketplace.adobe.com/webkul-iyzico-payment.html",
    "https://commercemarketplace.adobe.com/webkul-mangopay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/webkul-marketplace-mangopay-payment-gateway.html",
    "https://commercemarketplace.adobe.com/webkul-marketplace-stripe-payment-gateway.html",
    "https://commercemarketplace.adobe.com/webkul-module-cybersource.html",
    "https://commercemarketplace.adobe.com/webkul-module-excessive-attempt-lock.html",
    "https://commercemarketplace.adobe.com/webkul-module-mpcashondelivery.html",
    "https://commercemarketplace.adobe.com/webkul-module-order-approval.html",
    "https://commercemarketplace.adobe.com/webkul-module-partial-payment-emi.html",
    "https://commercemarketplace.adobe.com/webkul-module-quick-order.html",
    "https://commercemarketplace.adobe.com/webkul-module-razorpay-magic-checkout.html",
    "https://commercemarketplace.adobe.com/webkul-module-recurring.html",
    "https://commercemarketplace.adobe.com/webkul-module-sagepay.html",
    "https://commercemarketplace.adobe.com/webkul-module-squareup.html",
    "https://commercemarketplace.adobe.com/webkul-module-telrpayment.html",
    "https://commercemarketplace.adobe.com/webkul-module-verifactu.html",
    "https://commercemarketplace.adobe.com/webkul-module-walletsystem.html",
    "https://commercemarketplace.adobe.com/webkul-one-step-checkout.html",
    "https://commercemarketplace.adobe.com/webkul-otp.html",
    "https://commercemarketplace.adobe.com/webkul-payment-shipping-by-customer-group.html",
    "https://commercemarketplace.adobe.com/webkul-phonepe.html",
    "https://commercemarketplace.adobe.com/webkul-recurring-plans-for-discount.html",
    "https://commercemarketplace.adobe.com/webkul-stripe.html",
    "https://commercemarketplace.adobe.com/webkul-vendor-customer-data-mask.html",
    "https://commercemarketplace.adobe.com/weblytic-wblrecaptcha.html",
    "https://commercemarketplace.adobe.com/weblytic-wblstripepaylater.html",
    "https://commercemarketplace.adobe.com/weblytic-wblstripepaymentgateway.html",
    "https://commercemarketplace.adobe.com/weblytic-wblwallet.html",
    "https://commercemarketplace.adobe.com/webmaster-ramos-module-checkout-tax-id.html",
    "https://commercemarketplace.adobe.com/wink-module-checkout.html",
    "https://commercemarketplace.adobe.com/wisenetic-magento-2-buy-now.html",
    "https://commercemarketplace.adobe.com/wisenetic-magento-2-order-attributes.html",
    "https://commercemarketplace.adobe.com/wisenetic-magento-2-payment-per-customer-group.html",
    "https://commercemarketplace.adobe.com/wizit-wizit.html",
    "https://commercemarketplace.adobe.com/wolfpaw-antifraud-module-antifraud.html",
    "https://commercemarketplace.adobe.com/woom-module-paycek.html",
    "https://commercemarketplace.adobe.com/woom-module-payway.html",
    "https://commercemarketplace.adobe.com/woom-module-wspay.html",
    "https://commercemarketplace.adobe.com/worldline-module-magento-payment.html",
    "https://commercemarketplace.adobe.com/wyomind-pickupatstore-meta.html",
    "https://commercemarketplace.adobe.com/xendit-m2invoice.html",
    "https://commercemarketplace.adobe.com/zip-magento2.html",
    "https://commercemarketplace.adobe.com/zymion-module-payment-restrictions.html"
  ],
  "description": "Product detail page like extension-detail but opening with a full-width notice banner above the product title and buy box",
  "blocks": [
    {
      "name": "tag-list",
      "instances": [
        "#maincontent .column.main > div.breadcrumbs:has(li)"
      ]
    },
    {
      "name": "notice",
      "instances": [
        "#maincontent .product-info-details-container > div:nth-child(1)"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/abeta-io-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aciworldwide-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/adyen-adyen-magento2-expresscheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/adyen-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ae-allure-tech-llc-cartnxs.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ae-amasty-mass-order-actions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ae-comwrap-reply-gmbh-kount-fraud-detection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/affirm-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-captcha-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-credit-limit-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-net30-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-nmi-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-onestepcheckout-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-passwordless-login-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-sarp3.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/airwallex-payments-plugin-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-checkout-fields-manager.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-module-invoice-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/albaitconsulting-module-multiship-graphql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/albaitconsulting-module-partial-store-credit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/almapay-alma-monthlypayments-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-google-accounts-login.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-invisiblecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-module-extra-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-module-securityauth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-one-step-checkout-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-payments-restriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amasty-subscriptions-and-recurring-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amazonpaymentservices-module-fort.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amwalpay-magento2-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/amzn-amazon-pay-magento-2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ananta-module-improvedcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/antom-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/aplazame-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/appifycommerce-cookiefy.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/apruvd-apruvd-fraud-protector.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/apspayments-aps.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/asaas-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ascure-module-restrictcustomerip.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/auraspay-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-authipay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-cardstreampayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-clover.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-lloydscardnetpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-novunafinance.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-omnicapital.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-paynow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-taylrpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-tyl-by-natwest.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-v12finance.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/awesoft-module-maya-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/azupay-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bambora-module-payment-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/beehexacorp-module-hexa-sync.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/blackbird-monetico.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bluesnap-m2-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bluetape-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/borica-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bread-module-breadcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bridge-module-partialpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bridgepay-bridge-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/bsscommerce-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cardgate-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cardknox-cardknox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cash-app-commerce-afterpay-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cash-app-commerce-clearpay-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/chargeafter1-magento-extention.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/checkoutcom-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/chk-cashfree.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/chk-magento-2-paytm-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/clearsale-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/codebrainbv-cashflows.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/codebrainbv-omnikassapayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/codedecorator-juspay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/coinremitter-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/coinspaid-extensions-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cointopay-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/compunnel-otp-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/comviva-technology-payment-orchestration-platform.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/conekta-conekta-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/corvus-pay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/creditkey-b2bgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/credova-module-financial.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-global-payment-management.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-module-visa-acceptance-smb.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-couponcodehelper.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-icicipayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paymentcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paymentrestrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paystackpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-ravepayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-worldpaypayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/digitalfemsa-spin-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/dintero-hp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/easynolo-ecommercesella.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ebizcharge-ebizcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ebizmarts-sagepaysuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-stripe-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-wallet-system.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecommet-customer-group-payment-restriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecommpay-module-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecomplugins-frauddetection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecopay-mkpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ecrypt-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/edifference-in3-onsite-messaging.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-accept-blue.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-module-multicurrency.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-module-paytrace.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/emerchantpay-magento2-emp-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/emmo-checkout-custom-fields.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/emvigo-extensions-custompin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/emvigo-extensions-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/equinox-userblock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/eshopworld-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/etechflow-module-pos.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/eway-eway-rapid-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/extensionmagic-magento2-altcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/eye4fraud-connector.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fero-fero-smart-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fintecture-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fiserv-ipg-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/floa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-checkout-order-attributes-fields.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-custom-messages.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-extended-mini-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-fakeregistration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-layaway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-moa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-otp-login-and-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-price-by-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-restrict-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-store-pickup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fme-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/forter-magento2-module-forter.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fortispay-magento-2-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fraudlogix-module-core.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/freedompay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/friendly-captcha-magento2-friendly-captcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/fs20studio-module-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/grafeco-network-instantpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/greenwing-technology-module-puchout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/greenworld-magento2-module-general.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/harriswebworks-harriswebworks-addressautofill.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/hbl-module-hbl-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/hepsipay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabspro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabsprosmsverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/humm-payment-module-humm-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/hutko-module-hutko.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/idenfy-module-customer-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-astropay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-klap.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-mach-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-powerpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-prontopaga.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/iplusservice-xpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/isapp-m2-honeypot.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/itegration-module-simplepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/iwd-dominate-saas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/jifiti-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout-enterprise.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-sociallogin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/jugaad-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/katapult-module-katapult-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/keyone-verwaltungs-gmbh-fast-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/klarna-m2-klarna.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/klizer-module-taxbycity.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/komoju-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/kount-magento2-kount.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/kount-magento2-kount360.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/kustom-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/layup-technologies-module-layup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/lemonway-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/linked2pay-magento2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ltc-komfortkasse.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/madit-paypal-graphql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/madit-sips2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/madit-stripeql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-authorizecim-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-cybersource-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-firstdata-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-giftwrapper-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-orderbysku-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-payment-restriction-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-shippingrestrict-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-wiretransfer-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage2-au-module-swish-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-int-telephone.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-limit-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-payment-surcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-quick-order.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-googlerecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-paymentrestriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-securitysuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageants-storecredit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magearray-checkoutsignup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magearray-customeractivation.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magearray-extrafees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magearray-orderattachments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magearray-ordercomment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magebees-module-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecan-module-moneris.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-alipay-cross-border.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-axisbank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-per-product-category.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ccavenue.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-clave-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cod-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-coupon-code-link.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ebs-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-edge-express-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-email-quote.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fee-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-first-data-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-gst-india.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-hcaptcha-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-hdfc-bank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-international-telephone-input.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-invisible-google-recaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-juspay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-minimum-order-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-multiple-shipping-flat-rates.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-product-surcharge-additional-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-proxy-pay-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-razorpay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-restrict-cod.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-save-cart-and-buy-later.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-sbi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-shipping-and-payment-by-customer-groups.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-square-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-sticky-add-to-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-store-credit-refund.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ubi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-wepay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-coupenlist.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-paymentfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-phonepe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-unipaas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magehqm2-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magemaclean-mage2-offlinepaymentscontrol.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magenable-module-quickorder.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magento-payment-services.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageplaza-magento-2-one-step-checkout-extension-mkp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magerocket-module-gocuotas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageside-backup-to-dropbox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageside-paypal-invoices.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mageworx-module-checkoutsuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magezon-module-admin-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/magezon-module-elavon-converge-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/makecommerce-module-ecommerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mango-loworderfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-anz-egate-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-bambora-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-bluesnap-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-braintree-multi-currency.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-c2b-mpesa-via-openapiportal.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-ccavenue-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-cloud-backup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-cybersource-secure-acceptance-hosted-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-digicel-moncash-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-emis-online-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-first-data-payeezy-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-freecharge-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-gocardless-instant-bank-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchant-warrior-payframe-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchantwarrior-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-myuser-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-nmi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-opayo-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-orange-money-web-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-partial-payment-layaway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-pay-with-specta.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-connect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-exchange-virtual-desktop.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payeezy-first-data-global-gateway-e4.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfi-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfonte-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-account-per-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-website-payments-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paytrace-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-phonepe-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-pin-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-hosted-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-quickbooks-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-securepay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-stripe-becs-direct-debit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-surcharge-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-tap-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-unitel-money.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-wallet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-westpac-payway-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-worldpay-business.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay-hong-kong-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-easy-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payments-via-juspay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-billdesk-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-c2b-mpesa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-direct-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-hosted-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cashfree-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cbk-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-eway-recurring-and-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-google-invisible-recaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-juspay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-knet-payments-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-lipa-na-mpesa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-momo-api.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-qosic.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-momo-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-oab-ipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-payments-cameroon.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-senegal.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-order-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-paybox-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-paystack-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-proxypay-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-rave-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-restrict-fake-registration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-sage-pay-form.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-worldpay-secure-acceptance-hosted-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-module-payshiprestriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mercadopago-adb-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/merchantesolutions-module-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-accountverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-depositpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-module-extrafeexp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-recurringandsubscriptionpayments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-restricpaymentmethod.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-security.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/milople-vatexempt.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/miniorange-inc-miniorange-2fa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mollie-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/monei-module-monei-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/moneyspace-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/monripayments-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/moogento-m2-nomorespam.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/moogento-m2-nomorespampro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/mr-quadpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-checkoutcustomfield.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-securityauth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/msts-trevipay-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/multisafepay-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/networkinternational-ngenius.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/nexi-checkout-adobe-commerce-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ninebits-customer-security.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/novalnet-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-alipayhk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-creditcard.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-fps.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-klarna.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-module-applepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-module-googlepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-union.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-wechat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-yunshanfuapp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/oginnovation-casheercheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/onetree-module-crediviva-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/onetree-module-yappy-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/orangemantra-module-mobile-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ozowpayments-ozow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paghiper-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-authnetcim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-carat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-clover.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-cybersource.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-stripe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payabl-payabl-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paydibs-module-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paydock-magento2-powerboard.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-hsbc-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-zinia-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payitmonthly-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paymaya-philippines-paymaya-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paymob-magento-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paynl-ingcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paynl-magento2-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-fastlane.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-ppcp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paypercut-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payplug-payplug-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payserauk-magento2-paysera-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paystand-paystandmagento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paytomorrow-paytomorrow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paytr-magento2-banktransfer.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paytr-magento2-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/paytrail-paytrail-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/payware-mobile-payments-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pennies-charity.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/php4u-module-magicloginlink.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pits-additional-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pits-datatranspayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pixxles-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pl-epn.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pl-etisalat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pl-nmi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pl-qpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/plationline-plationline.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-activation-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-auto-invoice-generate.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-offline-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/plumrocket-checkout-success-page.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/posteitaliane-module-sia.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/precisionpay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pronko-authorizenet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pronko-module-realex-html.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/prowebconcepts-module-frontend-two-factor-auth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/przelewy24-magento2-przelewy24.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pstk-paystack-magento2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/punchout2go-module-punchout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/pure-mashiro-module-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/px-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/realexpayments-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/reepay-payment-billwerk-plus-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/reepay-payment-reepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/resolve-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/resursbank-magento-all.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/revolut-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ricardomartins-pagbank-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-bamboratoken.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-cardconnect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-elavon.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-authorizecim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-authorizenetcim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-nmi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-usaepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/rootways-moneris.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/saferpay-package.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sanjay-module-anti-cosmic-sting.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sapient-module-worldpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/satispay-magento2-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/scommerce-m2-handlingfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/scommerce-m2-surcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/seoulwebdesign-kakaopay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sezzle-sezzlepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/shiprocket-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sift-module-payment-protection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/signifyd-module-connect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sistemapay-module-plazox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sixtomartin-onelogin-module-saml2-extend.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/skipify-skipifycheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/skrill-skrill.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/snap-finance-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/snap-finance-uk-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/snapfinance-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sparsh-magento-2-gdpr-extension.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sparsh-magento-2-smtp-extension.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/splitit-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/square-module-squareup-omni.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/startbutton-module-sbgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/stich-tech-module-sepa-qr-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/storetown-media-module-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/stripe-stripe-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/subscriptionflow-app-module-setting.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipaycross.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipayhk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipayopen.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-fachostedpage.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-powertranz.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayb2b.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayintl.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechathk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechatoversea.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/superpayments-superpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/swapped-module-pay-crypto.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/swissup-address-autocomplete.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/swissup-akismet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/swissup-firecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/swissup-product-address-field-manager.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/switro-cryptopayments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/synchrony-digital-buy-magento2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/syncpayments-module-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/syspay-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tabby-m2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/talypay-talypays.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tatrabanka-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tech9logy-indian-gst.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tech9logy-module-admin-order-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/themagearmy-module-intltelinput-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/themagearmy-module-restrict-fake-registration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tigrensolutions-module-split-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tngdigital-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/toogas-reduniq-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/trust-payments-limited-module-trust.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/tryspeed-magento-payment-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/ulmod-ordercomment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/valorpaytech-plugin-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-magento2-ageverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-magento2-outofstock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-module-gdpr.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-razorpay-google-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/versapay-versapay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/viabillhq-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/waffy-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wagento-module-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-2fa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-digipin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-dlocal-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-iyzico-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-mangopay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-marketplace-mangopay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-marketplace-stripe-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-cybersource.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-excessive-attempt-lock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-mpcashondelivery.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-order-approval.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-partial-payment-emi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-quick-order.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-razorpay-magic-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-recurring.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-sagepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-squareup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-telrpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-verifactu.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-walletsystem.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-payment-shipping-by-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-phonepe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-recurring-plans-for-discount.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-stripe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webkul-vendor-customer-data-mask.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblrecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblstripepaylater.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblstripepaymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblwallet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/webmaster-ramos-module-checkout-tax-id.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wink-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-buy-now.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-order-attributes.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-payment-per-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wizit-wizit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wolfpaw-antifraud-module-antifraud.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-paycek.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-payway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-wspay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/worldline-module-magento-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/wyomind-pickupatstore-meta.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/xendit-m2invoice.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/zip-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ],
        "https://commercemarketplace.adobe.com/zymion-module-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(1)"
        ]
      }
    },
    {
      "name": "product-buy-box",
      "instances": [
        "#maincontent .product-info-details-container > div:nth-child(2)"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/abeta-io-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aciworldwide-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/adyen-adyen-magento2-expresscheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/adyen-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ae-allure-tech-llc-cartnxs.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ae-amasty-mass-order-actions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ae-comwrap-reply-gmbh-kount-fraud-detection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/affirm-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-captcha-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-credit-limit-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-net30-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-nmi-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-onestepcheckout-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-passwordless-login-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-sarp3.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/airwallex-payments-plugin-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-checkout-fields-manager.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-module-invoice-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/albaitconsulting-module-multiship-graphql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/albaitconsulting-module-partial-store-credit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/almapay-alma-monthlypayments-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-google-accounts-login.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-invisiblecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-module-extra-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-module-securityauth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-one-step-checkout-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-payments-restriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amasty-subscriptions-and-recurring-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amazonpaymentservices-module-fort.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amwalpay-magento2-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/amzn-amazon-pay-magento-2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ananta-module-improvedcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/antom-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/aplazame-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/appifycommerce-cookiefy.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/apruvd-apruvd-fraud-protector.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/apspayments-aps.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/asaas-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ascure-module-restrictcustomerip.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/auraspay-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-authipay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-cardstreampayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-clover.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-lloydscardnetpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-novunafinance.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-omnicapital.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-paynow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-taylrpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-tyl-by-natwest.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-v12finance.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/awesoft-module-maya-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/azupay-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bambora-module-payment-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/beehexacorp-module-hexa-sync.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/blackbird-monetico.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bluesnap-m2-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bluetape-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/borica-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bread-module-breadcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bridge-module-partialpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bridgepay-bridge-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/bsscommerce-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cardgate-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cardknox-cardknox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cash-app-commerce-afterpay-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cash-app-commerce-clearpay-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/chargeafter1-magento-extention.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/checkoutcom-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/chk-cashfree.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/chk-magento-2-paytm-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/clearsale-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/codebrainbv-cashflows.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/codebrainbv-omnikassapayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/codedecorator-juspay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/coinremitter-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/coinspaid-extensions-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cointopay-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/compunnel-otp-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/comviva-technology-payment-orchestration-platform.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/conekta-conekta-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/corvus-pay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/creditkey-b2bgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/credova-module-financial.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-global-payment-management.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-module-visa-acceptance-smb.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-couponcodehelper.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-icicipayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paymentcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paymentrestrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paystackpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-ravepayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-worldpaypayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/digitalfemsa-spin-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/dintero-hp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/easynolo-ecommercesella.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ebizcharge-ebizcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ebizmarts-sagepaysuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-stripe-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-wallet-system.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecommet-customer-group-payment-restriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecommpay-module-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecomplugins-frauddetection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecopay-mkpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ecrypt-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/edifference-in3-onsite-messaging.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-accept-blue.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-module-multicurrency.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-module-paytrace.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/emerchantpay-magento2-emp-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/emmo-checkout-custom-fields.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/emvigo-extensions-custompin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/emvigo-extensions-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/equinox-userblock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/eshopworld-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/etechflow-module-pos.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/eway-eway-rapid-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/extensionmagic-magento2-altcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/eye4fraud-connector.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fero-fero-smart-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fintecture-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fiserv-ipg-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/floa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-checkout-order-attributes-fields.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-custom-messages.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-extended-mini-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-fakeregistration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-layaway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-moa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-otp-login-and-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-price-by-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-restrict-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-store-pickup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fme-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/forter-magento2-module-forter.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fortispay-magento-2-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fraudlogix-module-core.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/freedompay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/friendly-captcha-magento2-friendly-captcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/fs20studio-module-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/grafeco-network-instantpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/greenwing-technology-module-puchout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/greenworld-magento2-module-general.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/harriswebworks-harriswebworks-addressautofill.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/hbl-module-hbl-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/hepsipay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabspro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabsprosmsverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/humm-payment-module-humm-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/hutko-module-hutko.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/idenfy-module-customer-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-astropay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-klap.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-mach-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-powerpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-prontopaga.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/iplusservice-xpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/isapp-m2-honeypot.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/itegration-module-simplepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/iwd-dominate-saas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/jifiti-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout-enterprise.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-sociallogin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/jugaad-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/katapult-module-katapult-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/keyone-verwaltungs-gmbh-fast-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/klarna-m2-klarna.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/klizer-module-taxbycity.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/komoju-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/kount-magento2-kount.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/kount-magento2-kount360.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/kustom-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/layup-technologies-module-layup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/lemonway-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/linked2pay-magento2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ltc-komfortkasse.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/madit-paypal-graphql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/madit-sips2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/madit-stripeql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-authorizecim-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-cybersource-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-firstdata-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-giftwrapper-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-orderbysku-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-payment-restriction-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-shippingrestrict-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-wiretransfer-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage2-au-module-swish-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-int-telephone.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-limit-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-payment-surcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-quick-order.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-googlerecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-paymentrestriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-securitysuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageants-storecredit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magearray-checkoutsignup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magearray-customeractivation.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magearray-extrafees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magearray-orderattachments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magearray-ordercomment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magebees-module-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecan-module-moneris.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-alipay-cross-border.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-axisbank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-per-product-category.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ccavenue.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-clave-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cod-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-coupon-code-link.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ebs-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-edge-express-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-email-quote.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fee-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-first-data-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-gst-india.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-hcaptcha-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-hdfc-bank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-international-telephone-input.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-invisible-google-recaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-juspay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-minimum-order-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-multiple-shipping-flat-rates.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-product-surcharge-additional-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-proxy-pay-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-razorpay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-restrict-cod.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-save-cart-and-buy-later.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-sbi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-shipping-and-payment-by-customer-groups.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-square-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-sticky-add-to-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-store-credit-refund.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ubi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-wepay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-coupenlist.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-paymentfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-phonepe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-unipaas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magehqm2-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magemaclean-mage2-offlinepaymentscontrol.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magenable-module-quickorder.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magento-payment-services.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageplaza-magento-2-one-step-checkout-extension-mkp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magerocket-module-gocuotas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageside-backup-to-dropbox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageside-paypal-invoices.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mageworx-module-checkoutsuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magezon-module-admin-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/magezon-module-elavon-converge-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/makecommerce-module-ecommerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mango-loworderfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-anz-egate-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-bambora-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-bluesnap-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-braintree-multi-currency.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-c2b-mpesa-via-openapiportal.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-ccavenue-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-cloud-backup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-cybersource-secure-acceptance-hosted-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-digicel-moncash-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-emis-online-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-first-data-payeezy-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-freecharge-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-gocardless-instant-bank-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchant-warrior-payframe-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchantwarrior-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-myuser-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-nmi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-opayo-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-orange-money-web-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-partial-payment-layaway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-pay-with-specta.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-connect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-exchange-virtual-desktop.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payeezy-first-data-global-gateway-e4.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfi-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfonte-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-account-per-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-website-payments-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paytrace-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-phonepe-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-pin-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-hosted-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-quickbooks-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-securepay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-stripe-becs-direct-debit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-surcharge-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-tap-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-unitel-money.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-wallet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-westpac-payway-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-worldpay-business.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay-hong-kong-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-easy-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payments-via-juspay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-billdesk-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-c2b-mpesa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-direct-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-hosted-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cashfree-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cbk-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-eway-recurring-and-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-google-invisible-recaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-juspay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-knet-payments-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-lipa-na-mpesa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-momo-api.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-qosic.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-momo-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-oab-ipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-payments-cameroon.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-senegal.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-order-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-paybox-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-paystack-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-proxypay-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-rave-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-restrict-fake-registration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-sage-pay-form.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-worldpay-secure-acceptance-hosted-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-module-payshiprestriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mercadopago-adb-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/merchantesolutions-module-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-accountverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-depositpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-module-extrafeexp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-recurringandsubscriptionpayments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-restricpaymentmethod.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-security.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/milople-vatexempt.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/miniorange-inc-miniorange-2fa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mollie-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/monei-module-monei-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/moneyspace-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/monripayments-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/moogento-m2-nomorespam.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/moogento-m2-nomorespampro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/mr-quadpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-checkoutcustomfield.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-securityauth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/msts-trevipay-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/multisafepay-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/networkinternational-ngenius.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/nexi-checkout-adobe-commerce-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ninebits-customer-security.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/novalnet-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-alipayhk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-creditcard.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-fps.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-klarna.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-module-applepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-module-googlepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-union.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-wechat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-yunshanfuapp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/oginnovation-casheercheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/onetree-module-crediviva-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/onetree-module-yappy-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/orangemantra-module-mobile-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ozowpayments-ozow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paghiper-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-authnetcim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-carat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-clover.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-cybersource.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-stripe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payabl-payabl-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paydibs-module-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paydock-magento2-powerboard.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-hsbc-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-zinia-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payitmonthly-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paymaya-philippines-paymaya-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paymob-magento-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paynl-ingcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paynl-magento2-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-fastlane.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-ppcp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paypercut-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payplug-payplug-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payserauk-magento2-paysera-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paystand-paystandmagento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paytomorrow-paytomorrow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paytr-magento2-banktransfer.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paytr-magento2-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/paytrail-paytrail-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/payware-mobile-payments-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pennies-charity.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/php4u-module-magicloginlink.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pits-additional-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pits-datatranspayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pixxles-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pl-epn.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pl-etisalat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pl-nmi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pl-qpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/plationline-plationline.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-activation-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-auto-invoice-generate.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-offline-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/plumrocket-checkout-success-page.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/posteitaliane-module-sia.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/precisionpay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pronko-authorizenet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pronko-module-realex-html.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/prowebconcepts-module-frontend-two-factor-auth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/przelewy24-magento2-przelewy24.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pstk-paystack-magento2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/punchout2go-module-punchout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/pure-mashiro-module-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/px-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/realexpayments-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/reepay-payment-billwerk-plus-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/reepay-payment-reepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/resolve-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/resursbank-magento-all.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/revolut-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ricardomartins-pagbank-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-bamboratoken.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-cardconnect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-elavon.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-authorizecim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-authorizenetcim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-nmi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-usaepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/rootways-moneris.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/saferpay-package.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sanjay-module-anti-cosmic-sting.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sapient-module-worldpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/satispay-magento2-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/scommerce-m2-handlingfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/scommerce-m2-surcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/seoulwebdesign-kakaopay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sezzle-sezzlepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/shiprocket-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sift-module-payment-protection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/signifyd-module-connect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sistemapay-module-plazox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sixtomartin-onelogin-module-saml2-extend.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/skipify-skipifycheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/skrill-skrill.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/snap-finance-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/snap-finance-uk-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/snapfinance-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sparsh-magento-2-gdpr-extension.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sparsh-magento-2-smtp-extension.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/splitit-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/square-module-squareup-omni.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/startbutton-module-sbgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/stich-tech-module-sepa-qr-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/storetown-media-module-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/stripe-stripe-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/subscriptionflow-app-module-setting.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipaycross.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipayhk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipayopen.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-fachostedpage.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-powertranz.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayb2b.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayintl.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechathk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechatoversea.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/superpayments-superpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/swapped-module-pay-crypto.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/swissup-address-autocomplete.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/swissup-akismet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/swissup-firecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/swissup-product-address-field-manager.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/switro-cryptopayments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/synchrony-digital-buy-magento2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/syncpayments-module-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/syspay-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tabby-m2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/talypay-talypays.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tatrabanka-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tech9logy-indian-gst.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tech9logy-module-admin-order-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/themagearmy-module-intltelinput-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/themagearmy-module-restrict-fake-registration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tigrensolutions-module-split-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tngdigital-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/toogas-reduniq-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/trust-payments-limited-module-trust.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/tryspeed-magento-payment-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/ulmod-ordercomment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/valorpaytech-plugin-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-magento2-ageverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-magento2-outofstock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-module-gdpr.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-razorpay-google-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/versapay-versapay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/viabillhq-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/waffy-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wagento-module-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-2fa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-digipin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-dlocal-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-iyzico-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-mangopay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-marketplace-mangopay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-marketplace-stripe-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-cybersource.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-excessive-attempt-lock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-mpcashondelivery.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-order-approval.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-partial-payment-emi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-quick-order.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-razorpay-magic-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-recurring.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-sagepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-squareup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-telrpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-verifactu.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-walletsystem.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-payment-shipping-by-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-phonepe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-recurring-plans-for-discount.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-stripe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webkul-vendor-customer-data-mask.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblrecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblstripepaylater.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblstripepaymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblwallet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/webmaster-ramos-module-checkout-tax-id.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wink-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-buy-now.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-order-attributes.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-payment-per-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wizit-wizit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wolfpaw-antifraud-module-antifraud.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-paycek.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-payway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-wspay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/worldline-module-magento-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/wyomind-pickupatstore-meta.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/xendit-m2invoice.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/zip-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ],
        "https://commercemarketplace.adobe.com/zymion-module-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(2)"
        ]
      }
    },
    {
      "name": "product-details",
      "instances": [
        "#maincontent .product-info-details-container > div:nth-child(3)"
      ],
      "pageInstances": {
        "https://commercemarketplace.adobe.com/abeta-io-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aciworldwide-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/adyen-adyen-magento2-expresscheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/adyen-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ae-allure-tech-llc-cartnxs.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ae-amasty-mass-order-actions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ae-comwrap-reply-gmbh-kount-fraud-detection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/affirm-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-captcha-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-credit-limit-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-net30-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-nmi-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-onestepcheckout-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-passwordless-login-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aheadworks-module-sarp3.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/airwallex-payments-plugin-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-checkout-fields-manager.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-module-invoice-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aitoc-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/albaitconsulting-module-multiship-graphql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/albaitconsulting-module-partial-store-credit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/almapay-alma-monthlypayments-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-google-accounts-login.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-invisiblecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-module-extra-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-module-securityauth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-one-step-checkout-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-payments-restriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amasty-subscriptions-and-recurring-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amazonpaymentservices-module-fort.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amwalpay-magento2-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/amzn-amazon-pay-magento-2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ananta-module-improvedcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/antom-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/aplazame-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/appifycommerce-cookiefy.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/apruvd-apruvd-fraud-protector.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/apspayments-aps.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/asaas-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ascure-module-restrictcustomerip.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/auraspay-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-authipay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-cardstreampayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-clover.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-lloydscardnetpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-novunafinance.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-omnicapital.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-paynow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-taylrpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-tyl-by-natwest.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/autifydigital-module-v12finance.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/awesoft-module-maya-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/azupay-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bambora-module-payment-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/beehexacorp-module-hexa-sync.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/blackbird-monetico.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bluesnap-m2-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bluetape-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/borica-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bread-module-breadcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bridge-module-partialpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bridgepay-bridge-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/bsscommerce-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cardgate-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cardknox-cardknox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cash-app-commerce-afterpay-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cash-app-commerce-clearpay-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/chargeafter1-magento-extention.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/checkoutcom-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/chk-cashfree.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/chk-magento-2-paytm-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/clearsale-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/codebrainbv-cashflows.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/codebrainbv-omnikassapayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/codedecorator-juspay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/coinremitter-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/coinspaid-extensions-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cointopay-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/compunnel-otp-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/comviva-technology-payment-orchestration-platform.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/conekta-conekta-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/corvus-pay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/creditkey-b2bgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/credova-module-financial.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-global-payment-management.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cybersource-module-visa-acceptance-smb.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-couponcodehelper.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-icicipayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paymentcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paymentrestrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-paystackpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-ravepayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/cynoinfotech-worldpaypayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/digitalfemsa-spin-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/dintero-hp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/easynolo-ecommercesella.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ebizcharge-ebizcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ebizmarts-sagepaysuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-stripe-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-wallet-system.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecommet-customer-group-payment-restriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecommpay-module-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecomplugins-frauddetection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecopay-mkpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ecrypt-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/edifference-in3-onsite-messaging.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-accept-blue.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-module-multicurrency.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/elsnertech-module-paytrace.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/emerchantpay-magento2-emp-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/emmo-checkout-custom-fields.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/emvigo-extensions-custompin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/emvigo-extensions-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/equinox-userblock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/eshopworld-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/etechflow-module-pos.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/eway-eway-rapid-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/extensionmagic-magento2-altcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/eye4fraud-connector.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fero-fero-smart-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fintecture-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fiserv-ipg-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/floa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-checkout-order-attributes-fields.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-custom-messages.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-extended-mini-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-fakeregistration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-layaway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-moa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-otp-login-and-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-price-by-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-restrict-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-store-pickup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fme-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/forter-magento2-module-forter.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fortispay-magento-2-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fraudlogix-module-core.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/freedompay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/friendly-captcha-magento2-friendly-captcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/fs20studio-module-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/grafeco-network-instantpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/greenwing-technology-module-puchout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/greenworld-magento2-module-general.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/harriswebworks-harriswebworks-addressautofill.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/hbl-module-hbl-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/hepsipay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabspro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabsprosmsverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/humm-payment-module-humm-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/hutko-module-hutko.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/idenfy-module-customer-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-astropay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-klap.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-mach-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-powerpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/improntus-module-prontopaga.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/iplusservice-xpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/isapp-m2-honeypot.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/itegration-module-simplepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/iwd-dominate-saas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/jifiti-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout-enterprise.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/jscriptz-module-sociallogin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/jugaad-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/katapult-module-katapult-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/keyone-verwaltungs-gmbh-fast-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/klarna-m2-klarna.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/klizer-module-taxbycity.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/komoju-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/kount-magento2-kount.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/kount-magento2-kount360.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/kustom-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/layup-technologies-module-layup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/lemonway-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/linked2pay-magento2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ltc-komfortkasse.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/madit-paypal-graphql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/madit-sips2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/madit-stripeql.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-authorizecim-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-cybersource-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-firstdata-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-giftwrapper-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-orderbysku-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-payment-restriction-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-shippingrestrict-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage-delight-wiretransfer-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage2-au-module-swish-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-int-telephone.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-limit-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-payment-surcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mage2expert-module-quick-order.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-googlerecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-paymentrestriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageants-module-securitysuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageants-storecredit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magearray-checkoutsignup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magearray-customeractivation.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magearray-extrafees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magearray-orderattachments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magearray-ordercomment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magebees-module-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecan-module-moneris.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-alipay-cross-border.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-axisbank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-per-product-category.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ccavenue.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-clave-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-cod-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-coupon-code-link.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ebs-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-edge-express-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-email-quote.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fee-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-first-data-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-gst-india.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-hcaptcha-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-hdfc-bank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-international-telephone-input.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-invisible-google-recaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-juspay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-minimum-order-fees.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-multiple-shipping-flat-rates.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-product-surcharge-additional-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-proxy-pay-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-razorpay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-restrict-cod.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-save-cart-and-buy-later.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-sbi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-shipping-and-payment-by-customer-groups.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-square-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-sticky-add-to-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-store-credit-refund.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-ubi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecomp-magento-2-wepay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-coupenlist.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-paymentfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-phonepe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magecurious-magento-2-unipaas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magehqm2-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magemaclean-mage2-offlinepaymentscontrol.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magenable-module-quickorder.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magento-payment-services.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageplaza-magento-2-one-step-checkout-extension-mkp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magerocket-module-gocuotas.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageside-backup-to-dropbox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageside-paypal-invoices.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mageworx-module-checkoutsuite.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magezon-module-admin-payment-method.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/magezon-module-elavon-converge-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/makecommerce-module-ecommerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mango-loworderfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-anz-egate-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-bambora-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-bluesnap-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-braintree-multi-currency.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-c2b-mpesa-via-openapiportal.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-ccavenue-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-cloud-backup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-cybersource-secure-acceptance-hosted-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-digicel-moncash-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-emis-online-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-first-data-payeezy-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-freecharge-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-gocardless-instant-bank-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchant-warrior-payframe-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchantwarrior-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-myuser-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-nmi-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-opayo-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-orange-money-web-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-partial-payment-layaway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-pay-with-specta.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-connect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-exchange-virtual-desktop.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payeezy-first-data-global-gateway-e4.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfi-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfonte-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-account-per-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-website-payments-pro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-paytrace-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-phonepe-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-pin-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-direct-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-hosted-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-quickbooks-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-securepay-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-stripe-becs-direct-debit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-surcharge-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-tap-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-unitel-money.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-wallet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-westpac-payway-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento-2-worldpay-business.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay-hong-kong-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-easy-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payments-via-juspay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-billdesk-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-c2b-mpesa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-direct-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-hosted-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cashfree-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-cbk-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-eway-recurring-and-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-google-invisible-recaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-icici-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-juspay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-knet-payments-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-lipa-na-mpesa-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-momo-api.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-qosic.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-momo-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-pay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-oab-ipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-payments-cameroon.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-senegal.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-order-verification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-paybox-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-paystack-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-proxypay-integration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-rave-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-restrict-fake-registration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-sage-pay-form.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-magento2-worldpay-secure-acceptance-hosted-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/meetanshi-module-payshiprestriction.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mercadopago-adb-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/merchantesolutions-module-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-accountverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-depositpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-module-extrafeexp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-recurringandsubscriptionpayments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-restricpaymentmethod.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-security.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/milople-vatexempt.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/miniorange-inc-miniorange-2fa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mollie-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/monei-module-monei-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/moneyspace-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/monripayments-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/moogento-m2-nomorespam.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/moogento-m2-nomorespampro.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/mr-quadpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-checkoutcustomfield.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-extra-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-module-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/msp-concepts-securityauth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/msts-trevipay-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/multisafepay-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/networkinternational-ngenius.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/nexi-checkout-adobe-commerce-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ninebits-customer-security.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/novalnet-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-alipayhk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-creditcard.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-fps.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-klarna.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-module-applepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-module-googlepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-union.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-wechat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oceanpayment-yunshanfuapp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/oginnovation-casheercheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/onetree-module-crediviva-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/onetree-module-yappy-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/orangemantra-module-mobile-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ozowpayments-ozow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paghiper-module-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-authnetcim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-carat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-clover.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-cybersource.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-stripe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paradoxlabs-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payabl-payabl-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paydibs-module-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paydock-magento2-powerboard.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-hsbc-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payever-magento2-zinia-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payitmonthly-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paymaya-philippines-paymaya-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paymob-magento-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paynl-ingcheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paynl-magento2-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-fastlane.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-ppcp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paypal-module-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paypercut-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payplug-payplug-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payserauk-magento2-paysera-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paystand-paystandmagento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paytomorrow-paytomorrow.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paytr-magento2-banktransfer.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paytr-magento2-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/paytrail-paytrail-for-adobe-commerce.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/payware-mobile-payments-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pennies-charity.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/php4u-module-magicloginlink.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pits-additional-fee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pits-datatranspayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pixxles-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pl-epn.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pl-etisalat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pl-nmi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pl-qpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/plationline-plationline.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-activation-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-auto-invoice-generate.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/plugin-partner-offline-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/plumrocket-checkout-success-page.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/posteitaliane-module-sia.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/precisionpay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pronko-authorizenet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pronko-module-realex-html.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/prowebconcepts-module-frontend-two-factor-auth.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/przelewy24-magento2-przelewy24.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pstk-paystack-magento2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/punchout2go-module-punchout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/pure-mashiro-module-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/px-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/realexpayments-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/reepay-payment-billwerk-plus-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/reepay-payment-reepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/resolve-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/resursbank-magento-all.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/revolut-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ricardomartins-pagbank-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-bamboratoken.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-cardconnect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-elavon.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-authorizecim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-authorizenetcim.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-nmi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-module-usaepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/rootways-moneris.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/saferpay-package.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sanjay-module-anti-cosmic-sting.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sapient-module-worldpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/satispay-magento2-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/scommerce-m2-handlingfee.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/scommerce-m2-surcharge.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/seoulwebdesign-kakaopay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sezzle-sezzlepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/shiprocket-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sift-module-payment-protection.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/signifyd-module-connect.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sistemapay-module-plazox.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sixtomartin-onelogin-module-saml2-extend.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/skipify-skipifycheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/skrill-skrill.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/snap-finance-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/snap-finance-uk-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/snapfinance-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sparsh-magento-2-gdpr-extension.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sparsh-magento-2-smtp-extension.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/splitit-module-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/square-module-squareup-omni.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/startbutton-module-sbgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/stich-tech-module-sepa-qr-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/storetown-media-module-onepagecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/stripe-stripe-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/subscriptionflow-app-module-setting.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipaycross.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipayhk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-alipayopen.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-fachostedpage.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-powertranz.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayb2b.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayintl.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechat.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechathk.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/sunflowerbiz-wechatoversea.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/superpayments-superpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/swapped-module-pay-crypto.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/swissup-address-autocomplete.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/swissup-akismet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/swissup-firecheckout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/swissup-product-address-field-manager.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/switro-cryptopayments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/synchrony-digital-buy-magento2-module.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/syncpayments-module-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/syspay-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tabby-m2-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/talypay-talypays.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tatrabanka-paymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tech9logy-indian-gst.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tech9logy-module-admin-order-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/themagearmy-module-intltelinput-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/themagearmy-module-restrict-fake-registration.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tigrensolutions-module-split-cart.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tngdigital-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/toogas-reduniq-payments.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/trust-payments-limited-module-trust.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/tryspeed-magento-payment-plugin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/ulmod-ordercomment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/valorpaytech-plugin-magento.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-magento2-ageverification.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-magento2-outofstock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-module-gdpr.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/vdcstore-razorpay-google-subscriptions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/versapay-versapay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/viabillhq-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/waffy-module-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wagento-module-subscription.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-2fa.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-digipin.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-dlocal-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-iyzico-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-mangopay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-marketplace-mangopay-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-marketplace-stripe-payment-gateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-cybersource.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-excessive-attempt-lock.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-mpcashondelivery.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-order-approval.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-partial-payment-emi.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-quick-order.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-razorpay-magic-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-recurring.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-sagepay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-squareup.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-telrpayment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-verifactu.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-module-walletsystem.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-one-step-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-otp.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-payment-shipping-by-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-phonepe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-recurring-plans-for-discount.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-stripe.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webkul-vendor-customer-data-mask.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblrecaptcha.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblstripepaylater.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblstripepaymentgateway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/weblytic-wblwallet.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/webmaster-ramos-module-checkout-tax-id.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wink-module-checkout.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-buy-now.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-order-attributes.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wisenetic-magento-2-payment-per-customer-group.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wizit-wizit.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wolfpaw-antifraud-module-antifraud.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-paycek.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-payway.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/woom-module-wspay.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/worldline-module-magento-payment.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/wyomind-pickupatstore-meta.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/xendit-m2invoice.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/zip-magento2.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ],
        "https://commercemarketplace.adobe.com/zymion-module-payment-restrictions.html": [
          "#maincontent > div.columns > div > div.product-info-details-container > div:nth-child(3)"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "product-notice",
      "name": "Notice banner",
      "selector": [
        "#maincontent .product-info-details-container > div:nth-child(1)"
      ],
      "style": null,
      "blocks": [
        "notice"
      ],
      "defaultContent": []
    },
    {
      "id": "product-summary",
      "name": "Product summary / buy box",
      "selector": [
        "#maincontent .product-info-details-container > div:nth-child(2)"
      ],
      "style": null,
      "blocks": [
        "product-buy-box"
      ],
      "defaultContent": []
    },
    {
      "id": "product-details",
      "name": "Product details",
      "selector": [
        "#maincontent .product-info-details-container > div:nth-child(3)"
      ],
      "style": null,
      "blocks": [
        "product-details"
      ],
      "defaultContent": []
    }
  ],
  "pageCleanup": {
    "https://commercemarketplace.adobe.com/abeta-io-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aciworldwide-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/adyen-adyen-magento2-expresscheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/adyen-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ae-allure-tech-llc-cartnxs.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ae-amasty-mass-order-actions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ae-comwrap-reply-gmbh-kount-fraud-detection.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/affirm-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-captcha-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-credit-limit-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-net30-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-nmi-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-onestepcheckout-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-passwordless-login-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aheadworks-module-sarp3.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/airwallex-payments-plugin-magento.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aitoc-checkout-fields-manager.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/aitoc-module-invoice-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar"
    ],
    "https://commercemarketplace.adobe.com/aitoc-payment-restrictions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/albaitconsulting-module-multiship-graphql.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/albaitconsulting-module-partial-store-credit.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/almapay-alma-monthlypayments-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-google-accounts-login.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-invisiblecaptcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-method.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-module-extra-fees.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-module-securityauth.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-one-step-checkout-pro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/amasty-payments-restriction.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amasty-subscriptions-and-recurring-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amazonpaymentservices-module-fort.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amwalpay-magento2-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/amzn-amazon-pay-magento-2-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ananta-module-improvedcheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/antom-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/aplazame-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/appifycommerce-cookiefy.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/apruvd-apruvd-fraud-protector.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/apspayments-aps.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/asaas-module-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ascure-module-restrictcustomerip.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/auraspay-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-authipay-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-cardstreampayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-clover.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-lloydscardnetpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-novunafinance.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-omnicapital.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-paynow.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-taylrpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-tyl-by-natwest.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/autifydigital-module-v12finance.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/awesoft-module-maya-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/azupay-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/bambora-module-payment-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/beehexacorp-module-hexa-sync.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/blackbird-monetico.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/bluesnap-m2-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/bluetape-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/borica-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/bread-module-breadcheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/bridge-module-partialpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/bridgepay-bridge-module-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/bsscommerce-module-one-step-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cardgate-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cardknox-cardknox.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cash-app-commerce-afterpay-for-adobe-commerce.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cash-app-commerce-clearpay-for-adobe-commerce.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/chargeafter1-magento-extention.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/checkoutcom-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/chk-cashfree.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/chk-magento-2-paytm-payment-method.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/clearsale-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/codebrainbv-cashflows.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/codebrainbv-omnikassapayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/codedecorator-juspay-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/coinremitter-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/coinspaid-extensions-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cointopay-paymentgateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/compunnel-otp-verification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/comviva-technology-payment-orchestration-platform.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/conekta-conekta-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/corvus-pay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/creditkey-b2bgateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/credova-module-financial.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/cybersource-global-payment-management.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cybersource-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/cybersource-module-visa-acceptance-smb.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-couponcodehelper.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-icicipayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-paymentcharge.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-paymentrestrictions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-paystackpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-ravepayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/cynoinfotech-worldpaypayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/digitalfemsa-spin-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/dintero-hp.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/easynolo-ecommercesella.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ebizcharge-ebizcharge.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/ebizmarts-sagepaysuite.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-otp.html": [
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-stripe-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecarter-technologies-pvt-ltd-wallet-system.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecommet-customer-group-payment-restriction.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecommpay-module-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/ecomplugins-frauddetection.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecopay-mkpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ecrypt-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/edifference-in3-onsite-messaging.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/elsnertech-accept-blue.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/elsnertech-module-multicurrency.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/elsnertech-module-paytrace.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/emerchantpay-magento2-emp-plugin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/emmo-checkout-custom-fields.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/emvigo-extensions-custompin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/emvigo-extensions-extra-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/equinox-userblock.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/eshopworld-module-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/eway-eway-rapid-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/extensionmagic-magento2-altcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/eye4fraud-connector.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fero-fero-smart-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fintecture-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fiserv-ipg-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/floa-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-checkout-order-attributes-fields.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-custom-messages.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-extended-mini-cart.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-fakeregistration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-layaway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-moa.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-otp-login-and-verification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-price-by-customer-group.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-restrict-payment-method.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-store-pickup.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fme-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/forter-magento2-module-forter.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fortispay-magento-2-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/fraudlogix-module-core.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/freedompay-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/friendly-captcha-magento2-friendly-captcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/fs20studio-module-extra-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/grafeco-network-instantpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/greenwing-technology-module-puchout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/greenworld-magento2-module-general.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/harriswebworks-harriswebworks-addressautofill.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/hbl-module-hbl-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/hepsipay-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabspro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/hexasoft-module-fraudlabsprosmsverification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/humm-payment-module-humm-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/hutko-module-hutko.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/idenfy-module-customer-verification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/improntus-module-astropay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/improntus-module-klap.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/improntus-module-mach-pay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/improntus-module-powerpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/improntus-module-prontopaga.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/iplusservice-xpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/isapp-m2-honeypot.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/itegration-module-simplepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/iwd-dominate-saas.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/jifiti-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/jscriptz-module-checkout-enterprise.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/jscriptz-module-checkout-pro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/jscriptz-module-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/jscriptz-module-sociallogin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/jugaad-module-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/katapult-module-katapult-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/keyone-verwaltungs-gmbh-fast-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/klarna-m2-klarna.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/klizer-module-taxbycity.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/komoju-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/kount-magento2-kount.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/kount-magento2-kount360.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/kustom-module-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/layup-technologies-module-layup.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/lemonway-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/linked2pay-magento2-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/ltc-komfortkasse.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/madit-paypal-graphql.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/madit-sips2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/madit-stripeql.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-authorizecim-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-cybersource-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-firstdata-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-giftwrapper-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-orderbysku-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-payment-restriction-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-shippingrestrict-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage-delight-wiretransfer-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage2-au-module-swish-pay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage2expert-module-int-telephone.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/mage2expert-module-limit-cart.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mage2expert-module-quick-order.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageants-module-googlerecaptcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageants-module-paymentrestriction.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageants-module-securitysuite.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/mageants-storecredit.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magearray-checkoutsignup.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magearray-customeractivation.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/magearray-extrafees.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magearray-orderattachments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magearray-ordercomment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magebees-module-onepagecheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecan-module-moneris.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-alipay-cross-border.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-axisbank-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-extra-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-cash-on-delivery-per-product-category.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-ccavenue.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-clave-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-cod-verification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-coupon-code-link.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-ebs-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-edge-express-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-email-quote.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fee-pro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-extra-fees.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-first-data-icici-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-hcaptcha-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-hdfc-bank-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-icici-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-international-telephone-input.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-invisible-google-recaptcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-juspay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-minimum-order-fees.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-multiple-shipping-flat-rates.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-one-step-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-product-surcharge-additional-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-proxy-pay-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-razorpay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-restrict-cod.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-save-cart-and-buy-later.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-sbi-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-shipping-and-payment-by-customer-groups.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-square-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-sticky-add-to-cart.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-store-credit-refund.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-ubi-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecomp-magento-2-wepay-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecurious-magento-2-coupenlist.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecurious-magento-2-onepagecheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecurious-magento-2-paymentfee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magecurious-magento-2-phonepe.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/magecurious-magento-2-unipaas.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magehqm2-module-one-step-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magemaclean-mage2-offlinepaymentscontrol.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magenable-module-quickorder.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magento-payment-services.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageplaza-magento-2-one-step-checkout-extension-mkp.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magerocket-module-gocuotas.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageside-backup-to-dropbox.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageside-paypal-invoices.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mageworx-module-checkoutsuite.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar"
    ],
    "https://commercemarketplace.adobe.com/magezon-module-admin-payment-method.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/magezon-module-elavon-converge-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/makecommerce-module-ecommerce.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mango-loworderfee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-anz-egate-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-bambora-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-bluesnap-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-braintree-multi-currency.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-c2b-mpesa-via-openapiportal.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-ccavenue-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-cloud-backup.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-cybersource-secure-acceptance-hosted-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-digicel-moncash-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-emis-online-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-extra-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-first-data-payeezy-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-freecharge-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-gocardless-instant-bank-pay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchant-warrior-payframe-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-merchantwarrior-direct-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-myuser-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-nmi-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-opayo-direct-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-orange-money-web-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-partial-payment-layaway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-pay-with-specta.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-exchange-virtual-desktop.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paya-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-payeezy-first-data-global-gateway-e4.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfi-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-payfonte-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-account-per-customer-group.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paypal-website-payments-pro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-paytrace-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-phonepe-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-pin-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-direct-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-psigate-hosted-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-quickbooks-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-securepay-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-stripe-becs-direct-debit.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-surcharge-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-tap-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-unitel-money.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-wallet.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-westpac-payway-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento-2-worldpay-business.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay-hong-kong-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-alipay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-easy-pay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-axis-bank-payments-via-juspay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-billdesk-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-c2b-mpesa-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-direct-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cardsave-hosted-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cashfree-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-cbk-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-eway-recurring-and-subscriptions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-google-invisible-recaptcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-icici-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-juspay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-knet-payments-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-lipa-na-mpesa-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-momo-api.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-mobile-money-via-qosic.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-momo-pay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-mtn-pay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-oab-ipay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-payments-cameroon.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-orange-money-senegal.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-order-verification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-paybox-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-payment-restrictions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-paystack-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-proxypay-integration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-rave-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-restrict-fake-registration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-sage-pay-form.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-magento2-worldpay-secure-acceptance-hosted-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/meetanshi-module-payshiprestriction.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mercadopago-adb-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/merchantesolutions-module-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-accountverification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-depositpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-module-extrafeexp.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-recurringandsubscriptionpayments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-restricpaymentmethod.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-security.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/milople-vatexempt.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/miniorange-inc-miniorange-2fa.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mollie-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/monei-module-monei-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/moneyspace-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/monripayments-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/moogento-m2-nomorespam.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/moogento-m2-nomorespampro.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/mr-quadpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/msp-concepts-checkoutcustomfield.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/msp-concepts-extra-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/msp-concepts-module-one-step-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/msp-concepts-securityauth.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/msts-trevipay-magento.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/multisafepay-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/networkinternational-ngenius.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/nexi-checkout-adobe-commerce-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ninebits-customer-security.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/novalnet-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-alipay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-alipayhk.html": [
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-creditcard.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-fps.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-klarna.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-module-applepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-module-googlepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-union.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-wechat.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oceanpayment-yunshanfuapp.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/oginnovation-casheercheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/onetree-module-crediviva-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/onetree-module-yappy-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/ozowpayments-ozow.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paghiper-module-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paradoxlabs-authnetcim.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paradoxlabs-carat.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paradoxlabs-clover.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/paradoxlabs-cybersource.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paradoxlabs-stripe.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paradoxlabs-subscriptions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/payabl-payabl-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paydibs-module-paymentgateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paydock-magento2-powerboard.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/payever-magento2-hsbc-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/payever-magento2-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/payever-magento2-zinia-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/payitmonthly-module-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paymaya-philippines-paymaya-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paymob-magento-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paynl-ingcheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paynl-magento2-plugin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paypal-module-ppcp.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paypal-module-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paypercut-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/payplug-payplug-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/payserauk-magento2-paysera-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paystand-paystandmagento.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paytomorrow-paytomorrow.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paytr-magento2-banktransfer.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paytr-magento2-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/paytrail-paytrail-for-adobe-commerce.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/payware-mobile-payments-magento.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pennies-charity.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/php4u-module-magicloginlink.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pits-additional-fee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pits-datatranspayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pixxles-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pl-epn.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pl-etisalat.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pl-nmi.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pl-qpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/plationline-plationline.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/plugin-partner-activation-cart.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/plugin-partner-auto-invoice-generate.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/plumrocket-checkout-success-page.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/posteitaliane-module-sia.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/precisionpay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pronko-authorizenet.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pronko-module-realex-html.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/prowebconcepts-module-frontend-two-factor-auth.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/przelewy24-magento2-przelewy24.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/pstk-paystack-magento2-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/punchout2go-module-punchout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/pure-mashiro-module-payment-restrictions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/px-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/realexpayments-module-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/reepay-payment-billwerk-plus-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/reepay-payment-reepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/resolve-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/resursbank-magento-all.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/revolut-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ricardomartins-pagbank-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-bamboratoken.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-cardconnect.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-elavon.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-module-authorizecim.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-module-authorizenetcim.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-module-nmi.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-module-usaepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/rootways-moneris.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/saferpay-package.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sanjay-module-anti-cosmic-sting.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/sapient-module-worldpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/satispay-magento2-plugin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/scommerce-m2-handlingfee.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/scommerce-m2-surcharge.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/seoulwebdesign-kakaopay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/sezzle-sezzlepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/shiprocket-module-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sift-module-payment-protection.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/signifyd-module-connect.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sistemapay-module-plazox.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sixtomartin-onelogin-module-saml2-extend.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/skipify-skipifycheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/skrill-skrill.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/snap-finance-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/snap-finance-uk-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/snapfinance-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sparsh-magento-2-gdpr-extension.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sparsh-magento-2-smtp-extension.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/splitit-module-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/square-module-squareup-omni.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/startbutton-module-sbgateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/stich-tech-module-sepa-qr-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/storetown-media-module-onepagecheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/stripe-stripe-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(6) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(7) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(8) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/subscriptionflow-app-module-setting.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipaycross.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipayhk.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-alipayopen.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-fachostedpage.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-powertranz.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-unionpay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayb2b.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-unionpayintl.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-wechat.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-wechathk.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/sunflowerbiz-wechatoversea.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/superpayments-superpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/swapped-module-pay-crypto.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/swissup-akismet.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/swissup-firecheckout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/swissup-product-address-field-manager.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/switro-cryptopayments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/synchrony-digital-buy-magento2-module.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/syncpayments-module-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/syspay-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/tabby-m2-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/talypay-talypays.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/tatrabanka-paymentgateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/tech9logy-indian-gst.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/tech9logy-module-admin-order-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/test-input-onclick-alert-document-domain-svg-onload-alert-1": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themagearmy-module-intltelinput-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/themagearmy-module-restrict-fake-registration.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/tigrensolutions-module-split-cart.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/tngdigital-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/toogas-reduniq-payments.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/trust-payments-limited-module-trust.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/tryspeed-magento-payment-plugin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/ulmod-ordercomment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/valorpaytech-plugin-magento.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/vdcstore-magento2-ageverification.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/vdcstore-magento2-outofstock.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/vdcstore-module-gdpr.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/vdcstore-razorpay-google-subscriptions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/versapay-versapay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/viabillhq-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/waffy-module-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/wagento-module-subscription.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-2fa.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-digipin.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-dlocal-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/webkul-iyzico-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-mangopay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-marketplace-mangopay-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-marketplace-stripe-payment-gateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-cybersource.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-excessive-attempt-lock.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-mpcashondelivery.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-order-approval.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-partial-payment-emi.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-quick-order.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-razorpay-magic-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-recurring.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-sagepay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-squareup.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-telrpayment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-verifactu.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-module-walletsystem.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-one-step-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar"
    ],
    "https://commercemarketplace.adobe.com/webkul-otp.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/webkul-payment-shipping-by-customer-group.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-phonepe.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/webkul-recurring-plans-for-discount.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-stripe.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webkul-vendor-customer-data-mask.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/weblytic-wblrecaptcha.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/weblytic-wblstripepaylater.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/weblytic-wblstripepaymentgateway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/weblytic-wblwallet.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/webmaster-ramos-module-checkout-tax-id.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/wink-module-checkout.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/wisenetic-magento-2-buy-now.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/wisenetic-magento-2-order-attributes.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/wisenetic-magento-2-payment-per-customer-group.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/wizit-wizit.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk"
    ],
    "https://commercemarketplace.adobe.com/wolfpaw-antifraud-module-antifraud.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/woom-module-paycek.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/woom-module-payway.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/woom-module-wspay.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/worldline-module-magento-payment.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "button.bv-relevancy-popup-target.bv-focusable",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2)",
      "ol.bv-content-list.bv-content-list-reviews > li:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/wyomind-pickupatstore-meta.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "ul.bv-content-secondary-ratings > li:nth-child(2)",
      "ul.bv-content-secondary-ratings > li:nth-child(3)",
      "li.bv-popup-histogram-ratings-bar"
    ],
    "https://commercemarketplace.adobe.com/xendit-m2invoice.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/zip-magento2.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ],
    "https://commercemarketplace.adobe.com/zymion-module-payment-restrictions.html": [
      "#onetrust-style",
      "#onetrust-consent-sdk",
      "div.ui-dialog.ui-corner-all"
    ]
  }
};

const parsers = {
  'tag-list': tagListParser,
  'notice': noticeParser,
  'product-buy-box': productBuyBoxParser,
  'product-details': productDetailsParser,
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
