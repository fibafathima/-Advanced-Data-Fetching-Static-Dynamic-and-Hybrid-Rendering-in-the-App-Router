import { Metadata } from 'next';
import { fetchStaticData } from '@/lib/data-fetching';

// Static Rendering (SSG) - Content is pre-rendered at build time
export const revalidate = false; // This ensures static generation at build time

export const metadata: Metadata = {
  title: 'Static Page (SSG)',
  description: 'This page is statically generated at build time',
};

// Example of using static data fetching (though for this page we're using build time data)
async function fetchStaticContent() {
  // In a real app, this might fetch from a CMS at build time
  // For this demo, we're just returning static content
  return {
    buildTime: new Date().toISOString(),
    title: 'Static Content',
    description: 'This content was generated at build time'
  };
}

export default function StaticPage() {
  const currentTime = new Date().toISOString();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Static Page (SSG)</h1>
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Static Site Generation</h2>
        <p className="text-gray-700 mb-4">
          This page was pre-rendered at build time. The content is generated once and served as static HTML.
          Perfect for content that does not change often, like marketing pages, blogs, or product listings.
        </p>
        <div className="bg-white p-4 rounded border border-gray-300">
          <p className="font-mono text-sm"><strong>Build Time:</strong> {currentTime}</p>
          <p className="font-mono text-sm mt-2"><strong>Rendering Strategy:</strong> Static Site Generation (SSG)</p>
          <p className="font-mono text-sm mt-2"><strong>Revalidation:</strong> Disabled (false)</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Pros</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Fastest loading times</li>
              <li>Low cost hosting</li>
              <li>Great SEO</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Cons</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Data can be outdated</li>
              <li>Requires rebuild for updates</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border border-gray-300">
            <h3 className="font-semibold text-gray-800">Use Cases</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              <li>Marketing pages</li>
              <li>Blog posts</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}