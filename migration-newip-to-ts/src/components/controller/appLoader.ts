import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '15ee06e2d86546829c720dbd181da42c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
