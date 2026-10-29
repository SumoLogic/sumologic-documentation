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
  tagline: 'Documentation, guides, and API references for Sumo Logic',
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
      tagName: 'link',
      attributes: {
        rel: 'llms-txt',
        href: '/llms.txt',
        type: 'text/plain',
        title: 'LLM Documentation Index',
      },
    },
    // Intellimize
    {
      tagName: 'style',
      attributes: {},
      innerHTML:
        '.anti-flicker, .anti-flicker * { visibility: hidden !important; opacity: 0 !important; }',
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML:
        "(function(e,t,p){var n=document.documentElement,s={p:[],r:[]},u={p:s.p,r:s.r,push:function(e){s.p.push(e)},ready:function(e){s.r.push(e)}};e.intellimize=u,n.className+=' '+p,setTimeout(function(){n.className=n.className.replace(RegExp(' ?'+p),'')},t)})(window, 4000, 'anti-flicker');",
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function() {
        var s = document.createElement('script');
        s.src = 'https://cdn.intellimize.co/snippet/117845498.js';
        s.async = true;
        s.onerror = function() {
          document.documentElement.className =
            document.documentElement.className.replace(RegExp(' ?anti-flicker'), '');
        };
        document.head.appendChild(s);
      })();`,
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://api.intellimize.co',
        crossorigin: 'anonymous'
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://117845498.intellimizeio.com'
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://log.intellimize.co',
        crossorigin: 'anonymous'
      },
    },
    // Sumo Logic RUM
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
    require.resolve('./src/client-modules/fixAnchorScroll.js'),
  ],
  storage: {
    type: 'localStorage',
    namespace: true,
  },
  future: {
    faster: true,
    v4: {
      siteStorageNamespacing: true,
      fasterByDefault: true,
      removeLegacyPostBuildHeadAttribute: true,
    },
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
              'training',
            ],
          },
          exclude: [
            '**/reuse/**',
            '**/ja/**',
          ],
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'daily',
          ignorePatterns: [
            '/docs/reuse/**',
            '/docs/preview/**',
            '/ja/**',
            '/files/**',
            '/release-notes-*/archive/**',
            '/release-notes-*/2021/**',
          ],
          filename: 'sitemap.xml',
        },
        blog: {
          blogTitle: 'Sumo Logic Service Release Notes',
          path: 'blog-service',
          routeBasePath: 'release-notes-service',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          blogDescription: 'Latest features and bug fixes for Sumo Logic log analytics, AI and automation, observability, alerts, sources, and more.',
          postsPerPage: 'ALL',
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          feedOptions: {
            type: 'rss',
            xslt: true,
            title: 'Sumo Logic Service Release Notes',
            description: 'Latest features and bug fixes for Sumo Logic log analytics, AI and automation, observability, alerts, sources, and more.',
            copyright: `© 2010 – ${new Date().getFullYear()} Sumo Logic, Inc.`,
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
            copyright: `© 2010 – ${new Date().getFullYear()} Sumo Logic, Inc.`,
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
          blogDescription: 'Latest features, improvements, and fixes for the Sumo Logic Installed Collector and OpenTelemetry Collector.',
          showReadingTime: false,
          onUntruncatedBlogPosts: 'ignore',
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          feedOptions: {
            type: 'rss',
            xslt: true,
            title: 'Sumo Logic Collector Release Notes',
            description: 'Latest features, improvements, and fixes for the Sumo Logic Installed Collector and OpenTelemetry Collector.',
            copyright: `© 2010 – ${new Date().getFullYear()} Sumo Logic, Inc.`,
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
    require('./src/plugins/markdown-mirror'),
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
      { name: 'keywords', content: 'sumo logic, documentation, log management, observability, cloud siem, monitoring, API, tutorials' },
      { name: 'msvalidate.01', content: 'BA6FBE48309F6E1CFFD055E769857586' },
      { name: 'description', content: 'Sumo Logic documentation for log analytics, cloud monitoring, security, observability, and AI-powered troubleshooting. Get started guides, API references, and release notes.' },
      { property: 'og:site_name', content: 'Sumo Logic Docs' },
      { property: 'og:description', content: 'Sumo Logic documentation for log analytics, cloud monitoring, security, observability, and AI-powered troubleshooting. Get started guides, API references, and release notes.' },
      { property: 'og:image', content: 'https://www.sumologic.com/wp-content/uploads/meta-HomePage_1200x628-1.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '628' },
      { property: 'og:image:alt', content: 'Sumo Logic Docs' },
      { property: 'og:type', content: 'article' },
    ],
    announcementBar: {
      id: 'mobot-banner-v3',
      content: `<img src="https://cdn-service.us2.sumologic.com/ui/images/app/mobot-welcome.png?v=2" height="24" style="vertical-align:middle;margin-right:5px" alt="Mobot"/>Meet the new <a href="https://www.sumologic.com/help/docs/search/mobot/"><strong>Mobot</strong></a> — now a full investigation partner, not just a query tool.`,
      backgroundColor: '#0055B7',
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
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', 'scala', 'bash', 'diff', 'json', `sql`, `sumo`, `metrics`],
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
                svgIcon: 'm5.339 12.181-2.002-1.925v-3.21l5.338 5.135z M16 0S10.01-.013 5.338 4.48c-1.995 1.918-2.001 5.134-.667 6.417 1.335 1.284 4.677 1.277 6.673-.642C16.014 5.763 16 0 16 0M9.342 5.121c0-.71.597-1.284 1.334-1.284s1.335.575 1.335 1.284-.597 1.284-1.335 1.284c-.737 0-1.334-.575-1.334-1.284 M10.55 10.048s.505 2.428-.505 3.4c-1.515 1.457-4.04 1.942-4.04 1.942l.667-4.492zM5.554 5.243s-2.525-.486-3.534.486C.505 7.185 0 9.614 0 9.614l4.67-.642zM4.365 12.4c-.03.04-.048.088-.086.124-.651.626-1.627.314-1.627.314s-.326-.94.325-1.565c.04-.037.088-.054.13-.083l-.304-.294a1.53 1.53 0 0 0-.693.376c-.911.877-.767 2.824-.767 2.824s2.013.151 2.936-.737c.198-.19.325-.422.392-.666z',
                svgViewBox: '0 0 16 16',
              },
              {
                type: 'docSidebar',
                sidebarId: 'senddata',
                label: 'Collectors & Sources',
                svgIcon: 'M9.059 0c.095 0 .19.057.266.114a.3.3 0 0 1 .115.247l.286 1.92c.343.113.647.227.933.38l1.469-1.122a.36.36 0 0 1 .247-.095c.095 0 .191.02.268.095q1.344 1.226 1.715 1.768c.057.057.077.132.077.227s-.02.171-.077.247c-.114.133-.286.362-.534.685s-.419.57-.553.741c.191.36.344.703.439 1.025l1.926.286a.4.4 0 0 1 .247.132c.038.076.133.153.114.247v2.319c0 .095-.075.171-.133.247-.057.076-.19.115-.266.134l-1.926.284c-.133.38-.267.703-.4.95.228.342.61.818 1.105 1.426.057.095.096.17.096.266a.4.4 0 0 1-.096.247c-.19.266-.534.627-1.03 1.12q-.743.742-.972.742a.6.6 0 0 1-.267-.095l-1.43-1.121c-.304.171-.628.303-.952.399-.115.93-.21 1.577-.305 1.92-.057.19-.172.265-.382.265H6.732a.4.4 0 0 1-.248-.076c-.076-.057-.114-.114-.114-.21l-.286-1.918a6 6 0 0 1-.934-.38l-1.467 1.102a.46.46 0 0 1-.268.095.38.38 0 0 1-.267-.114c-.876-.798-1.448-1.368-1.715-1.748a.38.38 0 0 1-.076-.247c0-.095.019-.171.076-.247.114-.133.286-.362.534-.685q.372-.485.571-.74a4.7 4.7 0 0 1-.419-1.026L.232 9.52a.32.32 0 0 1-.19-.134c-.058-.076-.04-.152-.039-.246v-2.3c0-.076-.019-.152.038-.228S.117 6.5.193 6.48L2.1 6.194c.095-.303.229-.626.4-.949-.267-.38-.648-.856-1.105-1.426a.45.45 0 0 1-.095-.247c0-.076.037-.152.095-.247.19-.247.514-.627 1.029-1.12.514-.495.838-.742.991-.742.095 0 .172.02.268.096l1.43 1.101c.304-.152.628-.303.952-.398.115-.931.21-1.597.305-1.939C6.427.114 6.542 0 6.752 0zm-1.24 4.37a3.615 3.615 0 0 0-3.622 3.611c0 1.995 1.62 3.61 3.622 3.61a3.615 3.615 0 0 0 3.622-3.61 3.616 3.616 0 0 0-3.622-3.61',
                svgViewBox: '0 0 16 16',
              },
              {
                type: 'docSidebar',
                sidebarId: 'searchlogs',
                label: 'Log Search',
                svgIcon: 'M84 0H12A12 12 0 0 0 0 12v72a12 12 0 0 0 12 12h72a12 12 0 0 0 12-12V12A12 12 0 0 0 84 0M56 74a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4Zm14-24a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4Zm12-24a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h60a4 4 0 0 1 4 4Z',
              },
              {
                type: 'docSidebar',
                sidebarId: 'integrations',
                label: 'Apps & Integrations',
                svgIcon: 'M5.714 6.476H.762A.764.764 0 0 1 0 5.714V.762C0 .342.343 0 .762 0h4.952c.42 0 .762.343.762.762v4.952a.764.764 0 0 1-.762.762M15.238 6.476h-4.952a.764.764 0 0 1-.762-.762V.762c0-.42.343-.762.762-.762h4.952c.42 0 .762.343.762.762v4.952a.764.764 0 0 1-.762.762M5.714 16H.762A.764.764 0 0 1 0 15.238v-4.952c0-.42.343-.762.762-.762h4.952c.42 0 .762.343.762.762v4.952a.764.764 0 0 1-.762.762M15.238 16h-4.952a.764.764 0 0 1-.762-.762v-4.952c0-.42.343-.762.762-.762h4.952c.42 0 .762.343.762.762v4.952a.764.764 0 0 1-.762.762',
                svgViewBox: '0 0 16 16',
              },
              {
                type: 'docSidebar',
                sidebarId: 'security',
                label: 'Security',
                svgIcon: 'M7.321 15.96Q2.524 14.574 1.5 10.63V2.284L7.321.014zM8.64 0 14.5 2.29v8.361q-1.029 3.966-5.861 5.35z',
                svgViewBox: '0 0 16 16',
                svgFillRule: 'evenodd',
              },
              {
                type: 'docSidebar',
                sidebarId: 'manage',
                label: 'Manage Account',
                svgIcon: 'M7.76 7.173q.321.056.645 0a1.89 1.89 0 1 0-.645 0M4.212 10.792q.027.004.055.003h7.453a.36.36 0 0 0 .36-.365q0-.026-.003-.05C11.84 8.695 9.97 7.913 7.995 7.913s-3.843.782-4.088 2.467a.36.36 0 0 0 .305.412 M15.27 12.787V1.973a.536.536 0 0 0-.535-.535H1.438a.54.54 0 0 0-.538.539v10.81l-.898.841v.86c.295.24.535.535.535.535h14.918c.295 0 .535-.24.535-.535v-.86l-.718-.841zm-1.332-1.225H2.233v-8.93h11.705z',
                svgViewBox: '0 0 16 16',
              },
              {
                type: 'doc',
                docId: 'alerts/index',
                label: 'Alerts',
                svgIcon: 'M15.32 12.8s-2.62-1.886-2.82-5.429c-.2-3.295-.18-5.485-3.84-5.79.12-.171.2-.362.2-.571 0-.553-.46-.991-1.04-.991s-1.04.438-1.04.99c0 .21.08.42.2.591-3.56.305-3.3 2.495-3.48 5.771C3.3 10.914.68 12.8.68 12.8c-.84.59-.66 1.105.38 1.105H5.9v.038C5.9 15.086 6.88 16 8.08 16s2.18-.914 2.18-2.057v-.038h4.7c1.02 0 1.2-.514.36-1.105',
                svgViewBox: '0 0 16 16',
              },
              {
                type: 'doc',
                docId: 'dashboards/index',
                label: 'Dashboards',
                svgIcon: 'M84.6 0H11.4A11.8 11.8 0 0 0 0 11.4v73.2A11.8 11.8 0 0 0 11.4 96h73.2A11.39 11.39 0 0 0 96 84.6V11.4A11.8 11.8 0 0 0 84.6 0M41.88 76.56a3.46 3.46 0 0 1-3.6 3.6h-17.4a3.46 3.46 0 0 1-3.6-3.6v-26.4a4 4 0 0 1 3.6-4.2h17.4a3.46 3.46 0 0 1 3.6 3.6Zm0-46.2a3.46 3.46 0 0 1-3.6 3.6h-17.4c-1.8.6-3.6-1.2-3.6-3V19a3.87 3.87 0 0 1 3.6-3.6h17.4a3.46 3.46 0 0 1 3.6 3.6Zm36.6 46.2a3.46 3.46 0 0 1-3.6 3.6h-17.4a3.46 3.46 0 0 1-3.6-3.6v-11.4a3.87 3.87 0 0 1 3.6-3.6h17.4a3.46 3.46 0 0 1 3.6 3.6Zm0-30.6a3.46 3.46 0 0 1-3.6 3.6h-17.4a3.46 3.46 0 0 1-3.6-3.6V19a3.87 3.87 0 0 1 3.6-3.6h17.4a3.46 3.46 0 0 1 3.6 3.6Z',
              },
              {
                type: 'docSidebar',
                sidebarId: 'platformservices',
                label: 'Platform Services',
                svgIcon: 'M6.096 2.286c.057 0 .114.057.152.095a.34.34 0 0 1 .076.19l.19 1.276c.19.057.4.153.629.267l.99-.742a.27.27 0 0 1 .172-.058.3.3 0 0 1 .172.058c.8.742 1.199 1.18 1.199 1.333a.3.3 0 0 1-.057.152 5 5 0 0 1-.343.457c-.17.21-.304.38-.38.495q.2.4.285.687l1.276.19a.4.4 0 0 1 .152.095c.038.057.057.114.039.152v1.543a.3.3 0 0 1-.057.172c-.038.057-.077.095-.134.095l-1.295.19c-.057.19-.152.4-.266.63.19.266.437.57.742.951a.3.3 0 0 1 .057.172c0 .057-.02.114-.057.152a9 9 0 0 1-.686.743c-.324.323-.533.495-.647.495a.3.3 0 0 1-.171-.057l-.953-.762c-.21.115-.42.19-.648.248-.057.609-.133 1.01-.19 1.276-.038.133-.114.152-.247.152H4.553c-.057 0-.134.02-.172-.018s-.076-.039-.076-.096l-.19-1.276c-.191-.058-.401-.153-.63-.267l-.99.743q-.057.057-.17.057a.3.3 0 0 1-.173-.057c-.799-.742-1.2-1.18-1.2-1.333 0-.038.02-.095.058-.152.057-.076.171-.23.343-.439.17-.21.304-.38.38-.495a9 9 0 0 1-.286-.685L.19 8.725c-.056 0-.094-.039-.132-.077A.3.3 0 0 1 0 8.476V6.933a.4.4 0 0 1 .038-.152c.038-.057.077-.095.134-.095l1.295-.19c.057-.19.152-.4.266-.63-.19-.266-.438-.57-.743-.951a.3.3 0 0 1-.056-.172q0-.114.056-.171a6.5 6.5 0 0 1 .686-.743c.343-.324.552-.495.667-.495q.086 0 .172.056l.952.743c.19-.114.4-.21.647-.286a11 11 0 0 1 .19-1.313c.039-.134.115-.248.249-.248zM5.333 5.58c-.59 0-1.086.21-1.505.629A2.04 2.04 0 0 0 3.2 7.714c0 .59.21 1.086.628 1.505.42.42.915.628 1.505.628s1.086-.209 1.505-.628.629-.914.629-1.505-.21-1.085-.63-1.504a2.04 2.04 0 0 0-1.504-.63M13.867 0c.019 0 .361.19 1.028.59.019.02.038.038.038.057 0 .134-.133.515-.419 1.143.095.133.172.286.248.439.819.076 1.238.171 1.219.248v1.16c0 .096-.42.191-1.238.267a2 2 0 0 1-.248.439c.286.628.42 1.009.42 1.142 0 .02-.02.039-.039.058-.662.398-1.005.589-1.028.59-.038 0-.172-.133-.382-.4-.21-.266-.361-.457-.437-.57-.115.018-.191.018-.248.018s-.133 0-.247-.019c-.077.114-.23.305-.439.571-.21.267-.343.4-.38.4 0 0-.344-.19-1.03-.59-.018-.02-.037-.039-.037-.058 0-.133.133-.514.419-1.142-.095-.153-.19-.286-.267-.439-.819-.095-1.276-.171-1.276-.266V2.477c0-.077.457-.172 1.276-.248.076-.172.19-.306.285-.439-.285-.628-.419-1.01-.419-1.143 0-.019 0-.056.038-.056q.03-.03.287-.172c.17-.095.342-.19.495-.285S11.715 0 11.734 0c.038 0 .172.115.38.38.21.267.362.458.438.572.114-.019.191-.018.248-.018s.133 0 .247.018c.286-.4.534-.704.763-.932zM12.78 1.98c-.286 0-.533.115-.742.325-.21.21-.325.457-.325.743 0 .304.095.552.305.762s.476.304.762.304c.304 0 .553-.095.762-.304a.93.93 0 0 0 .305-.762c0-.286-.115-.534-.324-.743a1.03 1.03 0 0 0-.743-.325M13.867 9.848c.019 0 .361.21 1.028.59.019.02.038.038.038.057 0 .133-.133.514-.419 1.143.095.133.172.286.248.438.819.095 1.238.172 1.219.267v1.162c0 .095-.42.19-1.238.266a2 2 0 0 1-.248.439c.286.628.42 1.01.42 1.142 0 .02-.02.038-.039.057-.662.398-1.005.588-1.028.591-.038 0-.172-.134-.382-.4-.21-.267-.361-.457-.437-.572-.115.02-.191.02-.248.02s-.133 0-.247-.02c-.077.114-.23.305-.439.572-.21.266-.343.4-.38.4-.006-.003-.348-.194-1.03-.59-.018-.02-.037-.039-.037-.058 0-.133.133-.514.419-1.142-.095-.152-.19-.286-.267-.439-.819-.095-1.276-.171-1.276-.266v-1.162c0-.095.457-.19 1.276-.267.076-.171.19-.305.285-.438-.285-.629-.419-1.01-.419-1.143 0-.019 0-.038.038-.057q.03-.029.287-.171c.17-.096.342-.19.495-.286s.229-.133.248-.133c.038 0 .172.115.38.38.21.267.362.457.438.572.114-.02.191-.019.248-.019s.133 0 .247.019c.286-.4.534-.704.763-.933zm-1.086 2c-.286 0-.533.114-.742.324-.21.21-.325.456-.325.742 0 .305.096.552.305.762.21.21.476.305.762.305.304 0 .553-.096.762-.305.21-.21.324-.457.305-.762 0-.285-.115-.533-.324-.742a1.03 1.03 0 0 0-.743-.324',
                svgViewBox: '0 0 16 16',
              },
              {
                type: 'doc',
                docId: 'metrics/index',
                label: 'Metrics',
                svgIcon: 'M84 0H12A12 12 0 0 0 0 12v72a12 12 0 0 0 12 12h72a12 12 0 0 0 12-12V12A12 12 0 0 0 84 0m-3.86 59.29L64 73.58a5.53 5.53 0 0 1-6.72.47L34.48 59 24.2 75.17a5.52 5.52 0 0 1-4.67 2.57 5.45 5.45 0 0 1-3-.87 5.52 5.52 0 0 1-1.71-7.63l10.43-16.36-8.77-5.8a5.53 5.53 0 0 1 6.1-9.23l8.61 5.69 7-10.95a5.53 5.53 0 0 1 7.55-1.76l12.66 7.72 13.14-18a5.53 5.53 0 1 1 8.94 6.52L64.34 49.18A5.52 5.52 0 0 1 57 50.65L44.57 43.1l-4.15 6.54 19.42 12.84L72.8 51a5.54 5.54 0 0 1 7.34 8.29',
              },
              {
                type: 'doc',
                docId: 'observability/index',
                label: 'Observability',
                svgIcon: 'M12.09-.37h72c6.6 0 12 5.4 12 12v72c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-72c0-6.6 5.4-12 12-12m16.06 43.58c3.88-3.46 8.67-5.92 13.97-6.99.3 3.03 2.86 5.41 5.97 5.41s5.67-2.37 5.97-5.41a29.95 29.95 0 0 1 13.97 6.99 6 6 0 0 0-1.94 4.42c0 .19 0 .37.03.56-.13.05-.25.1-.37.16l-11.81 6.09c-.22.12-.43.24-.63.38a12 12 0 0 0-5.22-1.19c-6.63 0-12 5.37-12 12h24c0-.9-.1-1.77-.28-2.61l.09-.08 9.75-9.01c.2-.19.38-.39.52-.61.6.2 1.25.31 1.92.31 1.14 0 2.2-.32 3.11-.87 1.03 2.17 1.81 4.49 2.3 6.91.66 3.25 3.28 5.96 6.59 5.96s6.04-2.7 5.58-5.98c-2.9-20.36-20.41-36.02-41.58-36.02S9.42 39.29 6.52 59.65c-.47 3.28 2.26 5.98 5.58 5.98s5.94-2.71 6.59-5.96c.49-2.42 1.27-4.73 2.3-6.91.91.55 1.97.87 3.11.87a6 6 0 0 0 4.06-10.42Z',
              },
              // TODO: uncomment once the Dojo AI section/sidebar exists. Fill in
              // type + sidebarId (or docId) to link it before uncommenting.
              // {
              //   label: 'Dojo AI',
              //   svgIcon: 'M10.156.737 8.57 3.602a.53.53 0 0 1-.216.213L5.498 5.348a.536.536 0 0 0-.008.941l2.868 1.612q.136.077.21.213l1.546 2.864a.537.537 0 0 0 .943.005l1.59-2.873a.54.54 0 0 1 .21-.209l2.866-1.593a.536.536 0 0 0-.005-.941l-2.857-1.552a.53.53 0 0 1-.216-.216L11.1.742a.538.538 0 0 0-.943-.005M2.41 10.065 1.727 11.3a.54.54 0 0 1-.216.214l-1.228.66a.537.537 0 0 0-.008.94l1.241.697c.088.05.162.123.21.212l.666 1.233a.537.537 0 0 0 .942.005l.687-1.24a.54.54 0 0 1 .209-.208l1.24-.69a.536.536 0 0 0-.006-.941l-1.23-.668a.53.53 0 0 1-.215-.216l-.666-1.23a.537.537 0 0 0-.943-.003',
              //   svgViewBox: '0 0 16 16',
              // },
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
                href: 'https://support.sumologic.com/support/s',
                icon: 'support',
              },
              {
                label: 'Request a Demo',
                href: 'https://www.sumologic.com/demo',
                icon: 'co_present',
              },
              {
                label: 'Submit Feedback',
                href: 'https://github.com/SumoLogic/sumologic-documentation/issues/new/choose',
                icon: 'thumbs_up_down',
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
            className: 'navbar-translate-item',
          },
          {
            label: 'Log In',
            to: 'https://service.sumologic.com/',
            position: 'right',
            className: 'header-login',
          },
          {
            label: 'Try for Free',
            to: 'https://www.sumologic.com/sign-up',
            position: 'right',
            className: 'header-trial',
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
                label: 'Contact Support',
                href: 'https://support.sumologic.com/support/s'
              },
              {
                label: 'Community Forum',
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
                label: 'Training & Certifications',
                href: 'https://www.sumologic.com/learn/training'
              },
              {
                label: 'Webinars & Events',
                href: 'https://www.sumologic.com/events'
              },
              {
                label: 'Video Lessons',
                href: 'https://www.youtube.com/@sumologic/videos'
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Start Free Trial',
                href: 'https://www.sumologic.com/sign-up/'
              },
              {
                label: 'Request a Demo',
                href: 'https://www.sumologic.com/request-demo'
              },
              {
                label: 'Status',
                href: 'https://status.sumologic.com'
              },
            ],
          },
        ],
        copyright: `© 2010 – ${new Date().getFullYear()} Sumo Logic, Inc.`,
      },
    }),
};
