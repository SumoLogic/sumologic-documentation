---
id: mask-rules
title: Mask Rules
description: Create a mask rule to replace an expression with a mask string.
---
<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::note
This document do not support masking logs for Windows source template. Refer to [Mask Rules for Windows Source Template](mask-rules-windows.md) to mask logs for Windows source template.
:::

A mask rule is a type of processing rule that hides irrelevant or sensitive information from logs before ingestion. When you create a mask rule, whatever expression you choose to mask will be replaced with a mask string before it is sent to Sumo Logic. You can provide a mask string, or use the default `"#####"`.

Ingestion volume is calculated after applying the mask filter. If the mask reduces the size of the log, the smaller size will be measured against ingestion limits. Masking is a good method for reducing overall ingestion volume.

For example, to mask the email address `dan@demo.com` from this log:

```
2018-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8] [module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [auth=User:dan@demo.com] [remote_ip=98.248.40.103] [web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
```

You could use the following filter expression:

```
auth=User:.*\.com
```

Using the masking string `auth=User:AAA` would provide the following result:

```
2018-05-16 09:43:39,607 -0700 DEBUG [hostId=prod-cass-raw-8] [module=RAW] [logger=scala.raw.InboundRawProtocolHandler] [auth=User:AAA] [remote_ip=98.248.40.103] [web_session=19zefhqy...] [session=80F1BD83AEBDF4FB] [customer=0000000000000005] [call=InboundRawProtocol.getMessages]
```

## Rules

* Expressions that you want masked must be selected by the regular expression you given. And the masking string provided will mask whole of the string which is selected by the regular expression.

    For example, this log message:

    ```
    {
      "reqHdr":{
        "auth":"Basic ksoe9wudkej2lfj*jshd6sl.cmei=",
        "cookie":"$Version=0; JSESSIONID=6C1BR5DAB897346B70FD2CA7SD4639.localhost_bc; $Path=/"
      }
    }
    ```

    You would use the following as a mask expression to mask the auth parameter's token:

    ```
    "auth"\s*:\s*"Basic\s*[^"]+"
    ```

    If the masking string given here is `"auth":"#####"`, then the log output will be:

    ```
    {
      "reqHdr": {
        "auth":"#####",
        "cookie":"$Version=0; JSESSIONID=6C1BR5DAB897346B70FD2CA7SD4639.localhost_bc; $Path=/"
      }
    }
    ```

* Do not unnecessarily match on more of the log than needed. As seen in the previous example, avoid using overly broad expressions that could mask the entire log. This ensures that only the sensitive information is masked, not the whole log entry.

    ```
    (?s).*auth"\s*:\s*"Basic\s*([^"]+)".*(?s)
    ```

* Make sure you do not specify a regular expression that matches a full log line. Doing so will result in the entire log line being masked.

* If you need to mask values on multiple lines, use single-line modifiers (?s). For example:

    ```
    auth=User\:(.*(?s).*session=.*?)\]
    ```

:::note
- For masking, we use the [replace_pattern](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md#replace_pattern) OTTL function. In this function:
   - $ must be escaped as $$ to bypass environment variable substitution logic.
   - To input a literal $, use $$$.
- When masking strings containing special characters like double quotes (`"`) and backslashes (`\`), these characters will be escaped by a backslash when masking the logs.
:::

## Examples

:::important
Any masking expression should be tested and verified with a sample source file before applying it to your production logs.
:::

### Mask credit card numbers

You can mask credit card numbers from log messages using a regular expression within a mask rule. Once masked with a known string, you can then perform a search for that string within your logs to detect if credit card numbers may be leaking into your log files.

The following regular expression can be used within a masking filter to mask American Express, Visa (16 digit only), Mastercard, and Discover credit card numbers:

```
((?:(?:4\d{3})|(?:5[1-5]\d{2})|6(?:011|5[0-9]{2}))(?:-?|\040?)(?:\d{4}(?:-?|\040?)){3}|(?:3[4,7]\d{2})(?:-?|\040?)\d{6}(?:-?|\040?)\d{5})
```

This regular expression covers instances where the number includes dashes, spaces, or is a solid string of numbers.

Samples include:

* **American Express:** 3711-078176-01234  \|  371107817601234  \|  3711 078176 01234
* **Visa:** 4123-5123-6123-7123  \|  4123512361237123  \|  4123 5123 6123 7123
* **Master Card:** 5123-4123-6123-7123  \|  5123412361237123  \|  5123 4123 6123 7123
* **Discover:** 6011-0009-9013-9424  \|  6500000000000002  \|  6011 0009 9013 9424
