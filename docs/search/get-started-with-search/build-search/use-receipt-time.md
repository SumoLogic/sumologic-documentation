---
id: use-receipt-time
title: Use Receipt Time
description: Enable the Use Receipt Time feature to display search results in the order that the Collector received the messages in milliseconds.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- When Intelliparse goes GA, update this doc to reflect new Search Config...

Parsing
* Intelliparse
* Auto Parse
* Manual

Timestamp
* Message Time
* Receipt Time
-->

By default, log searches run by Message time. Enable the **Use Receipt Time** setting to run the search by Receipt time, which is the timestamp when a log message hits the Sumo Logic receivers.

To search data based on the order that Collectors received the messages use **Receipt Time**. This option has the search reference the [metadata](../search-basics/built-in-metadata.md) field `_receiptTime` instead of `_messageTime`, giving you the ability to view the difference in the parsed [timestamp](/docs/send-data/reference-information/time-reference) (`_messageTime`) and receipt time (`_receiptTime`) to pinpoint Sources that may be parsing the message's timestamps incorrectly.

## Run a search by Receipt Time

To run a log search by Receipt Time:

1. Enter your query in the search text box.
1. Choose the Time Range for the query.
1. Click the gear icon to open the **Search Config** menu and toggle on **Use Receipt Time**.<br/><img src={useBaseUrl('img/search/get-started-search/build-search/receipt-time-option.png')} alt="receipt time option.png" style={{border: '1px solid gray'}} width="450"/>
1. Review the search results for wide discrepancies between message timestamp and receipt time to pinpoint Sources with incorrect timestamps:<br/><img src={useBaseUrl('img/search/get-started-search/build-search/receipt-time-results-messages-tab.png')} alt="receipt time results in messages tab.png" width="700"/>

## Resolving timestamp/receipt time issues

If you notice an issue between timestamps and receipt time values, you can double-check the Source’s settings. You can manually specify the parsing format for the Source, and test the format to make sure it is valid. See [Troubleshooting large message time and receipt time discrepancies](/docs/send-data/collector-faq/#troubleshooting-time-discrepancies).

Alternately, if you’re noticing that timestamps are not parsing properly, check the timestamp conventions of your logs. Learn more in [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference).
