---
slug: /search/search-query-language/math-expressions
title: Math Expressions
description: Use general mathematical expressions on numerical data extracted from log lines.
---

You can use general mathematical expressions on numerical data extracted
from log lines. 

## Syntax

```sql
| expression [as <field>]
```

## Rules

* The term "expression" is evaluated as a mathematical expression in the context of existing fields.
* Parentheses can be used to group operations.
* The ternary operator is supported so you can use `"condition ? value_if_true : value_if_false"`.
* Supported mathematical operators `+, -, *, /, %`

## Examples

* Boolean expression tests like: `disk > 0.8 ? 1 : 0 as overcapacity`
* Math function calls like: `min((fps / 10 + 1) * 10, 70) as bucket`
* Assuming x = 1, 2, then `ceil(sqrt(x*x + y*y)) as d` should result in d = 2.0

## Java Math Class

Sumo Logic does not officially support all of Java's Math class functions. 

The Sumo Logic Java library includes the Math class functions, though they are not documented.

The following example uses the `pow()` function:

```sql
| 10 as number | pow(number, 10) as newnumber
```

To reference Java's Math class functions, see Oracle's [Math](https://docs.oracle.com/javase/7/docs/api/java/lang/Math.html) documentation.

## Guide Contents

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/abs"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>abs</h4></a>
  <p>Calculates the absolute value of x.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/acos"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>acos</h4></a>
  <p>Returns the inverse cosine of the argument.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/asin"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>asin</h4></a>
  <p>Returns the inverse sine of the argument.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/atan"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>atan</h4></a>
  <p>Returns the inverse tangent of the argument.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/atan2"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>atan2</h4></a>
  <p>Returns the four-quadrant inverse tangent of the two arguments b and c.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/cbrt"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>cbrt</h4></a>
  <p>The cube root function returns the cube root value of x.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/ceil"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>ceil</h4></a>
  <p>Rounds up a field value to the nearest integer value.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/cos"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>cos</h4></a>
  <p>Cosine of argument in radians.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/cosh"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>cosh</h4></a>
  <p>Hyperbolic cosine of argument in radians.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/exp"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>exp</h4></a>
  <p>The exponent function returns Euler's number e raised to the power of x.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/expm1"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>expm1</h4></a>
  <p>Returns a value of x in exp(x)-1, compensating for the roundoff in exp(x).</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/floor"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>floor</h4></a>
  <p>Rounds down to the largest previous integer value.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/search/search-query-language/math-expressions/hypot"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>hypot</h4></a>
  <p>Returns the square root of the sum of an array of squares.</p>
  </div>
</div>
    <div className="box smallbox14 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/isnan-isinfinity"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>isNaN, isInfinity</h4></a>
      <p>These operators check a numeric string and return a boolean value.</p>
      </div>
    </div>
    <div className="box smallbox15 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/log"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>log</h4></a>
      <p>The logarithm function returns the natural logarithm of x.</p>
      </div>
    </div>
    <div className="box smallbox16 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/log10"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>log10</h4></a>
      <p>The log10 function returns the base 10 logarithm of x.</p>
      </div>
    </div>
    <div className="box smallbox17 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/log1p"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>log1p</h4></a>
      <p>Computes log(1+x) accurately for small values of x.</p>
      </div>
    </div>
    <div className="box smallbox18 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/round"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>round</h4></a>
      <p>The round function returns the closest integer to x.</p>
      </div>
    </div>
    <div className="box smallbox19 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/sin"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>sin</h4></a>
      <p>Sine of argument in radians.</p>
      </div>
    </div>
    <div className="box smallbox20 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/sinh"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>sinh</h4></a>
      <p>Hyperbolic sine of argument in radians.</p>
      </div>
    </div>
    <div className="box smallbox21 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/sqrt"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>sqrt</h4></a>
      <p>The square root function returns the square root value of x.</p>
      </div>
    </div>
    <div className="box smallbox22 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/tan"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>tan</h4></a>
      <p>Tangent of argument in radians.</p>
      </div>
    </div>
    <div className="box smallbox23 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/tanh"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>tanh</h4></a>
      <p>Hyperbolic tangent of argument in radians.</p>
      </div>
    </div>
    <div className="box smallbox24 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/toDegrees"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>toDegrees</h4></a>
      <p>Converts angles from radians to degrees.</p>
      </div>
    </div>
    <div className="box smallbox25 card">
      <div className="container">
      <a href="/docs/search/search-query-language/math-expressions/toRadians"><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="40"/><h4>toRadians</h4></a>
      <p>Converts angles from degrees to radians.</p>
      </div>
    </div>
</div>

<br/>
