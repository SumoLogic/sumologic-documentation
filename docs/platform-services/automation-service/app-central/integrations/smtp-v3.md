---
title: SMTP V3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/smtp-v3.png')} alt="smtp-v3" width="100"/>

***Version: 3.2  
Updated: Mar 18, 2024***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Allows you to connect your mailbox with Cloud SOAR and send emails via SMTP protocol.

## Actions

* **Send Email** (*Notification*) - Send an email.

## Guidelines for composing the email body in the "Send Email" action

* **Raw Text Message**. When sending a plain text message in the email body, it's important to avoid clicking on the text field after you've written your message. If you do click on the text field, the formatting of your text may become distorted or "munged" together. To ensure your text retains its original formatting when delivered in the email, avoid interacting with the text field after composing your message.

* **HTML Template**. For emails using an HTML template, ensure you have a properly structured HTML template. Whether you click on the text field or not after writing the message, the email will generally display correctly with proper formatting as expected.

However, for optimal results with HTML templates, we recommend clicking on the text field after writing your message. This action helps ensure that the HTML content is recognized and formatted correctly, giving you the desired outcome in the final email.

## Summary

* **Raw Text Message**. Avoid clicking on the text field after writing to prevent formatting issues.
* **HTML Template**. Clicking on the text field after writing is recommended for the best formatting, though your email should still display correctly without this step.

## Category

Email Gateway

## Change Log

* June 20, 2022 - First upload
* October 6, 2023 (v3.1) - Integration Updated
* March 18, 2024 (v3.2) - Send Email action updated
