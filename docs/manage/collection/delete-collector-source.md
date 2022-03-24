---
id: delete-collector-or-source
---

# Delete a Collector or Source

Deleting a Collector deregisters it with Sumo. This cannot be undone.
Installed Collectors shutdown when receiving a 401 response that its
credentials are no longer accepted. The Collector and its Sources are
removed from the **Manage Data** \> **Collection** \> **Collection**
page. Data already collected is not affected and is still searchable.

You can recreate Collectors and Sources with the same names so searches
include data from the new and deleted Collectors. Be sure to adjust your
Sources so they don't reingest data that was already collected by the
deleted Collector.

**To delete a Collector or Source from the web application **

1.  In the Web Application, go to **Manage Data** \> **Collection** \> **Collection**.
2.  Find the Collector or Source you want to remove, and click **Delete**.
3.  Click **OK** to confirm.
