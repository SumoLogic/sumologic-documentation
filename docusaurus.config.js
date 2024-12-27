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
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumologic-documentation', // Usually your repo name.
  stylesheets: ['https://fonts.googleapis.com/css?family=Material+Icons'],
  staticDirectories: ['static'],
  future: {
    experimental_faster: true,
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/SumoLogic/sumologic-documentation/edit/main/',
          remarkPlugins: [
            require('remark-code-import'),
            require('remark-import-partial'),
          ],
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
      }),
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
    ['@docusaurus/plugin-content-blog', { id: 'blog-cse', routeBasePath: 'release-notes-cse', path: './blog-cse', blogTitle: 'Sumo Logic Cloud SIEM Release Notes', postsPerPage: 'ALL', showReadingTime: false }],
    ['@docusaurus/plugin-content-blog', { id: 'blog-csoar', routeBasePath: 'release-notes-csoar', path: './blog-csoar', blogTitle: 'Sumo Logic Cloud SOAR Release Notes', postsPerPage: 'ALL', showReadingTime: false }],
    ['@docusaurus/plugin-content-blog', { id: 'blog-developer', routeBasePath: 'release-notes-developer', path: './blog-developer', blogTitle: 'Sumo Logic Developer Release Notes', postsPerPage: 'ALL', showReadingTime: false }],
    ['@docusaurus/plugin-content-blog', { id: 'blog-collector', routeBasePath: 'release-notes-collector', path: './blog-collector', blogTitle: 'Sumo Logic Collector Release Notes', postsPerPage: 'ALL', showReadingTime: false }],
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
          to: '#',
          type: 'dropdown',
          items: [
            { type: 'docSidebar', sidebarId: 'getstarted', label: 'Get Started', icon: 'rocket' },
            { type: 'docSidebar', sidebarId: 'senddata', label: 'Collectors, Sources', icon: 'settings' },
            { type: 'docSidebar', sidebarId: 'searchlogs', label: 'Log Search', icon: 'article' },
            { type: 'docSidebar', sidebarId: 'security', label: 'Security', icon: 'security' },
            { type: 'docSidebar', sidebarId: 'manage', label: 'Manage Account', icon: 'manage_accounts' },
            { type: 'docSidebar', sidebarId: 'integrations', label: 'Apps and Integrations', icon: 'grid_view' },
            { type: 'docSidebar', sidebarId: 'alerts', label: 'Alerts', icon: 'notifications' },
            { type: 'docSidebar', sidebarId: 'metricslogs', label: 'Metrics', icon: 'stacked_line_chart' },
            { type: 'docSidebar', sidebarId: 'observability', label: 'Observability', icon: 'speed' },
            { type: 'docSidebar', sidebarId: 'dashboards', label: 'Dashboards', icon: 'dashboard' },
            { type: 'docSidebar', sidebarId: 'platformservices', label: 'Platform Services', icon: 'settings_suggest' },
            { type: 'docSidebar', sidebarId: 'apm', label: 'Traces, RUM, APM', icon: 'account_tree' },
          ],
        },
        {
          label: 'API',
          position: 'left',
          to: '#',
          type: 'dropdown',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'api',
              label: 'API Docs',
              icon: 'hub',
            },
            {
              label: 'API Reference',
              href: 'https://api.sumologic.com/docs/',
              icon: 'code',
            },
          ],
        },
        {
          label: 'Release Notes',
          position: 'left',
          to: '/docs/release-notes',
          type: 'dropdown',
          items: [
            {
              label: 'Service',
              to: 'release-notes-service',
              icon: 'rss_feed',
            },
            {
              label: 'Cloud SIEM',
              to: 'release-notes-cse',
              icon: 'rss_feed',
            },
            {
              label: 'Cloud SOAR',
              to: 'release-notes-csoar',
              icon: 'rss_feed',
            },
            {
              label: 'Collector',
              to: 'release-notes-collector',
              icon: 'rss_feed',
            },
            {
              label: 'Developer',
              to: 'release-notes-developer',
              icon: 'rss_feed',
            },
          ],
        },
        {
          type: 'search',
          position: 'left',
        },
        {
          type: 'html',
          position: 'right',
          value: 'google_translate',
        },
        {
          to: 'https://www.sumologic.com/sign-up',
          position: 'right',
          className: 'header-trial',
          alt: 'Sign up for a Sumo Logic free trial',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          items: [
            {
              label: 'Training & Certifications',
              href: 'https://www.sumologic.com/learn/training/',
            },
            {
              label: 'Events & Webinars',
              href: 'https://www.sumologic.com/events/',
            },
            {
              label: 'Request a Demo',
              href: 'https://www.sumologic.com/request-demo',
            },
          ],
          title: 'Learn',
        },
        {
          items: [
            {
              label: 'Contact Support',
              href: 'https://support.sumologic.com/support/s',
            },
            {
              label: 'Sumo Dojo Slack',
              href: 'https://sumodojo.slack.com/',
            },
            {
              label: 'Community',
              href: 'https://support.sumologic.com/support/s/topiccatalog',
            },
          ],
          title: 'Help',
        },
        {
          items: [
            {
              label: 'Docs GitHub',
              href: 'https://github.com/SumoLogic/sumologic-documentation',
            },
            {
              label: 'Sumo Logic GitHub',
              href: 'https://github.com/SumoLogic',
            },
            {
              label: 'Sumo Labs Projects',
              href: 'https://github.com/SumoLogic-Labs',
            },
          ],
          title: 'Open Source',
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} by Sumo Logic, Inc.`,
    },
  },
};
