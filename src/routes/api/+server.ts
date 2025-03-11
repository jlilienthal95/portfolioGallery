import { json } from '@sveltejs/kit';
import fs from "fs/promises";
import path from "path";

//Cache image list from Github here to avoid rate limiting
const CACHE_FILE = path.resolve("static/imagesCache.json");
//Wait this long - 15M - before making another API call to Github
const CACHE_TIME = 15 * 60 * 1000;
const owner = 'jlilienthal95';
const repo = 'portfolioGallery';
const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/ed1dc0dfab6ed82bf2f81816a101f585cf5e6ead`

export async function GET() {
    //try to fetch images
    try {
        let cacheData = null;
        //try to read cache file with image urls
        try {
            cacheData = JSON.parse(await fs.readFile(CACHE_FILE, "utf-8"));
        } catch(err) {
            console.log('cache not found... fetching from Github.')
        }

        //if cache is available, read urls from cacheData
        if(cacheData && (Date.now() - cacheData.timestamp) < CACHE_TIME){
            console.log('timestamp:', new Date(cacheData.timestamp));
            console.log('Date.now() - cacheData.timestamp', Date.now() - cacheData.timestamp);
            console.log('Date.now() - cacheData.timestamp < CACHE_TIME:', (Date.now() - cacheData.timestamp) < CACHE_TIME);
            console.log('Serving cached data...');
            return json(cacheData.imgs);
        }
        
        //if no cache, or CACHE_TIME has been exceeded, fetch from GitHub
        console.log('Fetching new data from GitHub...');
        console.log('timestamp:', new Date(cacheData.timestamp));
        console.log('Date.now() - cacheData.timestamp', Date.now() - cacheData.timestamp);
        console.log('Date.now() - cacheData.timestamp < CACHE_TIME:', (Date.now() - cacheData.timestamp) < CACHE_TIME);
        const response = await fetch(url)
        console.log('url:', url);
        if (!response.ok) {
            return json({ error: 'Failed to fetch file list' }, { status: response.status });
        }

        const imgs = await response.json();

        //update cache for next fetch
        await fs.writeFile(CACHE_FILE, JSON.stringify({ imgs, timestamp: Date.now()}, null, 2))

        return json(imgs);
    } catch (err){
        console.error("Error fetching images:", err);
        return json({ error: "Failed to load images" }, { status: 500 });
    }

}