import { getProduct , loadProduct} from "../data/products.js";
import { updateCartQuentity } from "../data/cart.js";


loadProduct(()=>{
    renderTracking();

})

function renderTracking(){
    console.log("hi laky");

    window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const quantity = urlParams.get('quantity');

    const product = getProduct(productId);
    console.log(product);
    document.querySelector(".js-cart-quantity").innerHTML=updateCartQuentity();
 

    const trackingOrderHtml = `
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>

        <div class="delivery-date">
        Arriving on Monday, June 13
        </div>

        <div class="product-info">
        ${product.name}
        </div>

        <div class="product-info">
        Quantity: ${quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
        <div class="progress-label">
            Preparing
        </div>
        <div class="progress-label current-status">
            Shipped
        </div>
        <div class="progress-label">
            Delivered
        </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;

    document.querySelector(".js-order-tracking").innerHTML = trackingOrderHtml;
    };
    window.onload();
}
