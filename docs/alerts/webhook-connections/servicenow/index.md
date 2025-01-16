---
slug: /alerts/webhook-connections/servicenow
title: ServiceNow
description: With the ServiceNow integration, search results from Sumo Logic can be uploaded to your organization's ServiceNow account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Your org can use collected data to investigate issues across your deployment and then upload it to ServiceNow through the use of scheduled searches. After saving a search, results are available in ServiceNow. Additionally, you can launch ad hoc ServiceNow investigations using search results in Sumo Logic.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access ServiceNow connections, in the main Sumo Logic menu select **Manage Data > Monitoring > Connections**. 

<br/>[**New UI**](/docs/get-started/sumo-logic-ui). To access ServiceNow connections, in the top menu select **Configuration**, and then under **Monitoring** select **Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. 

From here, you can search, edit, delete, and view of the details of [ServiceNow connections](/docs/alerts/webhook-connections/servicenow/).

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/alerts/webhook-connections/servicenow/set-up-security-incident-webhook')}><img src={useBaseUrl('img/icons/security/security-capabilities.png')} alt="icon" width="40"/><h4>Set Up Security Incident Webhooks</h4></a>
  <p>Learn how to set up a ServiceNow Security Incident Webhook connection and create scheduled searches.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/alerts/webhook-connections/servicenow/launch-investigations')}><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Launch ServiceNow Investigations</h4></a>
  <p>Learn how to launch ad hoc investigations directly from search results in Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/alerts/webhook-connections/servicenow/set-up-searches')}><img src={useBaseUrl('img/icons/operations/automated-detection.png')} alt="icon" width="40"/><h4>Set Up ServiceNow Searches</h4></a>
  <p>Learn how to set up scheduled searches for ServiceNow integration.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/alerts/webhook-connections/servicenow/set-up-connections')}><img src={useBaseUrl('img/icons/operations/microservices.png')} alt="icon" width="40"/><h4>Set Up ServiceNow Connections</h4></a>
  <p>Learn how to set up connections for ServiceNow integration.</p>
  </div>
</div>
</div>

:::tip
* To import and maintain real-time information about AWS and VMware virtual machine assets into the ServiceNow CMDB, see the [Service Graph Installation and Configuration Guide](https://store.servicenow.com/appStoreAttachments.do?sys_id=d06467ab1bdab4d051a62132604bcb5e)
* For the Sumo Logic Cloud SIEM integration with the ServiceNow Security Incident Response (SIR) module, see [Security Incident Response (SIR) Integration](../../../cse/integrations/security-incident-response-integration.md)
:::
