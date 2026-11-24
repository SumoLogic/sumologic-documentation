---
title: Inbound Integrations
sidebar_label: Inbound Integrations
description: Learn how inbound integrations let a third-party system, such as Slack, send requests to Sumo Logic and Dojo AI agents, for example to ask Mobot a question.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Inbound integrations let a third-party system send requests to Sumo Logic and Dojo AI agents to use its capabilities. For example, the [Sumo Logic Slack Extension](/docs/integrations/inbound/sumo-logic-slack-extension/) enables you to talk to Mobot in Slack.

To see inbound integrations, open the **Integrations** tab in App Catalog and select **Inbound Integrations**. To learn how to open the tab, see [Integrations](/docs/integrations/integrations-overview/).

## Anatomy of an inbound integration card

Each card shows one integration. Select a card to open the integration. From there you can connect it, view its actions or tools, and manage its connections.

<img src={useBaseUrl('img/integrations/inbound-integrations-card-anatomy.png')} alt="integrations-tab" width="500" />

| Element | Meaning |
|:--|:--|
| Logo and name | The vendor and name. |
| Description | A summary of what the integration does. |
| Integration type | The **Extension** label on the integration card indicates that the integration extends Sumo Logic capabilities within a third-party tool, such as Mobot. |
| Status | - **Connected**. A connection is configured.<br/>- **Not connected**. Integrations in the catalog that you have not yet connected. |

Select an extension card to open its details page.

<DocCardList items={useCurrentSidebarCategory().items} />
