export  let cart;

export function loadFromStorage(){
   cart = JSON.parse(localStorage.getItem('cart'));
    
    if(!cart){
            cart=[];
            
        }
}
loadFromStorage();


function saveToLocalStorage(){
    localStorage.setItem("cart" , JSON.stringify(cart));
}


export function addToCart(productId){
    let machingItem;
        cart.forEach((cartItem) =>{
            if(productId===cartItem.productId){
                machingItem=cartItem
                
            }
        });

        if(machingItem){
            machingItem.quantity+=1;
        }
        else{
            cart.push({
                productId : productId,
                quantity: 1,
                deliveryOptionId: "1"
            });
        }
        saveToLocalStorage();
       

}

export function deleteFromCart(productId){
   let  newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
            newCart.push(cartItem);
        }
    });
  cart=newCart;
  saveToLocalStorage();
}

export function updateCartQuentity(){
    let cardQuantity= 0;

        cart.forEach((cartItem) =>{
            cardQuantity+=Number(cartItem.quantity);
        })

       return cardQuantity;
}

export function updatDileveryOption(productId,deliveryOptionId){
    let machingItem;
    cart.forEach((cartItem) =>{
        if(productId===cartItem.productId){
            machingItem=cartItem
        }
    });

    machingItem.deliveryOptionId=deliveryOptionId;
    console.log(machingItem.deliveryOptionId);
    saveToLocalStorage();


}

export function upadateQuetity(productId,newQuantity){
    let machingItem;
    cart.forEach((cartItem) =>{
        if(productId===cartItem.productId){
            machingItem=cartItem
        }
    });

    machingItem.quantity=Number(newQuantity);
    saveToLocalStorage();
}