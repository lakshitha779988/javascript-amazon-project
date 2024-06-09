import { cart } from "../data/cart.js";
import { getProduct , loadProduct} from "../data/products.js";
import { formatCurrency } from "./utile/money.js";


loadProduct(()=>{
  rederReturnOrder();
})

function rederReturnOrder(){

    let orderContainerHtml = "";

    cart.forEach((cartItem)=>{
        const product = getProduct(cartItem.productId);
        orderContainerHtml +=`
        <div class="order-container">
        <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(product.priceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${product.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>

            
          </div>
          </div>`


    });
    const oderGridHtml = document.querySelector(".js-orders-grid");
    oderGridHtml.innerHTML = orderContainerHtml;
}

