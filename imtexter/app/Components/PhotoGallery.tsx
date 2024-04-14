import React, { useEffect, useState } from 'react'
import { Photo } from '../ImageExtractor/Photos';
import StatusMessage from './StatusMessage';
interface ImageGalleryProps {
    dataImages : Photo[] ;
    dataStatus : string;
  }

 
const PhotoGallery : React.FC<ImageGalleryProps> = ({dataImages, dataStatus}) => {
    
    if(dataImages && dataImages.length > 0)
        {
            return (
                <div className="grid grid-cols-3 gap-4">
                    {
                       dataImages.map((image) => (
                        <div key={image.name} className="relative">
                          <img src={image.src} alt={`Image ${image.name}`} width={300} height={200}
                          className="rounded-lg transition duration-300 transform hover:scale-105"/>
                          <div className="absolute inset-0 bg-cyan-200 opacity-0 hover:opacity-50 transition duration-300 rounded-lg"></div>
                        </div>
                      ))        
                    }
                </div>
              )
        }
    else {
        return (
                <StatusMessage statusMessage={dataStatus} />
        )
    }
  
}

export default PhotoGallery