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
  onDuplicateRoutes: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumologic-documentation', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        (function (w, s, d, r, e, n) {
          (w[s] = w[s] || {
            readyListeners: [],
            onReady: function (e) {
              w[s].readyListeners.push(e);
            },
          }),
          ((e = d.createElement('script')).async = 1),
          (e.src = r),
          (n = d.getElementsByTagName('script')[0]).parentNode.insertBefore(e, n);
        })(
          window,
          'sumoLogicOpenTelemetryRum',
          document,
          'https://rum.sumologic.com/sumologic-rum.js'
        );
        window.sumoLogicOpenTelemetryRum.onReady(function () {
          window.sumoLogicOpenTelemetryRum.initialize({
            collectionSourceUrl: 'https://rum-collectors.us1.sumologic.com/receiver/v1/rum/ZaVnC4dhaV2cNyrqUT5YDFvpALqf3WjXkE5oomYkp_Kpvd8PbxGEQsMpkGX5YtUj1YHkvAO6UU1vGUXSx2Nh2EIEps-Vd8TrD340CoUjZuAxRBuKzg7E_w==',
            serviceName: 'docs-site-live',
            deploymentEnvironment: 'live',
            applicationName: 'docs-site',
            samplingProbability: 1,
            collectErrors: true,
          });
        });
      `,
    },
  ],
  clientModules: [
    require.resolve('./src/client-modules/trackTrialClick.js'),
  ],
  future: {
    v4: true,
    experimental_faster: true,
  },
  staticDirectories: ['static'],
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
    //Embed code file from GitHub repo
    '@saucelabs/theme-github-codeblock',
    ['@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-58ZK7D',
      },
    ],
    ['@docusaurus/plugin-google-gtag',
      {
        trackingID: ['G-CVH19TBVSL', 'G-9FTQ9KJJBY'],
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
          blogDescription: 'Stay up to date with the latest features, improvements, and fixes in the Sumo Logic Installed Collector by reviewing the official release notes.',
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
    metadata: [
      { name: 'keywords', content: 'sumo logic, documentation, tutorials, quickstarts' },
      { name: 'msvalidate.01', content: 'BA6FBE48309F6E1CFFD055E769857586' },
      { name: 'description', content: 'Sumo Logic Docs - best-in-class cloud monitoring, log management, Cloud SIEM tools, and real-time insights for web and SaaS based apps.' },
      { property: 'og:site_name', content: 'Sumo Logic Docs' },
      { property: 'og:description', content: 'Sumo Logic Docs - best-in-class cloud monitoring, log management, Cloud SIEM tools, and real-time insights for web and SaaS based apps.' },
      { property: 'og:image', content: 'https://www.sumologic.com/wp-content/uploads/meta-HomePage_1200x628-1.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '628' },
      { property: 'og:image:alt', content: 'Sumo Logic Docs' },
    ],
    announcementBar: {
      id: 'domain',
      content: '🎉️ <b>Introducing <a href="/docs/search/mobot">Mobot</a>🤖, your conversational interface for Sumo Logic. Search logs using natural language, troubleshoot faster, and get how-to guidance.</b>',
      backgroundColor: '#000',
      textColor: '#000',
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
      disableSwitch: false,
    },
    algolia: {
      appId: '2SJPGMLW1Q',
      apiKey: 'fb2f4e1fb40f962900631121cb365549',
      indexName: 'crawler_sumodocs',
      contextualSearch: false,
      searchPagePath: 'docs-search', // Default value is 'search'; renamed to 'docs-search' so it doesn't conflict with '/Search' redirect
      insights: true,
      insightsConfig: {
        useCookie: true, // alt to useCookie: true,
      },
      useCookie: true,  // alt to insightsConfig: {useCookie: true,},
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', 'scala', 'bash', 'diff', 'json'],
    },
      navbar: {
        logo: {
          alt: 'Sumo Logic logo',
          srcDark: 'img/reuse/sumo-logo.svg',
          src: 'img/reuse/sumo-logo-dark.svg',
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
                sidebarId: 'integrations',
                label: 'Apps and Integrations',
                icon: 'grid_view',
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
                sidebarId: 'dashboards',
                label: 'Dashboards',
                icon: 'dashboard',
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
          },
          {
            label: 'Support',
            position: 'left',
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
        //{
          //className: 'header-github-link',
          //to: 'https://github.com/SumoLogic/sumologic-documentation',
          //position: 'right',
          //alt: 'Link to Sumo Logic Docs GitHub repository',
        //},
          {
            type: 'search',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Help',
            items: [
              {
                label: 'Contact support',
                href: 'https://support.sumologic.com/support/s'
              },
              {
                label: 'Community forum',
                href: 'https://support.sumologic.com/support/s/topiccatalog' },
              {
                label: 'Dojo Slack community',
                href: 'https://sumodojo.slack.com'
              },
            ],
          },
          {
            title: 'Learn',
            items: [
              {
                label: 'Training and certifications',
                href: 'https://www.sumologic.com/learn/training'
              },
              {
                label: 'Webinars and events',
                href: 'https://www.sumologic.com/events'
              },
              {
                label: 'Sumo Logic blog',
                href: 'https://www.sumologic.com/blog'
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Start Free Trial',
                href: 'https://www.sumologic.com/sign-up'
              },
              {
                label: 'Request a demo',
                href: 'https://www.sumologic.com/request-demo'
              },
              {
                label: 'Status page',
                href: 'https://status.sumologic.com'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} by Sumo Logic, Inc.`,
      },
    }),
};
