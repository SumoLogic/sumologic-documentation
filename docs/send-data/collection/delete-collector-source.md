---
id: delete-collector-or-source
title: Delete a Collector or Source
sidebar_label: Delete a Collector or Source
description: You can delete a Collector or Source from Sumo Logic.
---

Deleting a Collector deregisters it with Sumo. This cannot be undone. Installed Collectors shutdown when receiving a 401 response that its credentials are no longer accepted. The Collector and its Sources are removed from the **Collection** page. Data already collected is not affected and is still searchable.

You can recreate Collectors and Sources with the same names so searches include data from the new and deleted Collectors. Be sure to adjust your Sources so they do not reingest data that was already collected by the deleted Collector.

To delete a Collector or Source from the web application:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Find the Collector or Source you want to remove, and click **Delete**.
1. Click **OK** to confirm.
