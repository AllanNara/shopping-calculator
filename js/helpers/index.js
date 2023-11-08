export function idGenerator() {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < 2) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result + "-" + Math.floor(Math.random() * 10000);
}

export function setProductName(name) {
	const words = name.split(" ")
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].charAt().toUpperCase() + words[i].slice(1).toLowerCase()
	}
	
	return words.join(" ")
}


export function numberToPriceString(number) {
	if(!number) return `$0`
	const str = number.toString()

    const [entirePart, decimalPart] = str.split(".");
    const reversedEntirePart = entirePart.split("").reverse();

    let formattedNumber = "";
    for (let i = 0; i < reversedEntirePart.length; i++) {
        if (i > 0 && i % 3 === 0) formattedNumber += ".";
        formattedNumber += reversedEntirePart[i];
    }

    formattedNumber = formattedNumber.split("").reverse().join("");

    return `$${formattedNumber}${decimalPart ? "," + decimalPart : ""}`;
}
