const limit = '7';
const page = '1';
const baseUrl = 'http://127.0.0.1:3000';

interface Car {
  id: number;
  name: string;
  color: string;
}

const getUrl = (base: string, params: [string, string][]): URL => {
  const url = new URL(base);

  params.forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url;
};

export class Api {
  static async getCars() {
    try {
      const url: URL = getUrl(`${baseUrl}/garage`, [
        ['_page', page],
        ['_limit', limit],
      ]);

      const response: Response = await fetch(url);
      const data: Car[] = await response.json();

      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('Run mock server first');
      }
    }
  }
}
