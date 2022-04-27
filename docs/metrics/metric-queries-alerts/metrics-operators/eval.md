---
id: eval
---

# eval

Evaluates a time series based on a user-specified math expression.

## eval syntax

```sql
metrics query | eval <math expression>
```

where `<math expression>` is a valid math expression  with `_value` as the placeholder for each data point in the time series.

Supported Basic operations:

`+`, `-`, `*`, `/`

Supported Math functions:

`sin`, `cos`, `abs`, `log`, `round`, `ceil`, `floor`, `tan`, `exp`, `sqrt`, `min`, `max`,` avg`, `pct`

## Eval examples

### Multiply a metric 

This query returns the value of the `cpu_idle` metric, multiplied by
100.

```sql
_sourceCategory=ApacheHttpServer metrics=cpu_idle | eval _value * 10
```  

