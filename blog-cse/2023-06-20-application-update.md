---
title: June 20, 2023 - Application Update
keywords:
  - cloud siem
  - ueba
  - outlier rules
  - configurable supression period
  - application status
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Outlier Rules

Sumo Logic is pleased to announce a new rule type for Cloud SIEM Enterprise (CSE): Outlier Rules. This new rule type further enhances CSE’s User and Entity Behavioral Analytics (UEBA) capabilities. With these rules, CSE can detect events that deviate from the usual behavior of an Entity, such as a spike in login failures from a user, without having to define a static threshold. Once the rule is set, CSE automatically builds a normal behavior baseline for each Entity based on the rule expression. It creates a signal only when a deviation from normal behavior is detected (in this case, too many login failures compared to their normal baseline behavior). Other examples include detecting a spike in Windows administrative privileges granted and a spike in AWS calls from a user.

Outlier Rules are defined like any other rule type through the Content menu in CSE.

<img src={useBaseUrl('img/release-notes/cse/outlier-signal.png')} alt="Example Signal from Outlier Rule"/>

Outlier Rules operate based on a baseline. During this period - typically between 7 and 30 days - the system will learn what normal behavior looks like. After the baseline is established, CSE will begin generating Signals when unusual behavior is detected compared to that baseline. (Note that the longer the baseline, the more accurate the model will be.)

CSE will include a set of Outlier Rules out of the box. These rules can be tuned and customized like any other rule type, and custom Outlier Rules can also be created.

For more information about how to use Outlier Rules, see the online [documentation](/docs/cse/rules/write-outlier-rule/). You can also see an introduction to the feature by navigating to the Rules page in CSE.

### Minor Changes and Enhancements

* [New] Users can now customize the global Signal Suppression period. During this period, which is set to 72 hours by default, duplicate signals (with identical names and Entities) are suppressed (for example, they do not “count” towards Insights). With this new feature, this period can be lowered globally (for all rules) to as low as 24 hours. (Note that lowering this value can lead to a higher number of potentially duplicate Insights.) The setting is accessible via the **Workflow** > **Detection** option in the Configuration menu.
* [Updated] CSE application status will now be published on the main Sumo Logic status page, [https://status.sumologic.com/](https://status.sumologic.com/). (Previously it was published on [https://cse-status.sumologic.com/](https://cse-status.sumologic.com/).) Existing email subscriptions and status notifications will be moved to the new page automatically.
