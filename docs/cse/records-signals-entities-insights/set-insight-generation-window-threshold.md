---
id: set-insight-generation-window-threshold
title: Set Insight Generation Window and Threshold
sidebar_label: Insight Generation Settings
description: Learn how to configure the detection window and the threshold activity score for insight generation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for changing the detection window and the threshold activity score for insight generation.

By default, the detection window is 14 days, and the threshold activity score is 12. That means if an entity's activity score goes from 0 to 13 within a 14 day period, Cloud SIEM will generate an insight on that entity. For information about how that works, see [Understanding entity activity scores](/docs/cse/get-started-with-cloud-siem/insight-generation-process#understanding-entity-activity-scores), in the *Insight Generation Process* topic.

To change the insight generation settings:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Workflow** select **Detection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu click **Configuration**, and then under **Cloud SIEM Workflow** select **Insight Detection**. You can also click the **Go To...** menu at the top of the screen and select **Insight Detection**.  
<br/>Your current detection settings are displayed on the Insight Detection page.<br/><img src={useBaseUrl('img/cse/detection-threshold-popup.png')} alt="Detection threshold settings" style={{border: '1px solid gray'}} width="600"/>
1. Enter values for **Detection Threshold** and **Signal Suppression**:
     *  **Standard Threshold**
         * **Detection Window (Days)**. Enter the duration, in days, during which an entity's activity score must exceed the threshold to result in an insight being generated for the entity. 
         * **Threshold**. Enter the threshold activity score value that an entity must exceed during the detection window to result in an insight being generated for the entity. 
     * **Global Signal Suppression**
         * **Maximum Period (Hours)**. By default, redundant signals for a signal-entity combination are automatically suppressed for a maximum period of 72 hours to avoid repeated signals contributing to insight generation. This setting lets you modify this period based upon your organizational needs. To change this setting, select the number of hours to suppress signals, anywhere from 24 hours to 72 hours. For additional ways to control signal suppression, see [About Signal Suppression](/docs/cse/records-signals-entities-insights/about-signal-suppression/).
1. Click **Save**. 
