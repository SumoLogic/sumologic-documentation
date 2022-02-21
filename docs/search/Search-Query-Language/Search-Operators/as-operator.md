---
id: as-operator
---

# as operator

The **as** operator is usually used in conjunction with other operators,
but it can also be used alone to rename fields or to create new constant
fields.

## Syntax

-   \<ExistingFieldNam\> as\<fiel\>`
-   \<litera\> as\<fiel\>`

Fields with characters not in the `a-zA-Z0-9_` character set or that
begin with a number need to be escaped, see [reference a field with
special
characters](../../Get-Started-with-Search/Search-Basics/Reference_a_Field_with_Special_Characters.md "Reference a Field with Special Characters") for
details.

## Examples

### Rename a Field

When you rename a field, the original field still exists, but the new
field is added.

To rename the existing field **ip_addr** as **src_ip**, use:

`ip_addr as src_ip`

So, the following full query:

`_sourceCategory=Apache/Access | parse "* - - " as ip_addr | ip_addr as src_ip`

Would provide results like:

![](../../static/img/Search-Query-Language/Search-Operators/as-operator/../../../../Assets/Media_Repo_for_Search/as_rename.png)

### Create a New Constant Field

In this example, you will seed an existing field (**src_ip**) with a new
constant (**127.10.10.1**):

`_sourceCategory=Apache/Access | "127.10.10.1" as src_ip`

This statement “hardcodes" the value of **127.10.10.1** to the variable
**src_ip**, for all the messages returned, as shown:

![](../../static/img/Search-Query-Language/Search-Operators/as-operator/../../../../Assets/Media_Repo_for_Search/as_new_constant1.png)

In this example, you will create a new field (**test_src_ip**) and seed
it with a constant (**127.10.10.1**):

`_sourceCategory=Apache/Access | parse "* - -" as src_ip | "127.10.10.1" as test_src_ip`

Which provides the following results:

![](../../static/img/Search-Query-Language/Search-Operators/as-operator/../../../../Assets/Media_Repo_for_Search/as_new_constant2.png)

### Use As in Conjunction with Other Operators

The **`as`** operator is useful for testing, for example, when you want
to create a few log lines and seed them with specific values, like the
following query:

`_sourceCategory=Apache/Access | limit 5 | "127.10.10.1" as src_ip | "404" as status_code | "www.sumologic.com" as url`

Which provides the following results:

![](../../static/img/Search-Query-Language/Search-Operators/as-operator/../../../../Assets/Media_Repo_for_Search/as_conjunction.png)

In this next example, you will use **`as`** after a parse, to name the
variable in the pattern **"\* - - "** as **src_ip**:

`_sourceCategory=Apache/Access | parse "* - - " as src_ip`

In this example, you will use **`as`** to rename the **\_count** field
to **errors**.  

`_sourceCategory=Apache/Access status_code=404 | count(status_code) as errors`
