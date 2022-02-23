---
id: troubleshooting-live-tail
---

# Troubleshooting Live Tail

Data ingested from Amazon S3 cannot be tailed.

## No messages appear in a Live Tail session

If you start a Live Tail session, and no messages appear in 30 seconds,
check to make sure that the specified Source Host, Source Category,
Source Name, Source or Collector is currently generating messages.

## Live Tail limitations
\<div class="mt-contentreuse-widget"
page="05Search/Live-Tail/About-Live-Tail" section="Limitations"
show="false\>
\</di\>

## Error: "Your query is producing too many results."

If you see the error, **"Your query is producing too many results.
Please add additional metadata fields to your query to make it more
specific"**, that means that the metadata field you are searching on
(\_sourceCategory, \_sourceHost, etc.) is too big for Live Tail to
handle while providing good performance.

Modify your query to add additional metadata fields, in order to focus
your search into a smaller area, and produce fewer log messages. If not,
your session may be ended.

If you do make your filter more specific, and you still do not see many
messages, this may be caused by the underlying metadata fields being too
big.

For more information, see [Filter Live
Tail](Filter-Live-Tail.md "Filter Live Tail").
