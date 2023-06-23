---
id: collect-with-collector-script
title: Collect Amazon CloudWatch Logs using a Collector Script
sidebar_label: Collect Logs using a Collector Script
description: For small data volumes, you can use an installed Sumo Logic Collector with a script Source instead of using AWS lambda or Amazon Kinesis to collect Amazon CloudWatch logs.
---


For small data volumes, you can use an installed Sumo Logic Collector with a script Source instead of using AWS lambda or Amazon Kinesis to collect Amazon CloudWatch logs.

:::note
We recommend the alternative collection process described on [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs), which uses a CloudFormation template. That method compresses log data before sending it to Sumo, and provides more robust failure handling. 
:::

## Create an AWS Access ID and Key pair

Create an AWS user with an AWS Access ID and Key pair. You can follow the instructions in AWS user with an AWS Access ID and Key pair. You can follow the instructions in [Grant Access to an Amazon S3 Bucket](../../hosted-collectors/amazon-aws/grant-access-aws-product.md). Specifically, use the instructions from **Step 1 to Step 12** to create the user, but at **Step 11**, use the permission provided below. (To be clear, no S3 bucket permission is required.)

:::important
Its a best practice to separate multiple policies to one policy per user. For example, if you have one policy for your S3 bucket and one policy for VPC Flow Logs, attach them to two separate users. 
:::

Copy and paste the following code to use as a custom policy:

```
{
    "Version": "2012-10-17",
        "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Action": [
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:DescribeMetricFilters",
                "logs:FilterLogEvents",
                "logs:GetLogEvents"
            ],
            "Resource": [
            "*"
            ]
        }
    ]
}
```

The Sid (statement ID) is optional. For details, see [http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Sid](http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Sid).

## Install a Collector

[Install a Collector](/docs/send-data/installed-collectors) for your Linux or Windows system. (Make sure you install Collector version **19.119-6** or later.)

You will also configure a Script Source later in this procedure.

:::note
If your VPC is large (several hundred nodes or more), we recommend using one of the following Hosted Collector options:

1. [The Sumo Logic App for AWS Lambda](/docs/integrations/amazon-aws/lambda).
1. [The Sumo Logic App for Amazon VPC Flow Logs using Kinesis](collect-with-amazon-kinesis.md). 
:::

## Download and Deploy the scripts to the Collector system

The Sumo Logic App for Amazon VPC Flow Logs requires the following files:VPC Flow Logs requires the following files:

 * [(Windows) SumoVPCCollector.bat](https://s3.amazonaws.com/script-collection/vpc/r1.0.0/SumoVPCCollector.bat)
 * [(Linux) SumoVPCCollector.sh](https://s3.amazonaws.com/script-collection/vpc/r1.0.0/SumoVPCCollector.sh)
 * [Sumo-Java-APIIntegrationClient-1.1.1.jar](https://s3.amazonaws.com/script-collection/vpc/r1.0.0/Sumo-Java-APIIntegrationClient-1.1.1.jar)
 * [vpc_cwl.properties](https://s3.amazonaws.com/script-collection/vpc/r1.0.0/vpc_cwl.properties)

To deploy the scripts:

1. Download the files listed above and deploy them to the same host where the Collector is configured.
1. Put the package in a folder in the same folder where the Collector is installed, for example,**/usr/local/SumoCollector/VPC**.
1. Inside the package, edit the **vpc_cwl.properties** file to add your AWS Access ID and Key, the region, and the name of the LogGroup used to store the data under a configuration section as shown below. 

    :::important
    You can use the same **vpc_cwl. properties** file to read from different environments. To do so, you must add a UNIQUE configuration section for each environment (LogGroup) to the file. The following example only shows a configuration section for one environment. When you have multiple sections for the different environments in the file, some properties can be reused, such as AccessID, AccessKey, or even region.  But as stated in the example file below, **you must use a separate timestamp file for each section** to keep track of what data has been read. 
    :::

    :::note
    Lines starting with # are comments.
    :::

    ```
    [unique_section_name]
    # Predefined value for VPC collection
    type = aws_cwl
    AccessID = <Your AWS Access ID>
    AccessKey = <Your AWS Access Key>
    LogGroup = <LogGroupName>
    # region, default is us-east-1. Note CWL is supported in: ap-northeast-1, ap-southeast-1, ap-southeast-2, eu-central-1, eu-west-1, us-east-1, us-west-1, and us-west-2
    region = us-east-1
    # comma separated list of log streams, or don't include if you want to collect from all log streams.
    # LogStream = eni-11c6a94a-all,eni-19f34c43-all
    # IMPORTANT: file to keep track of last queried timestamp, need a unique file for each section
    timestamp = ${path}/timestamp.txt
    # start of window to query logs, in epoch milliseconds.
    # startTime = 1436377600000
    # end of window to query logs, in epoch milliseconds. Use this for a fixed query window, or retrieve archived logs.
    # endTime = 1436550400000
    # delay time in milliseconds if there is no data
    delayDuration = 1000
    ```

1. Save your changes.
1. Finally, run **SumoVPCCollector.sh** directly from the CLI to test the settings. If successful, you should see something like this:

![img](/img/send-data/vpc_flow_app_test.png)

## Configure a Script Source

1. Configure a Script Source for the installed Collector to call the main script, as shown. (In this example, we assume the package is located under **/usr/local/SumoCollector/VPC**. Customize as necessary.)

    ![img](/img/send-data/vpc_flow_app_script_source.png)

   * **Name.** Enter **VPC**.
   * **Source Category.** Enter **vpc**.

    :::important
    The Source Category must be *vpc* for this App to work with the Interactive Dashboards. 
    :::

   * **Frequency.** Select **Every 5 Minutes**.
   * **Specify a timeout for your command.** Activate the check box and select **60 Minutes**.
   * **Command.** Enter **/bin/sh**.
   * **Type a path to the script to execute.** Enter the path to the folder where the **SumoVPCCollector.sh** file is located on the Collector system as you configured in the previous steps.
   * **Working Directory.** Enter the working directory.

    :::important
    Make sure the **Working Directory** is set correctly, or data will not be collected.
    :::

1. Under **Advanced**, make sure the option **Extract timestamp information from log entries** is activated.
1. Make any other configurations necessary, as detailed in [Configure a Script Source](/docs/send-data/installed-collectors/sources/script-source).
1. Click **Save**.
