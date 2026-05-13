/**
 * Application Configuration Constants
 */

export const APP_CONFIG = {
  appName: 'LearnTracker',
  appVersion: '1.0.0',
  sdgGoal: 'SDG 4: Quality Education',
  
  // Authentication config
  auth: {
    minPasswordLength: 6,
    sessionTimeout: 1800000, // 30 minutes in milliseconds
  },

  // API configuration
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 30000, // 30 seconds
  },

  // UI configuration
  ui: {
    itemsPerPage: 10,
    defaultTheme: 'light',
  },
};

/**
 * Default user for development/testing
 */
export const DEFAULT_USER = {
  email: 'admin',
  password: 'admin123',
};
