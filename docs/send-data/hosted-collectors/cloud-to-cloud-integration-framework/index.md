---
slug: /send-data/hosted-collectors/cloud-to-cloud-integration-framework
title: Cloud-to-Cloud Integration Framework Sources
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Cloud-to-Cloud Integration Framework is a fully-managed collection system that collects logs and events directly from SaaS and Cloud platforms. This data often includes custom events and user data critical for operations monitoring, security, and compliance use cases. As a fully managed collection system, integrations running within the Cloud-to-Cloud Integration Framework provide a secure endpoint to receive event data in your account. Integration authentication, scheduling, and state tracking are all managed by the framework.


## Limitations

* The number of Cloud-to-Cloud Sources is limited to 20 for free accounts, and 50 for all other accounts.
* You are warned when you reach 80% of the limit (16 Sources for free accounts, and 40 Sources for other accounts).
* You are notified when you have reached the Source limit.
* In the [Fed deployment](/docs/api/troubleshooting#deployments-and-sumo-logic-endpoints), supported Cloud-to-Cloud Sources are limited.

## Static IP addresses

The following table provides the static IP addresses used for Cloud-to-Cloud Integration Sources by deployment. These are provided in case you want to explicitly allow the IP addresses on your third-party target SaaS or Cloud platform.

| Deployment | Static IP addresses     |
|:------------|:----------|
| AU         | 13.210.38.180, 54.253.14.8, 52.63.30.49    |
| CA         | 3.96.85.212, 3.97.51.58, 3.96.95.249        |
| DE         | 52.28.151.126, 18.193.176.46, 18.192.147.254        |
| EU         | 54.74.133.34, 18.200.219.230, 54.216.109.182         |
| IN         | 65.0.114.18, 3.7.177.71, 3.6.131.26      |
| JP         | 52.69.8.121, 54.248.157.127, 18.182.95.102        |
| US1        | 54.209.19.175, 23.22.90.93, 23.22.11.54, 34.228.131.3, 34.237.107.105, 3.88.82.220 |
| US2    | 54.149.79.97, 54.218.43.134, 44.239.32.230, 35.161.2.93    |

For the Federal environments, a different set of Static IPs is available for each C2C deployment.

| Deployment | Static IP addresses      |
|:------------|:---------------------|
| Fed C2C 1A | 50.19.6.130       |
| Fed C2C 1B | 174.129.156.86    |
| Fed C2C 1C | 52.202.74.197      |
| Fed C2C 1D | 100.25.65.170         |
| Fed C2C 1E | 3.226.78.211   |
| Fed C2C 1F | 23.22.209.147    |

## Integrations

The topics below are the available integrations. In Sumo Logic these are called Sources. Check out the Sources we have available in beta. You are invited to request new Sources for the Cloud-to-Cloud Integration Framework from our [Ideas Portal](https://ideas.sumologic.com/ideas).

## Versions

Sources in the Cloud-to-Cloud Integration Framework need updates over time to maintain data collection. Updates can vary in severity and may not require any input from you. See [Cloud-to-Cloud Source Versions](cloud-to-cloud-source-versions.md) for details on how to upgrade and how versions are structured.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/c2c/1password"><img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="50"/><h4>1Password</h4></a>
  <p>Provides a secure endpoint to receive Sign-in Attempts and Item Usage from the 1Password Event API.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/c2c/airtable"><img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="icon" width="50"/><h4>Airtable Source</h4></a>
  <p>Airtable Source helps to retrieve Airtable audit logs into the Sumo Logic environment.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-siem-api-source"><img src={useBaseUrl('img/integrations/saas-cloud/akamai.svg')} alt="Thumbnail icon" width="120"/><h4>Akamai SIEM API</h4></a>
  <p>Provides a secure endpoint to receive security events generated on the Akamai platform.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/armis-api-source"><img src={useBaseUrl('img/send-data/armis-icon.png')} alt="icon" width="80"/><h4>Armis API Source</h4></a>
  <p>Armis API Source helps to fetch device and alert logs from the Armis platform and send it to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/asana-source"><img src={useBaseUrl('img/send-data/asana-icon.png')} alt="icon" width="40"/><h4>Asana Source</h4></a>
  <p>Learn to retrieve Asana audit logs into the Sumo Logic environment.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/aws-cost-explorer-source"><img src={useBaseUrl('img/send-data/aws-cost-explorer-icon.png')} alt="icon" width="50"/><h4>AWS Cost Explorer</h4></a>
  <p>Learn to collect cost and usage reports from AWS Cost Explorer Source.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source"><img src={useBaseUrl('img/send-data/azure-event-hub.svg')} alt="icon" width="40"/><h4>Azure Event Hubs</h4></a>
  <p>Provides a secure endpoint to receive data from Azure Event Hubs.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-cloud-to-cloud-source-migration"><img src={useBaseUrl('img/send-data/azure-event-hub.svg')} alt="icon" width="40"/><h4>Azure Event Hubs C2C Source Migration</h4></a>
  <p>This source is available in all deployments, including FedRAMP.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/box-source"><img src={useBaseUrl('img/send-data/box-logo.svg')} alt="box-logo.svg" width="80" /><h4>Box</h4></a>
  <p>The Box API integration ingests events from the GetEvents API.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-cloud-source"><img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="thumbnail icon" width="50"/><h4>Carbon Black Cloud (Tag)</h4></a>
  <p>Provides a secure endpoint to receive data from the Carbon Black Cloud, Enriched Event Search, and Alerts APIs.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-inventory-source"><img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="thumbnail icon" width="50"/><h4>Carbon Black Inventory</h4></a>
  <p>Provides a secure endpoint to receive data from the CB Devices API.</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cato-networks-source"><img src={useBaseUrl('img/send-data/cato-logo.png')} alt="icon" width="90"/><h4>Cato Networks</h4></a>
  <p>Cato Networks Source helps to retrieve Cato audit and security logs into the Sumo Logic environment.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-amp-source"><img src={useBaseUrl('img/send-data/cisco-amp.png')} alt="icon" width="90"/><h4>Cisco AMP</h4></a>
  <p>Provides a secure endpoint to receive data from the Cisco Amp System Log API.</p>
  </div>
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source"><img src={useBaseUrl('img/send-data/cisco-meraki-sumo-source-select.png')} alt="icon" width="90"/><h4>Cisco Meraki</h4></a>
  <p>Provides a secure endpoint to receive data from the Cisco Meraki API.</p>
  </div>
</div>
<div className="box smallbox15 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/citrix-cloud-source"><img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="icon" width="100"/><h4>Citrix Cloud Source</h4></a>
  <p>Provides a secure endpoint to receive System Log data from the Citrix Cloud System Log API.</p>
  </div>
</div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cloud-to-cloud-source-versions"><img src={useBaseUrl('img/icons/business/SaaS.png')} alt="icon" width="50"/><h4>Cloud-to-Cloud Versions</h4></a>
  <p>Sources in the Cloud-to-Cloud Integration Framework need updates over time to maintain data collection.</p>
  </div>
</div>
<div className="box smallbox17 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source"><img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="65"/><h4>CrowdStrike</h4></a>
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/code42-incydr-source"><img src={useBaseUrl('img/send-data/code42-incydr-logo.png')} alt="icon" width="100"/><h4>Code42 Incydr</h4></a>
  <p>Learn how to collect alerts, file events, and audit logs from Code42 Incydr.</p>
  </div>
</div>
<div className="box smallbox18 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source"><img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="65"/><h4>Crowdstrike</h4></a>
  <p>Provides a secure endpoint to receive event data from the CrowdStrike Streams API.</p>
  </div>
</div>
<div className="box smallbox19 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-source"><img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="65"/><h4>CrowdStrike FDR</h4></a>
  <p>Provides a secure endpoint to ingest Falcon Data Replicator events using the S3 ingestion.</p>
  </div>
</div>
<div className="box smallbox20 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source"><img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="65"/><h4>CrowdStrike FDR Host Inventory</h4></a>
  <p>Provides a secure endpoint to receive device data from the CrowdStrike Host and Host Group Management APIs.</p>
  </div>
</div>
<div className="box smallbox21 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-spotlight-source"><img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="65"/><h4>CrowdStrike Spotlight</h4></a>
  <p>Learn how to collect combined endpoint vulnerabilities data from the CrowdStrike Spotlight platform.</p>
  </div>
</div>
<div className="box smallbox21 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cse-aws-ec-inventory-source"><img src={useBaseUrl('img/send-data/aws-ec2.svg')} alt="icon" width="50"/><h4>CSE AWS EC2 Inventory</h4></a>
  <p>Provides a secure endpoint to receive event data from the EC2 describe instances API.</p>
  </div>
</div>
<div className="box smallbox22 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cyberark-source"><img src={useBaseUrl('img/send-data/cyberark.png')} alt="icon" width="50"/><h4>CyberArk EPM</h4></a>
  <p>Before configuring an AWS Source give Sumo Logic access to your AWS product</p>
  </div>
</div>
<div className="box smallbox23 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cybereason-source"><img src={useBaseUrl('img/send-data/cybereason-logo.png')} alt="icon" width="60"/><h4>Cybereason</h4></a>
  <p>Provides a secure endpoint to receive authentication logs from the Cybereason Malops API.</p>
  </div>
</div>
<div className="box smallbox24 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/docusign-source"><img src={useBaseUrl('img/integrations/saas-cloud/docusign-icon.svg')} alt="Thumbnail icon" width="45"/><h4>DocuSign</h4></a>
  <p>Learn how to collect customer event data from the DocuSign and send it to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox25 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dropbox-source"><img src={useBaseUrl('img/integrations/saas-cloud/dropbox-icon.svg')} alt="dropbox-icon.png" width="45"/><h4>Dropbox</h4></a>
  <p>Provides a secure endpoint to receive team events from the Get Events API.</p>
  </div>
</div>
<div className="box smallbox26 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-source"><img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="110"/><h4>Druva</h4></a>
  <p>Learn how to configure the Druva C2C source setup in your Sumo Logic environment.</p>
  </div>
</div>
<div className="box smallbox27 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/druva-cyber-resilience-source"><img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="110"/><h4>Druva Cyber Resilience</h4></a>
  <p>Learn how to configure the Druva Cyber Resilience C2C source setup in your Sumo Logic environment.</p>
  </div>
</div>
<div className="box smallbox28 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/duo-source"><img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="40"/><h4>Duo</h4></a>
  <p>Provides a secure endpoint to receive authentication logs from the Duo Authentication Logs API.</p>
  </div>
</div>
<div className="box smallbox29 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/gmail-tracelogs-source"><img src={useBaseUrl('img/send-data/gmail-trace-logs-icon.svg')} alt="Gmail" width="40"/><h4>Gmail Trace Logs</h4></a>
  <p>Pulls Gmail log data using BigQuery Library APIs.</p>
  </div>
</div>
<div className="box smallbox30 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-bigquery-source"><img src={useBaseUrl('img/send-data/google-bigquery-icon.png ')} alt="Gmail" width="70"/><h4>Google BigQuery</h4></a>
  <p>Learn how to collect data using the BigQuery API.</p>
  </div>
</div>
<div className="box smallbox31 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-alertcenter"><img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="180"/><h4>Google Workspace AlertCenter</h4></a>
  <p>Configure Google Workspace AlertCenter Cloud-to-Cloud connector.</p>
  </div>
</div>
<div className="box smallbox32 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-source"><img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="180"/><h4>Google Workspace</h4></a>
  <p>Collects a list of users from the Google Workspace Users API.</p>
  </div>
</div>
<div className="box smallbox33 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/jumpcloud-directory-insights-source"><img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-logo.png')} alt="icon" width="120"/><h4>JumpCloud Directory Insights </h4></a>
  <p>Collect events data from the JumpCloud Directory Insight.</p>
  </div>
</div>
<div className="box smallbox34 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/knowbe4-api-source"><img src={useBaseUrl('img/send-data/knowbe4.png')} alt="icon" width="120"/><h4>KnowBe4 API Source</h4></a>
  <p>Collects user events data into Sumo Logic for storage, analysis, and alerting.</p>
  </div>
</div>
<div className="box smallbox35 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-azure-ad-inventory-source"><img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="thumbnail icon" width="25"/><h4>Microsoft Azure AD Inventory (Tag)</h4></a>
  <p>Collects user and device data from the Microsoft Graph API Security endpoint.</p>
  </div>
</div>
<div className="box smallbox36 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-exchange-trace-logs"><img src={useBaseUrl('img/send-data/microsoft-exchange-logo.svg')} alt="icon" width="120"/><h4>Microsoft Exchange Trace Logs</h4></a>
  <p>Collects email trace logs from the Office 365 reporting web service.</p>
  </div>
</div>
<div className="box smallbox37 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/ms-graph-azure-ad-reporting-source"><img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="50"/><h4>Microsoft Graph Azure AD Reporting</h4></a>
  <p>Collects Directory Audit, Sign-in, and Provisioning data from MS Graph API Azure AD activity reports.</p>
  </div>
</div>
<div className="box smallbox38 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-identity-protection-source"><img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="50"/><h4>Microsoft Graph Identity Protection</h4></a>
  <p>Collects Risk Detection and Risky User data from the Microsoft Graph Identity Protection API.</p>
  </div>
</div>
<div className="box smallbox39 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source"><img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="50"/><h4>Microsoft Graph Security API</h4></a>
  <p>Provides a secure endpoint to receive alerts from the Microsoft Graph Security API endpoint.</p>
  </div>
</div>
<div className="box smallbox40 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mimecast-source"><img src={useBaseUrl('img/send-data/Mimecast-icon.png')} alt="icon" width="50"/><h4>Mimecast</h4></a>
  <p>Supports collecting SIEM, DLP, Audit, and Hold Message List data from the Mimecast API.</p>
  </div>
</div>
<div className="box smallbox41 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/miro-source"><img src={useBaseUrl('img/send-data/Miro-logo.png')} alt="icon" width="50"/><h4>Miro</h4></a>
  <p>Ingests audit logs obtained from the Audit log API.</p>
  </div>
</div>
<div className="box smallbox42 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/netskope-source"><img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="thumbnail icon" width="75"/><h4>Netskope</h4></a>
  <p>Provides a secure endpoint to receive event data from the Netskope API.</p>
  </div>
</div>
<div className="box smallbox43 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/netskope-webtx-source"><img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="thumbnail icon" width="75"/><h4>Netskope WebTx</h4></a>
  <p>The Netskope WebTx API integration ingests Web Transaction logs from Netskope Event Stream.</p>
  </div>
</div>
  <div className="box smallbox44 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source"><img src={useBaseUrl('img/integrations/saml/okta.png')} alt="Thumbnail icon" width="75"/><h4>Okta</h4></a>
    <p>Provides a secure endpoint to receive event data from the Okta System Log API and Users API.</p>
  </div>
</div>
  <div className="box smallbox45 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/palo-alto-cortex-xdr-source"><img src={useBaseUrl('img/integrations/security-threat-detection/pan6.png')} alt="thumbnail icon" width="100"/><h4>Palo Alto Cortex XDR</h4></a>
    <p>Allows you to ingest incidents from your Cortex XDR application.</p>
    </div>
  </div>
  <div className="box smallbox46 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-on-demand-source"><img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/><h4>Proofpoint On Demand</h4></a>
    <p>Collects data and uses the secure WebSocket protocol to stream logs.</p>
    </div>
  </div>
  <div className="box smallbox47 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-tap-source"><img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/><h4>Proofpoint TAP</h4></a>
    <p>Provides a secure endpoint to receive data from the Proofpoint TAP SIEM API.</p>
    </div>
  </div>
    <div className="box smallbox48 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/qualys-vmdr-source"><img src={useBaseUrl('img/integrations/saas-cloud/qualys-icon.png')} alt="qualys-icon.png" width="150" /><h4>Qualys VMDR</h4></a>
    <p>The Qualys VMDR Source tracks errors, reports its health, and start-up progress.</p>
    </div>
</div>
    <div className="box smallbox49 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/rapid7-source"><img src={useBaseUrl('img/send-data/rapid7-logo.png')} width="120"/><h4>Rapid7</h4></a>
    <p>Collects asset and vulnerabilities data from Rapid7 InsightVM.</p>
    </div>
  </div>
    <div className="box smallbox50 card">
    <div className="container">
    <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sailpoint-source"><img src={useBaseUrl('img/integrations/security-threat-detection/sailpoint-logo.svg')} width="120"/><h4>SailPoint</h4></a>
    <p>Provides a secure endpoint to receive Events and User Inventory data from the IdentityNow V3 API.</p>
    </div>
  </div>
  <div className="box smallbox51 card">
    <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/salesforce-source"><img src={useBaseUrl('img/integrations/saas-cloud/salesforce-logo.svg')} alt="Thumbnail icon" width="75"/><h4>Salesforce</h4></a>
        <p>Provides a secure endpoint to receive event data from the Salesforce through its Rest API.</p>
        </div>
      </div>
      <div className="box smallbox52 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sentinelone-mgmt-api-source"><img src={useBaseUrl('img/send-data/sentinelone-icon.png')} alt="sentinelone-icon.png" width="50" /><h4>SentinelOne Mgmt API</h4></a>
        <p>Collects data from the SentinelOne Management Console.</p>
        </div>
      </div>
      <div className="box smallbox53 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/slack-source"><img src={useBaseUrl('img/integrations/saas-cloud/slack.png')} alt="Thumbnail icon" width="50"/><h4>Slack</h4></a>
        <p>Learn about the Slack Source, part of Sumo Logic's Cloud-to-Cloud Integration Framework.</p>
        </div>
      </div>
      <div className="box smallbox54 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sophos-central-source"><img src={useBaseUrl('img/send-data/sophos.jpeg')} alt="icon" width="50"/><h4>Sophos Central</h4></a>
        <p>Learn to receive authentication logs from the Sophos Central APIs.</p>
        </div>
      </div>
      <div className="box smallbox55 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/symantec-web-security-service-source"><img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="150"/><h4>Symantec Web Security Service</h4></a>
        <p>Learn to receive WSS Access logs from the Symantec WSS API.</p>
        </div>
      </div>
      <div className="box smallbox56 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source"><img src={useBaseUrl('img/send-data/tenable-logo.png')} alt="icon" width="190"/><h4>Tenable</h4></a>
        <p>Learn to ingest audit-log events, vulnerability, and asset data from the Tenable.io APIs.</p>
        </div>
      </div>
      <div className="box smallbox57 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/trellix-mvisio-epo-source"><img src={useBaseUrl('img/send-data/trellix-logo.png')} alt="icon" width="100"/><h4>Trellix mVision ePO</h4></a>
        <p>Learn how to collect event logs using the Trellix mVision ePO.</p>
        </div>
      </div>
      <div className="box smallbox58 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/webex-source"><img src={useBaseUrl('img/send-data/webex-logo.png')} alt="Thumbnail icon" width="250"/><h4>Webex</h4></a>
        <p>Learn to collect admin audit events using Webex API.</p>
        </div>
      </div>
      <div className="box smallbox59 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/workday-source"><img src={useBaseUrl('img/integrations/saas-cloud/workday.png')} alt="Thumbnail icon" width="50"/><h4>Workday</h4></a>
        <p>Learn to create a Workday Source.</p>
        </div>
      </div>
      <div className="box smallbox60 card">
        <div className="container">
        <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/zero-networks-segment-source"><img src={useBaseUrl('img/send-data/zero-networks-icon.png')} alt="Thumbnail icon" width="50"/><h4>Zero Networks Segment</h4></a>
        <p>Learn to collect audit logs and network activity data from Zero Networks Segment.</p>
        </div>
      </div>
    </div>
