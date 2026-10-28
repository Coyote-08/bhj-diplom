/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    try {
        if (options.method === 'GET') {
            let queryString = '';

            for (let i in options.data) {

                queryString += i + '=' + options.data[i] + '&';
            }

            xhr.open('GET', options.url + '?' + queryString);
            xhr.send();
        }

        else {
            const formData = new FormData();

            for (let i in options.data) {

                formData.append(i, options.data[i]);
            }

            xhr.open(options.method, options.url);
            xhr.send(formData);
        }
    }
    catch (e) {
        options.callback(e);
    }

    xhr.onload = () => {
        options.callback(null, xhr.response);
    };
};