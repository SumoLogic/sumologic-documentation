---
id: cse-apis
title: CSE APIs
sidebar_label: APIs
description: Learn how to access CSE APIs and API documentation.
---

This page has information about accessing the CSE APIs and API documentation.

Your API endpoint depends on your Sumo Logic deployment. For a list of Sumo Logic API endpoints by deployment, see Sumo Logic Endpoints and Firewall Security. Your endpoint will look something like this:

`https://api.us2.sumologic.com/api/`

To view API documentation, go to the `/docs/sec` path at your API endpoint. For example:

`https://api.us2.sumologic.com/docs/sec/`

The APIs themselves start with `/api/sec/v1/`

For example:  

`https://api.us2.sumologic.com/api/sec/v1/custom-insights`

API requests must be authenticated. For authentication options and information about rate limiting, see API Authentication. 

## Rate Limiting

The Sumo Logic CSE API is rate limited. The rate limit is 1,000 requests per minute. That limit is subject to change without notice. 

Each API response contains the following headers:

* `X-RateLimit-Limit`—Contains the total number of requests allowed
    for the current time period.
* `X-RateLimit-Remaining`—Contains the number of requests remaining in
    the current time period.
* `X-RateLimit-Reset`—Contains a timestamp (UTC seconds since epoch)
    for when the current time period ends and the limit will be reset.

If you exceed the rate limit, you’ll receive an `HTTP 429 Too Many Requests` error in response. This response will also contain a `Retry-After` header, which contains the number of seconds until the current period ends and the rate limit is reset.
