---
slug: /api
title: Sumo Logic APIs
description: Sumo Logic exposes APIs to access resources and data from third-party scripts and applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Use the Sumo Logic Application Programming Interfaces (APIs) to interact with our platform and access resources and data programmatically from third-party scripts and apps.

:::sumo Get Help
To connect with other Sumo Logic users, post feedback, or ask a question, visit the [Sumo Logic API and Apps Forum](https://support.sumologic.com/support/s/topic/0TO6Q000000gTC8WAM/apis?tabset-cabe3=2) and [Sumo Dojo](http://slack.sumologic.com/).
:::

<div className="box-wrapper" markdown="1">

<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/getting-started"><img src={useBaseUrl('img/icons/cloud/api2.png')} alt="icon" width="50"/><h4>Authentication and Endpoints</h4></a>
  <p>API authentication and the Sumo Logic endpoints to use for your API client.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/access-keys"><img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/><h4>Access Keys</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/account-management"><img src={useBaseUrl('img/icons/manage.png')} alt="Thumbnail icon" width="50"/><h4>Accounts</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">  
  <a href="/docs/api/app-management"><img src={useBaseUrl('img/integrations/integrations.png')} alt="Thumbnail icon" width="55"/><h4>Apps (Beta)</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">  
  <a href="/docs/api/archive-ingestion"><img src={useBaseUrl('img/icons/archive.png')} alt="Thumbnail icon" width="55"/><h4>Archive Ingestion</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/cloud-siem-enterprise"><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Thumbnail icon" width="50"/><h4>Cloud SIEM</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/cloud-soar"><img src={useBaseUrl('img/icons/security/SOC.png')} alt="Thumbnail icon" width="50"/><h4>Cloud SOAR</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/collector-management"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="Thumbnail icon" width="50"/><h4>Collectors</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/connections-management"><img src={useBaseUrl('img/icons/operations/dynamic-tracing.png')} alt="Thumbnail icon" width="50"/><h4>Connections</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/content-management"><img src={useBaseUrl('img/icons/operations/topology-explorer.png')} alt="icon" width="50"/><h4>Content</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/content-permissions"><img src={useBaseUrl('img/icons/general/community.png')} alt="Thumbnail icon" width="50"/><h4>Content Permissions</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/dashboard"><img src={useBaseUrl('img/icons/dashboards.png')} alt="Thumbnail icon" width="50"/><h4>Dashboards</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/dynamic-parsing"><img src={useBaseUrl('img/icons/operations/parsing-data.png')} alt="Thumbnail icon" width="50"/><h4>Dynamic Parsing</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/field-extraction-rules"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Thumbnail icon" width="50"/><h4>Field Extraction Rules</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/field-management"><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Thumbnail icon" width="50"/><h4>Fields</h4></a>    
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/folder-management"><img src={useBaseUrl('img/icons/archive.png')} alt="icon" width="40"/><h4>Folders</h4></a>      
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/health-events"><img src={useBaseUrl('img/icons/company-value/heart-wellness.png')} alt="Thumbnail icon" width="50"/><h4>Health Events</h4></a>      
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/ingest-budget-v2"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="Thumbnail icon" width="50"/><h4>Ingest Budget V2</h4></a>    
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/log-searches"><img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/><h4>Log Searches</h4></a>            
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/log-search-estimated-usage"><img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/><h4>Log Search Estimated Usage</h4></a>            
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/logs-data-forwarding"><img src={useBaseUrl('img/icons/operations/send-data.png')} alt="Thumbnail icon" width="50"/><h4>Logs Data Forwarding</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/lookup-tables"><img src={useBaseUrl('img/icons/logs.png')} alt="Thumbnail icon" width="50"/><h4>Lookup Tables</h4></a>            
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/api/metrics"><img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/><h4>Metrics</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/api/metrics-query"><img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/><h4>Metrics Query</h4></a>      
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/api/metrics-searches-v2"><img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/><h4>Metrics Searches V2</h4></a>      
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/api/metrics-searches"><img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/><h4>Metrics Searches (Beta)</h4></a>      
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/api/metrics-transformation-rules"><img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/><h4>Metrics Transformation Rules</h4></a>      
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/monitors-management"><img src={useBaseUrl('img/icons/alerts.png')} alt="Thumbnail icon" width="50"/><h4>Monitors</h4></a>    
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/muting-schedules"><img src={useBaseUrl('img/icons/alerts.png')} alt="Thumbnail icon" width="50"/><h4>Muting Schedules</h4></a>    
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/organizations-management"><img src={useBaseUrl('img/icons/manage.png')} alt="Thumbnail icon" width="50"/><h4>Organizations</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/partition-management"><img src={useBaseUrl('img/icons/operations/data-overage.png')} alt="Thumbnail icon" width="50"/><h4>Partitions</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/password-policy"><img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/><h4>Password Policy</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/policies-management"><img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/><h4>Policies</h4></a>    
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/role-management"><img src={useBaseUrl('img/icons/operations/role-based-access.png')} alt="Thumbnail icon" width="50"/><h4>Roles</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/role-management-v2"><img src={useBaseUrl('img/icons/operations/role-based-access.png')} alt="Thumbnail icon" width="50"/><h4>Roles v2 (Beta)</h4></a>  
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/saml-configuration"><img src={useBaseUrl('img/icons/security/security-and-compliance.png')} alt="Thumbnail icon" width="50"/><h4>SAML Configuration</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/scan-budget"><img src={useBaseUrl('img/icons/general/calendar.png')} alt="Thumbnail icon" width="50"/><h4>Scan Budget</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/scheduled-views"><img src={useBaseUrl('img/icons/general/calendar.png')} alt="Thumbnail icon" width="50"/><h4>Scheduled Views</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">  
  <a href="/docs/api/search-job"><img src={useBaseUrl('img/icons/search.png')} alt="Thumbnail icon" width="50"/><h4>Search Job</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/service-allowlist"><img src={useBaseUrl('img/icons/security/unlock.png')} alt="Thumbnail icon" width="50"/><h4>Service Allowlist</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/service-map"><img src={useBaseUrl('img/apm/services-map-icon.png')} alt="Thumbnail icon" width="50"/><h4>Service Map</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/slo-management"><img src={useBaseUrl('img/icons/observe.png')} alt="Thumbnail icon" width="50"/><h4>SLOs</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/span-analytics"><img src={useBaseUrl('img/icons/operations/distributed-operations.png')} alt="Thumbnail icon" width="50"/><h4>Span Analytics</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/threat-intel-ingest"><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="Thumbnail icon" width="50"/><h4>Threat Intel Ingest</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/api/token-management"><img src={useBaseUrl('img/icons/security/security.png')} alt="Thumbnail icon" width="50"/><h4>Tokens</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/tracing"><img src={useBaseUrl('img/icons/traces.png')} alt="Thumbnail icon" width="50"/><h4>Traces</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/user-management"><img src={useBaseUrl('img/icons/business/user-permissions.png')} alt="Thumbnail icon" width="50"/><h4>Users</h4></a>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/api/troubleshooting"><img src={useBaseUrl('img/icons/operations/troubleshoot.png')} alt="Thumbnail icon" width="50"/><h4>Troubleshooting</h4></a>
  </div>
</div>
</div>
