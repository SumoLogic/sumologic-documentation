---
title: Microsoft Sentinel
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-sentinel.png')} alt="microsoft-sentinel" width="100"/>

***Version: 1.7  
Updated: April 26, 2025***

Microsoft Sentinel is a cloud-native security information and event manager (SIEM) platform that uses built-in AI to help analyze large volumes of data across an enterprise. 

## Overview

### Purpose

This documentation outlines the Microsoft Sentinel integration, providing details on its capabilities, usage, and support for managing security incidents.

### Use cases

* Automatically fetch and process security incidents from Sentinel.
* Review incident details, comments, and related entities to streamline triage.
* Trigger automated incident management workflows, such as updating incident status, severity, or ownership using Update Incident, or adding context through Add Incident Comment.
* Remove false positives or resolved alerts by leveraging the Delete Incident action.

### Supported versions

* Microsoft Sentinel API (2023-02-01 and compatible preview versions)
* Azure Resource Manager endpoints
* Compatible with Azure Workspaces in supported regions like uksouth, westeurope, etc.

### Prerequisites
* Active Azure subscription with Microsoft Sentinel enabled
* A configured Log Analytics workspace
* Application registration with:
  * Client ID
  * Client Secret
  * Tenant ID
* API permissions:
  * Microsoft.SecurityInsights/*
  * Microsoft.OperationalInsights/*

### Limitations
* Pagination (nextLink) must be handled carefully to avoid incorrect URL construction.
* Certain API versions may not be available in all regions.
* Incident response APIs may have throttling under the high load.
* Only incidents created after a specified timestamp can be fetched using filters.

## Actions

* **List Incident Comments** (*Enrichment*) - Gather all comments for a specific incident.
* **Get Incident** (*Enrichment*) - Get a specific incident.
* **List Incidents** (*Enrichment*) - Get a list of all incidents.
* **Search Into Sentinel Events** (*Enrichment*) - Query into a Sentinel event.
* **List Incident Entities** (*Enrichment*) - Get all incident related entities.
* **List Incident Entities V2** (*Enrichment*) - Get all incident related entities and enrich Sentinel entities with additional information to Cloud SOAR entities.
* **Add Incident Comment** (*Containment*) - Add a new incident comment.
* **Delete Incident** (*Containment*) - Delete an incident.
* **Update Incident** (*Containment*) - Update an incident.
* **Microsoft Sentinel Incidents Daemon** (*Daemon*) - Automatically pull all Sentinel incidents.

## Configure Microsoft Sentinel in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* Tenant
* Client ID
* Client Secret
* Subscription ID
* Workspace Name
* Resource Group
* Automation Engine<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-sentinel/ms-sentinel.png')} style={{border:'1px solid gray'}} alt="Edit Resource for AWS WAF" width="400"/>


For information about Microsoft Sentinel, see [Microsoft Sentinel documentation](https://learn.microsoft.com/en-us/azure/sentinel/).

## Usage

### Basic usage
* Configure credentials (Tenant ID, Client ID, Client Secret).
* Use the List Incidents action to pull incidents.
* Apply filtering with createdTimeUtc or severity.
* Use containment actions (for example, Update Incident) to manage active incidents.

### Advanced usage
* Automate continuous incident ingestion using Microsoft Sentinel Incidents Daemon.
* Use enrichment actions like List Incident Entities V2 to map Sentinel entities to your SOAR platform.
* Use Search Into Sentinel Events for deep telemetry analysis.
* Chain incident updates and comment logging for full case management automation.

## API reference

### Configuration
Environment variables or parameters:
* tenant
* client id
* client secret
* subscription id
* resource group
* workspace name
* automation bridge
* Optional: api root, login endpoint, proxy, verify_ssl, CSOAR API URL, Access ID, Access Key

### Containment APIs

#### Update Incident
* Method: PATCH
* Action: Update Incident
* Required Parameters:
  * incident_id (string)
  * status (Active | Closed) (optional)
  * owner (optional)
  * classification (optional)
  * severity (optional) etc.

```python title="Sample Request (Python)"
response = requests.patch(
    url=f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.OperationalInsights/workspaces/{workspace_name}/providers/Microsoft.SecurityInsights/incidents/{incident_id}?api-version=2023-02-01",
    headers=headers,
    json={
        "properties": {
            "status": "Closed",
            "classification": "TruePositive",
            "owner": {"userPrincipalName": "securitylead@company.com"},
            "severity": "High"
        }
    }
)
```

```json title="Sample Response (JSON)"
{
  "id": "/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.OperationalInsights/workspaces/{workspace_name}/providers/Microsoft.SecurityInsights/incidents/{incident_id}",
  "properties": {
    "status": "Closed",
    "classification": "TruePositive",
    "owner": {"userPrincipalName": "securitylead@company.com"},
    "severity": "High"
  }
}
```
#### Delete Incident
* Method: DELETE
* Action: Delete Incident
* Required Parameters:
  * incident_id (string)

```python title="Sample Request (Python)"
response = requests.delete(
    url=f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.OperationalInsights/workspaces/{workspace_name}/providers/Microsoft.SecurityInsights/incidents/{incident_id}?api-version=2023-02-01",
    headers=headers
)
```

```
Success Response:

Code: 204 No Content

Body: None (successful deletion)
```

#### Add Incident Comment
* Method: POST
* Action: Add Incident Comment
* Required Parameters:
  * incident_id (string)
  * comment (string)

```python title="Sample Request (Python)"
response = requests.post(
    url=f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.OperationalInsights/workspaces/{workspace_name}/providers/Microsoft.SecurityInsights/incidents/{incident_id}/comments/{comment_id}?api-version=2023-02-01",
    headers=headers,
    json={
        "properties": {
            "message": comment
        }
    }
)
```

```json title="Sample Response (JSON)"
{
  "id": "/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.OperationalInsights/workspaces/{workspace_name}/providers/Microsoft.SecurityInsights/incidents/{incident_id}/comments/{comment_id}",
  "properties": {
    "message": "Investigated and updated status."
  }
}
```

### Enrichment APIs

#### List Incidents
* Method: Get
* Action: List Incidents
* Parameters: filter, order By, limit, skip token

#### Get Incident
* Method: Get
* Action: Get Incident
* Required Parameters: incident_id

```python title="Sample Request (Python)"
response = requests.get(
    f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group}/providers/Microsoft.OperationalInsights/workspaces/{workspace_name}/providers/Microsoft.SecurityInsights/incidents/{incident_id}?api-version=2023-02-01",
    headers=headers
)
```
```json title="Sample Response (JSON)"
{
  "id": "/subscriptions/<sub_id>/.../incidents/<incident_id>",
  "name": "<incident_id>",
  "type": "Microsoft.SecurityInsights/incidents",
  "properties": {
    "title": "Suspicious Sign-In Attempt",
    "severity": "High",
    "status": "Active",
    "createdTimeUtc": "2025-05-07T11:35:00Z",
    "lastModifiedTimeUtc": "2025-05-08T09:00:00Z"
  }
}
```

#### List Incident Comments
* Method: Get
* Action: List Incident Comments
* Required Parameters: incident_id

#### List Incident Entities / V2
* Method: Get
* Action: List Incident Entities / V2
* Required Parameters: incident_id

#### List Incident Entities
* Method: Get
* Action: List Incident Entities
* Required Parameters: incident_id

#### List Incident Alerts
* Method: Get
* Action: List Incident Alerts
* Required Parameters: incident_id

### Rate Limits and Quotas
* Azure REST API limits: 12,000 requests/hour per subscription.
* Excess requests may trigger HTTP 429 ("Too Many Requests").

#### Troubleshooting
| Issue | Resolution |
| :-- |:-- |
| ResourceNotFound on pagination | Ensure you're not appending query parameters to the nextLink. Use as-is. |
| 403 Forbidden | Validate token scope and check if the app has required permissions. |
| nextLink missing or invalid | Always check for nextLink in the response and follow without modifying. |

### FAQ

#### What permissions are required to use this integration?

To access Microsoft Sentinel incidents and related data, the service principal must have Microsoft Sentinel Reader or Contributor role on the workspace. Additionally, it needs Reader access at the subscription or resource group level.

#### Is incident deletion reversible?

No, deleting an incident via API is permanent.

#### Is pagination handled automatically?

Yes. The integration supports auto-pagination via the nextLink field returned in API responses.

#### Is the Daemon action customizable for time ranges?

Yes, it supports a createdTime parameter to control how far back incidents are fetched.

#### Why am I getting a Resource Not Found error?
This may happen if:
  * The workspace name, resource group, or subscription ID is incorrect.
  * The incident or entity ID does not exist.
  * The workspace is in a different region than expected.
  * Or code is appending query parameters to a nextLink, which already contains them.

### Support
* For issues, questions, or improvements:
* Azure Support: Open a support request via [Azure Portal](https://portal.azure.com/)
* Microsoft [Q&A](https://learn.microsoft.com/answers)
* GitHub/Community Forums (if applicable): Check if your integration has a public repo for collaboration

## Change Log

* September 2, 2020 - First upload
* June 8, 2022 - Updated actions: added "Scope" field
* July 11, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.3)
	+ integration refactored
	+ removed Alerts Daemon Sentinel (replaced by Microsoft Graph Security Alerts Daemon, in Graph Security integration)
	+ renamed action Get Entities to List Incident Entities
	+ renamed action Get Incident Comments to List Incident Comments
	+ renamed action Get Incidents to List Incidents
	+ renamed action Incidents Daemon Sentinel to Microsoft Sentinel Incidents Daemon
	+ added new action List Incident Alerts
* October 14, 2024 (v1.4)
	+ Updated the integration by adding two new fields (**API Root** and **Login Endpoint**) to the configuration
+ October 22, 2024 (v1.5)
	+ Added new action **List Incident Entities V2**
    + Updated the integration by adding new fields (**Cloud SOAR URL API URL**, **Access ID** , **Access Key**) to the configuration
+ October 29, 2024 (v1.6)
	+ Updated **List Incident Entities V2** action in the output field.
+ April 26, 2025 (v1.7)
	+ Enhanced **Microsoft Sentinel Incidents Daemon** Added support to seamlessly fetch subsequent paginated data.

### Deprecation notices
* NA