'use client'
import React, { useRef, useState } from 'react';
import Loader from '../Components/Loader';
import { clearImageCache } from '../lib/DataFetch/clearRefrechImages';
import TextAnalyzedDataView from '../Components/TextAnalyzedDataView';
import { getAnalyzedTextData } from '../lib/DataFetch/analyzeText';
import { sanitizeUserInput } from '../Components/SanitizeUserInput';
import validator from 'validator'
import StatusMessage from '../Components/StatusMessage';
import { TextAnalyzerRequest } from './textAnalyzerRequest';
import { TextAnalyzerData } from './textAnalyzedData';
import { applyPrevCusrorPointer } from '../lib/Utils/cursorCurator';

const TextAnalyzer: React.FC = React.memo(() => {
    const initialState: TextAnalyzerData = {
        wordCount: 0,
        topWords: [],
        dataFetchStatus: ''
    };
    const [htmlUrl, setApiUrl] = useState<string>('');
    const [excludedWords, setexcludedWords] = useState<string>('');
  const [analyzedData , setAnalyzedData] =useState<TextAnalyzerData>(initialState);
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true); 
  const [refreshButtonText, setRefreshButtonText] = useState('Refresh');
  const [statusMessage, setStatusMessage] = useState('');
  const inputRef = useRef(null);
  const inputRefExclude = useRef(null);
  let enabledClassName = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  let disabledClassName = "bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50";
  let enabledRefreshClass = "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 mt-2 ml-2"
  let disabledRefreshClass = "bg-gray-300 rounded-md cursor-not-allowed opacity-50 text-sm px-4 py-2 text-center me-2 mb-2 mt-2 ml-2"
  const handleTextAnalyze = async () => {
    
    setAnalyzedData(initialState);
    if (htmlUrl) {
        if(validator.isURL(htmlUrl))
            {
                setLoading(true);
                const analyzeRequest : TextAnalyzerRequest = {
                url : htmlUrl,
                excludedwords : excludedWords.trim().split(','),
        }
                const data = await getAnalyzedTextData(analyzeRequest);  
                setAnalyzedData(data);
                console.log(data);
                console.log('Fetching images from:', htmlUrl);
                setLoading(false);
            }
        else {
            setStatusMessage('Please enter valid URL!')
        }
    }
  };

  const handlerefreshButton = async () => {
    setAnalyzedData(initialState);
    setRefreshButtonText('Clearing Images..');
     if(htmlUrl && validator.isURL(htmlUrl))
        {
            setRefreshButtonText('Clearing Cache..');
            let cacheKey = `TextAnalyzer_${htmlUrl}`
            const resp = await clearImageCache(cacheKey);
            console.log(resp);
            setRefreshButtonText('Cache Cleared');
        }
  };
    const handleInputValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const previousCursorPosition = e.target.selectionStart;
        let inputValue = await sanitizeUserInput(e.target.value);
        setStatusMessage('');
        setApiUrl(inputValue);
        setButtonDisabled(inputValue.trim() === '');
        setRefreshButtonText('Refresh');
        applyPrevCusrorPointer(previousCursorPosition, inputRef);
    };
   
    const handleExcludedValueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const previousCursorPosition = e.target.selectionStart;
        const excludedTexts = await sanitizeUserInput(e.target.value);
        setexcludedWords(excludedTexts);
        applyPrevCusrorPointer(previousCursorPosition, inputRefExclude);
    };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                    type="text"
                    ref={inputRef} 
                    id="htmlUrlInputText"
                    className="flex-1 border border-gray-300 rounded px-2 py-2"
                    placeholder="Enter Web URL..."
                    value={htmlUrl}
                    onChange={handleInputValueChange}
                />
                <input
                    type="text"
                    ref={inputRefExclude} 
                    id="excludedWordText"
                    className="flex-1 border border-gray-300 rounded px-2 py-2"
                    placeholder="Enter Words to exclude with comma separated"
                    value={excludedWords}
                    onChange={handleExcludedValueChange}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                    onClick={handleTextAnalyze} 
                    disabled={buttonDisabled}
                >
                    Analyze Text
                </button>
                <button 
                    type="button" 
                    onClick={handlerefreshButton}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                    disabled={buttonDisabled}
                >
                    Refresh
                </button>
            </div>
            {statusMessage && (
                <StatusMessage statusMessage={statusMessage} statClassName="pt-3 text-red-600" />
            )}
            {loading ? (
                <Loader />
            ) : (
                analyzedData && (
                    <TextAnalyzedDataView dataAnalyzer={analyzedData}/>
                )
            )}
        </div>
  );
});

TextAnalyzer.displayName = 'TextAnalyzer';
export default TextAnalyzer;
