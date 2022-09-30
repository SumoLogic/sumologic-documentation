---
id: grep-searching-with-sumo
title: grep to Searching with Sumo Cheat Sheet
sidebar_label: grep to Searching with Sumo
description: This cheat sheet helps you move from grep to searching with Sumo.
---

Searching across multiple servers and aggregating the results is where the power of Sumo really lies. This cheat sheet can make it easier for you to move from greping logs to more in-depth querying with Sumo Logic.

:::note
Remember that Sumo Logic queries are time-constrained.
:::

We recommend that search your data using the `_sourceCategory` metadata tag, but you’ll see that the examples below use the `_sourceName` metadata tag because `_sourceName` should reflect the full canonical path of the file, which is typically what you use when greping files. You should still follow the [seven search rules to live by](../get-started-with-search/build-search/best-practices-search.md).

Returns the contents of a file named log_file for a specific timeframe. In Sumo, you must paginate through the results, but you can also search for ALL log files across your stack which share the same name.
* grep Command Line: `cat ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file`

Returns all log lines containing the term "string" (case insensitive) in a file named log_file.
* grep Command Line: `grep -i "string" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file AND "string"`

Returns all log lines containing the word "string" (case insensitive)  in a file that starts with "log_" in its name.
* grep Command Line: `grep -i "string" ./log_*`
* Sumo Equivalent: `_sourceName=*/log_* AND "string"`

Returns all log lines containing the term "literal_string" (case sensitive) in a file named log_file.
* grep Command Line: `grep "literal_string" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file AND "literal_string" |  parse regex "(?<sample>literal_string)" | fields - sample`

Using regex, returns all events where a particular pattern is present on the log line.
* grep Command Line: `grep "start.*end" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file |  parse regex "(<sample>start.*end)" | fields - sample`

Finds all words which match the term "string" in a file named "log_file". Notice the spaces around string.
* grep Command Line: `grep -iw "string" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file AND " string "`

Returns the log events 3 lines after the line which included the term "example".  While there is no query language equivalent operation, you can [search surrounding messages.](../get-started-with-search/search-basics/search-surrounding-messages.md).
* grep Command Line: `grep -A 3 -i "example" ./log_file`
* Sumo Equivalent: No equivalent operation.

Returns the log events 3 lines before the line which included the term "example".  While there is no query language equivalent operation, you can [search surrounding messages.](../get-started-with-search/search-basics/search-surrounding-messages.md).
* grep Command Line: `grep -B 3 -i "example" ./log_file`
* Sumo Equivalent: No equivalent operation.

Returns the log events 3 lines before and after the line which included the term "example". While there is no query language equivalent operation, you can [search surrounding messages.](../get-started-with-search/search-basics/search-surrounding-messages.md).
* grep Command Line: `grep -C 3 -i "example" ./log_file`
* Sumo Equivalent: No equivalent operation.

Returns all files and events within a specific server which include the term “string”. Notice the `_sourceHost` metadata tag is used to hone in on a single server.
* grep Command Line: `grep -r "string" ./*`
* Sumo Equivalent: `_sourceHost=server_name AND _sourceName=* AND "string" | fields _sourceName, _raw`

Count the number of lines which match the term "string".
* grep Command Line: `grep -c "string" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file AND "string" | count`

Returns only the log events where the term "string" was not found.
* grep Command Line: `grep -v "string" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file AND !"string"`

Returns only the file names where the term "string" was found.
* grep Command Line: `grep -l "string" ./log_*`
* Sumo Equivalent: `_sourceName=*/log_* AND "string" | count by _sourceName | fields _sourceName`

Returns only the part of the log event which matches my search term.
* grep Command Line: `grep -o "start.*end" ./log_file`
* Sumo Equivalent: `_sourceName=*/log_file |  parse regex "(<match>start.*end)" | fields match`
