import Auth from './auth';

function handleErrors(response) {
    if (!response.ok) {
        try {
            let error = response.json();
            return error.then(e => {
                if (e.message) {
                    return Promise.reject(e);
                } else {
                    return Promise.reject({error: e.error, message: e.error_description});
                }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }
    return response;
}

export class UserAPI {
    static create(body) {
        return fetch('http://185.185.71.78/person/account', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: { 'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8' }
                })
                .then(handleErrors)
                .then(response => response.json())
    }
}

export class ApplicationsAPI {
    static getApplications() {
        // return Auth.fetch('')
    }
}