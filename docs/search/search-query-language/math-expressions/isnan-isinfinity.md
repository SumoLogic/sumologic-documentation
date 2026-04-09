---
id: isnan-isinfinity
title: isNaN and isInfinity Function
sidebar_label: isNaN, isInfinity
---


The **isNaN** and **isInfinity** operators check a numeric string and return a boolean value.

* **isNaN** returns `true` if the string value is not a number, `false` otherwise.
* **isInfinity** returns `true` if the string value is a positive or negative infinity, `false` otherwise.

:::note
Null, empty, or blank strings will not return a result.
:::

## Syntax

```sumo
isNaN("<string>") as <field>
```

```sumo
isNaN(<string_field>) [as <field>]
```

```sumo
isInfinity("<string>") as <field>
```

```sumo
isInfinity(<string_field>) [as <field>]
```

## Examples

```sumo
| 5/0 as infinity
| isInfinity(infinity) as boolean
```

Returns `boolean` as `true`.     
```sumo
| parse "has * total tokens" as total_token
| where !isNaN(total_token)
```

Returns results where `total_token` values are a number.
 
