---
id: collector-fails-sumo-connection
title: Collector fails to connect to Sumo
---


For this issue, the failure to connect may be due to the target server failed to respond or HTTP 504 or HTTP 408 errors.

## Question

I'm not receiving any data from my new Collectors located in AWS EC2. Why do I see the following error in my collector.log files?

```
2015-01-12 17:29:48,216 [HTTP Sender - 15] WARN com.sumologic.scala.collector.CommonsHTTPTransmitter - ConnectException for receiver url: 'collectors.sumologic.com:443'; on attempt: '2'
org.apache.http.NoHttpResponseException: The target server failed to respond
```

## Answer

This warning indicates that a brief lapse in network connectivity between your Collector and Sumo Logic has occurred. Normally it can be safely ignored because the Collector will automatically retry once per minute until a successful connection is established.

Here are a few troubleshooting steps to try when your Collector is consistently unable to connect to the Service:

1. Test DNS resolution and connectivity to the Sumo servers: 

```bash
curl -i https://collectors.sumologic.com
 // you should see the word "Tweep" returned
```

1. Check whether there is a significant delay in performing the DNS lookup:

```bash
time nslookup collectors.sumologic.com
```

1. Rule out dropped packets due to jumbo frames being unsupported by your network end points. For example, MTU being set to 9001 bytes vs. the age old default of 1500 bytes. In newer AWS EC2 VPC's, the MTU is set to 9001 by default. This is referred to as using [jumbo frames](https://en.wikipedia.org/wiki/Jumbo_frame) and can cause packet loss since not all devices on the internet support large packet sizes. [Path MTU Discovery](https://en.wikipedia.org/wiki/Path_MTU_Discovery) is responsible for ensuring that packets of the correct size are sent to each end point by first checking whether the end point can handle jumbo frames, and then resending the packet in smaller chunks until it's successfully sent. Packets will be dropped in cases where ICMP *Unreachable* messages are disabled on the receiving end since [Path MTU Discovery](https://en.wikipedia.org/wiki/Path_MTU_Discovery) relies on these messages to determine the correct packet size.

### Setting the default MTU on a Linux Operating System

If your client runs in a Linux operating system, you can review and set the MTU value by using the `ip` command. Run the following command to determine the current MTU value:

```bash
$ ip addr show eth0
```

Review the value following `mtu` in the output. If the value is not `1500`, run the following command to set it:

```bash
$ ip link set dev eth0 mtu 1500
```

 

### Setting the default MTU on a Microsoft Windows Operating System

Browse to the following registry key:

```
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\adapter_ID
```

The value name is MTU and the data value should be set to 1500. This setting is a DWORD data type. Restart the computer after changing this setting for the new value to be applied.
