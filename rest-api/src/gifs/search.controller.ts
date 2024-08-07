import { Request, Response } from "express";
import redis from '../redis-client';
import dotenv from "dotenv";

export const searchController = async (req: Request, res: Response) => {
    dotenv.config();
    const offset = req.query.offset;
    const search = req.query.search;
    const gifsCacheMinutes = process.env.GIFS_CACHE_MINUTES || 1440;
    const giphyApiKey = process.env.GIPHY_API_KEY || null;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${search}&limit=25&offset=${offset}&rating=g&bundle=messaging_non_clips`;
    const cacheKey = url;

    const recipesFromCache = await redis.client?.get(`${cacheKey}`);
    if (recipesFromCache) {
        console.log('Cache hit!');
        res.json(JSON.parse(recipesFromCache));    
    } else {
        console.log('Cache miss!');
        const response = await fetch(url);
        const recipes = await response.json();
        await redis.client?.set(`${cacheKey}`, JSON.stringify(recipes), { EX: +gifsCacheMinutes * 60});
        res.json(recipes);
    }
};
