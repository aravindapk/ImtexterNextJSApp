'use client'
import Link from 'next/link';

const routes = [
  { title: 'Home', path: '/' },
  { title: 'Image Extractor', path: '/ImageExtractor' },
  { title: 'Text Analyzer', path: '/TextAnalyzer' },
  // Add more routes as needed
];

const Navigation: React.FC = () => {

  return (
    <>
    <div className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
            {routes.map((route, index) => (
            <li key={index}>
                <Link href={route.path} className={`hover:text-cyan-300 }`}>
                    {route.title}
                </Link>
            </li>
            ))}
        </ul>
    </div>
    </>
  );
};

export default Navigation;
