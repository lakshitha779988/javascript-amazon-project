import { cart , addToCart ,updateCartQuentity } from "../data/cart.js";
import { getProduct, loadProduct } from "../data/products.js";
import { formatCurrency } from "./utile/money.js";

loadProduct(() => {
  renderReturnOrder();
});

function renderReturnOrder() {
  document.querySelector(".js-cart-quantity").innerHTML=updateCartQuentity();
  let orderContainerHtml = "";

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    orderContainerHtml += `
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
              <button class="buy-again-button button-primary js-buy-it-again" data-product-id ="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message ">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <button class="track-package-button button-secondary js-track-package-button" data-product-id="${product.id}" data-quantity="${cartItem.quantity}">
                Track package
              </button>
            </div>
          </div>
        </div>`;
  });

  const orderGridHtml = document.querySelector(".js-orders-grid");
  orderGridHtml.innerHTML = orderContainerHtml;
  addEventListeners();
}

function addEventListeners() {
  document.querySelectorAll(".js-track-package-button").forEach((trackButton) => {
    trackButton.addEventListener("click", () => {
      const productId = trackButton.dataset.productId;
      const quantity = trackButton.dataset.quantity;

      const queryString = new URLSearchParams({
        productId: productId,
        quantity: quantity
      }).toString();

      window.location.href = 'tracking.html?' + queryString;
    });
  });

  document.querySelectorAll(".js-buy-it-again").forEach((buyButton)=>{
      buyButton.addEventListener("click" , ()=>{
        const productId = buyButton.dataset.productId;
        addToCart(productId);
        document.querySelector(".js-cart-quantity").innerHTML=updateCartQuentity();
        renderReturnOrder();
       
      })
  })
}
