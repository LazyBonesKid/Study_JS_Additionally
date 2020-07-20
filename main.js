//API_KEY = 'trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a';

const translateButton = document.getElementById('translate');

const text = document.getElementById('text'),
translator = document.getElementById('translator'),
key = 'trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a',
api = 'https://translate.yandex.net/api/v1.5/tr.json/translate';


const getUrl = text => api + '?' + 'key=' + key + '&text=' + text + '&lang=ru-en';

const serverResponse = text => {
    
    const url = getUrl(text);

    return fetch(url, {
        method: 'GET',
    });

};

text.addEventListener('input', () => {

    if (text.textContent.trim()) {

        serverResponse(text.textContent)
        .then(response  => response.json())
        .then(result => {
            let text = result.text;
            text = text[0];
            document.getElementById('translator').textContent = text;
        })
        .catch((error) => {
            console.error(error);
        })

    }

});




