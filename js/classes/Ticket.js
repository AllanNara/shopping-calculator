import ProductInCart from "./ProductInCart.js";
import UserSession from "./UserSession.js";

let count = 0

export default class Ticket {
	static ticketNumber = 0;
	constructor() {
		this.number = ++Ticket.ticketNumber;
		this.status = "pending";
		this.cart = [];
		this.subtotal = 0;
		this.generalDiscount = 0;
		this.coupons = []
		this.reduction = 0;
		this.TOTAL = null;
	}

	get current() {
		return {
			number: this.number,
			status: this.status,
			cart: this.cart.map(prod => prod.current),
			subtotal: this.subtotal,
			generalDiscount: this.generalDiscount,
			coupons: this.coupons,
			reduction: this.reduction,
			TOTAL: this.TOTAL,
		}
	}

	addProductToCart = (product, discount, quantity) => {
		const productToInsert = new ProductInCart({ ...product, ...discount, quantity });
		this.cart.push(productToInsert);
		this.subtotal = (this.subtotal + productToInsert.total).rounded();
		console.dir({[++count]: this.current}, { depth: 100})
	};

	addGeneralDiscount = (discount) => {
		this.generalDiscount = discount;
		if(this.subtotal !== 0) {
			this.TOTAL = this.subtotal - (this.subtotal * disc) / 100;
		}
	}

	applyDiscountAndCoupons = () => {
		if(this.coupon) this.TOTAL -= this.coupon;
		this.TOTAL = this.subtotal (this.subtotal * this.generalDiscount) / 100
	}

	calculateTotalToPay = () => {
		if (this.generalDiscount) {
			this.TOTAL = this.subtotal - (this.subtotal * this.generalDiscount) / 100;
			this.reduction = this.TOTAL - this.subtotal;
		} else {
			this.TOTAL = this.subtotal;
		}

		return this.TOTAL;
	};

	removeProductToCart = (idProd) => {
		if (!this.cart.length) return null;
		if (!idProd) idProd = this.cart.length - 1;
		const indexCart = this.cart.findIndex((prod) => prod.id === idProd);
		this.subtotal -= this.cart[indexCart].total;
		this.cart.splice(indexCart, 1);
	};

	closeTicket = (state, orders) => {
		const order = this.generateOrder(state);
		if (state) {
			orders.push(order);
			localStorage.setItem("orders", JSON.stringify(orders));
		} else {
			localStorage.setItem("lastCanceled", JSON.stringify(order));
		}
		const user = JSON.parse(sessionStorage.getItem("currentUser"));
		sessionStorage.setItem("currentUser", JSON.stringify(new UserSession(true, user.availableCash)));
	};

	generateOrder = (state) => {
		this.status = state ? "finished" : "canceled";
		const { number, status, ...rest } = this;
		const ticket = {};
		for (let key in rest) {
			if (typeof rest[key] !== "function") {
				ticket[key] = rest[key];
			}
		}
		const order = { number, status, ticket };
		return order;
	};
}
