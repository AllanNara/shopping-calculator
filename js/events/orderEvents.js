import { changeStore, cancelOrder, generateTicket } from "./function/order.js"

const storeInput = document.getElementById("store-input")
const generateTicketBtn = document.getElementById("generate-ticket-btn")
const cancelOrderBtn = document.getElementById("canceled-btn")

storeInput.addEventListener("keyup", changeStore)
cancelOrderBtn.addEventListener("click", () => cancelOrder())
generateTicketBtn.addEventListener("click", generateTicket)

