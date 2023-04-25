---
title: April 21, 2023 - Application Update
keywords:
  - cloud siem
  - entity timeline
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Automation Service

Sumo Logic is excited to announce a new feature that integrates functionality previously available only in our Cloud SOAR solution directly into Cloud SIEM Enterprise (CSE). This new feature, the Automation Service, allows you to define and automate smart actions, including enrichments and notifications, enabling your security analysts to address potential security threats faster and more accurately. 

You can interact with the service through **automations**, which execute playbooks. **Playbooks** are composed of one or more actions with a workflow that can include parallel actions and logic steps. **Actions** are defined as part of **integrations**. 

The Automation Service includes over 350 integrations out of the box, each including several predefined actions:

<img src={useBaseUrl('img/release-notes/cse/automation-service-integrations.png')} alt="Automation Service Integrations"/>

Many playbooks are also included, providing instant value with practically no effort - simply connect the integration to the appropriate endpoint and enable the corresponding automation in CSE. Playbooks can be automatically triggered when Insights are created or closed, or triggered manually.

<img src={useBaseUrl('img/release-notes/cse/automation-service-playbook1.png')} alt="Automation Service Playbook Example"/>

You can also customize these objects or create entirely new ones. While the out of the box actions primarily execute directly from the Sumo Logic cloud, custom actions run through a proxy called a **Bridge** which runs on a system managed by you. 

Automations (and other objects) are accessible through the **Configuration** menu, under **Integrations**:

<img src={useBaseUrl('img/release-notes/cse/automation-service-menu.png')} alt="Automation Service Menu"/>

Automation results are accessible from Insight and Entity detail pages.

**The Insight Enrichment Server and the Actions functionality in CSE, which is replaced by the Automation Service, will be deprecated on November 30, 2023.** Until then, they will continue to be fully supported and operational. To aid in migration, all current Enrichment Server examples and Actions have equivalent actions and playbooks in the Automation Service. In addition, through the Bridge, customers can execute any existing Powershell script currently connected to the Insight Enrichment Server. 

:::note
The Automation Service currently has **Limited Availability**. This means that it is fully functional and supported in production environments, but not automatically deployed to every customer. If you would like it deployed to your environment, please contact Sumo Logic and we will enable it for you.
:::

There is much more information about the Automation Service and how to use it in the [online documentation](/docs/cse/automation-service/).

### Threat Indicators

The way enrichments are displayed in CSE is also being enhanced to provide important information to security analysts when they need it, without having to look it up.

First, the Enrichment tabs have been reorganized by Entity (instead of by Enrichment) and additional filter controls have been added:

<img src={useBaseUrl('img/cse/enrichments.png')} alt="Enrichments Tab"/>

In addition, Entity enrichments will now persist outside of Insights. So, for example, if an Entity is enriched as part of an Insight, those enrichment details will be visible from that Entity’s details page.

This persistence can be controlled by setting an expiration date as part of the enrichment. In addition, URLs can be attached to enrichments (so that users can click on the link to see more detailed information about the enrichment by, for example, going to the VirusTotal web page for that indicator). 

Finally, enrichments can now set reputation indicators. These indicators will be visible anywhere in the UI that the Entity is displayed. Where there is sufficient room, a color-coded text label will be displayed (as in the example above); in other situations, an icon will be displayed instead.

The reputation is not set automatically; the enrichment must pass a reputation to CSE. More information about this, and the other new features, is available in [online documentation](/docs/cse/integrations/enrichments-and-indicators/#).

### Minor Changes and Enhancements

* [Updated] The Entity Relationship Graph view on Insights has exited open Beta and is now fully supported.
* [New] When using custom columns with Match Lists, CIDR block matches are now supported with IP address-related fields.
* [New] When referring to Match Lists, specific columns can now be specified in rule conditions for all Match List types. (Previously this functionality was only available for Threat Intelligence lists.)
