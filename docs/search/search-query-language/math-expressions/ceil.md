---
id: ceil
title: ceil Function
sidebar_label: ceil
---

The **ceil** operator rounds up a field value to the nearest integer value.

## Syntax

```sumo
ceil(<x>) as <field>
```

## Example

```sumo
* | ceil(1.5) as v
```

```sumo
 * | ceil(-1.5) as v
```
