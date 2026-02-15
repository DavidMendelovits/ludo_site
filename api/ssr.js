import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateHtml = fs.readFileSync(path.resolve(__dirname, '../dist/server/index.html'), 'utf-8');

const { render } = await import('../dist/server/server.js');

export default async function handler(req, res) {
  try {
    const url = req.url || '/';
    const rendered = await render(url);

    const html = templateHtml
      .replace('<!--app-head-->', rendered.head ?? '')
      .replace('<!--app-html-->', rendered.html ?? '');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (e) {
    console.error(e.stack);
    res.status(500).send('Internal Server Error');
  }
}
