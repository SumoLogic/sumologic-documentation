---
slug: /manage/security/audit-indexes
title: Audit Indexes
description: Learn how to use audit indexes to query for events in Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Audit indexes provide event logs on account activities, allowing you to monitor and audit changes. Query the indexes to find a wide variety of information on your account activity.

You can also view data from audit indexes in dashboards when you install these apps:
* [**Sumo Logic Audit App**](/docs/integrations/sumo-apps/audit/). Displays data from the [Audit Index](/docs/manage/security/audit-indexes/audit-index).
* [**Enterprise Audit Apps**](/docs/integrations/sumo-apps/enterprise-audit/). Display data from the [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index).
* [**Sumo Logic Infrequent Data Tier App**](/docs/integrations/sumo-apps/infrequent-data-tier) and [**Sumo Logic Enterprise Search Audit App**](/docs/integrations/sumo-apps/enterprise-search-audit/). Display data from the [Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index).
* [**Sumo Logic Flex App**](/docs/integrations/sumo-apps/flex). Display data from the [Search Audit Index](/docs/manage/security/audit-indexes/search-audit-index).

:::note
Availability of the indexes differs according to your account type. You can enable access to audit indexes in the **Policies** tab. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. 
:::

:::tip
You can use the [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index/) to query your data usage.
:::

## Guide Contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/security/audit-indexes/audit-index"><img src={useBaseUrl('img/icons/security/security.png')} alt="Shield icon" width="40"/><h4>Audit Index</h4></a>
  <p>Collect event logs in plain text on account activities, such as account management, user activity, scheduled searches, and alerting.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/security/audit-indexes/search-audit-index"><img src={useBaseUrl('img/icons/security/security.png')} alt="Shield icon" width="40"/><h4>Search Audit Index</h4></a>
  <p>Collect event logs on search activities in your account.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/security/audit-indexes/audit-event-index"><img src={useBaseUrl('img/icons/security/security.png')} alt="Shield icon" width="40"/><h4>Audit Event Index</h4></a>
  <p>Collect event logs in JSON format on account activities for a wide range of actions.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/security/audit-indexes/system-event-index"><img src={useBaseUrl('img/icons/security/security.png')} alt="Shield icon" width="40"/><h4>System Event Index</h4></a>
  <p>Collect event logs in JSON format on system activities.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/security/audit-indexes/documentation-audit-log-definitions"><img src={useBaseUrl('img/icons/security/security.png')} alt="Shield icon" width="40"/><h4>Documentation for Audit Log Definitions</h4></a>
  <p>See Audit Event Log Definitions documentation for audited events.</p>
  </div>
</div>
</div>
