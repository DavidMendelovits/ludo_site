import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';
import sirv from 'sirv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const base = process.env.BASE || '/';

const templateHtml = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8')
  : '';

const ssrManifest = isProduction
  ? fs.readFileSync(path.resolve(__dirname, 'dist/client/.vite/ssr-manifest.json'), 'utf-8')
  : undefined;

const app = express();
app.use(compression());

let vite;
if (isProduction) {
  app.use(
    base,
    sirv(path.resolve(__dirname, 'dist/client'), {
      extensions: [],
      gzip: true,
      brotli: true,
      setHeaders: (res, pathname) => {
        // Cache static assets for 1 year
        if (pathname.match(/\.(js|css|jpg|png|webp|woff2?)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    })
  );
} else {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.middlewares);
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    
    if (isProduction) {
      template = templateHtml;
      render = (await import('./dist/server/server.js')).render;
    } else {
      template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/server.jsx')).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    console.error(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});