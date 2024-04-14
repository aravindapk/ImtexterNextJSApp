import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">
        Imtexter for you
      </h1>
      <Link href='/ImageExtractor' className="text-blue-500 hover:text-blue-700 mb-4">Image Extractor
      </Link>
      <Link href='/TextAnalyzer' className="text-blue-500 hover:text-blue-700">Text Analyzer
      </Link>
    </main>
  )
}
