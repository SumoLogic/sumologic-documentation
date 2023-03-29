---
title: Deactivation of unused access keys
image: https://www.sumologic.com/img/logo.svg
keywords:
  - access keys
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

We are excited to announce that by default API access keys will automatically be deactivated if they have been unused for 30 days. This capability has been added to enhance the security of your account, by reducing the risk of unauthorized access through inactive access keys. This ensures that only active access keys can be used to access your account and its resources. [Learn more](/docs/manage/security/access-keys#edit-deactivate-or-delete-an-access-key).

In addition to the default setting, we have also provided an option for administrators to set a custom policy for the number of days, from 1 to 365 days, an access key can be unused before being automatically deactivated. This allows administrators to tailor the feature to suit their organization's specific security requirements.

To access this feature, log in to your account and go to the **Administration > Security > Policies** section of your account. From there, you can set your preferred policy for deactivation of unused access keys.
