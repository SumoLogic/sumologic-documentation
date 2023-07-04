---
id: parse-json-formatted-logs
title: Parse JSON Formatted Logs
description: The JSON operator allows you to extract values from JSON logs with most JSONPath expressions.
---

The JSON operator allows you to extract values from JSON logs with most [JSONPath](http://goessner.net/articles/JsonPath/) expressions. See the [supported JSONPath syntax elements](#supported-jsonpath-syntax-elements) below.

:::note
If the messages in your search results can be formatted as JSON, the **Messages** tab presents the option to display each message in JSON or raw format. See [Format JSON messages in search results](../../get-started-with-search/search-basics/view-search-results-json-logs.md).
:::

Because JSON supports both nested keys and arrays that contain ordered sequences of values, the Sumo Logic JSON operator allows you to extract:

* Single, top-level fields.
* Multiple fields.
* Nested keys.
* Keys in arrays.

:::tip
Not familiar with JSONPath syntax? Try our [UI generator](#ui-parse-generator)
that can create the parse expression for a specific JSON key for you.
:::

## Syntax

* `| json "<name_or_key>"[, "<name_or_key>", ...] [as <field> ...]`
* `| json "<name_or_key>"[, "<name_or_key>", ...] [as <field>] [nodrop]`
* `| json [field=<field_name>] "<name_or_key>"[, "<name_or_key>", ...] [as <field> ...]`
* `| json auto [field=<field_name>] [maxdepth <#>]`
* `| json auto [field=<field_name>] [extractarrays]`
* `| json auto keys "<key1>"[, "<key2>", ...] [refonly] [as <field> ...]`

## Options

* `nodrop` - allows messages containing invalid JSON values to be displayed. For details, see [parse nodrop](parse-nodrop-option.md) and [using the nodrop option](#using-the-nodrop-option).
* `field=<field_name>` - allows you to specify a field to parse other than the default message. For details, see [parse field](parse-field-option.md).
* `auto` - automatically detects JSON objects in logs and extracts the key/value pairs. See [JSON auto option](#json-auto-option) for details.

The following examples use this sample log message:

```
2014-03-11 15:00:42,611 -0700 INFO [hostId=prod-search-6]
[explainJsonPlan.stream] {"module":"stream","logMessage":"exiting search","sessionId":"90D97000","customerId": "00B12CD0"
...
{
    "baselineIntervals":[
    "2014-03-11T23:00:00:000-07:00\/2014-03-12T05:00:00.000-07:00",
    "2014-03-12T05:00:00.000-07:00\/2014-03-12T11:00:00.000-07:00"],
    "meta":{
    "type":
    "timestamps",
    "version": "1"
}
}
...
```

## Supported JSONPath syntax elements

The JSON operator supports the following JSONPath expressions:

| JSONPath  | Description |
| :-- | :-- |
| `$` | The root object or element. |
| `@` | The current object or element. |
| `. or []` | Child operator. |
| `..` | Recursive descent. JSONPath borrows this syntax from E4X. |
| `*` | Wildcard. All objects or elements regardless of their names. |
| `[]` | Subscript operator. XPath uses it to iterate over element collections and for predicates. In JavaScript and JSON, it is the native array operator. |
| `[,]` | Union operator in XPath results in a combination of node sets. JSONPath allows alternate names or array indices as a set. |
| `[start:end]` | Array slice operator. |
| `()` | Script expression, using the underlying script engine. |

## Special characters

If you have spaces or other special characters like `@` in your property names you must use bracket notation, `['foo bar']`. Below are some examples:

* If your property name was `@something`, you need to use `['@something']`.
* If your property name was `fie@ld`, you need to use `['fie@ld']`.
* If your property name was `abc.pqr`, you need to use `['abc.pqr']`.

## Case sensitivity

References to specific keys are case sensitive in a standard JSON operation. For example, if a key name is `sourceIpAddress` and you run `| json "sourceipaddress"` the operation will not return results since it does not match the upper case letters. The correct way is to run `| json "sourceIpAddress"`.

When using the [auto option](#json-auto-option) the keys are not case sensitive.

## Extracting a single top-level field

The JSON operator allows you to extract a single, top-level field. For example, to extract `accountId`:

```sql
_index=audit_events
| json "accountId"
| fields accountId
```

produces results like:

![json single key displayed on results table.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/json-single-key.png)

## Extracting multiple fields

You can also extract multiple fields in a single operation. For example, to extract `accountId` and `eventName`:

```sql
_index=audit_events
| json "accountId", "eventName"
| fields accountId, eventName
```

produces these results:

![json multiple keys displayed in results.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/json-multiple-keys-displayed-in-results.png)

In addition, you can assign names to fields that differ from their original key names. To use `aID` instead of `accountId` and `eName` instead of `eventName`, you'd use the `as` option like this:

```
_index=sumologic_audit_events | json "accountId", "eventName" as aID, eName | fields aID, eName
```

which gives you these results:

![json rename key names.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/json-rename-key-names.png)

## Extracting a nested key

The example log message has nested keys, which you can extract by specifying the path using dot notation.

For example, to extract the nested key `type` from `meta`, use the following query:

```sql
* | json field=jsonobject "meta.type"
```

## Finding values in a JSON array

In some cases, fields values are actually arrays, like `baselineIntervals` in the example log message:

You can instruct the JSON operator to extract `@baselineIntervals`, like this:

```sql
* | json field=jsonobject "baselineIntervals"
```

It returns a list of the values in the array:` ["2014-03-10T23:...", ""2014-03-11T05:..."]`.

like this:

![json results](/img/reuse/query-search/json_results_baselineIntervals.png)

To refer to one specific entry in the array, provide the array's index: 

```sql
* | json field=jsonobject "baselineIntervals[1]"
```

**Nested Array**. You can parse from a nested array using the dot
notation.

```sql
_sourceCategory=O365* | json "Actor[0].Type" as Actortype0 | json "Actor[1].Type" as Actortype1
```

The result of the query would look like this: 

![ArrayElements.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/ArrayElements.png)

## Using the nodrop option

By default, the JSON operator optimizes results by dropping messages that don't use the specified key or keys, or messages that use invalid JSON keys. Use the nodrop option to prevent this optimization, and set the extracted field values to null (empty):

```sql
* | json field=jsonobject "baselineIntervals[0]" nodrop
```

## Using wildcard

You can use wildcard (\*) to access the array elements in a JSON. For example, you can access Actor Type from an O365 JSON message using wildcard.

![json wildcard example.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/json-wildcard-example.png)

`_sourceCategory=O365*
| json "Actor[*].Type" as Actortype`

The result of the query would look like this:

![wildcard example results.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/wildcard-example-results.png)

Next, if required, you can use the array elements to perform additional operations. For example, you can find the max of Type for a CreationTime and Id using this query:

```sql
_sourceCategory=O365*
| json field=_raw "CreationTime", "Id"
| json "Actor[*].Type" as ActorType
| extract field=ActorType "(?<Type>\d+)" multi
| max(Type) by CreationTime, Id
```

The result would look like this:

![Output](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/MaxOutput.png)

## JSON auto option

Use the **json auto** option in a query to automatically detect JSON objects in logs and extract the key/value pairs without the need to specify fields in a parse statement. After the query runs, you can use the Field Browser to choose the fields you’d like to display. You can also operate on the extracted fields later in the query.

If you don't specify any additional fields, the JSON objects are automatically detected and all of the key/value pairs are extracted. Note that messages that don't contain JSON are not dropped.

The JSON portion does not need to span the entire log message. There can be some text before and after the JSON portion. The **json auto** operator automatically detects where the JSON object is located and parses it.

For example, in this log message:

```
2015-05-04 21:51:43,289 -0700 INFO ["hostId"=stream] ["module"=stream] {"foo":{"bar":"baz"}} ...
```

The operator automatically detects the JSON object:

```
{"foo":{"bar":"baz"}}.
```

### Example

```
"{" | json auto
```

#### Additional options

**`* | json auto field=fieldname`**

Operates on a specified field. By default, **json auto** will attempt to extract JSON fields from the entire raw log message. To have it operate on a different field, use the **field** option.

Example:

```sql
* | json auto field=<myfield>
```

**`* | json auto keys`**

References specific keys in json. The keys are not case sensitive with the **auto** option. The keys can be renamed (aliased) using **as**.

Example:

```sql
* | json auto keys "<key1>", "<key2>" as <field1>, <field2>
```

Use the **refonly** option to extract only the referenced keys. If you don't use this option, **json auto** will also extract all other JSON fields in the message.

Example:

```sql
* | json auto keys "<key1>", "<key2>" refonly
```

**`* | json auto maxdepth`**

JSON is a hierarchical data structure that can have many levels of objects and arrays. For example, the following has a depth of four levels:

```json
    {
       "foo": {
          "bar": [
             {
                "k1": "v1"
             },
             {
                "k2": "v2"
             }
          ],
          "baz": "qux"
       }
    }
```

At depth 1 is the object containing **foo**. At depth 2 is the object containing **bar** and **baz**. At depth 3 is the array containing two objects. At depth 4 are two objects containing keys **k1** and **k2**.

Use the **maxdepth** to specify the level at which to flatten the JSON.

The following examples show how the previous sample changes when maxdepth values are applied:

**`json auto maxdepth 1:`**

```sql
field: foo value: {"bar": [{"k1": "v1"}, {"k2", "v2"}], "baz": "qux"}
```

**`json auto maxdepth 2:`**

```sql
field: foo.bar value: [{"k1": "v1"}, {"k2", "v2"}]
```

```sql
field: foo.baz value: qux
```

Example:

```sql
* | json auto maxdepth 2
```

```sql
* | json auto extractarrays
```

Extracts elements from flat arrays with each element of the array as a separate key value pair. Non-flat arrays (arrays containing other JSON objects or arrays) are extracted by default.

Consider this example:

`{"foo": [1,2,3]}`

Without the **extractarrays** option, **json auto** yields:

`field: foo value: [1,2,3]`

With the **extractarrays** option, **json auto** yields these field-value pairs:

`field: foo[0] value:1field: foo[1] value:2field: foo[2] value: 3`

#### Important notes

1. Up to 100 fields are extracted; additional fields must be specified.
1. The keys are not case sensitive with the **auto** option.
1. Spaces in field names are automatically reformatted to underscores.
1. **json auto** works by searching for json blobs beginning at the end of the message. Most logs begin with a preamble, such as a timestamp, then the json blob. In cases where content appears at the end of the message *after* the json blob, the extraction could fail.  

    Having the json blob at the end of the message is recommended. Having it in the middle of the message could cause extraction failure.

1. Fields extracted using json auto need not be referenced explicitly in order to be used later in the query. For example, the user does not need to do this:

    ```sql
    * | json auto keys "username"
    | count by username
    ```

    The user can simply write:

    ```sql
    * | json auto | count by username
    ```

    We will infer that username must be a field extracted using json auto and treat it as such.  
     

1. The keys extracted from json may contain dots and square brackets.
    Hierarchical entities within json are denoted using dot as the
    separator between different levels. Array indices are specified in
    between brackets. An example extracted field name can be:

        `users[2].address.street`

    Using this field name later in the query fails since dots and
    brackets are not normally allowed in the field name. To use these
    fields, you may escape the field using the percent sign (`%`).

    For example, this will not work:

    ```sql
    * | json auto
    | count by users[2].address.street
    ```

    But this will:

    ```sql
    * | json auto
    | count by %users[2].address.street
    ```

1. By default, json auto overrides previously extracted fields. To have previously extracted fields take precedence, run your queries in [Auto Parse Mode](../../get-started-with-search/build-search/dynamic-parsing.md) or explicitly [parse out the fields](/docs/search/search-query-language/parse-operators) in your query.

## UI parse generator

Sumo Logic can generate the parse expression for a specific JSON key for you. The option is available when viewing your JSON logs in the **Messages** tab of your Search.

1. Right-click the key you want to parse and a menu will appear.
1. Click **Parse selected key**.  

    ![ui parse selected key option.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/ui-parse-selected-key-option.png)

1. In the query text box, where ever your cursor was last placed, a new  parse JSON operation is added that will parse the selected key. For example, `| json field=_raw "_BOOT_ID"`.

## Search warning

### Unable to parse input as json

By default the JSON operator optimizes results by dropping messages that don't have the fields or keys specified in your query or if the JSON is invalid. When a message is dropped the user interface provides a warning message: 

![unable to parse json warning message.png](/img/search/searchquerylanguage/parse-operators/parse-json-formatted-logs/unable-to-parse-json-warning-message.png)

This is only a warning message to inform you that at least one log returned in the scope of the query did not have a specified key. 

Use the [nodrop](parse-nodrop-option.md) option to prevent this optimization. For example, the following query is looking for the key `event` and it has specified not to drop messages that don't have this key:

```sql
_sourceCategory="nginx"
| json "event" nodrop
```

You can remove the warning about the key not being found by specifying the key(s) you need in the scope of the query, like this:

```sql
_sourceCategory="nginx" "event"
| json "event"
```

Since `event` is specified in the scope of the query, the json operator will only get logs that have `event` in them.
