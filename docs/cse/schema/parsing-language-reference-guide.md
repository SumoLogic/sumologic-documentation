---
id: parsing-language-reference-guide
title: Parsing Language Reference Guide
sidebar_label: Parsing Language Reference
description: Parsing is the first step in the Cloud SIEM Enterprise (CSE) Record processing pipeline
---

This topic describes the CSE parsing language, which you can use to write custom parsers.

## What is parsing?

Parsing is the first step in the Cloud SIEM Enterprise (CSE) [Record processing pipeline](/docs/cse/schema/record-processing-pipeline) — it is the process of creating a set of key-value pairs that reflect all of the information in an incoming raw message. We refer to the result of the parsing process as a *field dictionary*. The raw message is retained. 

Parsers are written in a specialized Sumo Parsing Language. The parser code resides in a a parser configuration object. At runtime, parser code is executed by the Sumo Logic parsing engine.

## Key concepts

This section explains a number of concepts that are fundamental to the parsing process.

## Regular expressions

A regular expression, often referred to as a regex, is a sequence of characters that define a search pattern. A regular expression engine compares strings to regular expressions to find matches. Regexes can also be used to extract substrings and bind them to a name, known as a group in a dictionary.

Many CSE parsers rely upon regex exclusively to parse messages. (Sumo Logic Field Extraction Rules also use regex: they parse selected fields from log messages at the time of ingestion.)  Sumo Logic's parsing engine performs top-level, gross format parsing first using compiled built-in formats, and then relies on regular expressions to extract information from irregular or complex formats.

The parser engine uses the [RE2 regular expression library](https://github.com/google/re2/wiki/Syntax). This is important to know because regex syntax varies between implementations. RE2 is a slightly modified version of the standard regular expression libraries that is designed to operate with bounded
execution time.

:::note
For historic reasons, the named groups in the regex of many parsers still uses Python-style notation, for instance `(?P<syslog_timestamp>[^ ]+ +[^ ]+ [^ ]+)`. When you write new regular expressions, you can omit P.
:::

The parser engine also supports Grok, a system that introduces symbolic names for patterns to regular expressions (see also [Patterns](#patterns) section). You reference Grok symbolic names using this pattern:

`%{<pattern_name>:<optional_group_name>}`

The pattern name is replaced with the regular expression associated with that name and the entire result is wrapped with a named group capture.

Grok patterns are used to make the use of complex regular expressions that match particular values, such as IP addresses, clearer and easier
to read.

The list of patterns supported can be found in the local and default config files, and `patterns.conf`.

For example, given a string:

`TEST 123`

and the regex:

`(?<login>\w+) (?<id>\d+)`

we would get back this dictionary: 

`{“login”: “TEST”,  “Id”: “123”}`

You can find a regex debugger at[https://regoio.herokuapp.com/](https://regoio.herokuapp.com/).

:::note
This debugger uses the GoLang RE2 library, but all RE2 libraries are based on the same codebase and it is a sufficient test mechanism.
:::

## Normalizing

Mapping the initial field/value dictionary into a single schema - that is, one fixed set of field names and value formats. In general, our parsers are not intended to normalize log messages when parsing. Instead, the intent is to - as much as possible - preserve the original naming and structure of the log messages.

## Patterns

Patterns are predefined named regular expressions similar to [*Grok*](https://logz.io/blog/logstash-grok/); using them simplifies and speeds the development of regex-based parsers. 

Patterns are stored in `patterns.conf` as `<Pattern Name> = <regex>` key value pairs, for example:

`IPV4 = \d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`

In parsers, you refer to a pattern as `%{<Pattern Name>}`. You can use a pattern anywhere that regex can be used.  You can assign patterns to a
named capture group like this:

`%{<Pattern Name>:<field_name>}`

## Mustache templates

We use the Mustache template system to define string templates. String templates are used to format one or more values into a single new field value.

For more information on Mustache, see [https://en.wikipedia.org/wiki/Mustache_(template_system)](https://en.wikipedia.org/wiki/Mustache_(template_system)).

### Whitespace removal

By default, whitespace at the beginning and end of a message is removed before parsing.

Whitespace at the beginning and end of a parsed value is also removed. Use the [STRIP_WHITESPACE](#strip_whitespace) attribute to enable or disable whitespace removal.

### Implicit anchoring

Regular expressions are **always** anchored to the front of the string. Keep this in mind when constructing regexes. If an expression doesn’t target the beginning of the string, or the anchoring isn’t compensated for, the expression will fail.

Applying a caret at the beginning of the expression is accepted, but essentially ignored.

If you add an end anchor to a regex, the regex will be flagged as illegal.

### Initial parsing based on FORMAT attribute

Each stanza can define a FORMAT attribute for the message or string it is parsing. This results in a gross parse, populating the field dictionary in an appropriate way.

### REGEX parsing

This is the default value of the [FORMAT](#format) attribute. With this setting, the message is parsed using the regex defined by the [REGEX](#regex) attribute.

A stanza that contains FORMAT = REGEX, must also contain a REGEX attribute, otherwise, it will perform no parsing. 

Capture groups names in the regex you define with the [REGEX](#regex) attribute can contain any character except close brackets. This includes spaces, however the use of spaces in capture group names are not recommended unless there is a very good reason for using them. For example:

`REGEX = (?P<This is a valid capture group name>.*)`

`REGEX = (?<This_Is_Better>.*)`

Although Java supports backtracking and possessive sequences as well, their use is discouraged in parsers, as they are extremely inefficient.

`REGEX = (?P<example>.++)`

### JSON parsing

JSON is parsed and flattened. Fields of sub-objects are prepended with the containing field name and separated with periods. For example,

| This JSON                                     | Results in                                                    |
|:-----------------------------------------------|:---------------------------------------------------------------|
| `{“foo”: {“bar”: 2, “barrier”: 3}, “baz”: 4}` | `foo.bar = 2             foo.barrier = 3             baz = 4` |

List items have a one-based index number inserted between the containing field name and the sub-object field names. For example,

| This JSON                                              | Results in                                                                                    |
|:--------------------------------------------------------|:-----------------------------------------------------------------------------------------------|
| `{“foo”: [{“bar”: 1, “baz”: 2}, {“bar”: 3, “baz”: 4}]` | `foo.1.bar = 1             foo.1.baz = 2             foo.2.bar = 3             foo.2.baz = 4` |

By default, an index number is inserted, even in a single element list. For example, 

| This JSON                       | Results in            |
|:---------------------------------|:-----------------------|
| `{“test”: [{“field”:”value”}]}` | `test.1.field: value` |

However, if you set the JSON_FLATTEN_SINGLE_LISTS flag to true, an index value *is not* inserted in the single element list. This is useful for collapsing redundant JSON elements from sources like AWS.

When JSON_FLATTEN_SINGLE_LISTS is true:

| This JSON                       | Results in           |
|:---------------------------------|:----------------------|
| `{“test”: [{“field”:”value”}]}` | `test.field: value,` |

### CSV parsing

Parses delimiter separated values, commas by default. You can set another delimiter character, using the [FIELD_DELIMS](#field_delims) attribute.

### XML parsing

Parses and flattens XML.

### CEF parsing 

Parses CEF format messages. In the parsing process, we unpack custom fields in a CEF message. CEF custom fields are held in two fields: one holding a field name and another holding the value. Our CEF parsing creates a new single field whose name and value come from the CEF custom fields, and discards those fields.

### LEEF parsing

Parses LEEF format logs.

### WINDOWS_XML parsing

Parses Windows XML messages from CSE Windows Sensor. 

## Mapping hints

After parsing, the next step in the CSE Record processing pipeline is log mapping, which is the process of mapping fields that were parsed out of messages to CSE schema attributes. 

Every parser must provide *mapping hints* that provide information CSE can use to select the correct log mapper for parsed messages. You do this with the MAPPER attribute. For more information, see [MAPPER](#mapper).

### Internal temporary variables supported in parsers

#### _$log_entry

At the start of parser execution, `_$log_entry` contains the value of the entire message being parsed. Within a transform stanza, `_$log_entry` represents the value being processed by a transform. When you are applying a transform to a field, you can use `_$log_entry` to refer to the value of the current parsed field.

#### _$log_entry_field

The field that the parser is transforming. The value of `_$log_entry_field` is updated each time a transform is applied to a field because temporary fields aren’t stripped from field dictionaries until after all parsing is complete, causing the `_$log_entry_field` to be overwritten by that transform’s
`_$log_entry_field`.

#### Excluding variables from field dictionary

You can declare your own variables in a parser. To ensure that a variable is not included in the field dictionary that results from the parsing process, prefix the variable name with `_$`, for example:

`_$my_variable`

## Parsing fields

Messages are parsed to create a dictionary of field values, a start time, and an end time.

When choosing a field name, avoid using non-alphanumeric characters unless that goes against the conventional practice or a well-known name. For instance, in PAN-firewall parser there is a field named `X-Forwarded-For`. That name was selected after the well-known protocol header. Any other name would not be as easily recognized. But, whenever possible, it’s preferable to stick with alphanumeric names so that they won’t need quoting when they are used in Sumo Platform features, such as Sumo Logic core platform log and metric queries, action templates, and dashboards.

Field names beginning with `_$` (underscore followed by the dollar sign) aren’t saved in the field dictionary, but can be used to pass values from one part of the parsing process to another (from a parser to a transform, for instance).

:::note
The key principal: When selecting a name for the field, stay as close to the name well known in the industry for the corresponding source.
:::

### Timestamps and time handling

The `_starttime` and `_endtime` fields are normally assigned values using [START_TIME_FIELD](#start_time_field) and [END_TIME_FIELD](#end_time_field).  Note that if none of
[DEFAULT_START_TIME](#default_start_time),  [DEFAULT_END_TIME](#default_end_time), START_TIME_FIELD or END_TIME_FIELD are defined `_starttime` and `_endtime` will not be included in the field dictionary.

If `_starttime` is defined (at minimum, `START_TIME_FIELD` has been specified in the parser), it will be used as the Record timestamp. If `_starttime` is not defined, the timestamp should be set by the CSE log mapper that processes the Record, typically by mapping a parsed field to the `timestamp` schema attribute.

### Representation of “no value”

The representation of no value or a field that doesn’t exist is ‘None’ for evaluating variable transforms; JSON uses “null” if [JSON_DROP_NULLS](#json_drop_nulls) is set to false or not present, and drops them if so.

## Stanzas

Parser definitions are organized into stanzas. A stanza consists of a type declaration, consisting of a keyword and a name, followed by a series of attributes that function much like commands in a scripting language, except that each command is uniquely keyed. 

There are three types of stanzas:

* **parser**—Defines the entry point for the overall parser and contains attributes that control the overall execution of the parser. A parser contains one and only one parser stanza. The syntax for declaring a parser stanza is:  `[parser]`

    `parser` is the only stanza keyword that can only appear once in a parser definition.    

* **transform**—A transform stanza is analogous to a function in most scripting languages. Transforms can be invoked on a log message as a whole with all currently parsed fields accessible within the new transform, or on strings that have been parsed from a message without the currently parsed fields.      You can use transforms to extract information of interest using regex patterns, assign values to variables, drop fields, rename fields, populate time fields, create mapping hints, and more.  One transform can even call another. You can use transforms to perform a wide variety of parse actions; the most common use is extracting a value from log message. The syntax for declaring a transform stanza is:      `[transform:<transform name>]`

* **dependencies**—You can use a dependencies stanza to include resources from another parser, using the [INCLUDE](#include) attribute. The syntax for declaring a dependencies stanza is:      `[dependencies]`

    Stanza types must be lower case. It is recommended but not required that transform names be lower case.  For example,

    `[transform:<transform name>]`

    References to transform names in attributes are case sensitive. The case in the reference must match the case used in the transform name.

    Transform names are limited to alphanumeric characters, the dash (-) and the underscore (_).

### Specifying attributes

* All attribute names must be uppercase.
* Attribute names are limited to alphanumeric characters, the dash (-) and the underscore (_). 
* All attributes that take assignments must use an equal sign (’=’) between name and assignment. For example, `FORMAT = REGEx`

### Attribute overriding

Attributes with the same key override each other. For example, given:

`TRANSFORM = Cylance_Parse TRANSFORM = Cylance_Factor`

We apply only the second [TRANSFORM](#transform) attribute.

You can add labels to duplicate transforms to avoid overriding. A label is text appended to the attribute, separated by a dash. A label can be any string that doesn’t contain an equals sign. For example,

`TRANSFORM-parse = Cylance_Parse TRANSFORM-factor = Cylance_Factor`

With the labels added, we’ll apply both TRANSFORM attributes.

### “r\|” Syntax

With certain attributes, you can apply `r|` syntax, in place of an explicit field name. The attribute is applied to all fields of the field dictionary with a name that matches the regex following the `r|`. For example:

`DROP:r|^\d+$`

Would remove all the fields whose names are numbers from the field dictionary .

You can apply `r|` syntax to these attributes:

* TRANSFORM
* FIELD_TYPE
* JOIN_LIST
* DROP

### Field binding

Attempts to access the value of a field created by parsing must follow the parsing. Attempts to access the value of a field that has not been set will produce an error.

### Includes

You can include resources from another parser using a \[dependencies\] stanza. In that stanza only, you can add  

`INCLUDE:/Parsers/path/to/parser = true`

The specified resource’s transforms will be available to the current parser. 

## Attributes used in all stanza types

### ADD_VALUES

If true, when parsing produces a value for the same field more than once, append the second and subsequent values to the field. If false, replace the value of the field. This only is applied from the `[parser]` stanza or a transform on a field, but is applied to any other transforms the field dictionary is passed to.

For example, if parsing produces two values for `fielda`, “monkey” and “business”, the value of `fielda` will be set to \["monkey", "business"\]

**Syntax**

`ADD_VALUES = <true|false>`

**Default**

false

**Example**

`ADD_VALUES = true `

### ALIAS

Creates a read-only reference between `alias_field_name` and `old_field_name.`

**Syntax**

`ALIAS:<old_field_name> = <alias_field_name>`

**Default**

None

**Notes**

* `<old_field_name>` and `<new_field_name>` are required.
* If the value of `<old_field_name>` is None, the alias will not be created.

### CASE

If `<read_field>` from the [CASE_SWITCH](#case_switch) attribute equals `matched_value`, sets field to `set_value`. 

**Syntax**

`CASE:<matched_value> = <set_value>`

**Example**

Assume an incoming message that contains a ‘severity’ field that stores severity as one of three words: high, medium and low. But we want to store a normalized severity value as an integer ranging from 0 to 9. We might use a CASE_SWITCH statement paired with a list of CASE statements to perform the mapping.

`CASE_SWITCH:normalized_severity = severity CASE:High = 9 CASE:Medium = 4 CASE:Low = 0`

### CASE_SWITCH

Sets `<field>` to the value specified in the CASE statement if `<read_field>` is set to the value specified there.

**Syntax**

`CASE_SWITCH:<field> = <read_field>`

### CLEAR

Clears the field value of the fields whose values match the specified regex.

**Syntax**

`CLEAR:<field_name> = <regex>`

`<field_name>` and `<regex>` are required.

### COPY_FIELD

Copies the value of one field to another field.

**Syntax**

`COPY_FIELD:<target_field_name> = <source_field_name>`

`<source_field_name>` and `<target_field_name>` are required

**Default**

none

### DEFAULT_END_TIME

Value is used in various ways depending on the [END_TIME_HANDLING](#end_time_handling) attribute.

**Syntax**

`DEFAULT_END_TIME = <time>`

**Default**

none

### DEFAULT_START_TIME

This value is used in various ways, depending on the value of the [START_TIME_HANDLING](#start_time_handling) attribute.

**Syntax**

`DEFAULT_START_TIME = <time>`

**Default**

none

### DROP

Drops one or more fields from a message, or drops an entire message. Fields that are dropped will not be included in the dictionary of key-value pairs that the parser extracts from a message. Messages that are dropped will not be forwarded to CSE (effectively `overriding _siemForward=true` configured on the collector).

:::tip
Dropping is useful for getting rid of temporary fields that may collide with later uses.
:::

**Syntax**

`DROP:[<field_name>] = <true|false|empty|regex>`

where:

* true - Always drop.
* false - Never drop.
* empty - Drop if the field has no value.
* regex - Drop if the field’s value matches the regex. (The regex doesn’t support `r|` syntax.)

If `<field_name>` is not supplied, the entire message will be dropped, no fields will be parsed from the message.  

`r| `syntax can be used in `<field_name>`.

**Default**

True 

**Examples**

* The example below drops all fields in the message stat start with “blah”.
    `DROP:r|^blah.* = true `
* The example below drops the `request_url` field if the field value matches the regex `\-` (the field begins with a dash character. 
    `DROP:request_url = \-`    
* The example below drops the variable whose name is `_log_entry`.
    `DROP:_log_entry = true`

### END_TIME_FIELD

The name of the field that contains the end time for the event.

**Syntax**

`END_TIME_FIELD = <field>`

**Default**

None

**Notes**

To allow for messages that don’t contain the specified field, set the value of END_TIME_HANDLING to "DURATION", and set DEFAULT_END_TIME to a value in milliseconds. _endtime  will be populated with a timestamp that is result of adding the duration you defined to _starttime.

### END_TIME_HANDLING

Specifies how to treat the value of  `_endtime`, which can be set using either [END_TIME_FIELD](#end_time_field) or [DEFAULT_END_TIME](#default_end_time).

**Syntax**

`END_TIME_HANDLING = <GIVEN|ROUND|DURATION|CONSTANT>`

**Default**

GIVEN

**Notes**

* If GIVEN, ignore [DEFAULT_END_TIME](#default_end_time), end time defaults to start time.
* If ROUND, round start down and end up using DEFAULT_END_TIME as the rounding increment in milliseconds, end time defaults to start time.
* If DURATION, treat DEFAULT_END_TIME as a time increment in milliseconds, add to start time to get the default end time; if missing, end time defaults to start time.
* If CONSTANT, treat DEFAULT_END_TIME as a POSIX timestamp, add to start time to get the default end time; if missing, end default to start.
* ROUND and DURATION can also be set to the strings MINUTE, HOUR, DAY, and WEEK, which will result in the appropriate number of milliseconds being used.

### FIELD_PREFIX

Prefix all field names added by subtransforms of this transform on
fields with a string computed from a mustache template - the template is
supplied the list of field names and values. 

**Syntax**

`FIELD_PREFIX = <mustache template>`

**Default**

none

**Example**

* This example prefixes the fields added by subtransforms with “Response_0”, if the `_$match_count` field is set to 0.      
    `FIELD_PREFIX = Response_{{_$match_count}} `

### FIELD_SUFFIX

Suffix all field names added by subtransforms of this transform on fields with a string computed from a mustache template - the template is supplied the list of field names and values. 

For example, `Response_{{_$match_count}}` would set the field named `Response_0` if the `_$match_count` field was set to 0.

**Syntax**

`FIELD_SUFFIX = <mustache template>`

**Default**

none

**Example**

* This example adds the suffix “Response_0” to fields added by subtransforms, if the `_$match_count` field is set to 0.
    `FIELD_SUFFIX = Response_{{_$match_count}} `

### FIND_REPLACE

Find and replace a specified field (or fields, if `r|<some regex>` is used). You can use a Mustache template to obtain fields from the field dictionary, or take fields from the capture using `$<capture number>`.

**Syntax**

`FIND_REPLACE:<field>:<replacement_string> = <regex>`

**Example**

Given a field `example` whose value is “1” and a field `some_field` whose value is “(some).(thing)”

`FIND_REPLACE:some_field:$1{{example}} = \(([^)]+)\)`

Will set `some_field` to `some1.thing1`.  
 

### FORMAT

Specifies the format of the messages being parsed.

**Syntax**

`FORMAT = <format_type>`

Where `<format_type>` is one of: 

* [REGEX](#regex-parsing)
* [CSV](#csv-parsing)
* [JSON](#json-parsing)
* [XML](#xml-parsing)
* [WINDOWS_XML](#windows_xml-parsing)
* [CEF](#cef-parsing)
* [LEEF](#leef-parsing)

**Default**

REGEX

### ITER_PREFIX

Equivalent to [FIELD_PREFIX](#field_prefix), but  ITER_PREFIX will only prefix fields added by a [REPEAT_MATCH](#repeat_match) subtransform but specifically applied for REPEAT_MATCH regex transforms. `_$match_count` is set to the current iteration in this case.

:::tip
A subtransform performs the process of modifying fields within a transform stanza. An example of this is using ITER_PREFIX and/or ITER_SUFFIX within a regex transform and `REPEAT_MATCH=true`, to include, for example, `_$match_count` in field names output.
:::

**Syntax**

`ITER_PREFIX = <mustache template>`

**Default**

none

### ITER_SUFFIX 

Same as FIELD_SUFFIX, but specifically applied for [REPEAT_MATCH](#repeat_match) regex transforms. `_$match_count` is set to the current iteration in this case.

**Syntax**

`ITER_SUFFIX = <mustache template>`

**Default**

none

### JOIN_LIST

Joins a list created by [ADD_VALUES](#add_values) with the separator mentioned. If the field doesn’t exist, the event is treated as unparsed. Parsing will fail will fail and the parser will deal with that appropriately. If this occurs in a top level stanza, the parser returns a failure. If it occurs in a cascade of transforms, we proceed to the next stanza.

**Syntax**

`JOIN_LIST:<field_name> = <separator>`

`r|` syntax can be used here.

**Default**

`_$log_entry`

**Example**

* When the values in a list created by [ADD_VALUES](#add_values) for `fielda` are “monkey” and “business”, this attribute statement would set the value of `fielda` to “monkey.business”:
    `JOIN_LIST:fielda = .`

### MAPPER

Provides information that tells CSE which log mapper should process the parsed message. There are two ways to do that: 

* Specify the log mapper UID.  If `MAPPER:uid` is specified with other MAPPER fields, mapping lookup will be performed by uid. 
* Specify the `product`, `vendor`, and `event_id `for the message. (All three attributes are required.) Templating is allowed for each value. However, the most common and best practice is to define `vendor` and `product` using static strings, for example:
  * `MAPPER:vendor = AWS`
  * `MAPPER:product = Inspector`

  Templating is more typically used to define `event_id`, as event identifiers often vary based on the log type. For example:
    * `MAPPER:event_id = {{eventType}}-{{eventName}}`

:::note
Looking up a mapper using `product`, `vendor`, and `event_id` will return all [structured mappings](create-structured-log-mapping.md) that are configured with the same attribute values, and could result in more than one Record being created. 
:::

**Syntax**

`MAPPER:<type> = <value>`

Where type is one of:

* uid - the uid of the mapper.
* event_id - the event_id. 
* product - the product. 
* vendor - the vendor. 

**Example** 

```
[parser]
FORMAT=JSON
MAPPER:vendor = AWS
MAPPER:product = CloudTrail
MAPPER:event_id = {{eventType}}-{{eventName}}
```

### PARSE

Applies the parser specified to the field specified, similar to [TRANSFORM](#transform).

**Syntax**

`PARSE:<field> = <parser path>`

### PARSE_CASCADE

Behaves like [TRANSFORM_CASCADE](#transform_cascade), but with parsers instead of transforms. 

Each parser is invoked in the order listed until one succeeds. Each parser is passed the current state of the field dictionary. Only a successful parse will change the field dictionary.

If none of the parsers succeed then that is treated as a parse failure.  
 

**Syntax**

`PARSE_CASCADE:<field_name> = <parser path>, <parser path>...`

### RENAME_FIELD

Renames a field. If the value of the field to be renamed `<new_field_name>` is NULL, the field will not be renamed, and the field
`<old_field_name>` will be dropped.

**Syntax**

`RENAME_FIELD:<new_field_name> = <old_field_name>`

`<old_field_name>` and `<new_field_name>` are required

**Default**

None

**Example**

* This example calls the transform "cs1 Transform" and only performs the transform if fields `cs1` and `cs1Label` fields are defined. It renames the field name `cs1` to the value associated with `cs1Label`, and removes the `cs1Label` field from the field dictionary.

```
TRANSFORM_IF_PRESENT:cs1,cs1Label = cs1 Transform

[transform:cs1 Transform]
RENAME_FIELD:{{cs1Label}} = cs1
DROP:cs1Label = TRUE
```

Before transform:

`cs1 = "SomeValue" cs1Label = "SomeLabel"`

After transform:

`SomeLabel = "SomeValue"`

### REPLACE_LIST_WITH_ELEMENT

Sets the `<field_name>` field if it is a list to the `<index>` element in that list, starting from 0. If this element does not exist, the event is treated as unparsed.

**Syntax**

`REPLACE_LIST_WITH_ELEMENT:<field_name> = <index>`

### REVERSE_LIST

Reverse a list created by [ADD_VALUES](#add_values) in the `<field_name>` field. The `<anything>` field is currently ignored. If the field doesn’t exist, the event is treated as unparsed.

**Syntax**

`REVERSE_LIST:<field_name> = <anything>`

### SET

Creates a field with an associated value. If the field already exists, SET overwrites the previous value.

**Syntax**

`SET:<field> = <string>`

The field name is treated as a Mustache template if it contains two curly braces ‘{{‘. The template can access any field dictionary fields that have been parsed prior to this instruction. 

**Default**

none

**Examples**

* The example below creates a field `_temp_field` with the value of `_$log_entry_field`.
    `SET:_temp_field = {{_$log_entry_field}}`

* The example below creates a field with the value “DHCP lease”.
    `SET:Message = DHCP lease`

### SPLIT_LIST_AT_ELEMENT

Splits a list created by `ADD_VALUES` in the `<field_name>` field at the specified index under the name `<field_name>_2`.

If the field is not a list and the index is not 0, or the index is beyond the length of the list, the event is treated as unparsed.

**Syntax**

`SPLIT_LIST_AT_ELEMENT:<field_name> = <index>`

**Example**

* When the values in a list created by [ADD_VALUES](#add_values) for `fielda` are  “monkey”, “business”, “cat”, and “nap”, this attribute statement would set the value of `fielda` to “monkey business” and set the value of `fielda_2` to “catnap”.      `SPLIT_LIST_AT_ELEMENT:fielda = 2`

### START_TIME_FIELD

The name of the field that contains the start time for the event. For more information, see [Timestamps and time handling](#timestamps-and-time-handling).

**Syntax**

`START_TIME_FIELD = <field>`

**Default**

StartTime

**Notes**

If the field does not exist in a message, time is not set for the message.

### START_TIME_HANDLING 

Specifies how to treat the value of `_starttime`, which can be set using either [START_TIME_FIELD](#start_time_field) or  [DEFAULT_START_TIME](#default_start_time).

**Syntax**

`START_TIME_HANDLING = <GIVEN|ROUND|CONSTANT>`

**Default**

GIVEN

**Notes**

* If GIVEN, ignore DEFAULT_START_TIME, start time defaults to current time on parsing machine
* If ROUND, round start down using DEFAULT_START_TIME as the rounding increment in milliseconds, start time defaults to current time on parsing machine
* If CONSTANT, treat DEFAULT_START_TIME as an ISO 8601 or a UNIX timestamp, set start time to this time; if missing, start time defaults to current time on parsing machine
* If ROUND can also be set to the strings MINUTE, HOUR, DAY, and WEEK, which will result in the appropriate number of milliseconds being used.

### STRIP_FIELDS 

Strips whitespace from the beginning and the end of field values at
parse time.

**Syntax**

`STRIP_FIELDS = <true|false>`

**Default**

true

### STRIP_WHITESPACE

Strips whitespace from the beginning and end of a message before parsing. Also strips whitespace from the beginning and end of a parsed value. 

**Syntax**

`STRIP_WHITESPACE = <true|false>`

**Default **

true

### TIME_PARSER 

Supplies time formats to be used in parsing the fields specified by [START_TIME_FIELD](#start_time_field) and [END_TIME_FIELD](#end_time_field). 

The values parsed are assigned to `_starttime` and `_endtime`.

**Syntax**

`TIME_PARSER = <time format 1>, <time format 2> ...`

**Default**

None

**Notes**

The time formats are specified as in [Java DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html). If a format contains a comma, enclose it in double quotes. There are some special additional cases:

* X1 treats the time as if it’s in epoch seconds.
* X1000 treats the time as if it’s in epoch milliseconds.

The formats will be tried in the order they are specified until one of them succeeds.

### TIMEZONE

Use this attribute to specify the timezone where the messages originated. 

**Syntax**

`TIMEZONE = <string>`

**Default**

UTC

**Example**

`TIMEZONE = America/Los_Angeles (PST)`

**Notes**

Time zones are described either using the IANA time zone database names, using ISO-8601 style, as in ‘+07:00’, or one of the following = ‘local’,
‘utc’, ‘UTC’.

For IANA time zone database names, see [https://en.wikipedia.org/wiki/Tz_database](https://en.wikipedia.org/wiki/Tz_database). The basic format is area/location. 

* Area is a continent, an ocean, or “Etc”. For example, Africa, America, Antarctica, Arctic, Asia, Atlantic, Australia, Europe, Indian, Pacific.

* Location is the name of a specific location within the area – usually a city or small island. For example, Costa_Rica, New_York, Los_Angeles

### TRANSFORM

Apply the transform to the specified field, or the log entry with the field dictionary passed through if none is specified.

**Syntax**

`TRANSFORM:<field_name> = <transform_stanza_name>`

**Default**

If `<field_name>` isn’t specified, the field dictionary is passed through instead of the field. The current log entry will be used for parsing, and any fields currently added in the field dictionary will be accessible from the next transform. 

**Notes**

`r|` syntax can be used here.

### TRANSFORM_ALL

Applies `<transfer_stanza_nam>` stanza to all fields (that have already been parsed or created by SET) that match the regular expression.

Like any other transform statement, TRANSFORM_ALL uses the parsing of the transform it's attached on the log entry or field, but it repeatedly tries to match the regex associated with the transform, starting from the last point the previous attempt finished, applying all the other parse actions associated with the transform on each successful parse.

For example, this:

```
TRANSFORM_ALL = Blah
[transform:Blah]
REGEX = (?P<_$match>[^,]+),?
TRANSFORM:_$match = Some_Other_Transform
```

it would apply `Some_Other_Transform` to all fields separated by commas.
This is used for complicated parsing use cases, usually involving
setting prefixes for recurring segments of elements. For example, if you
had:

`Prefix::Key:Value,Key2:Value2;Prefix2::Key:Value,Key2:Value2;...`

You could do this to extract the values with the appropriate prefix:

```
TRANSFORM_ALL = Blah
...
[transform:Blah]
REGEX = (?P<_$prefix>[^:]+)::(?P<_$match>[^;]+);?
FIELD_PREFIX = {{_$prefix}}_
TRANSFORM:_$match = Some_Other_Transform
[transform:Some_Other_Transforrm]
REGEX = (?P<_$FIELD_1>[^:]+):(?P<_$VAL_1>[^,]+),?
REPEAT_MATCH = true
```

**Syntax**

`TRANSFORM_ALL:<field_name> = <transform_stanza_name>`

### TRANSFORM_CASCADE

Iterates through a list of transforms and applies them to the specified field until one of them successfully parses or it runs out of transforms to apply. If it runs out of transforms to apply, that counts as a parse failure.

**Syntax**

`TRANSFORM_CASCADE:<field_name> = <transform name 1>,<transform name 2>,..`

**Default**

If `<field_name>` isn’t specified, the field dictionary is passed through instead of the field. The current log entry will be used for parsing, and any fields currently added in the field dictionary will be accessible from the next transform.

If the default field is used, the colon delimiter is not necessary. The syntax is then:

`TRANSFORM_CASCADE = <transform>,<transform>,..`

### TRANSFORM_FIELD_IF_PRESENT

If the specified field exists (has been created with [SET](#set), or parsed from message), call the `transform_stanza_name`, using `<field_name>` as input.

**Syntax**

`TRANSFORM_FIELD_IF_PRESENT:<field_name> = <transform_stanza_name>`

### TRANSFORM_IF

Compares a field value that has already been parsed or created by a [SET](#set), or the current log entry if no field is specified, to a regex and if the value matches, runs the specified transform on the field specified by `<field_name>` or the log entry with the field dictionary passed through.  

**Syntax**

`TRANSFORM_IF:<field_name>:<regex> = <transform_stanza_name>`

**Default**

If `<field_name>` isn’t specified, the field dictionary is passed through instead of the field. The current log entry will be used for parsing, and any fields currently added in the field dictionary will be accessible from the next transform.

### TRANSFORM_IF_ELSE

Compares a field value or the log entry if none is supplied to a regex, and if the value matches, runs the first of the two specified transforms with `<field_name>` (or the log entry by default) as input. If the value doesn't match the regex, the second specified transform is run.

**Syntax**

`TRANSFORM_IF_ELSE:<field_name>:<regex> = <transform_success>, <transform_failure>`

**Default**

If `<field_name>` isn’t specified, the field dictionary is passed through instead of the field. The current log entry will be used for parsing, and any fields currently added in the field dictionary will be accessible from the next transform.

### TRANSFORM_IF_NOT_PRESENT

If the specified field is not part of the field dictionary, run `transform_stanza_name` with the field dictionary as input.

**Syntax**

`TRANSFORM_IF_NOT_PRESENT:<field_name> = <transform_stanza_name>`

### TRANSFORM_IF_PRESENT

If the specified field exists (has been created with [SET](#set), or parsed from message) run `transform_stanza_name` with the log entry as input and the field dictionary passed through. 

**Syntax**

`TRANSFORM_IF_PRESENT:<field_name> = <transform_stanza_name>`

### TRIM

Trims any characters specified in `<characters to trim>` from either end of the contents of the field (or fields if `r|<some regex>` is used) specified. The characters `[` and `]` should be escaped; treat `<characters to trim>` like a `[]` group in a regex. 

**Syntax**

`TRIM:<field> = <characters to trim>`

### TRIM_RIGHT

Like [TRIM](#trim), but only trims characters at the end of the string.

**Syntax**

`TRIM_RIGHT:<field> = <characters to trim>`

### TRIM_LEFT

Like [TRIM](#trim), but only trims characters at the beginning of the string.

**Syntax**

`TRIM_LEFT:<field> = <characters to trim>`

### VARIABLE_PARSE

Behaves like [VARIABLE_TRANSFORM](#variable_transform), but with parsers instead of transforms.

**Syntax**

`VARIABLE_PARSE:<type value> = <parser path>`

### VARIABLE_PARSE_INDEX

Behaves like [VARIABLE_TRANSFORM_INDEX](#variable_transform_index-syntax-1), but with parsers instead of transforms.

**Syntax**

`VARIABLE_PARSE_INDEX:<field-to-parse_name> = <field_name1>, <field_name 2>...`

Where:

`field-to-parse_name = log entry`

### VARIABLE_TRANSFORM

Defines one of the transforms to select from in a variable transform group. This clause always follows a [VARIABLE_TRANSFORM_INDEX](#variable_transform_index-syntax-1) clause or another VARIABLE_TRANSFORM. 

**Syntax**

`VARIABLE_TRANSFORM:<type value> = <transform name>`

If a VARIABLE_TRANSFORM is selected (see [VARIABLE_TRANSFORM_INDEX](#variable_transform_index-syntax-1)  for details), it is applied to the passed value. 

`<type value>` is a string with two special values: "default" and "none".

**Default**

"none"

**Special cases**

If `<type value>` is "default", the associated transform is applied, if no other VARIABLE_TRANSFORM clause’s `<type value>` matches the indexed field’s value.

The VARIABLE_TRANSFORM with `<type value>` of "none" is applied if the index field does not exist or has an undefined value.

Using the "default" transform and the "none" transform together without any other VARIABLE_TRANSFORM clauses is a common way to perform an action based on whether a field exists.

**Examples**

```
[transform:Parse Logs]
VARIABLE_TRANSFORM_INDEX = event.event_type_id
VARIABLE_TRANSFORM:1 = Parse Logs_Event Type 1
VARIABLE_TRANSFORM:2 = Parse Logs_Event Type 2
VARIABLE_TRANSFORM:3 = Parse Logs_Event Type 3
```

### VARIABLE_TRANSFORM_INDEX (syntax 1)

Selects which transform from a variable transform group to apply based on the value(s) of the specified field(s) known as index field(s). 

Applicable to FORMAT = CSV only.

**Syntax**

`VARIABLE_TRANSFORM_INDEX:<field-to-parse_name> = <int>, <int>, …`

Where:

`<int>, <int> …` specify the list of field indexes (with zero being the first field) used to select fields. The values of those fields are concatenated using "-" as the separator; then the result is used to find the correct VARIABLE_TRANSFORM by its `<type value>`. The transform is applied then to `field-to-parse-name`. That completes the execution of the transform group.

If `<field-to-parse_name>` isn't specified it defaults to checking the log entry and passing through. 

### VARIABLE_TRANSFORM_INDEX (syntax 2)

Selects which transform from a variable transform group to apply based on the value(s) of the specified field(s) known as index field(s).

**Syntax**

`VARIABLE_TRANSFORM_INDEX:<field-to-parse_name> = <field_name1>, <field_name 2> …`

`<field-to-parse_name>` defaults to `_$log_entry`.

`<field_name 1>, <field_name 2> …` specify the list of fields whose values are used to choose which variable transform to execute. The values are concatenated using "-" as the separator; then the result is used to find the correct VARIABLE_TRANSFORM by its `<type value>`. That transform is applied then to `field-to-parse_name`. That completes the execution of the transform group.

**Example**

`VARIABLE_TRANSFORM_INDEX = ID`

### WRAPPER

Always applied first, before the [FORMAT](#format) is applied. Applies the transform to the current log entry, then replaces the current log entry with a `_$log_entry` field created by the transform.

**Syntax**

`WRAPPER = <Transform name>`

### ZIP

Takes keys and values in separate fields from a JSON event and combines them together into proper key-value pairs with the specified prefix. There are two separate methods to do this, regex (specified by r\|) and non-regex. 

**Syntax**

`ZIP\<ke\>\<value\> =\<prefix or %s template\>`

**Non-regex method**

The non-regex method is simple, but isn’t always sufficient.. For example, this example:

`ZIP:<key>:<value> = <prefix or %s template>`

Will convert `test_key_1 = x, test_val_1 = y` into `testPrefix_x = y`, but won’t handle internal lists properly, for example, `test_key_1_1`. This is not supported because it makes assumptions about how those lists are formatted.

**Value templating methods**

There are two ways you can specify the value template: using a mustache template and a separate formatting method that uses `%s` to define where the name of the field will go. For example,  

`ZIP:test_key:test_val = {{sampleField}}_%s_testSuffix`  

Will convert `test_key_1 = x, test_val_1 = y, sampleField = something` into `something_x_testSuffix = y`.

**r\| regex handling**

Regex that starts with `r|` syntax has certain requirements that regular regex does not. Specifically, you must specify a capture group, `_$INDEX`, which is an index shared by the key field and the value field. You can specify `_$LIST_INDEX` to support lists, but they must always be an integer. These parsed fields are not added to the field dictionary. For example,  

`ZIP:r|^test_key(?P<_$INDEX>.*):r|^test_key(?P<_$INDEX>_?[^_]*)(_(?P<_$LIST_INDEX>.*)) = testRegexPrefix_`  

Will successfully convert `test_key_1 = x, test_val_1_1 = y, test_val_1_2 = z, test_val_1_4 = a` into `testRegexPrefix_x_1 = y, testRegexPrefix_x_2 = z, testRegexPrefix_x_4 = a`.

Note that not every position needs to be defined.

**Passing capture groups from the key**

Any capture groups from the key can also be passed into the templates of the value. For example:

`ZIP:r|^events\.(?P<_$INDEX>(?P<_$event_count>\d++\.)?+parameters\\.(\d++\.)?+)name.*:r|^events\.(?P<_$INDEX>(\d++\.)?+parameters\\.(\d++\.)?+)[^n\.]([^\.]*+\.(?P<_$LIST_INDEX>.*+))?+ = events.{{_$event_count}}`

Will convert `events.1.parameters.1.name = x, events.1.parameters.1.value = y into events.1.x = y`. This is useful for lists of elements that themselves are numbered.  

**Mixing and matching regex and non-regex formats**

You can mix and match these formats. That is advisable because the non-regex format is more performant. The `_$INDEX` capture group in a regex match will need to match all characters after the non-regex field. The following example behaves just like the previous one:

`ZIP:test_key:r|^test_key(?P<_$INDEX>_?[^_]*)(_(?P<_$LIST_INDEX>.*)) = testRegexPrefix_`

### ZIP_NO_DROP

Behaves exactly like [ZIP](#zip), but doesn’t drop the fields afterwards.

**Syntax**

`ZIP_NO_DROP:<key>:<value> = <prefix or %s template>`

**Default**

The default value for \<ke\>` is `_$log_entry`

## Attributes Specific to REGEX Format

### EVENT_MULTILINE 

If true, parsing does not stop when a `\n` delimiter is encountered. `EVENT_MULTILINE` makes `.*` match `\n` when set to true, and also makes `^` and `$` match the start and end of a line (`\n`).

**Syntax**

`EVENT_MULTILINE = true | false`

**Default**

false

### REGEX

Parses messages using regex.

**Syntax**

`REGEX = <regex>`

**Default**

none

**Notes**

Capture groups are treated as fields, by default

If groups are named `_$VAL_<match_name> ` or `_$FIELD_<match_name>` then field names and values for those fields can be captured from the original value. For example, 

```
REGEX = %{{WORD:_$FIELD_1}}:%{{HOSTNAME:_$VAL_1}}
RAW = Host:factorchain.com
```

would result in 

`{"Host" = "factorchain.com"}`

### REPEAT_MATCH

After each subsequent match of a regex, continue matching on the remaining field value.

**Syntax**

`REPEAT_MATCH = <true|false>`

**Default**

false

## Attributes Specific to CSV Format

**Note** The CSV log format will also record the designated FIELDS and OPTIONAL_FIELDS values in any CSV sub-transform and use those values to construct the fields dictionary.

### FIELD_DELIMS

Value is a quoted string containing the set of delimiters used between field values in the body of the log.

**Syntax**

`FIELD_DELIMS = <quoted_string>`

**Default**

 ","

**Notes**

Use `\` to escape double quote characters.

### FIELD_HEADER_DELIMS

Delimiter to split the fields in [FIELDS](#fields).

**Syntax**

`FIELD_HEADER_DELIMS = <quoted_string>`

**Default**

 “,”

### FIELD_HEADER_QUOTE

Specifies the quote characters to use when parsing field names in CSV header line. Data contained between a pair of [FIELD_HEADER_QUOTE](#field_header_quote) is taken verbatim.

**Syntax**

`FIELD_HEADER_QUOTE = <quoted_string>`

**Default**

Value of [FIELD_QUOTE](#field_quote)

### FIELD_QUOTE

Specifies the quote characters to use when parsing non-header lines in a CSV file.

**Syntax**

`FIELD_QUOTE = <quoted_string>`

**Default**

"\\""

**Notes**

Data contained between a pair of FIELD_QUOTEs is taken verbatim.

### FIELD_START_INDEX

Starting number of CSV elements at which field values are matched to values.

**Syntax**

`FIELD_START_INDEX = <integer>`

**Default**

0

### FIELDS

Parsed values are sequentially assigned to these fields.

**Syntax**

`FIELDS = <field_name>, <field_name>, ...`

**Default**

none

**Notes**

* If there are too many values, the field name assigned to each excess value will reflect its index order in the set of values. For example, if there are 8 parsed values, and only 7 field names specified, the name of the eighth field will be "8".
* If there are too few values, value is set to default or empty string
* If this is never defined in a CSV format transform, a warning will be added. To hide the warning without defining the fields at the current time, add “FIELDS = ” with no specified fields.

### OPTIONAL_FIELDS

Once parsed values have been sequentially assigned to all fields mentioned in the FIELDS attribute, they will then be assigned to these optional fields. if there are not enough values to assign to all optional fields, no error will be recorded.

**Syntax**

`OPTIONAL_FIELDS = <field_name>, <field_name>, ...`

**Default**

none

## Attributes Specific to XML Format

### DICTIONARY_TAG

These elements contain dictionaries of values.

The named attributes are treated as field names and attribute values are treated as field values. Prepend the `element_name` to all field names found in the dictionary element.

**Syntax**

`DICTIONARY_TAG:<element_name> = <attribute_name>, ...`

**Default**

`element_name` default = none

`attribute_name` = none

### FIELD_TAG

If the current element’s name matches `element_name`, store its value in a field whose name is stored in `attribute_name` in that element.

**Syntax**

`FFIELD_TAG:<element_name> =  <attribute_name>`

**Default**

```
element_name = None
attribute_name default = "name"
```

### IGNORE_DICTIONARY_TAG

Ignore the dictionary’s name when parsing for the field names, and
ignore fields with this name if there are no other elements. However,
the contents are still parsed.

**Syntax**

`IGNORE_DICTIONARY_TAG = <element_name>`

### IGNORE_FIELDS_TAG

Ignores attributes with the inside the specified tag. The attributes are
parsed but not added to the field dictionary.

**Syntax**

`IGNORE_FIELDS_TAG = <element_name>`

**Example**

Given an XML message that contains:

```
...
<Provider Name="Microsoft-Windows-Security-Auditing" Guid="{5484962...994-A5BA-3E3B0328C30D}" />
     <EventID>4769</EventID>
     <Version>0</Version>
...
```

This attribute statement will prevent the `Name` and the `Guid` attributes from being added to the field dictionary.

`IGNORE_FIELDS_TAG = Provider`

### LOG_ENTRY_TAG

If an element's name is specified then treat it as a log entry
element. Attributes are treated as field names and attribute values are
treated as field values.

**Syntax**

`LOG_ENTRY_TAG:<element_name> = <attribute_name>, <attribute_name>, ...`

**Default**

```
element_name default = "event"
attribute_name default = none
```

### PARSE_ALL_TAG

Parses all elements with the specified name, parsing every detail internal to tags within the element and parsing every element within the tag, including the name of the tag specified in the names of the parsed fields, unless otherwise specified.

**Syntax**

`PARSE_ALL_TAG = <element_name>`

### ROOT_TAG

If an element's name is contained in this list, then treat it as a root element if events are being transmitted as a series.

**Syntax**

`ROOT_TAG = <element_name>, <element_name>, ...`

**Default**

root

## Attributes Specific to JSON Format

### JSON_DROP_NULLS

Drops all null values from the JSON.

**Syntax**

`JSON_DROP_NULLS = <true|false>`

**Default**

false

### JSON_FLATTEN_SINGLE_LISTS 

Collapses redundant JSON elements from sources like AWS.

**Syntax**

`JSON_FLATTEN_SINGLE_LISTS = <true|false>`

**Default**

false

## Attributes for dependencies stanza

### INCLUDE

Includes resources from another parser.

**Syntax**

`INCLUDE:/Parsers/path/to/parser = true`

**Default**

none
