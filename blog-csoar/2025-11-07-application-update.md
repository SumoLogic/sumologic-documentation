---
title: November 7, 2025 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## October release

Following are the updates made in October.

### Changes and enhancements

#### Playbooks

* Updated dropdown placeholders to clarify that users can input custom values.
* Introduced the ability to assign titles to User Choice nodes for easier identification.

#### Integrations

* Added new integrations: 
   * [Google Cloud IAM](/docs/platform-services/automation-service/app-central/integrations/google-cloud-iam/)
   * [Google Firestore](/docs/platform-services/automation-service/app-central/integrations/google-firestore/)
   * [Microsoft SharePoint (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-sharepoint-graph/)
   * [ThreatConnect V3](/docs/platform-services/automation-service/app-central/integrations/threatconnect-v3/)
* Added IAM support for [Google Chat](/docs/platform-services/automation-service/app-central/integrations/google-chat/)  

### Bug Fixes

#### Playbooks

Enhanced security with fixes to prevent potential exploits in Text Area fields and across multiple pages.

#### Integrations

* Implemented polling mechanism (`poll_analysis`) in Scan URL action to wait until VirusTotal scan status becomes completed in the [VirusTotal V3](/docs/platform-services/automation-service/app-central/integrations/virustotal-v3/) integration.
* Fixed issue in the Download Mail As EML action in [Microsoft EWS (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-graph/).