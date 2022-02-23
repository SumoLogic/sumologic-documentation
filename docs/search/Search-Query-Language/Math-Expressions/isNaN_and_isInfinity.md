---
id: isnan-and-isinfinity
---

# isNaN and isInfinity

The **isNaN** and **isInfinity** operators check a numeric string and
return a boolean value.

* **isNaN** returns `true` if the string value is not a
    number, `false` otherwise.
* **isInfinity** returns `true` if the string value is a positive or
    negative infinity, `false` otherwise.

Null, empty, or blank strings will not return a result.

### Syntax

* `isNaN(\<strin\>") as\<fiel\>`
* `isNaN\<string_fiel\>) [as\<fiel\>]`
* `isInfinity(\<strin\>") as\<fiel\>`
* `isInfinity\<string_fiel\>) [as\<fiel\>]`

### Examples

* `| 5/0 as infinity`  
    `| isInfinity(infinity) as boolean`  
      
    Returns `boolean` as `true`.  
     
* \| parse "has \* total tokens" as total_token  
    \| where !isNaN(total_token)  
      
    Returns results where `total_token` values are a number.

 
