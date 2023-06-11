import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '2a2635d966c244a097f6c71fcc7d638d', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
