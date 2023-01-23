---
id: integrate-onelogin
title: Integrate Sumo Logic with OneLogin
description: Learn how to configure OneLogin and Sumo Logic to allow Sumo Logic users to sign on to Sumo Logic using OneLogin SSO.
---

## Availability

| Account Type | Account Level |
|:--------------|:---------------------------------------------------------------------------------|
| Cloud Flex   | Trial, Enterprise |
| Credits      | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

This section has instructions for integrating OneLogin and Sumo Logic to allow Sumo Logic users to sign on to Sumo Logic using OneLogin SSO. 

## Before you start

Read the "Limitations section" on [Set Up SAML for Single Sign-On](set-up-saml.md).

## Configure a SAML app in OneLogin

1. In OneLogin, choose **Applications** from the **Applications** menu.   

    ![applications-menu.png](/img/security/applications-menu.png)

1. On the **Applications** page, click **Add App**.   

    ![add-app.png](/img/security/add-app.png)
     
1. On the **Find Applications** page, search for Sumo Logic and select the **Sumo Logic SAML 2.0** app.    

    ![find-applicatons.png](/img/security/find-applicatons.png)
     
1. On the **Add Sumo Logic** page:

    * **Display Name**. This is the display name that will appear on your OneLogin portal page. Edit as desired. 
    * **Visible in portal**. Toggle this option off if you do not want Sumo Logic to appear on your OneLogin portal page.
    * **Icons**. (Optional) If desired, you can upload different icons to display on your OneLogin portal page.
    * **Description**. (Optional) Provide a short description for this application.
    * Click **Save**.            

    ![add-sumo-logic.png](/img/security/add-sumo-logic.png)        
1. Click **Parameters** in the left-nav.

    * **Credentials are**. Set the credentials to "Configured by admin". 
    * **First Name**. Select “First Name”.
    * **Last Name**.  Select “Last Name”. 
    * **NameID**. Select "Email" or something equivalent to the users email to use as the Sumo Logic credential.
    * **Role**. If you will be sending multiple OneLogin roles then change this to "**Semicolon Delimited Input (multi-value output)**"           

    ![role inst.png](/img/security/role-inst.png)  
          
1. On the **SSO** tab:

    * Copy the **Issuer URL** and the **SAML 2.0 Endpoint** to supply when you configure Sumo Logic in Step 2 below. 
    * Right-Click **View Details** for the X.509 Certificate and open in a new tab.            

        ![sso.png](/img/security/sso.png)

    * On the **Certificates** page, copy the **X.509 Certificate.** You'll supply it when you configure Sumo Logic in the following section.           

        ![certificates.png](/img/security/certificates.png)
             
1. On the **Access** tab, choose which roles will have access to Sumo Logic.   

    ![access tab.png](/img/security/access-tab-2.png)
        
1. Click **Save**. 

### Configure SAML in Sumo

This section has instructions for configuring SAML in Sumo Logic.

1. Go to **Administration > Security > SAML**.
1. Click **+ Add Configuration** to create a new configuration.    

    ![config-list.png](/img/security/config-list.png)
     
1. The **Add Configuration** page appears.

    ![add-config-onelogin](/img/security/add-config-onelogin.png)

1. **Configuration Name**. Enter a name to identify the SSO policy (or another name used internally to describe the policy).
1. **Debug Mode**. Select this option if you'd like to view additional details if an error occurs when a user attempts to authenticate. For more information, see [View SAML Debug Information](view-saml-debug-information.md).
1. **Issuer**. Paste in the **Issuer URL** you copied from the OneLogin **SSO** page, as described above.
1. **X.509 Certificate**. Paste in the certificate you downloaded from the OneLogin **SSO** page, as described above. 
1. **Attribute mapping**. Select "Use SAML subject".
1. **SP-initiated Login**. (Optional) This configuration enables a Sumo user to initiate login from Sumo Logic. To configure this option, see [Configure SP-initiated login](#configure-sp-initiated-login).
1. **Roles Attribute**. (Optional). To configure this option, see [Configure on-demand role provisioning](#configure-on-demand-role-provisioning).
1. **On Demand Provisioning**. (Optional). See [Configure on demand provisioning](#configure-on-demand-account-provisioning) below.
v**Logout Page**. When a Sumo user logs out of Sumo Logic or if the user’s session times out, they will be redirected to the page you specify. If you want users to be redirected to your OneLogin portal page, enter `https``://your-domain.onelogin.com/portal/` where `your-domain` is your company's OneLogin domain.
1. Click **Add**. 
1. To view the details of your configuration, select it the **Configuration List**.
1. Copy the **Assertion Consumer** and **Entity ID** from the details pane**.** You'll paste these into the OneLogin **Configuration** page, as described in the following section.   

    ![configuration-list.png](/img/security/configuration-list.png)

### Complete SAML configuration in OneLogin

1. Return to OneLogin.
1. Select the Sumo Logic SAML app.
1. On the **Configuration** page, paste the **Assertion Consumer** and **Entity ID** values copied OneLogin above.    

    ![application-details.png](/img/security/application-details.png)
     
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
