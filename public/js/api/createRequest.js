/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    let url = options.url;
    let body;

    if (options.method === 'GET') {

        let queryString = '';
        
        for (let i in options.data) {
            queryString += i + '=' + options.data[i] + '&';
        }
        url += '?' + queryString;
    } else {

        body = new FormData();

        for (let i in options.data) {
            body.append(i, options.data[i]);
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(body);
    } catch (e) {
        options.callback(e);
    }

    xhr.onload = () => {
        options.callback(null, xhr.response);
    };
};