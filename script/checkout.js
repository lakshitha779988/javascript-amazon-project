import { cart, deleteFromCart, updateCartQuentity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utile/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deleveryoption.js";






updateCartList();
let cartSummeryHtml ="";

cart.forEach((cartItem) =>{
    let machingproduct;
    products.forEach((product) =>{
        if(product.id===cartItem.productId){
            machingproduct=product;
        }
    });

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if(option.id===cartItem.deliveryOptionId){
        deliveryOption=option;
      }
      
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const deliveryDateFormat=deliveryDate.format('dddd, MMMM D');
  

    cartSummeryHtml += `<div class="cart-item-container js-cart-item-container-${machingproduct.id}">
    <div class="delivery-date">
      Delivery date: ${deliveryDateFormat}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${machingproduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${machingproduct.name}
        </div>
        <div class="product-price">
          ${formatCurrency(machingproduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link data-" data-product-id="${machingproduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
       ${deliveryOptionHtml(machingproduct,cartItem)}
        
          </div>
        </div>
      </div>
    </div>
  </div>`
})




function deliveryOptionHtml(machingproduct,cartItem){

  let html='';

  deliveryOptions.forEach((deleveryoptions) =>{

    const today = dayjs();
    const deliveryDate = today.add(deleveryoptions.deliveryDays, 'days');
    const deliveryDateFormat=deliveryDate.format('dddd, MMMM D');
    const deliveryPrice= (deleveryoptions.priceCent === 0) ? 'FREE' : `$${formatCurrency(deleveryoptions.priceCent)}`;
    const ischeaked=( deleveryoptions.id===cartItem.deliveryOptionId) ? 'checked' : '';


   html+= `<div class="delivery-option">
    <input type="radio"
     ${ischeaked}
      class="delivery-option-input"
      name="delivery-option-${machingproduct.id}">
    <div>
      <div class="delivery-option-date">
       ${deliveryDateFormat}
      </div>
      <div class="delivery-option-price">
        ${deliveryPrice} - Shipping
      </div>
      </div>
      </div>`

  })
 
  return html;
}


function updateCartList(){
  document.querySelector(".return-to-home-link").innerHTML=updateCartQuentity();
}


document.querySelector(".js-order-summary").innerHTML=cartSummeryHtml;

document.querySelectorAll(".js-delete-link")
.forEach((link)=>{
    link.addEventListener("click" ,()=>{
      const productId = link.dataset.productId;
        deleteFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
       updateCartList();
    })
})