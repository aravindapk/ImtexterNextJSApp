
export type KeyValuePair = {
    key: string;
    value: number;
  };
export type TextAnalyzerData = {
    wordCount : number;
    topWords : KeyValuePair[];
    dataFetchStatus : string;
}