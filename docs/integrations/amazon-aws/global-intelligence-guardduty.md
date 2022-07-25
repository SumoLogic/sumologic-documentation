---
id: global-intelligence-guardduty
title: Global Intelligence for Amazon GuardDuty
sidebar_label: Global Intelligence for Amazon GuardDuty
description: Global Intelligence for Amazon GuardDuty
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This feature is available in the following account plans.

<table>
  <tr>
   <td>Account Type
   </td>
   <td>Account Level
   </td>
  </tr>
  <tr>
   <td>CloudFlex
   </td>
   <td>Trial, Enterprise
   </td>
  </tr>
  <tr>
   <td>Credits
   </td>
   <td>Trial, Enterprise Suite, Enterprise Security
   </td>
  </tr>
</table>


[Amazon GuardDuty](https://aws.amazon.com/guardduty/) is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads. The Sumo Logic App for Global Intelligence for Amazon GuardDuty analyzes GuardDuty threats from the Sumo Logic population to create baselines of threats. These baselines enable you to optimize security posture and remediation based on how unusual your GuardDuty findings are compared to Sumo Logic customers. The App includes pre-configured dashboards and searches with visual displays for global threat baselines and real-time threat detection across your AWS environment.

This application name is abbreviated to **GI GuardDuty** in these documentation pages, as well as in the application pages.

**IMPORTANT NOTES! **

* Global Intelligence baselines are computed by aggregating data for a given customer across all their source categories defined for Amazon GuardDuty. As result, to enable meaningful comparisons, the app must be provided with all the source categories in your Sumo Logic account that are associated with AWS GuardDuty. Follow the instructions on the[ Custom Data Filters](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Custom-Data-Filters) page to set up your app with custom data filters, specifying multiple source categories for Amazon GuardDuty.  
* Threat score trends are not meaningful beyond the most recent 24 hours. This is because Global Intelligence baselines are the daily average over the most recent 7 days. As a result, the time range in the panels should not be changed beyond the most recent 24 hours.  
* The `infer` operator is not intended for use outside of Sumo Logic Global Intelligence apps.


## App Pre-configured Dashboards

The App includes pre-configured dashboards and searches with visual displays for global threat baselines and real-time threat detection across your AWS environment, including threat sources and targets by geographic locations.  


## Collecting GI GuardDuty Logs and Metrics

### Log Types

The Sumo Logic App for GI GuardDuty requires the Amazon GuardDuty findings to be sent through the Amazon CloudWatch Events. For more details on [GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html).



## Installing the GI GuardDuty App





## Viewing the GI GuardDuty App Dashboards

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


### GI GuardDuty - 01. Global Baseline

**GI GuardDuty - 01. Global Baseline** dashboard provides a high-level baseline of threats across Sumo Logic customers. Panels display graphs for threat and severity distribution, targeted resources, and relative rarity.

<img src={useBaseUrl('img/integrations/amazon-aws/GI_GuardDuty_Global_Baseline.png')} alt="GI GuardDuty" />

Use this dashboard to:
* Determine if you are being attacked by a particular region or actor around the globe.
* Assess rare threats found by Amazon GuardDuty in your AWS environment.
* Analyze threat shares targeted resources and severity.


### GI GuardDuty - 02. Your Company v. Global Baseline

**GI GuardDuty - 02. Your Company v. Global Baseline **dashboard compares your AWS environment against all Sumo Logic customers. The threat score (0=LOW RISK, 100=HIGH RISK) is a composite view of risk associated with GuardDuty findings and is impacted by severity, number of findings, deviation from global baseline and rarity of threats within Sumo Logic customers. In addition to the latest score, the trend line panel shows the 7 day trend of the threat score. My Prioritized Action Plan lists the change management actions in order of impact on GuardDuty security posture.

<img src={useBaseUrl('img/integrations/amazon-aws/GI_GuardDuty_Your_Company_v_Baseline.png')} alt="GI GuardDuty" />

Use this dashboard to:
* Understand top level threat score and trends.
* How your company’s GuardDuty findings compare to Sumo Logic customers.
* How your company’s findings severity compares to Sumo Logic customers.
* Understand which threats to remediate prioritized based on the greatest impact to threat score.
* Review a prioritized action plan for your company.


### GI GuardDuty - 03. Findings Analysis

**GI GuardDuty - 03. Findings Analysis** dashboard provides a high-level view of threats to your AWS environment. Panels display information on threats by threat purpose, geography, impacted resource type, account, severity and trends.

<img src={useBaseUrl('img/integrations/amazon-aws/GI_GuardDuty_Findings_Analysis.png')} alt="GI GuardDuty" />

Use this dashboard to:
* Understand the mix of threats in your environment.
* Identify the source and target of threats in your environment.
* Review your company's threats by severity and resource type.
* Review your company's threats by account, security group, EC2 instances, and threat trends.
