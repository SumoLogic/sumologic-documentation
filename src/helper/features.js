export const features = [
  // Tab 0: Security Operations: TDIR, UEBA, Automation, Playbooks
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
     title: 'Logs for Security Overview',
     imageUrl: 'img/icons/logs.png',
     description: 'Collect and analyze security data using pre-built dashboards, apps, and queries across on-prem and cloud environments.',
     link: 'docs/security/additional-security-features',
   },
   {
       title: 'Cloud SOAR',
       imageUrl: 'img/icons/security/soar-2-color-icon.png',
       description: 'Automate incident response and case management across tools.',
       link: 'docs/cloud-soar',
    },
   {
      title: 'Security Playbooks',
      imageUrl: 'img/icons/security/playbook.png',
      description: 'Prebuilt response workflows to streamline investigations.',
      link: 'docs/platform-services/automation-service/automation-service-playbooks',
   },
  ],

  // Tab 1: Log Management: Audit, Threat Intel, Compliance Dashboards
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
    {
      title: 'FLEX Logs + CIS Dashboard',
      imageUrl: 'img/icons/logs.png',
      description: 'Prebuilt monitors and dashboards for GCP and Azure.',
      link: 'docs/observability/cis-dashboard',
    },
    {
      title: 'Cloud Security Monitoring',
      imageUrl: 'img/icons/observe.png',
      description: 'Detect misconfigurations and threats in cloud environments.',
      link: 'docs/integrations/cloud-security-monitoring-analytics',
    },
  ],

  // Tab 2: Cloud Infrastructure: CloudTrail, K8s Audit, Cloud Security
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
    {
      title: 'Kickstart Data',
      imageUrl: 'img/icons/data.png',
      description: 'Start your PLG experience with preloaded log data.',
      link: 'docs/send-data/kickstart-data',
    },
    {
      title: 'Log Analytics Platform',
      imageUrl: 'img/icons/manage.png',
      description: 'Explore logs with dashboards and search insights.',
      link: 'docs/log-analytics',
    },
  ],

  // Tab 3: Application Performance: Infra Monitoring, APM, Metrics, AI Alerts
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
    {
      title: 'FLEX Logs + Metrics',
      imageUrl: 'img/icons/metrics.png',
      description: 'Infrastructure reliability using logs and performance data.',
      link: 'docs/metrics',
    },
    {
      title: 'Otel Remote Mgmt + AI-Driven Alerts',
      imageUrl: 'img/icons/observe.png',
      description: 'Manage telemetry pipelines and respond faster.',
      link: 'docs/manage/otel-pipeline',
    },
  ],

  // Tab 4: Dashboards & Alerts: Dashboards, Real-time Views, Alerts
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
    {
      title: 'Start Free Trial',
      imageUrl: 'img/icons/cloud/start.png',
      description: 'Explore Sumo Logic with no commitment.',
      link: 'docs/get-started/quickstart',
    },
    {
      title: 'LiveTail and Real-time Views',
      imageUrl: 'img/icons/live.png',
      description: 'Stream logs in real time for immediate feedback.',
      link: 'docs/live-tail',
    },
    {
      title: 'Distributed Tracing',
      imageUrl: 'img/icons/apm.png',
      description: 'Trace requests end-to-end to uncover latency or errors.',
      link: 'docs/apm/traces',
    },
    {
      title: 'CoPilot',
      imageUrl: 'img/icons/sumo-ai.png',
      description: 'Let Sumo Logic’s AI assistant guide your analysis.',
      link: 'docs/capabilities/copilot',
    },
  ],

  // Tab 5: Advanced Analytics: APIs, Developer Apps, Copilot
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
    {
      title: 'Start Free Trial',
      imageUrl: 'img/icons/cloud/start.png',
      description: 'Explore Sumo Logic with no commitment.',
      link: 'docs/get-started/quickstart',
    },
    {
      title: 'LiveTail and Real-time Views',
      imageUrl: 'img/icons/live.png',
      description: 'Stream logs in real time for immediate feedback.',
      link: 'docs/live-tail',
    },
  ],
];
