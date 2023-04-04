---
id: use-receipt-time
title: Use Receipt Time
description: You can display search results in the order that the Collector received the messages in milliseconds.
---


To search data based on the order that Collectors received the messages use **Receipt Time**. This option has the search reference the [metadata](../search-basics/built-in-metadata.md "Search Metadata") field `_receiptTime` instead of `_messageTime`, giving you the ability to view the difference in the parsed [timestamp](/docs/send-data/reference-information/time-reference.md) (`_messageTime`) and receipt time (`_receiptTime`) to pinpoint Sources that may be parsing the message's timestamps incorrectly.

## Run a search by Receipt Time

To run a search by Receipt Time:

1. Enter your query in the search text box.
1. Choose the Time Range for the query.
1. Click the gear icon to open the **Search Config** menu and toggle **Use Receipt Time** on.

    ![receipt time option.png](/img/search/get-started-search/build-search/receipt-time-option.png)  
     
1. Review the search results for wide discrepancies between message timestamp and receipt time to pinpoint Sources with incorrect timestamps:  

    ![receipt time results in messages tab.png](/img/search/get-started-search/build-search/receipt-time-results-messages-tab.png)

## Resolving timestamp/receipt time issues

If you notice an issue between timestamps and receipt time values, you can double-check the Source’s settings. You can manually specify the
parsing format for the Source, and test the format to make sure it is valid. See [troubleshooting large message time and receipt time discrepancies](/docs/send-data/collector-faq/#troubleshooting-time-discrepancies).

Alternately, if you’re noticing that timestamps are not parsing properly, check the timestamp conventions of your logs. Learn more in [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference.md).

 
