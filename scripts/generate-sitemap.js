import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.dealaqar.com';

const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/realestate',
    '/blogs',
    '/privacy-policy',
    '/medical-disclaimer' // Adjust based on actual routes
];

// Ideally, fetch dynamic IDs from your API here
const dynamicPaths = [];

const generateSitemap = async () => {
    const allPaths = [...staticPaths, ...dynamicPaths];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
            .map((url) => {
                return `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
            })
            .join('\n')}
</urlset>`;

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
