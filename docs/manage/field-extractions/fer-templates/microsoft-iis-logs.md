---
id: microsoft-iis-logs
title: Microsoft IIS Logs
description: Parse the common fields in your Microsoft IIS Logs using the FER template.
---

**Log Type**: Microsoft IIS

**Template Description:** Parsing the common fields in your Microsoft IIS log.

**Sample Log:**

```
2017-07-13 19:05:07 10.0.0.103 POST /ConfigWeb/ManageUsers.aspx name=.NET+StockTrader+Web+Application&cfgSvc=Trade.StockTraderWebApplicationConfigurationImplementation.ConfigurationService&version=Version+5.0&hoster=Microsoft+Corporation&platform=Windows+Server+2008+R2+with+.NET+Framework+v4.0.30319&action=addUser&identify=0 80 localadmin 164.110.188.119 Mozilla/5.0+(Windows+NT+6.1;+WOW64;+rv:14.0)+Gecko/20100101+Firefox/14.0.1 500 0 0 4786 194110 552
```

**Parsing Rule:**

```sql
parse regex "^[^#].*?(?<s_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) (?<cs_method>\S+?) (?<cs_uri_stem>\S+?) (?<cs_uri_query>\S+?) (?<s_port>\d+?) (?<cs_username>\S+?) (?<c_ip>.+?) (?<cs_User_Agent>\S+?) (?<cs_Referer>\S+?) (?<sc_status>\d+?) (?<sc_substatus>\d+?) (?<sc_win32_status>\d+?) (?<time_taken>\d+?)$"
```

**Resulting Fields:**

| Field | Description | Example |
|:--|:--|:--|
| s_ip | IP address of the server on which the log file entry was generated | 10.0.0.103 |
| cs_method | Requested action | POST |
| cs_uri_stem | Target of the action | /ConfigWeb/ManageUsers.aspx |
| cs_uri_query | The query, if any, that the client was trying to perform | name=.NET+StockTrader+Web+Application&cfgSvc=Trade.StockTraderWebApplicationConfigurationImplementation.ConfigurationService&version=Version+5.0&hoster=Microsoft+Corporation&platform=Windows+Server+2008+R2+with+.NET+Framework+v4.0.30319&action=addUser&identify=0 |
| s_port | Server port number that is configured for the service | 80 |
| cs_username | Name of the authenticated user who accessed your server | localadmin |
| c_ip | IP address of the client that made the request | 164.110.188.119 |
| cs_User_Agent | Browser type that the client used | 500 |
| cs_Referer | Site that the user last visited | 0 |
| sc_status | HTTP status code | 0 |
| sc_substatus | Substatus error code | 4786 |
| sc_win32_status | Windows status code | 194110 |
| time_taken | Length of time that the action took, in milliseconds | 552 |
