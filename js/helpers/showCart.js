import UserSession from "../classes/UserSession.js"
import { numberToPriceString } from "./index.js";
import { updateItemsOrder } from "./itemsOrder.js";
import updateCash from "./updateCash.js";

function createArticle(productObj) {
    let { product, quantity, subtotal, discount, condition, type, reduction, total } = productObj;
    subtotal = numberToPriceString(subtotal);
    reduction = numberToPriceString(reduction);
    total = numberToPriceString(total)

    let discountP;
    if(reduction === "$0") discountP = `<i>No aplica descuento</i>`
    else switch(type) {
        case "percentage":
            discountP = `<i>Descuento del ${discount}% (${reduction})</i>`
            break
        case "pricePerQ":
            discount = numberToPriceString(discount)
            discountP = `<i>Con ${condition} o más, c/u ${discount} (${reduction})</i>`;
            break
        case "percentPerQ":
            discountP = `<i>Por ${condition} o más un ${discount}% desc (${reduction})</i>`
            break
        case "inXUnity":
            discountP = `<i>Desc. del ${discount}% en ${condition} u. (${reduction})</i>`
            break
        default:
        break
    }

    return (`
    <div class="productItem">
        <p><u>${product.name}</u> x ${quantity} = ${subtotal}</p>
        <p>${discountP}</p>
        <p>Total = <b>${total}</b></p>
    </div>
    `)
}

export function showProducts() {
    const cartProducts = document.getElementById("cart-products")
    cartProducts.innerHTML = "";

    const user = UserSession.getInstance()[1];
    const cart = user.order.cart;
    const elements = []

    for (let i = 0; i < cart.length; i++) {
        const article = document.createElement("article")
        article.className = "productInCart"
        article.innerHTML = createArticle({ ...cart[i], ...cart[i].discountBases })
        
        const buttonDelete = document.createElement("button")
        buttonDelete.className = "deleteProduct" 
        buttonDelete.id = cart[i].id
        buttonDelete.addEventListener("click", e => {
            user.deleteProductToOrder(e.target.id)
            updateItemsOrder()
            updateCash()
            showProducts()
        })
        buttonDelete.innerHTML = `<i class="fa-regular fa-trash-can"></i>`
    
        article.appendChild(buttonDelete)
        elements.push(article)
    }
    
    cartProducts.append(...elements)
    return true
}

