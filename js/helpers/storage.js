export default function storage(method, from) {
	switch (method) {
		case "get":
			if(from === "local") return getToLocal
			else if(from === "session") return getToSession
			else throw new TypeError("Storage: The selected location is not valid")
		case "save":
			if(from === "local") return saveToLocal
			else if(from === "session") return saveToSession
			else throw new TypeError("Storage: The selected location is not valid")
		case "delete":
			if(from === "local") return removeToLocal
			else if(from === "session") return removeToSession
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
	const doc = json ? JSON.parse(json) : null
	return doc
}

function removeToLocal(key) {
	localStorage.removeItem(key)
	return true
}

function saveToSession(key, session) {
	const toJson = JSON.stringify(session, null, 2)
	sessionStorage.setItem(key, toJson)
	return true
}

function getToSession(key) {
	const json = sessionStorage.getItem(key)
	const session = json ? JSON.parse(json) : null
	return session
}

function removeToSession(key) {
	sessionStorage.removeItem(key)
	return true
}
