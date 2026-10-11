import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const prefix = (process.env.VERIFY_BASE_PATH || '/').replace(/\/$/, '');
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.pdf':'application/pdf', '.xml':'application/xml', '.txt':'text/plain' };
createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (path !== prefix && !path.startsWith(prefix + '/')) { res.writeHead(404); res.end(); return; }
    let file = resolve(root, '.' + (path.slice(prefix.length) || '/'));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }); res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
}).listen(4322, '127.0.0.1', () => console.log(`Built Pages preview: http://127.0.0.1:4322${prefix}/`));
