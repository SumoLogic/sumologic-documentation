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


## Collect Logs and Metrics

### Log Types

The Sumo Logic App for GI GuardDuty requires the Amazon GuardDuty findings to be sent through the Amazon CloudWatch Events. For more details on [GuardDuty findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html).



## Install the App



## Viewing AWS Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />
