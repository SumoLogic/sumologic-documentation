---
id: log-operators-cheat-sheet-v
---

# Log Operators Cheat Sheet

The Log Operators cheat sheet provides a list of available parsers,
aggregators, search operators, and mathematical expressions with links
to full details for each item.  For a step-by-step video and tutorial
about creating queries, see the [Quick Start
Tutorial](../../01Start-Here/Quick-Start-Tutorials.md "Quick Start Labs and Tutorials"). 
For a complete list of Sumo Logic Search operators, you can download the
[PDF
version](https://drive.google.com/a/sumologic.com/file/d/1YeqCNH_IINY6GqzgpT7cxSIY47NhyntH/view?usp=sharing "https://drive.google.com/a/sumologic.com/file/d/1YeqCNH_IINY6GqzgpT7cxSIY47NhyntH/view?usp=sharing"). 

For a collection of customer-created search queries and their use cases,
see the [Sumo Logic Community Query
Library](https://community.sumologic.com/s/topic/0TOE0000000g86fOAA/Query-Library "https://community.sumologic.com/s/topic/0TOE0000000g86fOAA/Query-Library").

The following tables provide a list of available Sumo Logic parsers,
aggregators, search operators, and mathematical expressions.  

## Parsing

Sumo Logic provides several ways
to [parse](../Search-Query-Language/01-Parse-Operators.md "Parsing") fields
in your log messages.

[TABLE]

## Aggregating

[Aggregating
functions](../Search-Query-Language/aaGroup.md "Aggregating") evaluate
messages and place them into groups. The group operator is used in
conjunction with group-by functions. When using any grouping function,
the word **by** is sufficient for representing the group operator.

An aggregation function cannot take another function (such as a math
function). For example, you cannot use:

`... | avg(x + y) as average`  
Instead use separate steps:  
`... | x + y as z | avg(z) as average`

[TABLE]

## Search Operators

This table consists of the [search
operators](../Search-Query-Language/Search-Operators.md "Search Operators")
in the Sumo Logic [search query
language](../Search-Query-Language.md "Search Query Language").

[TABLE]

## Math Expressions

You can use general mathematical expressions on numerical data extracted
from log lines. For any mathematical or group-by function that
implicitly requires integers, Sumo Logic casts the string data to a
number for you.

|                                                                                                                       |                                                                                                                            |
|-----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **Operator**                                                                                                          | **Description**                                                                                                            |
| **Basic**                                                                                                             |                                                                                                                            |
| [abs](../Search-Query-Language/Math-Expressions/abs.md "abs")                                                         | The absolute function calculates the absolute value of x.                                                                  |
| [round](../Search-Query-Language/Math-Expressions/round.md "round")                                                   | The round function returns the closest integer to x.                                                                       |
| [ceil](../Search-Query-Language/Math-Expressions/ceil.md "ceil")                                                      | The ceiling function rounds up to the smallest integer value. Returns the smallest integral value that is not less than x. |
| [floor](../Search-Query-Language/Math-Expressions/floor.md "Search/Search_Cheat_Sheets/Search_Operators_Cheat_Sheet") | The floor function rounds down to the largest previous integer value. Returns the largest integer not greater than x.      |
| [max](../Search-Query-Language/aaGroup/min-and-max.md "min and max")                                                  | The maximum function returns the larger of two values.                                                                     |
| [min](../Search-Query-Language/aaGroup/min-and-max.md "min and max")                                                  | The minimum function returns the smaller of two values.                                                                    |
| [sqrt](../Search-Query-Language/Math-Expressions/sqrt.md "sqrt")                                                      | The square root function returns the square root value of x.                                                               |
| [cbrt](../Search-Query-Language/Math-Expressions/cbrt.md "cbrt")                                                      | The cube root function returns the cube root value of x.                                                                   |
| **Exponents and Logs**                                                                                                |                                                                                                                            |
| [exp](../Search-Query-Language/Math-Expressions/exp.md "exp")                                                         | The exponent function returns Euler's number e raised to the power of x.                                                   |
| [expm1](../Search-Query-Language/Math-Expressions/expm1.md "expm1")                                                   | The expm1 function returns value of x in exp(x)-1, compensating for the roundoff in exp(x).                                |
| [log](../Search-Query-Language/Math-Expressions/log.md "log")                                                         | The logarithm function returns the natural logarithm of x.                                                                 |
| [log10](../Search-Query-Language/Math-Expressions/log10.md "log10")                                                   | The log10 function returns the base 10 logarithm of x.                                                                     |
| [log1p](../Search-Query-Language/Math-Expressions/log1p.md "log1p")                                                   | The log1p function computes log(1+x) accurately for small values of x.                                                     |
| **Trigonometric**                                                                                                     |                                                                                                                            |
| [sin](../Search-Query-Language/Math-Expressions/sin.md "sin")                                                         | Sine of argument in radians.                                                                                               |
| [cos](../Search-Query-Language/Math-Expressions/cos.md "cos")                                                         | Cosine of argument in radians.                                                                                             |
| [tan](../Search-Query-Language/Math-Expressions/tan.md "tan")                                                         | Tangent of argument in radians.                                                                                            |
| [asin](../Search-Query-Language/Math-Expressions/asin.md "asin")                                                      | Inverse sine; result is in radians.                                                                                        |
| [acos](../Search-Query-Language/Math-Expressions/acos.md "acos")                                                      | Inverse cosine; result is in radians.                                                                                      |
| [atan](../Search-Query-Language/Math-Expressions/atan.md "atan")                                                      | Inverse tangent; result is in radians.                                                                                     |
| [atan2](../Search-Query-Language/Math-Expressions/atan2.md "atan2")                                                   | Four-quadrant inverse tangent.                                                                                             |
| [sinh](../Search-Query-Language/Math-Expressions/sinh.md "sinh")                                                      | Hyperbolic sine of argument in radians.                                                                                    |
| [cosh](../Search-Query-Language/Math-Expressions/cosh.md "cosh")                                                      | Hyperbolic cosine of argument in radians.                                                                                  |
| [tanh](../Search-Query-Language/Math-Expressions/tanh.md "tanh")                                                      | Hyperbolic tangent of argument in radians.                                                                                 |
| **Advanced**                                                                                                          |                                                                                                                            |
| [hypot](../Search-Query-Language/Math-Expressions/hypot.md "hypot")                                                   | Returns the square root of the sum of an array of squares.                                                                 |
| [toDegrees](../Search-Query-Language/Math-Expressions/toDegrees.md "toDegrees")                                       | Converts angles from radians to degrees.                                                                                   |
| [toRadians](../Search-Query-Language/Math-Expressions/toRadians.md "toRadians")                                       | Converts angles from degrees to radians.                                                                                   |

 
