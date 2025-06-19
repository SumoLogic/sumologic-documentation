---
title: Active Directory V2
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/active-directory-v2.png')} alt="active-directory-v2" width="90"/>

***Version: 2.2  
Updated: Dec 19, 2023***

Utilize user, group, and system information from Active Directory.   

## Actions

* **Get System Attributes** (*Enrichment*) - Gather system attributes.
* **Get User Attributes** (*Enrichment*) - Gather user attributes.
* **Group Attributes** (*Enrichment*) - Gather group attributes.
* **List Users Groups** (*Enrichment*) - Gather user's groups.
* **Create User** (*Containment) - Create a new user.
* **Reset Password** (*Containment*) - Reset a user's password.
* **Set Password** (*Containment*) - Set a new password.
* **Set User Attributes** (*Containment*) - Set a system's attribute.
* **Set User's Attributes** (*Containment)* - Set a user's attributes.
* **Change System OU** (*Containment*) - Change a system's organizational unit (OU).
* **Enable User** (*Containment*) - Enable a user account.
* **Disable User** (*Containment*) - Disable a user's account.
* **Remove Users From Groups** (*Containment*) - Remove users from AD group.
* **Get Groups Members** (*Containment*) - Retrieve users from AD group.
* **Add Users To Groups** (*Containment*) - Add a user to a group.

## Notes

Compatibility notice:

* LDAP over TLS only work on 636, 3269 (secure) ports but STARTTLS; only work with 389, 3268 (non-secure ports).
* LDAP over TLS required to have a CA Certificate of the active directory as Base64 encoded format.

## External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

## Active Directory V2 configuration

### Prerequisites

* An [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge/) installation.
* A Microsoft Windows Server with Active Directory Domain Services (AD DS) configured.

### Setting up Microsoft Windows Server (optional)

If an existing Windows Server is not available, follow these steps to set up a new one in AWS:
1. Create a Microsoft Windows Server 2019 Instance on AWS.
   1. Launch a new AWS EC2 instance.
   1. Choose **Microsoft Windows Server 2019 Base** as the AMI.
   1. Configure instance settings (for example, instance type, storage, security groups).
   1. Assign a key pair for secure access.
   1. Deploy the instance and wait for it to be fully initialized.
1. Configure the Windows Server.
   1. Connect to the instance using Remote Desktop Protocol (RDP).
   1. Once logged in, open **Server Manager**.
1. Install Active Directory Domain Services (AD DS).
   1. In **Server Manager**, select **Add roles and features**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-add-roles-and-features.png')} style={{border:'1px solid gray'}} alt="Add roles and features" width="600"/>
   1. Choose **Role-based or feature-based installation**.
   1. Select the **Active Directory Domain Services** (AD DS) role.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-add-roles.png')} style={{border:'1px solid gray'}} alt="Add roles" width="600"/>
   1. Proceed with the installation and wait for it to complete.
1. Promote the server to a domain controller.
   1. After installation, navigate to **Server Manager > AD DS**.
   1. Click on **Promote this server to a domain controller**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-promote-server.png')} style={{border:'1px solid gray'}} alt="Promote server" width="600"/>
   1. Choose **Add a new forest** and provide a root domain name (for example, `csoar.com`).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-root-domain-name.png')} style={{border:'1px solid gray'}} alt="Root domain name" width="600"/>
   1. Configure **Domain Controller Options**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-domain-controller-options.png')} style={{border:'1px solid gray'}} alt="Domain controller options" width="600"/>
   1. Set a **Directory Services Restore Mode (DSRM) password**.
   1. Complete the installation and restart the server.
1. Verify Active Directory setup.
   1. After rebooting, log back in and open **Active Directory Users and Computers**.
   1. Verify that the domain is properly configured.

## Configure Active Directory V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **Host**. The hostname or IP address of the AD server.

* **Login Port**. The port used for LDAP authentication. The default is `389` for LDAP and `636` for LDAPS.

* **Login DN (Distinguished Name)**. Enter the distinguished name format (for example, `CN=Administrator,CN=Users,DC=csoar,DC=com`). See the [following sections](#how-to-get-login-dn-with-a-local-account) for information about how to get the login DN.

* **Password**. The corresponding password for the provided username.

* **Connection Security**. Select the type of security to use for communication (**SSL**, **NonSSL**, **StartTLS**, or **LDAP over TLS**).

* **CA Certificate Format**. Select the format (**PFX, P12** or **PEM**).

* **CA Certificate**. Enter the certificate. Only required if you selected **LDAP over TLS**. The certificate must be in Base64 encoded format.

* **Certificate Passphrase**. Enter the passphrase. Only required if you selected the **PFX, P12** certificate format.

* **Base DN**. Enter the Base Distinguished Name. 

* **Global Catalog or DN Port**. Select the catalog or port. For global catalog, select port 3268 for LDAP or 3269 for secure LDAP.

* <IntegrationTimeout/>
* **Docker Hostnames**. Enter the container's hostname.

* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-configuration.png')} style={{border:'1px solid gray'}} alt="Active Directory V2 configuration" width="400"/>

For information about Microsoft Entra Connect V2 (formerly Active Directory V2), see [Microsoft Entra Connect V2 documentation](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect-v2).

### How to get login DN with a local account

#### Method 1: Using PowerShell (Get-ADUser)

1. Open PowerShell as an administrator.
1. Run the following command:
   ```
   Get-ADUser -Identity Administrator | Select-Object DistinguishedName
   ```
1. Example output:
   ```
   DistinguishedName
   -----------------
   CN=Administrator,CN=Users,DC=csoar,DC=com
   ```

The `DistinguishedName` field contains the full LDAP path.

#### Method 2: Using Active Directory Users and Computers (GUI)

1. Open **Active Directory Users and Computers (ADUC) (dsa.msc)**.
1. Enable "Advanced Features" by selecting **View > Advanced Features**.
1. Navigate to the user account (for example, **Administrator**).
1. Right-click the user and select **Properties**.
1. Go to the **Attribute Editor** tab.
1. Find the `distinguishedName` attribute. The value will be like: `CN=Administrator,CN=Users,DC=csoar,DC=com`. This is your **Login DN**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-login-dn.png')} style={{border:'1px solid gray'}} alt="Login DN" width="600"/>

### How to get login DN with a service account

Once the service account is created in the Organization Unit:
1. Open PowerShell as an administrator.
1. Run the following command:
   ```
   Get-ADUser -Identity <service-account-name>
   ```
1. To view all the service accounts inside AD:
   ```
   Get-ADUser -Filter * | Select-Object Name, SamAccountName, DistinguishedName
   ```
1. Example output:<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-dn-output-example.png')} style={{border:'1px solid gray'}} alt="DN example output" width="700" height="120"/>
1. Below is the example path:<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-example-path.png')} style={{border:'1px solid gray'}} alt="Example path" width="700" height="400"/>
1. Add the `distinguishedName` as the **Login DN** and correct the password of the service account.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-edit-resource.png')} style={{border:'1px solid gray'}} alt="Edit resource" width="400"/><br/>Below is the full form of each term:<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/active-directory-v2/active-directory-v2-full-form.png')} style={{border:'1px solid gray'}} alt="Full form of terms" width="400"/>

## Change Log

* March 25, 2021 - First upload
* March 11, 2022 - Logo
* June 21, 2023 (v2.1) - Updated the integration with Environmental Variables
* December 19, 2023 (v2.2)
	+ Updated action: User Attributes
		- Now, with the User Attributes Action, users can be filtered based on their distinguishedName (DN)
