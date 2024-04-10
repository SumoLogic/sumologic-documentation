// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// Full configuration options detailed here: https://docusaurus.io/docs/api/docusaurus-config

// Documentation page id for open source: sumo-logic-open-source-projects

const fs = require('fs')

import {themes as prismThemes} from 'prism-react-renderer';
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

const cidRedirects = JSON.parse(fs.readFileSync('cid-redirects.json').toString())

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Sumo Logic Docs',
  tagline: '',
  url: process.env.HOSTNAME || "http://localhost:3000",
  trailingSlash: true,
  baseUrl: process.env.BASE_URL || "/",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumologic-documentation', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-CVH19TBVSL',
      async: true,
    },
    {
      src: 'https://www.googletagmanager.com/ns.html?id=GTM-58ZK7D',
      async: true,
    },
    {
      src: './src/helper/google-tag-manager.js',
      async: true,
    },
    {
      src: './src/helper/google-analytics.js',
      async: true,
    },
  ],
  staticDirectories: ['static'],
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          "parser": {
            "syntax": "typescript",
            "tsx": true
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        }
      },
    }),
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/SumoLogic/sumologic-documentation/edit/main/',
          //sidebarCollapsible: true,
          //sidebarCollapsed: false,
          remarkPlugins: [
            //https://www.npmjs.com/package/remark-code-import
            require('remark-code-import'),
            //https://www.npmjs.com/package/remark-import-partial
            //snippet support (import Abc from '../reuse/abc.md'; <Abc/> relative filepath to .md file)
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
        gtag: {
          trackingID: 'G-CVH19TBVSL',
        },
        googleTagManager: {
          containerId: 'GTM-58ZK7D',
        },
        blog: {
          blogTitle: 'Sumo Logic Service Release Notes',
          path: 'blog-service',
          routeBasePath: 'release-notes-service',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          blogDescription: 'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
          postsPerPage: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: 'rss',
            title: 'Sumo Logic Service Release Notes',
            description: 'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
            copyright: `Copyright ©${new Date().getFullYear()} Sumo Logic`,
          },
        },
        theme: {
          customCss: [
            require.resolve('./src/css/sumo.scss'),
          ],
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    'react-iframe',
    ['@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: './community',
        routeBasePath: 'hackathon',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        breadcrumbs: false,
      },
    ],
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
         feedOptions: {
           type: 'rss',
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
         feedOptions: {
           type: 'rss',
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
          feedOptions: {
            type: 'rss',
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
          feedOptions: {
            type: 'rss',
            title: 'Sumo Logic Collector Release Notes',
            description: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
            copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
          },
        },
    ],
    ['@docusaurus/plugin-client-redirects',
      {
        redirects: Object.entries(cidRedirects).map(
          ([key, value]) => ({ from: key, to: value })
        )
      },
    ],
  ],
  themeConfig:
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    // SEO Global Metadata
    metadata: [{name: 'keywords', content: 'sumo logic, documentation, tutorials, quickstarts'}],
    announcementBar: {
      id: 'announcementBar',
      content: `RSAC 2024 is almost here. It’s game on for AI-driven DevSecOps! Meet us at booth #6271 on May 6–9.  👉 <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeCdX9T4-ksh_LhCAu7_C1SG3WDnjTgoV1Tgy8VoxwAankcQw/viewform"> Book a meeting</a>.`,
      backgroundColor: '#2f0f3d',
      textColor: '#fff',
    },
    imageZoom: {
      selector: '.markdown :not(a) > img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        background: 'rgba(0, 0, 0, 0.6)',
      },
    },
    colorMode: {
      defaultMode: 'light',
    },
    algolia: {
      appId: '2SJPGMLW1Q',
      apiKey: 'fb2f4e1fb40f962900631121cb365549',
      indexName: 'crawler_sumodocs',
      contextualSearch: false,
      // Optional: path for search page that enabled by default (`false` to disable it)
      //searchPagePath: false,
      getMissingResultsUrl({ query }) {
        return `https://github.com/SumoLogic/sumologic-documentation/issues/new?title=${query}`;
      },
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', `scala`, 'bash', 'diff', 'json'],
    },
      navbar: {
        hideOnScroll: true,
        logo: {
          alt: 'Sumo Logic logo',
          srcDark: 'img/sumo-logo.svg',
          src: 'img/sumo-logo-dark.svg',
        },
        items: [
        // activeregex controls the top nav content
        // icon uses Google Material name code https://fonts.google.com/icons?query=material
          {
            label: 'Guides',
            position: 'left',
            to: '#',
            type: 'dropdown',
            items:[
              {
                type: 'docSidebar',
                sidebarId: 'getstarted',
                label: 'Start Here',
                icon: 'rocket',
              },
              {
                type: 'docSidebar',
                sidebarId: 'senddata',
                label: 'Send Data (Collectors)',
                icon: 'cloud_upload',
              },
              {
                type: 'docSidebar',
                sidebarId: 'searchlogs',
                label: 'Log Search',
                icon: 'article',
              },
              {
                type: 'docSidebar',
                sidebarId: 'integrations',
                label: 'Apps and Integrations',
                icon: 'apps',
              },
              {
                type: 'docSidebar',
                sidebarId: 'manage',
                label: 'Manage Account',
                icon: 'manage_accounts',
              },
              {
                type: 'docSidebar',
                sidebarId: 'alerts',
                label: 'Alerts',
                icon: 'notifications',
              },
              {
                type: 'docSidebar',
                sidebarId: 'metricslogs',
                label: 'Metrics',
                icon: 'stacked_line_chart',
              },
              {
                type: 'docSidebar',
                sidebarId: 'apm',
                label: 'Traces, RUM, APM',
                icon: 'account_tree',
              },
              {
                type: 'docSidebar',
                sidebarId: 'observability',
                label: 'Observability',
                icon: 'query_stats',
              },
              {
                type: 'docSidebar',
                sidebarId: 'security',
                label: 'Security',
                icon: 'security',
              },
              {
                type: 'docSidebar',
                sidebarId: 'dashboards',
                label: 'Dashboards',
                icon: 'dashboard',
              },
              {
                type: 'docSidebar',
                sidebarId: 'platformservices',
                label: 'Platform Services',
                icon: 'swap_horiz',
              },
            ]
          },
          {
            label: 'API',
            position: 'left',
            to: '#',
            type: 'dropdown',
            items:[
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
            ]
          },
          {
            label: 'Release Notes',
            position: 'left',
            to: '/docs/release-notes',
            type: 'dropdown',
            items:[
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
            ]
          },
          {
            type: 'search',
            position: 'left',
          },
          {
            type: 'html',
            position: 'right',
            value: '<div id="google_translate_element"></div>',
          },
          {
            to: 'https://www.sumologic.com/sign-up',
            position: 'right',
            className: 'header-trial',
          },
          {
            to: 'https://support.sumologic.com/support/s/contactsupport',
            position: 'right',
            className: 'header-support',
          },
          {
            position: 'right',
            className: 'header-github-link',
            type: 'dropdown',
            'aria-label': 'GitHub repository',
            to: 'https://github.com/SumoLogic/sumologic-documentation',
            items:[
              {
                label: 'Send Feedback',
                to: 'https://github.com/SumoLogic/sumologic-documentation/issues/new/choose',
                icon: 'rate_review',
              },
              {
                label: 'Contribute to Docs',
                href: '/docs/contributing',
                icon: 'edit_note',
              },
            ]
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
          {
            items: [
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@sumologic/videos',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/sumo-logic',
              },
              {
                label: 'X (Twitter)',
                href: 'https://twitter.com/SumoLogic',
              },
            ],
            title: 'Social',
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} by Sumo Logic, Inc.`,
      },
    }),
};
