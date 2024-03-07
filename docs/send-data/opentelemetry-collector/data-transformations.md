---
id: data-transformations
title: OpenTelemetry - String Hashing and Masking using Transform Processor and OTTL
sidebar_label: String Hashing and Masking
description: Learn how to perform string hashing and masking operations using the Transform Processor and OTTL in OpenTelemetry.
---

OpenTelemetry provides the Transform Processor and OTTL (OpenTelemetry Transformation Language), empowering you to perform string hashing and masking operations on telemetry data. With the flexibility to configure the Transform Processor in your OpenTelemetry pipeline, you can replace sensitive information with hashed values or masked strings, ensuring data protection.

You can find more detailed information about the available OTTL functions and their usage in the [OTTL Functions README](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md).

## Hashing examples

### Example 1: Hashing a password in log body

Consider the following example log.

`username=user password=test`

```yaml
processors:
  transform/replace:
    log_statements:
      - context: log
        statements:
          - replace_pattern(body, "password=([0-9A-Za-z]+_)", "$$1", SHA256, "passwd=%s")
```

The `replace_pattern` function is applied to the log body. If the value matches the pattern `"password=([0-9A-Za-z]+_)"`, the matched section is replaced with the hashed capture group representing the password, while also keeping its `passwd` prefix. Please refer to [replace_pattern documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md#replace_pattern) for more details

### Example 2: Hashing an attribute

```yaml
processors:
  transform/replace:
    log_statements:
      - context: log
        statements:
          - set(attributes["message"], SHA1(attributes["message"]))
```

The given configuration demonstrates hashing using the transform processor. Within the `log` context, a single statement is executed.

The `set` function is used to apply the SHA1 hashing algorithm to the message attribute. The resulting hashed value replaces the original value of the message attribute. This configuration ensures that the message attribute is transformed by applying the SHA1 hashing algorithm

:::note
The Transform Processor in OpenTelemetry supports various hashing digests such as SHA256, SHA1, and FNV. You can choose the appropriate digest based on your requirements.
:::

## Masking examples

### Example: Mask Card Numbers

```yaml
sumologic:
  logs:
    container|systemd|kubelet:
      otelcol:
        extraProcessors:
          - transform/mask-card-numbers:
              log_statements:
                - context: log
                  statements:
                    - replace_pattern(body, "card=\\d+", "card=***")
```

In this example, the `replace_pattern` function is used to mask sensitive attributes based on a regular expression. All card numbers prefixed with `card=` are replaced by `***`.
