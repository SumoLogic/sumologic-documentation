---
title: December 14, 2023 - Application Update
keywords:
  - cloud siem
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Minor Changes and Enhancements

* [New] A new attribute section has been added to Signal and Insight details returned by the API endpoints `GET /signals/{id}` and `GET /insights/{id}` that will include the log search string (along with start and end times) that you can use to retrieve the queried records for a given Signal. The stanza looks like this:

    ```
    "recordSearchDetails": {
      "query": "{string}",
      "queryStartTime": "{timestamp}",
      "queryEndTime": "{timestamp}"
    },
    ```

### Bug Fixes

* Some users were seeing duplicate schema tags (with an extra "s" at the end) in the UI.
* In some scenarios, the UI would react slowly when users attempted to enter comments for Insights.
* The UI was not properly enforcing the 100 character limit for rule names (and instead displaying an unknown error if the user attempted to set a rule name that was too long).
