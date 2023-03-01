---
title: December 13, 2022 Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - service release notes
  - cloud siem
  - cse
tags: [cloud siem release notes, application update]
authors:
  - name: Peter Kazmir
    title: Principal Product Manager, Security Applications
    url: https://github.com/pkazmir-sumo
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### New Entity Types

Eight new predefined Entity types have been added to CSE. This will enable customers to more accurately associate Signals and Insights with security threats. They are listed below long with the related normalized record schema attributes (which can be specified in Rule definitions):

| Entity Type | Schema Attributes |
|:----- |:----- |
| Command | `commandLine` |
| Domain | `http_referer_fqdn`, `http_url_fqdn` |
| Email | `targetUser_email`, `user_email` |
| File | `file_path`, `file_basename` |
| Hash | `file_hash_imphash`, `file_hash_md5`, `file_hash_pehash`, `file_hash_sha1`, `file_hash_sha256`, `file_hash_ssdeep` |
| Process | `baseImage`, `parentBaseImage` |
| URL | `http_url` |
| User Agent | `http_userAgent` |

If you already had a custom Entity type with the same or similar name, it will not be affected and will not be automatically migrated to the corresponding standard Entity type.

### Entity Notes

Similar to the functionality on Insights, users can now attach notes to Entities:

<img src={useBaseUrl('img/release-notes/cse/Entity-Notes.png')} alt="Screenshot of Entity Notes user interface"/>

These notes are retained permanently on the associated Entity and are visible to all users who can view the Entity.

### Custom Time Windows for Rules

Threshold, Aggregation and Chain Rules now support custom time windows. Previously, when writing a Rule, a time window had to be chosen from a list of predefined options. With this new enhancement, users can define any time window defined in minutes, hours, or days, with a minimum of 1 minute and a maximum of 5 days (120 hours):

<img src={useBaseUrl('img/release-notes/cse/Custom-Window-Size-For-Rules.png')} alt="Screenshot of Custom Time Window for Rules user interface"/>

### Inventory Favorite Fields

Where inventory data is shown for an Entity, such as the Entity details page or the Insight details page, users can now “favorite” the inventory fields that should be shown in the summary list.

To do this, simply expand the **Full Details** view, hover to the left of the field, and click the star icon that appears. To remove the favorite selection, simply unclick the star icon. The field selections are applied across all users and retained across sessions. (This behavior is the same as for favorite fields on Records.)

<img src={useBaseUrl('img/release-notes/cse/Inventory-Favorite-Fields.png')} alt="Screenshot of Inventory Favorite Fields user interface"/>

### Minor Changes and Enhancements

* [Updated] The previously announced migration of our out-of-the-box rules from standard match lists to Entity tags has been postponed. New dates for this migration will be announced in the near future.
* [New] Service providers using the Consolidated Insight List can now see Insights from client organizations across deployments.
* [Updated] The usability of filters for list views when searching for an object that includes a specific tag schema has been enhanced.
* [Removed] The link to download the Insight Enrichment Service has been removed from the **Enrichment** page. The link is specified in the [installation instructions](/docs/cse/integrations/insight-enrichment-server/) online.
* [New] Users can now filter Records by Sensor Zone.

### Resolved Issues

* Importing data from CSV files via the UI was not working properly.
* The `http_url` field was not being concatenated properly in some mapper scenarios.
* Entity domain normalization was not working properly.
* The **Copy Expression** feature in the UI did not copy Boolean values to the clipboard properly.
* The Rule Tuning Expression list page was not auto-refreshing correctly.
* Users were unable to filter the Signals list based on severity.
* IP addresses in the 198.18.0.0/15 and 169.254.0.0/15 ranges were not being marked as private subnets per RFC1918.
* Users without the proper permissions were able to add comments and Signals to Insights.
* Regular expressions ending with an asterisk `*` were not working properly in search/list filters.
