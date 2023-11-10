import UserSession from "../../classes/UserSession.js";
import { numberToPriceString } from "../../utils/index.js";
import { updateItemsOrder } from "../../helpers/itemsOrder.js";
import updateCash from "../../helpers/updateCash.js";
import { useCash } from "./cash.js";
import { alertConfirmAction, alertSuccessResponse, inputNewDisc } from "../../utils/alerts.js";

const user = UserSession.getInstance()[1];

export async function addGeneralDiscount() {
  
  const discount = await inputNewDisc("percent")
  if(!discount) return;
  
  const balance = user.updateDiscountToOrder(discount)
  if(!balance) useCash(false);
  else {
    document.getElementById("discount-general").innerText = discount;
    document.getElementById("btn-remove-disc").classList.remove("hidden")
  }
  updateCash()
  updateItemsOrder()
  await alertSuccessResponse(`¡Descuento del ${discount}% aplicado!`);
}

export async function removeGeneralDiscount(event) {
  if(!(await alertConfirmAction("eliminar descuento"))) return
  const balance = user.updateDiscountToOrder(0)
  if(!balance) useCash(false);
  document.getElementById("discount-general").innerText = 0;
  document.getElementById("btn-remove-disc").classList.add("hidden")
  updateCash()
  updateItemsOrder()
}

export async function addCoupon() {
  const coupon = await inputNewDisc("coupon")
  if(!coupon) return;

  const balance = user.updateCoupon(coupon)
  if(!balance) useCash(false);
  else {
    document.getElementById("exists-coupon").innerText = "Cupon por: "
    document.getElementById("coupon").innerText = numberToPriceString(coupon);
    document.getElementById("btn-remove-coupon").classList.remove("hidden")
  }
  updateCash()
  updateItemsOrder()
  await alertSuccessResponse(`¡Cupon por $${coupon} aplicado!`)
}

export async function removeCoupon(event) {
  if(!(await alertConfirmAction("eliminar cupon"))) return
  const balance = user.updateCoupon(null)
  if(!balance) useCash(false);
  document.getElementById("exists-coupon").innerText = "Sin cupon"
  document.getElementById("coupon").innerText = ""
  document.getElementById("btn-remove-coupon").classList.add("hidden")
  updateCash()
  updateItemsOrder()
}