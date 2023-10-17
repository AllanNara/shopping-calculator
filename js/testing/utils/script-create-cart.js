import fs from "fs/promises";
import { faker } from "@faker-js/faker";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateFakeProduct = () => {
	return {
		name: faker.commerce.productName(),
		category: faker.commerce.department(),
		price: faker.number.float({ min: 10, max: 400, precision: 0.01 }),
	};
};

const generateFakeDiscount = (dis) => {
	const discountType = dis;
	const discount =
		discountType === "none" ? 0 : faker.helpers.rangeToNumber({ min: 10, max: 100 });
	const discountCondition = 
		discountType === "none" || discountType === "percentage" ? null : faker.helpers.rangeToNumber({ min: 2, max: 30 });
	return { discountType, discount, discountCondition };
};

const generateFakeProductInCart = (dis, iterations = 1) => {
	if (isNaN(iterations) || iterations === 0) iterations = 1;
	const products = [];
	for (let i = 0; i < iterations; i++) {
		const fakeProduct = generateFakeProduct();
		const fakeDiscount = generateFakeDiscount(dis);
		const quantity = faker.helpers.rangeToNumber({ min: 1, max: 50 });
		const newProduct = { ...fakeProduct, ...fakeDiscount, quantity };
		products.push(newProduct);
	}
	return products;
};

export async function generateCartMock(iterations) {
	try {
		let cart = [];
		const discountTypes = ["none", "percentage", "pricePerQ", "percentPerQ", "inXUnity"];
		for (let i = 0; i < discountTypes.length; i++) {
			const newProducts = generateFakeProductInCart(discountTypes[i], iterations);
			cart = cart.concat(newProducts);
		}

		const normal = cart.filter((prod) => prod.discountType === "none");
		const percentage = cart.filter((prod) => prod.discountType === "percentage");
		const pricePerQ = cart.filter((prod) => prod.discountType === "pricePerQ");
		const percentPerQ = cart.filter((prod) => prod.discountType === "percentPerQ");
		const inXUnity = cart.filter((prod) => prod.discountType === "inXUnity");

		const sortCart = {
			normal,
			percentage,
			pricePerQ,
			percentPerQ,
			inXUnity,
		};
		// console.dir({sortCart}, { depth: 100 });
		// await fs.writeFile(join(__dirname, "cart.js"), JSON.stringify(sortCart, null, 2));
		return cart
	} catch (error) {
		console.log(error);
	}
}

// generateCartMock(parseInt(process.argv[2]));
