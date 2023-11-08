import UserSession from "../classes/UserSession.js";
import { numberToPriceString } from "./index.js";
import cleanAll from "./reset.js";

const user = UserSession.getInstance()[1]

export default function setUserForm() {
  cleanAll();
  document.getElementById("use-cash").checked = user._useCashFlag;
  document.getElementById("store-name").innerText = user.currentStore
  if(user._useCashFlag) {
    document.getElementById("input-cash").removeAttribute("disabled");
    document.getElementById("input-cash").value = 0;
    document.getElementById("current-cash").innerText = `${user._initialCash ? numberToPriceString(user.availableCash) : "$ 0"}`;
  }
  if(user.order.totalItems) {
    document.getElementById("canceled-btn").removeAttribute("disabled");
    document.getElementById("generate-ticket-btn").removeAttribute("disabled");
  }

  if(user.order.generalDiscount) {
    document.getElementById("discount-general").innerText = user.order.generalDiscount;
    document.getElementById("btn-remove-disc").classList.remove("hidden")
  }
  if(user.order.coupon[0]) {
    document.getElementById("exists-coupon").innerText = "Cupon por: "
    document.getElementById("coupon").innerText = "$" + Number(user.order.coupon[0].discount).toLocaleString();
    document.getElementById("btn-remove-coupon").classList.remove("hidden")
  }
}