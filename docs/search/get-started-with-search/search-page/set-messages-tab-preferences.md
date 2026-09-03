---
id: set-messages-tab-preferences
title: Set Messages Tab Preferences
description: The Preferences menu in the Messages tab allows you to customize how log search results messages are displayed.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can customize how messages are displayed in the **Messages** tab, including sort order, messages per page, and which fields appear alongside each log message.

## Set messages tab preferences

1. In the **Messages** tab, click the settings gear icon in the upper right, then click **Display Message Preferences**.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/gear-menu.png')} alt="Messages tab" style={{border: '1px solid gray'}} width="800" />
1. The **Message Display Preferences** window is displayed.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/message-display-preferences.png')} alt="Message Display Preferences window" width="450"/>
1. Choose from the following options:
    * **Sort by.** Order messages by **Recent Messages First** (the default) or **Oldest Messages First**.
    * **View n messages per page**. Set the number of messages per page to a value between 15 and 500. The default is 25.
    * **Expand each message.** Increase the number of lines that are displayed for each message. By default, this option is set to 10.
    * **Show Metadata Fields.** When selected, metadata field names are displayed below each log message.<br/><img src={useBaseUrl('img/search/get-started-search/search-page/metadata-fields.png')} alt="Metadata fields in messages tab" style={{border: '1px solid gray'}} width="800" />
    * **Show URI-decoded format.** By default, UTF characters in JSON are automatically decoded. Toggle this off if you want to intentionally include these when viewing JSON log messages in the UI.
    * **Dictionary Term Highlighting.** When selected, the terms "error" and "exception" are displayed in red text.
    * **Save as Default View.** Click to save your choices. They will apply to all new log search tabs you open.

## Export message fields

* **Export (Display Fields)/Export (All Fields).** To learn how to use the Export Results option, see [Export Search Results](/docs/search/get-started-with-search/search-basics/export-search-results.md).
