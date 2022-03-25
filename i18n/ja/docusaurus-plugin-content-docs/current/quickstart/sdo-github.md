---
id: quickstart-github
---
# Visualize GitHub Data in Sumo Logic

This guide will walk you through creating a Sumo Logic account as well as getting GitHub data visualized in Sumo Logic. At the end, you will have:

- A Sumo Logic trial account if you don't already have an existing account
- GitHub dashboards and data collection configured in your Sumo Logic account
- A GitHub webhook configured that will send data to your Sumo Logic account

For trial accounts, all of the data collected as a result from this guide will be free of charge.

**Prerequisites** 

This guide will use a helper script to automate much of the setup process. The following operating systems and architectures are supported:

- MacOS 64-bit Intel
- Linux 32-bit and 64-bit

Arm architectures for either Linux or Mac are not yet supported.

**Outcomes**

The scripts and Terraform code provided in this guide will have the following outcomes:

- You will be able to track data on pull requests, issues, branch development, and more across all GitHub repositories in your GitHub organization.
- A collection of GitHub dashboards will be installed in the folder "Software Development Optimization" within your Sumo Logic account.
- A single webhook will be added to your specified GitHub organization that will send events to Sumo Logic. You will provide a GitHub personal access token to be used to create the webhook.  The webhook can be removed at any time to stop sending data to Sumo Logic.
- A specific version of Terraform for your OS and architecture will be downloaded and be installed in isolation to the local working directory. It **will not** affect any existing system installations of Terraform.


# Steps

## Step 1 - Create a trial account
If you already have a Sumo Logic account, you can skip this step and go straight to [Step 2](#step-2---create-a-sumo-logic-access-key).

1. Visit [sumologic.com](https://sumologic.com) and click **Start free trial**.

    ![Free Trial](/img/get-started/github/start-free-trial.png)

1. Provide your business email address.
1. Select the deployment region closest to you. **Important:** Remember your selection. You will need it in a later step.
1. Agree to the Service License Agreement and click **Sign up**.
1. Check your inbox for your verification email. Click **Activate account** to be taken to the last account setup page.

    ![Activate Trial](/img/get-started/github/activate-sumo-trial-account.png)

1. Fill out the form and click **Activate**.

    ![Activate Trial](/img/get-started/github/activate-trial.gif)

1. Click the 'x' at the top right of the *Welcome to Sumo Logic* web page. You will not need to follow the in-application guide.

Congratulations! You now have a trial account.

## Step 2 - Create a Sumo Logic access key
Create an access key to programatically manage your Sumo Logic account following these instructions: [Manage all users’ access keys on Access Keys page](https://help.sumologic.com/manage/security/Access-Keys#manage-all-users%E2%80%99-access-keys-on-access-keys-page).

![Access Key](/img/get-started/github/create-access-key.gif)

:::sumo Save info
Copy your access ID and key to another location. You will need them in a later step.
:::

## Step 3 - Create a GitHub personal access token

In order to create a webhook that will send data to your Sumo Logic account, the automation in this guide will need an access token for your GitHub account. For more information, see [GitHub Creating a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

1. Visit your [Personal Access Tokens page](https://github.com/settings/tokens) in your GitHub account.
1. Create an access token with the following permissions:

- read:org
- admin:repo_hook
- admin:org_hook

:::sumo Save info
Copy your access token to another location. You will need it in a later step.
:::

## Step 4 - Run the automation

Run a Terraform script to automatically create all the necessary resources to ingest GitHub data into Sumo Logic.

Run the following command:

```bash
sh -c "$(curl -sSL https://raw.githubusercontent.com/ccaum/sumologic-solution-templates/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started)" -- github
```

Enter your GitHub and Sumo Logic information at the prompts:

1. Enter the GitHub personal access token you created in [Step 3](#step-3---create-a-github-personal-access-token).
1. Enter the name of the GitHub organization you'd like to collect GitHub data on.

    ![Access Token](/img/get-started/github/github-access-token.png)

1. Enter the Sumo Logic Personal Access Token you created in [Step 2](#step-2---create-a-sumo-logic-access-key).

1. Enter the region you created your Sumo Logic account in. [Use this guide to determine which region code to provide](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-and-Firewall-Security#how-can-i-determine-which-endpoint-i-should-use)

    ![Access Token](/img/get-started/github/sumo-logic-access-token.png)

The script will download a specific version of Terraform and dependent plugins and apply Terraform code. The Terraform installed **will not** interfere with any existing installations of Terraform.

If the script completes, you will have a new folder called **Software Development Optimization** in your Sumo Logic Personal folder. There will be a collection of GitHub dashboards that will populate as you and your team use GitHub.

The command runs the following script:

```bash reference
https://github.com/ccaum/sumologic-solution-templates/blob/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started
```

## Step 5 - Verify data is being received

1. Create a new pull request in a repository in the GitHub organization you specified when you ran the script in [Step 4](#step-4---run-the-automation).

    ![GitHub Daskboard](/img/get-started/github/github-pull-requests-dashboard.gif)

1. Wait about 1 minute and then view the **GitHub - Pull Request Overview dashboard** in your Sumo Logic Account.