// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// Full configuration options detailed here: https://docusaurus.io/docs/api/docusaurus-config

// Documentation page id for open source: sumo-logic-open-source-projects

const fs = require('fs')

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const cidRedirects = JSON.parse(fs.readFileSync('cid-redirects.json').toString())

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  baseUrl: process.env.BASE_URL || "/",
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumologic-documentation', // Usually your repo name.
  tagline: '',
  title: 'Sumo Logic Docs',
  trailingSlash: true,
  url: process.env.HOSTNAME || "http://localhost:3000",

  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    'react-iframe',
    [
      '@docusaurus/plugin-content-blog',
      {
         archiveBasePath: 'archive',
         blogDescription: 'New and enhanced Cloud SIEM features, bug fixes, updated rules, log mappers, parsers, and more.',
         blogSidebarCount: 'ALL',
         blogSidebarTitle: 'All posts',
         blogTitle: 'Sumo Logic Cloud SIEM Release Notes',
         feedOptions: {
          copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
           description: 'New and enhanced Cloud SIEM features, bug fixes, updated rules, log mappers, parsers, and more.',
           // https://help.sumologic.com/release-notes-cse/rss.xml
           title: 'Sumo Logic Cloud SIEM Release Notes',
           type: 'rss',
         },
         id: 'blog-cse',
         path: './blog-cse',
         postsPerPage: 'ALL',
         routeBasePath: 'release-notes-cse',
         showReadingTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        archiveBasePath: 'archive',
        blogTitle: 'Sumo Logic Developer Release Notes',
        blogDescription: 'The latest Sumo Logic developer features and updates to our APIs, Live Tail CLI, and more.',
        blogSidebarTitle: 'All posts',
        blogSidebarCount: 'ALL',
        feedOptions: {
          copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
          description: 'The latest Sumo Logic developer features and updates to our APIs, Live Tail CLI, and more.',
          // https://help.sumologic.com/release-notes-developer/rss.xml
          title: 'Sumo Logic Developer Release Notes',
          type: 'rss',
        },
        id: 'blog-developer',
        path: './blog-developer',
        postsPerPage: 'ALL',
        routeBasePath: 'release-notes-developer',
        showReadingTime: false,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        archiveBasePath: 'archive',
        blogDescription: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
        blogSidebarTitle: 'All posts',
        blogSidebarCount: 'ALL',
        blogTitle: 'Sumo Logic Collector Release Notes',
        feedOptions: {
          type: 'rss',
          // https://help.sumologic.com/release-notes-collector/rss.xml
          title: 'Sumo Logic Collector Release Notes',
          description: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
          copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
        },
        id: 'blog-collector',
        path: './blog-collector',
        postsPerPage: 'ALL',
        routeBasePath: 'release-notes-collector',
        showReadingTime: false,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: Object.entries(cidRedirects).map(
          ([key, value]) => ({ from: key, to: value })
        )
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
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
            // snippet support {@import ./my-name.md} relative filepath to md file
            require('remark-import-partial'),
          ],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          admonitions: {
            tag: ':::',
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
              'caution',
            ],
          },
        },
        googleAnalytics: {
          trackingID: 'UA-16579649-3',
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
            // https://help.sumologic.com/release-notes-service/rss.xml
            title: 'Sumo Logic Service Release Notes',
            description: 'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
            copyright: `Copyright ©${new Date().getFullYear()} Sumo Logic`,
          },
        },
        theme: {
          customCss: [
            require.resolve('./src/css/sumo.scss'),
            require.resolve('./src/css/sitesearch360.scss'),
          ],
        },
      }),
    ],
  ],
  scripts: [
    {
      async: true,
      src: 'https://js.sitesearch360.com/plugin/bundle/3113.js',
    },
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  staticDirectories: ['static'],
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
        hideable: true,
      },
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} by Sumo Logic, Inc.`,
      links: [
        {
          items: [
            {
              href: 'https://www.sumologic.com/learn/training/',
              label: 'Get Certified for Free',
            },
            {
              href: 'https://www.sumologic.com/events/',
              label: 'Events & Webinars',
            },
            {
              href: 'https://www.sumologic.com/request-demo/',
              label: 'Request Demo',
            },
          ],
          title: 'Learn',
        },
        {
          items: [
            {
              href: 'https://www.sumologic.com/company/about-us/',
              label: 'About Us',
            },
            {
              href: 'https://support.sumologic.com/hc/en-us/community/topics',
              label: 'Community',
            },
            {
              href: 'https://sumodojo.slack.com/',
              label: 'Sumo Dojo Slack',
            },
          ],
          title: 'Sumo Community',
        },
        {
          items: [
            {
              href: 'https://github.com/SumoLogic/sumologic-documentation',
              label: 'Docs GitHub',
            },
            {
              href: 'https://github.com/SumoLogic',
              label: 'Sumo Logic GitHub',
            },
            {
              href: 'https://github.com/SumoLogic-Labs',
              label: 'Sumo Labs Projects',
            },
          ],
          title: 'Open Source',
        },
      ],
      style: 'dark',
    },
    imageZoom: {
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        background: 'rgba(0, 0, 0, 0.6)',
      },
      selector: '.markdown :not(a) > img',
    },
    // SEO Global Metadata
    metadata: [
      {
        content: 'sumo logic, documentation, tutorials, quickstarts',
        name: 'keywords',
      },
    ],
    navbar: {
      logo: {
        alt: 'Sumo Logic logo',
        src: 'img/sumo-logo-dark.svg',
        srcDark: 'img/sumo-logo.svg',
        style: {
          height: 24,
        },
      },
      items: [
        {
          className: 'navbar-trial',
          label: 'Start a Free Trial',
          position: 'right',
          to: 'https://www.sumologic.com/sign-up',
        },
        {
          items:[
            {
              activeBaseRegex: '^/docs/send-data/.*',
              label: 'Send Data',
              to: '/docs/send-data',
            },
            {
              activeBaseRegex: '^/docs/search/.*',
              label: 'Search Logs',
              to: '/docs/search',
            },
            {
              activeBaseRegex: '^/docs/metrics/.*',
              label: 'Metrics',
              to: '/docs/metrics',
            },
            {
              activeBaseRegex: '^/docs/integrations/.*',
              label: 'Apps/Integrations',
              to: '/docs/integrations',
            },
            {
              activeBaseRegex: '^/docs/manage/.*',
              label: 'Manage Account',
              to: '/docs/manage',
            },
            {
              activeBaseRegex: '^/docs/observability/about',
              label: 'Observability',
              to: '/docs/observability',
            },
            {
              activeBaseRegex: '^/docs/apm/.*',
              label: 'Traces',
              to: '/docs/apm/traces',
            },
            {
              label: 'Alerts',
              to: '/docs/alerts',
            },
            {
              activeBaseRegex: '^/docs/(cse)/.*',
              label: 'Cloud SIEM',
              to: '/docs/cse',
            },
            {
              activeBaseRegex: '^/docs/security/.*',
              label: 'Cloud SOAR',
              href: 'https://www.sumologic.com/solutions/cloud-soar',
            },
            {
              activeBaseRegex: '^/docs/(sdo)/.*',
              label: 'CI/CD',
              to: '/docs/sdo',
            },
          ],
          label: 'Guides',
          position: 'left',
          to: '#',
          type: 'dropdown',
        },
        {
          items:[
            {
              label: 'Docs',
              to: '/docs/api',
            },
            {
              label: 'Reference',
              href: 'https://api.sumologic.com/docs/',
            },
          ],
          label: 'API',
          position: 'left',
          to: '#',
          type: 'dropdown',
        },
        {
          items:[
            {
              label: 'Service',
              to: 'release-notes-service',
            },
            {
              label: 'Cloud SIEM',
              to: 'release-notes-cse',
            },
            {
              label: 'Collector',
              to: 'release-notes-collector',
            },
            {
              label: 'Developer',
              to: 'release-notes-developer',
            },
          ],
          label: 'Release Notes',
          position: 'left',
          to: '/docs/release-notes',
          type: 'dropdown',
        },
        {
          label: 'Contribute to Docs',
          to: '/docs/contributing',
          position: 'left',
        },
        {
          items:[
            {
              href: 'https://www.sumologic.com/learn/training',
              label: 'Training',
            },
            {
              href: 'https://support.sumologic.com/hc/en-us',
              label: 'Support',
            },
            {
              href: 'https://support.sumologic.com/hc/en-us/community/topics',
              label: 'Community',
            },
            {
              href: 'https://status.sumologic.com',
              label: 'Service Status',
            },
            {
              href: 'http://ideas.sumologic.com',
              label: 'Feature Requests',
            },
          ],
          label: 'Help',
          position: 'left',
          to: '#',
          type: 'dropdown',
        },
        {
          'aria-label': 'GitHub repository',
          className: 'header-github-link',
          position: 'right',
          to: 'https://github.com/SumoLogic/sumologic-documentation',
        },
      ],
    },
    prism: {
      additionalLanguages: [
        'csharp',
        'powershell',
        'java',
        'markdown',
        'scala',
      ],
      darkTheme: darkCodeTheme,
      theme: lightCodeTheme,
    },
  },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        }
      },
    }),
  },
};
