import ProductInCart from "./ProductInCart.js";
import Coupon from "./Coupon.js"

export default class Ticket {
	static ticketNumber = 100;
	constructor(data) {
		this.status = "pending";
		this.reduction = 0;
		this.TOTAL = null;
		if(data) {
			console.log({coupon: data.coupon})
			this.store = data.store 
			this.number = data.number 
			this.cart = data.cart;
			this.subtotal = data.cart.reduce(((acc, curr) => acc + curr.total), 0);
			this.generalDiscount = data.generalDiscount;
			this.coupon = data.coupon;
			this._solveTotal()
		} else {
			this.store = "store";
			this.number = ++Ticket.ticketNumber;
			this.cart = []
			this.subtotal = 0;
			this.generalDiscount = 0;
			this.coupon = [null];
		}
	}


	get current() {
		return {
			store: this.store,
			number: this.number,
			status: this.status,
			cart: this.cart.map((prod) => prod.current),
			totalItemsCart: this.cart.length,
			subtotal: this.subtotal,
			generalDiscount: this.generalDiscount,
			coupon: this.coupon,
			reduction: this.reduction,
			TOTAL: this.TOTAL,
		};
	}

	_addProductToCart = ({product, discount, quantity}) => {
		if(this.status !== "pending") return null
		const productToInsert = new ProductInCart({ ...product, ...discount, quantity });
		this.cart.push(productToInsert);
		this.subtotal = (this.subtotal + productToInsert.total).rounded();
		this._solveTotal();
		return true
	};

	_addGeneralDiscount = (discount) => {
		if(this.status !== "pending") return null
		this.generalDiscount = discount;
		if (this.subtotal !== 0) {
			this._solveTotal()
		}
		return true
	};

	_updateCoupon = ({discount, code}) => {
		if(this.status !== "pending") return null
		if(discount === null) this.coupon[0] = null;
		else this.coupon[0] = new Coupon(discount, code);
		this._solveTotal()
		return true
	}

	_solveTotal = () => {
		if(this.status !== "pending") return null
		if(!this.generalDiscount) this.TOTAL = this.subtotal
		this.TOTAL = (this.subtotal - (this.subtotal * this.generalDiscount) / 100).rounded();
		this.reduction = (this.TOTAL - this.subtotal).rounded();
		if(this.coupon[0] && !this.coupon[0]._applied) {
			if(this.TOTAL < this.coupon[0].discount) return
			this.TOTAL -= this.coupon[0].discount;
			this.reduction += this.coupon[0].discount
			this.coupon[0]._applied = true
		}
	};

	_removeProductToCart = (idProd) => {
		if(this.status !== "pending") return null
		if (!this.cart.length) return null;
		if(!idProd) idProd = this.cart[this.cart.length - 1].id;
		const indexCart = this.cart.findIndex((prod) => prod.id === idProd);
		const priceRemove = this.cart[indexCart].price
		this.subtotal = (this.subtotal - this.cart[indexCart].total).rounded();
		this.cart.splice(indexCart, 1);
		this._solveTotal()
		return priceRemove
	};

	_closeTicket = (state, orders = []) => {
		this.status = state ? "finished" : "canceled";
		const order = this._generateOrder(state);
		if (!state) return order
		orders.push(order);
		return orders;
	};

	_generateOrder = () => {
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
		order.date = new Date().toLocaleString().split(",")[0];
		return order;
	};
}
