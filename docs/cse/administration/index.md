---
slug: /cse/administration
title: CSE Administration
sidebar_label: CSE Administration
description: Learn how to set up users accounts and roles, create CSE Actions, configure Network Blocks, manage custom Insight status and sub-resolutions, and more.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Learn about onboarding tasks and best practices for Cloud SIEM Enterprise administrators. In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/cse/administration/filter-search"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="40"/><h4>Filter and Search</h4></a>
  <p>Learn how to filter and search CSE list pages.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/cse/administration/create-use-network-blocks"><img src={useBaseUrl('img/icons/operations/microservices.png')} alt="icon" width="40"/><h4>Network Blocks</h4></a>
  <p>Learn about Network Blocks, their purpose, and instructions for setting them up and using them.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/cse/administration/create-a-custom-tag-schema"><img src={useBaseUrl('img/icons/operations/schema.png')} alt="icon" width="40"/><h4>Create a Custom Tag Schema</h4></a>
  <p>Learn how to create a custom tag schema in CSE. </p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/cse/administration/create-custom-threat-intel-source"><img src={useBaseUrl('img/icons/security/world-class-security.png')} alt="icon" width="40"/><h4>Create a Custom Threat Intelligence Source</h4></a>
  <p>Learn how to create and manage Custom Threat Sources.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/cse/administration/create-cse-actions"><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="icon" width="40"/><h4>Create CSE Actions</h4></a>
  <p>Learn how to issue a notification to another service when certain events occur in CSE.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/cse/administration/create-cse-context-actions"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>Create CSE Context Actions</h4></a>
  <p>Learn to query an external system for details about an Entity, IOC, or data encountered in a Record.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/cse/administration/cse-apis"><img src={useBaseUrl('img/icons/cloud/api2.png')} alt="icon" width="40"/><h4>CSE APIs</h4></a>
  <p>Learn how to access CSE APIs and API documentation.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/cse/administration/cse-data-retention"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Data Retention</h4></a>
  <p>Learn about retention periods for different types of CSE data.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/cse/administration/cse-audit-logging"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Audit Logging</h4></a>
  <p>Learn how to search the Audit Event Index for CSE log events.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/cse/administration/cse-user-accounts-and-roles"><img src={useBaseUrl('img/icons/business/regional-partner-sales.png')} alt="icon" width="40"/><h4>CSE User Accounts and Roles</h4></a>
  <p>Learn how to create and manage user accounts and roles for CSE.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/cse/administration/custom-inventory-sources"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Custom Inventory Source</h4></a>
  <p>Learn how to extract Inventory Data from logs in Sumo Logic and send it to CSE.</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/cse/administration/save-inventory-data-lookup-table"><img src={useBaseUrl('img/icons/operations/frequent-search.png')} alt="icon" width="40"/><h4>Save Inventory Data to a Lookup Table</h4></a>
  <p>Learn how to use a saved Sumo Logic search to populate a Lookup Table with CSE inventory data.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/cse/administration/manage-custom-insight-resolutions"><img src={useBaseUrl('img/icons/operations/correlation-engine.png')} alt="icon" width="40"/><h4>Manage Custom Insight Resolutions</h4></a>
  <p>Learn how to create and manage Custom Insight Resolutions.</p>
  </div>
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/cse/administration/manage-custom-insight-statuses"><img src={useBaseUrl('img/icons/operations/retain-and-visualize-logs.png')} alt="icon" width="40"/><h4>Managing Custom Insight Statuses</h4></a>
  <p>Learn how to create and manage Custom Insight Statuses.</p>
  </div>
</div>
<div className="box smallbox15 card">
  <div className="container">
  <a href="/docs/cse/administration/using-sensor-zones"><img src={useBaseUrl('img/icons/cloud/events.png')} alt="icon" width="40"/><h4>Sensor Zones</h4></a>
  <p>Learn how to use Sensor Zones to distinguish between CSE Entities that have the same IP address.</p>
  </div>
</div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/cse/administration/inventory-sources-and-data"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>Inventory Sources and Data</h4></a>
  <p>Learn about Inventory Sources and the Inventory Data they collect.</p>
  </div>
</div>
<div className="box smallbox17 card">
  <div className="container">
  <a href="/docs/cse/administration/mitre-coverage"><img src={useBaseUrl('img/icons/operations/manage.png')} alt="icon" width="40"/><h4>MITRE Coverage</h4></a>
  <p>Learn how well you are prepared to detect adversary attacks based on the tactics and techniques in the MITRE ATT&CK Enterprise Matrix.</p>
  </div>
</div>
</div>
