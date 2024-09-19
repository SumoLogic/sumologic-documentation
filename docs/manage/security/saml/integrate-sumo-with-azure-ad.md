---
id: integrate-sumo-with-azure-ad
title: Integrate Sumo with Azure AD
description: Enable Single Sign-On (SSO) to Sumo Logic with Azure Active Directory (AD).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Availability

| Account Type | Account Level |
|:--------------|:-------------------------|
| Cloud Flex   | Trial, Enterprise                                                               |
| Credits      | Trial, Essentials, Enterprise Operations, Enterprise Security, Enterprise Suite |

Organizations with Enterprise accounts can provision Security Assertion Markup Language (SAML) 2.0 to enable Single Sign-On (SSO) for user
access to Sumo Logic. This section has instructions for integrating Sumo with Azure AD.

## Configure Sumo as an Enterprise App in Azure AD

In this step you set up Sumo as an Enterprise App in Azure AD.

:::note
The steps below are for the new Azure Management Console. For general steps for using the legacy GUI, see [Configure single sign-on to applications that are not in the Azure Active Directory application gallery](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-single-sign-on-non-gallery-applications) in Azure help.
:::

1. Go into the Microsoft Azure Management Console and select **Azure Active Directory** in the left-side navigation pane.
1. Select **Enterprise Applications**. <br/><img src={useBaseUrl('img/security/enterprise-applications.png')} alt="Enterprise applications selected" style={{border: '1px solid gray'}} width="800" />
1. Select **Manage > All Applications.**
1. Click **New application** at the top of the **All applications** blade. <br/><img src={useBaseUrl('img/security/new-application-option.png')} alt="New application button" style={{border: '1px solid gray'}} width="800" />
1. Search for **SumoLogic**.
1. Select the **SumoLogic** tile. <br/><img src={useBaseUrl('img/security/sumo-logic-tile.png')} alt="Sumo Logic tile" style={{border: '1px solid gray'}} width="800" />
1. Enter a name for your application and click **Create**. Throughout this procedure, we refer to the application name as \<*app-name*\>. <br/><img src={useBaseUrl('img/security/create.png')} alt="Sumo Logic name field" style={{border: '1px solid gray'}} width="400" />
1. From the **Overview** tab, click **Get Started** in the **Set up single sign-on** tile. <br/><img src={useBaseUrl('img/security/get-started.png')} alt="Get started link" style={{border: '1px solid gray'}} width="800" />
1. Click the **SAML** tile on the **Single sign-on** page. <br/><img src={useBaseUrl('img/security/saml-tile.png')} alt="SAML tile" style={{border: '1px solid gray'}} width="800" />
1. Click **Edit** in the **Basic SAML Configuration** page. <br/><img src={useBaseUrl('img/security/edit-basic-saml.png')} alt="Edit button" style={{border: '1px solid gray'}} width="800" />
1. In the **Basic SAML Configuration** pane:
   1. Select **https://service.sumologic.com** as the default **Identifier (Entity ID)** in the list. (You'll update this in a later step.)
   1. Enter *https://service.sumologic.com* as the **Reply URL (Assertion Consumer Service URL)**. (You'll update this in a later step.)
   1. Click **Save** at the top of the pane, and then close the pane.
1. In the **SAML Signing Certificate** tile, click the **Download** link for **Certificate (Base64)** to download the `<app-name>.cer` file. <br/><img src={useBaseUrl('img/security/download-cert.png')} alt="Download link" style={{border: '1px solid gray'}} width="800" />
1. In the **SAML Signing Certificate** tile, click the **Download** link for **Federation Metadata XML** to download the `<app-name>.xml` file.
1. In the **Set Up `<app-name>`** section, copy and paste the contents of the following fields into a text document. You may need these values when in the next step.
   * Login URL
   * Azure AD identifier
   * Logout URL <br/><img src={useBaseUrl('img/security/set-up-app.png')} alt="Set up app section" style={{border: '1px solid gray'}} width="800" />

Do **not** close the **Setup Single Sign-On with SAML** window, you will return later for additional configuration steps.

### Configure SAML in Sumo Logic

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > SAML**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **SAML**. You can also click the **Go To...** menu at the top of the screen and select **SAML**. 
1. Select an existing configuration, or click **Add Configuration** to create a new configuration. <br/><img src={useBaseUrl('img/security/add-configuration.png')} alt="Add Configuration button on the Configuration List page" style={{border: '1px solid gray'}} width="800" />
1. The **Add Configuration** page appears. <br/><img src={useBaseUrl('img/security/add-configuration-filled.png')} alt="Add Configuration page" style={{border: '1px solid gray'}} width="600" />
1. **Configuration Name.** Enter a name to identify the SSO policy (or another name used internally to describe the policy).
1. **Debug Mode.** Select this option if you'd like to view additional details if an error occurs when a user attempts to authenticate. For more information, see [View SAML Debug Information](view-saml-debug-information.md).
1. Click the **Import Metadata XML** button.
1. Select **Or Choose File** from the Import Metadata XML prompt and select the XML file you downloaded in substep 13 of [Configure Sumo as an Enterprise App in Azure AD](#configure-sumo-as-an-enterprise-app-in-azure-ad).
1. Click the **Import** button to import the Azure AD metadata .xml.
1. Verify the **Issuer** and **X.509 Certificate** fields have been populated by the import. If these fields are not populated:
    1. **Issuer**. Enter the **Azure AD Identifier** that you noted in the substep 14 of [Configure Sumo as an Enterprise App in Azure AD](#configure-sumo-as-an-enterprise-app-in-azure-ad).
    2. **X.509 Certificate**. Use a text editor to open the certificate file you downloaded in substep 12 of [Configure Sumo as an Enterprise App in Azure AD](#configure-sumo-as-an-enterprise-app-in-azure-ad). Copy and paste the contents of the file into the field.   
1. **Attribute Mapping.** Select **Use SAML subject.**
1. **Configure SP-initiated Login.** (Optional) This step has instructions for setting up SP-initiated login. When SP-initiated login has been enabled, your SAML configuration will appear as an additional authentication option within your subdomain-enabled account login page. SP initiated login requires a custom Sumo Logic subdomain. If a custom subdomain has not yet been configured for your org, following the instructions in the [Change account subdomain](/docs/manage/manage-subscription/manage-org-settings#change-account-subdomain) section of the **Manage Organization** topic.
   1. Under the SAML configuration page > **Optional Settings** section, select **SP Initiated Login Configuration**. When you click this option, the following configurations will appear. <br/><img src={useBaseUrl('/img/security/sp-init-settings.png')} alt="SP-initiated login" style={{border: '1px solid gray'}} width="300" />
   1. **Authn Request URL.** Enter the **Login URL** that you noted in the substep 13 of [Configure Sumo as an Enterprise App in Azure AD](#configure-sumo-as-an-enterprise-app-in-azure-ad).
   1. **Disable Requested Authn Context**. Checkmark this option.
   1. **Select Binding Type**. Click **Post**.
   1. **Sign Authn Request**. Leave this option deselected.
1. **Configure on-demand provisioning**. (Optional) If you configure on-demand provisioning, Sumo Logic automatically creates a user account the first time a user logs on to Sumo. To complete this procedure, you must supply the First Name and Last Name attributes Azure AD uses to identify users.
   1. Click the **On Demand Provisioning** checkbox. <br/><img src={useBaseUrl('img/security/on-demand.png')} alt="On Demand Provisioning checkbox" style={{border: '1px solid gray'}} width="400" />
   1. **First Name Attribute**. You might need to provide the full attribute path, which can vary based on the ADFS version (the actual path can be seen in the SAML assertion). Here is an example:`http://schemas.microsoft.com/ws/2008/06/identity/claims/givenname`
   1. **Last Name Attribute**. You might need to provide the full attribute path, which can vary based on the ADFS version (the actual path can be seen in the SAML assertion). Here is an example:`http://schemas.microsoft.com/ws/2008/06/identity/claims/surname`
   1. **On Demand Provisioning Roles**. Specify the Sumo Logic roles you want to assign when user accounts are provisioned. (These roles must already exist in Sumo Logic.)
1. **Configure logout page**. (Optional) Configure a logout page if you would like to point all Sumo users to a particular URL after logging out of Sumo Logic or after their session has timed out. You could choose your company's intranet, for example, or any other site that you'd prefer users in your organization access.
   1. Click the **Logout Page** checkbox.
   1. Enter the URL of the page to which you want to direct users after logging of Sumo.
1. Click **Add** to save the configuration
1. Select the new configuration from the **Configuration List**.
1. Copy the following field values and save them in a text file. You'll need them in the steps to follow. 
   * **Assertion Consumer URL**
   * **Entity ID**

### Complete Azure configuration

1. In Section 1, **Basic SAML Configuration**, edit the configuration.
   1. **Identifier (Entity ID).** If you configured selected SP initiated login, replace *https://service.sumologic.com* with the Entity ID you copied in substep 14 of [Configure SAML in Sumo Logic](#configure-saml-in-sumo-logic). <br/><img src={useBaseUrl('img/security/identifier-entity-id.png')} alt="Identifier (Entity ID)" style={{border: '1px solid gray'}} width="800" />
    1. **Reply URL (Assertion Consumer URL)**. Replace *https://service.sumologic.com* with the Assertion Consumer URL you copied in substep 14 of [Configure SAML in Sumo Logic](#configure-saml-in-sumo-logic). <br/><img src={useBaseUrl('img/security/reply-URL.png')} alt="Reply URL (Assertion Consumer URL)" style={{border: '1px solid gray'}} width="800" />
    1. Click **Save**.
1. In the left navigation pane, click **Properties** in the **Manage** section.
   1. **Enabled for users to sign in?** Enter *Yes*.
   1. **User assignment required?** Enter *Yes*. (This option controls whether a user must be assigned to this group or whether any user in the Azure AD tenant can use Sumo Logic. We recommend setting this to *Yes* as the Sumo environment has a finite number of users.
   1. Click **Save**. <br/><img src={useBaseUrl('img/security/properties.png')} alt="Properties tab" style={{border: '1px solid gray'}} width="800" />
1. In the left navigation pane, click **Users and Groups** in the **Manage** section.
1. Select **Add user/group**.
1. Add the Users or Groups that should have access to login to Sumo Logic and then click **Assign**. 

### Configure Azure AD to send Group assignments to Sumo (Optional)

In this step, you configure Azure AD to send group membership information in the SAML assertions it sends, so that Sumo Logic can assign roles to a user at each logon. This allows you to manage Sumo role assignments via Azure AD. If you don’t want to manage Sumo roles via Azure AD, skip these steps and proceed to [Test SAML Authentication](#test-saml-authentication) below.

These instructions assume that:

* You have configured a set of groups on Azure AD whose names match the names of the roles defined in Sumo.
* You have assigned each user in Azure AD to the Azure AD groups that maps to the roles you want the user to have.

There are two sides to the configuration. You'll configure a **Group Attribute Claim** in Azure AD and set a **Roles Attribute** in Sumo Logic. 

1. Select the **Single Sign On** menu item of your Sumo Logic application in Azure AD.
1. Click **Edit** under **Attribute and Claims**.
1. Select **Add a group claim**
1. Select **Groups assigned to the application** from the Group Claims pane.
1. Select **sAMAccountName** from the Source Attribute drop down.
1. Check the box for **Emit group name for cloud-only groups**.
1. Under the **Advanced options**, check the box for **Customize the name of the group claim**.
1. Check the box for **Emit groups as role claims**.
1. Click **Save** to add the new group claim.  
1. Select the **Roles Attribute** checkbox within your Sumo Logic SAML configuration and enter the group claim name: `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
1. **Save** the Sumo Logic configuration.

### Test SAML Authentication

1. On the Azure **Single Sign-on** page click **Test**. <br/><img src={useBaseUrl('img/security/test.png')} alt="Test button" style={{border: '1px solid gray'}} width="800" />
1. Click the **Sign in as current user** radio button and then **Test sign in**. <br/><img src={useBaseUrl('img/security/test-sign-in.png')} alt="Test dialog" style={{border: '1px solid gray'}} width="800" />
1. You should be redirected and logged into your Sumo Logic account.  If you have enabled SP Initiated Login, you can also go to your Sumo Logic account subdomain login page and select the new SAML login option that appears. <br/><img src={useBaseUrl('img/security/login-page-sp-v2.png')} alt="Sumo Logic sign in screen" style={{border: '1px solid gray'}} width="800" />
