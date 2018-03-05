
class Shortener {

    apiBaseUrl;
    _token;
    loggedIn;
    userId;
    userName;

    constructor() {
        this._apiBaseUrl = 'http://localhost:5000/api/';
        this._token = window.localStorage.getItem('shortener-token');
        this.loggedIn =  this._token !== null && this._token !== '';
    }

    shorten(longUrl, brand) {
        const resource = 'link';
        let body = {
            'long_url': longUrl
        };
        if (brand) {
            body['brand'] = brand;
        }
        return this.post(resource, body);
    }

    getLinks() {
        const resource = `users/${this.userId}/links`;
        return this.get(resource);
    }

    getLinkStats(linkId) {
        const resource = `links/${linkId}/stats`;
        return this.get(resource);
    }

    getUserStats() {
        const resource = `users/${this.userId}/stats`;
        return this.get(resource);
    }

    get(resource) {
        return this._request(resource, null, 'GET');
    }

    post(resource, data) {
        return this._request(resource, data, 'POST');
    }

    _request(resource, data, method) {
        const url = this._apiBaseUrl + resource;
        return fetch(url, {
            method: method,
            body: data ? JSON.stringify(data) : null,
            headers: this._getDefaultHeaders()
        });
    }
    
    _getDefaultHeaders() {
        const accessToken = window.localStorage.getItem('shortener-token');
        let headers = {
            "Content-Type": "application/json"
        };

        if (accessToken) {
            headers['Authentication'] =  `Bearer ${accessToken}`;
        }

        return headers;
    }

    get username() {
        return window.localStorage.getItem('shortener-username');
    }

    get email() {
        return window.localStorage.getItem('shortener-email');
    }

    get userId() {
        return window.localStorage.getItem('shortener-userid');
    }


}

export default Shortener;