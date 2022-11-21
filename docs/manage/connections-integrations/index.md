---
slug: /manage/connections-integrations
title: Connections and Integrations
description: Learn how to set up connections to send alerts to other tools.

---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/integration.png')} alt="icon" width="75"/>

On the **Manage Data \> Monitoring \> Connections** page, you can configure:

* [Webhook Connections](/docs/manage/connections-integrations/webhook-connections)
* [ServiceNow Connections](/docs/manage/connections-integrations/servicenow)

You can also:

* **Search Connections** to search. 
* **Edit** Connections. 
* **Delete** Connections. 
* View the **Details** of Connections. 

To be able to create a connection, the Manage Connection [role capability](../users-roles/roles/role-capabilities.md) must be set. Contact your administrator for assistance.

Sumo Logic also provides integrations for:

* [Heroku Add-on](heroku.md)
* [JFrog Artifactory](jfrog-artifactory.md)

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
