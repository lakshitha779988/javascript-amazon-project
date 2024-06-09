import { cart, deleteFromCart, updateCartQuentity , updatDileveryOption, upadateQuetity} from "../../data/cart.js";
import { products , getProduct} from "../../data/products.js";
import { formatCurrency } from "../utile/money.js";
import { renderPaymentSummery } from "./paymentSummery.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deleveryoption.js";
import { formatdate } from "../utile/date.js";
 


export function renderOrderSummery(){

  // const orderCountHtml = document.querySelector(".js-return-to-home");
  // orderCountHtml.innerHTML=updateCartQuentity();
    let cartSummeryHtml ="";

    cart.forEach((cartItem) =>{
        const machingproduct= getProduct(cartItem.productId);
        

        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
       
  

    const deliveryDateFormat =formatdate(deliveryOption);
      

        cartSummeryHtml += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${machingproduct.id}">
        <div class="delivery-date js-delivery-date">
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
              ${machingproduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${machingproduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${machingproduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link js-update-link-${machingproduct.id}" data-product-id="${machingproduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${machingproduct.id} data-" data-product-id="${machingproduct.id}">
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

      deliveryOptions.forEach((deleveryoption) =>{

        const deliveryDateFormat =formatdate(deleveryoption);
        const deliveryPrice= (deleveryoption.priceCent === 0) ? 'FREE' : `$${formatCurrency(deleveryoption.priceCent)}`;
        const ischeaked=( deleveryoption.id===cartItem.deliveryOptionId) ? 'checked' : '';


      html+= `<div class="delivery-option js-delivery-option"
                data-product-id=${machingproduct.id} data-delevery-option-id=${deleveryoption.id}>
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
          renderPaymentSummery();
        })
    })

    document.querySelectorAll(".js-update-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        const updateContainer = document.querySelector(`.js-update-link-${productId}`);
        
        const originalContainer = updateContainer.innerHTML;
        // Clear previous content and add input and save button
        updateContainer.innerHTML = `
          <input class="js-update-input" type="text">
          <button class="js-update-save">Save</button>
        `;
    
        // Optionally focus on the new input element
        const inputElement = updateContainer.querySelector('.js-update-input');
        inputElement.focus();
    
        // Add event listener to the save button
        updateContainer.querySelector('.js-update-save').addEventListener("click", () => {
          let inputValue = 0;
           inputValue = inputElement.value;
          upadateQuetity(productId,inputValue);
          console.log(`Input value for product ${productId}: ${inputValue}`);
          updateContainer.innerHTML = originalContainer;
         renderOrderSummery();
         renderPaymentSummery();
        });
      });
    });
    

    document.querySelectorAll(".js-delivery-option")
    .forEach((element) =>{
      element.addEventListener('click' , ()=>{
        const {productId, deleveryOptionId}=element.dataset;

        updatDileveryOption(productId,deleveryOptionId);
        renderOrderSummery();
        renderPaymentSummery();
      });
      
    });

}


