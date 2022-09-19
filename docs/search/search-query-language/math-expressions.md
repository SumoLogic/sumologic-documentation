---
id: math-expressions
title: Math Expressions
description: Use general mathematical expressions on numerical data extracted from log lines.
---


You can use general mathematical expressions on numerical data extracted
from log lines. 


## Overview

### Syntax

```sql
| expression [as <field>]
```

### Rules

* The term "expression" is evaluated as a mathematical expression in the context of existing fields.
* Parentheses can be used to group operations.
* The ternary operator is supported so you can use `"condition ? value_if_true : value_if_false"`.
* Supported mathematical operators `+, -, *, /, %`

### Examples

* Boolean expression tests like: `disk > 0.8 ? 1 : 0 as overcapacity`
* Math function calls like: `min((fps / 10 + 1) * 10, 70) as bucket`
* Assuming x = 1, 2, then `ceil(sqrt(x*x + y*y)) as d` should result in d = 2.0

### Java Math Class

Sumo Logic does not officially support all of Java's Math class functions. 

The Sumo Logic Java library includes the Math class functions, though they are not documented.

The following example uses the `pow()` function:

```sql
| 10 as number | pow(number, 10) as newnumber
```

To reference Java's Math class functions, see Oracle's [Math](https://docs.oracle.com/javase/7/docs/api/java/lang/Math.html) documentation.

## Operators

---
### abs

The absolute function calculates the absolute value of x.

#### Syntax

```sql
abs(<x>) as <field>
```

#### Rules

The function can't be nested.

#### Example

```sql
abs(-1.5) as v // v = 1.5
```

---
### acos

Returns the inverse cosine of the argument.

#### Syntax

```sql
acos(<x>) as <field>
```

#### Example

```sql
acos(1) as v // v = 0
```

---
### asin

Returns the inverse sine of the argument.

#### Syntax

```sql
asin(<x>) as <field>
```

#### Example

```sql
asin(1) as v // v = 1.5707963267948966
```

---
### atan

Returns the inverse tangent of the argument.

#### Syntax

```sql
atan(<x>) as <field>
```

#### Example

```sql
atan(1) as v // v = 0.78540
```

---
### atan2

Returns the four-quadrant inverse tangent of the two arguments b and c.

#### Syntax

```sql
atan2(<b>, <c>) as <field>
```

#### Example

```sql
atan2(0, -1) as v // v = pi
```


---
### cbrt

The cube root function returns the cube root value of x.

#### Syntax

```sql
cbrt(<x>) as <field>
```

#### Example

```sql
cbrt(8) as v // v = 2
```


---
### ceil

The **ceil** operator rounds up a field value to the nearest integer value.

#### Syntax

```sql
ceil(<x>) as <field>
```

#### Example

```sql
ceil(1.5) as v // v = 2
```

```sql
ceil(-1.5) as v // v = -1
```



---
### cos

Cosine of argument in radians.

#### Syntax

```sql
cos(<x>) as <field>
```

#### Example

```sql
cos(1) as v // v = 0.5403023058681398
```


---
### cosh

Hyperbolic cosine of argument in radians.

#### Syntax

```sql
cosh(<x>) as <field>
```

#### Example

```sql
cosh(1) as v // v = 1.54308
```

---
### exp

The exponent function returns Euler's number e raised to the power of x.

#### Syntax

```sql
exp(<x>) as <field>
```

#### Example

```sql
exp(1) as v // v = 2.7182818284590455
```


---
### expm1

The **expm1** function returns value of x in exp(x)-1, compensating for the roundoff in exp(x).

#### Syntax

```sql
expm1(<x>) as <field>
```

#### Example

```sql
expm1(0.1) as v // v = 0.10517091807564763
```



---
### floor

The floor function rounds down to the largest previous integer value. Returns the largest integer not greater than x.

#### Syntax

```sql
floor(<x>) as <field>
```

#### Example

```sql
floor(1.5) as v // v = 1
```

```sql
floor(-1.5) as v // v = -2
```

---
### hypot

Returns the square root of the sum of an array of squares.

#### Syntax

```sql
hypot(<a>, <b>) as <field>
```

#### Example

```sql
hypot(3, 4) as c // c = 5
```


---
### isNaN and isInfinity

The **isNaN** and **isInfinity** operators check a numeric string and return a boolean value.

* **isNaN** returns `true` if the string value is not a number, `false` otherwise.
* **isInfinity** returns `true` if the string value is a positive or negative infinity, `false` otherwise.

:::note
Null, empty, or blank strings will not return a result.
:::

#### Syntax

```sql
isNaN("<string>") as <field>
```

```sql
isNaN(<string_field>) [as <field>]
```

```sql
isInfinity("<string>") as <field>
```

```sql
isInfinity(<string_field>) [as <field>]
```

#### Examples

```sql
| 5/0 as infinity
| isInfinity(infinity) as boolean
```

Returns `boolean` as `true`.     
```sql
| parse "has * total tokens" as total_token
| where !isNaN(total_token)
```

Returns results where `total_token` values are a number.
 

---
### log

The logarithm function returns the natural logarithm of x.

#### Syntax

```sql
log(<x>) as <field>
```

#### Example

```sql
log(2) as v // v = 0.6931471805599453
```


---
### log1p

The log1p function computes log(1+x) accurately for small values of x.

#### Syntax

```sql
log1p(<x>) as <field>
```

#### Example

```sql
log1p(0.1) as v // v = 0.09531017980432487
```


---
### log10

The log10 function returns the base 10 logarithm of x.

#### Syntax

```sql
log10(<x>) as <field>
```

#### Example

```sql
log10(2) as v // v = 0.3010299956639812
```


---
### round

The **round** function returns the closest integer to x.

<!-- missing...
## Syntax

```sql

```
-->

#### Examples

```sql
round(1.549, 2) as a  // a = 1.55
```

You can calculate the message volume for a specific Source Host using this query. You can use the round function to get the closest integer value of the volume.  

```
_index=sumologic_volume
| where _sourceCategory="sourcehost_volume"
| parse regex "(?<sourcehost>\"[^\"]+\")\:{\"sizeInBytes\"\:(?<bytes>\d+),\"count\"\:(?<count>\d+)\}" multi
| bytes/1024/1024 as MB
| sum(MB) as MB by sourcehost
| round(MB)
```



---
### sin

Sine of argument in radians.

#### Syntax

```sql
sin(<x>) as <field>
```

#### Example

```sql
sin(1) as v // v = 0.8414709848078965
```



---
### sinh

Hyperbolic sine of argument in radians.

#### Syntax

```sql
sinh(<x>) as <field>
```

#### Example

```sql
sinh(1) as v // v = 1.17520
```


---
### sqrt

The square root function returns the square root value of x.

#### Syntax

```sql
sqrt(<x>) as <field>
```

#### Example

```sql
sqrt(4) as v // v = 2
```


---
### tan

Tangent of argument in radians.

#### Syntax

```sql
tan(<x>) as <field>
```

#### Example

```sql
tan(1) as v // v = 1.5574077246549023
```


---
### tanh

Hyperbolic tangent of argument in radians.

#### Syntax

```sql
tanh(<x>) as <field>
```

#### Example

```sql
tanh(1) as v // v = 0.76159
```


---
### toDegrees

Converts angles from radians to degrees.

#### Syntax

```sql
toDegrees(<x>) as <field>
```

#### Example

```sql
toDegrees(asin(1)) as v // v = 90
```


---
### toRadians

Converts angles from degrees to radians.

#### Syntax

```sql
toRadians(<x>) as <field>
```

#### Example

```sql
toRadians(180) as v // v = pi
```
