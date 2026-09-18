---
id: search-surrounding-messages
title: Search Surrounding Messages
description: Surrounding messages allow you to investigate events surrounding a message.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Surrounding messages allow you to investigate events surrounding a message from the context of the Host, file name, or category identified enabling you to view the activity for the defined time period. 

As you browse results in the **Messages** list, you might come across a message where you'd like to see more context. What other events occurred just before and after this event? What else was happening on this host at the same time? When you search surrounding messages, you capture the context of the current message to gain insight into surrounding activity.

After you launch a search on surrounding messages, the target message (the message from where you originated the search on surrounding messages) is highlighted in blue to help you keep your place.

To search surrounding messages:

1. For any message in the **Messages** tab, select the down-arrow next to one of the following:

    * `_sourceHost`. Matches messages based on the same system host.
    * `_sourceName`. Matches messages from the same file path AND the
        same host.
    * `_sourceCategory`. Matches messages based on the same user-created metadata.  

    <img src={useBaseUrl('img/search/get-started-search/search-basics/search-surrounding-messages/message.png')} alt="Messages tab" style={{border: '1px solid gray'}} width="800" />
     

1. Select the time range to search before and after the selected message. Choose one minute, five minutes, or ten minutes. In this     example, search will return messages for a ten minute time range (five minutes before, and five minutes after) from the same host and    file path as the selected message.<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/search-surrounding-messages/time-range.png')} alt="Time range" style={{border: '1px solid gray'}} width="300" />

A new search tab opens displaying the surrounding messages. Your position in the log file is highlighted:<br/><img src={useBaseUrl('img/search/get-started-search/search-basics/search-surrounding-messages/show-original.png')} alt="Show Original Message" style={{border: '1px solid gray'}} width="800" />

If you lose your place, you can click **Show Original Message** to return to the highlighted message.

When the new query is created to search surrounding messages only the selected metadata is searched. None of the original query is added to the search. For example, take the following query:  

     `_view=audit HTTP Error`

If you select to view the surrounding minute from the context of the Host, the created query would be:  

     `_sourceHost=52.5.127.200`

Where only the selected metadata is searched.


## Limitations

* Surrounding messages are limited to the first 100,000. If your time range includes more than 100,000 messages, your source message may not be included in your returned results.
* When a new query is created to search surrounding messages only the selected metadata is searched. None of the original query is added to the search. An example is provided in the section below.
