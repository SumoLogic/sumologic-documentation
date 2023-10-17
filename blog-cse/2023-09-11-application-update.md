---
title: September 11, 2023 - Application Update
keywords:
  - cloud siem
  - automation service
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Automation Service

Sumo Logic is excited to announce that the Automation Service for Cloud SIEM is now generally available for all Cloud SIEM customers. The Automation Service uses Cloud SOAR capabilities -- without needing Cloud SOAR itself -- to allow you to define and automate smart actions, including enrichments and notifications. These actions can be automatically triggered when certain events occur in Cloud SIEM, helping you to quickly investigate, understand, and react to potential security threats.

You can interact with the service through *automations*, which execute *playbooks*. Playbooks are composed of one or more *actions* with a workflow that could include parallel actions and logic steps. Actions are defined as part of *integrations* with specific internal and external applications. Sumo Logic provides hundreds of integrations, actions, and playbooks out of the box that you can use and customize. You can also create your own.

<img src={useBaseUrl('img/release-notes/cse/automation-service.png')} alt="Automation Service"/>

Automations are accessible through the **Configuration** menu, under **Integrations**. Automation results are accessible from Insight and Entity detail pages.

The Automation Service does not include the full capabilities of Cloud SOAR. For example, the Automation Service only supports enrichment, nofification, and custom action types, and Automation Service playbooks can only be triggered from Cloud SIEM. There is also a limit to the number of actions you can run per hour. However, if you do have Cloud SOAR, then once you have upgraded to the Fall 2023 release of Cloud SOAR (currently in Beta), Cloud SIEM will use it to run automations instead of the Automation Service, giving Cloud SIEM access to the full capabilities of Cloud SOAR. 

Over time, the legacy Insight Actions and Cloud SIEM Enrichment Service features will be deprecated in favor of this new service. (The new service includes integrations and actions corresponding to the legacy Insight Actions and can run existing Enrichment Service PowerShell scripts. The online documentation has [more information about migrating](/docs/cse/automation-service/automation-service-automations/#replace-legacy-actions-and-enrichments).) Note that the Automation Service is not yet available in the FedRAMP environment. 

There is much more information about the Automation Service and how to use it in the [online documentation](/docs/cse/automation-service/).

### Minor Changes and Enhancements

* [New] Tag schemas and context actions can now be managed via API (`/tag-schemas` and `/context-actions`). See the API documentation for details.
* [Updated] Threat indicator icons will now appear where appropriate in the Active Entities panel on the HUD.

### Bug Fixes

* Some records were not being auto-enriched with Network Block data.
* Some internal IP addresses were being marked as external.
* The HUD was not updating Insight status counts in a timely fashion.
* Window size was not saving correctly when defining a new Outlier rule.
