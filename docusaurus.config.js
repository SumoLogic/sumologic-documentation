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
  title: 'Welcome to Sumo Docs!',
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
      src: 'https://js.sitesearch360.com/plugin/bundle/3113.js',
      async: true,
    },
  ],
  staticDirectories: ['static'],
  i18n: {
    // https://docusaurus.io/docs/i18n/tutorial
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    localeConfigs: {
      en: { label: 'English' },
      ja: { label: '日本語' },
    },
  },
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
          showReadingTime: true, // When set to false, the "x min read" won't be shown
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: 'rss',
            // https://help.sumologic.com/release-notes-service/rss.xml
            title: 'Sumo Logic Service Release Notes',
            description: 'Here you will find a chronological list of the newest Sumo Logic service features and bug fixes',
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
  //  [
  //    'redocusaurus',
  //    {
  //      specs: [
  //        {
  //          id: 'sumoapi',
  //          //specUrl: 'https://api.sumologic.com/docs/sumologic-api.yaml',
  //          spec: 'sumologic-api.yaml',
  //          route: '/sumoapi/',
  //        },
  //      ],
  //    },
  //  ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    'react-iframe',
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
         blogDescription: 'New and enhanced Cloud SIEM features, updated content (like rules, log mappers and parsers), bug fixes, and other important announcements.',
         showReadingTime: true, // When set to false, the "x min read" won't be shown
         readingTime: ({content, frontMatter, defaultReadingTime}) =>
           defaultReadingTime({content, options: {wordsPerMinute: 200}}),
         feedOptions: {
           type: 'rss',
           // https://help.sumologic.com/release-notes-cse/rss.xml
           title: 'Sumo Logic Cloud SIEM Release Notes',
           description: 'New and enhanced Cloud SIEM features, updated content (like rules, log mappers and parsers), bug fixes, and other important announcements.',
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
          blogDescription: 'New features and changes to our APIs and Live Tail CLI.',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          showReadingTime: true, // When set to false, the "x min read" won't be shown
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: 'rss',
            // https://help.sumologic.com/release-notes-developer/rss.xml
            title: 'Sumo Logic Developer Release Notes',
            description: 'Here you will find a chronological list of the newest Sumo Logic developer features and bug fixes.',
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
          showReadingTime: true, // When set to false, the "x min read" won't be shown
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 200}}),
          feedOptions: {
            type: 'rss',
            // https://help.sumologic.com/release-notes-collector/rss.xml
            title: 'Sumo Logic Collector Release Notes',
            description: 'Here you will find a chronological list of the newest Sumo Logic collector features and bug fixes',
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
    /* // Optional: See this site to configure - live editor https://github.com/jlvandenhout/docusaurus-plugin-docs-editor
       // Requires adding OAUTH app https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app
    [
      '@jlvandenhout/docusaurus-plugin-docs-editor',
      {
        // REQUIRED - The base route to the editor
        route: 'edit',
        docs: {
          // The username that owns the docs, defaults to siteConfig.organizationName
          owner: '',
          // The repository that contains the docs, defaults to siteConfig.projectName
          repo: '',
          // The path to the docs section in your repository
          path: 'docs',
        },
        static: {
          // The path to the static content section in your repository
          path: 'static',
        },


        // GitHub OAuth Application settings
        github: {
          // REQUIRED - The Client ID you got from the GitHub OAuth App setup
          clientId: '',
          // REQUIRED - The plugin will append the authorization code to this URL
          tokenUrl: '',
          // The request method to use (GET or POST), defaults to GET
          method: '',
        },
      }
    ] */

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
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
      content: `📣 Welcome to the new Sumo Logic Docs Site! To view our legacy docs, <a target="_blank" rel="noopener noreferrer" href="https://helpstaging.sumologic.com">click here</a>.`,
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
    //algolia: {
     // The application ID provided by Algolia
      //appId: 'YKDUX9XT89',
      // Public API key: it is safe to commit it
      //apiKey: '72699d7d65c635f1fb1505dec1bedc51',
      //indexName: 'sumo-docs-staging',
      // Optional: see doc section below
      //contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //externalUrlRegex: 'external\\.com|domain\\.com',
      // Optional: Algolia search parameters
      //searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      //searchPagePath: 'search',
      //... other Algolia params
    //},
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', `scala`],
    },
      navbar: {
        logo: {
          alt: 'My Site Logo',
          srcDark: 'img/sumo-logo.svg',
          src: 'img/sumo-logo-dark.svg',
        },
        items: [
          {
            //Trial button
            label: 'Start a Free Trial',
            to: 'https://www.sumologic.com/sign-up',
            position: 'right',
            className: 'navbar-trial',
          },
          {
            label: 'Guides',
            position: 'left',
            to: '#',
            // Redocusaurus
            // to: '/sumoapi',
            type: 'dropdown',
            items:[
              {
                label: 'Send Data',
                to: '/docs/send-data',
                activeBaseRegex: '^/docs/send-data/.*',
              },
              {
                label: 'Search Logs',
                to: '/docs/search',
                activeBaseRegex: '^/docs/search/.*',
              },
              {
                label: 'Metrics',
                to: '/docs/metrics',
                activeBaseRegex: '^/docs/metrics/.*',
              },
              {
                label: 'Apps/Integrations',
                to: '/docs/integrations',
                activeBaseRegex: '^/docs/integrations/.*',
              },
              {
                label: 'Manage Account',
                to: '/docs/manage',
                activeBaseRegex: '^/docs/manage/.*',
              },
              {
                label: 'Observability',
                to: '/docs/observability',
                activeBaseRegex: '^/docs/observability/about',
              },
              {
                label: 'Traces',
                to: '/docs/apm/traces',
                activeBaseRegex: '^/docs/apm/.*',
              },
              {
                label: 'Alerts',
                to: '/docs/alerts',
              },
              {
                label: 'Cloud SIEM',
                to: '/docs/cse',
                activeBaseRegex: '^/docs/(cse)/.*',
              },
              {
                label: 'Cloud SOAR',
                href: 'https://www.sumologic.com/solutions/cloud-soar',
                activeBaseRegex: '^/docs/security/.*',
              },
              {
                label: 'CI/CD',
                to: '/docs/sdo',
                activeBaseRegex: '^/docs/(sdo)/.*',
              },
            ]
          },
          {
            label: 'API',
            position: 'left',
            to: '#',
            // Redocusaurus
            // to: '/sumoapi',
            type: 'dropdown',
            items:[
              {
                label: 'Docs',
                to: '/docs/api',
              },
              {
                label: 'Reference',
                href: 'https://api.sumologic.com/docs/',
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
            ]
          },
          {
            label: 'Contribute to Docs',
            to: '/docs/contributing',
            position: 'left',
          },
          {
            label: 'Help',
            position: 'left',
            to: '#',
            type: 'dropdown',
            items:[
              {
                label: 'Training',
                href: 'https://www.sumologic.com/learn/training',
              },
              {
                label: 'Support',
                href: 'https://support.sumologic.com/hc/en-us',
              },
              {
                label: 'Community',
                href: 'https://support.sumologic.com/hc/en-us/community/topics',
              },
              {
                label: 'Service Status',
                href: 'https://status.sumologic.com',
              },
              {
                label: 'Feature Requests',
                href: 'http://ideas.sumologic.com',
              },
            ]
          },
      //  {
      //    i18n -- add this back when we are ready for translations
      //    type: 'localeDropdown',
      //    position: 'right',
      //  },
          {
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
            to: 'https://github.com/SumoLogic/sumologic-documentation',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
                    {
            title: 'LEARN',
            items: [
              {
                label: 'Get Certified for Free',
                href: 'https://www.sumologic.com/learn/training/',
              },
              {
                label: 'Events & Webinars',
                href: 'https://www.sumologic.com/events/',
              },
              {
                label: 'Request Demo',
                href: 'https://www.sumologic.com/request-demo/',
              },
            ],
          },
          {
            title: 'Sumo Community',
            items: [
              {
                label: 'About Us',
                href: 'https://www.sumologic.com/company/about-us/',
              },
              {
                label: 'Community',
                href: 'https://support.sumologic.com/hc/en-us/community/topics',
              },
              {
                label: 'Sumo Dojo Slack',
                href: 'https://sumodojo.slack.com/',
              },
            ],
          },
          {
            title: 'Open Source',
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
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}, Sumo Logic Inc. | Built with Docusaurus.`,
      },
    }),
};
