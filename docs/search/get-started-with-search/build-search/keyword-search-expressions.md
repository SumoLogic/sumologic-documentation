---
id: keyword-search-expressions
title: Keyword Search Expressions
description: The text that comes before the first pipe symbol in a query is called the keyword expression or scope.
---



A Keyword Search Expression defines the scope of data for the query.

Boolean logic and wildcards enable you to search for multiple terms, express logic about term distribution within messages, and specify
partial terms with wildcards. The keyword expression can include [built-in metadata fields](../search-basics/built-in-metadata.md) such as `_collector`, `_sourceCategory`, `_sourceName`, and `_sourceHost` as well as custom log metadata fields.

Click any term from the messages listed in the **Message** tab to add it to the keyword search expression (**AND term**). Alt-click any term to remove the term from results (**NOT term** or **!term**). Run the query again to match the new keyword expression.

Keyword search expressions are often referred to as the **scope** of a query.

## Syntax

* `keyword keyword OR keyword NOT keyword`
* `*keyword*`
* `_sourceCategory="keywords with spaces or special characters"`
* `_sourceHost=*keyword*`

    :::note
    `AND` is implicit and does not need to be specified in the query.
    :::

## Rules

* AND is implicit.
* Supports boolean operators `NOT`, `AND`, `OR`. The precedence of boolean operators is `NOT`, `AND`, `OR`. Parentheses will override the precedence.
* A wildcard `*` represents zero or more characters.
* Supports built-in metadata fields created during configuration of Collectors and Sources, like `_sourceHost`, `_sourceCategory`, and `_sourceName`.
* Supports custom [log metadata fields](/docs/manage/fields.md).
* Punctuation characters are allowed (`- _ : / . + @ # $ % ^`).
* Expressions containing spaces or special characters must be enclosed in quotes (`" "`).
* Keyword expressions are case-insensitive.
* Parentheses group search expressions and provide the structure necessary to perform complex queries. Parentheses are necessary only if **both** of the following conditions apply:
    * The query includes three or more search expressions.
    * The query uses both `AND` and `OR` operators to link search expressions.
* Characters quoted with double quotes (not single quotes) are string literals. Use a backslash to escape double quotes in the string. Examples:
    * `"Don’t forget"`
    * `"They said, \"No later than 10\""`

## Examples

* `*`
* `error OR fail error AND fail*`
* `(error OR fail) and debug error* OR (fail and debug) error NOT fail`
* `(error OR fail) NOT debug`
* `15:39 NOT 15:39:26`
* `_sourceCategory="Sumo Logic Collector logs" AND critical`
* `_sourceHost=ldapserver AND _sourceCategory="hr-dept" AND "failed login"`
* `_sourceHost=Atlanta AND (_sourceCategory="win-app-logs" OR _sourceName="win-firewall-logs")`
* `_sourceHost="10.1.12.22" AND_sourceCategory="my category" NOT _sourceCategory="some-other" AND _sourceName="/var/log/some.log"`

It can be hard to create a search query if you don't know what data you have in your Sumo Logic environment. For simple example queries to discover existing Source Categories, Source Names, and Source Hosts, see [What Data Do I Have?](/docs/search/get-started-with-search/build-search)

## Phrases

During collection, raw messages are broken into individual keyword terms, or groups of characters. These individual terms are defined by detecting boundaries around the characters found within the message, including white space, dashes, commas, question marks, exclamation
points, brackets, and more.

A phrase is any text with these boundaries.

So given this sample message:

```
2013-08-13 21:25:15,456 98765432 [com.test.services.test.TESTClientImpl] TEST Request:id=1234567 TEST1234567
```

* Sumo Logic indexes each value separately, 2013, 08, 13, 21, 25, 15, 456, 98765432, com, test, services, test, TESTClientImpl, TEST, Request, id, 1234567, and TEST1234567.
* The special characters were not included in the above list for simplification, but those would also be indexed as separate keywords.
* To search for messages that include any of the previously indexed values, you need to provide keywords in your query that *specifically match* those terms. Boolean logic and wildcards enable you to search for multiple terms, express logic about term distribution within messages, and specify partial terms with wildcards: use an asterisk (\*), for zero or more characters, or a question mark (?) for a single character.
* Keywords are case insensitive.

**Examples:**

* `TEST*` - finds "test", "TESTClientImpl", "TEST" and "TEST1234567"
* `test` - finds "test" and "TEST" 
* `456` - finds "456" 
* `*456*` - finds "456", "1234567" and "TEST1234567"

If you enter a phrase, or series of keywords, such as an email or IP address, the Sumo Logic search engine looks for the individual indexed terms that appear next to each other.

You can use a wildcard to represent one full term: `jsmith@*.com`

But not a partial term: `jsmith@some*re.com`

The wildcard (`*`) will only represent one individual full term between supplied values, so if additional terms exist between the defined values, the search will return no results.

For example, the keyword `com*services` will not find the message, because there are periods attempting to be represented by the wildcard. If you change it to have the periods, `com.*.services*`, the query will return our message, as the `*` only indicates the individual term of `test`.

To search for multiple keyword values in a message, the best practice is to break the keywords into multiple terms. To do this, simply add a space between the terms. When you do this, Sumo Logic will imply an "AND" condition to the keyword search. For example, searching `com services` will search for `com AND services`.

### Case sensitive keyword search

By default, keyword expressions are case-insensitive. Technically there isn't a way to define case sensitivity in the keyword search  expression, you will have to define this with an operator. 

After the keyword search expression, to search for case sensitive keywords, you can use the [parse regex operator](../../search-query-language/parse-operators/parse-variable-patterns-using-regex.md). You should still specify the keyword in the scope of the query, before the first pipe `|`, to keep the search efficient. 

For example, if you want to search for the keyword "**info**" in lowercase, you'd use this query:

```sql
info
| parse regex "(\<sampl\>info)"
```

If you want to search for the keyword "**INFO**" in uppercase, you'd use this query:

```sql
info
| parse regex "(\<sampl\>INFO)"
```

To convert a string to all lowercase or all uppercase letters, you can use the [toUpperCase and toLowerCase](/docs/search/search-query-language/search-operators/toLowerCase-toUpperCase) operators.

 
