import { Endpoint, ResponseErrorCodes, UrlOptions, FetchCallback } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: UrlOptions;

    constructor(baseLink: string, options: UrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: Endpoint } & Partial<{ options: UrlOptions }>,
        callback: FetchCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseErrorCodes.BadRequest || res.status === ResponseErrorCodes.Unauthorized)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: UrlOptions, endpoint: Endpoint): string {
        const urlOptions: UrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: Endpoint, callback: FetchCallback<T>, options: UrlOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
