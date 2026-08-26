---
id: search-highlighting
title: Search Highlighting
description: When you perform a search, and results are returned, your search terms are highlighted in the Messages tab.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you perform a log search, and results are returned, your search terms are highlighted in the **Messages** tab.

## See an example of search highlighting

For example, using this query:

```
(error OR fail*) AND exception
```

returns the following results in the **Messages** tab:

<img src={useBaseUrl('img/search/get-started-search/search-page/search-highlighting.png')} alt="Search highlighting" style={{border: '1px solid gray'}} width="800" />

Note that the search terms **Error** and **Exception** are highlighted in yellow.

## Limitations

Highlighted search terms are limited to the first 1024 characters per message, in order to provide improved search performance.
