---
title: CyberArk PAM
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cyberark-pam.png')} alt="cyberark-pam" width="100"/>

***Version: 1.3  
Updated: March 20, 2024***

CyberArk Privileged Access Manager (PAM) secures privileged access, centralizes credentials, and monitors sessions for robust IT security.

## Actions

* **Add Account** *(Containment)* - Adds a new privileged account or SSH key to the Vault.
* **Add Safe** *(Containment)* - Adds a new Safe to the Vault. The user who runs this web service must have Add Safes permissions in the Vault.
* **Delete Account** *(Containment)* - Deletes a specific account in the Vault. The user who runs this web service requires Delete Accounts permissions in the Vault.
* **Delete Safe***(Containment)* - This method deletes a Safe from the Vault. The user who runs this web service must have Manage Safe permissions in the Safe.
* **Get Account Details** *(Enrichment)* - Returns information about an account identified by its ID. The user who runs this web service requires List Accounts permissions in the Safe where the account is located inside the Vault.
* **Get Safe Details** *(Enrichment)* - Returns information about a specific Safe in the Vault.
* **List Accounts** *(Enrichment)* - Returns a list of all the accounts in the Vault. The user who runs this web service requires List Accounts permissions in the Safe.
* **List Safes** *(Enrichment)* - Returns a list of all Safes in the Vault that the user has permissions for. Must be a member of the Safes in the Vault that are returned in the list.

## Configure Cyberark PAM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/> For information about CyberArk, see [CyberArk documentation](https://docs.cyberark.com/portal/latest/en/docs.htm).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-3.png')} style={{border:'1px solid gray'}} alt="cyberark-pam" width="600"/>
1. Populate all the required fields (\*) and then click **Save**.
    * **Label**. The desired name for the resource. Default: CyberArk PAM resource
    * **API URL**. The API URL is in the form `https://<IIS_Server_Ip>` where `<IIS_Server_Ip>` is the IP address or domain name of your CyberArk PAM server.
    * **Username**. The name of the user who is logging in to the Vault.
    * **Password**. The password used by the user to log in to the Vault.
    * **Client Certificate**. Client Certificate in Base64 encoded format. This certificate contains your public key and is used to authenticate your identity to the server. If you have a combined .pem file that includes both the Certificate and the Private Key, use this field. Field requirement conditional on CyberArk.
    * **Client Private Key**. Client Private Key in Base64 encoded format. Keep your private key confidential. It is used to securely authenticate and establish an encrypted connection. If your Private Key is included in the combined Client Certificate .pem file, leave this field empty. Field requirement conditional on CyberArk.
    * **Root CA Certificate**. The Root CA Certificate in Base64 encoded format. Required if your server uses a certificate not trusted by default by your system or browser. This root certificate establishes trust with the server's SSL/TLS certificate. <img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-4.png')} style={{border:'1px solid gray'}} alt="cyberark-pam" width="400"/>
1. To make sure the resource is working, click **TEST**. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-7.png')} style={{border:'1px solid gray'}} alt="cyberark-pam" width="400"/>
1. Click **SAVE**.

## Note

It is necessary to encode the certificates in Base64 format.  
To encode a certificate in Base64 format using OpenSSL, perform the following steps:

1. **Open a Command Prompt or Terminal**: Access your command line interface. On Windows, you can search for "cmd" or "Command Prompt" in the start menu. On macOS or Linux, you can open the "Terminal" application.
2. **Navigate to the Certificate Directory**: Change the directory to where your certificate file is located using the `cd` command. For example, `cd /path/to/your/certificate`. Replace `/path/to/your/certificate` with the actual path to your certificate file.
3. **Encode the Certificate**: Execute the OpenSSL command to convert the certificate to Base64 format: `openssl base64 -in your_certificate.crt -out your_certificate_base64.crt` Replace `your_certificate.crt` with the actual filename of your certificate. The file `your_certificate_base64.crt` is where the Base64-encoded certificate will be saved. If you want to save the encoded certificate with the same name but with a `.base64` extension, you can do so.
4. **Verify the Output File**: Ensure that the Base64-encoded file has been created successfully and contains the expected content. You can do this by opening the file in a text editor. For example, Visual Studio Code or alternatively, you can use any text editor you prefer, such as Notepad on Windows or TextEdit on macOS.
5. **Use the Encoded Certificate**: Once you have verified the content, you can copy the Base64-encoded text and paste it into the appropriate field in your integration resource.

## Permissions

The integration has different types of actions, and different permissions are required depending on the specific action you want to perform:
* **Add Safe** - The user who runs this web service must have **Add Safes** permissions in the Vault.
* **Add Account** - To run this web service, you must have the following permissions in the Vault:
    * **Add account**
    * **Update password** or **Update password properties**
* **Delete Account** - The user who runs this web service requires **Delete Accounts** permissions in the Vault
* **Delete Safe** - The user who runs this web service must have **Manage Safe** permissions in the Safe.
* **List Accounts** - The user who runs this web service requires **List Accounts** permissions in the Safe.
* **Get Account Details** - The user who runs this web service requires **List Accounts** permissions in the Safe where the account is located inside the Vault.
* **List Safes** - The user who runs this web service must be a member of the Safes in the Vault that are returned in the list.

## Change Log

* June 19, 2020 (v1.0) - First upload
* March 6, 2023 (v1.1) - Integration refactored
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
* March 20, 2024 (v1.3)
    * Enabled resource testing capability
    * Certificate fields have been made optional, depending on CyberArk configuration settings.
    * Extended output mappings
    * Implemented various minor enhancements
