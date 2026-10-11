import type { APIRoute } from 'astro';
import { publicPath } from '../content/paths';
import { siteOrigin } from '../content/site';
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export const GET: APIRoute = () => {
  const entries = siteOrigin ? ['/', '/es/'].map(path => `<url><loc>${escape(siteOrigin + publicPath(path))}</loc><xhtml:link rel="alternate" hreflang="en" href="${escape(siteOrigin + publicPath('/'))}"/><xhtml:link rel="alternate" hreflang="es" href="${escape(siteOrigin + publicPath('/es/'))}"/></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
