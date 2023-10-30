import ProductInCart from "./ProductInCart.js";
import Coupon from "./Coupon.js"

export default class Ticket {
	static ticketNumber = 100;
	constructor(store = null) {
		this.store = store
		this.number = ++Ticket.ticketNumber;
		this.status = "pending";
		this.cart = [];
		this.subtotal = 0;
		this.generalDiscount = 0;
		this.coupon = [];
		this.reduction = 0;
		this.TOTAL = null;
	}

	get current() {
		return {
			store: this.store,
			number: this.number,
			status: this.status,
			// cart: this.cart.map((prod) => prod.current),
			cart: this.cart.length,
			subtotal: this.subtotal,
			generalDiscount: this.generalDiscount,
			coupons: this.coupon,
			reduction: this.reduction,
			TOTAL: this.TOTAL,
		};
	}

	addProductToCart = ({product, discount, quantity}) => {
		if(this.status !== "pending") return null
		const productToInsert = new ProductInCart({ ...product, ...discount, quantity });
		this.cart.push(productToInsert);
		this.subtotal = (this.subtotal + productToInsert.total).rounded();
		if(this.generalDiscount) this._applyDiscountAndCoupons()
		else this.TOTAL = this.subtotal
	};

	addGeneralDiscount = (discount) => {
		if(this.status !== "pending") return null
		this.generalDiscount = discount;
		if (this.subtotal !== 0) this._applyDiscountAndCoupons()
	};

	updateCoupon = ({discount, code}) => {
		if(this.status !== "pending") return null
		this.coupon[0](new Coupon(discount, code))
	}

	_applyDiscountAndCoupons = () => {
		if(this.status !== "pending") return null
		this.TOTAL = (this.subtotal - (this.subtotal * this.generalDiscount) / 100).rounded();
		this.reduction = (this.TOTAL - this.subtotal).rounded();
		if(this.coupon.length && !this.coupon[0]._applied) {
			this.TOTAL -= this.coupon[0].discount;
			this.reduction += this.coupon[0].discount
			this.coupon[0]._applied = true
		}
	};

	removeProductToCart = (idProd) => {
		if(this.status !== "pending") return null
		if (!this.cart.length) return null;
		if(!idProd) idProd = this.cart.length;
		const indexCart = this.cart.findIndex((prod) => prod.id === idProd);
		const idProductRemoved = this.cart[indexCart].id
		this.subtotal = (this.subtotal - this.cart[indexCart].total).rounded();
		this.cart.splice(indexCart, 1);
		this._applyDiscountAndCoupons()
		return idProductRemoved
	};

	closeTicket = (state, orders = []) => {
		if(this.status !== "pending") return null
		const order = this._generateOrder(state);
		if (state) {
			orders.push(order);
			localStorage.setItem("orders", JSON.stringify(orders));
		} else {
			localStorage.setItem("lastCanceled", JSON.stringify(order));
		}
		return true
	};

	_generateOrder = (state) => {
		this.status = state ? "finished" : "canceled";
		const { store, number, status, ...rest } = this;
		const ticket = {};
		for (let key in rest) {
			if (typeof rest[key] !== "function") {
				ticket[key] = rest[key];
			}
		}

		ticket.cart = ticket.cart.map(prod => {
			return {
        product: prod.product,
        discountBases: prod.discountBases,
        quantity: prod.quantity,
        subtotal: prod.subtotal,
        reduction: prod.reduction,
        total: prod.total
			}
		})
		
		const order = { number, status, ticket };
		return order;
	};
}
