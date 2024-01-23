---
id: wildcards-in-full-text-searches
title: Wildcards in Full Text Searches
description: You can use wildcards in full text searches.
---

This topic covers the details and special cases when using wildcards, for example, within quoted search expressions and within phrase queries.

## Syntax

* `*` matches 0 or more characters. 
* `?` matches exactly one character. 
* `fail*` matches fail, failure, fails, failed
* `e*or` matches error, extensor, eliminator, eor
* `err?r` matches error. 

## Examples

* `error OR fail error AND fail*`
* `(error OR fail) and debug error* OR (fail and debug) error? NOT fail`

## Phrase Queries

A full-text search expression such as `jsmith@somewhere.com` is called a "phrase query" because it operates on multiple search terms: `jsmith`, `@`, `somewhere`, `.` , `com` as opposed to a single term query such as `"fail"`. In a phrase query, the Sumo Logic search language looks for the five terms in the email address adjacent to each other. So, you can search for things such as IP addresses or segments of IP addresses like `10.1.1.123`, or email domains like `@sumologic.com`.

If you are searching using a phrase query, Sumo Logic currently does not support partial-term wildcards *within* the phrase, such as `jsmith@some*re.com`. However, you can use a wildcard to represent a full term in the phrase, like this `jsmith@*.com`.
