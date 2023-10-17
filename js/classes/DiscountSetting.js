export default class DiscountSetting {
	constructor({ discountType = "none", discount = 0, discountCondition = null }) {
		this.type = discountType;
		this.discount = discount;
		this.condition = discountCondition;
	}
}
