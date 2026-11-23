---
id: static-outbound-ip-api-allowlist
title: Deploy AWS Observability with the Sumo Logic API Allowlist
sidebar_label: Static Outbound IP for API Allowlist
description: Deploy a NAT gateway with a static Elastic IP so AWS Observability can be installed and upgraded while the Sumo Logic API allowlist is enabled.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When the [Sumo Logic API allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses/) is enabled, the AWS Observability Solution cannot be installed or upgraded unless its Lambda functions call Sumo Logic from a known IP address. This page explains how to give those Lambda functions a static outbound IP, so you can keep the allowlist enabled.

This applies to AWS Observability CloudFormation **v3.1.0** and later.

## Why this is needed

During installation and upgrade, the AWS Observability Lambda function (`LambdaHelper`) calls Sumo Logic APIs to create fields, field extraction rules, collectors, sources, and apps. Lambda functions run on AWS-managed networking, so their outbound IP addresses are dynamic AWS public addresses that cannot be predicted or added to an allowlist. With the allowlist on, those calls are rejected and the stack fails.

## How it works

You deploy a separate network template, `static_outbound_ip.template.yaml`, **before** AWS Observability. It sets up a NAT gateway with an Elastic IP and publishes the network details in AWS Systems Manager (SSM) Parameter Store under `/sumologic/awso/network/`. You add the Elastic IP to the Sumo Logic allowlist once. When you then deploy or update AWS Observability, it finds the network details automatically and attaches its Sumo Logic API Lambda functions to the VPC. There is no new AWS Observability parameter to set.

<img src={useBaseUrl('img/observability/Static-Outbound-IP-to-SumoLogic-Flow.png')} alt="Static outbound IP flow: the network stack writes to SSM Parameter Store, AWS Observability reads it, and the Lambda function calls Sumo Logic through the NAT gateway Elastic IP" style={{border: '1px solid gray'}} width="800" />

* Only `LambdaHelper` and `LambdaHelperAlias` (the functions that call the Sumo Logic API) are attached to the VPC. Other AWS Observability Lambda functions are unchanged.
* If the network template has not been deployed, AWS Observability behaves exactly as before.
* Deploy the network once per AWS account and region where AWS Observability is deployed.

## Prerequisites

* AWS Observability CloudFormation v3.1.0 or later.
* AWS permissions to create the resources in the network template: VPC and EC2 networking resources, Elastic IPs, SSM parameters, and a Lambda function with an IAM role.
* For multiple accounts and regions only: Python 3 with `boto3`, an AWS CLI profile, and a role you can assume in each target account (see [Multiple accounts and regions](#multiple-accounts-and-regions)).

## Network options

The network template has two options, set with **Network Option**.

| | `NewVPC` | `ExistingVPC` |
|:--|:--|:--|
| Use when | You want a dedicated network for AWS Observability. | You want to use a VPC you already have. |
| VPC | Created | Must already exist and have DNS support enabled. It is never created. |
| Internet gateway | Created | Reused if attached; otherwise created and attached. |
| NAT gateway | Created in a new public subnet | Reused if an available one exists; otherwise created (a public subnet and route table are created if there is none). |
| Elastic IP | Created, or the one you provide | Used with the existing NAT gateway; created only if a NAT gateway has to be created. |
| Private subnets | Two created | Reused if they already route to a NAT gateway; otherwise two small (/28) subnets are created. |
| Security group | Created (no inbound rules, outbound `tcp/443` only) | The one you provide, or one is created. |

With `ExistingVPC`, resources you own are validated but never modified or deleted. Everything the template creates is tagged `CreatedBy=sumologic-awso` and is the only thing removed when you delete the stack.

### Use a pre-allocated Elastic IP (optional)

Set **Existing Elastic IP Allocation ID** (`eipalloc-…`) if the IP must be on the allowlist before you deploy anything, or must stay the same if you recreate the stack. Allocate it first, then add it to the allowlist:

```bash
aws ec2 allocate-address --domain vpc
```

The Elastic IP must be in the same account and region, must not be associated with anything else, and is **not** released when the stack is deleted. If you leave the parameter blank, the template allocates one for you and releases it on delete.

## Parameters

Template: [`static_outbound_ip.template.yaml`](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v3.1.0/templates/static_outbound_ip.template.yaml)

| Parameter | Default | Description |
|:--|:--|:--|
| **Network Option** | `NewVPC` | `NewVPC` or `ExistingVPC`. |
| **Existing Elastic IP Allocation ID** | blank | Optional. A pre-allocated Elastic IP (`eipalloc-…`). With `ExistingVPC` and a blank value, the SSM parameter `elastic-ip-allocation-id` is used if present. |
| **New VPC CIDR Block** | `10.250.0.0/24` | `NewVPC` only. A /16 to /24 block, split into one public and two private subnets. |
| **Existing VPC ID** | blank | `ExistingVPC` only. If blank, read from the SSM parameter `vpc-id`. |
| **Existing Private Subnet IDs** | blank | Optional, `ExistingVPC` only. Comma-separated subnets that route `0.0.0.0/0` to a NAT gateway. If blank, read from SSM `private-subnet-ids`, otherwise NAT-routed subnets are found or created. |
| **Existing Security Group ID** | blank | Optional, `ExistingVPC` only. It must be in the VPC and allow outbound `tcp/443`, and is never modified. If blank, read from SSM `security-group-id`, otherwise one is created. |

A value you enter as a parameter always wins over the SSM value for the same input.

## Single account and region

### Step 1: Deploy the network stack

1. In the AWS CloudFormation console, in the account and region where you deploy AWS Observability, create a stack from the template URL above.
2. Choose the network option.
   * **New VPC**: leave **Network Option** as `NewVPC`. Optionally change the CIDR block or enter a pre-allocated Elastic IP allocation ID.
   * **Existing VPC**: set **Network Option** to `ExistingVPC` and enter **Existing VPC ID**. The other existing-VPC parameters are optional, and anything missing is created.
3. Create the stack and wait for `CREATE_COMPLETE`. NAT gateway creation can take a few minutes.

Or with the AWS CLI:

```bash
aws cloudformation create-stack \
  --stack-name sumologic-awso-static-ip \
  --template-url https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/aws-observability-versions/v3.1.0/templates/static_outbound_ip.template.yaml \
  --capabilities CAPABILITY_IAM \
  --parameters ParameterKey=Section1aNetworkOption,ParameterValue=ExistingVPC \
               ParameterKey=Section3aExistingVpcId,ParameterValue=vpc-0abc1234
```

### Step 2: Add the IP to the Sumo Logic allowlist

Copy the **NatPublicIp** stack output and add it to the [Sumo Logic allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses/#enable-allowlist-for-login-and-apis) for login and APIs.

### Step 3: Deploy or update AWS Observability

Deploy AWS Observability as described in [Deploy AWS Observability](/docs/observability/aws/deploy-use-aws-observability/). It reads the network from SSM on every install, update, and upgrade, and shows the IP it uses in the **SumoAPIOutboundIP** stack output.

If AWS Observability is already deployed, update the stack (any parameter change) or upgrade it to pick up the network. CloudFormation rejects an update with no changes.

## Multiple accounts and regions

Each account and region needs its own network, and a CloudFormation StackSet applies the same parameters to every account and region. VPC IDs differ in each one, so for `ExistingVPC` you publish the inputs in SSM in each account and region instead of passing them as parameters. The network stack reads them from there.

### Step 1: Publish the inputs in SSM

The `vpc-id` parameter is required; the other three are optional. All are under `/sumologic/awso/network/`:

| SSM parameter | Required | Meaning |
|:--|:--|:--|
| `vpc-id` | Yes | The VPC to use. |
| `private-subnet-ids` | No | Comma-separated private subnets that route to a NAT gateway. |
| `elastic-ip-allocation-id` | No | An Elastic IP to use for a new NAT gateway. |
| `security-group-id` | No | A security group for the Lambda functions. |

For a few accounts you can create them by hand in each account and region:

```bash
aws ssm put-parameter --name /sumologic/awso/network/vpc-id --type String --value vpc-0abc1234
```

For many accounts and regions, use the [`StaticIpSsmInputsPopulate.py`](https://github.com/SumoLogic/sumologic-solution-templates/blob/master-v3x/cloudformation-sumologic-aws-observability/scripts/StaticIpSsmInputsPopulate.py) script, which reads a CSV file with one row per account and region.

:::note
Do not publish these inputs in an account and region where you deploy the network with `NewVPC`. `NewVPC` creates the same SSM parameters itself and ignores the inputs.
:::

#### CSV file

| Column | Required | Description |
|:--|:--|:--|
| `account_id` | Yes | 12-digit AWS account ID. |
| `region` | Yes | For example, `us-east-1`. |
| `vpc_id` | Yes | `vpc-…` |
| `private_subnet_ids` | No | `subnet-a;subnet-b` (separated by `;`). |
| `elastic_ip_allocation_id` | No | `eipalloc-…` |
| `security_group_id` | No | `sg-…` |
| `role_arn` | No | Role to assume for this row instead of the default. |

A blank optional cell means the parameter is not set. Lines starting with `#` and blank lines are ignored.

```text
account_id,region,vpc_id,private_subnet_ids,elastic_ip_allocation_id,security_group_id,role_arn
111111111111,us-east-1,vpc-0abc1234,subnet-0aaa1111;subnet-0bbb2222,eipalloc-0123abcd,sg-0123abcd,
111111111111,eu-west-1,vpc-0def5678,,,,
222222222222,us-east-1,vpc-0fed9876,,,,arn:aws:iam::222222222222:role/CustomRole
```

The script checks the whole file before it changes anything. If any row is invalid, it reports the row numbers and writes nothing.

#### Run the script

Always start with a dry run, which shows what would change without writing anything:

```bash
pip install boto3
python3 StaticIpSsmInputsPopulate.py -f inputs.csv -p <PROFILE> --dry-run
python3 StaticIpSsmInputsPopulate.py -f inputs.csv -p <PROFILE>
```

**Authentication.** The script uses the AWS CLI profile you pass with `-p` (or the default AWS credentials). For each row it assumes `OrganizationAccountAccessRole` in that account, including for the profile's own account. Use `-r` to choose another role name, `--external-id` if the role requires one, or set `role_arn` for a single row. Use `--current-account-only` to skip role assumption and write with the profile's own credentials. All rows must then be for that account.

In each target account, the role needs `ssm:GetParameter`, `ssm:PutParameter`, `ssm:AddTagsToResource`, and `ssm:ListTagsForResource` on `parameter/sumologic/awso/network/*`. Add `ssm:DeleteParameter` for `--prune` and `ec2:Describe*` for `--validate-resources`.

| Option | Description |
|:--|:--|
| `-f`, `--file` | CSV file (required). |
| `-p`, `--profile` | AWS CLI profile used to assume roles. |
| `-r`, `--role-name` | Role name to assume in each account. Default: `OrganizationAccountAccessRole`. |
| `--external-id` | External ID for the assumed role. |
| `--current-account-only` | Do not assume roles. |
| `-n`, `--dry-run` | Show the changes without writing. |
| `--overwrite` | Replace existing parameters that have a different value. |
| `--prune` | Delete parameters the script created whose CSV cell is now blank. |
| `--validate-resources` | Check that the VPC, subnets, Elastic IP, and security group exist and belong together. A row that fails is not written. |
| `--max-workers` | Number of rows processed in parallel. Default: 4. |

For each parameter the script reports one of the following:

| Result | Meaning |
|:--|:--|
| `created` | The parameter did not exist and was created. |
| `unchanged` | It already has the same value. |
| `conflict` | It exists with a different value. Use `--overwrite` to replace it. |
| `updated` | It was replaced because you used `--overwrite`. |
| `pruned` | It was deleted because you used `--prune`. |

Parameters written by the network stack are never changed, and a failed row does not stop the other rows. The script writes a JSON report next to the CSV file. It exits with 0 when every row is fine, 1 if any row has an error or conflict, and 2 for CSV or usage errors.

### Step 2: Deploy the network StackSet

Create a StackSet from `static_outbound_ip.template.yaml` for the same accounts and regions.

* Set **Network Option** to `ExistingVPC` and leave the VPC, subnet, Elastic IP, and security group parameters blank. Each instance then reads its own SSM values.
* Wait until the StackSet operation has finished in all accounts and regions.

### Step 3: Add every IP to the allowlist

Each account and region has its own NAT gateway and IP. Collect the **NatPublicIp** output from every stack instance and add all of them to the [Sumo Logic allowlist](/docs/manage/security/create-allowlist-ip-cidr-addresses/#enable-allowlist-for-login-and-apis).

### Step 4: Deploy the AWS Observability StackSet

Deploy AWS Observability as a StackSet to the same accounts and regions. Each instance reads its own account and region's SSM parameters and attaches its Lambda functions to its own VPC. Calls leave through that instance's IP.

If a required `vpc-id` is missing in an account and region, that instance fails with an error naming the SSM path, account, and region. Whether other instances continue depends on the StackSet failure tolerance.

## What is created when an input is missing

With `ExistingVPC`, the network stack validates what you provided and creates the rest.

| Missing input | What happens |
|:--|:--|
| `vpc-id` | Nothing is created. The stack fails and names the SSM path, account, and region. |
| Internet gateway | Created and attached. |
| NAT gateway | Reused if one exists; otherwise created in a public subnet (created if needed). |
| Elastic IP | The existing NAT gateway's IP is used; otherwise a new one is allocated and released on delete. |
| Private subnets | Subnets that already route to a NAT gateway are reused; otherwise two /28 subnets are created. |
| Security group | A tagged group with only outbound `tcp/443` is created. |

If you provide a value, it is validated and never modified: subnets must route `0.0.0.0/0` to a NAT gateway, the security group must be in the VPC and allow outbound `tcp/443`, and an Elastic IP must be the existing NAT gateway's address.

## Update, upgrade, and delete

* **Network changes.** Update the AWS Observability stack with any parameter change, or upgrade it, to apply a changed network. If you change an SSM input but not the stack parameters, the stack does not notice.
* **Delete order.** Delete AWS Observability **first**, because removing its Sumo Logic resources still needs the NAT gateway. Then delete the network stack. For StackSets, delete the AWS Observability StackSet before the network StackSet. Expect subnet deletion to take a few minutes while Lambda network interfaces are released.
* **What is removed.** Only resources the template created are removed. Your VPC, other networking resources, and the SSM inputs you published are kept. A pre-allocated Elastic IP is not released.

## Cost

AWS charges for the NAT gateway and Elastic IP this setup uses. If the VPC already has a NAT gateway, `ExistingVPC` reuses it and does not create another one. See [Amazon VPC pricing](https://aws.amazon.com/vpc/pricing/) for current rates.

## Troubleshooting

| Problem | Cause and fix |
|:--|:--|
| Network stack fails with `Elastic IP … not found` | The allocation ID is not in this account and region. Check the ID, or leave it blank. |
| Network stack fails with `does not belong to NAT gateway(s)` | The VPC already has a NAT gateway and the Elastic IP you gave is not its address. Use that NAT gateway's Elastic IP, or remove the input. |
| Network stack fails naming a subnet | The subnet does not route `0.0.0.0/0` to a NAT gateway. Fix the route table, or remove the subnet input so subnets are found or created. |
| Network stack fails with no free CIDR | The VPC has no room for the subnets. Add a secondary CIDR to the VPC, or pass existing private subnet IDs. |
| Network stack fails because the VPC ID is missing | `ExistingVPC` needs a VPC ID. Enter **Existing VPC ID** or publish `vpc-id` in SSM in that account and region. |
| Network stack fails because DNS support is off | Enable DNS support on the VPC. Lambda cannot resolve Sumo Logic host names without it. |
| AWS Observability fails with `Incomplete static outbound IP configuration` | The `nat-public-ip` SSM parameter exists but others are missing. Redeploy the network stack in that account and region. |
| AWS Observability fails with an allowlist error (401 or 403) | The IP in the **SumoAPIOutboundIP** output is not on the Sumo Logic allowlist, or the network is not configured. Add the IP, then retry. |
| `LambdaHelperAlias` stays in `CREATE_IN_PROGRESS` for a long time | Lambda functions in a VPC take longer to create while their network interfaces are set up. Confirm the NAT gateway is `available` and the private subnets route to it. |
