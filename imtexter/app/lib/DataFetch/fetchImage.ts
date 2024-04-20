'use server'
import { Photos, Photo } from "@/app/ImageExtractor/Photos";

let defaultPhoto : Photos ={
    imageCount : 0,
    items : [],
    status : 'Something Went wrong please try again later.'
}

export async function getImages (htmlUrl: string) {
    try{
        let response = await fetch(`https://imagetextapi.azurewebsites.net/api/ImageExtractor/ExtractImages?url=${htmlUrl}`)
        if(response.ok){
            let photos : Photos = await response.json();
            return photos;
        }
        else{
          console.log("Oops! Something is wrong.")
          return defaultPhoto;
        }
    }
    catch(error)
    {
        console.log(error)
        return defaultPhoto;
    }
    
}