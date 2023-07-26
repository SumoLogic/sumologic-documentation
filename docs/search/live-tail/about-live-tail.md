---
id: about-live-tail
title: About Live Tail
description: Sumo Logic Live Tail allows you to see a real-time live feed of log events for development and troubleshooting.
---


Use Live Tail to see a real-time feed of log events associated with a Source or Collector. These live feeds can help you with development and troubleshooting.

Live Tail mimics the output of the command line command `tail -f `with a solid black background and easy to read white text. You can see all log messages as they come in, with low latency, but they are not sorted as they are with Search.

You can tail logs ingested from Sources configured on Installed Collectors and from HTTP and Cloud Syslog Sources on Hosted Collectors.

:::note
Data ingested from Amazon S3 can't be tailed because of restrictions from Amazon.
:::

You can use the following metadata fields in a Live Tail session:

* `_sourceHost`
* `_sourceCategory`
* `_sourceName`
* `_source`
* `_collector`

Roles-Based Access Control permissions apply to all Live Tail queries.

The following image shows a Live Tail session for `_sourceCategory=Apache/Access`:

![live tail](/img/search/livetail/About-Live-Tail/LiveTail.png)

Live Tail features include [multiple](multiple-live-tails.md) Live Tail sessions, opening your Live Tail session in a [new "pop-out" window](multiple-live-tails.md), [highlighting](live-tail-highlighting.md) up to eight keywords in order to make searching easier, and changing the [preferences](live-tail-preferences.md) of your Live Tail display, including line spacing, message text size, and message color. 

There is also a [Live Tail Command Line Interface](live-tail-cli.md) (CLI). This is a standalone application that allows you to start and use a Live Tail session from the command line.

## Limitations

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

## Start a Live Tail session

You can start a Live Tail session in several ways.

### New Live Tail page

1. Go to **+ New > Live Tail**.  

    ![start live tail page.png](/img/search/livetail/About-Live-Tail/start-live-tail-page.png)

1. The **Live Tail** page opens, and the Live Tail session starts. At the prompt, enter the name of the `_sourceCategory`, `_sourceHost`, `_sourceName`, `_source`, or `_collector` of the log you want to tail, along with any filters. Use the syntax `_sourceCategory=name`. For more information, see [Filter Live Tail](filter-live-tail.md).
1. Click **Run** or press **Enter**.

The **Run** button changes to **Running**, and log messages fill the screen.

### On the Search page

1. On the **Search** page, in the search box, enter a valid query for a Source Category, Source Host, Source Name, Source, or Collector with filters, if desired. (Live Tail will take everything before the first pipe, but search operators are not supported.)
1. Click the three-dot icon and click **Live Tail** from the provided options.    

    ![live tail option png](/img/search/livetail/About-Live-Tail/live-tail-option.png)

1. The **Live Tail** page opens, and the Live Tail session starts.

### On the Home page

1. Go to **Home > Live Tail**.  

    ![Live tail on home page.png](/img/search/livetail/About-Live-Tail/live-tail-on-home-page.png)

1. The **Live Tail** page opens, and the Live Tail session starts.

### Keyboard shortcut

1. The Live Tail [keyboard shortcut](../../get-started/keyboard-shortcuts.md) is **Alt + L**.
1. The **Live Tail** page opens, and the Live Tail session starts.

## Pause and resume Live Tail

To review details, you can pause the Live Tail using the **Pause** button, then scroll up or down using your mouse. You can also simply scroll up to pause. The Live Tail continues to run, but the screen no longer automatically scrolls. The **Pause** button changes to an arrow **Jump to Bottom** button. To resume automatic scrolling, just click the **arrow** button, or click **Jump to Bottom** at the bottom of the screen, which will jump you to the bottom of the log messages.

**To pause Live Tail:**

1. Click the **Pause** button, or simply scroll up using your mouse. The **Pause** button changes to an arrow **Jump to Bottom** button. The Live Tail is still running, but automatic scrolling on your screen stops.
1. Scroll up or down using your mouse to review log message details.

Click the **Jump to Bottom** button to move to the bottom of the log messages and continue automatic scrolling.

## Change a Live Tail query

If you change the query at any time, the **Running** button changes back to **Run**. When you click **Run** or press **Enter**, it stops the previous Live Tail, and starts a new one with the new query.

## Stop Live Tail

1. Click the details icon and then choose **Stop Live Tail**.
1. The screen is cleared and the Live Tail is stopped.
