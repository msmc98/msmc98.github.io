// Set PUBLIC_SITE_URL to the confirmed production origin when building.
const configured = import.meta.env.PUBLIC_SITE_URL?.trim();
export const siteOrigin = (() => {
  if (!configured) return undefined;
  const url = new URL(configured);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('PUBLIC_SITE_URL must be a public http(s) origin without a path, credentials, query or fragment.');
  }
  return url.origin;
})();
