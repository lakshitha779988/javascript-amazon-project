import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import '../data/cart-class.js';
import { loadProduct } from "../data/products.js";

loadProduct(()=>{
    renderOrderSummery();
    renderPaymentSummery();
})

