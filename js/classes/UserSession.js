import storage from "../helpers/storage.js";
import Ticket from "./Ticket.js";

export default class UserSession {
	static instance = null;
	static isFromStorage = false;

	static getInstance() {
		if (!UserSession.instance) {
			const storedUser = storage("get", "local")("userData");
			UserSession.isFromStorage = Boolean(storedUser);
			UserSession.instance = new UserSession(storedUser);
		}
		return [UserSession.isFromStorage, UserSession.instance];
	}

	constructor(data) {
		this.username = data ? data.username : "<user>";
		this._initialCash = data ? data._initialCash : 0;
		this._availableCash = data ? data._availableCash : 0;
		this._currentOrder = new Ticket(data ? data._currentOrder : null);
		this._useCashFlag = data ? data._useCashFlag : false;
	}

	get toPay() {
		return this._currentOrder.TOTAL.toLocaleString();
	}

	get availableCash() {
		return this._availableCash.toLocaleString();
	}

	get order() {
		return this._currentOrder.current;
	}

	set store(name) {
		this._currentOrder.store = name.toUpperCase()
	}

	get currentStore() {
		return this._currentOrder.store
	}

	addCash = (newCash) => {
		this._availableCash = this._initialCash = newCash;
		if (!this._useCashFlag) this._changeUseCashFlag(true);
		return this._updateCash();
	};

	_changeUseCashFlag = (change) => {	
		let changeTo = !this._useCashFlag
		if(!change || !changeTo) {
			this._useCashFlag = false;
			this._availableCash = this._initialCash = 0
		} else if(change || changeTo) {
			this._useCashFlag = true;
			this._updateCash();
		}
		return this._useCashFlag
	};

	updateDiscountToOrder = (discount) => {
		discount = Number(discount)
		const changeDiscount = this._currentOrder._addGeneralDiscount(discount);
		if (!changeDiscount) return null;
		if(this._useCashFlag) return this._updateCash();
		return true

	};

	updateCoupon = (discount, code) => {
		discount = discount ? Number(discount) : null
		const couponAdded = this._currentOrder._updateCoupon({ discount, code });
		if (!couponAdded) return null;
		this._availableCash = this._initialCash;
	
		if(this._useCashFlag) return this._updateCash();
		return true
	};

	addProductToOrder = (product) => {
		const productAdded = this._currentOrder._addProductToCart(product);
		if (!productAdded) return null;
		return this._updateCash();
	};

	deleteProductToOrder = (idProd) => {
		const productDeleted = this._currentOrder._removeProductToCart(idProd);
		this._availableCash += productDeleted;
		return this._updateCash();
	};

	_updateCash() {
		if (!this._useCashFlag) return null;
		this._availableCash = (this._initialCash - this._currentOrder.TOTAL).rounded();
		if (this._availableCash < 0 && this._initialCash) {
			const next = confirm(
				"¡Los gastos superan el dinero disponible!\n ¿Esta seguro que desea proseguir con su saldo inicial? \n"
			);
			if (!next) return this._changeUseCashFlag(false);
		}
		return true;
	}

	closeOrder(state = true) {
		if (!state) this._availableCash = this._initialCash;
		else this._initialCash = this._availableCash;
		const result = this._currentOrder._closeTicket(state);
		this._currentOrder = new Ticket();
		return result;
	}
}
