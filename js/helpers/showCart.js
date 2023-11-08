import UserSession from "../classes/UserSession"

const user = UserSession.getInstance()[1]

const cart = user.order.cart

const template = `
<div class="productItem">
    <p>Lavandina x 3 = $300</p>
    <p>Descuento del 10% (-$30)</p>
    <p>Total = <b>$3060</b></p>
</div>
<button class="deleteProduct"><i class="fa-regular fa-trash-can"></i></button>`

for (let i = 0; i < cart.length; i++) {
    // cart[i].product
    // cart[i].quantity
    // cart[i].subtotal
    // cart[i].discountBases.discount
    // cart[i].discountBases.type
    // cart[i].reduction
    // cart[i].total

    // cart[i].id
    const article = document.createElement("article")
    article.className = "productInCart"
    
}



// let mensaje = "holaaaaa"
// let style = "border: solid 1px red;"
// const newEle = document.createElement("p")
// newEle.className = "title"
// newEle.innerHTML = `<span style="${style}">${mensaje}</span>`;

// const cartSection = document.getElementById("cart-products")
// cartSection.appendChild(newEle)
