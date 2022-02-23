---
id: search-highlighting
---

# Search Highlighting

When you perform a search, and results are returned, your search terms are highlighted in the **Messages** tab.

For example, using this query:

```sql
(error OR fail*) AND exception
```

returns the following results in the **Messages** tab:

![search highlighting](/img/search/get-started-search/how-to-use-search-page/search-highlighting.png)

Note that the search terms **Error** and **Exception** are highlighted in yellow.

Highlighted search terms are limited to the first 1024 characters per message, in order to provide improved search performance.
