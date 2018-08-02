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
        return fetch('https://api.credit.club/person/account', {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: { 'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8' }
                })
                .then(handleErrors)
                .then(response => response.json());
    }
}

export class LoanAPI {
    static getAllByPersonId() {
        return Auth.fetch('https://api.credit.club/loan/person')
                .then(handleErrors)
                .then(response => response.json());
    }
}

export class ApplicationsAPI {
    static getApplications() {
        // return Auth.fetch('')
    }
}