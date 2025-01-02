---
title: Elastic Security
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/elastic-security.png')} alt="elastic-security" width="100"/>

***Version: 1.3  
Updated: Mar 4, 2024***

Elastic Security equips analysts to prevent, detect, and respond to threats. The free and open solution delivers SIEM, endpoint security, threat hunting, cloud monitoring, and more.

## Actions

* **Create Rule** (*Containment*) - Creates a new detection rule.
* **Update Rule** (*Containment*) - Updates an existing detection rule.
* **Delete Rule** (*Containment*) - Deletes a single rule.
* **Get Rule** *(Enrichment)* - Retrieves info about a single rule.
* **List Rules** *(Enrichment)* - Retrieves a paginated subset of detection rules.
* **Create Exception Container** (*Containment*) - Creates an exception container.
* **Delete Exception Container** (*Containment*) - Deletes an exception container.
* **Update Exception Container** (*Containment*) - Updates an exception container.
* **Get Exception Container** *(Enrichment)* - Retrieves info about an exception container.
* **List Exception Containers** *(Enrichment)* - Retrieves a paginated subset of exception containers.
* **Create Exception Item** (*Containment*) - Creates an exception item and associates it with the specified exception container.
* **Delete Exception Item** (*Containment*) - Deletes an exception item.
* **List Exception Items** *(Enrichment)* - Retrieves a paginated subset of exception items in the specified container.
* **Create List Container** (*Containment*) - Creates a list container.
* **Delete List Container** (*Containment*) - Deletes a list container.
* **Update List Container** (*Containment*) - Updates an existing list container.
* **Get List Container** *(Enrichment)* - Retrieves a list container.
* **List List Containers** *(Enrichment)* - Retrieves a paginated subset of list containers.
* **Create List Item** (*Containment*) - Creates a list item and associates it with the specified list container.
* **Delete List Item** (*Containment*) - Deletes list item.
* **List List Items** *(Enrichment)* - Retrieves a paginated subset of list items in the specified container.
* **Fetch Items Elastic Security** *(Daemon)* - Daemon to pull Elastic Security Items.
* **Fetch Detections Elastic Security** *(Daemon)* - Daemon to pull Elastic Security Detections.
* **Get Signals Alerts Detections Elastic Security** *(Daemon)* - Daemon to pull Signal Alerts.

## Change Log

* April 9, 2021 - First upload
* August 5, 2021 - New action updated
* September 24, 2021 - New action updated
* January 21, 2022 - New action updated
* July 13, 2023 (v1.2)
    + Updated the integration with Environmental Variables
    + Changed fields visibility
    + Updated Daemon compatibility (Fetch Items Elastic Security)
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
