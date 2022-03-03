/**
 Sumo Architecture List
 Add content to the following sections in this sodebar Navigation file:

  Alerts: Alerts, Monitors, SLOs, Health Events, Connections 
  Dashboards: Create Dash, Library of Dashboards
  Logs: Log Search, All Log Searches, Livetail, Lookup, Log Config
  Metrics: Metrics Search, All Metrics Searches, Config
  Infrastructure Monitoring: Kubernetes, AWS Observability, Root Cause Explorer,
  APM: Application Monitoring (Applications, Services, Service Map, Transaction traces, Span analytics, Root Cause Explorer), RUM
  Incidents Management: Incidents, Triage, Entities, Playbooks
  Security Events: Security Evenets, Insights, Signals, Entities, Records
  Security Detection: Rules, Rules Tuning, Threat Intelligence, Match List, File Analysis, Custom Insights, Network Blocks, Suppressed Entites, Suppressed Lists
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Get Started',
      collapsible: true,
      collapsed: true,
      link: {type: 'doc', id: 'get-started/get-started'},
      items: [
        'get-started/sign-up',
        'get-started/manage-account',
        'get-started/checklist'
      ],
    },
    {
      //Add a category and docs per quickstart guide
      type: 'category',
      label: 'Quickstarts and Tutorials',
      collapsible: true,
      collapsed: true,
      link: {type: 'doc', id: 'quickstart/index'},
      items: [
        'quickstart/quickstart-github',
        'quickstart/quickstart-k8s',
      ],
    },
    {
      //Put in stuff to test, will be moved later!
      type: 'category',
      label: 'Converted Docs',
      collapsible: true,
      collapsed: true,
      items: [
        'Manage/Collection/Processing-Rules/create-a-processing-rule',
      ],
     },
    {
      //Add a category and docs per quickstart guide
      type: 'category',
      label: 'Dashboards (New)',
      collapsible: true,
      collapsed: true,
      link: {type: 'doc', id: 'dashboards-new/about-dashboard-new'},
      items: [
        'dashboards-new/create-a-dashboard-new',
        'dashboards-new/dashboard-new-faqs',
        'dashboards-new/drill-down-to-discover-root-causes',
        'dashboards-new/export-dashboard-new',
        'dashboards-new/filter-template-variables',
        'dashboards-new/link-dashboard-to-explore',
        'dashboards-new/link-dashboard-new',
        'dashboards-new/locate-deviations-time-series',
        {
          //Add a category and docs per quickstart guide
          type: 'category',
          label: 'Panels',
          collapsible: true,
          collapsed: true,
          link: {type: 'doc', id: 'dashboards-new/panels'},
          items: [
            'dashboards-new/panels/modify-chart',
            'dashboards-new/panels/area-charts',
            'dashboards-new/panels/bar-charts',
            'dashboards-new/panels/box-plot-charts',
            'dashboards-new/panels/bubble-charts',
            'dashboards-new/panels/column-charts',
            'dashboards-new/panels/combo-charts',
            'dashboards-new/panels/line-charts',
            'dashboards-new/panels/map-charts',
            'dashboards-new/panels/markdown-syntax',
            'dashboards-new/panels/pie-charts',
            'dashboards-new/panels/scatter-charts',
            'dashboards-new/panels/single-value-charts',
            'dashboards-new/panels/table-charts',
          ],
        },
        'dashboards-new/set-custom-time-ranges',
        'dashboards-new/share-a-dashboard-new',
      ],
    },
  ],
  metricslogs: [
    {
      type: 'category',
      label: 'Searches and Logs',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'search/index'},
      items: [
        {
          type: 'category',
          label: 'Get Started with Searches',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'generated-index',
            title: 'Get Started with Searches',
            description:
              "Learn how to build and run searches, review logs, and more.",
            keywords: ['search', 'logs'],
          },
          items: [
            {
              type: 'category',
              label: 'Search Basics',
              collapsible: true,
              collapsed: false,
              link: {
                type: 'generated-index',
                title: 'Search Basics',
                description:
                  "Sumo Logic search syntax uses logical and familiar operators allowing you to create ad hoc queries quickly and efficiently.",
                keywords: ['search', 'logs'],
              },
              items: [
                'search/get-started-with-search/search-basics/about-search-basics',
                'search/get-started-with-search/search-basics/built-in-metadata',
                'search/get-started-with-search/search-basics/chart-search-results',
                'search/get-started-with-search/search-basics/comments-search-queries',
                'search/get-started-with-search/search-basics/pause-cancel-search',
                'search/get-started-with-search/search-basics/quick-search-collectors-sources',
                'search/get-started-with-search/search-basics/reference-field-special-characters',
                'search/get-started-with-search/search-basics/save-search',
                'search/get-started-with-search/search-basics/search-autocomplete',
                'search/get-started-with-search/search-basics/search-large-messages',
                'search/get-started-with-search/search-basics/search-surrounding-messages',
                'search/get-started-with-search/search-basics/share-link-to-search',
                'search/get-started-with-search/search-basics/time-range-expressions',
                'search/get-started-with-search/search-basics/view-search-results-json-logs',
                'search/get-started-with-search/search-basics/view-traces-search-results',
              ],
            },
            {
              type: 'category',
              label: 'How to Use the Search Page',
              collapsible: true,
              collapsed: false,
              link: {type: 'doc', id: 'search/get-started-with-search/how-to-use-search-page/index.md'},
              items: [
                'search/get-started-with-search/how-to-use-search-page/add-saved-search-favorites',
                'search/get-started-with-search/how-to-use-search-page/change-time-range-in-histogram',
                {
                  type: 'category',
                  label: 'Field Browser',
                  collapsible: true,
                  collapsed: false,
                  link: {type: 'doc', id: 'search/get-started-with-search/how-to-use-search-page/field-browser/index.md'},
                  items: [
                    'search/get-started-with-search/how-to-use-search-page/field-browser/search-from-the-field-browser',
                    'search/get-started-with-search/how-to-use-search-page/field-browser/show-hide-fields-in-field-browser',
                  ],
                },
                'search/get-started-with-search/how-to-use-search-page/modify-search-from-messages-tab',
                'search/get-started-with-search/how-to-use-search-page/navigate-through-search-results',
                'search/get-started-with-search/how-to-use-search-page/search-highlighting',
                'search/get-started-with-search/how-to-use-search-page/search-load-indicator',
                'search/get-started-with-search/how-to-use-search-page/search-modes',
                'search/get-started-with-search/how-to-use-search-page/set-messages-tab-preferences',
                'search/get-started-with-search/how-to-use-search-page/wildcards-in-full-text-searches',
              ],
            },
            {
              type: 'category',
              label: 'Build Searches',
              collapsible: true,
              collapsed: false,
              link: {type: 'doc', id: 'search/get-started-with-search/build-search/index.md'},
              items: [
                'search/get-started-with-search/build-search/best-practices-search',
                'search/get-started-with-search/build-search/dynamic-parsing',
                'search/get-started-with-search/build-search/keyword-search-expressions',
                'search/get-started-with-search/build-search/search-syntax-overview',
                'search/get-started-with-search/build-search/search-templates',
                'search/get-started-with-search/build-search/set-time-range',
                'search/get-started-with-search/build-search/use-receipt-time',
                'search/get-started-with-search/build-search/use-url-to-run-search',
              ],
            },
            {
              type: 'category',
              label: 'Suggested Searches',
              collapsible: true,
              collapsed: false,
              link: {
                type: 'generated-index',
                title: 'Suggested Searches',
                description:
                  "​Sumo Logic queries can help track and diagnose common IT issues. Take a look at these Sumo Logic suggested searches.",
                keywords: ['search', 'apache', 'cisco', 'parser', 'windows'],
              },
              items: [
                'search/get-started-with-search/how-to-use-search-page/suggested-searches/suggested-searches-apache-access-parser',
                'search/get-started-with-search/how-to-use-search-page/suggested-searches/suggested-searches-apache-errors-parser',
                'search/get-started-with-search/how-to-use-search-page/suggested-searches/suggested-searches-cisco-asa-parser',
                'search/get-started-with-search/how-to-use-search-page/suggested-searches/suggested-searches-microsoft-iis-parser',
                'search/get-started-with-search/how-to-use-search-page/suggested-searches/suggested-searches-windows-events',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Behavior Insights',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'search/behavior-insights/index.md'},
          items: [
            'search/behavior-insights/logexplain',
            'search/behavior-insights/logreduce-keys',
            'search/behavior-insights/logreduce-values',
          ],
        },
        {
          type: 'category',
          label: 'Live Tail',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'generated-index',
            title: 'Live Tail',
            description:
              "Sumo Logic Live Tail allows you to see a real-time live feed of log messages associated with a Source or Collector, which you can use as a tool for development and troubleshooting.",
            keywords: ['live tail'],
          },
          items: [
            'search/live-tail/about-live-tail',
            'search/live-tail/filter-live-tail',
            'search/live-tail/live-tail-cli',
            'search/live-tail/live-tail-highlighting',
            'search/live-tail/live-tail-preferences',
            'search/live-tail/live-tail-show-in-search',
            'search/live-tail/multiple-live-tails',
          ],
        },
        {
          type: 'category',
          label: 'LogCompare',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'search/logcompare/index.md'},
          items: [
            'search/logcompare/about-logcompare',
            'search/logcompare/create-a-logcompare-email-alert',
            'search/logcompare/logcompare-syntax',
            'search/logcompare/run-logcompare',
            'search/logcompare/understand-logcompare-results',
          ],
        },
        {
          type: 'category',
          label: 'LogReduce',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'search/logreduce/index.md'},
          items: [
            'search/logreduce/logreduce-operator',
            'search/logreduce/detect-patterns-with-logreduce',
            'search/logreduce/influence-the-logreduce-outcome',
            'search/logreduce/understand-logcompare-results',
          ],
        },
        'search/time-compare',
        {
          type: 'category',
          label: 'Lookup Tables',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'search/lookup-tables/index.md'},
          items: [
            'search/lookup-tables/create-a-lookup-table',
            'search/lookup-tables/manage-and-update-lookup-tables',
          ],
        },
        'search/optimize-search-performance',
        'search/optimizing-search-with-partitions',
        'search/subqueries',
        {
          type: 'category',
          label: 'Search Cheat Sheets',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'search/search-cheat-sheets/index.md'},
          items: [
            'search/search-cheat-sheets/general-search-examples-cheatsheet',
            'search/search-cheat-sheets/grep-searching-with-sumo-cheatsheet',
            'search/search-cheat-sheets/iis-search-examples-cheatsheet',
            'search/search-cheat-sheets/log-operators-cheat-sheet',
          ],
        },
        {
          type: 'category',
          label: 'Search FAQs',
          collapsible: true,
          collapsed: false,
          link: {
            type: 'generated-index',
            title: 'Search FAQs',
            description:
              "This guide provides frequently answered questions about search and logs.",
            keywords: ['faq'],
          },
          items: [
            'search/search-faqs/export-results-of-saved-file',
            'search/search-faqs/group-messages-based-on-field',
            'search/search-faqs/searching-by-keyword-returns-no-results',
          ],
        },
        {
          type: 'category',
          label: 'Search Query Language',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'search/search-query-language/index.md'},
          items: [
            'search/search-query-language',
            {
              type: 'category',
              label: 'Parse Operators',
              collapsible: true,
              collapsed: false,
              link: {type: 'doc', id: 'search/search-query-language/parse-operators/index.md'},
              items: [
                'search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor',
                'search/search-query-language/parse-operators/parse-variable-patterns-using-regex',
                'search/search-query-language/parse-operators/parse-json-formatted-logs',
                'search/search-query-language/parse-operators/parse-keyvalue-formatted-logs',
                'search/search-query-language/parse-operators/parse-csv-formatted-logs',
                'search/search-query-language/parse-operators/parse-delimited-logs-using-split',
                'search/search-query-language/parse-operators/parse-xml-formatted-logs',
                'search/search-query-language/parse-operators/parse-field-option',
                'search/search-query-language/parse-operators/parse-nodrop-option',
                'search/search-query-language/parse-operators/parse-date',
                'search/search-query-language/parse-operators/parse-hex',
              ],
            },
            {
              type: 'category',
              label: 'Group or Aggregate Operators',
              collapsible: true,
              collapsed: false,
              link: {type: 'doc', id: 'search/search-query-language/group-aggregate-operators/index.md'},
              items: [
                'search/search-query-language/group-aggregate-operators/avg',
                'search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent',
                'search/search-query-language/group-aggregate-operators/first-and-last',
                'search/search-query-language/group-aggregate-operators/median',
                'search/search-query-language/group-aggregate-operators/min-and-max',
                'search/search-query-language/group-aggregate-operators/most-recent-and-least-recent',
                'search/search-query-language/group-aggregate-operators/percentile-pct',
                'search/search-query-language/group-aggregate-operators/pct-sampling',
                'search/search-query-language/group-aggregate-operators/standard-deviation',
                'search/search-query-language/group-aggregate-operators/sum',
                'search/search-query-language/group-aggregate-operators/values',
              ],
            },
            'search/search-query-language/field-expressions',
            {
              type: 'category',
              label: 'Math Expressions',
              collapsible: true,
              collapsed: false,
              link: {type: 'doc', id: 'search/search-query-language/math-expressions/index.md'},
              items: [
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
                'search/search-query-language/math-expressions',
              ],
            },
          ],
        },
      ],
    },
  ],
  integrations: [
    'integrations/integrations',
    {
      type: 'category',
      label: 'PCI Compliance',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'integrations/pci-compliance/pci-compliance'},
      items: [
        'integrations/pci-compliance/setup-sumologic-pci-app',
        'integrations/pci-compliance/pci-reports',
        'integrations/pci-compliance/pci-dashboards',
      ],
    },
  ],
  //Contribution guide for documentation
  contribution: [
    {
      type: 'category',
      label: 'Contribution Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contribution/index'},
      items: [
        'contribution/create-document',
        'contribution/markdown-features',
        'contribution/release-notes',
        'contribution/build-deploy',
        'contribution/translate',
        {
          type: 'category',
          label: 'Templates',
          collapsible: true,
          collapsed: false,
          items: [
            'contribution/templates/partner-app',
            'contribution/templates/template-doc'
          ]
        }
      ],
    },
  ],
}
