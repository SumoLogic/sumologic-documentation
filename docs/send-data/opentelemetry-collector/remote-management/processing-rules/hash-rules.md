---
id: hash-rules
title: OpenTelemetry Remote Management Hash Rules
sidebar_label: Hash Rules
description: Create an OpenTelemetry collector remote management hash rule to replace an expression with a hash code.
---

A hash rule is a processing rule that allows you to replace an expression with a hash code generated for that value. Hashed data is completely hidden (obfuscated) before being sent to Sumo Logic. This can be very useful in situations where some type of data must not leave your premises, such as credit cards and social security numbers. Each unique value will have a unique hash code.

The hash algorithm used is **SHA-256**.

Ingestion volume is calculated after applying the hash filter. If the hash reduces the size of the log, the smaller size will be measured against ingestion limits.

:::note
Currently available for Local File ST only.
:::

## How it works

When you add a hash rule action to your processing rules, you need to provide two inputs:

1. **Expression**: A regular expression that must contain exactly **one capture group** `( )`. The string value matched through this capture group is what will be hashed using SHA-256. If there are multiple parts of the string which needs to be hashed, add additional hashing processing rules for it.

2. **Replacement Format**: The formatted replacement string that will replace the matching string in the log. Use `%s` to refer to the hashed value from the SHA-256 function. The `%s` reference is mandatory and can only be used once.

## Examples

### Hash a password

For example, to hash the password `Welcome123` from this log:

```
user=sumo password=Welcome123
```

You could use the following configuration:

**Expression:**
```
password=([A-Za-z0-9]+)
```

**Replacement Format:**
```
password=%s
```

**Result:**
- **Matching string**: `password=Welcome123`
- **Capture group**: `Welcome123` (this value is hashed)
- **Output log**: `user=sumo password=<hashed_value>`

Where `<hashed_value>` is the SHA-256 hash of `Welcome123`.

### Hash member IDs

To hash member IDs from this log:

```
2012-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8] [module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [memberid=dan@demo.com] [remote_ip=98.248.40.103] [web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
```

You could use the following configuration:

**Expression:**
```
memberid=([^\]]+)
```

**Replacement Format:**
```
memberid=%s
```

**Resulting hashed log:**

```
2012-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8] [module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [memberid=906e9cc124c8e1085b10e1cec4cc6526f3637558be361d3b4bb54bb537e49a49] [remote_ip=98.248.40.103] [web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
```

:::important
Any hashing expression should be tested and verified with a sample source file before applying it to your production logs.
:::

## Rules and limitations

* The regular expression must contain exactly **one capture group** enclosed in `( )`. Values inside this capture group will be hashed. If there are multiple parts of the string which needs to be hashed, add additional hashing processing rules for it.

* You can use an anchor to detect specific values in your logs. Only the value within the capture group will be hashed.

* The hash algorithm is **SHA-256** (MD5 is not supported for OpenTelemetry collectors).

* Make sure you do not specify a regular expression that matches a full log line. Doing so will result in the entire log line being hashed.

* The replacement format must include `%s` exactly once to reference the hashed value.

* Do not unnecessarily match on more of the log than needed. Use precise regular expressions to ensure that only the intended sensitive information is hashed, not surrounding context.

* Each unique value will produce a unique hash code. The same input value will always produce the same hash output, allowing you to correlate occurrences while keeping the actual value hidden.