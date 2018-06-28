const auth = {
    base64: 'YnJvd3NlcjoxMjM0NTY=',
    url: 'http://185.185.71.78/uaa/oauth/token'
};

export default class Auth {
    static login(params) {
        const body = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        return fetch(auth.url, {
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

        if (this.loggedIn() && !this.isExpired()) {
            headers['Authorization'] = 'Bearer ' + this.getToken().accessToken;

            return fetch(url, { headers, ...options })
                    .then(this._checkStatus)
                    .then(response => response.json());
        } else if (this.isExpired()) {
            return this.updateToken().then(() => {
                        headers['Authorization'] = 'Bearer ' + this.getToken().accessToken;

                        return fetch(url, { headers, ...options })
                                .then(this._checkStatus)
                                .then(response => response.json());
                    });
        }
    }

    static isExpired() {
        const date = new Date().getTime();
        const threeMinutes = 180000;
        const expiresIn = +this.getToken().expiresIn - threeMinutes;

        if (date > expiresIn) {
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

        return fetch(auth.url, {
                method: 'post',
                body,
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
        localStorage.setItem('expires_in', new Date().getTime() + (response.expires_in * 1000));
    }

    static getToken() {
        return {
            accessToken: localStorage.getItem('access_token'),
            refreshToken: localStorage.getItem('refresh_token'),
            expiresIn: localStorage.getItem('expires_in')
        }
    }

    static logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
    }

    static loggedIn() {
        const tokens = this.getToken();
        return !!tokens.accessToken && !!tokens.refreshToken && !!tokens.expiresIn ? true : false;
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