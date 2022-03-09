---
id: searching-by-keyword-returns-no-results
sidebar-label: Searching by Keyword Returns no Results
---

# Searching by keyword returns no results even though the keyword exists in messages

Sometimes a keyword search returns no results, even though the keyword used exists in messages. To understand why this happens, it is helpful to understand how Sumo Logic indexes the contents of uploaded log messages.

When a log message is received by Sumo Logic, the service indexes themetadata information delivered with the messages, such as Collector, Source, sourceHost, `_sourceCategory`, and so on. Then Sumo Logic uses an algorithm to parse the raw messages to break that content into individual keyword terms, or groups of characters, which are also added to the index. These individual terms are defined by detecting boundaries around the characters found within the message, including white space, dashes, commas, question marks, exclamation points, brackets, and more.

So given this sample message:

```
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

To search for messages that include any of the previously indexed values, you need to provide keywords in your query that *specifically match* those terms. Boolean logic and wildcards enable you to search for multiple terms, express logic about term distribution within messages, and specify partial terms with wildcards: use an asterisk (\*), for zero or more characters, or a question mark (?) for a single character. 

:::note
Keywords are case insensitive.
:::

Examples:

* `TEST*` - finds the terms "test", "TESTClientImpl", "TEST" and
    "TEST1234567"
* `test` - finds the terms "test" and "TEST" 
* `456` - finds the term "456" 
* `*456*` - finds the terms "456", "1234567" and "TEST1234567"  
     

If you enter a phrase, or series of keywords, such as an email or IP address, the Sumo Logic search engine looks for the individual indexed terms that appear next to each other. You can use a wildcard to represent one full term (Ex. jsmith@\*.com), but not a partial term (for example jsmith@some\*re.com). The wildcard (\*) will only represent one individual full term between supplied values, so if additional terms exist between the defined values, the search will return no results.

For example, the keyword `com*services` will not find the message, because there are multiple terms attempting to be represented by the wildcard. In this case "*\<period\> test \<period\>*." If you change this keyword to `com.*.services`*, *the query WILL return our message, as the `*` only indicates the individual term of "test"

To search for multiple keyword values in a message, the best practice is to break the keywords into multiple terms. To do this, simply add a space between the terms. When you do this, Sumo Logic will imply an "AND" condition to the keyword search. For example, searching `com services` will search for `com AND services`.

