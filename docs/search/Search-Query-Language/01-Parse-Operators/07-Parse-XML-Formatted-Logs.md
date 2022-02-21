---
id: "-parse-xml-formatted-logs"
---

# Parse XML Formatted Logs

The **XML** operator uses a subset of the XPath 1.0 specification to
provide a way for you to parse fields from XML logs. Using it, you can
specify what to parse from an XML log using an XPath reference.

Ingested XML files must be well-formed and valid in order to be parsed
by the XML operator. If the XML is not valid, you will receive an error.

### Syntax

-   `| parse XML [field\<field_nam\>] \<xpath_expressio\>"[, \<xpath_expressio\>"] [as\<field\>] [nodrop]`

### Options

-   `field\<field_nam\>` 

    The `field=fieldname` option allows you to specify a field to parse
    other than the default message. For details, see [Parse
    field](Parse-field-option.md). 

-   `nodrop` 

    The `nodrop` option forces results to also include messages that do
    not match any segment of the parse term. For details, see [Parse
    nodrop](Parse-nodrop-option.md)

### Rules

-   If no field is specified, then the entire text of incoming messages
    is used.
-   If the XPaths are not valid, an error is thrown.
-   If the number of field names don't match the specified XPaths, an
    error is thrown.
-   If the field is not well-formed XML, null is returned, unless you
    have specified `nodrop`.
-   If the XPath doesn't match anything in the log, then null is
    returned, unless you have specified `nodrop`.
-   If the XPath matches an element, then its string representation is
    returned.
-   If the XPath matches multiple elements, then the first one is
    returned.

### XPath subset limitations

The full XPath 1.0 specification is not supported. In order to increase
performance, Sumo Logic supports a subset of the specification,
including the following caveats:

**Namespace**

The XML operator is not namespace aware. If you provide a namespace as
the XPath expression a null value is returned.

**Forward only**

The XML operator only allows XML paths to go deeper into the tree. For
example, this expression is not allowed:

`/af/nursery/../@type`

**Full location paths**

You must specify the full path to the elements you want to parse. This
means that "self-or-descendant" expressions are not supported. For
example, the following paths are not allowed:

`//af`

`/af//nursery`

**No expanded syntax axis specifiers**

Expanded syntax is not supported. For example, the following expressions
cannot be used:

`/child::af`

`/descendant-or-self::af`

### Examples

The parse operations provided refer to the following XML log:

\<user\>   �\<user id="123" role="manager\>      \<first_nam\>Sall\</first_nam\>      \<last_nam\>Jone\</last_nam\>      \<emai\>sally@emailplace.co\</emai\>   �\</use\>   �\<user id="456" role="contributor\>      \<first_nam\>Bo\</first_nam\>      \<last_nam\>Smit\</last_nam\>      \<emai\>bob@emailplace.co\</emai\>   �\</use\>\</user\>`

##### Parse element values

You can parse information using an XPath reference, such as the
`first_name` element value:

`* | parse xml "/users/user/first_name/text()" as first_name`

The `text()` function will pull the text value of the element. The
results would return a field named `first_name` with the value
of `Sally`.

To parse the second `user` element in the array you'd use the following:

`* | parse xml "/users/user[2]/first_name/text()" as first_name`

The results would return a field named `first_name` with a value
of `Bob`.

To parse the last element in an array you'd use the following:

`* | parse xml "/users/user[last()]/first_name/text()" as first_name`

To parse an element based on an attribute, in this example
where id="456", you'd use the following:

`* | parse xml "/users/user[@id=456]/first_name/text()" as first_name"`

##### Parse attribute values

To parse the `id` attribute you'd use the following:

`* | parse xml "/users/user/@id" as id`

The results would return a field named `id` with a value of `123`.

To parse the `id` value from the second `user` element you'd use the
following:

`* | parse xml "/users/user[2]/@id" as id`

To parse the `id` value from the last user in the list you'd use the
following: 

`* | parse xml "/users/user[last()]/@id" as id`

##### Parse multiple values

To parse multiple element and attribute values from a single message
into separate fields use a comma-separated list of Xpath expressions.
For example, to parse the `first_name` element value and the `id`
attribute from our example you'd use the following: 

`* | parse xml "/users/user/@id", "/users/user/first_name/text()" as id, first_name`
