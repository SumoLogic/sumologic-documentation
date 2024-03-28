The following table describes the AWS regions used by each Sumo Logic deployment. See the [AWS page on regions and endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html) for more information.

| Sumo Deployment | AWS Region Name | AWS Region |
|:---|:---|:---|
| AU | Asia Pacific (Sydney) | ap-southeast-2 |
| CA | Canada (Central) | ca-central-1 |
| DE | EU (Frankfurt) | eu-central-1 |
| EU | EU (Ireland) | eu-west-1 |
| FED | US East (N. Virginia) | us-east-1 |
| IN | Asia Pacific (Mumbai) | ap-south-1 |
| JP | Asia Pacific (Tokyo) | ap-northeast-1 |
| US1 | US East (N. Virginia) | us-east-1 |
| US2 | US West (Oregon) | us-west-2 |

[This link](https://ip-ranges.amazonaws.com/ip-ranges.json) provides the complete current list of AWS IP ranges or subnets or prefixes. You can limit the number of entries in a firewall by using just the IP prefixes against the AWS region that your account's Sumo deployment uses, as shown in the table.

The list of IP ranges is shared infrastructure. It is not limited to Sumo Logic nodes and is subject to change over time.

You can run the following query against the downloaded file in Sumo Logic to determine the IP addresses for each deployment.

```sql
| parse regex "\s+\"ip_prefix\":\s+\"(?<ip_prefix>.*?)\",\n\s+\"region\":\s+\"(?<region>.*?)\",\n\s+\"service\":\s+\"(?<service>.*?)\"" multi | where service="AMAZON" and (region="us-west-2" or region="us-east-1" or region="eu-west-1" or region="ap-southeast-2") | if (region="us-west-2", "US2", region) as region | if (region="us-east-1", "PROD", region) as region | if (region="eu-west-1", "EU", region) as region | if (region="ap-southeast-2", "AU", region) as region | count by ip_prefix, region, service | fields - _count | sort by region, ip_prefix
```

After configuring the firewall, Collector, and Sources, confirm that the Collector and Sources are working by verifying that you can receive a given type of message (such as syslog messages) at the specified location.
