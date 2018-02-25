
class Shortener {

    apiBaseUrl;

    constructor() {
        this._apiBaseUrl = 'http://localhost:5000/api/';
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


}

export default Shortener;