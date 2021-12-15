// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Sumo Logic Docs',
  tagline: '',
  url: 'https://help.dumologic.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumodocs', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/SumoLogic/sumologic-documentation',
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
  ],
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    'react-iframe',
    /* See this site to configure - live editor https://github.com/jlvandenhout/docusaurus-plugin-docs-editor
       Requires adding OAUTH app https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app
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
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
    // SEO Global Metadata
    metadata: [{name: 'keywords', content: 'sumo logic, documentation, tutorials, quick starts'}],
    //Algolia Search -- FAKE FOR NOW! Replace.
    algolia: {
      appId: 'R2IYF7ETH7',
      apiKey: '599cec31baffa4868cae4e79f180729b',
      indexName: 'docsearch',
      // Optional: see doc section below
      contextualSearch: false,
      // Optional: see doc section below
      //appId: 'YOUR_APP_ID',
      // Optional: Algolia search parameters
      searchParameters: {},
      //... other Algolia params
    },
      hideableSidebar: true,
      navbar: {
        //title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          srcDark: 'img/sumo-logo.svg',
          src: 'img/sumo-logo-dark.svg',
        },
        items: [
          {
            label: 'Guides',
            to: '#',
            layout: [
              '0 1 2 3',
              '0 1 2 3',
              '0 1 2 3',
              '0 1 2 4',
              '0 1 2 4',
              '0 1 2 4',
            ],
            items_: [ // Use name codes for icons from the Material Site https://fonts.google.com/icons?query=material
              {
                label: 'Getting Started',
                items: [
                  {
                    label: 'Sumo Accounts',
                    sublabel: 'Get and configure an account',
                    to: 'docs/get-started',
                    icon: 'fact_check',
                    activeBaseRegex: '/build/.*',
                  },
                  {
                    label: 'Sumo Concepts',
                    sublabel: 'Learn the basics!',
                    to: 'docs/get-started',
                    icon: 'backup_table',
                    activeBaseRegex: '/build/.*',
                  },
                  {
                    label: 'Send Data',
                    sublabel: 'Collectors, Sources, and more',
                    to: 'docs/get-started',
                    icon: 'open_in_new',
                    activeBaseRegex: '/build/.*',
                  },
                  {
                    label: 'Apps & Integrations',
                    sublabel: 'Gain insights from data sources',
                    to: 'docs/get-started',
                    icon: 'apps',
                    activeBaseRegex: '/build/.*',
                  },
                ],
              },
              {
                label: 'Metrics and Logs',
                items: [
                  {
                    label: 'Dashboards',
                    sublabel: 'Create and configure visuals and alerts',
                    to: 'docs/get-started',
                    icon: 'dashboard',
                    activeBaseRegex: 'chrysalis-docs.*',
                  },
                  {
                    label: 'Searches and Logs',
                    sublabel: 'Find log data with queries',
                    to: 'docs/get-started',
                    icon: 'view_day',
                    activeBaseRegex: 'bee/.*',
                  },
                  {
                    label: 'Metrics and Logs',
                    sublabel: 'Find metrics data with queries',
                    to: 'docs/get-started',
                    icon: 'auto_graph',
                    activeBaseRegex: 'hornet/.*',
                  },
                ],
              },
              {
                label: 'Observability',
                items: [
                  {
                    label: 'About Observability',
                    sublabel: 'Learn about Observability features',
                    to: 'docs/get-started',
                    icon: 'data_exploration',
                    activeBaseRegex: 'iota.rs/.*',
                  },
                  {
                    label: 'Configure Observability Collection',
                    sublabel: 'Configure and deploy collection options',
                    to: 'docs/get-started',
                    icon: 'settings_suggest',
                    activeBaseRegex: 'identity.rs/.*',
                  },
                  {
                    label: 'AWS Observability',
                    sublabel: 'Deploy and collect AWS data',
                    to: 'docs/get-started',
                    icon: 'polyline',
                    activeBaseRegex: 'wallet.rs/.*',
                  },
                  {
                    label: 'Root Cause Explorer',
                    sublabel: 'Learn what caused issues',
                    to: 'docs/get-started',
                    icon: 'widgets',
                    activeBaseRegex: 'stronghold.rs/.*',
                  },
                ],
              },
              {
                label: 'Developers',
                items: [
                  {
                    label: 'Release Notes',
                    sublabel: 'New features, bug fixes, and more',
                    to: 'smart-contracts/overview',
                    icon: 'format_list_bulleted',
                    activeBaseRegex: 'smart-contracts/.*',
                  },
                  {
                    label: 'API Guides',
                    sublabel: 'Extend the Sumo APIs',
                    to: 'smart-contracts/overview',
                    icon: 'grid_4x4',
                    activeBaseRegex: 'smart-contracts/.*',
                  },
                ],
              },
              {
                label: 'Support Contacts',
                items: [
                  {
                    label: 'Online Training',
                    sublabel: 'Online courses and certifications',
                    to: 'smart-contracts/overview',
                    icon: 'model_training',
                    activeBaseRegex: 'smart-contracts/.*',
                  },
                  {
                    label: 'Tickets and Help',
                    sublabel: 'Contact support and tickets',
                    to: 'smart-contracts/overview',
                    icon: 'question_answer',
                    activeBaseRegex: 'smart-contracts/.*',
                  },
                ],
              },
            ],
          },
          {
            label: 'Doc Contributions',
            to: '/docs/contribution',
            position: 'left',
          },
          {
            href: 'https://www.sumologic.com/learn/training/',
            label: 'Training',
            position: 'left',
          },
          /*{
            href: 'https://github.com/SumoLogic/sumologic-documentation',
            className: 'navbar-item-github',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'LEARN',
            items: [
              {
                label: 'Training',
                to: 'https://www.sumologic.com/learn/training/',
              },
              {
                label: 'Doc Contributions',
                to: '/docs/contribution',
              },
              {
                label: 'Help Center',
                to: 'https://support.sumologic.com/hc/en-us',
              }
            ],
          },
          {
            title: 'Sumo Community',
            items: [
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
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docs GitHub',
                href: 'https://github.com/SumoLogic/sumologic-documentation',
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
        // Dark/light switch icon options
        switchConfig: {
          // Icon for the switch while in dark mode
          darkIcon: 'light_mode',
  
          // CSS to apply to dark icon
          darkIconStyle: {
            fontFamily: 'Material Icons',
          },
  
          lightIcon: 'dark_mode',
  
          lightIconStyle: {
            fontFamily: 'Material Icons',
          },
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'powershell', 'java', 'markdown'],
      },
    }),
};
