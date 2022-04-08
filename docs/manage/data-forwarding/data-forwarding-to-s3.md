---
id: data-forwarding-to-s3
---

# Forwarding Data from Sumo Logic to S3

:::note
Data forwarding is not supported for Infrequent Tier data. 
:::

You can forward log data from a [Partition](../partitions-and-data-tiers/about-partitions.md) or [Scheduled View] (../Scheduled-Views.md "Scheduled Views") to an S3 bucket. Only new data is forwarded from a Partition once it is set to forward data. 

After data forwarding is configured, you should start to see file objects posted within your configured bucket. If your Scheduled View conducts aggregation, which is a best practice, your aggregate fields are automatically appended to the forwarded objects.

## Prerequisites

* An administrator role on the Partition where you want to set up forwarding.
* Follow the instructions on [Grant Access to an AWS Product] (../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/Grant-Access-to-an-AWS-Product.md) to grant Sumo permission to send data to the destination S3 bucket.
* A Partition or Scheduled View to push to AWS S3.

## Forwarding interval 

Messages are buffered during data ingest for either **approximately** 5 minutes or until 100MB of data is received, whichever is first. Then the buffered data is written to a new CSV file and forwarded after compression. 

The limits mentioned here are upper limits, actual file size may vary depending on the ingestion volume in Scheduled Views or Partitions of an account. 

:::note
It takes approximately 5 minutes to propagate a new or changed S3 data forwarding rule or bucket across the Sumo service. So, it is possible after you create or modify a rule, the first 5 minutes of data forwarded might not be written to S3.
:::

## Format of forwarded data

For information on the file format of the posted objects, see [File Format for Data Forwarding to an Amazon S3 Bucket](data-forwarding-amazon-s3-bucket.md).

## Configure an S3 data forwarding destination

1. In Sumo Logic, select **Manage Data** \> **Logs** \> **Data Forwarding**.
1. Click **+** to add a new destination.
1. Select **Amazon S3** for **Destination Type**.
1. Configure the following: 

   * **Destination Name**. Enter a name to identify the destination.
   * **Bucket Name**. Enter the exact name of the S3 bucket. 

    :::note
    You can create only one destination with a particular bucket name.  If you try to create a new destination with the bucket name of an existing destination, the new destination replaces the old one.
    :::

   * **Description**. You can provide a meaningful description of the connection.
   * **Access Method**. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred, this was completed in the prerequisite step [Grant Sumo Logic access to an AWS Product] (../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Amazon-Web-Services/Grant-Access-to-an-AWS-Product.md). 
   
     * For **Role-based access** enter the Role ARN that was provided by AWS after creating the role.         
    
    ![data forwarding Role ARN input blur](/img/data-forwarding/data-forwarding-role-arn.png)
    
      * For **Key access** enter the **Access Key ID** and **Secret Access Key**. See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
    
    * **S3 Region**. Select the S3 region or keep the default value of Others. The S3 region must match the appropriate S3 bucket created in your Amazon account.
    * **Enable S3 server-side encryption**. Select the check box if you want the forwarded data to be encrypted. For more information, see [Protecting Data Using Server-Side Encryption with Amazon S3-Managed Encryption Keys (SSE-S3)](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html) in AWS help.
    * **Active**. Select this check box to enable Data Forwarding for the entire S3 bucket. To start Data Forwarding you will also need to enable forwarding for the desired indexes, as described below in this topic.

1. Click **Save**.

If Sumo Logic is able to verify the S3 credentials, the destination will be added to the list of destinations, and you can start Data Forwarding for specific Partitions or Scheduled Views, as described in the following section in this topic. See [Error and alert conditions](data-forwarding-to-s3.md) in this topic for examples of errors that can occur.

## Forward data to S3 

This section has instructions for enabling data forwarding for an existing Partition or Scheduled View.

:::tip
You can also enable Data Forwarding when you first create a Partition or Scheduled View by selecting the **Enable Data Forwarding** check box.
:::

1. In Sumo Logic, go to **Manage Data** \> **Logs** \> **Partitions**, or **Manage Data** \> **Logs** \> **Scheduled Views**, depending on whether you want to forward data from a Partition or a Scheduled View.

1. Click on the Partition or View for which you want to enable data forwarding and click the **Edit** button. When editing, you'll see an option to **Enable Data Forwarding**.
    
    ![enable data forwarding 2021.png](/img/data-forwarding/enable-data-forwarding.png)

1. Click the **Enable Data Forwarding** checkbox.

1. More options will appear. Select the **Forwarding Destination**. You can choose a previously configured destination, or click **New Amazon S3 Destination** to set up a new one. If you select the new option, you’ll see all of the settings to add a new Data Forwarding destination. See the previous procedure in this topic for instructions on configuring the settings.
    
    ![forwarding destination setup.png](/img/data-forwarding/forwarding-destination-setup.png)

1. For **File Format**, you can enter the path prefix to a directory in the S3 bucket. You can include any of the following variables:

    | Variable | Replaced with | 
    |----------|--------------------------------------------------| 
    | `{index}` | the name of the partition or scheduled view | 
    | `{day}` | the day of the year in the yyyy-MM-dd format | 
    | `{hour}` | the hour of the day (0-23) | 
    | `{minute}` | the minute of the hour | 
    | `{second}` | the second of the minute | 
    | `{uuid}`  | a randomly generated universal unique identifier |
    
    If you leave this field blank, the default format `{index}_{day}_{hour}_{minute}_{second}` is used. For example, to place data in a directory named `SumoDataForwarding` you could specify the **File Format** as: `SumoDataForwarding/{day}/{index}_{day}_{hour}_{minute}_{second}`

1. Click **Save** to save your changes and start forwarding data. 

## Error and alert conditions

An error or alert condition can occur with an S3 data forwarding destination for the following reasons:

* If Sumo Logic is not able to verify the S3 credentials when the destination is saved, an error message indicates that the credentials were rejected by Amazon. If this occurs, verify **Access Key ID,** **Secret Access Key **and the bucket configuration, re-select the **Active** check box, and save again.
    
    ![dfd01.png](/img/data-forwarding/dfd01.png) 

* Errors and alerts that are generated after the destination has been successfully saved and started are shown on the **Partitions** page. 
    
    ![data forwarding status icons.png](/img/data-forwarding/data-forwarding-status-icons.png)

* Hover over the icon to display the message.
    
    ![data forwarding icon message.png](/img/data-forwarding/data-forwarding-icon-message.png)

* In this example, Sumo Logic has disabled data forwarding due to errors in connecting to the S3 bucket. This occurs if the Amazon account or credentials change so that Sumo Logic is no longer able to authenticate to the bucket.  
