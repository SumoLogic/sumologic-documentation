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
  title: 'Sumo Logic Docs',
  tagline: '',
  url: process.env.HOSTNAME || "http://localhost:3000",
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
        theme: {
          customCss: require.resolve('./src/css/sumo.scss'),
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
    ['@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['js'], // /myPage.html -> /myPage
        redirects: [
          {
            from: '/src/theme/NotFound.js',
            to: '/',
          },
        ],
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
      content: `⭐️ Welcome to the new Sumo Logic Doc Site! If you want the old site go to https://helpstaging.sumologic.com ⭐️`,
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
      defaultMode: 'dark',
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
            label: 'Guides',
            to: '#',
            // Map of content into the Guides mega-drop-down, Number associated to the doc links in this section
            // activeregex controls the top nav content, icon uses Google Material name code https://fonts.google.com/icons?query=material
            layout: [
              '0 1 3 4',
              '0 1 3 4',
              '0 1 3 4',
              '0 1 3 4',
              '0 2 3 5',
              '0 2 3 5',
              '0 2 3 5',
              '0 2 3 5',
              '0 2 3 5',
              '0 2 3 5',
            ],
            items_: [
              {
                // 0
                label: 'Getting Started',
                items: [
                  {
                    className: 'horizontal-rule',
                    label: 'Get Started',
                    sublabel: 'Accounts, concepts, & more',
                    to: '/docs/get-started',
                    icon: 'fact_check',
                    activeBaseRegex: '^/docs/get-started/.*',
                  },
                  {
                    label: 'Send Data',
                    sublabel: 'Set up collectors, data sources',
                    to: '/docs/send-data',
                    icon: 'open_in_new',
                    activeBaseRegex: '^/docs/send-data/.*',
                  },
                  {
                    label: 'Apps and Integrations',
                    sublabel: 'Insights from data sources',
                    to: 'docs/integrations',
                    icon: 'apps',
                    activeBaseRegex: '^/docs/integrations/.*',
                  },
                  {
                    label: 'Manage Sumo',
                    sublabel: 'Set up and manage Sumo',
                    to: '/docs/manage',
                    icon: 'start',
                    activeBaseRegex: '^/docs/manage/.*',
                  },
                  {
                    label: 'Quickstart Tutorials',
                    sublabel: 'Fast-track Sumo setup',
                    to: '/docs/quickstart',
                    icon: 'backup_table',
                    activeBaseRegex: '^/docs/quickstart/.*',
                  },
                ],
              },
              {
                // 1
                label: 'Search, Metrics, Logs',
                items: [
                  {
                    className: 'horizontal-rule',
                    label: 'Search and Logs',
                    sublabel: 'Find data with queries',
                    to: '/docs/search',
                    icon: 'view_day',
                    activeBaseRegex: '^/docs/search/.*',
                  },
                  {
                    label: 'Alerts and Dashboards',
                    sublabel: 'Visualize data and set alerts',
                    to: '/docs/alerts',
                    icon: 'dashboard',
                    activeBaseRegex: '^/docs/(dashboards|dashboards-new|alerts)',
                  },
                  {
                    label: 'Metrics',
                    sublabel: 'Assess & track performance',
                    to: '/docs/metrics',
                    icon: 'timeline',
                    activeBaseRegex: '^/docs/metrics/.*',
                  },
                ],
              },
              {
                // 2
                label: 'App Performance',
                items: [
                  {
                    className: 'horizontal-rule',
                    label: 'Traces',
                    sublabel: 'Review traces and spans',
                    to: '/docs/apm/traces',
                    icon: 'view_timeline',
                    activeBaseRegex: '^/docs/apm/traces/.*',
                  },
                  {
                    label: 'Real User Monitoring',
                    sublabel: 'Monitor user activity',
                    to: '/docs/apm/real-user-monitoring',
                    icon: 'contacts',
                    activeBaseRegex: '^/docs/apm/real-user-monitoring/.*',
                  },
                ],
              },
              {
                // 3
                label: 'Observability',
                items: [
                  {
                    className: 'horizontal-rule',
                    label: 'About Observability',
                    sublabel: 'Learn about Observability',
                    to: '/docs/observability',
                    icon: 'data_exploration',
                    activeBaseRegex: '^/docs/observability/about',
                  },
                  {
                    label: 'Kubernetes Observability',
                    sublabel: 'Deploy and monitor K8s',
                    to: '/docs/observability/kubernetes',
                    icon: 'settings_suggest',
                    activeBaseRegex: '^/docs/observability/kubernetes/.*',
                  },
                  {
                    label: 'AWS Observability',
                    sublabel: 'Monitor AWS data',
                    to: '/docs/observability/aws',
                    icon: 'polyline',
                    activeBaseRegex: '^/docs/observability/aws/.*',
                  },
                  {
                    label: 'Root Cause Explorer',
                    sublabel: 'Troubleshoot apps & services',
                    to: '/docs/observability/root-cause-explorer',
                    icon: 'widgets',
                    activeBaseRegex: '^/docs/observability/root-cause-explorer',
                  },
                  // Links to Sensu docs currently
                  {
                    label: 'Sensu',
                    sublabel: 'Investigate issues',
                    to: 'https://docs.sensu.io/sensu-go/latest/',
                    icon: 'model_training',
                    activeBaseRegex: '^/docs/(incidents)/.*',
                  },
                ],
              },
              {
                // 4 - What would this link to?
                label: 'Security and Incidents',
                items: [
                  {
                    className: 'horizontal-rule',
                    label: 'Cloud SIEM Enterprise',
                    sublabel: 'Security event management',
                    to: '/docs/cse',
                    icon: 'security',
                    activeBaseRegex: '^/docs/(cse)/.*',
                  },
                  // When SOAR is added, you can update to: to the docs
                  {
                    label: 'Sumo Logic SOAR',
                    sublabel: 'Automate incident response',
                    to: 'https://www.sumologic.com/solutions/cloud-soar/',
                    icon: 'grid_4x4',
                    activeBaseRegex: '^/docs/security/.*',
                  },
                ],
              },
              {
                // 4
                label: 'Other Solutions',
                items: [
                  {
                    className: 'horizontal-rule',
                    label: 'Global Intelligence',
                    sublabel: 'Review security issues',
                    to: '/docs/global-intelligence',
                    icon: 'format_list_bulleted',
                    activeBaseRegex: '^/docs/(global-intelligence)/.*',
                  },
                  {
                    label: 'Software Dev Optimization',
                    sublabel: 'DevOps pipeline integration',
                    to: '/docs/sdo',
                    icon: 'code',
                    activeBaseRegex: '^/docs/(sdo)/.*',
                  },
                ],
              },
            ],
          },
          {
            label: 'API',
            position: 'left',
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
            to: '/docs/releasenotes',
            position: 'left',
          },
          {
            label: 'Contribute',
            to: '/docs/contributing',
            position: 'left',
          },
          {
            label: 'Help',
            position: 'left',
            type: 'dropdown',
            items:[
              {
                label: 'Support',
                href: 'https://support.sumologic.com/hc/en-us',
              },
              {
                label: 'Training',
                href: 'https://www.sumologic.com/learn/training',
              },
              {
                label: 'Community',
                href: 'https://support.sumologic.com/hc/en-us/community/topics',
              },
              {
                label: 'Service Status',
                href: 'https://status.sumologic.com',
              },
            ]
          },
          {
            //Trial button
            label: 'Start a Free Trial',
            to: 'https://www.sumologic.com/sign-up',
            position: 'right',
            className: 'navbar-trial',
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
                label: 'Training & Certifications',
                to: 'https://www.sumologic.com/learn/training/',
              },
              {
                label: 'DevOps Glossary',
                to: 'https://www.sumologic.com/glossary/',
              },
              {
                label: 'Request Demo',
                to: 'https://www.sumologic.com/request-demo/',
              }
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
                label: 'Events & Webinars',
                href: 'https://www.sumologic.com/events/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/SumoLogic',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UCI16kViradUnvH6DiQmwdqw',
              }
            ],
          },
          {
            title: 'Open Source',
            items: [
              {
                label: 'Sumo Docs GitHub',
                href: 'https://github.com/SumoLogic/sumologic-documentation',
              },
              {
                label: 'How to Contribute',
                to: '/docs/contributing',
              },
              {
                label: 'Sumo Logic GitHub',
                href: 'https://github.com/SumoLogic',
              },
              {
                label: 'Sumo Labs Projects',
                href: 'https://github.com/SumoLogic-Labs',
              },
              {
                label: 'Sumo Dojo Slack',
                href: 'https://sumodojo.slack.com/',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Statement',
                href: 'https://www.sumologic.com/privacy-statement/',
              },
              {
                label: 'Terms of Use',
                to: 'https://www.sumologic.com/terms-conditions/',
              },
              {
                label: 'Contact Us',
                href: 'https://www.sumologic.com/contact-us/',
              },
              {
                label: 'Legal',
                href: 'https://www.sumologic.com/legal/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}, Sumo Logic Inc. | Built with Docusaurus.`,
      },
    }),
};
