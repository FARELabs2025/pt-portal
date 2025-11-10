/**
 * API Configuration
 * Centralized API base URL and utility functions
 */

export const api = {
  /**
   * Login API endpoint
   */
  login: '/api/auth/login',
  
  /**
   * Register API endpoint
   */
  register: '/api/auth/register',
  
  /**
   * Get stored user from localStorage
   */
  getUser: (): any | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  
};

