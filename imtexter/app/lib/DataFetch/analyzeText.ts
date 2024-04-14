'use server'

import { TextAnalyzerData } from "@/app/TextAnalyzer/textAnalyzedData";
import { TextAnalyzerRequest } from "@/app/TextAnalyzer/textAnalyzerRequest";

let initialData: TextAnalyzerData = {
    wordCount: 0,
    topWords: [],
    dataFetchStatus: 'ok',
};
export async function getAnalyzedTextData (textRequestData: TextAnalyzerRequest) {
    try {
        const response = await fetch('http://phototextapi/api/TextAnalyzer/AnalyzeTextFromHtmlDocument',{
          method: 'POST',
          body: JSON.stringify(textRequestData),
          headers: {
            'content-type': 'application/json'
          }
        })
        console.log(response)
        if(response.ok){
            let data : TextAnalyzerData = await response.json();
            return data;
        }else{
          console.log("Oops! Something is wrong.")
          return initialData = {dataFetchStatus : 'not ok', topWords : [], wordCount : 0};
        }
      } catch (error) {
          console.log(error)
          return initialData = {dataFetchStatus : 'not ok', topWords : [], wordCount : 0};;
      }
}