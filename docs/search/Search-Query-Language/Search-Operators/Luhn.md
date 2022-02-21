---
id: luhn
---

# Luhn

The **Luhn** operator uses Luhn’s algorithm to check message logs for
strings of numbers that may be credit card numbers and then validates
them. It takes a string as an input, strips out all characters that are
not numerals, and checks if the resulting string is a valid credit card
number, returning true or false accordingly.

### Syntax

-   `luhn\<fiel\>) [as\<fiel\>]`
-   `luhn``(\<input strin\>") [as `\<fiel\>]`

### Examples

#### Identify and verify credit card numbers in message logs

Use the following query to identify credit card numbers in message logs,
and verify them using the Luhn operator:

`| parse regex "(\<maybec\>\d{4}-\d{4}-\d{4}-\d{4})" nodrop | parse regex "(\<maybec\>\d{4}\s\d{4}\s\d{4}\s\d{4})" nodrop | parse regex "(\<maybec\>\d{16})" nodrop | if (luhn(maybecc), true, false) as valid`

which provides results such as:

![](../../static/img/Search-Query-Language/Search-Operators/Luhn/../../../../Assets/Media_Repo_for_Search/luhn_operator_example.png)

#### Search for and verify a specific credit card number

Use the following query to search for a specific credit card number and
verify it using the Luhn operator:

`*| "6666-7777-6666-8888" as b   | luhn(b) as d`

It would provide the following results:

![](../../static/img/Search-Query-Language/Search-Operators/Luhn/../../../../Assets/Media_Repo_for_Search/lunh_operator_example1.png)
