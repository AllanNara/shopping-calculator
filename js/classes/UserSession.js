import storage from "../helpers/storage.js";
import { alertConfirmAction } from "../utils/alerts.js";
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
		this._rememberAlertCash = true;
	}

	get toPay() {
		return this._currentOrder.TOTAL;
	}

	get availableCash() {
		return this._availableCash;
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

	addCash = async(newCash) => {
		this._availableCash = this._initialCash = newCash;
		this._rememberAlertCash = true
		if (!this._useCashFlag) await this._changeUseCashFlag(true);
		return await this._updateCash();
	};

	_changeUseCashFlag = async(change) => {	
		let changeTo = !this._useCashFlag
		if(!change || !changeTo) {
			this._useCashFlag = false;
			this._availableCash = this._initialCash = 0
		} else if(change || changeTo) {
			this._useCashFlag = true;
			await this._updateCash();
		}
		return this._useCashFlag
	};

	updateDiscountToOrder = async(discount) => {
		discount = Number(discount)
		this._rememberAlertCash = true
		const changeDiscount = this._currentOrder._addGeneralDiscount(discount);
		if (!changeDiscount) return null;
		if(this._useCashFlag) return await this._updateCash();
		return true

	};

	updateCoupon = async(discount, code) => {
		discount = discount ? Number(discount) : null
		this._rememberAlertCash = true
		const couponAdded = this._currentOrder._updateCoupon({ discount, code });
		if (!couponAdded) return null;
		this._availableCash = this._initialCash;
	
		if(this._useCashFlag) return await this._updateCash();
		return true
	};

	addProductToOrder = async(product) => {
		const productAdded = this._currentOrder._addProductToCart(product);
		if (!productAdded) return null;
		return await this._updateCash();
	};

	deleteProductToOrder = async(idProd) => {
		const productDeleted = this._currentOrder._removeProductToCart(idProd);
		this._availableCash += productDeleted;
		this._rememberAlertCash = false
		return await this._updateCash();
	};

	async _updateCash() {
		if (!this._useCashFlag) return null;
		this._availableCash = (this._initialCash - this._currentOrder.TOTAL).rounded();
		if (this._availableCash < 0 && this._initialCash && this._rememberAlertCash) {
			const next = await alertConfirmAction("proseguir con saldo inicial", "¡Los gastos superan el dinero disponible!")
			if(this._rememberAlertCash) this._rememberAlertCash = false
			if (!next) return await this._changeUseCashFlag(false);
		}
		if(!this._rememberAlertCash && this._useCashFlag && this._availableCash > 0) this._rememberAlertCash = true
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
