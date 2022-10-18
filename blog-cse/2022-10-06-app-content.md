---
title: October 6, 2022 Application Update
hide_table_of_contents: false
image: /img/sumo-square.png
keywords:
  - sumo logic
  - service release notes
  - cloud siem
  - cse
authors:
  - name: Sumo Logic Docs Team
    url: https://github.com/SumoLogic/sumologic-documentation
---


## Application Update: Minor Changes and Enhancements

* [Updated] Dynamic severity in rules has been enhanced. Users can now specify ranges of values to match to a specific severity. There are now multiple options, and these options can be combined (the first rule that matches is used; if none match then the default is used):
  * **Equal to** Exact string or mathematical match ("Equal to 4" will match "4" and 4.0 but not 4.01)
  * **Greater than** and **Less than** Mathematical only, not inclusive ("Less than 5" will match 4.9 but not 5)
  * **Between** Mathematical only, inclusive ("Between 5 and 10" will match 5 or 7 but not 10.1)
  * **Not in the record** Will match when the _attribute_ is not listed in the record. (if there is no "bro_irc_value" attribute then this rule will match; if "bro_irc_value" exists but is empty/null, this does _not_ match)
* [New] Users can now filter the Signals list based on the type of Rule that generated the Signal (Match, Chain, Aggregation, etc.)
* [New] Users can now perform negative keyword searches ("not:aws" would return all objects that do _not_ include the keyword "aws")
* [New] Entity domain normalization can now be managed via Terraform
* [New] Users can now configure the Email Action to send emails in plain text in addition to the previously supported multipart HTML5/text format
* [New] Changes to the Insight Threshold are now noted in the Audit Log
* [Deleted] As previously announced, the IBM Resilient and Sensor actions have been removed from CSE

### Resolved Issues

* Match list items were not matching properly in some instances, such as after deletion
* Keyword searches did not properly support values (such as hostnames) with embedded dashes
* Changes to prototype state were not visible in the rule history
* In some cases, the system was parsing domain names/TLDs incorrectly

## Content Release

### Log Mappers
* [New] Azure Application Service Console Logs
* [New] Google G Suite Alert Center - Sensitive Admin Action
* [Updated] Azure Event Hub - Windows Defender Logs - DeviceAlertEvents

### Parsers
* [Updated] /Parsers/System/Google/G Suite Alert Center

### Legacy Parsers
* [Updated] CISCO_MERAKI_SECURITY_FILTERING_FILE_SCANNED
* [Updated] CISCO_MERAKI_URLS
* [Updated] Twistlock_Logs
