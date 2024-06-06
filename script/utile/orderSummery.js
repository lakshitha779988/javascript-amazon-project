import { cart } from "../../data/cart";
import { formatCurrency } from "./money";




function productCost(){
    let itemsPrice=0;
    cart.forEach((item) => {
        itemsPrice+=formatCurrency(item.priceCent);
    });
    return itemsPrice;
}



