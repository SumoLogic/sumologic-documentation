---
id: set-insight-generation-window-threshold
title: Set Insight Generation Window and Threshold
sidebar_label: Insight Generation Settings
description: Learn how to configure the detection window and the threshold Activity Score for Insight generation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for changing the detection window and the threshold Activity Score for Insight generation.

By default, the detection window is 14 days, and the threshold Activity Score is 12. That means if an Entity's Activity Score goes from 0 to 13 within a 14 day period, CSE will generate an Insight on that Entity. For information about how that works, see [Unders tanding Entity Activity Scores](/docs/cse/get-started-with-cloud-siem/insight-generation-process/), in the *Insight Generation Process* topic.

To change the Insight Generation settings:

1. In the CSE UI, click the gear icon and select **Detection** under **Workflow**. <br/><img src={useBaseUrl('img/cse/detection-link.png')} alt="Detection link" width="300"/>
2. The **Detection Threshold** popup appears and shows your current detection settings.<br/><img src={useBaseUrl('img/cse/detection-threshold-popup.png')} alt="Detection threshold settings" width="700"/><!-- We need a new screenshot -->
3. **Detection Window**. Enter the duration, in days, during which an Entity's Activity Score must reach the Threshold to result in an Insight being generated for the Entity. 
4. **Threshold**. Enter the threshold Activity Score value that an Entity must reach during the Detection window to result in an Insight being generated for the Entity. 
5. **Global Signal Suppression Window**. By default, redundant Signals for a Signal-Entity combination are automatically suppressed for a maximum period of 72 hours to avoid repeated Signals contributing to Insight generation. This setting lets you modify this period based upon your organizational needs. To change this setting, select the number of hours to suppress Signals, anywhere from 24 hours to 72 hours. For additional ways to control signal suppression, see [About Signal Suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/).
5. Click **Save**. 
