---
id: backfill-aws-account-alias
title: Backfill AWS Account Alias
sidebar_label: Backfill Source Alias
description: Use the backfill script to update the account field on existing AWS Observability collector sources with a human-readable alias.
---

The AWS Observability Solution uses an `account` field on collector sources to identify AWS accounts in dashboards and the [AWS Observability hierarchy](/docs/dashboards/explore-view/#aws-observability). By default, this field contains the 12-digit AWS account ID. If you want to replace numeric account IDs with human-readable aliases (for example, `prod`, `dev`, or `billing`) on sources that were created before you configured an alias, use the backfill script.

## When to use this script

Use this script when:

* You deployed the AWS Observability Solution without setting an account alias and now want to add one.
* You changed your account alias after initial deployment and need to update existing sources to reflect the new alias.
* You have multiple AWS accounts and want to apply distinct aliases to each account's sources for easier identification in dashboards.

:::note
This script only updates existing sources. New sources created by subsequent CloudFormation deployments will use the alias configured in the [AWS Account Alias](/docs/observability/aws/deploy-use-aws-observability/v3.0.0/deploy-with-aws-cloudformation#step-2-aws-account-alias) parameter.
:::

## How it works

The script operates in two steps:

### Step 1: Prepare

The script scans your Sumo Logic org for collectors matching the `aws-observability-<account-id>` naming pattern (where `<account-id>` is the 12-digit AWS account ID), fetches all sources under those collectors, and generates a CSV file for review. Each row in the CSV represents a source where the `accountid` or `account` field matches the 12-digit AWS account ID extracted from the collector name.

If a source already has a different value in its `account` field (indicating a previously configured alias), the script pre-fills that value in the `alias` column.

### Step 2: Apply

After you review and edit the CSV, the script reads it back and updates the `account` field on each source where you have set `override_account_field_with_alias` to `Yes`. The update uses optimistic locking (ETags) to prevent conflicts.

## Prerequisites

* **Python 3.6 or later**
* **requests library** — Install with:
  ```bash
  pip install requests
  ```
* **Sumo Logic Access Key** — An access ID and access key with permissions to read and modify collectors and sources. See [Access Keys](/docs/manage/security/access-keys) for more information.
* **Deployment environment identifier** — The Sumo Logic deployment where your account resides (for example, `us`, `us2`, `eu`, `au`, `de`, `jp`, `ca`, `in`, `kr`, or `fed`).

## Input parameters

| Parameter | Description |
|:--|:--|
| `--access-id` | Your Sumo Logic Access ID. |
| `--access-key` | Your Sumo Logic Access Key. |
| `--deploy-env` | The Sumo Logic deployment environment (for example, `us`, `us2`, `eu`, `au`). |
| `--filename` | (Step 2 only) Path to the edited CSV file to apply. |

## Run the script

### Step 1: Generate the CSV

Run the script without the `--filename` parameter to generate a CSV file listing all sources eligible for alias backfill:

```bash
python3 backfill_aws_account_alias.py \
  --access-id <SUMO_ACCESS_ID> \
  --access-key <SUMO_ACCESS_KEY> \
  --deploy-env <DEPLOYMENT>
```

This creates a file named `backfill_aws_account_alias.csv` in the current directory.

### Review and edit the CSV

Open the generated CSV file. Each row contains the following columns:

| Column | Description |
|:--|:--|
| `collector_id` | The Sumo Logic collector ID. Do not modify. |
| `collector_name` | The collector name. Do not modify. |
| `source_id` | The source ID. Do not modify. |
| `source_name` | The source name. Do not modify. |
| `accountid` | The 12-digit AWS account ID extracted from the collector name. Do not modify. |
| `alias` | The alias to set on the `account` field. Fill in your desired alias. |
| `override_account_field_with_alias` | Set to `Yes` to apply the alias, or leave as `No` to skip. |

For each source you want to update:
1. Enter a value in the `alias` column.
1. Change `override_account_field_with_alias` to `Yes`.

:::info Alias naming rules
The alias must follow AWS account alias naming conventions:
- 3 to 63 characters in length.
- Contains only lowercase letters, digits, and hyphens.
- Does not start or end with a hyphen.
- Does not contain consecutive hyphens (`--`).
:::

### Step 2: Apply the changes

Run the script with the `--filename` parameter pointing to your edited CSV:

```bash
python3 backfill_aws_account_alias.py \
  --access-id <SUMO_ACCESS_ID> \
  --access-key <SUMO_ACCESS_KEY> \
  --deploy-env <DEPLOYMENT> \
  --filename backfill_aws_account_alias.csv
```

The script validates each alias, skips invalid entries with a warning, and updates the `account` field on all valid sources marked with `override_account_field_with_alias=Yes`.

## Error handling

The script handles the following scenarios:

| Scenario | Behavior |
|:--|:--|
| Transient API errors (429, 500, 502, 503, 504) | Retries up to 3 times with exponential backoff. |
| Invalid alias format | Skips the row and prints a warning with the validation error. |
| Missing `collector_id` or `source_id` | Skips the row and prints an error. |
| Source fetch failure | Skips the row and prints the HTTP status code. |
| Concurrent modification conflict | Uses ETag-based optimistic locking to detect conflicts. |

## Example workflow

1. Generate the CSV:
   ```bash
   python3 backfill_aws_account_alias.py \
     --access-id suXXXXXX \
     --access-key XXXXXXXXXXXXXXXX \
     --deploy-env us2
   ```
2. Open `backfill_aws_account_alias.csv` in a spreadsheet editor.
3. For account `123456789012`, enter `prod` in the `alias` column and set `override_account_field_with_alias` to `Yes`.
4. Apply changes:
   ```bash
   python3 backfill_aws_account_alias.py \
     --access-id suXXXXXX \
     --access-key XXXXXXXXXXXXXXXX \
     --deploy-env us2 \
     --filename backfill_aws_account_alias.csv
   ```
5. Verify the updated alias appears in your [AWS Observability hierarchy](/docs/dashboards/explore-view/#aws-observability).
