---
title: December 6, 2023 - Application Update
keywords:
  - cloud siem
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Automation Service Enhancements

The Automation Service has been updated to include several new enhancements:

* **Containment** action types are now supported. Typically, these actions will perform some sort of response or remediation action, such as resetting a user's password or blocking an domain on your firewall. Many integrations in App Central now include containment actions.
* **User Choice** nodes (and manual steps) are now supported. When executing a playbook if a user choice node is encountered, the execution will pause until a user selects an option. For example, after enrichment, a user could be asked whether to proceed with a containment action or to perform additional enrichment first. When a playbook is paused at a user choice node, the status of that playbook will say `Waiting user interaction`.
* In the initial release of the Automation Service, playbooks would not appear in the `Create New Automation` Cloud SIEM dialog unless they defined as type `CSE`. This restriction has been lifted; all playbooks will now appear in the dropdown.

For full details, see the [Automation Service documentation](/docs/platform-services/automation-service/).

### Minor Changes and Enhancements

* [New] Entity Groups now support second-level unnormalized attributes (`fields.*attribute*.*attribute*`).
* [New] Log Mappings can now be enabled or disabled via API using the `PUT /log-mappings/{*id*}/enabled` endpoint.
* [New] The `Record Count` field on Sumo Logic-provided Chain Rules can now be overridden (like other Rule fields).

### Bug Fixes

* Users were unable to manually change the Criticality assigned to an Entity.
* Users were getting a 500 error when attempting to duplicate a rule.

### Rule Expression Validation

When writing Rules and Rule Tuning Expressions, it's possible to write an expression that is syntatically correct (and passes validation) but that will still fail when executed. There are two specific cases we have identified:
* Using a non-normalized field that does not exist in the log records (schema fields will always exist)
* Introducing a type mismatch (i.e. matching a string to an integer value)

If you test a Rule (from the Rules Details page), an error will be displayed in these cases, but the error is not obvious and not clear, and the normal editor validation does not catch these kinds of errors. 

In addition, while the Cloud SIEM Rules engine does not generate runtime errors in these cases (there just isn't a match), the Log Search engine *does* generate errors and refuses to return any results in these cases.

A few weeks ago, we made a change to Signal and Insight detail pages, where for multi-signal Rules (such as Chain Rules), where we would attach a subset of rules on the details page and the user would have to go to the `Queried Records` tab to view any other potentially related records, we combined those views and began showing both the attached and queried records on the main page. Unfortunately, the way the new design worked, no records were displayed if the queried record log search failed. 

As a result of these issues, we have made two changes:
* On the Rules Details page, if the test (a log search) returns an error, instead of saying "No Records Found," the screen will say, "Check the Rule/Tuning Expressions." 
* On the Signal and Insight Details pages, all attached record(s) will be displayed even if the log search query cannot be completed.

Note that fixing the rule expression(s) will not fix any Signals or Insights that have already been generated; you will have to use the `View in Log Search` feature and manually fix the log search string to see the log records.

Other tips:
* A malformed tuning expression will affect any rule that it is associated with, whether provided by Sumo Logic or custom-written.
* We highly recommend using only schema fields in your rule and tuning expressions.
  * Sumo Logic's parsers and mappers are updated weekly so please contact Support if you need to add a mapping from the raw log format to the normalized schema.
  * Sumo Logic's schema is extensible so please contact Support if there's a field you'd like to add.

