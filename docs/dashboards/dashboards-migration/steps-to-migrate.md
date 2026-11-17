---
id: steps-to-migrate
title: Steps to Migrate
description: Step-by-step process to migrate Dashboards (Classic) to the current Sumo Logic dashboards format.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This page walks you through the entire process of migrating classic dashboards to Sumo Logic dashboards.

:::warning
We do not guarantee a 100% conversion from classic dashboards to Sumo Logic dashboards, although we provide an exhaustive list of incompatibilities that you need to resolve. You can still keep your old dashboard after migration.
:::

## Migration steps

This section explains how to migrate your dashboards, step by step.

1. Navigate to any of your classic dashboards or create a new one. Click **Migrate to dashboards**.<br/><img src={useBaseUrl('img/dashboards/migrate-dashboard1.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/>
2. A dialog box appears. Click **Migrate to Dashboard** as shown below.<br/><img src={useBaseUrl('img/dashboards/migrate-dashboard2.png')} alt="dashboard" style={{border: '1px solid gray'}} width="600"/>
3. If the migration succeeds, click **Open Dashboard** to view the migrated dashboard.<br/><img src={useBaseUrl('img/dashboards/migrate-dashboard3.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/> <br/>The dialog can also show two other states:
    1. **Warning State.** The dialog shows any warnings from the migration. Warnings do not fail the migration process, but they may point to something you need to fix yourself or to a feature that dashboards do not yet support.<br/><img src={useBaseUrl('img/dashboards/migrate-dashboard4.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/>
    2. **Error State.** The process can sometimes run into an error state. An error fails the migration, and the dashboard is not created.<br/><img src={useBaseUrl('img/dashboards/migrate-dashboard5.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/>

### Bulk migration

Bulk migration extends the dashboard migration feature so you can migrate multiple classic dashboards at once:

1. Go to **Library**, and select two or more **Dashboards**. Click **Migrate Dashboards**.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-1.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/>
  :::info
  If you select more than 50 dashboards, the **Migrate Dashboards** button is disabled.
  :::
2. A dialog box appears. Click **Migrate to Dashboard** as shown.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-2.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/>
3. The bottom right corner shows real-time information on the migration process.
4. When the migration is complete, the following information appears.
    * Summary of the process.
    * Hover over an error, if any, to see its details in a tooltip.
    * Click a dashboard name to open that dashboard.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-4.png')} style={{border: '1px solid gray'}} alt="dashboard" width="600"/>
