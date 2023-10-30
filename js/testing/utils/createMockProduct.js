import { faker } from "@faker-js/faker";

function generateFakeProduct() {
	return {
		name: faker.commerce.productName(),
		category: faker.commerce.department(),
		price: faker.number.float({ min: 10, max: 400, precision: 0.01 }),
	};
}

function generateFakeDiscount(dis = "none") {
	const discountType = dis;
	const discount =
		discountType === "none" ? 0 : faker.helpers.rangeToNumber({ min: 10, max: 100 });
	const discountCondition =
		discountType === "none" || discountType === "percentage"
			? null
			: faker.helpers.rangeToNumber({ min: 2, max: 30 });
	return { discountType, discount, discountCondition };
}

export function generateFakeArrayCartProducts(seed, dis, iterations = 1) {
	if (isNaN(iterations) || iterations === 0) iterations = 1;
	const products = [];
	for (let i = 0; i < iterations; i++) {
		products.push(generateFakeCartProduct(seed, dis));
	}
	return products;
}

export function generateFakeCartProduct(seed, dis) {
	faker.seed(seed)
	return {
		product: generateFakeProduct(),
		discount: generateFakeDiscount(dis),
		quantity: faker.helpers.rangeToNumber({ min: 1, max: 50 }),
	};
}
