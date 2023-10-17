import Product from "./Product.js";
import DiscountSetting from "./DiscountSetting.js";

Number.prototype.rounded = function() {
	return Number(this.toFixed(2));
}

export default class ProductInCart {
	static currentId = 0;

	constructor({
		name,
		category,
		price,
		discount,
		discountType,
		discountCondition,
		quantity = 1,
	}) {
		this.id = ++ProductInCart.currentId;
		this.product = new Product({ name, category, price });
		this.discountBases = new DiscountSetting({ discountType, discount, discountCondition });
		this.quantity = quantity;
		this.subtotal = (this.product.price * this.quantity).rounded();
		this.reduction = 0;
		this.total = null;
		this.calculateDiscount();
	}

	get current() {
		return {
			id: this.id,
			product: this.product,
			discountBases: this.discountBases,
			quantity: this.quantity,
			subtotal: this.subtotal,
			reduction: this.reduction,
			total: this.total,
		};
	}
	
	calculateDiscount = () => {

		switch (this.discountBases.type) {
			case "none":
				this.total = this.subtotal;
				break;
			case "percentage":
				this.total = this.subtotal - (this.subtotal * this.discountBases.discount) / 100;
				break;
			default:
				if (this.quantity >= this.discountBases.condition) {
					switch (this.discountBases.type) {
						case "pricePerQ":
							this.total = this.discountBases.discount * this.quantity;
							break;
						case "percentPerQ":
							this.total = this.subtotal - (this.subtotal * this.discountBases.discount) / 100;
							break;
						case "inXUnity":
							let priceInXUnity = this.product.price - (this.product.price * this.discountBases.discount) / 100;
							priceInXUnity = priceInXUnity.rounded();
							const affectedProducts = Math.floor(this.quantity / this.discountBases.condition);
							const applyDiscount = affectedProducts * priceInXUnity;						
							this.total = (this.quantity - affectedProducts) * this.product.price + applyDiscount;
							break;
						default:
							if(this.discountBases.type !== "none") throw new Error("Invalid type discount");
							break
					}
				} else {
					this.total = this.subtotal;
				}
			}

		this.total = this.total.rounded()
		this.subtotal = this.subtotal.rounded()
		this.reduction = (this.total - this.subtotal).rounded()
	};
}
