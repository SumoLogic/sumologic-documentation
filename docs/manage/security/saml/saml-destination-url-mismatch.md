---
id: saml-destination-url-mismatch
title: Fix SAML Destination URL Mismatch
sidebar_label: Fix SAML Destination URL Mismatch
description: Fix a SAML Destination URL mismatch by setting your IdP's ACS URL to the Sumo Logic Assertion Consumer URL before logins are blocked on January 29, 2027.
keywords:
  - Sumo Logic
  - saml
  - sso
  - destination url mismatch
  - assertion consumer service
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A Destination URL mismatch occurs when the `Destination` value in a Security Assertion Markup Language (SAML) response from your identity provider (IdP) differs from the Assertion Consumer Service (ACS) URL configured in Sumo Logic for single sign-on (SSO). To fix it, set the ACS URL in your IdP to the **Assertion Consumer** URL on the **SAML** page in Sumo Logic.

Sumo Logic validates the `Destination` value against the ACS URL as described in [Section 3.5.5.2 of the SAML 2.0 Bindings specification](https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf#page=24). This page explains who is affected and how SSO administrators can fix a mismatch in their IdP.

:::important
Sumo Logic is rolling out the validation in two stages.

* **November 16, 2026.** Users in affected organizations see a warning once per session when they log in. Logins are not blocked.
* **January 29, 2027.** Sumo Logic rejects logins with a mismatched Destination URL. Users cannot log in until an administrator corrects the IdP configuration.
:::

## Availability

| Account Type | Account Level |
|:--|:--|
| Cloud Flex | Trial, Enterprise  |
| Credits | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Why Sumo Logic validates the Destination URL

Sumo Logic validates the Destination URL to close a potential security misconfiguration and bring your SSO setup in line with the SAML 2.0 standard. The SAML 2.0 specification requires the recipient of a signed SAML message to verify the `Destination` value against the location where it received the message. Before this validation, Sumo Logic accepted responses where the two values differed.

## Who is affected by a Destination URL mismatch

You are affected if your IdP sends a `Destination` URL that differs from the **Assertion Consumer** URL in your Sumo Logic SAML configuration. This is common in these situations:

* Your organization migrated between Sumo Logic deployments and did not update the IdP.
* Your organization uses a custom or vanity URL that does not exactly match the ACS endpoint.
* Your IdP was set up with an older or slightly different ACS URL.

If you see the warning when you log in and you are not an SSO administrator, forward the message or a screenshot to your SSO or IT administrator. Only they can change the IdP configuration.

## How to fix a Destination URL mismatch

Copy the **Assertion Consumer** URL from Sumo Logic, and then set it as the ACS URL in your IdP. You need access to your IdP administration console and to the **SAML** page in Sumo Logic. Sumo Logic cannot change your IdP settings because Sumo Logic has no administrative access to your IdP.

### Step 1: Copy the Assertion Consumer URL from Sumo Logic

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Administration**, and then under **Account Security Settings** select **SAML**. You can also click the **Go To...** menu at the top of the screen and select **SAML**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > SAML**.
1. From the **Configuration List**, select the SAML configuration that your IdP uses.
1. Copy the **Assertion Consumer** URL from the details pane. <br/><img src={useBaseUrl('img/security/config-list.png')} alt="Assertion Consumer URL in the SAML configuration details pane" style={{border: '1px solid gray'}} width="800" />

If your organization has more than one SAML configuration, repeat these steps for each one.

### Step 2: Update the URL in your IdP

In your IdP, set the ACS URL to the exact **Assertion Consumer** value you copied. The ACS URL is the endpoint where your IdP delivers SAML responses, and most IdPs use it as the `Destination` value.

:::note
Do not add or remove trailing slashes, change letter case, or substitute a custom domain.
:::

Find the field for your IdP in the following table. For complete setup steps, see the IdP page.

| IdP | Where to update the URL |
|:--|:--|
| Okta | In the Sumo Logic SAML app, open the sign-on settings and update the ACS URL. See [Integrate Sumo Logic with Okta](/docs/manage/security/saml/integrate-sumo-logic-with-okta/). |
| Azure AD (Microsoft Entra ID) | In the enterprise application, edit **Basic SAML Configuration** and update **Reply URL (Assertion Consumer URL)**. See [Integrate Sumo Logic with Azure AD](/docs/manage/security/saml/integrate-sumo-with-azure-ad/#complete-azure-configuration). |
| OneLogin | In the Sumo Logic SAML app, open the **Configuration** page and update the ACS (Consumer) URL. See [Integrate Sumo Logic with OneLogin](/docs/manage/security/saml/integrate-onelogin/#complete-saml-configuration-in-onelogin). |
| Other IdPs | Update the field your IdP uses for the ACS, single sign-on, or reply URL. See the IdP documentation. |

### Step 3: Confirm the fix

Log in again through your IdP and confirm that the warning no longer appears.

1. Log out of Sumo Logic.
1. Log in through your IdP.
1. Confirm that the warning does not appear.

If the warning still appears, turn on **Debug Mode** in the SAML configuration and log in again. The debug page shows the parsed response data, including the values the IdP sent. For details, see [View SAML Debug Information](/docs/manage/security/saml/view-saml-debug-information/).

## FAQ

### Can I still log in during the warning period?

Yes. Between November 16, 2026 and January 28, 2027, the warning is informational and does not block logins. Starting January 29, 2027, Sumo Logic rejects logins with a mismatched Destination URL.

### Why do I see this warning if I am not an administrator?

Sumo Logic shows the warning once per session to every user in an affected organization so that the issue is visible. Forward the message to your SSO or IT administrator, who can update the IdP configuration.

### How do I know what the correct URL is?

The correct URL is the **Assertion Consumer** value on the **SAML** page in Sumo Logic. In the new UI, go to **Administration > Account Security Settings > SAML**, and then select your configuration. In the Classic UI, go to **Administration > Security > SAML**.

### How do I see which Destination value my IdP sends?

Turn on **Debug Mode** in your SAML configuration and log in again. The debug page shows the parsed response data, including the values your IdP sent.

### Can Sumo Logic fix the mismatch for me?

No. Your IdP stores the Destination URL, and Sumo Logic has no administrative access to your IdP. Only your SSO or IT administrator can change it.

### How urgent is this change?

You are not at risk of a lockout before January 29, 2027. A mismatch indicates a security misconfiguration, so fix it as soon as you can.

## Related topics

* [Set Up SAML for Single Sign-On](/docs/manage/security/saml/set-up-saml/)
* [View SAML Debug Information](/docs/manage/security/saml/view-saml-debug-information/)
