import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Next.js Rendering Strategies Demo
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the power of Next.js rendering: Static Site Generation (SSG), Server-Side Rendering (SSR), and Hybrid Rendering (ISR)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Static (SSG)</h2>
            <p className="text-gray-600">Pre-rendered at build time for maximum performance</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Dynamic (SSR)</h2>
            <p className="text-gray-600">Rendered on each request for real-time data</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Hybrid (ISR)</h2>
            <p className="text-gray-600">Best of both worlds with incremental regeneration</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/static" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Static Page
          </Link>
          <Link 
            href="/dynamic" 
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View Dynamic Page
          </Link>
          <Link 
            href="/hybrid" 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View Hybrid Page
          </Link>
        </div>
      </div>
    </div>
  );
}