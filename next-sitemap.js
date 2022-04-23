/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tod-blog.vercel.app/',
  generateRobotsTxt: true,
};
