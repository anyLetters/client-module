import { auth } from './secrets';

const apiURL = process.env.NODE_ENV === 'production' ? auth.url.prod : auth.url.dev;

export default class Auth {
    static login(params) {
        const body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        return fetch(apiURL, {
                    method: 'post',
                    body,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                        'Authorization': `Basic ${auth.base64}`
                    }
                })
                .then(this._checkStatus)
                .then(response => response.json())
                .then(response => {
                    this.setToken(response);
                    return Promise.resolve(response);
                });
    }

    static fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn() && !this.isRefresh()) {
            headers['Authorization'] = 'Bearer ' + this.getToken().accessToken;

            return fetch(url, { headers, ...options })
                    .then(this._checkStatus);
        } else if (this.isRefresh()) {
            return this.updateToken().then(() => {
                headers['Authorization'] = 'Bearer ' + this.getToken().accessToken;

                return fetch(url, { headers, ...options })
                        .then(this._checkStatus);
            });
        }
    }

    static isExpired() {
        const date = new Date().getTime();
        const expiresIn = +this.getToken().expiresIn;

        if (date > expiresIn) {
            return true;
        } else {
            return false;
        }
    }

    static isRefresh() {
        const date = new Date().getTime();
        const refreshIn = +this.getToken().refreshIn;

        if (date > refreshIn) {
            return true;
        } else {
            return false;
        }
    }

    static updateToken() {
        const body = {
            grant_type: 'refresh_token',
            refresh_token: this.getToken().refreshToken
        };

        const encodedBody = Object.keys(body).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
        }).join('&');

        return fetch(auth.url, {
                method: 'post',
                body: encodedBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': `Basic ${auth.base64}`
                }
            })
            .then(this._checkStatus)
            .then(response => response.json())
            .then(json => this.setToken(json));
    }

    static setToken(response) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('refresh_in', new Date().getTime() + (response.expires_in * 1000) / 2);
        localStorage.setItem('expires_in', new Date().getTime() + (response.expires_in * 1000));
    }

    static getToken() {
        return {
            accessToken: localStorage.getItem('access_token'),
            refreshToken: localStorage.getItem('refresh_token'),
            refreshIn: localStorage.getItem('refresh_in'),
            expiresIn: localStorage.getItem('expires_in')
        };
    }

    static logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('refresh_in');
        localStorage.removeItem('expires_in');
    }

    static loggedIn() {
        const tokens = this.getToken();
        return !!tokens.accessToken && !!tokens.refreshToken && !!tokens.refreshIn && !!tokens.expiresIn ? true : false;
    }

    static _checkStatus(response) {
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
}