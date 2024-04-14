'use client'
import React, {useRef, useState } from 'react';
import { Photos } from './Photos';
import { getImages } from '../lib/DataFetch/fetchImage';
import PhotoGallery from '../Components/PhotoGallery';
import Loader from '../Components/Loader';
import { clearImageCache } from '../lib/DataFetch/clearRefrechImages';
import { sanitizeUserInput } from '../Components/SanitizeUserInput';
import validator from 'validator';
import StatusMessage from '../Components/StatusMessage';
import { applyPrevCusrorPointer } from '../lib/Utils/cursorCurator';
import Dropdown from '../Components/DropDown';

let defaultPhoto : Photos ={
    imageCount : 0,
    items : [],
    status : 'Its Empty Here!'
}

const ImageExtractor: React.FC = () => {
  const [htmlUrl, setApiUrl] = useState<string>('');
  const [images , setImages] =useState<Photos>(defaultPhoto);
  const [loading, setLoading] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState<boolean>(false);
  const [visibleItemCount, setVisibleItemCount] = useState<number>(10);
  const [buttonDisabled, setButtonDisabled] = useState(true); 
  const [statusMessage, setStatusMessage] = useState('');
  const [refreshButtonText, setRefreshButtonText] = useState('Refresh');
  const [perPage, setPerPage] = useState(10);
  const inputRef = useRef(null);

  let enabledClassName = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  let disabledClassName = "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50";
  let enabledRefreshClass = "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 mt-2 ml-2"
  let disabledRefreshClass = "bg-gray-300 rounded-md cursor-not-allowed opacity-50 text-sm px-4 py-2 text-center me-2 mb-2 mt-2 ml-2"
  const handleFetchImages = async () => {
    if (htmlUrl) {
        setImages(defaultPhoto);
        if(validator.isURL(htmlUrl))
            {
                setLoading(true);
                const data = await getImages(htmlUrl);  
                setImages(data);
                setVisibleItemCount(perPage);
                if(data.imageCount > perPage)
                    {
                        setLoadMoreVisible(true);
                    }
                setLoading(false);
            }
            else
            {
                setStatusMessage('Please enter valid URL!')
            }
    }
  };

  const handlerefreshButton = async () => {
    setImages(defaultPhoto);
    setRefreshButtonText('Clearing Images..');
     if(htmlUrl)
        {
            setRefreshButtonText('Clearing Cache..');
            let cacheKey = `ImageExtractor_${htmlUrl}`
            const resp = await clearImageCache(cacheKey);
            console.log(resp);
            setRefreshButtonText('Cache Cleared');
        }
  };
    const handleInputValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const previousCursorPosition = e.target.selectionStart;
        const inputValue = await sanitizeUserInput(e.target.value);
        setApiUrl(inputValue);
        setButtonDisabled(inputValue.trim() === '');
        setRefreshButtonText('Refresh');
        applyPrevCusrorPointer(previousCursorPosition, inputRef);
    };
    const handleLoadMore = () => {
        setVisibleItemCount((prevCount) => prevCount + perPage);
      };       
      const handlePerPageChange = (value: number) => {
        setPerPage(value);
        setVisibleItemCount((prevCount) => prevCount + perPage);
      };
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          ref={inputRef}
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Enter Web URL..."
          value={htmlUrl}
          onChange={handleInputValueChange}
        />
        <button
          className= {buttonDisabled ? disabledClassName : enabledClassName}
          onClick={handleFetchImages} disabled={!htmlUrl.trim()}
        >
          Fetch Images
        </button>
        <button type="button" disabled={!htmlUrl.trim()} onClick={handlerefreshButton}
        className={buttonDisabled ? disabledRefreshClass : enabledRefreshClass}>{refreshButtonText}</button>
      </div>
      <StatusMessage statusMessage={statusMessage} />
      {loading ? (
        <Loader />
      ) : (
        <>
            <div className='pt-3 pb-3'>Total Images Fetched: {images.imageCount}</div>
           {images.imageCount > 0 &&  <Dropdown
              options={[10, 15, 20, 25, 30, 50]}
              value={perPage}
              onChange={handlePerPageChange}
            /> }  
            <PhotoGallery dataStatus={images.status} dataImages={images.items.slice(0, visibleItemCount)}/>
        </>
      )
    }
    {loadMoreVisible && images.imageCount > visibleItemCount && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageExtractor;
