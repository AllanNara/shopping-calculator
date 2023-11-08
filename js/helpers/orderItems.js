import UserSession from "../classes/UserSession.js";

export function updatedItemsOrder() {
    const user = UserSession.getInstance()[1];
    document.getElementById("total-products").innerText = `${user.order.totalItems}`
    document.getElementById("subtotal-order").innerText = `$${user.order.subtotal.toLocaleString()}`
    document.getElementById("total-reduction").innerText = `-$${user.order.reduction.toLocaleString()}`
    document.getElementById("total-to-pay").innerText = `$${user.toPay}`

    console.log(user.order.TOTAL.toLocaleString())
}