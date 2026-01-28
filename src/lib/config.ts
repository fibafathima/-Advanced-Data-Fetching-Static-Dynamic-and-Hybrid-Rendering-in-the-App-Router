// Environment Configuration
// This file demonstrates how to access environment variables in a type-safe way

export const config = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Feature Flags
  enableDebug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  enableMockData: process.env.NEXT_PUBLIC_ENABLE_MOCK_DATA === 'true',

  // Analytics & Monitoring
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Authentication
  authProvider: process.env.NEXT_PUBLIC_AUTH_PROVIDER || 'development',
  authSecret: process.env.AUTH_SECRET,

  // Caching Configuration
  cacheTtl: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '30', 10),

  // Logging Level
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'debug',

  // Database Configuration (server-side only)
  databaseUrl: process.env.DATABASE_URL,

  // Environment Detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isStaging: process.env.NEXT_PUBLIC_APP_URL?.includes('staging'),
  isProduction: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_APP_URL?.includes('rendering-demo.com'),
};

// Environment-specific configurations
export const environmentConfig = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    appUrl: 'http://localhost:3000',
    enableDebug: true,
    enableMockData: true,
    cacheTtl: 30,
    logLevel: 'debug',
  },
  staging: {
    apiUrl: 'https://staging-api.rendering-demo.com/api',
    appUrl: 'https://staging.rendering-demo.com',
    enableDebug: false,
    enableMockData: false,
    cacheTtl: 60,
    logLevel: 'info',
  },
  production: {
    apiUrl: 'https://api.rendering-demo.com/api',
    appUrl: 'https://rendering-demo.com',
    enableDebug: false,
    enableMockData: false,
    cacheTtl: 300,
    logLevel: 'error',
  },
};

// Get current environment configuration
export const getCurrentEnvironmentConfig = () => {
  if (config.isDevelopment) return environmentConfig.development;
  if (config.isStaging) return environmentConfig.staging;
  if (config.isProduction) return environmentConfig.production;
  return environmentConfig.development; // fallback
};

// Validate required environment variables
export const validateEnvironment = () => {
  const required: string[] = [];
  
  if (!config.apiUrl) required.push('NEXT_PUBLIC_API_URL');
  if (!config.appUrl) required.push('NEXT_PUBLIC_APP_URL');
  if (!config.authSecret) required.push('AUTH_SECRET');
  if (!config.databaseUrl) required.push('DATABASE_URL');

  if (required.length > 0) {
    console.error('Missing required environment variables:', required);
    if (config.isProduction) {
      throw new Error(`Missing required environment variables: ${required.join(', ')}`);
    }
  }
};

// Log current environment configuration (excluding secrets)
export const logEnvironment = () => {
  if (config.logLevel === 'debug' || config.enableDebug) {
    console.log('Environment Configuration:', {
      apiUrl: config.apiUrl,
      appUrl: config.appUrl,
      enableDebug: config.enableDebug,
      enableMockData: config.enableMockData,
      authProvider: config.authProvider,
      cacheTtl: config.cacheTtl,
      logLevel: config.logLevel,
      isDevelopment: config.isDevelopment,
      isStaging: config.isStaging,
      isProduction: config.isProduction,
    });
  }
};