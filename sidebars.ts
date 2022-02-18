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
      link: {type: 'doc', id: 'quickstart/quickstart'},
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
      link: {type: 'doc', id: 'contribution/contribution'},
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
