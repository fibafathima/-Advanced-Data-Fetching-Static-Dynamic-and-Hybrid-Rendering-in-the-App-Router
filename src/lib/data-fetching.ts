// Utility functions to demonstrate different data fetching strategies

/**
 * Fetch data with no caching - used for dynamic rendering
 */
export async function fetchDynamicData(url: string) {
  const response = await fetch(url, {
    cache: 'no-store',  // Forces re-fetch on every request
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * Fetch data with default caching - used for static/hybrid rendering
 */
export async function fetchCachedData(url: string, revalidateTime?: number) {
  // Set revalidate time if provided
  if (revalidateTime !== undefined) {
    const response = await fetch(url, {
      next: { revalidate: revalidateTime },  // Revalidate after specified seconds
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } else {
    // Default caching behavior
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
}

/**
 * Fetch data with static caching (at build time)
 */
export async function fetchStaticData(url: string) {
  const response = await fetch(url, {
    next: { revalidate: false },  // Cache indefinitely (for static generation)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}