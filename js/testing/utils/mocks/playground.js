import UserSession from "../../../classes/UserSession.js";
import generateCartMock from "./createMockCart.js";
import { generateFakeCartProduct } from "./createMockProduct.js";

const user = new UserSession();

const products = generateCartMock();
products.forEach((item) => {
	user.currentOrder.addProductToCart(item);
});
console.log(user.current)


user.addCash(20000)
// user.currentOrder.addGeneralDiscount(12);
// user.updateCash()
console.log(user.current)
// console.log(user.current)
// const newProduct = generateFakeCartProduct(99);
// user.currentOrder.addProductToCart(newProduct);
console.log(user.closeOrder())

// const result = user.currentOrder.generateOrder(false)
// console.dir(result, { depth: 100 });

// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())


