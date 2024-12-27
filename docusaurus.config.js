// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const fs = require('fs');
import { themes as prismThemes } from 'prism-react-renderer';
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

const cidRedirects = JSON.parse(fs.readFileSync('cid-redirects.json').toString());

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Sumo Logic Docs',
  tagline: '',
  url: process.env.HOSTNAME || 'http://localhost:3000',
  trailingSlash: true,
  baseUrl: process.env.BASE_URL || '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic',
  projectName: 'sumologic-documentation',
  stylesheets: ['https://fonts.googleapis.com/css?family=Material+Icons'],
  staticDirectories: ['static'],
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      rspackBundler: true, // Enable Rspack for faster builds
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/SumoLogic/sumologic-documentation/edit/main/',
          remarkPlugins: [require('remark-code-import'), require('remark-import-partial')],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          admonitions: {
            keywords: [
              'sumo',
              'secondary',
              'info',
              'success',
              'danger',
              'note',
              'tip',
              'warning',
              'important',
            ],
          },
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'daily',
          ignorePatterns: ['/docs/reuse/**', '/tags/**'],
          filename: 'sitemap.xml',
        },
        blog: {
          blogTitle: 'Sumo Logic Service Release Notes',
          path: 'blog-service',
          routeBasePath: 'release-notes-service',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          blogDescription:
            'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
          postsPerPage: 'ALL',
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          feedOptions: {
            type: 'rss',
            xslt: true,
            title: 'Sumo Logic Service Release Notes',
            description:
              'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
            copyright: `Copyright ©${new Date().getFullYear()} Sumo Logic`,
          },
        },
        theme: {
          customCss: [require.resolve('./src/css/sumo.scss')],
        },
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    ['@docusaurus/plugin-google-tag-manager', { containerId: 'GTM-58ZK7D' }],
    ['@docusaurus/plugin-google-gtag', { trackingID: 'G-CVH19TBVSL' }],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: './community',
        routeBasePath: 'hackathon',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        breadcrumbs: false,
      },
    ],
    ['@docusaurus/plugin-client-redirects', { redirects: Object.entries(cidRedirects).map(([key, value]) => ({ from: key, to: value })) }],
    ['@docusaurus/plugin-content-blog',
      {
         id: 'blog-cse',
         routeBasePath: 'release-notes-cse',
         path: './blog-cse',
         archiveBasePath: 'archive',
         blogTitle: 'Sumo Logic Cloud SIEM Release Notes',
         blogSidebarTitle: 'All posts',
         blogSidebarCount: 'ALL',
         postsPerPage: 'ALL',
         blogDescription: 'New and enhanced Cloud SIEM features, bug fixes, updated rules, log mappers, parsers, and more.',
         showReadingTime: false,
         onUntruncatedBlogPosts: 'ignore',
         onInlineTags: 'ignore',
         onInlineAuthors: 'ignore',
         feedOptions: {
           type: 'rss',
           xslt: true,
           title: 'Sumo Logic Cloud SIEM Release Notes',
           description: 'New and enhanced Cloud SIEM features, bug fixes, updated rules, log mappers, parsers, and more.',
           copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
         },
      },
    ],
    ['@docusaurus/plugin-content-blog',
      {
         id: 'blog-csoar',
         routeBasePath: 'release-notes-csoar',
         path: './blog-csoar',
         archiveBasePath: 'archive',
         blogTitle: 'Sumo Logic Cloud SOAR Release Notes',
         blogSidebarTitle: 'All posts',
         blogSidebarCount: 'ALL',
         postsPerPage: 'ALL',
         blogDescription: 'New and enhanced Cloud SOAR features, bug fixes, changes to the application, and more.',
         showReadingTime: false,
         onUntruncatedBlogPosts: 'ignore',
         onInlineTags: 'ignore',
         onInlineAuthors: 'ignore',
         feedOptions: {
           type: 'rss',
           xslt: true,
           title: 'Sumo Logic Cloud SOAR Release Notes',
           description: 'New and enhanced Cloud SOAR features, bug fixes, changes to the application, and more.',
           copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
         },
      },
    ],
    ['@docusaurus/plugin-content-blog',
       {
          id: 'blog-developer',
          routeBasePath: 'release-notes-developer',
          path: './blog-developer',
          archiveBasePath: 'archive',
          blogTitle: 'Sumo Logic Developer Release Notes',
          blogDescription: 'The latest Sumo Logic developer features and updates to our APIs, Live Tail CLI, and more.',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          feedOptions: {
            type: 'rss',
            xslt: true,
            title: 'Sumo Logic Developer Release Notes',
            description: 'The latest Sumo Logic developer features and updates to our APIs, Live Tail CLI, and more.',
            copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
         },
       },
    ],
    ['@docusaurus/plugin-content-blog',
       {
          id: 'blog-collector',
          routeBasePath: 'release-notes-collector',
          path: './blog-collector',
          archiveBasePath: 'archive',
          blogTitle: 'Sumo Logic Collector Release Notes',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          blogDescription: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          feedOptions: {
            type: 'rss',
            xslt: true,
            title: 'Sumo Logic Collector Release Notes',
            description: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
            copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
          },
        },
    ],
    function customWebpackPlugin() {
      return {
        name: 'custom-webpack-plugin',
        configureWebpack: () => ({
          module: {
            rules: [
              {
                test: /\.json$/,
                type: 'javascript/auto', // Ensure JSON files are handled correctly
                use: [
                  {
                    loader: require.resolve('json-loader'),
                  },
                ],
              },
            ],
          },
        }),
      };
    },
  ],
  themeConfig: {
    docs: {
      sidebar: { hideable: true, autoCollapseCategories: true },
    },
    metadata: [{ name: 'keywords', content: 'sumo logic, documentation, tutorials, quickstarts' }],
    imageZoom: { selector: '.markdown :not(a) > img', options: { background: 'rgba(0, 0, 0, 0.6)' } },
    colorMode: { defaultMode: 'light' },
    algolia: {
      appId: '2SJPGMLW1Q',
      apiKey: 'fb2f4e1fb40f962900631121cb365549',
      indexName: 'crawler_sumodocs',
      contextualSearch: false,
    },
    announcementBar: {
      id: 'copilot',
      content: 'Check out 🤖 <b><a target="_blank" rel="noopener noreferrer" href="/docs/search/copilot">Sumo Logic Copilot</a></b>, our new AI-powered logs assistant!',
      backgroundColor: '#D3BAF7',
      textColor: '#000',
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', 'scala', 'bash', 'diff', 'json'],
    },
    navbar: {
      logo: { alt: 'Sumo Logic logo', srcDark: 'img/sumo-logo.svg', src: 'img/sumo-logo-dark.svg' },
      items: [
        {
          label: 'Guides',
          position: 'left',
          type: 'dropdown',
          items: [
            { type: 'docSidebar', sidebarId: 'getstarted', label: 'Get Started', icon: 'rocket' },
            { type: 'docSidebar', sidebarId: 'senddata', label: 'Collectors, Sources', icon: 'settings' },
            { type: 'docSidebar', sidebarId: 'searchlogs', label: 'Log Search', icon: 'article' },
          ],
        },
        {
          label: 'API',
          position: 'left',
          type: 'dropdown',
          items: [
            { type: 'docSidebar', sidebarId: 'api', label: 'API Docs', icon: 'hub' },
            { label: 'API Reference', href: 'https://api.sumologic.com/docs/', icon: 'code' },
          ],
        },
      ],
    },
  },
};
