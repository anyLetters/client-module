import Auth from './auth';
import { URL, API_TOKENS } from './secrets';

const apiURL = process.env.NODE_ENV === 'production' ? URL.prod.api : URL.dev.api;

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

export class Dadata {
    static getFIOSuggestions(query) {
        return fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio", {
                    body: JSON.stringify({ query }),
                    headers: {
                        Accept: "application/json",
                        Authorization: `Token ${API_TOKENS.dadata}`,
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                })
                .then(handleErrors)
                .then(response => response.json())
                .then(json => {
					if (json.suggestions.length > 0) {
						let suggests = json.suggestions.filter(suggestion => {
							if (query.toLowerCase().trim() === suggestion.value.toLowerCase().trim()) return suggestion;
                        });
                        return suggests.length > 0
                        ? {
                            gender: suggests[0].data.gender,
                            name: suggests[0].data.name,
                            patronymic: suggests[0].data.patronymic,
                            surname: suggests[0].data.surname
                        }
                        : {
                            gender: null,
                            name: query.trim(),
                            patronymic: null,
                            surname: null
                        };
					} else {
						return {
							gender: null,
							name: query.trim(),
							patronymic: null,
							surname: null
						};
                    }
                });
    }
}

export class PersonAPI {
    static create(body) {
        let str = '?';
        for (let key in body) {
            if (body[key]) str += `${key}=${body[key]}&`;
        }
        str = str.slice(0, str.length - 1);
        return fetch(`${apiURL}/person/account${str}`, {
                    method: 'post',
                    headers: { 'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8' }
                })
                .then(handleErrors)
                .then(response => response.json());
    }

    static getCurrentPerson() {
        return Auth.fetch(`${apiURL}/person/current`)
            .then(handleErrors)
            .then(response => response.json());
    }
}

export class LoanAPI {
    static getAllByPersonId() {
        return Auth.fetch(`${apiURL}/loan/person`)
                .then(handleErrors)
                .then(response => response.json());
    }

    static getLoan(number) {
        return Auth.fetch(`${apiURL}/loan/?id=${number}`)
                .then(handleErrors)
                .then(response => response.json());
    }
}

export class ApplicationAPI {
    static findAllByPersonId() {
        return Auth.fetch(`${apiURL}/application/person`)
                .then(handleErrors)
                .then(response => response.json());
    }
}

export function GetFullName(person) {
    return !person.surname && !person.patronymic
    ? person.name
    : `${person.surname ? person.surname : ''} ${person.name ? person.name : ''} ${person.patronymic ? person.patronymic : ''}`.replace(/\s{2,}/g, ' ');
}