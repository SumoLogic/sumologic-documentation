---
id: use-receipt-time
---

# Use Receipt Time

To search data based on the order that Collectors received the messages
use** Receipt Time**. This option has the search reference the
[metadata](../Search-Basics/Built-in-Metadata.md "Search Metadata")
field `_receiptTime` instead of `_messageTime`, giving you the ability
to view the difference in the parsed
[timestamp](../../../03Send-Data/Sources/04Reference-Information-for-Sources/Timestamps,-Time-Zones,-Time-Ranges,-and-Date-Formats.md "Timestamps, Time Zones, Time Ranges, and Date Formats")
(`_messageTime`) and receipt time (`_receiptTime`) to pinpoint Sources
that may be parsing the message's timestamps incorrectly.

### Run a search by Receipt Time

To run a search by Receipt Time:

1.  Enter your query in the search text box.
2.  Choose the Time Range for the query.
3.  Click the gear icon to open the **Search Config** menu and
    toggle **Use Receipt Time** on.  
    ![receipt time option August
    2021.png](../../static/img/Get-Started-with-Search/How-to-Build-a-Search/Use-Receipt-Time/receipt%20time%20option%20August%202021.png)  
     
4.  Review the search results for wide discrepancies between message
    timestamp and receipt time to pinpoint Sources with incorrect
    timestamps:  
    ![receipt time results in messages
    tab.png](../../static/img/Get-Started-with-Search/How-to-Build-a-Search/Use-Receipt-Time/receipt%20time%20results%20in%20messages%20tab.png)

### Resolving timestamp/receipt time issues

If you notice an issue between timestamps and receipt time values, you
can double-check the Source’s settings. You can manually specify the
parsing format for the Source, and test the format to make sure it’s
valid. See [troubleshooting large message time and receipt time
discrepancies](../../../03Send-Data/Collector-FAQs/Troubleshooting-time-discrepancies.md "Troubleshooting large message time and receipt time discrepancies").

Alternately, if you’re noticing that timestamps are not parsing
properly, check the timestamp conventions of your logs. Learn more
in [Timestamps, Time Zones, Time Ranges, and Date
Formats](../../../03Send-Data/Sources/04Reference-Information-for-Sources/Timestamps,-Time-Zones,-Time-Ranges,-and-Date-Formats.md "Timestamps, Time Zones, Time Ranges, and Date Formats").

 
