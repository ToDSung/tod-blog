/** @type {import('next-sitemap').IConfig} */

const path = require('path');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tod-blog.vercel.app/',
  generateRobotsTxt: true,
  sourceDir: path.join(process.cwd(), '.next'),
  outDir: path.join(process.cwd(), 'public'),
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      changefreq: config.changefreq,
      priority: config.priority,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
