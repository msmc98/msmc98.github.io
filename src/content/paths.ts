export const publicPath = (path: string): string => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
// Prefix only local asset paths; preserve public source URLs and credits.
export function withAssetBase<T>(value: T): T {
  if (typeof value === 'string') return (value.startsWith('/images/') || value.startsWith('/projects/') ? publicPath(value) : value) as T;
  if (Array.isArray(value)) return value.map(item => withAssetBase(item)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withAssetBase(item)])) as T;
  return value;
}
