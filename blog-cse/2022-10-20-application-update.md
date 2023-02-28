---
title: October 20, 2022 Application Update
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

### Support for Custom Inventory Sources

Cloud SIEM Enterprise now supports custom sources of inventory data. Now, if you want to ingest inventory data from a source that Sumo Logic does not provide a pre-built connnector for, you can use this new feature. See the new document [Configure a Custom Inventory Source](/docs/cse/administration/custom-inventory-sources/) for details.

### Standard Match Lists

As a reminder, the migration for our out-of-the-box rules content from standard match lists to tags for Entities has begun. The system is now automatically setting the appropriate tags for any Entities appearing in any of the standard match lists called out in the [previous announcement](https://help.sumologic.com/release-notes-cse/2022/10/13/application-update/). This will continue until January 20, 2023, when the migration will be complete.

### Minor Changes and Enhancements

* [New] API endpoints have been creeated enabling users to upload attribute changes (such as tags or criticality) for multiple Entities in a single call, rather than having to do so one at a time. The new endpoints are `/entities/bulk-add-tags`, `/entities/bulk-update-tags`, `/entities/bulk-remove-tags`, `/entities/bulk-update-suppressed`, and `/entities/bulk-update-criticality`. Note that these API endpoints have a limit of 1000 entries per call. More details are available via the **API Documentation** link in Cloud SIEM Enterprise.
* [Updated] Previously, a new feature was added to the Enrichments tab that enabled you to hide any attribute-value pair with an "empty" value for clarity. This included values like "0" or "N/A". However, some of those values are often useful to the analyst (for example, `number_of_threat_reports="0"`). Starting with this release, this feature will only hide attributes with truly empty values (i.e., `attribute=""`).

### Resolved Issues

* The CSV file upload method for updating Entity attributes did not support sensor zones or normalized entity names properly.
* CSE has switched providers of lists of public dynamic DNS domains, which has resolved an issue with rules utilizing these lists.
