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
  onBrokenAnchors: 'throw',
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumologic-documentation', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  staticDirectories: ['static'],
  // Docusaurus Faster (https://docusaurus.io/blog/releases/3.6#adoption-strategy)
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: false,
      rspackBundler: false,
      mdxCrossCompilerCache: true,
    },
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
        sitemap: {
          lastmod: 'date',
          changefreq: 'daily',
          ignorePatterns: [
            '/docs/reuse/**',
            '/tags/**'
          ],
          filename: 'sitemap.xml',
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
          onUntruncatedBlogPosts: 'ignore',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          feedOptions: {
            type: 'rss',
            xslt: true,
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
    ['@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-58ZK7D',
      },
    ],
    ['@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-CVH19TBVSL',
      },
    ],
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
    announcementBar: {
      id: 'copilot',
      content: 'Check out 🤖 <b><a target="_blank" rel="noopener noreferrer" href="/docs/search/copilot">Sumo Logic Copilot</a></b>, our new AI-powered logs assistant!',
      backgroundColor: '#D3BAF7',
      textColor: '#000',
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', `scala`, 'bash', 'diff', 'json'],
    },
      navbar: {
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
                label: 'Get Started',
                icon: 'rocket',
              },
              {
                type: 'docSidebar',
                sidebarId: 'senddata',
                label: 'Collectors, Sources',
                icon: 'settings',
              },
              {
                type: 'docSidebar',
                sidebarId: 'searchlogs',
                label: 'Log Search',
                icon: 'article',
              },
              {
                type: 'docSidebar',
                sidebarId: 'security',
                label: 'Security',
                icon: 'security',
              },
              {
                type: 'docSidebar',
                sidebarId: 'manage',
                label: 'Manage Account',
                icon: 'manage_accounts',
              },
              {
                type: 'docSidebar',
                sidebarId: 'integrations',
                label: 'Apps and Integrations',
                icon: 'grid_view',
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
                sidebarId: 'observability',
                label: 'Observability',
                icon: 'speed',
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
                icon: 'settings_suggest',
              },
              {
                type: 'docSidebar',
                sidebarId: 'apm',
                label: 'Traces, RUM, APM',
                icon: 'account_tree',
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
            value: 'google_translate',
          },
          {
            to: 'https://www.sumologic.com/sign-up',
            position: 'right',
            className: 'header-trial',
            alt: 'Sign up for a Sumo Logic free trial',
          },
          {
            position: 'right',
            className: 'support-menu-trigger',
            to: '#',
            type: 'dropdown',
            items: [
              {
                label: 'Contact Support',
                to: 'https://support.sumologic.com/support/s',
                icon: 'support',
              },
              {
                label: 'Request a Demo',
                to: 'https://www.sumologic.com/demos',
                icon: 'co_present',
              },
              {
                label: 'Submit Feedback',
                to: 'https://github.com/SumoLogic/sumologic-documentation/issues/new/choose',
                icon: 'thumbs_up_down',
              },
              {
                label: 'Contribute to Docs',
                to: 'docs/contributing',
                icon: 'edit_note',
              },
            ],
          },
          {
            className: 'header-github-link',
            to: 'https://github.com/SumoLogic/sumologic-documentation',
            position: 'right',
            alt: 'Link to Sumo Logic Docs GitHub repository',
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
    }),
};

export default function (context, options) {
  return {
    name: 'custom-docusaurus-plugin',
    configureWebpack(config, isServer, {currentBundler}) {
      const bundler = (currentBundler.instance ?? require("webpack"))
      return {
        plugins: [
          new bundler.DefinePlugin({}),
        ]
      };
    },
  };
}
