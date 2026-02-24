The following table describes the AWS regions used by each Sumo Logic deployment.

| Region code | Region name | AWS region | API endpoint |
|:----|:----|:---|:-----|
| AU | Asia Pacific (Sydney)  | ap-southeast-2 | https://api.au.sumologic.com/api/   |
| CA | Canada (Central) | ca-central-1 | https://api.ca.sumologic.com/api/   |
| DE | EU (Frankfurt)  | eu-central-1 | https://api.de.sumologic.com/api/   |
| EU | EU (Ireland)    | eu-west-1  | https://api.eu.sumologic.com/api/   |
| FED | US East (N. Virginia) | us-east-1  | https://api.fed.sumologic.com/api/  |
| IN | Asia Pacific (Mumbai) | ap-south-1 | https://api.in.sumologic.com/api/   |
| JP  | Asia Pacific (Tokyo)  | ap-northeast-1 | https://api.jp.sumologic.com/api/  |
| KR | Asia Pacific (Seoul) | ap-northeast-2 | https://api.kr.sumologic.com/api/  |
| US1 | US East (N. Virginia) | us-east-1  | https://api.sumologic.com/api/|
| US2 | US West (Oregon)| us-west-2 | https://api.us2.sumologic.com/api/ |

See the [AWS IP ranges JSON file](https://ip-ranges.amazonaws.com/ip-ranges.json) for the current list of AWS IP ranges or subnets or prefixes. To simplify firewall configuration, you can use only the IP prefixes for the AWS region associated with your Sumo Logic deployment, as shown in the table.

The list of IP ranges is shared infrastructure. It is not limited to Sumo Logic nodes and is subject to change over time.

You can run the following query against the downloaded file in Sumo Logic to determine the IP addresses for each deployment.

```sql
| parse regex "\s+\"ip_prefix\":\s+\"(?<ip_prefix>.*?)\",\n\s+\"region\":\s+\"(?<region>.*?)\",\n\s+\"service\":\s+\"(?<service>.*?)\"" multi
| where service="AMAZON"
  and (
       region="us-west-2"
    or region="us-east-1"
    or region="eu-west-1"
    or region="ap-southeast-2"
  )
| if (region="us-west-2", "US2", region) as region
| if (region="us-east-1", "US1", region) as region
| if (region="eu-west-1", "EU", region) as region
| if (region="ap-southeast-2", "AU", region) as region
| if (region="ap-northeast-2", "KR", region) as region
| count by ip_prefix, region, service
| fields - _count
| sort by region, ip_prefix
```

After configuring the firewall, Collector, and Sources, confirm that the Collector and Sources are working by verifying that you can receive a given type of message (such as syslog messages) at the specified location.

For more information, see:
* [AWS documentation: Service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)
* [Sumo Logic Privacy Statement](https://www.sumologic.com/privacy-statement/)
