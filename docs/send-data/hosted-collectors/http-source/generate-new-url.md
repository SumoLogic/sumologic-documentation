---
id: generate-new-url
title: Generate a new URL for an HTTP Source
sidebar_label: Generate HTTP Source URL
---

You can generate a new URL for an HTTP Source at any time. Generating a new URL completely invalidates the old URL.

:::note
If you see a 401 (failed to authenticate) error message right after generating a new URL, wait a few minutes, then try the new URL again.
:::

To generate a new URL:

1. In Sumo Logic select **Manage Data > Collection > Collection**. 

1. On the **Manage Collection** page, click **Regenerate URL** next to the HTTP source.

    ![HTTPregenURL.png](/img/send-data/regenerate-url.png)

1. In the **HTTP Source Address** dialog box, click **Generate**.

    ![http_source_dialog_generate.png](/img/send-data/generate-new-url.png)    

1. When asked to confirm the generation, click **OK**.
1. In the **HTTP Source Address** dialog box, the new URL is displayed. Copy and paste the URL, then click **OK**.

    ![img](/img/send-data/http_source_dialog_with_button.png)
