---
id: replace
---

# replace

The **replace** operator allows you to replace all instances of a
specified string with another string. You can specify the string to
replace with a matching regex or literal text. You might use it to find
all instances of a name and change it to a new name or to replace
punctuation in a field with different punctuation. This operator is
useful anytime you need to rename something.

### Syntax

* `replace\<sourceStrin\>,\<searchStrin\>,\<replaceStrin\>) as\<fiel\>`
* `replace\<sourceStrin\>, \<rege\>/,\<replaceStrin\>) as\<fiel\>`

### Rules

* An alias is required.
* If any of the inputs are null, the output is null.
* If the searchString is not found or the regex does not match, the
    sourceString is returned intact.
* Regex must be [RE2
    compliant](https://github.com/google/re2/wiki/Syntax "https://github.com/google/re2/wiki/Syntax").
* The string is case sensitive.
* When using multiple replace operators on the same field you must use
    the same alias, see an [example below](./replace.md "replace").

### Regex usage

You can use a regex to define what you want to replace. Capture groups
are optional. You can use named or numbered capture groups to then
reference in the \<replaceStrin\>`.

Named capture groups:

`/(\<sectio\>flight)\/(\<i\>[0-9]{5,})/`

Where you would reference the named capture group **section** by its
name in the \<replaceStrin\>` with `${section}`.

Numbered capture group:

`/(flight)\/([0-9]{5,})/`

Where you would reference the first capture group in
the \<replaceStrin\>` with `$1`, and the second capture group with `$2`.

Using `$0` will reference the whole matching string.

#### Required characters to escape

If the \<replaceStrin\>` needs to include the dollar sign (`$`), it
needs to be escaped as `\\$`. Similarly, backslash itself needs to be
escaped as `\\\\`. Some other escapable characters include:

* `\n` : replace with a new line character
* `\t` : a tab character

### Examples

#### Replace unique IDs in URLs with a regex

If you have a URL and would like to see the number of times it was
visited, but do not want to aggregate with unique IDs, you can replace
the IDs with an empty string. Take the following URL, where in this
example it belongs to a field named `url`:

`http://somewebsite.com/flight/12345678/certification`

To remove the ID `12345678` from the field `url` you can use the
following query with a regex:

`| replace(url, /[0-9]{5,}/, "") as url`

This provides the URL like:

`http://somewebsite.com/flight//certification`

This would allow you to count the number of times the URL was requested
without the specific IDs.

#### Replace with regex capture group

Following on from the previous example, you can reference strings in a
capture group from your regex to use in the replace string. Take the
same URL:

`http://somewebsite.com/flight/12345678/certification`

To replace the ID section of the URL with different text that includes a
string from a capture group you can use the following query:

`| replace(url, /(flight)\/([0-9]{5,})/, "new-$2-url") as url`

This provides the URL like:

`http://somewebsite.com/new-12345678-url/certification`

The regex has two capture groups and in the \<replaceStrin\>` we have
specified `$2` to have the second capture group's value included in
the \<replaceStrin\>`. 

#### Replace periods in a field with different punctuation

To replace periods in a field with different punctuation, you could use
the following query. (This query also uses
the [Fields](fields_operator.md "fields") operator to display only the
required fields.)

`error | parse "[logger=*]" as logger | replace(logger, ".","\>") as logger_replace | fields logger, logger_replace`

which provides results like:

![](../../static/img/Search-Query-Language/Search-Operators/replace/../../../../Assets/Media_Repo_for_Search/replace_operator_example.png)

#### Remove underscores from a field to make it human readable

If you had underscores in a field called `moduleName`, you could use a
query such as:

`... | replace(moduleName, "_", " ") as humanReadableModuleName`

#### Replace periods in a phone number with dashes

To replace periods in a phone number with dashes, you could use a query
such as:

`phone_num | parse "[phone_num=*]" as phone_num | replace(phone_num, ".", "-") as phone_num_dash`

#### Rename a deployment’s abbreviation with a full name

In this example, we have a field called `deploymentName` with values
that are abbreviations for the different deployments in an environment,
such as `apac-prod`, `eu-prod`, `us-prod`, and `us-dev`. To replace the
abbreviations with full titles for each deployment, you could use a
query like this:

`replace(deploymentName,"apac","Asia Pacific") as deploymentName | replace(deploymentName,"eu","Europe") as deploymentName | replace(deploymentName,"us","United States") as deploymentName | replace(deploymentName,"prod","Production") as deploymentName | replace(deploymentName,"dev","Development") as deploymentName`

#### Use the Replace operator on multiple strings within one field

For example, in multiple strings, to replace all number 5's with number
7's, and also replace all 4's with 2's, use multiple replace operations,
as shown in the following query:

`| replace(field, "5","7") as field | replace(field, "4","2") as field`

The same field name, `field` in the above example, needs to be passed to
subsequent replace operations. You can change the field name (alias) in
the last replace operation.

In this example, we set the initial event_id to match the event_code,
and then do the replace operation on the event_id. This way, the
event_id is always set with the match, and then the replaced value is
passed back into the field with any subsequent operations that do not
match.

`_sourceName=Application |timeslice 1h | parse "SourceName = \"*\";" as Source  | parse "Type = \"*\";" as Level  | parse "EventCode = *;" as Event_Code | event_code as event_id |replace(event_id, "1073743528","1704") as event_id |replace(event_id,"1073758208","16384") as event_id |replace(event_id,"1073742726","902") as event_id |replace(event_id,"1073742890","1066") as event_id |replace(event_id,"1073742724","900") as event_id |replace(event_id,"1073750833","9009") as event_id |replace(event_id,"1073742727","903") as event_id |replace(event_id,"1073742827","1003") as event_id |fields - event_code //|count by level, _timeslice //|transpose row _timeslice column level |count by event_id`
