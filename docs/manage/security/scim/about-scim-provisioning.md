---
id: about-scim-provisioning 
title: About SCIM Provisioning
sidebar_label: About
description: Learn about provisioning users into Sumo Logic using SCIM. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can provision and deprovision users in Sumo Logic using SCIM (System for Cross-domain Identity Management). SCIM provisioning in Sumo Logic uses [SCIM User Management APIs](/docs/api/scim-user/).

## Directions for provisioning providers

See the following articles for directions to configure specific provisioning providers:
* [Provision from Microsoft Entra ID](/docs/manage/security/scim/provision-from-microsoft-entra-id/)
* [Provision from Okta](/docs/manage/security/scim/provision-from-okta/)
* [Provision from OneLogin](/docs/manage/security/scim/provision-from-onelogin/)

## Prerequisites

### Create an access key

Before configuring a provisioning provider, create an [access key](/docs/manage/security/access-keys/) using a service account. This access key will provide authorization to provision users from the provider into Sumo Logic.

When you create the access key, copy its access ID and access key values. Depending on the provider you configure, you will enter these when you set up provisioning to use one of the following authorization methods:
* Basic authentication
   * Username: Access ID
   * Password: Access key
* Bearer token<br/>Use [Base64 encoding](https://www.base64encode.org/) to Base64 encode `<access ID>:<access key>`.

### Set up SAML

Depending on the provider you configure, you may need to [set up SAML for single sign-on](/docs/manage/security/saml/set-up-saml/) in the Sumo Logic instance where you will provision users. This will allow connection to Sumo Logic for provisioning. You may need to copy the single sign-on URL (Assertion Consumer URL) and entity ID from your Sumo Logic [SAML configuration](/docs/manage/security/saml/set-up-saml/#review-saml-configuration) to set up provisioning.

<img src={useBaseUrl('img/security/provision-sumo-logic-saml-settings.png')} alt="ACS and entity ID from Sumo Logic" style={{border: '1px solid gray'}} width="800" />
