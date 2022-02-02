/**
 Sumo Architecture List
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
      collapsed: false,
      link: {type: 'doc', id: 'get-started/get-started'},
      items: [
        'get-started/sign-up',
        'get-started/manage-account',
        'get-started/checklist'
      ],
    },
    {
      type: 'category',
      label: 'Quickstarts and Tutorials',
      collapsible: true,
      collapsed: false,
      items: [
        'quickstart/quickstart-github',
      ],
    },
    {
      type: 'category',
      label: 'Apps and Integrations',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'PCI Compliance',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'pci-compliance/pci-compliance'},
          items: [
            'pci-compliance/setup-sumologic-pci-app',
            'pci-compliance/pci-reports',
            'pci-compliance/pci-dashboards',
          ],
        },
      ],
    },
  ],
  contribution: [
    {
      type: 'category',
      label: 'Contribution Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contribution/contribution'},
      items: [
        'contribution/create-page', 
        'contribution/create-document',
        'contribution/markdown-features',
        'contribution/build-deploy',
        {
          type: 'category',
          label: 'Advanced',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'contribution/contribution'},
          items: [
            'contribution/doc-versions',
            'contribution/translate'
        ]
      }
      ],
    },
  ],
}