<details><summary>How does a <a href="/docs/search/search-query-language/search-operators/timeslice"><code>timeslice</code></a> affect a monitor?</summary>

Monitor query output is matched with the threshold. If it matches, the alert triggers. If there are multiple rows in the search query output because of [`timeslice`](/docs/search/search-query-language/search-operators/timeslice) or any other reason (such as a [`group by`](/docs/search/search-query-language/group-aggregate-operators) operator), it would match each row with the monitor threshold and if it matches for any row, it would trigger the alert.<br/>

So if the query is `_sourceCategory=abc | timeslice 1m | count by _timeslice`, the timeRange is `15m`, and there are 15 rows in the query output, it would trigger the alert if `_count` for any row matches the threshold and resolve when none of the rows match the alert threshold (and all match resolution threshold).

</details>
