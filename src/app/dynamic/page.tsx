import { Metadata } from 'next';
import { fetchDynamicData } from '@/lib/data-fetching';

// Dynamic Rendering (SSR) - Content is rendered on each request
export const dynamic = 'force-dynamic'; // This forces server-side rendering on every request

export const metadata: Metadata = {
  title: 'Dynamic Page (SSR)',
  description: 'This page is server-side rendered on every request',
};

// Function to fetch real data from API
async function fetchUserData() {
  try {
    const data = await fetchDynamicData(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/data?type=slow`);
    
    return {
      id: data.id,
      name: `User ${Math.floor(Math.random() * 100)}`,
      timestamp: data.timestamp,
      metrics: {
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100),
      },
      apiMessage: data.message
    };
  } catch (error) {
    // Fallback for build time or API errors
    console.warn('API fetch failed, using fallback data:', error);
    return {
      id: Math.floor(Math.random() * 1000),
      name: `User ${Math.floor(Math.random() * 100)}`,
      timestamp: new Date().toISOString(),
      metrics: {
        views: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100),
      },
      apiMessage: 'Fallback data - API unavailable during build'
    };
  }
}

export default async function DynamicPage() {
  const userData = await fetchUserData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Dynamic Page (SSR)</h1>
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Server-Side Rendering</h2>
        <p className="text-gray-700 mb-4">
          This page is rendered on each request, providing fresh data every time. 
          Perfect for personalized content, user dashboards, or real-time information.
        </p>
        
        <div className="bg-white p-4 rounded border border-gray-300 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Real-time Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-sm"><strong>User ID:</strong> {userData.id}</p>
              <p className="font-mono text-sm"><strong>Name:</strong> {userData.name}</p>
              <p className="font-mono text-sm"><strong>Timestamp:</strong> {userData.timestamp}</p>
              <p className="font-mono text-sm"><strong>API Message:</strong> {userData.apiMessage}</p>
            </div>
            <div>
              <p className="font-mono text-sm"><strong>Views:</strong> {userData.metrics.views}</p>
              <p className="font-mono text-sm"><strong>Likes:</strong> {userData.metrics.likes}</p>
              <p className="font-mono text-sm"><strong>Shares:</strong> {userData.metrics.shares}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Pros</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Fresh data on every request</li>
              <li>Personalized content</li>
              <li>SEO friendly</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Cons</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Slower response times</li>
              <li>Higher server costs</li>
              <li>More server load</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Use Cases</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>User dashboards</li>
              <li>E-commerce cart</li>
              <li>Live feeds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}