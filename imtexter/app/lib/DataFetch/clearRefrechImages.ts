'use server'
export async function clearImageCache (key: string) {
    let response = await fetch(`http://phototextapi/api/ClearApiCache?key=${key}`)
    let data = await response.json();
    return data;
}