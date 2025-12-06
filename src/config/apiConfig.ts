/**
 * Helper functions để lấy base URL cho các API services
 * Sử dụng relative path trong development để Vite proxy xử lý và tránh CORS
 */

const shouldUseLocalProxy = (): boolean => {
  if (import.meta.env.VITE_USE_REMOTE_API === "true") {
    return false;
  }

  if (import.meta.env.DEV) {
    return true;
  }

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1";
  }

  return false;
};

/**
 * Lấy base URL cho Auth API
 * @returns Base URL cho auth endpoints
 */
export const getAuthBaseUrl = (): string => {
  if (shouldUseLocalProxy()) {
    // Sử dụng relative path để Vite proxy forward request
    return "/api/auth/api/v1";
  }
  
  // Production: sử dụng env hoặc fallback URL
  return (
    import.meta.env.VITE_API_AUTH_BASE_URL ||
    import.meta.env.VITE_API_MPS_DIGITAL_SIGNATURE_URL_AUTH ||
    "http://a238f3f4e2b754227ad9a9c65b31b43e-1948367635.ap-southeast-1.elb.amazonaws.com/api/auth/api/v1"
  );
};

/**
 * Lấy base URL cho Admin API (crawl-data service)
 * @returns Base URL cho admin/crawl-data endpoints
 */
export const getAdminApiBaseUrl = (): string => {
  if (shouldUseLocalProxy()) {
    // Sử dụng relative path để Vite proxy forward request
    return "/api/admin/crawl-data/api/v1";
  }
  
  // Production: sử dụng env hoặc fallback URL
  return (
    import.meta.env.VITE_API_BASE_URL ||
    "http://a238f3f4e2b754227ad9a9c65b31b43e-1948367635.ap-southeast-1.elb.amazonaws.com/api/admin/crawl-data/api/v1"
  );
};

