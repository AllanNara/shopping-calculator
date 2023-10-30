import UserSession from "../../classes/UserSession.js";
import generateCartMock from "./createMockCart.js";

const user = new UserSession();

const products = generateCartMock();
products.forEach((item) => {
	user.addProductToOrder(item);
});
user.addCash(20000)
console.log(user.current)

// console.log(user.current)
user.updateDiscountToOrder(12);
// user.updateCash();
// user.updateCash();
// user.updateCash();
console.log(user.current)
user.addNewCoupon(500, "A00")
console.log(user.current)
console.log(user.current.currentOrder.coupons)
user.addNewCoupon(null)
console.log(user.current)
console.log(user.current.currentOrder.coupons)
// const newProduct = generateFakeCartProduct(99);
// user.currentOrder.addProductToCart(newProduct);
// console.log(user.closeOrder())

// const result = user.currentOrder.generateOrder(false)
// console.dir(result, { depth: 100 });

// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())
// console.log(ticket1.removeProductToCart())


