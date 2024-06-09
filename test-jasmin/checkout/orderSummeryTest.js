import { renderOrderSummery } from "../../script/checkout/orderSummery.js";
import {addToCart, cart, loadFromStorage } from "../../data/cart.js";



describe('test suit: renderOrderSummery', () =>{
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    beforeEach(()=>{
        spyOn(localStorage , 'setItem'); 
        document.querySelector(".js-test-container").innerHTML=`
        <div class="js-order-summary" ></div>
        <div class="js-payment-summery"></div>
        <div class="return-to-home-link"></div>
        `;

        spyOn(localStorage , 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId : '1'

            },
            {
                productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 3,
                deliveryOptionId : '1'

            }

        ]);
        });

        loadFromStorage();
        renderOrderSummery();


    })

    it('displays the cart' , () =>{
        expect(
        document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
            ).toContain('Quantity: 3');
        })


    it('remove a product' , ()=>{
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
           ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    })

    afterEach(()=>{
        document.querySelector(".js-test-container").innerHTML=``;
    })
});