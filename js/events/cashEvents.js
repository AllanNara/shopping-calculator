import { insertCash, useCash } from "../helpers/cash.js"

const initializedCash = document.getElementById("use-cash");
const inputCash = document.getElementById("input-cash");

initializedCash.addEventListener("change", useCash);
inputCash.addEventListener("keydown", insertCash);

