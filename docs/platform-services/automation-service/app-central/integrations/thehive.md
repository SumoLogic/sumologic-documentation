---
title: TheHive
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/thehive.png')} alt="thehive" width="80"/>

***Version: 1.2  
Updated: May 22, 2025***

Query, update, and work with cases in TheHive from Cloud SOAR.

## Overview

### Purpose

This integration enables seamless interaction with TheHive platform, allowing case and observable management. It supports creating, updating, and searching cases and observables.

### Use cases

* Create and update incident cases/observables.
* Search for existing cases or observables matching specific criteria.
* Find similar observables.
* Retrieve detailed information about a case or observable for investigation.

### Supported versions
* TheHive 5.x

### Prerequisites
* A working instance of TheHive with API access enabled.
* API key with appropriate permissions.

## Actions

* **Create Case** (*Notification*) - Create a new case.
* **Create Observable** (*Enrichment*) - Create a new observable.
* **Find Similar Observables** (*Enrichment*) - Find observables similar to the current observable.
* **Get Case** (*Enrichment*) - Get case information.
* **Get Observable** (*Enrichment*) - Get observable information.
* **Search Case** (*Enrichment*) - Query existing cases.
* **Search Observable** (*Enrichment*) - Query existing observables.
* **Update Case** (*Notification*) - Update an existing case.
* **Update Observable** (*Enrichment*) - Update an existing observable.

## Configure TheHive in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **API Key**. A unique token used to authenticate API requests to TheHive.
* **Server URL**. The base URL (hostname or IP address) of your TheHive server.
* **Port**. (Optional) The port number on which TheHive is accessible.
* **Organization Name**. (Optional) The name of the organization context in multi-tenant deployments of TheHive.
* **Automation Engine**. Select **Cloud execution** for this certified integration. Select a bridge option only for a custom integration. See [Cloud or Bridge execution](/docs/platform-services/automation-service/automation-service-integrations/#cloud-or-bridge-execution).

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/thehive-configuration.png')} style={{border:'1px solid gray'}} alt="TheHive configuration" width="400"/>

For information about TheHive, see [TheHive documentation](https://docs.strangebee.com/).

## Usage

### Basic usage
* Create Case: Provide case title, severity, TLP, tags, and other metadata to create a new case in TheHive.
* Create Observable: Supply caseId, data, dataType, and other metadata to attach observables to a case.
* Get Case/Observable: Retrieve full metadata for any case or observable using its unique ID.

### Advanced usage
* Search Case/Observable: Use complex queries to find matching cases or observables using filters.
* Find Similar Observables: compare observables with similar traits across multiple cases.
* Update Case/Observable: Modify fields like TLP, tags, status, or timestamps.

## API reference

### Configuration
To configure the integration:
* API Key: A unique token used to authenticate API requests to TheHive.
* Server URL and Port: Define the host and port of TheHive instance (port is optional).
* Organization Name (optional): Organization name.

### Enrichment API
* Create Observable
* Update Observable
* Search Observable/Case
  * Use filtering parameters (dataType, tags, date, etc.) to retrieve specific artifacts or cases.

### Rate Limits and Quotas
* There are no specific limits enforced by TheHive unless configured externally.

#### Troubleshooting
* Forbidden (403): Check API key.
* Not Found (404): Ensure IDs like caseId or artifactId are correct.
* Validation Errors: Ensure correct formatting of fields like range (start-end), timestamps, or tags.

### FAQ

#### What happens if an invalid range is passed?
The input will be cleaned (e.g., 5 - 10 to 5-10) and validated. If the format is incorrect or the range is invalid (start > end), an error is raised.

### Support
For issues, questions, or improvements:
* Use the Sumo Logic logs and API error messages for initial debugging.
* Refer to TheHive [official documentation](https://docs.thehive-project.org/)

## Change Log

* January 29, 2019 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
* May 22, 2025 (v1.2) – Modified TheHive integration with case and observable enhancements:
  * Fixed parsing issues for date related inputs with inconsistent formatting.
  * Fixed ssl related warning issues.
  * Added organization name field in resource which will included in the headers.
  * Enhanced error handling and made the integration more resilient to malformed inputs.
