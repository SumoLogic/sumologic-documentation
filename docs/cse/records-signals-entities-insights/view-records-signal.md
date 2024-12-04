---
id: view-records-signal
title: View Records for a Signal
description: Learn how to view records associated with a signal.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cloud SIEM uses rules to evaluate incoming records, and when the conditions of a rule are met, generates a signal. This topic explains how to view records associated with a signal in Cloud SIEM.
 
## View record details

1. [**Classic UI**](/docs/cse/introduction-to-cloud-siem/#classic-ui). To view signals, click **Signals** at the top of the screen. <br/>[**New UI**](/docs/cse/introduction-to-cloud-siem/#new-ui). To view Signals, in the main Sumo Logic menu select **Cloud SIEM > Signals**. You can also click the **Go To...** menu at the top of the screen and select **Signals**. 
1. Select a signal. The signal's details display. <br/>When you view the details page for a signal that was triggered by a threshold, aggregation, or chain rule, you’ll see a section that displays records that matched the rules conditions. These records will continue to be associated with the signal as long as the signal is available. 
1. Click the plus sign (+) for a record to view its details. 
1. Use the following to work with the records: 
   * **Timestamp**. Sort records by their timestamp. 
   * **Open in Log Search**. Select one of the the following options to run a query for the signal's records in log search:
       * **Distinct Aggregated Records**. Exact records evaluated by the rule.
       * **All Related Records**. All records related to the signal.
   * **Export**. Export the records to a comma-separated value (CSV) or JSON file.<br/><img src={useBaseUrl('img/cse/attached-records.png')} alt="View attached records" style={{border: '1px solid gray'}} width="800"/>
     :::note
     Only a single record is attached to the signal itself. Any other involved records are retrieved via log search. If the records are past their retention period, they no longer appear in the UI. In the API and `sec_signal` index, only the single attached record is included, along with a list of any other entities that were seen on the involved records (in `involvedEntities`). You must select **Open in Log Search** to find the other involved records.
     :::

## Select favorite fields

Favorite fields let you show the most important fields in the summary view of a record so you don't have to open the record's details to see them.

To select favorite fields:
1. Open a signal to view the first record associated with it. <br/><img src={useBaseUrl('img/cse/example-record.png')} alt="Example record" style={{border: '1px solid gray'}} width="800"/>
1. Click the **+** on the record. The record's details are displayed. 
1. In the record's details, favorite fields have a bright star next to them. <br/><img src={useBaseUrl('img/cse/favorite-field.png')} alt="Favorite field" style={{border: '1px solid gray'}} width="50"/> <br/>Notice how the favorite fields appear in the record's summary information. In the following screen image, a few favorite fields are highlighted to show how they appear in the record's summary information.<br/><img src={useBaseUrl('img/cse/example-record-favorite-fields.png')} alt="Example record with favorite fields" style={{border: '1px solid gray'}} width="800"/>
1. To select a favorite field, hover your mouse over a dimmed star until it says **Enable Favorite Field** and then click it. <br/><img src={useBaseUrl('img/cse/enable-favorite-field.png')} alt="Enable favorite field" style={{border: '1px solid gray'}} width="200"/>
1. To deselect a favorite field, hover your mouse over a bright star until it says **Disable Favorite Field** and then click it. <br/><img src={useBaseUrl('img/cse/disable-favorite-field.png')} alt="Disable favorite field" style={{border: '1px solid gray'}} width="200"/>
