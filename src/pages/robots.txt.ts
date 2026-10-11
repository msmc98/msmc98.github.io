import type { APIRoute } from 'astro';
import { publicPath } from '../content/paths';
import { siteOrigin } from '../content/site';
export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\n${siteOrigin ? `Sitemap: ${siteOrigin}${publicPath("/sitemap.xml")}\n` : ''}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
