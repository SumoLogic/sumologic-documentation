---
id: view-list-data-forwarding
title: View Information About Data Forwarding
description: Learn how to view a list of data forwarding configured for your organization, and to view the basic info and details of data forwarding.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The page talks about viewing information about the data forwarding configured for your organization.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Data Forwarding**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Data Forwarding**. You can also click the **Go To...** menu at the top of the screen and select **Data Forwarding**. <br/><img src={useBaseUrl('/img/manage/data-forwarding/data_forwarding.png')} alt="Data_Forwarding" style={{border:'1px solid gray'}} width="800"/>
1. Once you're in the **Data Forwarding** tab, apply the following settings:
    * **Add a filter**. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section.
        :::note
        You can see the suggestions only if there are two or more responses for the same column or section.
        :::
    * **Status**. Indicates whether the data forwarding is currently Active or Inactive.
    * **Destination Name**. The name used to identify the destination.
    * **Data Sources**. Indicates the number of indexes (Partition or Scheduled View) the destination is linked to.
    * **Description**. A meaningful description of the connection.
1. To view details of a data forwarding configuration, click any destination name of your choice.
1. A pane pops up on the right side of the page with the following information.
    * **Basic Info**
        * **Destination Name**. The name used to identify the destination.
        * **Description**. A meaningful description of the connection.
        * **Bucket Name**. The exact name of the S3 bucket.
        * **Status**. Indicates whether the data forwarding is currently Active or Inactive.
        * **Access Method**. Indicates the type of access based on the AWS authentication provided to access the S3 bucket.
            * **AWS Access key**. Access key details gathered from the AWS used for the Key access method.
            * **AWS Secret key**. Secret key details gathered from the AWS used for the Key access method.
            * **Role ARN**. Role ARN provided by AWS after creating the role, used for Role-based access method.
        * **S3 Region**. Indicates the AWS S3 region in which the bucket is hosted.
        * **S3 Server-Side Encryption**. Provides the encryption details of the forwarded data. <br/><img src={useBaseUrl('/img/manage/data-forwarding/basic-info.png')} alt="Data forwarding pane" width="400"/>
    * **Details**
        * **Data Sources**. Indicates the list of sources (Partition or Scheduled View) from which the log data is forwarded to an S3 bucket.
            * **Data forwarded**. Provides the breakdown information about the data forwarded and indicates the total data forwarded to the given S3 bucket for the selected time.
            * **Query/Routing Expression**. Indicates the query for scheduled views and routing expression for partitions for which the data is forwarded. <br/><img src={useBaseUrl('/img/manage/data-forwarding/details.png')} alt="Data forwarding details" width="400"/>
