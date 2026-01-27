import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Extract the type from query parameters
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  
  // Simulate different response times based on type
  if (type === 'slow') {
    // Simulate slow API response for dynamic content
    await new Promise(resolve => setTimeout(resolve, 500));
  } else if (type === 'fast') {
    // Fast response for static/hybrid content
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const data = {
    id: Math.floor(Math.random() * 10000),
    timestamp: new Date().toISOString(),
    type: type || 'unknown',
    message: `API response for ${type} rendering at ${new Date().toLocaleTimeString()}`
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
  });
}