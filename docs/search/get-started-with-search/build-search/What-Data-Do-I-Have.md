---
id: what-data-do-i-have
---

# What Data Do I Have?

It can be hard to create a search query if you don't know what data you
have in your Sumo Logic environment. 

You can use the following simple queries to identify possible values for
your existing Source Categories, Source Names, and Source Hosts. You can
also approximate data volume for each of the possible values using these
queries.

We discourage the use of \*, as it does not provide much value, but in
this exception, it's an easy way to identify all messages received in
the last 5 minutes, and provide an approximate volume for each.

For Source Categories:

`* | count_frequent(_sourceCategory)`

For Source Hosts:

`* | count_frequent(_sourceHost)`

For Source Names:

`* | count_frequent(_sourceName)`
