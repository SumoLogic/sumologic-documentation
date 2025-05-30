---
title: Security Scorecard
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/security-scorecard.png')} alt="security-scorecard" width="100"/>

***Version: 1.3  
Updated: Jul 13, 2023***

Create, update, and delete portfolios as well as gather enrichment data on all current portfolios.

## Actions

* **Get Company Info** (*Enrichment*) - Gather basic information on a specified company identifier.
* **Get Company Services** (*Enrichment*) - Gather service information from a specific company domain.
* **List Companies** (*Enrichment*) - Gather a list of all available companies.
* **List Portfolios** (*Enrichment*) - Gather a list of all available portfolios.
* **Get Report** (*Enrichment*) - Get a recently ran report.
* **Get Company Historical Breaches** (*Enrichment*) - Get a list of breaches for a specific company.
* **Get Company Historical Events** (*Enrichment*) - Get a list of previously observed events.
* **Get Issue Type** (*Enrichment*) - Get details of a specific issue type.
* **List Factor Types** (*Enrichment*) - Gather a list of all factor types.
* **List Issues Types** (*Enrichment*) - Gather a list of all issue types.
* **Generate Company Summary Report** (*Enrichment*) - Generate a Company Summary Report.
* **Generate Full Scorecard Report** (*Enrichment*) - Generate Full Scorecard Report.
* **Generate Portfolio Report** (*Enrichment*) - Generate Portfolio Report.
* **Generate Scorecard Footprint Report** (*Enrichment*) - Generate Scorecard Footprint Report.
* **Generate Company Detailed Report** (*Enrichment*) - Generate Company Detailed Report.
* **Generate Company Events Report** (*Enrichment*) - Generate Company Events Report.
* **Generate Company Issues Report** (*Enrichment*) - Generate Company Issues Report.
* **Generate Company Partnership Report** (*Enrichment*) - Generate Company Partnership Report.
* **Generate Company Summary Report** (*Enrichment*) - Generate Company Summary Report.
* **Generate Full Scorecard Report** (*Enrichment*) - Generate Full Scorecard Report.
* **Generate Portfolio Report** (*Enrichment*) - Generate Portfolio Report.
* **Get Active Issue Findings** (*Enrichment*) - Pulls information for the issue type 'admin-subdomain'.
* **Get Historical Issue Findings** (*Enrichment*) - Pulls historical information by issue type.
* **Add Company To Portfolio** (*Containment*) - Add a new company to a portfolio.
* **Remove Company From Portfolio** (*Containment*) - Remove an existing company from a portfolio.
* **Create Portfolio** (*Containment*) - Create a new portfolio.
* **Create Grade Change Alert** (*Containment*) - Create a new grade change alert.
* **Create Portfolio** (*Containment*) - Create a new portfolio.
* **Create Score Threshold Alert** (*Containment*) - Create a new threshold alert.
* **Delete Portfolio** (*Containment*) - Delete an existing portfolio.
* **Delete Grade Change Alert** (*Containment*) - Delete a grade change.
* **Delete Portfolio** (*Containment*) - Delete a portfolio.
* **Delete Score Threshold Alert** (*Containment*) - Delete a score threshold alert.
* **Edit Portfolio** (*Containment*) - Edit an existing portfolio.
* **Send Feedback** (*Containment*) - Send new feedback on findings from a specific issue type.
* **Get Notifications** (*Daemon*) - Get all notifications.

## Configure Security Scorecard in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/security-scorecard-configuration.png')} style={{border:'1px solid gray'}} alt="Security Scorecard configuration" width="400"/>

For information about Security Scorecard, see [Security Scorecard documentation](https://securityscorecard.readme.io/reference/introduction).

## Change Log

* January 31, 2020 - First upload
* May 5, 2020 - New actions added
* June 26, 2020 - New actions added
* July 13, 2023 (v1.3)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
