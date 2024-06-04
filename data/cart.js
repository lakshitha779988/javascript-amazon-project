export  const cart=[
    {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    },
    {
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity: 1
    },
    {
        productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        quantity: 1
    },
    {
        productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
        quantity: 1
    }

];

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

}