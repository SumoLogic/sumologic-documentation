---
id: about-build-search
title: Discover What Data You Have in Sumo Logic
sidebar_label: Discover Your Data
description: Identify what source categories, source hosts, and source names exist in your Sumo Logic environment before you write a search query.
---

Before you can write a useful search, you need to know what data is available in your environment. Use these simple queries to discover your existing source categories, source hosts, and source names, along with an approximate data volume for each.

## What data do I have?

It can be hard to create a search query if you do not know what data you have in your Sumo Logic environment.

You can use the following simple queries to identify possible values for your existing Source Categories, Source Names, and Source Hosts. You can also approximate data volume for each of the possible values using these queries.

We discourage the use of `*`, as it does not provide much value, but in this exception, it is an easy way to identify all messages received in the last 5 minutes, and provide an approximate volume for each.

For Source Categories: `* | count_frequent(_sourceCategory)`

For Source Hosts: `* | count_frequent(_sourceHost)`

For Source Names: `* | count_frequent(_sourceName)`

Once you know what data you have, see [Best Practices for Log Search](best-practices-search.md) for rules on writing queries that filter that data efficiently.
