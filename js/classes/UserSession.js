import Ticket from "./Ticket.js";

export default class UserSession {
	constructor() {
		this.useCashFlag = false;
		this.availableCash = 0;
		this.currentOrder = new Ticket();
	}

	get current() {
		return {
			useCashFlag: this.useCashFlag,
			availableCash: this.availableCash,
			currentOrder: this.currentOrder.current
		}
	}

	addCash = (newCash) => {
		this.availableCash += newCash;
		if(!this.useCashFlag) this.changeUseCashFlag();
		this.updateCash();
	};

  changeUseCashFlag = () => {
    this.useCashFlag = !this.useCashFlag
		this.updateCash();
		return this.useCashFlag;
  }

	updateCash() {
		if (!this.useCashFlag) return null
		if((this.availableCash - this.currentOrder.TOTAL) < 0) {
			while(this.availableCash < this.currentOrder.TOTAL) {
				const next = console.log("¡Los gastos superan el dinero disponible!\n ¿Desea remover el ultimo producto?");
				if(!next) {
					this.currentOrder.removeProductToCart();
				} else return false
			}
		} else {
			this.availableCash = (this.availableCash - this.currentOrder.TOTAL).rounded();
			return true
		}
	}

	closeOrder(state = true) {
		const result = this.currentOrder.closeTicket(state)
		if(result) {
			this.currentOrder = new Ticket();
		}
		return this.currentOrder
	}
}
