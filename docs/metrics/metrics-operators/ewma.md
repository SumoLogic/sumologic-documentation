---
id: ewma
title: ewma Metrics Operator
sidebar_label: ewma
---


The `ewma` operator computes an Exponentially Weighted Moving Average (EWMA) on the data points returned by the query for the selected time range. This allows you to smooth out short-term fluctuations (outliers) and display long-term trends.

You can optionally run `ewma` with either:

* An explicit `alpha` smoothing parameter to smooth time series while preserving trends. This is useful if you want to explicitly set the smoothing parameter value.
* A `span` over a number of points. The `span` parameter is commonly understood as an N-Day Exponentially Weighted Moving Average. The *span* value is the number of data points that will be used to calculate the average. The decay (smoothing) parameter alpha  is related to span as:  `alpha = 2/(span + 1)`

The most commonly used parameter is `span`, which allows you to specify the number of data points you want to use for smoothing. The higher the value of `span`, the smoother the time series will be. You might choose to use `alpha` if you know what smoothing parameter value you want use. Keep in mind that the lower the `alpha` value is, the smoother the time series will be.

If you run `ewma` without specifying either `alpha` or `span`, it runs by default with `alpha=0.5` (or`span=3`).


## Syntax

```
metric query | ewma [alpha=<#> |span=<#>]
```


#### Syntax using alpha parameter

```
query selector | ewma alpha=<#>
```


Where:

* `alpha`, the smoothing parameter, is a decimal value (0.0 ≤ alpha ≤ 1.0)
* The default value of `alpha` is 0.5

**Example**

```
metrics=xyz | ewma alpha=0.1
```



### Syntax using span parameter  

```
query selector | ewma span=<#>
```

Where:

* `span` is the number of data points. Must be an integer value greater than zero. If you set `span=5`, the last five data points will be used to calculate the average.
* The default value of `span` is 3.

**Example**

```
metrics=xyz | ewma span=10
```
