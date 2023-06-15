import Loader from './loader';
import { API_BASE_LINK, API_KEY } from '../../env';

class AppLoader extends Loader {
    constructor() {
        super(API_BASE_LINK, {
            apiKey: API_KEY, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
