---
id: cse-record-types
title: Cloud SIEM Record Types
sidebar_label: Record Types
description: Learn about the record types to which you can map schema attributes.
---

Each message that Cloud SIEM maps must be assigned one, and only one, record type. For the complete list of record types, see [Schema: Record Types](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/schema/record_types.md) in the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md).

Note that it is possible for multiple mappers to match a particular log message and each create a unique record for that message—those multiple records can have different record types. It isn’t standard practice to create multiple Cloud SIEM records from a single log message, but it is possible if there is a use case. For related information, see [Attributes You Can Map to Records](/docs/cse/schema/attributes-map-to-records).