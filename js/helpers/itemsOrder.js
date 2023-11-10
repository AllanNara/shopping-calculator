import UserSession from "../classes/UserSession.js";
import { numberToPriceString } from "../utils/index.js";

export function updateItemsOrder() {
    const user = UserSession.getInstance()[1];
    document.getElementById("total-products").innerText = `${user.order.totalItems}`
    document.getElementById("subtotal-order").innerText = `${numberToPriceString(user.order.subtotal)}`
    if(user.order.reduction > 0) {
        document.getElementById("total-reduction").innerText = `-${numberToPriceString(user.order.reduction)}`
    } else document.getElementById("total-reduction").innerHTML = `<i>no aplica</i>`
    document.getElementById("total-to-pay").innerText = `${numberToPriceString(user.toPay)}`
}