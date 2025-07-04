---
title: IMAP
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/imap.png')} alt="imap" width="80"/>

***Version: 1.3  
Updated: Mar 4, 2024***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Allows you to connect your mailbox with Cloud SOAR and receive mail via IMAP protocol.

## Actions

* **Incoming Mail Daemon** (*Daemon*) - Automatically get emails using IMAP and save emails.

## Get Access Key and Access ID

[Create a Sumo Logic access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure IMAP in Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **IMAP Server**. Enter the IMAP server URL, for example, `Imap.gmail.com`, `Outlook.office365.com`, `Imap.mail.yahoo.com`

* **Port**. Select the IMAP port, either `993 SSL/TLS` or `143`

* **Username**. Enter the username of an admin user authorized to provide authentication for the integration.

* **Password**. Enter the password for the admin user.

* **Connection Security**. Select `SSL/TLS` or `STARTTLS`
* <IntegrationTimeout/>
* **Do not allow trusted certificates**. Select to allow untrusted certificates.

* **Mailbox Account**. Enter the mailbox account. Only required if the username isn't already an email address (for example, when for username `admin` the mailbox account is `admin@test.com`).
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>

* **Email Fetch Type (Daemon)**. Select either:
   * **Unseen/Unread**. Only fetch the mails which are currently UNSEEN or UNREAD.
   * **Fetch From Latest CSOAR Mail**. Fetch all mails from the mail server which are not yet stored on Cloud SOAR. For the first time it will fetch UNSEEN mails for the second run/execution. Pre-Filtering options can be used to pre-filter emails in the mail server. Only pre-filtered emails are imported and analyzed by Cloud SOAR. See [Email fetch (daemon)](#email-fetch-daemon) below.

* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/imap-configuration.png')} style={{border:'1px solid gray'}} alt="IMAP configuration" width="400"/>

### Email fetch (daemon)

**Email Fetch Type** and other filters below will be combined with the **AND** operator. Pre-filtered options:
            * **From**. You can filter email using From or you can use the full domain name. For example, `sumologic.com, sales@sumologic.com`. Based on this example, only the mails coming from Sumo Logic domain or `sales@sumologic.com` will be fetched. This field accepts multiple values separated by a comma. Multiple values will be combined with the OR operator.
            * **To**. Indicate the receiver of the mail. This filter works the same as the From filter. This field accepts multiple values separated by a comma. Multiple values will be combined with the OR operator.
            * **Subject**. Fetch emails based on the subject. This field accepts multiple values separated by a comma. Multiple values will be combined with the OR operator.
            * **Text Body**. Fetch emails based on a text search inside the body. It also works for attachment names. This field accepts multiple values separated by a comma. Multiple values will be combined with the OR operator.
            * **Header**. Header string to be searched based on the filter below.
            * **Header Field Name To Search in Header**. A list from which you can choose a header element where to search the provided value in the previous field.

          Pre-filtered options are also available to filter as **NOT** condition:
            * **Not From**
            * **Not To**
            * **Not Subject**
            * **Not Text Body**
            * **Not Header**
            * **Header Field Name To Search in Header**

          Behaves similarly to the other pre-filter, but the email elements matching the provided conditions will not be fetched. 

          As specified, all filters will be combined with **AND** operator.


## Additional configuration

### Testing incoming mail daemon

It is recommended to test this action before proceeding.

1. Click the action name.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-10.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/>
1. Click **TEST ACTION**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-11.png')} style={{border:'1px solid gray'}} alt="imap" width="400"/>
1. This test action returns results based on the configuration. Once you get the results, then your IMAP configuration and mail daemon are working correctly.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-12.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>

### List Cloud SOAR emails

You can use the List Cloud SOAR Emails action directly from the Mail Tools integration page:

1. Click the action.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-13.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/>
1. Click **TEST ACTION**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-14.png')} style={{border:'1px solid gray'}} alt="imap" width="400"/>
1. After a moment you should receive the results.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-15.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>

### Create custom fields

Now you have to create two Custom Fields, one for Incident and the other for Triage. We will need this custom Field in playbook and incoming events automation rule mapping.

Follow these steps:

1. Expand the configuration menu in the top right corner by hovering over the gear icon and click **Settings**.
2. On the left menu expand **Customization** options.
3. Then click on **Fields**.
4. Make sure the **Triage** section is selected.
5. Click on the button to add a new field.
6. Enter the name (for example: `CSOAR Email ID`).
7. Make sure the Visible option is selected.
8. Click **CREATE**.
9. Now you should see the new field in the table.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-16.png')} style={{border:'1px solid gray'}} alt="imap" width="800"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-17.png')} style={{border:'1px solid gray'}} alt="imap" width="400"/>
1. Repeat the same steps from 5 to 9 for the Incidents section.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-18.png')} style={{border:'1px solid gray'}} alt="imap" width="800"/>

### Create an Incident associated with mail

Once IMAP is configured you have the possibility to create an Incident associated with mail.

1. Create a new playbook or you can update the existing playbook.
1. Select the **Add Email To Incident** action for the node name.
   For **Cloud SOAR Email ID** choose the ID that you created earlier (for example, **CSOAR Email ID** from **Incident** fields).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-19.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-20.png')} style={{border:'1px solid gray'}} alt="imap" width="800"/>
1. Now let's expand the playbook by adding the ability to save attachments in the incident. Create a new node of type action and set the fields as you can see in the following picture.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-21.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>
1. Now we need a new node of type Condition. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-22.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>
1. Finally add another action as you can see. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-23.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>
1. Below you can see the final playbook.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-24.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>
1. Another scenario that could be used with the IMAP mail daemon is to analyze an EML or MSG attachment that is contained in the mail without saving the attachment in the incident. Users can just extract the email with a given email ID.
   The following example demonstrates that in an incident:
    * Use the same action Add Email to Incident as seen before. This action is used to attach the email to the current incident.
    * Then create Analyze EML MSG action (Mail Tools) .
    * Select what should be parsed from the EML or MSG attachments.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-25.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>
1. Below you can see the final playbook.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-26.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/>

### Create an Incident Template

Once the playbook is ready, then you can create an Incident Template.

1. In the Automation section click on Incident templates.
2. Click the button to create a new Template or jump to step 3 if you already have one.
3. Select the template.
4. Click the button to add a new playbook (more than one playbook can added).
5. Search your playbook.
6. Select the playbook(s) you want to add.
7. Click Add.
8. Enable AUTORUN.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-27.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-28.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-29.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-30.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/>

### Create a new Rule

At this point you have to create a Daemon Rule.

1. In the Automation section click on Rules.
2. Click the button to create a new rule.
3. Fill in all the required fields and click SAVE.
4. Next we will create a filter.
5. Click the button to add a filter.
6. After you created the filter click SAVE.
7. Click the button to add a new action.
8. Fill in all the required fields and click SAVE.
9. Click the button and create a new mapping. Daemon Field must be cloud\_soar\_mail\_id and Cloud SOAR Field must be set to a custom field.
10. Finally enable the Rule.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-31.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-32.png')} style={{border:'1px solid gray'}} alt="imap" width="600"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-33.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-34.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-35.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-36.png')} style={{border:'1px solid gray'}} alt="imap" width="500"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-37.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-38.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/>

### Email Body Regex

This action allows you to fetch the desired information from the email body using regular expression.

In the following example we add a new node in our playbook giving the following information.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-39.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/>

The final playbook looks like this:<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/imap/imap-40.png')} style={{border:'1px solid gray'}} alt="imap" width="700"/>

## Regex actions

* **IP**: ([0-9]+(?:\.[0-9]+){3})
* **Email**: [\w\.-]+@[\w\.-]+
* **URL**: `(?i)(?:(?:https?|ftp):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~\_|$?!:,.]\*\)|[-A-Z0-9+&@#\/%=~\_|$?!:,.])\*(?:\([-A-Z0-9+&@#\/%=~\_|$?!:,.]\*\)|[A-Z0-9+&@#\/%=~\_|$])`
* **Domain**: `(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{,61}[a-zA-Z0-9])?\.)\*[a-zA-Z]{2,6}(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}`
* **MD5**: \b[0-9a-fA-F]{32}\b
* **SHA1**: \b[0-9a-fA-F]{40}\b
* **SHA256**: \b[0-9a-fA-F]{64}\b
* **DateTime Regex Example (2021-01-28 11:21:04)**: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}
* **Email Attachments Filename (Email Header Regex Action)**: filename: (.\*?),,
* Common credit card vendor Regex:
    + **MasterCard**: (?:5[1-5][0-9]{14}|2(?:22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))
    + **Visa Mastercard**: (?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})
    + **Amex Card**: 3[47][0-9]{13}
    + **BCGlobal**: (6541|6556)[0-9]{12}
    + **Carte Blanche Card**: 389[0-9]{11}
    + **Diners Club Card**: 3(?:0[0-5]|[68][0-9])[0-9]{11}
    + **Discover Card**: 65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})
    + **Insta Payment Card**: 63[7-9][0-9]{13}
    + **JCB Card**: (?:2131|1800|35\d{3})\d{11}
    + **KoreanLocalCard**: 9[0-9]{15}
    + **Laser Card**: (6304|6706|6709|6771)[0-9]{12,15}
    + **Maestro Card**: (5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}
    + **Solo Card**: (6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}
    + **Switch Card**: (4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}
    + **Union Pay Card**: (62[0-9]{14,17})
    + **Visa Card**: 4[0-9]{12}(?:[0-9]{3})?

## Change Log

* May 7, 2019 - First upload
* February 8, 2021 - Updated actions
* March 8, 2022 - Description, Guide
* May 5, 2022 - Added new filter options for Incoming Mail Daemon
* October 2, 2023 (v1.2) - Integration Updated
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
