import { Metadata } from 'next';
import { fetchCachedData } from '@/lib/data-fetching';

// Hybrid Rendering (ISR) - Content is cached but regenerated periodically
export const revalidate = 30; // Revalidates every 30 seconds

export const metadata: Metadata = {
  title: 'Hybrid Page (ISR)',
  description: 'This page uses Incremental Static Regeneration',
};

// Function to fetch data from API with caching
async function fetchNewsData() {
  try {
    // Using fetch with revalidation (will be cached for ISR with 30s revalidation)
    const data = await fetchCachedData(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/data?type=fast`, 30);
    
    return {
      id: data.id,
      headline: `Latest News ${Math.floor(Math.random() * 100)}`,
      author: `Author ${Math.floor(Math.random() * 20)}`,
      timestamp: data.timestamp,
      content: 'This content will be regenerated every 30 seconds to ensure freshness without impacting performance.',
      views: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 100),
      apiMessage: data.message
    };
  } catch (error) {
    // Fallback for build time or API errors
    console.warn('API fetch failed, using fallback data:', error);
    return {
      id: Math.floor(Math.random() * 1000),
      headline: `Latest News ${Math.floor(Math.random() * 100)}`,
      author: `Author ${Math.floor(Math.random() * 20)}`,
      timestamp: new Date().toISOString(),
      content: 'This content will be regenerated every 30 seconds to ensure freshness without impacting performance.',
      views: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 100),
      apiMessage: 'Fallback data - API unavailable during build'
    };
  }
}

export default async function HybridPage() {
  const newsData = await fetchNewsData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Hybrid Page (ISR)</h1>
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h2 className="text-xl font-semibold text-purple-800 mb-2">Incremental Static Regeneration (ISR)</h2>
        <p className="text-gray-700 mb-4">
          This page combines the benefits of static generation with periodic updates. 
          It serves cached content but regenerates every 30 seconds to ensure freshness.
        </p>
        
        <div className="bg-white p-4 rounded border border-gray-300 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">News Article</h3>
          <div className="space-y-3">
            <p className="font-mono text-sm"><strong>ID:</strong> {newsData.id}</p>
            <p className="font-mono text-sm"><strong>Headline:</strong> {newsData.headline}</p>
            <p className="font-mono text-sm"><strong>Author:</strong> {newsData.author}</p>
            <p className="font-mono text-sm"><strong>Last Updated:</strong> {newsData.timestamp}</p>
            <p className="font-mono text-sm"><strong>Views:</strong> {newsData.views}</p>
            <p className="font-mono text-sm"><strong>Comments:</strong> {newsData.comments}</p>
            <p className="font-mono text-sm"><strong>API Message:</strong> {newsData.apiMessage}</p>
            <p className="mt-3 text-gray-600">{newsData.content}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Pros</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Fast initial load</li>
              <li>Fresh content periodically</li>
              <li>Balanced performance/cost</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Cons</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Stale content until revalidation</li>
              <li>Complex cache management</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Use Cases</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>News websites</li>
              <li>E-commerce listings</li>
              <li>Event pages</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">ISR Configuration</h3>
          <p className="text-sm text-gray-700">
            <strong>Revalidation time:</strong> 30 seconds<br/>
            <strong>Strategy:</strong> Incremental Static Regeneration<br/>
            <strong>Cache behavior:</strong> Static HTML served until revalidation period expires
          </p>
        </div>
      </div>
    </div>
  );
}