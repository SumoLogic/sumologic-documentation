---
id: integrate-with-bitium
title: Integrate Sumo Logic with Bitium
description: You can integrate Bitium with Sumo Logic’s SAML 2.0 API to allow users to sign in to Sumo Logic using their Single Sign-On (SSO) credentials.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Availability

| Account Type | Account Level |
|:--------------|:---------------------------------------------------------------------------------|
| Cloud Flex   | Trial, Enterprise                                                               |
| Credits      | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

Bitium is a cloud-based identity management provider that can be integrated with Sumo Logic’s SAML 2.0 API to allow users to sign in to Sumo Logic using their Single Sign-On (SSO) credentials.SAML 2.0 API to allow users to Sign in to Sumo Logic using their Single Sign-On (SSO) credentials.

You can sign up for a free Bitium Trial account on the [Bitum site](https://www.bitium.com). 

## Create a Bitium SSO app to connect to Sumo Logic

1. Sign into Bitium.
1. From the **Bitium** menu, select **Manage**, and then select **Manage Apps**. <br/><img src={useBaseUrl('img/security/bitium_manage_apps.png')} alt="Manage Apps selected on dropdown menu" style={{border: '1px solid gray'}} width="800" />
1. On the **Apps** page, select **Add an App**. <br/><img src={useBaseUrl('img/security/bitium_add_app.png')} alt="Add an App button" style={{border: '1px solid gray'}} width="800" />
1. Search for Sumo Logic to locate the **Sumo Logic App for Bitium**. <br/><img src={useBaseUrl('img/security/bitium_search.png')} alt="Search bar" style={{border: '1px solid gray'}} width="400" />
1. On the **App Install** page, select **Individual Account**. Then under **Single Sign-On**, select **SAML Authentication**. <br/><img src={useBaseUrl('img/security/bitium_install_app.png')} alt="Individual Account on the App Install page" style={{border: '1px solid gray'}} width="600" />
1. Click **Install App** to move on to the next step.
1. On the **Install Success** page, click **Configure Single Sign-On**. <br/><img src={useBaseUrl('img/security/bitium_configure_sso.png')} alt="Configure Single Sign-On button" style={{border: '1px solid gray'}} width="600" />
1. For **Single Sign-On Provider**, select **SAML Authentication**. <br/><img src={useBaseUrl('img/security/bitium_provider.png')} alt="SAML Authentication selected" style={{border: '1px solid gray'}} width="600" />
1. The SAML configuration details for the App are displayed. For the Sumo Logic configuration, use the following parameters from this page:
   * EntityID
   * Login URL
   * LogOut URL
   * X.509 Certificate 
1. Keep this page open to use these parameters in the next step, Configure SAML in Sumo Logic.

## Configure SAML in Sumo Logic

1. Log into Sumo Logic as an administrator.
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > SAML**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **SAML**. You can also click the **Go To...** menu at the top of the screen and select **SAML**. 
1. Click **Configure**, and configure the SAML settings.
1. **Configuration Name.** Type the name of the SSO policy (or another name used internally to describe the policy).
1. **Debug Mode.** Select this option if you'd like to view additional details when an error occurs.
1. **Issuer.** Type the unique URL associated with your organization's SAML IdP. This is the Identity Provider Issuer from Step 12 in the previous section.
1. **X.509 Certificate.** Copy and paste your organization's X.509 certificate, which is used to verify signatures in SAML assertions. This is the Certificate, also from Step 12.
1. **Attribute Mapping.** Depending on your IdP, select:
    * **Use SAML subject**, or
    * **Use SAML Attribute** and then type the email attribute name in the text box.
1. **SP Initiated Login Configuration.** (Optional) This section has instructions for setting up SP-initiated login. When SP initiated login has been enabled, your SAML configuration will appear as an additional authentication option within your subdomain-enabled account login page.
    :::note
    SP initiated login requires a custom Sumo Logic subdomain. If a custom subdomain has not yet been configured for your org, following the instructions in the [Change account subdomain](/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings) section of the *Manage Organization* topic.
    :::
    * **Authn Request URL.** Enter the URL that the IdP has assigned for Sumo Logic to submit SAML authentication requests to the IdP.  This field is required if you checked the **SP Initiated Login Configuration** checkbox.
    * **Disable Requested Authn Context**. (Optional.) If you check this option, Sumo will not include the RequestedAuthnContext element of the SAML AuthnRequests it sends to your Idp. This option is useful if your IdP does not support the RequestedAuthnContext element.
    * **Sign Authn Request**. (Optional.) If you select this option, Sumo will send signed Authn requests to your IdP. When you click this option, a Sumo-provided X-509 certificate is displayed. You can configure your IDP with this certificate, to use to verify the signature of the Authn requests sent by Sumo. 
1. **Roles Attribute:** When you click this option, **Roles** Attribute field appears. Enter the SAML Attribute Name that is sent by the IdP as part of the assertion. For details, see [Set SAML for Single Sign-On](set-up-saml.md).
1. **On Demand Provisioning.** Select this option to have Sumo Logic automatically create accounts when a user first logs on. For more information, see [Set Up SAML for Single Sign-on.](set-up-saml.md).
   * **First Name**
   * **Last Name**
   * **On Demand Provisioning Roles.** Add a role for all Bitium users, such as Administrator.
1. **Logout Page**: Select this option and enter a URL if you'd like to point all users to the URL after logging out of Sumo Logic. For more information, see [Set Up SAML for Single Sign-On](set-up-saml.md). <br/><img src={useBaseUrl('img/security/saml-configuration-page.png')} alt="Add Configuration page" style={{border: '1px solid gray'}} width="600" />
1. Click **Add**.
1. View the summary of the SAML configuration parameters. Leave this dialog open so that you can use these settings in Bitium. <br/><img src={useBaseUrl('img/security/saml-config-details2.png')} alt="Summary of the SAML configuration parameters" style={{border: '1px solid gray'}} width="700" />

## Add Sumo Logic SAML Settings to SAML Settings to Bitium

1. Go back to the Bitium **SAML Configuration** page.
1. Within the **SAML URL** text box, enter the Authentication Request URL displayed in step 6 of the previous section. <br/><img src={useBaseUrl('img/security/bitium_saml_url.png')} alt="SAML URL field" style={{border: '1px solid gray'}} width="700" />
1. Click **Save Changes** to complete the application install.
1. Assign users as needed to the Sumo Logic App.
1. You are now configured to sign in to Sumo Logic through Bitium.

## Create multiple SAML configurations

import Saml from '../../../reuse/saml.md';

<Saml/>
