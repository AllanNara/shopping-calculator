import createMockFile from "./createMockFile.js"
import { generateFakeArrayCartProducts } from "./createMockProduct.js";

export default function generateCartMock(iterations, createFile = false) {
	try {
		let cart = [];
		const discountTypes = ["none", "percentage", "pricePerQ", "percentPerQ", "inXUnity"];
		for (let i = 0; i < discountTypes.length; i++) {
			const newProducts = generateFakeArrayCartProducts(i, discountTypes[i], iterations);
			cart = cart.concat(newProducts);
		}
		if (createFile) createMockFile(cart);
		return cart;
	} catch (error) {
		console.log(error);
	}
}

// generateCartMock(parseInt(process.argv[2]), true);
