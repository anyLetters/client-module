function handleErrors(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }
    return response.json();
}

export class User {
    static create(body) {
        return fetch('http://185.185.71.78/person/account', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json', 'accept': 'application/json;charset=UTF-8' }
                })
                .then(handleErrors)
    }
}