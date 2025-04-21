---
title: AWS IAM
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.5  
Updated: Feb 8, 2024***

AWS IAM (Identity and Access Management) is a web service that helps securely control access to AWS resources. It enables users to manage and control access to AWS services and resources effectively. With this integration, you can create and manage AWS users and groups, and use permissions to allow or deny their access to AWS resources.

## Actions

* **Add User To Group** *(Containment)* - Adds the specified user to the specified group.
* **Attach Policy** *(Containment)* - Attaches a policy to the specified target.
* **Delete Access Key** *(Containment)* - Deletes the access key pair associated with the specified IAM user.
* **Delete Login Profile** *(Containment)* - Deletes the password for the specified IAM user, which terminates the user's ability to access AWS services through the AWS Management Console.
* **Detach Policy** *(Containment)* - Detaches a policy from a specified target.
* **Get Access Key Last Used** *(Enrichment)* - Retrieves information about when the specified access key was last used.
* **Get Instance Profile** *(Enrichment)* - Returns information about the specified instance profile.
* **Get Role** *(Enrichment)* - Retrieves information about the specified role, including the role's path, GUID, ARN, and the role's trust policy that grants permission to assume the role.
* **Get User** *(Enrichment)* - Retrieves information about the specified IAM user, including the user's creation date, path, unique ID, and ARN.
* **List Access Key For User** *(Enrichment)* - Returns information about the access key IDs associated with the specified IAM user.
* **List Groups** *(Enrichment)* - Lists the IAM groups that have the specified path prefix.
* **List Groups For User** *(Enrichment)* - Lists the IAM groups that the specified IAM user belongs to.
* **List Instance Profiles** *(Enrichment)* - Lists the instance profiles that have the specified path prefix.
* **List Instance Profiles For Role** *(Enrichment)* - Lists the instance profiles that have the specified associated IAM role.
* **List Policies** *(Enrichment)* - Lists all the managed policies that are available in an AWS account.
* **List Roles** *(Enrichment)* - Lists the IAM roles that have the specified path prefix.
* **List User** *(Enrichment)* - Lists the IAM users that have the specified path prefix.
* **Remove Role From Instance** *(Containment)* - Removes the specified IAM role from the specified EC2 instance profile.
* **Remove User From Group** *(Containment)* - Removes a specified user from a specified group.
* **Update Access Key** *(Containment)* - Changes the status of the specified access key from Active to Inactive, or vice versa.
* **Update User** *(Containment)* - Updates the name and/or the path of the specified IAM user.

## External Libraries

* [AWS IAM](https://github.com/boto/boto3/blob/develop/LICENSE)

## Configure AWS IAM in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* October 1, 2019 - First upload
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
* January 16, 2024 (v1.2)
    + Changed the field type of the Access key to password
    + Updated action: Get User (Table View issue fixed)
* January 24, 2024 (v1.3)
    + Added New Action: Update Access Key
* February 5, 2024 (v1.4)
    + Added New Action: Get Access Key Last Used
* February 8, 2024 (v1.5)
    * A bug has been addressed in the actions listed below:
        * Detach Policy
        * List Access Key For User
        * List Group
        * List Instance Profiles
        * List Instance Profiles For Role
        * List Roles
