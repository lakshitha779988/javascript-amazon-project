export  let cart=JSON.parse(localStorage.getItem('cart'));
    
if(!cart){
        cart=[];
        
    }

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
                quantity: 1
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