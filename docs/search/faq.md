---
id: faq
title: Search FAQ
sidebar_label: FAQ
---


## Export the Results of a Saved File

This was an advanced task designed to fulfill a missing feature in Sumo.

With the [catoperator](docs/search/search-query-language/search-operators/cat.md) you can simply retrieve your results and use the [export](docs/search/get-started-with-search/search-basics/export-search-results.md) feature.

### Deprecated

Sumo Logic provides the ability to save a file using the [save](docs/search/search-query-language/search-operators/save-lookups-classic.md) operator, but it does not allow you to export the results of that saved file. To do so, you'd have to re-run the original query and export the results.

But if you know you will need to export your saved files results routinely, you can create another column in the results that are saved to the file that acts as a primary key for each result. This key then allows you to conduct a [lookup](docs/search/search-query-language/search-operators/lookup-classic.md)
operation matching the key.

To create keys in your saved file:

1. In your query that is saving the file with the save operator, you need to add numbers to act as the primary key. You can start at `1` and increment by `1` for each result, as shown. Add a group by if needed, such as a [`timeslice`](docs/search/search-query-language/search-operators/timeslice.md):

    ```sql
    | 1 as number
    | accum number as number // by _timeslice
    ```

1. Now that your saved file has numbers as unique keys on each result you can do a lookup so that the matching is done on the keys, like this:

    ```sql
    | 1 as number
    | accum number as key
    | lookup * from shared/file.csv on key=number
    ```

    The query with the lookup operator needs to create at least the same number of keys as the results in your saved file, so that the keys match all. Since each result is assigned a key, you just need to make sure enough results are returned. If you have more keys from your lookup query, it is not a problem, because we don't match on them anyway. This will return all of your saved file's results, ready for export.

1. If you are appending to your saved file, you can get the file's last key to define the starting key for the append query using the following query:

    ```sql
    | 1 as number
    | accum number as key
    | lookup _accum from shared/file/forsupport on key=_accum
    | max(_accum)
    | _max + 1 as key
    ```

    The `_accum` field is the same as the `number` field in the first example. But you can't use this query with your save query that is appending because we use the max operator.


## Group Messages Using a Defined Field

You can group messages together with a user-defined field using the [Sessionize](docs/search/search-query-language/search-operators/sessionize.md) operator (similar to transaction in Splunk). By defining multiple parse expressions that match different kinds of log lines, you can weave together the extracted fields into one session.

Here's an example:

```sql
* | sessionize "Starting stream query with sessionId=*," as sessionId, "*$sessionId *" as (_1, _2), "Search delegate session started, sessionId=$sessionId,"
```

In this query, the `sessionize` operator uses three parse expressions:

1. The first matches the log entry. When the match occurs, it extracts the sessionId from that.
1. The second parse expression matches the `sessionId`. The way the parse expression is written, it will match anything that has the same sessionId.
1. The last log entry in the session is matched. Once this match occurs, the session is deemed to be complete and will not match any further logs.

All the fields extracted are also available as additional fields in the UI and can be used for further analysis.


## Searching by Keyword Returns No Results

Sometimes a keyword search returns no results, even though the keyword used exists in messages. To understand why this happens, it is helpful to understand how Sumo Logic indexes the contents of uploaded log messages.

When a log message is received by Sumo Logic, the service indexes themetadata information delivered with the messages, such as Collector, Source, sourceHost, `_sourceCategory`, and so on. Then Sumo Logic uses an algorithm to parse the raw messages to break that content into individual keyword terms, or groups of characters, which are also added to the index. These individual terms are defined by detecting boundaries around the characters found within the message, including white space, dashes, commas, question marks, exclamation points, brackets, and more.

So given this sample message:

```json
2013-08-13 21:25:15,456 98765432 [com.test.services.test.TESTClientImpl] TEST Request:id=1234567 TEST1234567
```

Sumo Logic indexes the following keyword values:
* 2013 
* 08 
* 13 
* 21 
* 25 
* 15 
* 456
* 98765432
* com 
* test
* services 
* test
* TESTClientImpl
* TEST
* Request 
* id 
* 1234567
* TEST1234567

We have removed the special characters from the above list for simplification, but those would also be indexed as separate keywords.

To search for messages that include any of the previously indexed values, you need to provide keywords in your query that *specifically match* those terms. Boolean logic and wildcards enable you to search for multiple terms, express logic about term distribution within messages, and specify partial terms with wildcards: use an asterisk (`*`), for zero or more characters, or a question mark (`?`) for a single character.

:::note
Keywords are case insensitive.
:::

Examples:

* `TEST*` - finds the terms "test", "TESTClientImpl", "TEST" and "TEST1234567"
* `test` - finds the terms "test" and "TEST" 
* `456` - finds the term "456" 
* `*456*` - finds the terms "456", "1234567" and "TEST1234567"  
     

If you enter a phrase, or series of keywords, such as an email or IP address, the Sumo Logic search engine looks for the individual indexed terms that appear next to each other. You can use a wildcard to represent one full term (e.g., `jsmith@*.com`), but not a partial term (e.g., `jsmith@some*re.com`). The wildcard (`*`) will only represent one individual full term between supplied values, so if additional terms exist between the defined values, the search will return no results.

For example, the keyword `com*services` will not find the message, because there are multiple terms attempting to be represented by the wildcard. In this case `<period> test <period>`. If you change this keyword to `com.*.services`, the query WILL return our message, as the `*` only indicates the individual term of "test".

To search for multiple keyword values in a message, the best practice is to break the keywords into multiple terms. To do this, simply add a space between the terms. When you do this, Sumo Logic will imply an "AND" condition to the keyword search. For example, searching `com services` will search for `com AND services`.
