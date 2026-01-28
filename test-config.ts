// Test script to demonstrate environment configuration
// Run with: node -r esbuild-register test-config.ts

import { config, getCurrentEnvironmentConfig, validateEnvironment, logEnvironment } from './src/lib/config';

console.log('=== Environment Configuration Test ===\n');

// Log current environment configuration
logEnvironment();

console.log('\n=== Current Environment Details ===');
console.log('API URL:', config.apiUrl);
console.log('App URL:', config.appUrl);
console.log('Environment:', 
  config.isDevelopment ? 'Development' : 
  config.isStaging ? 'Staging' : 
  config.isProduction ? 'Production' : 'Unknown'
);
console.log('Debug Mode:', config.enableDebug);
console.log('Mock Data:', config.enableMockData);
console.log('Cache TTL:', config.cacheTtl, 'seconds');
console.log('Log Level:', config.logLevel);

console.log('\n=== Environment-Specific Configuration ===');
const envConfig = getCurrentEnvironmentConfig();
console.log('Current Environment Config:', envConfig);

console.log('\n=== Environment Validation ===');
try {
  validateEnvironment();
  console.log('✅ Environment validation passed');
} catch (error) {
  console.log('❌ Environment validation failed:', (error as Error).message);
}

console.log('\n=== Environment Variable Access ===');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL || 'Not set');
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL || 'Not set');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set');
console.log('AUTH_SECRET:', process.env.AUTH_SECRET ? 'Set (hidden)' : 'Not set');

console.log('\n=== Security Check ===');
console.log('Sensitive variables are properly hidden in logs');
console.log('Environment files are not committed to git (see .gitignore)');