---
id: hash-rules
title: Hash Rules
description: With a hash rule, an expression you choose will be replaced by a hash code.
---

### Hash Rules

A hash rule is a processing rule that allows you to replace an expression with a hash code generated for that value. Hashed data is completely hidden (obfuscated) before being sent to Sumo Logic. This can be very useful in situations where some type of data must not leave your premises, such as credit cards and social security numbers. Each unique value will have a unique hash code.

For example, to hash member IDs, you could use the following filter expression:

```@@ -18,17 +16,18 @@ Log line:
2012-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8] [module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [memberid=dan@demo.com] [remote_ip=98.248.40.103] [web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
```

Resulting hashed log line for hash 256:

```
2012-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8] [module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [memberid=38357ee995993f047cce95db89b536b8] [remote_ip=98.248.40.103] [web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
2012-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8]
[module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [memberid=906e9cc124c8e1085b10e1cec4cc6526f3637558be361d3b4bb54bb537e49a49] [remote_ip=98.248.40.103]
[web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
```

Note the following:

* Values that you want hashed must be expressed as a match group enclosed in "( )".
* You can use an anchor to detect specific values. In addition, you can specify multiple match groups. If multiple match groups are specified, each of the values will be hashed uniquely.
* The hash algorithm is MD5 (default) or SHA-256. OpenTelemetry collectors only support SHA-256.
* If a match group isn't specified no data will be hashed.
* Make sure you do not specify a regular expression that matches a full log line. Doing so will result in the entire log line being hashed.
* If you need to hash values on multiple lines use single line modifiers (?s). For example: `memberid=(.*(?s).*session=.*?)\]`
