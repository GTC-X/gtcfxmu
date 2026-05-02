/**
 * Helper function to generate consistent canonical URLs
 * Ensures all canonical URLs use www.gtcfx.com
 * 
 * @param {string} locale - The locale code (e.g., 'en', 'ar')
 * @param {string} path - The path without locale (e.g., 'about-us', 'blogs/slug')
 * @returns {string} - Canonical URL with www
 */
export function getCanonicalUrl(locale, path = '') {
  // Always use www version
  const baseUrl = 'https://www.gtcfx.com';
  
  // Remove leading/trailing slashes from path
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  // For English locale, don't include locale in URL
  if (locale === 'en' || !locale) {
    return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
  }
  
  // For other locales, include locale in URL
  return cleanPath ? `${baseUrl}/${locale}/${cleanPath}` : `${baseUrl}/${locale}`;
}

