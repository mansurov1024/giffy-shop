import { GifsApiResponse } from "./gifs-api-response";

export async function fetchTrendingGifs(offset: number, token: string): Promise<GifsApiResponse | null> {
    const response = await fetch(
        `http://localhost:3001/gifs/trending/?offset=${offset}`,
        {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,

            },
        },
    );
    if (response.status === 403) {
        const responseJson = await response.json();
        alert(responseJson.message);
        return null;
    }
    const gifs = await response.json();
    return gifs;
}

export async function fetchGifs(offset: number, searchTerm: string, token: string): Promise<GifsApiResponse | null> {
    const response = await fetch(
        `http://localhost:3001/gifs/search/?offset=${offset}&search=${searchTerm}`,
        {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,

            },
        },
    );
    if (response.status === 403) {
        const responseJson = await response.json();
        alert(responseJson.message);
        return null;
    }
    const gifs = await response.json();
    return gifs;
}