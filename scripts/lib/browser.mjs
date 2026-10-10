import { spawn } from 'node:child_process';
import { mkdtemp, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

export const delay = (ms) => new Promise((done) => setTimeout(done, ms));

export async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((done, reject) => {
    const timeout = setTimeout(() => reject(new Error('Browser connection timed out')), 12000);
    socket.onopen = () => { clearTimeout(timeout); done(); };
    socket.onerror = (error) => { clearTimeout(timeout); reject(error); };
  });
  let sequence = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    const task = pending.get(message.id);
    if (!task) return;
    clearTimeout(task.timeout);
    pending.delete(message.id);
    message.error ? task.reject(new Error(message.error.message)) : task.resolve(message.result);
  };
  socket.onclose = () => {
    for (const task of pending.values()) { clearTimeout(task.timeout); task.reject(new Error('Browser disconnected')); }
    pending.clear();
  };
  const send = (method, params = {}, timeoutMs = 25000) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`${method} timed out`)); }, timeoutMs);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params }));
  });
  return {
    send,
    close: () => socket.close(),
    evaluate: async (expression) => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
      return result.result.value;
    },
  };
}

export async function launchBrowser(port = 9338) {
  const paths = process.platform === 'win32'
    ? ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']
    : ['/usr/bin/chromium', '/usr/bin/google-chrome'];
  let executable;
  for (const path of paths) { try { await access(path); executable = path; break; } catch {} }
  if (!executable) throw new Error('No Chromium browser found');
  const profile = await mkdtemp(resolve(tmpdir(), 'portfolio-capture-'));
  const processHandle = spawn(executable, ['--headless=new', '--disable-gpu', '--disable-extensions', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
  let version;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { version = await fetch(`http://127.0.0.1:${port}/json/version`, { signal: AbortSignal.timeout(1000) }).then((r) => r.json()); break; }
    catch { await delay(250); }
  }
  if (!version) { processHandle.kill(); throw new Error('Browser did not start'); }
  const browser = await connect(version.webSocketDebuggerUrl);
  return {
    async page() {
      const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' });
      const targets = await fetch(`http://127.0.0.1:${port}/json`, { signal: AbortSignal.timeout(5000) }).then((r) => r.json());
      const target = targets.find((item) => item.id === targetId);
      const page = await connect(target.webSocketDebuggerUrl);
      await page.send('Page.enable');
      await page.send('Runtime.enable');
      return { ...page, dispose: async () => { page.close(); await browser.send('Target.closeTarget', { targetId }); } };
    },
    async close() { try { await browser.send('Browser.close', {}, 3000); } catch {} browser.close(); processHandle.kill(); },
  };
}
