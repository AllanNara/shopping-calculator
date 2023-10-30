import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function createMockFile(cart) {
	const normal = cart.filter((prod) => prod.discount.discountType === "none");
	const percentage = cart.filter((prod) => prod.discount.discountType === "percentage");
	const pricePerQ = cart.filter((prod) => prod.discount.discountType === "pricePerQ");
	const percentPerQ = cart.filter((prod) => prod.discount.discountType === "percentPerQ");
	const inXUnity = cart.filter((prod) => prod.discount.discountType === "inXUnity");

	const sortCart = {
		normal,
		percentage,
		pricePerQ,
		percentPerQ,
		inXUnity,
	};

	fs.writeFile(path.join(__dirname, "cart.json"), JSON.stringify(sortCart, null, 2))
		.then(() => console.log("file created successfully"))
		.catch((err) => console.log(`Fatal error: ${err}`));
}