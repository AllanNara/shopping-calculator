import Ticket from "./Ticket.js";

export default class UserSession {
	constructor(useCash = false, cash = 0) {
		this.initializedCash = useCash;
		this.initialCash = cash;
		this.availableCash = 0;
		this.currentOrder = new Ticket();
	}

	get current() {
		return {
			initial: this.initialCash,
			available: this.availableCash,
			order: this.currentOrder.current,
			toPay: this.currentOrder.TOTAL
		}
	}

	updateCash = (newCash) => {
		this.initialCash = newCash;
		this.availableCash = newCash;
		if(!this.initializedCash) {
			this.changeInitializedCashFlag()
		};
		this.updateToPay();
	};

  changeInitializedCashFlag = () => {
    this.initializedCash = !this.initializedCash
		this.updateToPay();
		return this.initializedCash;
  }

	addDiscountToOrder = (discount) => {
		this.currentOrder.generalDiscount = discount;
		this.updateToPay();
	};

	updateToPay() {
		const expenses = this.currentOrder.calculateTotalToPay();
		if (this.initializedCash) {	
			this.availableCash -= expenses;
			if(this.availableCash < 0) {
				const next = confirm("¡Los gastos superan el dinero disponible!\n ¿Desea remover el ultimo producto?");
				if(next) {
					this.currentOrder.removeProductToCart()
					this.currentOrder.calculateTotalToPay()
				}
			}
		}
	}
}
