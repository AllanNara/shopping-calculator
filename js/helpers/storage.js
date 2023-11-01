export default function storage(method, from) {
	switch (method) {
		case "get":
			if(from === "local") return getToLocal
			else if(from === "session") return getToSession
			else throw new TypeError("Storage: The selected location is not valid")
		case "set" || "save":
			if(from === "local") return saveToLocal
			else if(from === "session") return saveToSession
			else throw new TypeError("Storage: The selected location is not valid")
		default:
			throw new TypeError("Storage: The selected method is not valid")
	}
}

function saveToLocal(key, doc) {
	const toJson = JSON.stringify(doc, null, 2)
	localStorage.setItem(key, toJson)
	return true
}

function getToLocal(key) {
	const json = localStorage.getItem(key)
	const doc = JSON.parse(json)
	return doc
}

function saveToSession(key, session) {
	const toJson = JSON.stringify(session, null, 2)
	sessionStorage.setItem(key, toJson)
	return true
}

function getToSession(key) {
	const json = sessionStorage.getItem(key)
	const session = JSON.parse(json)
	return session
}
