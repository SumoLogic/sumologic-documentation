---
id: steps-to-migrate
title: Steps to Migrate (New)
description: Step-by-step process to migrate Dashboards (Classic) to Dashboards (New) functionality.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

This document walks you through the entire process of migrating classic dashboards to new dashboards.

:::caution
We do not guarantee 100% conversion from classic to new dashboard, although we do provide an exhaustive list of incompatibilities that need to be taken care of. You can still keep your old dashboard after migration.
:::

## Migration Steps 

This section explains to you the step-by-step process to migrate your dashboards.

1. Navigate to any of your classic dashboards or create a new one. Click on **Migrate to new dashboards**.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard1.png')} alt="dashboard" width="600"/>
2. A dialog box appears. Click **Migrate to New Dashboard** as shown below.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard2.png')} alt="dashboard" width="600"/>
3. Click **Open Dashboard** to view the migrated dashboard, given the migration is successful.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard3.png')} alt="dashboard" width="600"/> <br/>The following dialog can have 2 other states:
    1. **Warning State.** Showing any warnings during migrations: warnings don’t fail the migration process, however, it might be something that you have to fix on your own or is a feature that is not yet supported on the new dashboard.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard4.png')} alt="dashboard" width="600"/>
    2. **Error State.** The process can sometimes run into an error state, this fails the migration and the new dashboard is not created.<br/><img src={useBaseUrl('img/dashboards-new/migrate-dashboard5.png')} alt="dashboard" width="600"/>

### Bulk Migration

The bulk migration feature is an extension to the dashboard migration feature that allows the user to migrate multiple classic dashboards at once:

1. Go to **Library**, and select two or more **Dashboards**. Click on **Migrate Dashboards**.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-1.png')} alt="dashboard" width="600"/>
  :::info
  Choosing more than 50 dashboards will disable the **Migrate Dashboards** button.
  :::
2. A dialog box appears. Click **Migrate to New Dashboard** as shown.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-2.png')} alt="dashboard" width="600"/>
3. The bottom right corner shows real-time information on the migration process.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-3.png')} alt="dashboard" width="600"/>
4. The following information is populated once the migration is complete.
    * Summary of the process.
    * Hovering on the error (if any) shows the error information in the tooltip.
    * The dashboard names are clickable and can open up the dashboard.<br/><img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/Bulk+Migration/Screenshot-4.png')} alt="dashboard" width="600"/>
