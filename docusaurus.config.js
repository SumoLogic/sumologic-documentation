// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// Full configuration options detailed here: https://docusaurus.io/docs/api/docusaurus-config

// Documentation page id for open source: sumo-logic-open-source-projects

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

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
            customTypes: {
              sumo: {
                infima: true,
                svg: '<svg width="166" height="150" viewBox="0 0 166 150" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.82 0C15.23 0 6.82 5.43 3.95 12.91V25.68C6.15 31.49 12.12 34.55 24.95 37.35C29.16 38.29 32.09 38.99 33.73 39.35C36.23 40.07 38.39 41.19 39.27 43.09V47.18C38.04 49.95 34.27 51.42 29.27 51.42C25.9342 51.4914 22.6212 50.854 19.55 49.55C16.62 48.38 13.11 46.04 8.78 42.55L0 52.38C9.48 60.81 17.56 63.74 28.92 63.74C41.86 63.74 50.7 58.56 53.56 50.34C53.56 48.34 53.56 39.81 53.56 37.64C51.13 31.18 44.4 27.96 31.32 25.06C27.1 24.12 24.18 23.42 22.54 22.95C20.08 22.25 18.41 21.35 17.73 19.95V16.52C18.82 13.9 22.41 12.3 27.45 12.3C33.89 12.3 38.34 13.82 45.37 19.3L53.56 9.3C45.32 2.46 38.13 0 27.82 0ZM148.46 2V38.07C148.46 46.15 143.78 50.48 136.17 50.48C129.61 50.48 126.17 46.73 126.17 40.48V1.99H110.99V44.73C110.99 56.32 117.99 63.73 132.19 63.73C140.73 63.73 146.59 60.68 149.75 55.53V61.86H163.68V1.99L148.46 2ZM69.75 85.88C61.8967 85.88 55.9233 88.8067 51.83 94.66C48.56 89.04 42.83 85.88 35.21 85.88C27.36 85.88 21.63 88.81 18.11 94.55V87.87H3.95V147.7H19.17V110.93C19.17 103.93 23.03 98.98 29.71 98.98C36.03 98.98 39.19 102.85 39.19 110.46V147.69H54.41V110.93C54.41 103.93 58.27 98.98 64.95 98.98C71.63 98.98 74.43 103.32 74.43 110.46V147.69H89.65V105.89C89.65 93.6 82.39 85.87 69.75 85.87V85.88ZM165.89 105.12C161.48 93.28 150.7 85.88 137.04 85.88C123.38 85.88 112.48 93.28 108.04 105.12V130.33C112.46 142.18 123.26 149.58 137.04 149.58C150.82 149.58 161.48 142.18 165.89 130.33V105.12ZM122.83 108.92C125.2 102.61 130.29 98.76 137.04 98.76C143.79 98.76 148.76 102.61 151.13 108.92C151.13 112.1 151.13 123.64 151.13 126.66C148.76 132.97 143.7 136.66 137.05 136.66C130.4 136.66 125.22 132.93 122.84 126.66L122.83 108.92Z" fill="white"/></svg>'
              }
            }
          },
        },
        theme: {
          customCss: require.resolve('./src/css/sumo.scss'),
        },
      }),
    ],
    [
      'redocusaurus',
      {
        specs: [{
            id: 'sumoapi',
            //specUrl: 'https://api.sumologic.com/docs/sumologic-api.yaml',
            spec: 'sumologic-api.yaml',
            route: '/sumoapi/',
          },],
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    'react-iframe',
    ['@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            //CID REDIRECTS: Enter a from: of the /cid=##### with the path to the file for to: for each CID!
            to: '/docs/contribution/markdown-features',
            from: '/cid=1234',
          },
        ]
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
    metadata: [{name: 'keywords', content: 'sumo logic, documentation, tutorials, quick starts'}],
    announcementBar: {
      id: 'announcementBar',
      content: `⭐️ Welcome to the new Sumo Logic Doc Site! ⭐️`,
    },
    imageZoom: {
      selector: '.markdown :not(a) > img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        background: 'rgba(0, 0, 0, 0.6)',
      },
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
                    label: 'Get Started',
                    sublabel: 'Accounts, concepts, & more',
                    to: '/docs/get-started',
                    icon: 'fact_check',
                    activeBaseRegex: '^/docs/get-started/.*',
                  },
                  {
                    label: 'Quick Start',
                    sublabel: 'Fast track Sumo',
                    to: '/docs/quickstart',
                    icon: 'backup_table',
                    activeBaseRegex: '^/docs/quickstart/.*',
                  },
                  {
                    label: 'Manage Sumo',
                    sublabel: 'Manage settings as admin',
                    to: '/docs/manage',
                    icon: 'start',
                    activeBaseRegex: '^/docs/manage/.*',
                  },
                  {
                    label: 'Integrations',
                    sublabel: 'Insights from data sources',
                    to: 'docs/integrations',
                    icon: 'apps',
                    activeBaseRegex: '^/docs/integrations/.*',
                  },
                  {
                    label: 'Send Data',
                    sublabel: 'Collectors, sources, & more',
                    to: '/docs/send-data',
                    icon: 'open_in_new',
                    activeBaseRegex: '^/docs/send-data/.*',
                  },
                ],
              },
              {
                // 1
                label: 'Metrics and Logs',
                items: [
                  {
                    label: 'Dashboards & Visuals',
                    sublabel: 'Configure visuals & alerts',
                    to: '/docs/dashboards-new',
                    icon: 'dashboard',
                    activeBaseRegex: '^/docs/(dashboards|dashboards-new|alerts)',
                  },
                  {
                    label: 'Searches and Logs',
                    sublabel: 'Find data with queries',
                    to: '/docs/search',
                    icon: 'view_day',
                    activeBaseRegex: '^/docs/search/.*',
                  },
                  {
                    label: 'Metrics and Logs',
                    sublabel: 'Find data with queries',
                    to: '/docs/metrics',
                    icon: 'timeline',
                    activeBaseRegex: '^/docs/metrics/.*',
                  },
                ],
              },
              {
                // 2
                label: 'APM',
                items: [
                  {
                    label: 'Traces',
                    sublabel: 'Review traces & spans',
                    to: '/docs/apm/traces',
                    icon: 'view_timeline',
                    activeBaseRegex: '^/docs/apm/traces/.*',
                  },
                  {
                    label: 'Real User Monitoring',
                    sublabel: 'Monitor users',
                    to: '/docs/apm/rum',
                    icon: 'contacts',
                    activeBaseRegex: '^/docs/apm/rum/.*',
                  },
                ],
              },
              {
                // 3
                label: 'Infrastructure Monitoring',
                items: [
                  {
                    label: 'About Observability',
                    sublabel: 'Learn about Observability',
                    to: '/docs/observability',
                    icon: 'data_exploration',
                    activeBaseRegex: '^/docs/observability/about-observability-solution',
                  },
                  {
                    label: 'Kubernetes',
                    sublabel: 'Deploy & collect Kubernetes',
                    to: '/docs/observability/kubernetes-solution',
                    icon: 'settings_suggest',
                    activeBaseRegex: '^/docs/observability/kubernetes-solution/.*',
                  },
                  {
                    label: 'AWS Observability',
                    sublabel: 'Deploy & collect AWS data',
                    to: '/docs/observability/aws-observability-solution',
                    icon: 'polyline',
                    activeBaseRegex: '^/docs/observability/aws-observability-solution/.*',
                  },
                  {
                    label: 'Root Cause Explorer',
                    sublabel: 'Learn what caused issues',
                    to: '/docs/observability/root-cause-explorer',
                    icon: 'widgets',
                    activeBaseRegex: '^/docs/observability/root-cause-explorer',
                  },
                ],
              },

              {
                // 4 - What would this link to?
                label: 'Security & Incidents',
                items: [
                  {
                    label: 'CSE',
                    sublabel: 'Incident investigation',
                    to: '/docs/cse',
                    icon: 'security',
                    activeBaseRegex: '^/docs/(cse)/.*',
                  },
                  // When SOAR is added, you can update to: to the docs
                  {
                    label: 'Sumo Logic SOAR',
                    sublabel: 'Monitor security',
                    to: 'https://www.sumologic.com/solutions/cloud-soar/',
                    icon: 'grid_4x4',
                    activeBaseRegex: '^/docs/security/.*',
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
                // 4
                label: 'Other Solutions',
                items: [
                  {
                    label: 'Global Intelligence',
                    sublabel: 'Review security issues',
                    to: '/docs/global-intelligence',
                    icon: 'format_list_bulleted',
                    activeBaseRegex: '^/docs/(global-intelligence)/.*',
                  },
                  {
                    label: 'SDO Solution',
                    sublabel: 'Software Dev Optimization',
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
            to: '/sumoapi',
            position: 'left',
          },
          {
            label: 'Doc Contributions',
            to: '/docs/contribution',
            position: 'left',
          },
          {
            label: 'Release Notes',
            to: '/docs/releasenotes',
          },
          {
            //Trial button
            label: 'Start a Free Trial',
            href: 'https://www.sumologic.com/sign-up/',
            position: 'right',
            className: 'navbar-trial',
          },
          {
            // i18n
            type: 'localeDropdown',
            position: 'right',
          },
          {
            position: 'right',
            className: 'header-github-link',
            type: 'dropdown',
            'aria-label': 'GitHub repository',
            items:[
              {
                label: 'Contribution Guide',
                to: '/docs/contribution',
              },
              {
                label: 'Docs GitHub',
                href: 'https://github.com/SumoLogic/sumologic-documentation',
              },
            ]
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
                label: 'Documentation Contributions',
                to: '/docs/contribution',
              },
              {
                label: 'Help Center',
                to: 'https://support.sumologic.com/hc/en-us',
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
                label: 'Documentation GitHub',
                href: 'https://github.com/SumoLogic/sumologic-documentation',
              },
              {
                label: 'Sumo Logic GitHub',
                href: 'https://github.com/SumoLogic',
              },
              {
                label: 'GitHub Incubator Projects',
                href: 'https://github.com/SumoLogic-Incubator',
              },
              {
                label: 'Sumo Dojo Slack',
                href: 'https://sumodojo.slack.com/',
              },
            ],
          },
        ],
        logo: {
          alt: 'Sumo Logic',
          src: 'img/sumo-square.svg',
          href: 'https://sumologic.com'
        },
        copyright: `Copyright © ${new Date().getFullYear()}, Sumo Logic Inc. | Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: 'dark',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', `scala`],
      },
    }),
};
