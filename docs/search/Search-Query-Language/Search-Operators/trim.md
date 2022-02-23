---
id: trim
---

# trim

The **trim** operator eliminates leading and trailing spaces from a
string field.

#### Syntax

* `trim\<fiel\>) as\<fiel\>`
* `trim("\<string expressio\> ") as\<fiel\>`

#### Example

Take the string value " Hello World  ". To remove the leading and
trailing spaces you would do the following:

`| trim(" Hello World  ") as greeting`

This would return a field named greeting with a new value of "Hello
World".
