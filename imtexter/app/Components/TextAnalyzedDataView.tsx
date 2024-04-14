import React from 'react'
import { TextAnalyzerData } from '../TextAnalyzer/TextAnalyzedData'

interface TextAnalzerProps {
    dataAnalyzer : TextAnalyzerData
}
const TextAnalyzedDataView : React.FC<TextAnalzerProps> = ({dataAnalyzer}) => {
    if(dataAnalyzer)
        {
            return (
                <div className="container mx-auto px-4">
      <div className="text-lg font-semibold my-4">
        Word Count: {dataAnalyzer.wordCount}
      </div>
      <div className="mb-4">
        Data Fetch Status: <span className={`${dataAnalyzer.dataFetchStatus === 'Loading' ? 'text-blue-500' : dataAnalyzer.dataFetchStatus === 'Success!' ? 'text-green-500' :  'text-red-500'}`}>{dataAnalyzer.dataFetchStatus}</span>
      </div>
      <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
              Word
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {dataAnalyzer.topWords && dataAnalyzer.topWords.map((pair, index) => (
            <tr key={index} className="bg-white">
              <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {pair.key}
              </td>
              <td className="px-5 py-2 border-b border-gray-200 text-sm">
                {pair.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
              )
        }
  else {
        return (
            <div>Analyzer Data is empty!</div>
        )
  }
}

export default TextAnalyzedDataView