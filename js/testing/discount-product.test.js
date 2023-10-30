import ProductInCart from "../classes/ProductInCart.js";
// import mockProducts from "./utils/fake_cart.js";

import fs from "fs"
const mockProducts = JSON.parse(await fs.promises.readFile("./js/testing/utils/fake_cart.json", "utf-8"))

Number.prototype.rounded = function () {
	return Number(this.toFixed(2));
};

const { normal, percentage, pricePerQ, percentPerQ, inXUnity } = mockProducts;

describe("Discount applied", () => {
	let product1, product2, product3, product4, product5;

	describe("normal: No se aplica descuento", () => {
		it("product1", () => {
			product1 = new ProductInCart(normal[0]).current;
			expect(product1.total).toBe(product1.subtotal);
		});
		it("product2", () => {
			product2 = new ProductInCart(normal[1]).current;
			expect(product2.total).toBe(product2.subtotal);
		});
		it("product3", () => {
			product3 = new ProductInCart(normal[2]).current;
			expect(product3.total).toBe(product3.subtotal);
		});
		it("product4", () => {
			product4 = new ProductInCart(normal[3]).current;
			expect(product4.total).toBe(product4.subtotal);
		});
		it("product5", () => {
			product5 = new ProductInCart(normal[4]).current;
			expect(product5.total).toBe(product5.subtotal);
		});
	});

	describe("percentage: Se aplica descuento porcentual", () => {
		it("product1", () => {
			product1 = new ProductInCart(percentage[0]).current;
			const desc = (product1.subtotal * product1.discountBases.discount) / 100;
			expect(product1.total).toBe((product1.subtotal - desc).rounded());
			expect(product1.reduction).toBe((product1.total - product1.subtotal).rounded());
		});
		it("product2", () => {
			product2 = new ProductInCart(percentage[1]).current;
			const desc = (product2.subtotal * product2.discountBases.discount) / 100;
			expect(product2.total).toBe((product2.subtotal - desc).rounded());
			expect(product2.reduction).toBe((product2.total - product2.subtotal).rounded());
		});
		it("product3", () => {
			product3 = new ProductInCart(percentage[2]).current;
			const desc = (product3.subtotal * product3.discountBases.discount) / 100;
			expect(product3.total).toBe((product3.subtotal - desc).rounded());
			expect(product3.reduction).toBe((product3.total - product3.subtotal).rounded());
		});
		it("product4", () => {
			product4 = new ProductInCart(percentage[3]).current;
			const desc = (product4.subtotal * product4.discountBases.discount) / 100;
			expect(product4.total).toBe((product4.subtotal - desc).rounded());
			expect(product4.reduction).toBe((product4.total - product4.subtotal).rounded());
		});
		it("product5", () => {
			product5 = new ProductInCart(percentage[4]).current;
			const desc = (product5.subtotal * product5.discountBases.discount) / 100;
			expect(product5.total).toBe((product5.subtotal - desc).rounded());
			expect(product5.reduction).toBe((product5.total - product5.subtotal).rounded());
		});
	});

	describe("pricePerQ: Se aplica un nuevo precio por cantidad", () => {
		it("product1", () => {
			product1 = new ProductInCart(pricePerQ[0]).current;
			expect(product1.total).toBe(3800);
			expect(product1.reduction).toBe(-1281.36);
		});
		it("product2", () => {
			product2 = new ProductInCart(pricePerQ[1]).current;
			expect(product2.total).toBe(4409.65);
			expect(product2.reduction).toBe(-3964.45);
		});
		it("product3", () => {
			product3 = new ProductInCart(pricePerQ[2]).current;
			expect(product3.total).toBe(6693.51);
			expect(product3.reduction).toBe(0);
		});
		it("product4", () => {
			product4 = new ProductInCart(pricePerQ[3]).current;
			expect(product4.total).toBe(4199);
			expect(product4.reduction).toBe(-638.01);
		});
		it("product5", () => {
			product5 = new ProductInCart(pricePerQ[4]).current;
			expect(product5.total).toBe(1065);
			expect(product5.reduction).toBe(-360.75);
		});
	});

	describe("percentPerQ: Se aplica un descuento por cantidad", () => {
		it("product1", () => {
			product1 = new ProductInCart(percentPerQ[0]).current;
			expect(product1.total).toBe(2258.23);
			expect(product1.reduction).toBe(-922.37);
		});
		it("product2", () => {
			product2 = new ProductInCart(percentPerQ[1]).current;
			expect(product2.total).toBe(370.75);
			expect(product2.reduction).toBe(0);
		});
		it("product3", () => {
			product3 = new ProductInCart(percentPerQ[2]).current;
			expect(product3.total).toBe((product3.subtotal - 3273.64).rounded());
			expect(product3.reduction).toBe(-3273.64);
		});
		it("product4", () => {
			product4 = new ProductInCart(percentPerQ[3]).current;
			expect(product4.total).toBe((product4.subtotal - 448.26).rounded());
			expect(product4.reduction).toBe(-448.26);
		});
		it("product5", () => {
			product5 = new ProductInCart(percentPerQ[4]).current;
			expect(product5.total).toBe((product5.subtotal - 9386.09).rounded());
			expect(product5.reduction).toBe(-9386.09);
		});
	});

	describe("inXUnity: Se aplica un descuento en cierta unidad 'x' ", () => {
		it("product1", () => {
			product1 = new ProductInCart(inXUnity[0]).current;
			const notapply = 306.76 * 42;
			const apply = (306.76 - 202.46) * 3;
			const aux = (notapply + apply).rounded(); // 13196.82
			expect(product1.total).toBe(aux);
			expect(product1.reduction).toBe(-607.38);
		});
		it("product2", () => {
			product2 = new ProductInCart(inXUnity[1]).current;
			const notapply = 333.05 * 8;
			const apply = (333.05 - 36.64) * 7;
			const aux = (notapply + apply).rounded(); // 4739.27
			expect(product2.total).toBe(aux);
			expect(product2.reduction).toBe(-256.48);
		});
		it("product3", () => {
			product3 = new ProductInCart(inXUnity[2]).current;
			const notapply = 174.9 * 21;
			const apply = (174.9 - 169.65) * 1;
			const aux = (notapply + apply).rounded(); // 3678.15
			expect(product3.total).toBe(aux);
			expect(product3.reduction).toBe(-169.65);
		});
		it("product4", () => {
			product4 = new ProductInCart(inXUnity[3]).current;
			const notapply = 324.96 * 39;
			const apply = (324.96 - 282.72) * 2;
			const aux = (notapply + apply).rounded(); //12,757.92
			expect(product4.total).toBe(aux);
			expect(product4.reduction).toBe(-565.44);
		});
		it("product5", () => {
			product5 = new ProductInCart(inXUnity[4]).current;
			const notapply = 205.89 * 13;
			const apply = 0;
			const aux = (notapply + apply).rounded(); // 2676.57
			expect(product5.total).toBe(aux);
			expect(product5.reduction).toBe(0);
		});
	});
});
