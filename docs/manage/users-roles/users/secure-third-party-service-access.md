---
id: secure-third-party-service-access
title: Verification for Secure Third-Party Service Access
description: Within Sumo Logic, several links in the Help menu connect to third-party services, such as Documentation, Support, and Community and you need to verify your account before using them.
---


Within Sumo Logic, several links in the **Help** menu connect to third-party services, such as **Documentation**, **Support**, and **Community**.

For security reasons, Sumo logic users may only access these third-party services once you verify your email address. If you have a Sumo Logic username and password, then your email address is verified.

Users that do not authenticate to Sumo Logic using a username and password are required to complete the email verification process. This usually applies to users that log in using a third-party Single Sign-On (SSO) service implementing SAML, users that access Sumo Logic from the Heroku add-on, and users of other Sumo Logic integration partners that provide SSO.

To verify your email:

1. Go to **Help** > **Community** (or **Support**).
1. You will be prompted to verify your email. Click **Send Verification Email**.

    ![multi-account](/img/users-roles/multi_account_third_party_verify.png)

1. Check your email for the **Sumo Logic Email Verification Request**.
1. Open the email and click **Verify Your Email**.

    ![verify email.png](/img/users-roles/verify-email.png)

Your email is verified, and you will be given access to the third-party service.

## Secure Third-Party Access and New Organizations

When you create a new Sumo Logic organization, you will be logged in automatically the first time without using a password. This account is not yet activated or verified for SSO third-party access, but an activation email will be sent to you automatically.

If you have not yet activated your account, if you try to access a link in the Help menu connected to third-party services, such as Community (Salesforce), you will be prompted to activate your account, and a new activation email will be sent. You must activate your account via the email before you can access a third-party service through Sumo Logic.

To activate your account:

1. Go to **Help** > **Community** (or **Support**).
1. You will be prompted to activate your account. Click **Send Activation Email**.

    ![activate user ui prompt.png](/img/users-roles/activate-user-ui-prompt.png)

1. Check your email for **Activate your Sumo Logic Account!**
1. Open the email and click **Activate Now**.

    ![activate account email.png](/img/users-roles/activate-user-email.png)

Your account is activated, and you will be given access to the third-party service.
