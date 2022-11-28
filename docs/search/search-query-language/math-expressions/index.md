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

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
