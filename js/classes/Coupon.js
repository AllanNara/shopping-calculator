export default class Coupon {
	constructor(discount, code = "000") {
		this.code = code
		this.discount = discount;
		this.applied = false;
	}
}
