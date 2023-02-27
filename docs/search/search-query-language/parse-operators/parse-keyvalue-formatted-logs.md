---
id: parse-keyvalue-formatted-logs
title: Parse Keyvalue Formatted Logs
---


Typically, log files contain information that follow a key-value pair structure. The keyvalue operator allows you to get values from a log message by specifying the key paired with each value.

For example, a log could contain the following keys (highlighted):

![key value](/img/reuse/query-search/Keyvalue_highlight.png)

From that log message, you can use the **keyvalue** operator to get the values for one or more keys. For example, if you'd like to see information just about the "remote_ip" value, running this query:

`... | keyvalue "remote_ip" ...`

would produce these results:

![results](/img/reuse/query-search/Keyvalue_results.png)

The keyvalue operator can also be used in two explicit modes:

* **Default inference mode.** The keyvalue operator uses an internal list of regular expressions to determine how to extract the value for a given key
* **Regular Expression mode.** You explicitly match keys and values based on a regular expression

:::important
Keys and values that contain spaces, tabs, or other white space, must be quoted. For example, `keyvalue Node ID` must be written `keyvalue "Node ID"`.
:::

## Inference mode syntax

When used in the default **inference mode**, the **keyvalue** operator uses an internal list of regular expressions to determine how to extract the value for a given key. This greatly simplifies the syntax.

For example, you'd extract the keys "module" and "thread" and their values from a log message by running this query:

`* | keyvalue infer "module", "thread"`

to produce these results:

![](/img/reuse/query-search/keyvalue_infer_example_results.png)

## Regular Expression mode syntax

In **Regular Expression** mode, you must explicitly match keys and values based on a regular expression. The regular expression needs a capture group for the key and a capture group for the value. This allows for greater flexibility than inference mode.

For example, this is a log with many key value pairs:

```
2017-09-08 21:01:58:552 INFO com.netflix.tracing.RequestTrace:1 [http-0.0.0.0-7101-89] [log] reqId=b588ab0b-858a-4ea5-ba78-8a68a3b609d3-96 {perf.response_time_ms=129, request.trace_local_flag=true, serviceinfo.IP=10.211.77.111, request.country=US, perf.request_start_timestamp_ms=1339189318397, serviceinfo.service_name=API, request.method=GET}
```

To extract the values for the keys "serviceinfo.IP" and "perf.request_start_timestamp_ms" from the log message, use this query:

```sql
* | keyvalue regex "\s(.*?)=(.*?)," keys "serviceinfo.IP", "perf.request_start_timestamp_ms" as ip, start_ms
```

The **keyvalue** operator also supports regular expressions that contain a **single capture group**. The capture group needs to match the value from your key value pair. You may notice an improvement in performance by running queries with a single match group. For example, for the same log you'd run this query to get the same results as the previous query:

```sql
* | keyvalue regex "=(.*?)," "serviceinfo.IP", "perf.request_start_timestamp_ms"
```

In the above case, for each key specified, the operator first finds the key itself in the message (first occurrence), and then finds the closest match of the regular expression to the location in the message where the key was found.

The number of fields specified with the "as" clause must match the number of key-value pairs specified. You can omit the clause if you'd like the operator to automatically create the field names for the extracted values. To do this, **keyvalue** replaces every character (other than a..z, A..Z, 0..9, or `_`) with an underscore (`_`).

## Abbreviated syntax

The **keyvalue** operator can be abbreviated in either mode (Inference or Regular Expression). For example, running this query:

```sql
* | keyvalue infer keys "<a>", "<b>"
```

will produce the same results as running this query:

```sql
* | keyvalue "<a>", "<b>"
```

Also, **keyvalue** can be abbreviated to "kv". For example:

```sql
* | kv "<a>", "<b>"
```

## Auto extracting key-value pairs

The **keyvalue** operator supports an optional auto mode when using the default Inference mode.

```sql
* | keyvalue auto
```

* Auto can extract up to 100 non-referenced fields, fields that are not explicitly included in the form **"keys foo,bar,..."**.
* If the message includes more than 100 key value pairs, the operator extracts the first 100 key value pairs from left to right in the message. If there are duplicates, the last occurrence is extracted.
* If you want to be able to use the keys later in the query, they must be referred to specifically.
* You can separate the key and value in a key-value pair using any of these delimiters:

    ```sql
    : = ->
    ```

### Multiple delimiters

If your log messages contain more than one delimiter you must specify
one delimiter to use when extracting.

```sql
* | keyvalue auto delim ":"
```

## Additional options

* **Aliases (renaming)** using [**as**](/docs/search/search-query-language/search-operators/as) are supported. For example:

    ```sql
    * | keyvalue auto keys "<key1>", "<key2>" as <field1>, <field2>
    ```

* **refonly** extracts only referenced keys. If this option is not used, **keyvalue auto** extracts all other fields it finds in the message.

    ```sql
    * | kv auto keys "<key1>", "<key2>"  refonly
    ```

* **field**=field_name allows you to specify a field to parse other than the default message. For details, see [Parse field](parse-field-option.md).

    ```sql
    * | keyvalue field=<field> [infer keys]
    ```

    ```sql
    * | keyvalue auto field=<field> [keys]
    ```

    ```sql
    * | keyvalue field=<field> regex "<regex>" [keys]
    ```

* **nodrop** forces results to also include messages that don't match any segment of the parse term. For details, see [Parse nodrop](parse-nodrop-option.md)
