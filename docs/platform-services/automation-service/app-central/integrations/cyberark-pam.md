---
title: CyberArk PAM
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cyberark-pam.png)

Version: 1.2  
Updated: Jun 15, 2023

**Cyberark PAM** is Privilege access management for managing Privileged Credentials.

  
## Actions

* **List Safes** *(Enrichment)* - Returns a list of all Safes in the Vault that the user has permissions for. Must be a member of the Safes in the Vault that are returned in the list
* **Get Safe Details** *(Enrichment)* - Returns information about a specific Safe in the Vault
* **Add Safe** *(Containment)* - Adds a new Safe to the Vault. The user who runs this web service must have Add Safes permissions in the Vault
* **Delete Safe***(Containment)* - This method deletes a Safe from the Vault. The user who runs this web service must have Manage Safe permissions in the Safe
* **List Accounts** *(Enrichment)* - Returns a list of all the accounts in the Vault. The user who runs this web service requires List Accounts permissions in the Safe
* **Get Account Details** *(Enrichment)* - Returns information about an account identified by its ID. The user who runs this web service requires List Accounts permissions in the Safe where the account is located inside the Vault
* **Add Account** *(Containment)* - Adds a new privileged account or SSH key to the Vault.
* **Delete Account** *(Containment)* - Deletes a specific account in the Vault. The user who runs this web service requires Delete Accounts permissions in the Vault

## Cyberark PAM in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-2.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-3.png)

Populate all the required fields (\*) and then click Save.

* Label: The desired name for the resource
* API URL: For example: `https://services-uscentral.skytap.com:<Port>`
* Username: The name of the user who is logging in to the Vault
* Password: The password used by the user to log in to the Vault
* Certificate: Certificate (client.crt) in (Base64 encoded) format
* Certificate Key: Certificate (client.pem) in (Base64 encoded) format
* Certificate Root: Certificate (RootCA.crt) in (Base64 encoded) format

 ![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/cyberark-pam/cyberark-pam-7.png)

## Note
It is necessary to encode the certificates in Base64 format.

To encode a certificate in Base64 format, you can follow these steps:

1. Open the certificate file using a text editor such as Notepad.
2. Select all of the certificate data, including the "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----" lines.
3. Copy the selected certificate data to the clipboard.
4. Open an online Base64 encoder or use a command-line tool like OpenSSL to encode the certificate data in Base64 format.
5. Paste the certificate data into the encoder or use the command-line tool to generate the Base64-encoded certificate.
6. Save the Base64-encoded certificate to a file, which can then be used for the integration.

You can use the OpenSSL command-line tool to encode a certificate in Base64 format by following these steps:

1. Open a command prompt or terminal window.
2. Navigate to the directory where the certificate file is located.
3. Run the following command to encode the certificate in Base64 format:   
openssl base64 -in certificate.crt -out certificate\_base64.crt  
Note that "certificate.crt" should be replaced with the actual filename of your certificate, and "certificate\_base64.crt" is the desired filename for the Base64-encoded certificate.
4. The command will encode the certificate in Base64 format and save it to the specified output file.

## Supported versions
Tested with Privileged Access Manager - Self-Hosted Version 13.0  
 

## Change Log

* June 19, 2020 (v1.0) - First upload
* March 6, 2023 (v1.1) - Integration refactored
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
