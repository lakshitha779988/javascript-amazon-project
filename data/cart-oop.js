function Cart(loacalStorageKey){
    const cart = {
        cartItems : undefined,
        loadFromStorage(){
           this.cartItems = JSON.parse(localStorage.getItem(loacalStorageKey));
            
            if(!this.cartItems){
                    this.cartItems=[];
                    
                }
        },
       saveToLocalStorage(){
           localStorage.setItem(loacalStorageKey , JSON.stringify(this.cartItems));
       },
   
       addToCart(productId){
           let machingItem;
               this.cartItems.forEach((cartItem) =>{
                   if(productId===cartItem.productId){
                       machingItem=cartItem
                       
                   }
               });
       
               if(machingItem){
                   machingItem.quantity+=1;
               }
               else{
                   this.cartItems.push({
                       productId : productId,
                       quantity: 1,
                       deliveryOptionId: "1"
                   });
               }
               this.saveToLocalStorage();
       },
       deleteFromCart(productId){
           let  newCart = [];
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId!== productId){
                    newCart.push(cartItem);
                }
            });
          this.cartItems = newCart;
          this.saveToLocalStorage();
        },
   
       updateCartQuentity(){
           let cardQuantity= 0;
       
               this.cartItems.forEach((cartItem) =>{
                   cardQuantity+=Number(cartItem.quantity);
               })
       
              return cardQuantity;
       },
   
       updatDileveryOption(productId,deliveryOptionId){
           let machingItem;
           this.cartItems.forEach((cartItem) =>{
               if(productId===cartItem.productId){
                   machingItem=cartItem
               }
           });
       
           machingItem.deliveryOptionId=deliveryOptionId;
           console.log(machingItem.deliveryOptionId);
           this.saveToLocalStorage();
       },
       upadateQuetity(productId,newQuantity){
           let machingItem;
           this.cartItems.forEach((cartItem) =>{
               if(productId===cartItem.productId){
                   machingItem=cartItem
               }
           });
       
           machingItem.quantity=Number(newQuantity);
           this.saveToLocalStorage();
       }
   }
   return cart

}


const cart = Cart('cart-oop');
const bueisnessCart = Cart('cartBueisness-oop');

cart.loadFromStorage();
bueisnessCart.loadFromStorage();










