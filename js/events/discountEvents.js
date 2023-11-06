import { addCoupon, addGeneralDiscount, removeCoupon, removeGeneralDiscount } from "./function/discountOrder.js";

const btnDiscountGral = document.getElementById("btn-discount-general")
const btnAddCoupon = document.getElementById("btn-coupon")

const btnRemoveDisc = document.getElementById("btn-remove-disc");
const btnRemoveCoupon = document.getElementById("btn-remove-coupon");

btnDiscountGral.addEventListener("click", addGeneralDiscount)
btnRemoveDisc.addEventListener("click", removeGeneralDiscount)
btnAddCoupon.addEventListener("click", addCoupon)
btnRemoveCoupon.addEventListener("click", removeCoupon)