---
id: metrics-explorer-faqs
title: Metrics Explorer FAQs
sidebar_label: Metrics Explorer FAQs
description: See FAQs about the Metrics Explorer.
---

## What happens to the current metrics tab when the new Metrics Explorer comes out?

The Metrics Explorer replaces the Classic metrics UI. If you’re not ready to switch to the Metrics Explorer, you continue to use the Classic UI until you are. The option for switching between Classic metrics and Metrics Explorer is on the three-dot menu at the top right of the page, next to the **Add to Dashboard** button.

## What value does Metrics Explorer provide?

The Metrics Explorer gives you more visualization types and makes your metrics easier to  discover. Metrics Explorer provides the same visualizations available in Dashboards (New), from tables and category charts, to time series charts and honeycomb visualizations. The Metrics Explorer has richer and more comprehensive autocomplete support, providing suggestions for even very high cardinality queries. The structured query builder approach also makes the metrics experience friendlier to infrequent and inexperienced metrics users.

## Can I put logs and metrics on the same panel in the updated metrics explorer?

Yes, yes you can. The experience is consistent with the Dashboards (New) experience and has the same features.

## I loved the ability to overlay log-based events and metrics on the classic metrics page. When will you be bringing that back?

Event overlay support is planned for a future release of Metrics Explorer.


## How does autocomplete when searching metrics work?

Autocomplete in the Metrics Explorer works by taking what you type and looking for tokenized prefixes that match your input. We tokenize based on spaces, underscores, hyphens, and a variety of other special characters. For example, assume you have a metric `metric_this_is`. If you enter `is` in the **Metric** field, Sumo Logic will suggest `metric_this_is` because `is` is a token in the metric. Similarly, entering `met` will result in the same recommendation because `met` is a prefix for the token `metric`. However, if you enter `ric`, we won't suggest `metric_this_is` because `ric` isn’t a prefix of any of the tokens in token in that metric name. 
