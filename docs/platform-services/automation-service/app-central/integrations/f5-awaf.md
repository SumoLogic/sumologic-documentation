---
title: F5 AWAF
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/f5-awaf.png)

Version: 1.1  
Updated: Jul 06, 2023

The integration with F5 AWAF allows users to retrieve information about Policies, Rules In Policy, Active Global Rules, Create, Delete and Assign Policy As Global, Add Rule to Policy, Modify Rule Action In Policy and Delete Rule From Policy in F5 Advanced Web Application Firewall.

F5 AWAF protects apps with behavioural analytics, proactive bot defence, and application-layer encryption of sensitive data.

## Actions

* **List Firewall Policies** (*Enrichment*) - List of network firewall polices
* **Get Policy** (*Enrichment*) - Get an individual network firewall policy
* **Active Global Rules** (*Enrichment*) - List of Network Firewall: Active Rules
* **List Policy Rules** (*Enrichment*)- List Rules in policy
* **Create Policy** (*Containment*)- Create firewall policy
* **Delete Policy** (*Containment*) - Delete firewall policy
* **Add Rule To Policy** (*Containment*) - Add rule to existing policy
* **Modify Rule Action In Policy** (*Containment*) - Change rule action in policy
* **Delete Rule From Policy** (*Containment*) - Delete rule from policy
* **Assign Policy As Global** (*Containment*) - Assign policy as global

## F5 AWAF configuration

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-1.png)

To configure F5 AWAF, install the product and use BIG-IP Registration key(s). Might need help from system administrator. Then sign in to BIG-IP with username and password.

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-2.png)

In the main page, click on the section System, License.

In Summary check your Licence and in the tab Module Allocation locate the Advanced Firewall (AFM) and change Provisioning to Nominal. Then click Submit. After submission in Security Tab Network Firewall will appear.

## F5 AWAF in Automation Service and Cloud SOAR

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-3.png)

To configure the Sumo Logic SOAR, login to application, expand the configuration menu in the top right corner by hovering over it and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-4.png)

In the Automation section, in the top left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-5.png)

After the list of the integrations appears search/look for the F5 AWAF integration and click on the row. The integration details will appear. Click on the "+" button to add new Resource.   


 • Host: IP where F5 AWAF is installed   
 • Username and Password

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-6.png)

Then click save. Now you can use the resource.

To make sure the resource is working, hover over the resource and then click edit (pencil icon) on the right of the row.

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-7.png)

Then click test saved settings. You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/f5-awaf/f5-awaf-8.png)

## Change Log

* December 15, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
