To configure an AWS Cost Explorer Source:

1. On the **Manage Data** > **Collection** > **Collection** page, click **Add Source** next to a **Hosted **Collector.
2. Select **AWS Cost Explorer**. <br/> ![aws-cost-explorer-icon.png](/img/send-data/aws-cost-explorer-icon.png)
3. Enter a **Name** for the Source in the Sumo Logic console. The **Description** is optional.<br/>  ![awsCostExplorer-input.png](/img/integrations/amazon-aws/cost-explorer-v2-1-1.png)
4. For **Source Category** (Optional), enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
5. For [Fields](/docs/manage/fields), click the **+Add** link to add custom log metadata. Define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.<br/><br/>It is preferable to add an **account** field (for the dashboards) and assign it a friendly name to identify the corresponding AWS account.<br/> ![accountField.png](/img/send-data/accountField.png)
6. For the **AWS Access Key** and **AWS Secret Key**, provide the IAM User access key and secret key you want to use to authenticate collection requests.
Make sure your IAM user has the following IAM policy attached with it.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ce:Describe*",
                "ce:Get*",
                "ce:List*",
                "ec2:DescribeRegions"
            ],
            "Resource": "*"
        }
    ]
}
```
7. For the **Enable Regions** field, provide the regions which need to be monitored for cost. The cost incurred across these regions will be fetched separately. The region list here includes all the standard AWS regions along with “global”. “Global” region includes services like Amazon CloudFront, Amazon Route 53, and Amazon IAM. If the field is left empty (default behavior), then data will be fetched from all the enabled regions of the respective AWS account. It is recommended to provide only the regions which are actively used and need to be monitored for cost. This will save the AWS cost for running this source on unused regions.
8. For the **Cost Type**, provide supported cost types / MetricTypes. For details on the CostType, see Amazon's [Understanding your AWS Cost Datasets: A Cheat Sheet](https://aws.amazon.com/blogs/aws-cloud-financial-management/understanding-your-aws-cost-datasets-a-cheat-sheet/).
    * AmortizedCost
    * BlendedCost
    * NetAmortizedCost
    * NetUnblendedCost
    * UnblendedCost
9. For **Granularity**, provide 2 supported granularities for each of the MetricTypes (or cost types):
    * Daily Costs (Polled every 12h)
    * Monthly Costs (Polled every day)
10. Add **[Processing Rules](/docs/send-data/collection/processing-rules)**.
11. Click **Submit** when complete.
