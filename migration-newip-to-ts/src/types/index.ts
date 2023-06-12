export type NewsArticle = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type NewsSource = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type NewsArticlesResponse = {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
};

export type NewsSourcesResponse = {
    status: string;
    sources: NewsSource[];
};

export enum ResponseErrorCodes {
    'BadRequest' = 400,
    'Unauthorized' = 401,
}

export type Endpoint = 'everything' | 'sources';

export type UrlOptions = Record<string, string>;

export type FetchCallback<T> = (data: T) => void;
