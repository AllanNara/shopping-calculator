import UserSession from "../../classes/UserSession.js";
import updateExpenses from "../../helpers/updateExpenses.js";
import { useCash } from "./cash.js";

const user = UserSession.getInstance()[1];

export function addGeneralDiscount() {
  const discount = prompt("Ingrese descuento para el total de la compra")
  if(!discount || isNaN(Number(discount)) || (discount > 100 || discount < 0) ) return alert("Valor ingresado invalido")

  const balance = user.updateDiscountToOrder(discount)
  if(!balance) useCash(false);
  else {
    document.getElementById("discount-general").innerText = discount;
    document.getElementById("btn-remove-disc").classList.remove("hidden")
  }
  updateExpenses()
}

export function removeGeneralDiscount(event) {
  if(!confirm("¿Desea eliminar este descuento?")) return
  const balance = user.updateDiscountToOrder(0)
  if(!balance) useCash(false);
  document.getElementById("discount-general").innerText = 0;
  document.getElementById("btn-remove-disc").classList.add("hidden")
  updateExpenses()
}

export function addCoupon() {
  const coupon = prompt("Ingrese el valor de su cupon de descuento")
  if(!coupon || isNaN(Number(coupon))) return alert("Valor ingresado invalido");

  const balance = user.updateCoupon(coupon)
  if(!balance) useCash(false);
  else {
    document.getElementById("exists-coupon").innerText = "Cupon por: "
    document.getElementById("coupon").innerText = "$" + Number(coupon).toLocaleString();
    document.getElementById("btn-remove-coupon").classList.remove("hidden")
  }
  updateExpenses()
}

export function removeCoupon(event) {
  if(!confirm("¿Desea eliminar este descuento?")) return
  const balance = user.updateCoupon(null)
  if(!balance) useCash(false);
  document.getElementById("exists-coupon").innerText = "Sin cupon"
  document.getElementById("coupon").innerText = ""
  document.getElementById("btn-remove-coupon").classList.add("hidden")
  updateExpenses()
}