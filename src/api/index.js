import Auth from './auth';
import { URL, API_TOKENS } from './secrets';
import { isNil } from 'ramda';

const url = URL.path.api;

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
            }).catch(e => Promise.reject(e));
        } catch (err) {
            return Promise.reject({message: err.message});
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
        return fetch(`${url}/person/account${str}`, {
                    method: 'post',
                    headers: { 'Accept': 'application/json;charset=UTF-8', 'Content-Type': 'application/json;charset=UTF-8' }
                })
                .then(handleErrors)
                .then(response => response.json());
    }

    static getCurrentPerson() {
        return Auth.fetch(`${url}/person/current`)
                .then(response => response.json());
    }

    static get(id) {
        return Auth.fetch(`${url}/person/${id}`)
                .then(response => response.json());
    }

    static signin(phone) {
        return fetch(`${url}/person/sign-in?phone=${phone}`, { method: 'post' }).then(handleErrors);
    }

    static passwordRecovery(phone) {
        return fetch(`${url}/person/recover-password?phone=${phone}`, { method: 'post' }).then(handleErrors);
    }
}

export class WorkerAPI {
    static get(id) {
        return Auth.fetch(`${url}/worker/?id=${id}`)
                .then(response => response.json());
    }
}

export class LoanAPI {
    static getAllByPersonId() {
        return Auth.fetch(`${url}/loan/person`)
                .then(response => response.json());
    }

    static getLoan(number) {
        return Auth.fetch(`${url}/loan/?id=${number}`)
                .then(response => response.json());
    }

    static getLoans(params) {
        return Auth.fetch(
            `${url}/loan/all?page=${params.page}&sort=${params.property},${params.direction}&size=${params.size}`,
            { method: 'post', body: JSON.stringify(params.body) }
        ).then(response => response.json());
    }
}

export class ApplicationAPI {
    static getApplications(params) {
        return Auth.fetch(
            `${url}/application/all?page=${params.page}&sort=${params.property},${params.direction}&size=${params.size}`,
            { method: 'post', body: JSON.stringify(params.body) }
        ).then(response => response.json());
    }

    static findAllByPersonId() {
        return Auth.fetch(`${url}/application/person`)
                .then(response => response.json());
    }
}

export class FacilityAPI {
    static get(id) {
        return Auth.fetch(`${url}/facility/?cadasterOrId=${id}`)
                .then(response => response.json());
    }

    static addFacilityToApplication(id, body) {
        return Auth.fetch(`${url}/facility/application/${id}`, { method: 'post', body: JSON.stringify(body) })
                .then(response => response.json());
    }

    static updateAssessment(id, assessment) {
        return Auth.fetch(`${url}/facility/${id}/assessment`, { method: 'put', body: JSON.stringify(assessment) })
                .then(response => response.json());
    }

    static changeCadaster(id, newCadaster) {
        return Auth.fetch(`${url}/facility/?id=${id}&newCadaster=${newCadaster}`, { method: 'put' })
                .then(response => response.json());
    }

    static requestStatement(id) {
        return Auth.fetch(`${url}/facility/${id}/statement`, { method: 'post' });
    }

    static updateFacility(id, entityName, method, body, part) {
        switch (method) {
            case 'put':
                return Auth.fetch(`${url}/facility/${id}/${entityName}/${body.id}?part=${part}`, { method, body: JSON.stringify(body) })
                            .then(response => response);
            case 'delete':
                return Auth.fetch(`${url}/facility/${id}/${entityName}/${body.id}`, { method, body: JSON.stringify(body) })
                            .then(response => response);
            default: return;
        }
    }

    static updateAdditional(id, additional) {
        return Auth.fetch(`${url}/facility/${id}/additional`, { method: 'put', body: JSON.stringify(additional) });
    }
}

export class DocumentAPI {
    static getEntityDocuments(id) {
        return Auth.fetch(`${url}/document/${id}`)
                .then(response => response.json());
    }
}

export function GetFullName(person) {
    if (!person) return person;
    return !person.surname && !person.patronymic
    ? person.name
    : `${person.surname ? person.surname : ''} ${person.name ? person.name : ''} ${person.patronymic ? person.patronymic : ''}`.replace(/\s{2,}/g, ' ').trim();
}

export function ParsePhone(unparsedPhone) {
    if (!unparsedPhone || !(/^[0-9/+-\s]*$/).test(unparsedPhone)) return null;
    let phone, phone1, phone2, phone3, phone4;
    unparsedPhone = unparsedPhone.toString();

    if (!isNil(unparsedPhone)) {
        if (unparsedPhone.length === 7) {
            phone1 = unparsedPhone.slice(0, 3);
            phone2 = unparsedPhone.slice(3, 5);
            phone3 = unparsedPhone.slice(5, 7);
            phone = `+7 ${phone1}-${phone2}-${phone3}`;
        } else if (unparsedPhone.length === 10) {
            phone1 = unparsedPhone.slice(0, 3);
            phone2 = unparsedPhone.slice(3, 6);
            phone3 = unparsedPhone.slice(6, 8);
            phone4 = unparsedPhone.slice(8, 10);
            phone = `+7 ${phone1} ${phone2}-${phone3}-${phone4}`;
        } else {
            phone = `+7 ${unparsedPhone}`;
        }
    }
    return phone;
}