import UserSession from "../classes/UserSession.js";
import { numberToPriceString } from "../utils/index.js";

export default function updateCash() {
  const user = UserSession.getInstance()[1];
  const checkboxUseCash = document.getElementById("use-cash");
  const currentCash = document.getElementById("current-cash");
  if (checkboxUseCash.checked && user._initialCash) currentCash.innerText = `${numberToPriceString(user.availableCash)}`;
}