---
id: setup-wizard
title: Sumo Logic Setup Wizard
sidebar_label: Setup Wizard
description: Use the Setup Wizard to quickly get started sending data to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::note
* The Setup Wizard is now available in both the [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/) and [**New UI**](/docs/get-started/sumo-logic-ui). We recommend using the [App Catalog](/docs/integrations/) to onboard your data.
* The old Setup Wizard in the Classic UI has been deprecated, and the **Integrate with Sumo Logic** tile has been removed. If you are still using the older version and experience issues, please contact Sumo Logic Customer Support.
:::

The Setup Wizard lets you get data in your Sumo Logic account quickly. It guides you step-by-step based on the type of data you want to send. After data collection is running, the Setup Wizard installs a Sumo Logic App with pre-configured Dashboards that allow you to analyze your data. The Setup Wizard provides detailed instructions to help you with each step of the configuration.

Before you begin, [sign up](/docs/get-started/sign-up.md) for a Sumo Logic account and activate it.

Follow the steps below to open the Setup Wizard:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. Click the **Setup Wizard** link on the Collection page.
<img src={useBaseUrl('img/get-started/setup-wizard.png')} alt="Setup Wizard" style={{border: '1px solid gray'}} width="700" />

:::note
Keyboard shortcuts are not available when the Setup Wizard is open.
:::

## Upload log files

A great way to try out Sumo Logic for the first time is to upload a local log file. To do this, click **Upload Log Files**. You can upload up to 20 files and 100MB total per upload.
<img src={useBaseUrl('img/send-data/setup-wizard/upload-files.png')} alt="Setup Wizard" style={{border: '1px solid gray'}} />

Uploading a local file allows you to try Sumo Logic without configuring a Collector to ingest live, streaming data. To continuously monitor a file in your environment, [configure a Collector and Source](/docs/send-data/choose-collector-source) within Sumo Logic.

The following file types are **not** supported:

* bz2
* dmg
* doc
* docx
* exe
* gif
* jpg
* jpeg
* pdf
* png
* ppt
* pptx
* svg
* tar
* tgz
* xls
* xlsx
* zip

## Sumo Logic App Catalog

Clicking the **Sumo Logic App Catalog** in the Setup Wizard will redirect you to the Sumo Logic App Catalog page where you can find several types of apps available in Sumo Logic.
<img src={useBaseUrl('img/send-data/setup-wizard/app-catalog.png')} alt="Setup Wizard" style={{border: '1px solid gray'}} width="700" />

## Learn

Clicking **Learn** in the Setup Wizard will redirect you to the **Learn** tab on the home screen, which is a built-in education and onboarding hub designed to help you quickly understand and use the Sumo Logic effectively.
The Learn page will typically help you find the getting started guides for onboarding and initial setup, product documentation and micro lessons, and links to training courses, certifications, and community resources.
<img src={useBaseUrl('img/send-data/setup-wizard/learn-tab.png')} alt="Setup Wizard" style={{border: '1px solid gray'}} width="700" />

## Troubleshoot Setup Wizard issues

If you are having trouble configuring a Source using the Setup Wizard, check the following issues.

### "It looks like you haven't activated your account..."

When you sign up for a Sumo Logic Trial account, the system automatically sends you an activation email. To activate your new account, go to your email, click the **Activate Now** link, then complete and submit the activation form. When you complete this process, the Setup Wizard is displayed in a _new_ tab.

But if you return to the Setup Wizard in your _original_ tab, you may see a blocking overlay that displays the message **“It looks like you haven’t activated your account…”** on some pages.

If you see this message, and you have already activated your account, just click the **refresh** button in your browser window. Your account will be activated in the _original_ tab, and the overlay will be removed.

Otherwise, make sure to activate your account using the Sumo Logic activation email.

### "We are unable to ingest the data from the source you specified."

When using the **Upload Files** option from the Setup Wizard it creates a Hosted Collector with the name "File Uploads". If a Hosted Collector with the same name already exists the Setup Wizard will use the existing Collector.

**Upload Files** only works if no other Sources are running on the "File Uploads" Collector. The "File Uploads" Collector can only process one Source at a time.

Do not add Sources to the "File Uploads" Collector, reserve it for the Setup Wizard.
