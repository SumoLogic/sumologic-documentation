---
id: "-parse-json-formatted-logs"
---

# Parse JSON Formatted Logs

The JSON operator allows you to extract values from JSON logs with
most [JSONPath](http://goessner.net/articles/JsonPath/ "http://goessner.net/articles/JsonPath/")
expressions. See the [supported JSONPath syntax
elements](./03-Parse-JSON-Formatted-Logs.md "Parse JSON Formatted Logs")
below.

If the messages in your search results can be formatted as JSON,
the **Messages** tab presents the option to display each message in JSON
or raw format. See [Format JSON messages in search
results](../../Get-Started-with-Search/Search-Basics/View-Search-Results-for-JSON-Logs.md "View Search Results for JSON Logs").

Because JSON supports both nested keys and arrays that contain ordered
sequences of values, the Sumo Logic JSON operator allows you to extract:

* Single, top-level fields.
* Multiple fields.
* Nested keys.
* Keys in arrays.

Not familiar with JSONPath syntax? Try our [UI
generator](./03-Parse-JSON-Formatted-Logs.md "Parse JSON Formatted Logs")
that can create the parse expression for a specific JSON key for you.

### Syntax

* `| json \<name_or_ke\>"[, \<name_or_ke\>", ...] [as\<fiel\> ...]`
* `| json \<name_or_ke\>"[, \<name_or_ke\>", ...] [as\<fiel\>] [nodrop]`
* `| json [field\<field_nam\>] \<name_or_ke\>"[, \<name_or_ke\>", ...] [as\<fiel\> ...]`
* `| json auto [field\<field_nam\>] [maxdepth\<\>]`
* `| json auto [field\<field_nam\>] [extractarrays]`
* `| json auto keys \<key\>"[, \<key\>", ...] [refonly] [as\<fiel\> ...]`

### Options

* `nodrop` - allows messages containing invalid JSON values to be
    displayed. For details, see [parse
    nodrop](Parse-nodrop-option.md "Parse nodrop option") and [using the
    nodrop option](./03-Parse-JSON-Formatted-Logs.md "Parse JSON Formatted Logs").
* `field\<field_nam\>` - allows you to specify a field to parse other
    than the default message. For details, see [parse
    field](Parse-field-option.md "Parse field").
* `auto` - automatically detects JSON objects in logs and extracts the
    key/value pairs. See [JSON auto
    option](./03-Parse-JSON-Formatted-Logs.md "Parse JSON Formatted Logs")
    for details.

The following examples use this sample log message:

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

### Supported JSONPath syntax elements

The JSON operator supports the following JSONPath expressions:

|               |                                                                                                                                                    |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| **JSONPath**  | **Description**                                                                                                                                    |
| $             | The root object or element.                                                                                                                        |
| @             | The current object or element.                                                                                                                     |
| . or \[\]     | Child operator.                                                                                                                                    |
| ..            | Recursive descent. JSONPath borrows this syntax from E4X.                                                                                          |
| \*            | Wildcard. All objects or elements regardless of their names.                                                                                       |
| \[\]          | Subscript operator. XPath uses it to iterate over element collections and for predicates. In JavaScript and JSON, it is the native array operator. |
| \[,\]         | Union operator in XPath results in a combination of node sets. JSONPath allows alternate names or array indices as a set.                          |
| \[start:end\] | Array slice operator.                                                                                                                              |
| ()            | Script expression, using the underlying script engine.                                                                                             |

### Special characters

If you have spaces or other special characters like `@` in your property
names you must use bracket notation, `['foo bar']`.

For example, if your name is `@something` you need to use
`['@something']`.

Another example, if your name is `fie@ld` you need to use `[‘fie@ld’]`.

### Case sensitivity

References to specific keys are case sensitive in a standard
JSON operation. For example, if a key name is `sourceIpAddress`  and
you run `| json "sourceipaddress"` the operation will not return results
since it does not match the upper case letters. The correct way is to run
`| json "sourceIpAddress"`.

When using the [auto
option](./03-Parse-JSON-Formatted-Logs.md "Parse JSON Formatted Logs")
the keys are not case sensitive.

### Extracting a single top-level field

The JSON operator allows you to extract a single, top-level field. For
example, to extract `accountId`:

`_index=audit_events | json "accountId" | fields accountId`

produces results like:

![json single key displayed on results
table.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/json-single-key.png)

### Extracting multiple fields

You can also extract multiple fields in a single operation. For example,
to extract `accountId` and `eventName`:

`_index=audit_events | json "accountId", "eventName" | fields accountId, eventName`

produces these results:

![json multiple keys displayed in
results.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/json-multiple-keys-displayed-in-results.png)

In addition, you can assign names to fields that differ from their
original key names. To use `aID` instead of `accountId` and
`eName` instead of `eventName`, you could use the `as` option like this:

`_index=sumologic_audit_events | json "accountId", "eventName" as aID, eName | fields aID, eName`

which gives you these results:

![json rename key
names.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/json-rename-key-names.png)

### Extracting a nested key

The example log message has nested keys, which you can extract by
specifying the path using dot notation:

For example, to extract the nested key `type` from `meta`, use the
following query:

`* | json field=jsonobject "meta.type"`

### Finding values in a JSON array

In some cases, fields values are actually arrays,
like `baselineIntervals` in the example log message:

You can instruct the JSON operator to extract `@baselineIntervals`, like
this:

`* | json field=jsonobject "baselineIntervals"`

It returns a list of the values in the
array:` ["2014-03-10T23:...", ""2014-03-11T05:..."]`.

like this:

![](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/../../../../Assets/Media_Repo_for_Search/json_results_baselineIntervals_332x162.png)

To refer to one specific entry in the array, provide the array's index: 

`* | json field=jsonobject "baselineIntervals[1]"`

**Nested Array**. You can parse from a nested array using the dot
notation.

`_sourceCategory=O365* | json "Actor[0].Type" as Actortype0 | json "Actor[1].Type" as Actortype1`

The result of the query would look like this: 

![ArrayElements.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/ArrayElements.png)

### Using the nodrop option

By default, the JSON operator optimizes results by dropping messages
that do not use the specified key or keys, or messages that use invalid
JSON keys. Use the nodrop option to prevent this optimization, and set
the extracted field values to null (empty):

`* | json field=jsonobject "baselineIntervals[0]" nodrop`

### Using wildcard (\*)

You can use wildcard (\*) to access the array elements in a JSON.  
For example, you can access Actor Type from an O365 JSON message using
wildcard.

![](/)![json wildcard
example.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/json-wildcard-example.png)

`_sourceCategory=O365* | json "Actor[*].Type" as Actortype`

The result of the query would look like this:

![wildcard example
results.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/wildcard-example-results.png)

Next, if required, you can use the array elements to perform additional
operations. For example, you can find the max of Type for a CreationTime
and Id using this query:

`_sourceCategory=O365* | json field=_raw "CreationTime", "Id" | json "Actor[*].Type" as Actortype | extract field=ActorType"(\<Typ\>\d+)" multi | max(type) by CreationTime, Id`

The result would look like this:

![Output](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/MaxOutput.png)

### JSON auto option

Use the **json auto** option in a query to automatically detect JSON
objects in logs and extract the key/value pairs without the need to
specify fields in a parse statement. After the query runs, you can use
the Field Browser to choose the fields you’d like to display. You can
also operate on the extracted fields later in the query.

If you don’t specify any additional fields, the JSON objects are
automatically detected and all of the key/value pairs are extracted.
Note that messages that do not contain JSON are not dropped.

The JSON portion does not need to span the entire log message. There can
be some text before and after the JSON portion. The **json
auto** operator automatically detects where the JSON object is located
and parses it.

For example, in this log message:

    2015-05-04 21:51:43,289 -0700 INFO ["hostId"=stream] ["module"=stream] {"foo":{"bar":"baz"}} ...

The operator automatically detects the JSON object:

`{"foo":{"bar":"baz"}}.`

#### Example

`"{" | json auto`

#### Additional options

**\* \| json auto field=fieldname**

Operates on a specified field. By default, **json auto** will attempt to
extract JSON fields from the entire raw log message. To have it operate
on a different field, use the **field** option.

Example:

`* | json auto field\<myfiel\>`

**\* \| json auto keys**

References specific keys in json. The keys are not case sensitive with
the **auto** option. The keys can be renamed (aliased) using **as**.
Example:

`* | json auto keys \<key\>", \<key\>" as\<field\>,\<field\>`

Use the **refonly** option to extract only the referenced keys. If you
do not use this option, **json auto** will also extract all other JSON
fields in the message.

Example:

`* | json auto keys \<key\>", \<key\>" refonly`

**\* \| json auto maxdepth**

JSON is a hierarchical data structure that can have many levels of
objects and arrays. For example, the following has a depth of four
levels:

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

At depth 1 is the object containing **foo**. At depth 2 is the object
containing **bar** and **baz**. At depth 3 is the array containing two
objects. At depth 4 are two objects containing keys **k1** and **k2**.

Use the **maxdepth** to specify the level at which to flatten the JSON.

The following examples show how the previous sample changes when
maxdepth values are applied:

**json auto maxdepth 1:**

`field: foo value: {"bar": [{"k1": "v1"}, {"k2", "v2"}], "baz": "qux"}`

**json auto maxdepth 2:**

`field: foo.bar value: [{"k1": "v1"}, {"k2", "v2"}]`

`field: foo.baz value: qux`

Example:

`* | json auto maxdepth 2`

`* | json auto extractarrays`

Extracts elements from flat arrays with each element of the array as a
separate key value pair. Non-flat arrays (arrays containing other JSON
objects or arrays) are extracted by default.

Consider this example:

`{"foo": [1,2,3]}`

Without the **extractarrays** option, **json auto** yields

`field: foo value: [1,2,3]`

With the **extractarrays** option, **json auto** yields these
field-value pairs:

`field: foo[0] value: ``1``field``: foo[1] value: ``2``field``: foo[2] value: 3`

#### Important notes

1.  Up to 100 fields are extracted; additional fields must be specified.

2.  The keys are not case sensitive with the **auto** option.

3.  Spaces in field names are automatically reformatted to underscores.

4.  **json auto** works by searching for json blobs beginning at the end
    of the message. Most logs begin with a preamble, such as a
    timestamp, then the json blob. In cases where content appears at the
    end of the message *after* the json blob, the extraction could
    fail.  
      
    Having the json blob at the end of the message is recommended.
    Having it in the middle of the message could cause extraction
    failure.

5.  Fields extracted using json auto need not be referenced explicitly
    in order to be used later in the query. For example, the user does
    not need to do this:

    `* | json auto keys "username" | count by username`

    The user can simply write:

    `* | json auto | count by username`

    We will infer that username must be a field extracted using json
    auto and treat it as such.  
     

6.  The keys extracted from json may contain dots and square brackets.
    Hierarchical entities within json are denoted using dot as the
    separator between different levels. Array indices are specified in
    between brackets. An example extracted field name can be:

        users[2].address.street

    Using this field name later in the query fails since dots and
    brackets are not normally allowed in the field name. To use these
    fields, you may escape the field using the percent sign (%).

    For example, this will not work:

    `* | json auto | count by users[2].address.street`

    But this will:

    `* | json auto | count by %users[2].address.street`

7.  By default, json auto overrides previously extracted fields. To have
    previously extracted fields take precedence, run your queries in
    [Auto
    Parse Mode](../../Get-Started-with-Search/How-to-Build-a-Search/Dynamic_Parsing.md "Dynamic Parsing")
    or explicitly [parse out the
    fields](03-Parse-JSON-Formatted-Logs/...md "Parse Operators") in
    your query.

### UI parse generator

Sumo Logic can generate the parse expression for a specific JSON key for
you. The option is available when viewing your JSON logs in
the **Messages** tab of your Search.

1.  Right-click the key you want to parse and a menu will appear.
2.  Click **Parse selected key  
    ![ui parse selected key
    option.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/ui-parse-selected-key-option.png)**
3.  In the query text box, where ever your cursor was last placed, a new
    parse JSON operation is added that will parse the selected key. For
    example, `| json field=_raw "_BOOT_ID"`.

### Search warning

#### Unable to parse input as json

By default the JSON operator optimizes results by dropping messages that
do not have the fields or keys specified in your query or if the JSON is
invalid. When a message is dropped the user interface provides a warning
message: 

![unable to parse json warning
message.png](../../static/img/Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs/unable-to-parse-json-warning-message.png)

This is only a warning message to inform you that at least one log
returned in the scope of the query did not have a specified key. 

Use the [nodrop](Parse-nodrop-option.md "Parse nodrop option") option to
prevent this optimization. For example, the following query is looking
for the key `event` and it has specified not to drop messages that do
not have this key:

`_sourceCategory="nginx" | json "event" nodrop `

You can remove the warning about the key not being found by specifying
the key(s) you need in the scope of the query, like this:

`_sourceCategory="nginx" "event" | json "event" `

Since `event` is specified in the scope of the query, the json operator
will only get logs that have `event` in them.
