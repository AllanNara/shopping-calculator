import storage from "../helpers/storage.js";
import Ticket from "./Ticket.js";

export default class UserSession {
	static instance = null;
	static isFromStorage = false;

	static getInstance() {
		if (!UserSession.instance) {
			const storedUser = storage("get", "local")("userData");
			UserSession.isFromStorage = Boolean(storedUser)
			UserSession.instance = new UserSession(storedUser);
		}
		return [UserSession.isFromStorage, UserSession.instance];
	}

	constructor(data) {
		this.username = data ? data.username : "user";
		this._initialCash = data ? data._initialCash : 0;
		this._availableCash = data ? data._availableCash : 0;
		this._currentOrder = new Ticket(data ? data._currentOrder : null);
		this._useCashFlag = data ? data._useCashFlag : false;
	}

	get toPay() {
		return this._currentOrder.TOTAL.toLocaleString()
	}

	get availableCash() {
		return this._availableCash.toLocaleString()
	}

	get order() {
		return this._currentOrder.current
	}

	addCash = (newCash) => {
		this._initialCash = newCash;
		this._availableCash = newCash;
		if (!this._useCashFlag) this._changeUseCashFlag();
		return this._updateCash();
	};

	_changeUseCashFlag = (change) => {
		this._useCashFlag = change ?? !this._useCashFlag;
		if (this._initialCash) this._updateCash();
	};

	updateDiscountToOrder = (discount) => {
		const changeDiscount = this._currentOrder._addGeneralDiscount(discount);
		if (!changeDiscount) return null;
		this._availableCash = this._initialCash;
		return this._updateCash();
	};

	addNewCoupon = (discount, code) => {
		const couponAdded = this._currentOrder._updateCoupon({ discount, code });
		if (!couponAdded) return null;
		this._availableCash = this._initialCash;
		return this._updateCash();
	};

	addProductToOrder = (product) => {
		const productAdded = this._currentOrder._addProductToCart(product);
		if (!productAdded) return null;
		return this._updateCash();
	};

	deleteProductToOrder = (idProd) => {
		const productDeleted = this._currentOrder._removeProductToCart(idProd);
		this._availableCash += productDeleted;
		this._updateCash();
		return productDeleted;
	};

	_updateCash() {
		if (!this._useCashFlag) return null;
		if (this._initialCash - this._currentOrder.TOTAL < 0) {
			while (this._initialCash < this._currentOrder.TOTAL) {
				const next = confirm(
					"¡Los gastos superan el dinero disponible!\n ¿Desea remover el ultimo producto?"
				);
				if (next) this._currentOrder._removeProductToCart();
				this._availableCash = (this._initialCash - this._currentOrder.TOTAL).rounded();
				return;
			}
		} else {
			this._availableCash = (this._initialCash - this._currentOrder.TOTAL).rounded();
			return true;
		}
	}

	closeOrder(state = true) {
		if(!state) this._availableCash = this._initialCash
		const result = this._currentOrder._closeTicket(state);
		this._currentOrder = new Ticket();
		return result;
	}
}
