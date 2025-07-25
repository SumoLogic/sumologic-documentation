---
id: troubleshoot-rules
title: Troubleshoot Rules
sidebar_label: Rules
description: Learn how to troubleshoot problems with Cloud SIEM rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides guidance for administrators to diagnose, troubleshoot, and escalate issues with Sumo Logic Cloud SIEM detection rules.

Rules in Cloud SIEM serve to provide security detection signals from log data that has previously been ingested, parsed, normalized, and enriched into Cloud SIEM records. Signals produced by rules form the core alerting capability in Cloud SIEM and are themselves correlated into insights by the entities elevated from the records that generate them.

Rule issues can manifest in several ways:
* No signals
<br/>A rule that should be generating signals is not, or a "Test Rule Expression" returns results but no signals are generated.
* Too many signals
<br/>False positive signals or signals that aren’t useful are being triggered or are unsuppressed.
* Rule degradations or failures
<br/>The rule status is either in failed or degraded and is either permanently or temporarily disabled due to rule logic or throughput issues.
* Signal time out of sync
<br/>Signals being generated out of sync with the actual event time either in the past or future.

## Common rule components

To troubleshoot rules, you must first have an understanding of how rule components impact signal generation criteria. There are several [rule types](/docs/cse/rules/about-cse-rules/#rule-types) in Cloud SIEM:  match, threshold, chain, aggregation, outlier, and first seen. Each rule type has particular components, but each has a common set of components critical to signal generation.

### Rule expression

The [expression on a rule](/docs/cse/rules/about-cse-rules/#about-rule-expressions) is the core of most rules’ logic. It provides matching criteria that is used to match against records flowing into Cloud SIEM. Records that contain the expression criteria will be evaluated for signal generation. A signal will not fire if records do not match against the expression. 

<img src={useBaseUrl('img/cse/troubleshoot-tuning-expression.png')} alt="Example match expression on a rule" style={{border: '1px solid gray'}} width="500" />

Rules with a [tuning expression](/docs/cse/rules/rule-tuning-expressions/) added will require whatever additional criteria is present in the tuning expression as well as the base expression to match as they are evaluated as a single expression at processing time.

### Entity selector

The [entity selector on a rule](/docs/cse/rules/about-cse-rules/#on-entity-configuration) controls what entity or entities (for example, usernames, hosts, IP addresses etc.) a signal will be generated for. Records that match the expression and contain a corresponding entity will create a signal for each present entity. Multiple entities may be selected. In the event of a record with multiple matching entities and that matches the expression, a signal will be generated for each entity. 

<img src={useBaseUrl('img/cse/troubleshoot-rules-entity-selector.png')} alt="Example entity selector on a rule" style={{border: '1px solid gray'}} width="500" />

### Signal name

The signal name on a rule controls what the name of any generated signal will be. The name can be static or contain templated values using mustache templates.

<img src={useBaseUrl('img/cse/troubleshoot-rules-signal-name.png')} alt="Example signal name on a rule" style={{border: '1px solid gray'}} width="500" />

### Suppression

[Signals can be suppressed](/docs/cse/records-signals-entities-insights/about-signal-suppression) a number of ways, most commonly:
* [Redundant signal suppression](/docs/cse/get-started-with-cloud-siem/insight-generation-process/#redundant-signal-suppression)
<br/>A signal with the same name and entity was previously triggered. The default window for redundant signal suppression is 72 hours, but can be overridden per-rule or globally.
* [Entity suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#suppress-by-entity)
<br/>The entity for which a signal was triggered has been suppressed.
* [Network block suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/#suppress-by-network-block)
<br/>For IP address entities contained in a defined network block that has been suppressed.

Suppressed signals are collapsed within the first signal generated that was unsuppressed and are not considered in insights.

Following is an example of a per-rule entity suppression override:

<img src={useBaseUrl('img/cse/troubleshoot-rules-signal-suppression.png')} alt="Example signal suppression on a rule" style={{border: '1px solid gray'}} width="500" />

## Rule type dependent components

Each rule type other than the match rule will perform some form of aggregation as they consider multiple records in order to trigger a signal.

### Aggregation components

* **Grouped by**
<br/>Groups together values from one or more parsed fields from a record. Any entity field selected will be included implicitly in rules using a "grouped by". It appears on these rule types: threshold, aggregation, chain, outlier, and first seen.
<br/><br/>"Grouped by" fields appear differently for different rule types:
   * In first seen rules, it appears as "**has a new value for the field(s)**", and for per-entity baselines as "**for the following (entities)**".
   * In outlier rules, it appears within the **Outlier Model Configuration** section within "**of the record field**".
   * In threshold rules, the **Group by one or more fields** option appears after clicking **Show advanced**.
   * In chain and aggregation rules, it appears as "**grouped by**" after the rule expressions.
* **Count**
<br/>A basic count threshold of logs that meet the other rule criteria. It appears on these rule types: threshold, aggregation (as a math function), chain, and outlier.
* **Count Distinct**
<br/>A count of unique values found in the field or fields (distinct groups of values). It appears on rule types: threshold, aggregation, and outlier.
* **Other math functions**
<br/>These math functions are available:
`avg`, `first`, `last`, `max`, `min`, and `sum`. (`first` and `last` are available in the aggregation rule type.)
* **Math expression**
<br/>Used in conjunction with the built-in math functions to do additional calculations on values from the evaluated records. Available in outlier and aggregation rule types

For rules triggered by multiple records, each of the defined criteria for each record must match in addition to the common rule components.

### Anomaly detection rule components

#### First seen rules

Uses a baseline of activity particular to an organization or specific entity and signals on the occurrence of a new activity. Baseline settings:
* Baseline types
   * Global
   <br/>Tracks activity across an organization. Signals on the first observance of a given activity after the baseline is built.
   * Per-entity 
   <br/>Tracks activity per-entity in an environment. Signals on the first observance of a given activity for an entity after the baseline is built.
* Retention period
<br/>Rolling window for retaining records that pertain to the activities tracked in the baseline.
* Baseline period
<br/>Amount of time to look-back for activity before allowing a signal to be triggered.

For more on first seen rules, see [Write a First Seen Rule](/docs/cse/rules/write-first-seen-rule/).

#### Outlier rules

Uses a baseline of activity and signals on an outlier in the tracked activity. Baseline settings:
   * Bucketing of behavior either on an hourly or daily granularity.
   * Retention period
   <br/>Rolling window for retaining records that pertain to the activities tracked in the baseline.
   * Baseline period
   <br/>Amount of time to look-back for activity before allowing a signal to be triggered.
   * Outlier threshold
   <br/>The threshold is set by the minimum count value has been exceeded, or the model sensitivity threshold has been exceeded (that is, the number of standard deviations from the mean).

Rules that require a baseline are dependent on the baseline criteria being met before triggering a signal. For first seen rules, this means that an activity has not been observed in the baseline period and subsequently is observed. For outlier rules, this means that the tracked activity has exceeded both the floor value and model sensitivity threshold.

For more on outlier rules, see [Write an Outlier Rule](/docs/cse/rules/write-outlier-rule/).	

## Test Rule Expression

### Limitations

Each rule expression text box (chain rules have two or more expressions) has a corresponding **Test Rule Expression** button that allows the user constructing a rule to validate that the expression logic matches records. While this is a helpful component in rule validation, it only tests the criteria contained in the expression using a Sumo Logic log search against Cloud SIEM records, other rule criteria required for signal generation are not validated when running the test expression, such as the entity, groupings, or baselines. As such, records returned when running an expression test, even for simple match rules, are not a reliable indicator that the rule will trigger signals when active.

:::note
There are limited circumstances where test rule expression can return misleading results due to minor differences in Cloud SIEM expression syntax and log search syntax. See [Cloud SIEM Rules Syntax](docs/cse/rules/cse-rules-syntax/) for more information.
:::

### Using Test Rule Expression in rule troubleshooting

Despite limitations, the Test Rule Expression feature is still a crucial component in rule troubleshooting. Records returned validate that the tested expression logic is valid (see above note on syntax differences). While records returned won’t necessarily meet other rule criteria, they can be inspected for other rule signal criteria:
   * Entity field is present.
   * Fields for grouping are present.
   * Thresholds are met for a given time period.

## Common rule issues and troubleshooting

### No signals being generated

1. Is the rule state active?
    1. If yes, proceed to the next step.
    1. If no, it could be due to one of the following issues (see [Rules Status](/docs/cse/rules/rules-status)):
       1. Degraded or failed rule state.
          * 100,000 signals within an hour will cause a rule to be disabled temporarily. Rules can be reactivated manually or will turn themselves back on after the hour has passed. Modifying the rule or applying a tuning expression to reduce signal volume is recommended. In some cases, a mapper misconfiguration can cause records that should not match rule criteria to cause high signal volume (see [Troubleshoot mapping](/docs/cse/troubleshoot/troubleshoot-mappers/)).
          * 1,000,000 signals within a day will cause a rule to be disabled until manually reactivated. Modifying the rule or applying a tuning expression to reduce signal volume is recommended. In some cases, a mapper misconfiguration can cause records that should not match rule criteria to cause high signal volume (see [Troubleshoot mapping](/docs/cse/troubleshoot/troubleshoot-mappers/)).
          * Syntax issue. Some syntax issues aren’t identified on rule creation and only surface at processing time. The error message accompanying the degradation or failure will highlight the problematic line and position. Syntax problems can be introduced with rule tuning expressions even if the base rule expression is valid. This often manifests if an error references a line number outside the bounds of the base rule expression as combined expressions are evaluated as one.
       1. Pending baseline (first seen and outlier). A required baseline has not been created for the rule.
       1. Disabled rule. Enable the rule.
1. Do records match the rule expression(s)?
   1. If yes, check other rule criteria is met by the records returned from the test.
   1. If no:
       * Identify expression match criteria causing non-matches. Removing match criteria piece by piece can identify the breaking point in the expression.
       * Validate that the expected match has the correct case. `lower(fieldName) = 'value'` forces the match to be lowercase regardless of the original input.
1. Is an entity from the entity selector present in matching records?
   1. If yes, check other criteria outside of entity and match expression.
   1. If no:
       * Review entity selections in rule.
       * Review contributing mappers are mapping the desired entity in the records. See [Troubleshoot Mappers](/docs/cse/troubleshoot/troubleshoot-mappers/) for specific steps on mapping issues.
1. Are grouping criteria being met?
    1. If yes, check other criteria outside of entity, match expression, and grouping criteria.
    1. If no:
       * Validate that matching records contain the grouping criteria.
       * Review contributing mappers are mapping the fields, or if using "fields" for parsed but not mapped attributes, that the parser is creating parsing the desired field for the record. For specific steps on mapping and parsing issues, see [Troubleshoot Mappers](/docs/cse/troubleshoot/troubleshoot-mappers/) and [Troubleshoot Parsers](/docs/cse/troubleshoot/troubleshoot-parsers/).
1. Are other aggregation criteria being met (counts, math functions, distinct values, etc.)?
    1. If yes, see [Escalate rule issues](#escalate-rule-issues).
    1. If no, interrogate math functions, count, or count distinct criteria are met. [Searches against `sec_record` indexes](#records-index) are best suited for evaluating these criteria.
1. If all rule criteria are met and signals are not being generated see [Escalating rule issues](#escalating-rule-issues).

### Too many signals are generated

1. Determine common criteria triggering undesired signals.
   <br/>Searches against the `sec_signal` index can be used to determine what record criteria is common between signals. Create rule tuning expressions or modify base rule expressions (for custom rules) to narrow record matches. Refer to [Rule Tuning Expressions](/docs/cse/rules/rule-tuning-expressions/).
1. Identify false positives:
    1. Partial string matches.
    <br/> Partial string matches, either with a `like` or regular expression match, frequently with process, file and command line snippets, can run the risk of matching on unintended strings. Short string matches in particular run this risk. If a short string match is required for the rule, consider adding word boundaries such as a space or other characters that can be expected but aren’t necessarily part of the string in question:
       * Regex word boundary `\b` 
       * Spaces before or after the string
       * Slashes in file paths
    1. Insufficient filtering criteria.
       <br/>Expression matches targeting specific patterns, such as in a command line, have potential to come from myriad data sources that aren’t pertinent to the desired detection. Add additional filtering criteria that may not be critical to the detection, but reduces the volume of records considered for a detection without compromising the fidelity of the rule. Command lines only relevant to Windows could include additional criteria to narrow the detection to Windows sources. The inverse would be true for detections that would not be relevant to Windows, such as commands only pertinent to Unix based systems.
    1. Erroneous entity selection. 
    <br/>There is no limit on the number of entities that can be selected for a rule, but selecting too many entities may result in undesired signal volume if the entity for which a signal is created is not pertinent to the intent of the detection. For example, RDP logon from localhost will only contain localhost (`127.0.0.1`) IP addresses which will not be useful in the detection

### Signal suppression problems

If signals are not suppressed that you want to suppress, validate that each condition of signal suppression are met:
1. Validate that a signal of the same name is generated (controlled by [signal name](#signal-name)). 
<br/>Templated values in the signal name increase the variability of the signal name and can lead to undesired unsuppressed signals. Remove templated values that aren’t critical to the signal.
1. Validate that a signal of the same entity is generated. 
<br/>Ensure entity or entities pertinent to the detection are selected.
1. Validate that a signal is generated within the suppression window (default 72 hours or overridden window size).

If signals are suppressed that you don't want to be suppressed: 
1. Validate that the above suppression criteria are not being met. 
1. Consider making the signal name more dynamic by including relevant templated values that surface unique characteristics of a signal. 
1. Signal on additional entities. 
1. Create individual rules to override the default suppression window if desired.

### Signal time offset

When signal or signals timestamps differ from their constituent records, record timestamps typically account for time differences in signals. Records will default to UTC for timestamp if there is missing, misconfigured, or unparsed timezone information.

Time issues can be introduced at several places in the processing pipeline:
* Collection
<br/>Time handling can be configured in the collector and source. Misconfiguration here has the potential to impact record timestamps.
* Parsing
<br/>Most record timestamps are set within the parser. See [Troubleshoot Parsers](/docs/cse/troubleshoot/troubleshoot-parsers/) for parser troubleshooting.
* Mapping
<br/>Timestamps can be set within log mappers by setting the timestamp field along with timestamp format. See [Troubleshoot Mappers](/docs/cse/troubleshoot/troubleshoot-mappers/) for mapping troubleshooting.

## Escalate rule issues

If all steps outlined in this article have been exhausted, it may be necessary to escalate the issue to the Cloud SIEM engineering team.

### Escalation requirements

Provide the following:
* A concise description of the issue, including expected behavior and actual behavior.
* Supporting evidence:
    * Records or raw messages that were expected to trigger or should not have triggered a signal or signals.
    * Screenshots of the issue if applicable.
    * Rule criteria for custom rules or tuning expressions:
        * Export of the rule if custom.
        * Rule tuning expression and criteria (include/exclude).

## Useful dashboards and search queries

The [Enterprise Audit - Cloud SIEM](/docs/integrations/sumo-apps/cse/) app includes useful dashboards for monitoring Cloud SIEM components including rules:
* Signal analysis:
    * [Cloud SIEM - Signal Analysis](/docs/integrations/sumo-apps/cse/#cloud-siem---signal-analysis)
    * [Cloud SIEM - Signal Analysis - Rules](/docs/integrations/sumo-apps/cse/#cloud-siem---signal-analysis---rules)
    * [Cloud SIEM - Signal Monitoring](/docs/integrations/sumo-apps/cse/#cloud-siem---signal-monitoring)
    * [Cloud SIEM - Signals by Product](/docs/integrations/sumo-apps/cse/#cloud-siem---signals-by-product)
    * [Cloud SIEM - Signals Overview](/docs/integrations/sumo-apps/cse/#cloud-siem---signals-by-product)
    * [Signal Analysis - Suppression](/docs/integrations/sumo-apps/cse/#signal-analysis---suppression)
* Health monitoring: [Cloud SIEM - Rule Overview](/docs/integrations/sumo-apps/cse/#cloud-siem---rule-overview)
* Other: [Cloud SIEM - Rules and Mapping Changes](/docs/integrations/sumo-apps/cse/#cloud-siem---rules-and-mapping-changes)

## Useful queries and strategies

### Single rule analysis

Use this search query to return signal attributes for a single rule including the name, the vendor/product combo producing the signals, the entity and type of entity, as well as whether the signal was suppressed. This can be used to quickly identify broad triggering attributes for a given rule and assist in tuning.

```json
(_index=sec_signal) ruleId="MATCH-U00000" 
| json field=fullRecords "[0].metadata_vendor" as vendor nodrop
| json field=fullRecords "[0].metadata_product" as product nodrop
| json field=entities "[0].type" as entity_type nodrop
| json field=entities "[0].value" as entity_value nodrop
| json field=entities "[0].suppressed" as suppression_status nodrop
| count by ruleName, ruleId, vendor, product, entity_value, entity_type, suppression_status
| sort by _count
```

### Top entities analysis

Use this search query to return the top entities creating signals to identify patterns in those entities that may indicate false positives or opportunities for rule tuning.

```json
(_index=sec_signal)
| json field=fullRecords "[0].metadata_vendor" as vendor nodrop
| json field=fullRecords "[0].metadata_product" as product nodrop
| json field=entities "[0].type" as entity_type nodrop
| json field=entities "[0].value" as entity_value nodrop
| json field=entities "[0].suppressed" as suppression_status nodrop
| count entity_value, entity_type | top 50 entity_value, entity_type by _count
```

### Records index

Using the records index `_index=sec_record*` is much more flexible than using **Test Rule Expression** within the rules editor, as you can quickly enter search terms and get records that can match the desired rule criteria to preemptively identify patterns in records that could be useful in a rule or tuning expression.

For more information about searching using the records index, see [Searching for Cloud SIEM Records in Sumo Logic](/docs/cse/records-signals-entities-insights/search-cse-records-in-sumo/).
