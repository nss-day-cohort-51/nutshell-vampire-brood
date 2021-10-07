const remoteURL = "http://localhost:8088";

export default class APIManager {
    getById(target, id, expandArray) {
        let expandQuery = expandArray.length > 0 ? "?" : "";
        if (expandArray.length > 0) {
            expandArray.forEach((elem) => {
                expandQuery += `_expand=${elem}&`;
            });
        }
        let url = `${remoteURL}/${target}/${id}/${expandQuery}`;
        return fetch(url).then((res) => res.json());
    }

    getAll(target, expandArray) {
        let expandQuery = expandArray.length > 0 ? "?" : "";
        if (expandArray.length > 0) {
            expandArray.forEach((elem) => {
                expandQuery += `_expand=${elem}&`;
            });
        }
        let url = `${remoteURL}/${target}/${expandQuery}`;
        return fetch(url).then((res) => res.json());
    }

    getRandomId(target) {
        return fetch(`${remoteURL}/${target}`)
            .then((result) => result.json())
            .then((objArray) => {
                const randomIndex = Math.floor(Math.random() * objArray.length);
                const randomObj = objArray[randomIndex];
                return randomObj.id;
            });
    }

    delete(target, id) {
        return fetch(`${remoteURL}/${target}/${id}`, {
            method: "DELETE",
        }).then((result) => result.json());
    }

    addEntry(target, newEntry) {
        return fetch(`${remoteURL}/${target}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEntry),
        }).then((response) => response.json());
    }

    updateEntry(target, updatedEntry) {
        return fetch(`${remoteURL}/${target}/${updatedEntry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEntry),
        }).then((response) => response.json());
    }
}
