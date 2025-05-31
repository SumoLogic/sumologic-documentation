export const features = [
  // Tab 0: SIEM (SLG)
  [
    {
      title: 'Cloud SIEM',
      imageUrl: 'img/icons/security/cloud-siem.png',
      description: 'Threat detection, investigation, and automated response.',
      link: 'docs/cse',
    },
    {
      title: 'UEBA and Threat Intelligence',
      imageUrl: 'img/icons/alerts.png',
      description: 'User behavior analytics and unified threat insights.',
      link: 'docs/cse/ueba',
    },
    {
      title: 'Security Playbooks',
      imageUrl: 'img/icons/security/soar-2-color-icon.png',
      description: 'Automate threat responses and incident workflows.',
      link: 'docs/cloud-soar',
    },
  ],

  // Tab 1: Logs for Security (SLG)
  [
    {
      title: 'Audit Logging',
      imageUrl: 'img/icons/logs.png',
      description: 'Track user and system activity across your environment.',
      link: 'docs/audit-logs',
    },
    {
      title: 'Threat Intelligence Integration',
      imageUrl: 'img/icons/security/detect-insider-threats.png',
      description: 'Enrich logs with threat intel for deeper insights.',
      link: 'docs/integrations/threat-intel',
    },
    {
      title: 'Compliance Dashboards',
      imageUrl: 'img/icons/dashboards.png',
      description: 'Stay compliant with prebuilt security content.',
      link: 'docs/compliance/dashboards',
    },
  ],

  // Tab 2: Logs for Security (PLG)
  [
    {
      title: 'CloudTrail Analytics',
      imageUrl: 'img/integrations/amazon-aws/cis-for-aws-logo.png',
      description: 'Monitor AWS activity and security posture.',
      link: 'docs/security/additional-security-features/cloud-infrastructure-security/cloud-infrastructure-security-for-aws',
    },
    {
      title: 'Kubernetes Audit Logs',
      imageUrl: 'img/icons/operations/kubernetes.png',
      description: 'Analyze access and change events in K8s clusters.',
      link: 'docs/kubernetes/audit-logs',
    },
    {
      title: 'Cloud Security Monitoring',
      imageUrl: 'img/icons/security/security.png',
      description: 'Visualize and alert on cloud security anomalies.',
      link: 'docs/security',
    },
  ],

  // Tab 3: Monitoring & Troubleshooting (SLG)
  [
    {
      title: 'Infrastructure Monitoring',
      imageUrl: 'img/icons/observe.png',
      description: 'Track server health and resource usage.',
      link: 'docs/observability',
    },
    {
      title: 'Application Performance Monitoring',
      imageUrl: 'img/icons/apm.png',
      description: 'Trace transactions and analyze latency.',
      link: 'docs/apm',
    },
    {
      title: 'Network Insights',
      imageUrl: 'img/icons/network.png',
      description: 'Detect bottlenecks and throughput issues.',
      link: 'docs/network',
    },
  ],

  // Tab 4: Monitoring & Troubleshooting (PLG)
  [
    {
      title: 'OpenTelemetry Observability',
      imageUrl: 'img/icons/observe.png',
      description: 'Ingest logs, metrics, and traces in one pipeline.',
      link: 'docs/opentelemetry',
    },
    {
      title: 'Real-Time Dashboards',
      imageUrl: 'img/icons/dashboards.png',
      description: 'Visualize log and metric data instantly.',
      link: 'docs/dashboards',
    },
    {
      title: 'Kubernetes Monitoring',
      imageUrl: 'img/icons/operations/kubernetes-explorer.png',
      description: 'Track pod and container health across clusters.',
      link: 'docs/kubernetes',
    },
  ],

  // Tab 5: Developer & PLG Onboarding
  [
    {
      title: 'Get Started with Sumo Logic',
      imageUrl: 'img/icons/business/mission.png',
      description: 'Install collectors, send data, and explore insights.',
      link: 'docs/get-started/quickstart',
    },
    {
      title: 'API Documentation',
      imageUrl: 'img/icons/cloud/api2.png',
      description: 'Automate Sumo Logic workflows via API.',
      link: 'docs/api',
    },
    {
      title: 'Build Apps with Sumo Logic',
      imageUrl: 'img/integrations/integrations.png',
      description: 'Extend platform functionality with custom apps.',
      link: 'docs/developer',
    },
  ],
];
