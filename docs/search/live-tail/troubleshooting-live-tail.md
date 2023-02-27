---
id: troubleshooting-live-tail
title: Troubleshooting Live Tail
sidebar_label: Troubleshooting
description: Troubleshooting tips for Sumo Logic Live Tail.
---


:::note
Data ingested from Amazon S3 can't be tailed.
:::

## No messages appear in a Live Tail session

If you start a Live Tail session, and no messages appear in 30 seconds, check to make sure that the specified Source Host, Source Category, Source Name, Source or Collector is currently generating messages.

## Live Tail limitations
* You can tail logs ingested from Sources configured on Installed Collectors and from HTTP and Cloud Syslog Sources on Hosted Collectors.
* A Live Tail session expires after one hour of inactivity to give your system the best performance possible. If your Live Tail session expires, you can restart it at any time.
* If you navigate away from the Live Tail tab, your session will run for five more minutes and then time out.
* There is a message limit of about 1000 messages per second. Keyword filters don't affect the message rate.
* There currently is a limit of 10 concurrent Live Tail sessions per organization.
* There is a limit of four Live Tail sessions per user.
* There is a limit of two Live Tail "pop out" windows per user.
* `_view` and `_index` are not supported in Live Tail queries.
* Wildcards are supported in keywords and at the beginning/end of metadata fields. For example:
    * Allowed: `_sourceCategory=*/apache` or `_sourceCategory=prod/*`
    * Not allowed: `_sourceCategory=prod/*/apache/`
* Search operators are not supported in filters.
* If too much data is coming in, messages may be skipped or not displayed on the screen, or there may be a lag before messages are displayed.
* If the query you are using produces too many log message results, we may end the session, and present an error that prompts you to make your query more specific. This is to provide the best performance possible. If a Live Tail session has ended, you can restart it at any time.
* Metadata [fields](/docs/manage/fields.md) are not available in Live Tail.
* Windows Event Source logs and Windows Performance Source logs may not handle filters properly. Applying a filter may cause no data to appear in a Live Tail.
* If `_sourceCategory`, `_sourceHost`, or any of the built-in meta fields are changed in an FER, Live Tail will not support those changes. For example, if `_sourceCategory` is *ABC* in the raw data but is renamed to *XYZ* in an FER, Live Tail will not see it as *XYZ*. It will only see the data as its raw form, *ABC*.

## Error: "Your query is producing too many results."

If you see the error, **"Your query is producing too many results. Please add additional metadata fields to your query to make it more specific"**, that means that the metadata field you are searching on (`_sourceCategory`, `_sourceHost`, etc.) is too big for Live Tail to handle while providing good performance.

Modify your query to add additional metadata fields, in order to focus your search into a smaller area, and produce fewer log messages. If not, your session may be ended.

If you do make your filter more specific, and you still don't see many messages, this may be caused by the underlying metadata fields being too big.

For more information, see [Filter LiveTail](filter-live-tail.md).
