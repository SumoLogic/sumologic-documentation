---
title: Check Point
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/check-point.png')} alt="Check Point icon" width="100"/>

***Version: 1.5  
Updated: April 27, 2026***

Utilize Check Point to gather enrichment data and issue containment actions during incident investigations.

## Actions

* **Domain Information** (*Enrichment*) - Gather domain information.
* **IP Information** (*Enrichment*) - Gather IP information.
* **User Attributes** (*Enrichment*) - Gather user attributes for a specific user account.
* **Show Access rule-base** (*Enrichment*) - Get access rule-base.
* **Show Threat rule-base** (*Enrichment*) - Get threat rule-base.
* **Block IP** (*Containment*) - Block the specified IP address.
* **Unblock IP** (*Containment*) - Unblock the specified IP address.
* **Block Domain** (*Containment*) - Block a specific domain.
* **Unblock Domain** (*Containment*) - Unblock a specific domain.
* **Unlock User** (*Containment*) - Unlock a specific user account.
* **Block Port** (*Containment*) - Block a specific port.
* **Unblock Port** (*Containment*) - Unblock a specific port.
* **Add Rule** (*Containment*) - Add a new rule.
* **Delete Rule** (*Containment*) - Delete an existing rule.
* **Add Threat Rule** (*Containment*) - Add a new threat rule.
* **Delete Threat Rule** (*Containment*) - Delete an existing threat rule.
* **Add Host To Specific Group** (*Containment*) - Add host to a group.
* **Assign Global** (*Containment*) - Assign global policy.
* **Install Policy** (*Containment*) - Install a specific policy.
* **Show Access Rule** *(Enrichment)* - Get access rule.

## Category

Network Security

## Configure Check Point in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the Check Point URL.

* **API Key**. Enter the [Check Point API key](https://docs.cgn.portal.checkpoint.com/reference/authentication).

* **Username**. Enter the username of a Check Point admin user authorized to authenticate the integration.

* **Password**. Enter the password of the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/check-point/check-point-configuration.png')} style={{border:'1px solid gray'}} alt="Check-Point configuration" width="400"/>

For information about Check Point, see [Check Point documentation](https://sc1.checkpoint.com/documents/latest/api_reference/index.html).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.5 | April 27, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.4 | June 23, 2023 | <ul><li>Updated the integration with Environmental Variables.</li><li>Renamed from Check Point OIF to Check Point.</li></ul> |
| | November 30, 2022 | Added a new action: **Show Access Rule**. |
| | November 22, 2022 | <ul><li>Changed `arg.url` to `arg.server` in the integration file and actions.</li><li>Added `verify`, `timeout`, and `proxy_url`.</li><li>Added REQUIRED as help where needed.</li><li>Changed the type of list to text, where `incident_artifacts` is true.</li></ul> |
| | September 7, 2021 | Added new actions: **Add Host To Specific Group**, **Assign Global**, and **Install Policy**. |
| | May 15, 2020 | Added new actions: **Block Port**, **Add Rule**, **Delete Rule**, **Add Threat Rule**, and **Delete Threat Rule**. |
| | February 10, 2020 | Initial release of the Check Point integration. |
