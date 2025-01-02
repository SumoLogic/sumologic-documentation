---
id: integrate-onelogin
title: Integrate Sumo Logic with OneLogin
description: Learn how to configure OneLogin and Sumo Logic to allow Sumo Logic users to sign on to Sumo Logic using OneLogin SSO.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Availability

| Account Type | Account Level |
|:--------------|:---------------------------------------------------------------------------------|
| Cloud Flex   | Trial, Enterprise |
| Credits      | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

This section has instructions for integrating OneLogin and Sumo Logic to allow Sumo Logic users to sign on to Sumo Logic using OneLogin SSO. 

## Before you start

Read the "Limitations section" on [Set Up SAML for Single Sign-On](set-up-saml.md).

## Configure a SAML app in OneLogin

1. In OneLogin, choose **Applications** from the **Applications** menu.   <br/><img src={useBaseUrl('img/security/applications-menu.png')} alt="Applications selected in the Applications menu" style={{border: '1px solid gray'}} width="800" />
1. On the **Applications** page, click **Add App**.   <br/><img src={useBaseUrl('img/security/add-app.png')} alt="Add App button on the Applications menu" style={{border: '1px solid gray'}} width="800" />     
1. On the **Find Applications** page, search for Sumo Logic and select the **Sumo Logic SAML 2.0** app.   <br/><img src={useBaseUrl('img/security/find-applicatons.png')} alt="Sumo Logic app on the Find Applications menu" style={{border: '1px solid gray'}} width="800" />      
1. On the **Add Sumo Logic** page:
    * **Display Name**. This is the display name that will appear on your OneLogin portal page. Edit as desired 
    * **Visible in portal**. Toggle this option off if you do not want Sumo Logic to appear on your OneLogin portal page.
    * **Icons**. (Optional) If desired, you can upload different icons to display on your OneLogin portal page.
    * **Description**. (Optional) Provide a short description for this application.
    * Click **Save**.  <br/><img src={useBaseUrl('img/security/add-sumo-logic.png')} alt="Save button " style={{border: '1px solid gray'}} width="800" />                 
1. Click **Parameters** in the left-nav.
    * **Credentials are**. Set the credentials to "Configured by admin". 
    * **First Name**. Select “First Name”.
    * **Last Name**.  Select “Last Name”. 
    * **NameID**. Select "Email" or something equivalent to the users email to use as the Sumo Logic credential.
    * **Role**. If you will be sending multiple OneLogin roles then change this to "**Semicolon Delimited Input (multi-value output)**". <br/><img src={useBaseUrl('img/security/role-inst.png')} alt="Parameters for the Sumo Logic app" style={{border: '1px solid gray'}} width="800" />
1. On the **SSO** tab:
    * Copy the **Issuer URL** and the **SAML 2.0 Endpoint** to supply when you configure Sumo Logic in Step 2 below. 
    * Right-Click **View Details** for the X.509 Certificate and open in a new tab. <br/><img src={useBaseUrl('img/security/sso.png')} alt="View Details link" style={{border: '1px solid gray'}} width="800" />
    * On the **Certificates** page, copy the **X.509 Certificate**. You'll supply it when you configure Sumo Logic in the following section. <br/><img src={useBaseUrl('img/security/certificates.png')} alt="Copy button next to X.509 Certificate" style={{border: '1px solid gray'}} width="800" />             
1. On the **Access** tab, choose which roles will have access to Sumo Logic.   <br/><img src={useBaseUrl('img/security/access-tab-2.png')} alt="Roles on the Access tab" style={{border: '1px solid gray'}} width="800" />        
1. Click **Save**. 

### Configure SAML in Sumo

This section has instructions for configuring SAML in Sumo Logic.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > SAML**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **SAML**. You can also click the **Go To...** menu at the top of the screen and select **SAML**. 
1. Click **+ Add Configuration** to create a new configuration. <br/><img src={useBaseUrl('img/security/config-list.png')} alt="Add Configuration button on the Configuration List page" style={{border: '1px solid gray'}} width="800" />     
1. The **Add Configuration** page appears.<br/><img src={useBaseUrl('img/security/add-config-onelogin.png')} alt="Add Configuration page" style={{border: '1px solid gray'}} width="500" /> 
1. **Configuration Name**. Enter a name to identify the SSO policy (or another name used internally to describe the policy).
1. **Debug Mode**. Select this option if you'd like to view additional details if an error occurs when a user attempts to authenticate. For more information, see [View SAML Debug Information](view-saml-debug-information.md).
1. **Issuer**. Paste in the **Issuer URL** you copied from the OneLogin **SSO** page, as described above.
1. **X.509 Certificate**. Paste in the certificate you downloaded from the OneLogin **SSO** page, as described above. 
1. **Attribute mapping**. Select "Use SAML subject".
1. **SP-initiated Login**. (Optional) This configuration enables a Sumo user to initiate login from Sumo Logic. To configure this option, see [Configure SP-initiated login](#configuresp-initiated-login).
1. **Roles Attribute**. (Optional). To configure this option, see [Configure on-demand role provisioning](#configure-on-demand-role-provisioning).
1. **On Demand Provisioning**. (Optional). See [Configure on demand provisioning](#configure-on-demand-account-provisioning) below.
v**Logout Page**. When a Sumo user logs out of Sumo Logic or if the user’s session times out, they will be redirected to the page you specify. If you want users to be redirected to your OneLogin portal page, enter `https``://your-domain.onelogin.com/portal/` where `your-domain` is your company's OneLogin domain.
1. Click **Add**. 
1. To view the details of your configuration, select it the **Configuration List**.
1. Copy the **Assertion Consumer** and **Entity ID** from the details pane. You'll paste these into the OneLogin **Configuration** page, as described in the following section. <br/><img src={useBaseUrl('img/security/configuration-list.png')} alt="OneLogin details" style={{border: '1px solid gray'}} width="800" /> 

### Complete SAML configuration in OneLogin

1. Return to OneLogin.
1. Select the Sumo Logic SAML app.
1. On the **Configuration** page, paste the **Assertion Consumer** and **Entity ID** values copied OneLogin above. <br/><img src={useBaseUrl('img/security/application-details.png')} alt="OneLogin configuration page" style={{border: '1px solid gray'}} width="800" />      
1. Click **Save**.

## Optional configurations 

This section has instructions for configuring several optional SAML
features.

### Configure SP-initiated login

:::tip
SP initiated login requires a custom Sumo Logic subdomain. If a custom subdomain has not yet been configured for your org, following the instructions in the [Change account subdomain](/docs/manage/manage-subscription/manage-org-settings.md) section of the *Manage Organization* topic.
:::

This configuration enables a Sumo user to initiate login from Sumo Logic. Sumo redirects the user to OneLogin with a SAML AuthnRequest with the  information that OneLogin needs to authenticate the user. OneLogin replies to Sumo with a SAML Assertion (SAMLResponse). 

1. **Authn Request URL**. Enter the **SAML 2.0 Endpoint URL** that you copied from the OneLogin **SSO** page, as described above. 
1. **Disable Requested Authentication Context**. (Optional). Leave unchecked.
1. **Sign Authn Request**. (Optional). Leave unchecked.

### Configure on-demand account provisioning

If you configure on-demand account provisioning, Sumo Logic automatically creates a user account the first time a user tries to access Sumo Logic from your OneLogin portal page. To configure this behavior, you update your OneLogin integration in Sumo Logic, providing the **First Name** and **Last Name** attributes One Login uses to identify users, and the role or roles you want to assign to the accounts when they are created.

In Sumo Logic, open your OneLogin integration application for editing.

1. Click the **On Demand Provisioning** checkbox.
1. **First Name**. Enter: `firstname` 
1. **Last Name**. Enter: `lastname`
1. **On Demand Provisioning Roles**. Specify the Sumo RBAC roles you want to assign when user accounts are provisioned. The roles must already exist in Sumo Logic.
1. Click **Save** to save the SAML configuration.

### Configure on-demand role provisioning

If you configure on-demand role provisioning, Sumo Logic assigns roles to a user every time the user logs in. Roles are configured by your OneLogin administrator and assigned as part of the SAML assertion. Each role name that you want to assign to users must match roles that exist in Sumo Logic and in OneLogin.

1. In Sumo Logic, open your OneLogin integration application for editing.
1. Click the **Roles Attribute** checkbox. The **Roles Attribute** field appears.
1. **Roles Attribute**. Enter: `role`
1. Click **Save**. 
