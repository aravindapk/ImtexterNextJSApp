'use server'
const cacheClearApiUrl = process.env.Cache_Clear_Api_Url;
export async function clearImageCache (key: string) {
    let response = await fetch(`${cacheClearApiUrl}${key}`)
    let data = await response.json();
    return data;
}