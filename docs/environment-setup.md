# Multi-Environment Deployment Setup

This document explains how to configure and manage multi-environment deployments for your Next.js application.

## Environment Configuration Files

We have created separate environment files for each deployment environment:

### 1. Development Environment (`.env.development`)
- Used for local development
- Contains development-specific configurations
- Points to local database and API endpoints

### 2. Staging Environment (`.env.staging`)
- Used for staging deployments
- Contains staging-specific configurations
- Points to staging database and API endpoints

### 3. Production Environment (`.env.production`)
- Used for production deployments
- Contains production-specific configurations
- Points to production database and API endpoints

### 4. Template File (`.env.example`)
- Template for developers to create their local `.env.local` file
- Contains example values and documentation

## Environment Variables Security

### What's Never Committed to Git
- Real secrets (passwords, API keys, tokens)
- Environment-specific configuration files (`.env.*`)
- Local development files (`.env.local`)

### What's Safe to Commit
- Template files (`.env.example`)
- Configuration structure and variable names
- Non-sensitive default values

## Build Scripts

### Environment-Specific Build Commands
```bash
# Development build
npm run build:dev

# Staging build
npm run build:staging

# Production build
npm run build:production
```

### Environment Setup Commands
```bash
# Set development environment
npm run env:dev

# Set staging environment
npm run env:staging

# Set production environment
npm run env:production

# Set example template
npm run env:example

# Clean environment variables
npm run env:clean
```

## GitHub Actions CI/CD Pipeline

### Automatic Deployments
- **Development**: Push to `develop` branch → Deploy to development environment
- **Staging**: Push to `main` branch → Deploy to staging environment
- **Production**: Manual deployment or scheduled releases → Deploy to production

### Manual Deployments
- Can be triggered manually through GitHub Actions interface
- Supports deployment to any environment
- Requires approval for production deployments

### Environment Secrets
GitHub Secrets are used to store sensitive information:
- `DEV_API_URL`, `STAGING_API_URL`, `PROD_API_URL`
- `DEV_DATABASE_URL`, `STAGING_DATABASE_URL`, `PROD_DATABASE_URL`
- `DEV_AUTH_SECRET`, `STAGING_AUTH_SECRET`, `PROD_AUTH_SECRET`
- Analytics and monitoring tokens

## Configuration Management

### Environment Configuration File (`src/lib/config.ts`)
- Type-safe access to environment variables
- Environment-specific default values
- Validation of required variables
- Logging of configuration (excluding secrets)

### Usage Example
```typescript
import { config, getCurrentEnvironmentConfig } from '@/lib/config';

// Access environment variables
const apiUrl = config.apiUrl;
const isDevelopment = config.isDevelopment;

// Get environment-specific configuration
const envConfig = getCurrentEnvironmentConfig();

// Validate environment setup
config.validateEnvironment();

// Log configuration (debug mode only)
config.logEnvironment();
```

## Deployment Verification

### Testing Different Environments
1. **Development**: `npm run build:dev` → Check local build
2. **Staging**: `npm run build:staging` → Check staging build
3. **Production**: `npm run build:production` → Check production build

### Verification Steps
- Ensure correct API endpoints are used
- Verify database connections
- Check feature flags and debug settings
- Confirm analytics and monitoring are configured
- Test authentication and authorization

## Best Practices Implemented

### 1. Separation of Concerns
- Different configuration files for each environment
- Clear distinction between public and private variables
- Environment-specific build processes

### 2. Security by Design
- No secrets committed to repository
- Use of GitHub Secrets for sensitive data
- Environment-specific secret management

### 3. Reliability and Consistency
- Automated builds with environment verification
- Consistent deployment processes across environments
- Clear rollback and recovery procedures

### 4. Scalability
- Configurable for different hosting platforms
- Environment-specific optimization settings
- Flexible deployment strategies

## Troubleshooting

### Common Issues
1. **Missing Environment Variables**: Check that all required variables are set in the appropriate environment file
2. **Wrong Environment**: Verify that the correct environment file is being used for the build
3. **Secret Access Issues**: Ensure GitHub Secrets are properly configured for the environment
4. **Build Failures**: Check that environment-specific configurations are compatible with the build process

### Debugging Tips
- Use `npm run env:clean` to reset environment variables
- Check the `.env.local` file to see current environment configuration
- Use `config.logEnvironment()` to log current configuration (debug mode)
- Verify environment variables in GitHub Actions logs

## Video Documentation

### Required Video Content
1. **Environment File Setup**: Show the different `.env.*` files and their purposes
2. **Secret Management**: Demonstrate how secrets are stored in GitHub and referenced in workflows
3. **Build Process**: Show how the build changes when switching between environments
4. **Challenges and Solutions**: Discuss any issues encountered and how they were resolved

### Video Structure Suggestion
1. Introduction to multi-environment deployment
2. Walkthrough of environment configuration files
3. Demonstration of GitHub Secrets setup
4. Build process demonstration with different environments
5. Verification of deployments in each environment
6. Reflection on challenges and learning outcomes

This setup ensures that your application can be reliably deployed across different environments while maintaining security and consistency.