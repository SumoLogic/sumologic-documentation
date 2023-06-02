---
id: set-insight-generation-window-threshold
title: Set Insight Generation Window and Threshold
sidebar_label: Insight Generation Settings
description: Learn how to configure the detection window and the threshold Activity Score for Insight generation.
---



This section has instructions for changing the detection window and the threshold Activity Score for Insight generation.

By default, the detection window is 14 days, and the threshold Activity Score is 12. That means if an Entity's Activity Score goes from 0 to 13 within a 14 day period, CSE will generate an Insight on that Entity. For information about how that works, see [Understanding Entity Activity Scores](/docs/cse/get-started-with-cloud-siem/insight-generation-process/), in the *Insight Generation Process* topic.

To change the Insight Generation settings:

1. In the CSE UI, click the gear icon and select **Detection** under **Workflow**. 
    ![detection-link.png](/img/cse/detection-link.png)   
2. The **Detection Threshold** popup appears and shows your current detection settings.
    ![detection.png](/img/cse/detection-threshold-popup.png)
3. **Detection Window**. Enter the duration, in days, during which an Entity's Activity Score must reach the Threshold to result in an Insight being generated for the Entity. 
4. **Threshold**. Enter the threshold Activity Score value that an Entity must reach during the Detection window to result in an Insight being generated for the Entity. 
5. Click **Save**. 


 
