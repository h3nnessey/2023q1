export type NewsArticle = {
    source: NewsSource;
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
};
