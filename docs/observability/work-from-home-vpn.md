---
id: work-from-home-vpn
title: Work-from-Home VPN Solution
sidebar_label: VPN Monitoring
tags: [work from home, vpn]
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/general/Home.png')} alt="icon" width="70"/>

Enable quick, safe, and reliable work-from-home monitoring.

A suite of in-depth apps that provide visibility and management for your remote workforce with SSO, remote access, endpoint security and productivity SaaS apps to ensure that your employees can work from home productively and safely. Monitor availability, performance, user activity and collaboration, and security across your workforce locations.

<img src={useBaseUrl('img/observability/VPN-UserActivity.png')} alt="work from home VPN solution" />

Our Work-from-Home Solution provides support in all areas of remote work management for your enterprise, including:

* **SSO**: [Auth0](/docs/integrations/saml/auth0), [Duo](/docs/integrations/security-threat-detection/duo-security), [Okta](/docs/integrations/saml/Okta), [One Login](/docs/integrations/saml/OneLogin), [Azure Active Directory](/docs/integrations/microsoft-azure/active-directory-azure)
* **Remote Access**: [Cisco Meraki](/docs/integrations/security-threat-detection/Cisco-Meraki), [Zscaler Web Security](/docs/integrations/security-threat-detection/zscaler-web-security)
* **Productivity Apps**: [G Suite](/docs/integrations/google/workspace/index.md),[Office 365](/docs/integrations/App-Development/Jira), [Salesforce](/docs/integrations/saas-cloud/Salesforce), [Slack](/docs/integrations/saas-cloud/Slack), [Zoom](/docs/integrations/saas-cloud/Zoom)
* **Endpoint Security:** [Crowdstrike Falcon](/docs/integrations/security-threat-detection/CrowdStrike-Falcon-Endpoint-Protection), [Carbon Black](/docs/integrations/security-threat-detection/VMware-Carbon-Black), [Cylance](/docs/integrations/security-threat-detection/Cylance)


## Configure Data Collection

All of these apps are available in our App Catalog. To get your data collection configured, you need to use one of the following collectors:

* [Installed Collectors ](/docs/send-data/Installed-Collectors) are deployed in your environment, on a local machine, a machine in your organization, or even an Amazon Machine Image (AMI). Installed Collectors require a software download and installation. Upgrades to Collector software are released regularly by Sumo Logic.
* [Hosted Collectors](/docs/send-data/Hosted-Collectors) reside in the Cloud, allowing for seamless collection from cloud sources.

Apps in the Work-from-Home Enterprise solution package use the following collector types:


<table>
  <tr>
   <td><strong>App </strong>
   </td>
   <td><strong>Sumo Logic Collector Type</strong>
   </td>
  </tr>
  <tr>
   <td>Office 365
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Okta
   </td>
   <td>Installed Collector
   </td>
  </tr>
  <tr>
   <td>G Suite
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>OneLogin
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Auth0
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Salesforce
   </td>
   <td>Installed Collector
   </td>
  </tr>
  <tr>
   <td>Cisco Meraki
   </td>
   <td>Installed Collector
   </td>
  </tr>
  <tr>
   <td>Slack
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Duo Security
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Azure Active Directory
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Zscaler
   </td>
   <td>Installed Collector
   </td>
  </tr>
  <tr>
   <td>Carbon Black
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>Cylance
   </td>
   <td>Hosted Collector
   </td>
  </tr>
  <tr>
   <td>CrowdStrike Falcon
   </td>
   <td>Installed Collector
   </td>
  </tr>
  <tr>
   <td>Zoom
   </td>
   <td>Hosted Collector
   </td>
  </tr>
</table>


If you want to use multiple apps that need a hosted collector, you can install one hosted collector across all apps. You do not need a special hosted collector for each app.

If you are using multiple apps that need an installed collector, we recommend starting out using a single installed collector for all apps. Then, depending on the size and performance of the machine you are running your collector, you may need to add additional collectors for each app.


## Install Working from Home Apps

You can find any of these apps in our Working from Home Solution Section of the App Catalog.

<img src={useBaseUrl('img/observability/WorkFromHome.gif')} alt="work from home VPN solution" />

To install any of these apps, follow their directions:

* [Azure Active Directory](/docs/integrations/microsoft-azure/active-directory-azure)
* [Auth0](/docs/integrations/saml/Auth0)
* [Carbon Black](/docs/integrations/security-threat-detection/VMware-Carbon-Black)
* [Cisco Meraki](/docs/integrations/security-threat-detection/Cisco-Meraki)
* [Crowdstrike Falcon](/docs/integrations/security-threat-detection/CrowdStrike-Falcon-Endpoint-Protection)
* [Cylance](/docs/integrations/security-threat-detection/Cylance)
* [Duo](/docs/integrations/security-threat-detection/duo-security)
* [G Suite](/docs/integrations/google/workspace/index.md)
* [Okta](/docs/integrations/saml/Okta)
* [One Login](/docs/integrations/saml/OneLogin)
* [Office 365](/docs/integrations/microsoft-azure/Office-365)
* [Salesforce](/docs/integrations/saas-cloud/Salesforce)
* [Slack](/docs/integrations/saas-cloud/Slack)
* [Zscaler Web Security](/docs/integrations/security-threat-detection/zscaler-web-security)
* [Zoom](/docs/integrations/saas-cloud/Zoom)


## Community Resources

The Work-from-Home Solution includes Remote Access apps for Cisco Meraki, Zscaler Web Security, and Zoom. In addition, the following VPN solutions are now also available on our Github repository:

* [Palo Alto Networks GlobalProtect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Palo_Alto_Networks/GlobalProtect)
* [Cisco AnyConnect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Cisco/ASA)
* [Netscaler VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Citrix/VPN)
* [Zoom](/docs/integrations/saas-cloud/zoom)

If you’d like assistance with custom content, a Customer Success representative would be happy to spend an hour working with your team to tailor a solution. If content for your Remote Access platform isn’t supported yet, check out the next section for common use cases.


## VPN Monitoring Resources and Tips

These days, as more and more people work from home, it’s especially important to ensure that your work from home infrastructure is healthy, and your VPN is keeping your employees connected and your data secure. You can use Sumo Logic to monitor traffic, user activity, successful and failed logins, and more. This page summarizes Sumo Logic resources and recommendations for monitoring your VPN.


## Other solutions and apps for infrastructure monitoring

These ready-to-run apps are a good starting point for monitoring critical parts of your infrastructure that support a work from home workforce:  

* [Work-from-Home Solution](/docs/observability/work-from-home-vpn)—This solution allows you to monitor all aspects of the infrastructure you use to enable employees to work from home, safely and securely—including your productivity apps, and the services you use for SSO, remote access, endpoint security.   
* [Sumo Logic App for Cisco Meraki](/docs/integrations/security-threat-detection/Cisco-Meraki)—You can use this app to monitor and troubleshoot network security, end-to-end performance, switch port management, and device management of your Cisco Meraki wireless infrastructure management platform.  
* [Sumo Logic App for Zscaler Web Security](/docs/integrations/security-threat-detection/zscaler-web-security)—This app provides visual insights into web traffic behaviors, security, user browsing activities, and risk in Zscaler.


### Dashboards for VPN monitoring

We created these dashboards to help you monitor commonly used VPNs. The dashboards are open source and published on GitHub.

* [Dashboard for Cisco AnyConnect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Cisco/ASA)—This dashboard displays successful and failed logins, session durations, connections, and concurrent users.

<img src={useBaseUrl('img/observability/vpn-anyconnect.png')} alt="work from home VPN solution" />

* [Dashboard for Palo Alto Networks GlobalProtect VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Palo_Alto_Networks/GlobalProtect)—This dashboard displays successful and failed logins and malicious IP activity.

<img src={useBaseUrl('img/observability/vpn-pan.png')} alt="work from home VPN solution" />

* [Dashboard for Netscaler VPN Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Citrix/VPN)—This dashboard displays successful and failed logins, users authenticating from multiple IPs, and rare user agents.

<img src={useBaseUrl('img/observability/vpn-netscaler.png')} alt="work from home VPN solution" />

### Tips for creating your own searches and dashboards

When you build your own searches and dashboards consider these VPN monitoring best practices:

* Successful logins—Monitor for spikes or drops in logins, and whether they are coming from expected locations.
    * Total
    * By location
    * Logins from multiple IPs
    * Trend over time
* Failed logins—Monitor for spikes in failed logins and where those login attempts are coming from.
    * Total
    * By location
    * Trend over time
* Events and connections—Monitor both the most common and least common events from your VPN service.
    * Top events
    * Events trend over time
    * Connections over time
* Suspicious activity—Use our [Threat Intelligence](/docs/integrations/security-threat-detection/threat-intel-quick-analysis) and [ASN Lookup](/docs/search/search-query-language/search-operators/asn-lookup) integration to monitor for malicious connections.
    * Top suspicious IPs and threat intelligence
    * Suspicious IPs trend over time
    * Abnormal session durations
