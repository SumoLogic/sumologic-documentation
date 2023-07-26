---
id: work-from-home-vpn
title: Work from Home VPN Solution
sidebar_label: Work from Home Solution
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/general/Home.png')} alt="icon" width="50"/>

Enable quick, safe, and reliable work-from-home monitoring with our Work from Home Solution, a suite of in-depth SaaS apps that provide visibility and management for your remote employee workforce with SSO, remote access, endpoint security, and productivity.

This solution provides support in all areas of remote work management for your enterprise, including:

* **SSO**: [Auth0](/docs/integrations/saml/auth0), [Duo Security](/docs/integrations/security-threat-detection/duo-security), [Okta](/docs/integrations/saml/okta), [One Login](/docs/integrations/saml/onelogin), [Azure Active Directory](/docs/integrations/microsoft-azure/active-directory-azure)
* **Remote Access**: [Cisco Meraki](/docs/integrations/security-threat-detection/cisco-meraki)
* **Productivity Apps**: [Google Workspace](/docs/integrations/google/workspace), [Office 365](/docs/integrations/app-development/jira), [Salesforce](/docs/integrations/saas-cloud/salesforce), [Sailpoint](/docs/integrations/security-threat-detection/sailpoint), [Slack](/docs/integrations/saas-cloud/slack), [Microsoft Teams](/docs/integrations/microsoft-azure/teams), [Workday](/docs/integrations/saas-cloud/workday), [Zoom](/docs/integrations/saas-cloud/zoom)
* **Endpoint Security:** [Crowdstrike Falcon Endpoint Protection](/docs/integrations/security-threat-detection/crowdstrike-falcon-endpoint-protection), [Carbon Black](/docs/integrations/security-threat-detection/vmware-carbon-black), [Cylance](/docs/integrations/security-threat-detection/cylance)

## VPN Monitoring Use Cases

These days, as more and more people work from home, it’s especially important to ensure that your work from home infrastructure is healthy, and your VPN is keeping your employees connected and your data secure.

You can use Sumo Logic to monitor traffic, user activity, successful and failed logins, and more. This page summarizes Sumo Logic resources and recommendations for monitoring your VPN.


## Step 1: Configure Data Collection

To configure data collection, you'll first need to decide on the Work From Home app you want to install, as it will determine need to set up an Installed Collector or Hosted Collector.

<details><summary>What are Collectors?</summary>

* [Installed Collectors](/docs/send-data/installed-collectors) are deployed in your environment, on a local machine, a machine in your organization, or even an Amazon Machine Image (AMI). Installed Collectors require a software download and installation. Upgrades to Collector software are released regularly by Sumo Logic.
* [Hosted Collectors](/docs/send-data/hosted-collectors) reside in the Cloud, allowing for seamless collection from cloud sources.

</details>

| App                    | Sumo Logic Collector Type |
|:-----------------------|:--------------------------|
| Office 365             | Hosted Collector          |
| Okta                   | Installed Collector       |
| G Suite                | Hosted Collector          |
| OneLogin               | Hosted Collector          |
| Auth0                  | Hosted Collector          |
| Salesforce             | Installed Collector       |
| Cisco Meraki           | Installed Collector       |
| Slack                  | Hosted Collector          |
| Duo Security           | Hosted Collector          |
| Azure Active Directory | Hosted Collector          |
| Zscaler                | Installed Collector       |
| Carbon Black           | Hosted Collector          |
| Cylance                | Hosted Collector          |
| CrowdStrike Falcon     | Installed Collector       |
| Zoom                   | Hosted Collector          |


If you want to use multiple apps that need a hosted collector, you can install one hosted collector across all apps. You do not need a special hosted collector for each app.

If you are using multiple apps that need an installed collector, we recommend starting out using a single installed collector for all apps. Then, depending on the size and performance of the machine you are running your collector, you may need to add additional collectors for each app.


## Step 2: Install a Work from Home app

To find our Work from Home apps, go to the **App Catalog** > **Work from Home Solution** section.

<img src={useBaseUrl('img/observability/WorkFromHome.gif')} alt="work from home VPN solution" />

To install any of these apps, follow their directions by clicking on an app link below:

* **SSO**: [Auth0](/docs/integrations/saml/auth0), [Duo Security](/docs/integrations/security-threat-detection/duo-security), [Okta](/docs/integrations/saml/okta), [One Login](/docs/integrations/saml/onelogin), [Azure Active Directory](/docs/integrations/microsoft-azure/active-directory-azure)
* **Remote Access**: [Cisco Meraki](/docs/integrations/security-threat-detection/cisco-meraki)
* **Productivity Apps**: [Google Workspace](/docs/integrations/google/workspace), [Office 365](/docs/integrations/app-development/jira), [Salesforce](/docs/integrations/saas-cloud/salesforce), [Sailpoint](/docs/integrations/security-threat-detection/sailpoint), [Slack](/docs/integrations/saas-cloud/slack), [Microsoft Teams](/docs/integrations/microsoft-azure/teams), [Workday](/docs/integrations/saas-cloud/workday), [Zoom](/docs/integrations/saas-cloud/zoom)
* **Endpoint Security:** [Crowdstrike Falcon Endpoint Protection](/docs/integrations/security-threat-detection/crowdstrike-falcon-endpoint-protection), [Carbon Black](/docs/integrations/security-threat-detection/vmware-carbon-black), [Cylance](/docs/integrations/security-threat-detection/cylance)

## Step 3: View Dashboards and insights

Monitor availability, performance, user activity and collaboration, and security across your workforce locations.

<img src={useBaseUrl('img/observability/VPN-UserActivity.png')} alt="work from home VPN solution" />


### Dashboards for VPN monitoring

We've created these dashboards to help you monitor commonly used VPNs. The dashboards are open source and published on GitHub.

* [Dashboard for Cisco AnyConnect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Cisco/ASA). This dashboard displays successful and failed logins, session durations, connections, and concurrent users.<br/> <img src={useBaseUrl('img/observability/vpn-anyconnect.png')} alt="work from home VPN solution" />
* [Dashboard for Palo Alto Networks GlobalProtect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Palo_Alto_Networks/GlobalProtect)—This dashboard displays successful and failed logins and malicious IP activity.<br/> <img src={useBaseUrl('img/observability/vpn-pan.png')} alt="work from home VPN solution" />
* [Dashboard for Netscaler VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Citrix/VPN)—This dashboard displays successful and failed logins, users authenticating from multiple IPs, and rare user agents.<br/> <img src={useBaseUrl('img/observability/vpn-netscaler.png')} alt="work from home VPN solution" />

### Tips for creating your own searches and dashboards

When you build your own searches and dashboards consider these VPN monitoring best practices:

* **Successful logins**. Monitor for spikes or drops in logins, and whether they are coming from expected locations.
   * Total
   * By location
   * Logins from multiple IPs
   * Trend over time
* **Failed logins**. Monitor for spikes in failed logins and where those login attempts are coming from.
    * Total
    * By location
    * Trend over time
* **Events and connections**. Monitor both the most common and least common events from your VPN service.
    * Top events
    * Events trend over time
    * Connections over time
* **Suspicious activity**. Use our [Threat Intelligence](/docs/integrations/security-threat-detection/threat-intel-quick-analysis) and [ASN Lookup](/docs/search/search-query-language/search-operators/asn-lookup) integration to monitor for malicious connections.
    * Top suspicious IPs and threat intelligence
    * Suspicious IPs trend over time
    * Abnormal session durations


## Community Resources

The Work from Home Solution includes Remote Access apps for Cisco Meraki, Zscaler Web Security, and Zoom. In addition, the following VPN solutions are now also available on our GitHub repository:

* [Palo Alto Networks GlobalProtect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Palo_Alto_Networks/GlobalProtect)
* [Cisco AnyConnect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Cisco/ASA)
* [Netscaler VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Citrix/VPN)
* [Zoom](/docs/integrations/saas-cloud/zoom)

If you’d like assistance with custom content, a Customer Success representative would be happy to spend an hour working with your team to tailor a solution. If content for your Remote Access platform isn’t supported yet, check out the next section for common use cases.
