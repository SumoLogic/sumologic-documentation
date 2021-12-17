---
id: quickstart-github
---
# Visualize GitHub Data in Sumo Logic

This guide will walk you through creating a Sumo Logic account as well as getting GitHub data visualized in Sumo Logic. At the end, you will have:

- A Sumo Logic trial account if you do not already have an existing account
- GitHub dashboards and data collection configured in your Sumo Logic account
- A GitHub webhook configured that will send data to your Sumo Logic account

For trial accounts, all of the data collected as a result from this guide will be free of charge.

## Prerequisites

This guide will use a helper script to automate much of the setup process. The following operating systems and architectures are supported:

- MacOS 64-bit
- Linux 32-bit and 64-bit

Arm architectures for either Linux or Mac are not yet supported.

### Outcomes

The scripts and Terraform code provided in this guide will have the following outcomes:

- A specific version of Terraform for your OS and architecture will be downloaded and be installed in isolation to the local working directory. It **will not** affect any existing system installations of Terraform.
- A single webhook will be added to your specified GitHub organization. You will provide a GitHub personal access token to be used to create the webhook. The webhook can be removed at any time to stop sending data to Sumo Logic.
- A data collector in Sumo Logic will be created to collect the data sent from the GitHub webhook.
- A data normalization processor called a Field Extraction Rule (FER) will be added to your Sumo Logic account to normalize the data coming from GitHub.
- A collection of GitHub dashboards will be installed in the folder "Software Development Optimization" within your Sumo Logic account.

## Step 1 - Create a trial account
If you already have a Sumo Logic account, you can skip this step and go straight to step #2

1. [Start a free trial.](https://www.sumologic.com/sign-up/)
1. Provide your business email address.
1. Select the deployment region closest to you. 
    :::note
    Remember your selection. You will need it later.
    :::
1. Agree to the Service License Agreement, then click **Sign up**.
1. Check your inbox for your verification email. Click **Activate account** to be taken to the last account setup page.
1. Fill out the form, then click **Activate**.

Congratulations! You now have a trial account.

## Step 2 - Create a Sumo Logic access key

In this step, you will create an access key to programatically manage your Sumo Logic account.

Follow the [Manage all users access keys](https://help.sumologic.com/Manage/Security/Access-Keys#manage-all-users%E2%80%99-access-keys-on-access-keys-page) instructions.

:::sumo Copy this info!
Copy your access ID and key to another location. You will need them later.
:::

## Step 3 - Create a GitHub personal access token

In order to create a webhook that will send data to your Sumo Logic account,
the automation in this guide will need an access token for your GitHub account.
Go to this page in your GitHub account to create one:
https://github.com/settings/tokens

The access token will need the following permissions:

- `read:org`
- `admin:repo_hook`
- `admin:org_hook`

:::sumo Copy this info!
Copy your access token to another location. You will need it later.
:::

## Step 4 - Run the automation

In this step, a script will run that will run Terraform to automatically
create all the necessary resources to ingest GitHub data into Sumo Logic.

Run this command:

```bash
sh -c "$(curl -sSL https://raw.githubusercontent.com/ccaum/sumologic-solution-templates/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started)" -- github
```

If the above command was successful, you should now have a new folder called
"Software Development Optimization" in your Sumo Logic Personal folder. There
will be a collection of GitHub dashboards that will populate as you and your
team use GitHub.

The command runs the following script:

```bash reference
https://github.com/ccaum/sumologic-solution-templates/blob/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started
```

## What's Next?

List of cool stuff they can do here, use cases, more info, etc.