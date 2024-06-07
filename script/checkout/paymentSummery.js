import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deleveryoption.js";
import { formatCurrency } from "../utile/money.js";



export function renderPaymentSummery(){
    let productPriceCents =0;
    let shippingPriceCents =0;

   cart.forEach((cartItem)=>{
        let product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCent;

   })
  
   const totalTaxBeforCents = productPriceCents + shippingPriceCents;
   const taxCents = totalTaxBeforCents * 0.1;
   const totalCents = totalTaxBeforCents + taxCents;

   const paymentSummeryHtml =`
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalTaxBeforCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `
   document.querySelector(".js-payment-summery").innerHTML=paymentSummeryHtml;
}