import Ticket from "./Ticket.js";

export default class UserSession {
	constructor() {
		this._useCashFlag = false;
		this.initialCash = 0;
		this.availableCash = 0;
		this.currentOrder = new Ticket();
		this._discountApplied = false
	}

	get current() {
		return {
			initialCash: this.initialCash,
			useCashFlag: this._useCashFlag,
			availableCash: this.availableCash,
			currentOrder: this.currentOrder.current
		}
	}

	addCash = (newCash) => {
		this.initialCash = newCash;
		this.availableCash = newCash;
		if(!this._useCashFlag) this._changeUseCashFlag();
		this._updateCash();
	};

  	_changeUseCashFlag = () => {
		this._useCashFlag = !this._useCashFlag
		this._updateCash();
		return this._useCashFlag;
   }

   updateDiscountToOrder = (discount) => {
		const changeDiscount = this.currentOrder._addGeneralDiscount(discount);
		if(!changeDiscount) return null
		this.availableCash = this.initialCash;
		this._updateCash()
   }

   addNewCoupon = (discount, code) => {
		const couponAdded = this.currentOrder._updateCoupon({discount, code})
		if(!couponAdded) return null
		this.availableCash = this.initialCash;
		this._updateCash()
   }

   addProductToOrder = (product) => {
		const productAdded = this.currentOrder._addProductToCart(product);
		if(!productAdded) return null
		this._updateCash()
   }

   deleteProductToOrder = (idProd) => {
		const productDeleted = this.currentOrder._removeProductToCart(idProd);
		this.availableCash += productDeleted
   }

	_updateCash() {
		if (!this._useCashFlag) return null
		if((this.availableCash - this.currentOrder.TOTAL) < 0) {
			while(this.availableCash < this.currentOrder.TOTAL) {
				const next = confirm("¡Los gastos superan el dinero disponible!\n ¿Desea remover el ultimo producto?");
				if(next) {
					this.currentOrder._removeProductToCart();
				} else return false
			}
		} else {
			this.availableCash = (this.initialCash - this.currentOrder.TOTAL).rounded();
			return true
		}
	}

	closeOrder(state = true) {
		const result = this.currentOrder._closeTicket(state)
		this.currentOrder = new Ticket();
		return result
	}
}
