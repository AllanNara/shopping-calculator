import Ticket from "../../classes/Ticket.js";
import { generateCartMock } from "./script-create-cart.js";

const ticket1 = new Ticket();
// console.log(ticket1.current);

const cart = await generateCartMock()
const productsMap = cart.map((prd) => {
  return {
    product: {
      name: prd.name,
      category: prd.category,
      price: prd.price,
    },
    discount: {
      discountType: prd.discountType,
      discount: prd.discount,
      discountCondition: prd.discountCondition,
    },
    quantity: prd.quantity
  }
})

productsMap.forEach(item => ticket1.addProductToCart(item.product, item.discount, item.quantity));


