import ProductInCart from "./ProductInCart.js";
import Coupon from "./Coupon.js"
import { idGenerator } from "../helpers/index.js";

export default class Ticket {
	constructor(data) {
		this.status = "pending";
		this.reduction = 0;
		this.TOTAL = null;
		if(data) {
			this.store = data.store 
			this.number = data.number
			this.cart = data.cart.map(prod => {
				const { name, category, price } = prod.product
				const { type: discountType, discount, condition: discountCondition } = prod._discountBases;
				const { quantity } = prod
				const prodParse = new ProductInCart({ name, category, price, discount, discountType, discountCondition, quantity })
				return prodParse
			});
			this.subtotal = (data.cart.reduce(((acc, curr) => acc + curr.total), 0)).rounded();
			this.generalDiscount = data.generalDiscount;
			this.coupon = data.coupon;
			this._solveTotal()
		} else {
			this.store = null
			this.number = `${idGenerator()}`
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
			totalItems: this.cart.length,
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
		if (this.subtotal !== 0) this._solveTotal()
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
		if(!this.generalDiscount) this.TOTAL = this.subtotal.rounded()
		else this.TOTAL = (this.subtotal - (this.subtotal * this.generalDiscount) / 100).rounded();
		if(this.coupon[0]) {
			this.coupon[0]._applied = true
			if(this.TOTAL < this.coupon[0].discount) return
			this.TOTAL = (this.TOTAL - this.coupon[0].discount).rounded();
		}
		this.reduction = (this.subtotal - this.TOTAL).rounded();
	};

	_removeProductToCart = (idProd) => {
		if(this.status !== "pending") return null
		if (!this.cart.length) return null;
		if(!idProd) idProd = this.cart[this.cart.length - 1].id;
		const indexCart = this.cart.findIndex((prod) => prod.id == idProd);
		const priceRemove = this.cart[indexCart].price
		this.subtotal = (this.subtotal - this.cart[indexCart].total).rounded();
		this.cart.splice(indexCart, 1);
		this._solveTotal()
		return priceRemove
	};

	_closeTicket = (state) => {
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
		
		const order = { store, number, status, ticket };
		order.date = new Date().toLocaleString().split(",")[0];
		return order;
	};
}
