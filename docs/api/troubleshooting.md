---
id: troubleshooting
title: Troubleshooting Sumo Logic APIs
sidebar_label: Troubleshooting
description: This guide provides information to help you troubleshoot errors you may find when using the Sumo APIs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiEndpoints from '../reuse/api-endpoints.md';

<img src={useBaseUrl('img/icons/operations/troubleshoot.png')} alt="Thumbnail icon" width="50"/>

This guide provides information to help you troubleshoot errors you may find when using the Sumo Logic APIs.

## Deployments and Sumo Logic Endpoints

<details>

<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

## API - 301 Error - Moved

#### Question

My initial request to the Sumo Logic APIs returns the following 301 error message. Why is this message received?

```json
{
   "status": 301,
   "id": "IBCA5-NRG74-ROEI9",
   "code": "moved",
   "message": "The requested resource SHOULD be accessed through returned URI in Location Header."
}
```

#### Answer

The likely answer is that the API endpoint in the request did not include your correct deployment. Sumo Logic `us1` endpoints begin `api.sumologic.com`. The endpoints in other deployments (e.g., `us2`, `eu`, `au`) look like `api.<YOUR_DEPLOYMENT>.sumologic.com`.

<ApiEndpoints/>

## API - 401 Error - Credential could not be verified

#### Question

When running a script that makes multiple requests to the Sumo Logic APIs, I sporadically receive the following error message with certain requests despite valid credentials and successful requests. Why does this occur?

```json
{
   "status": 401,
   "id": "FRXHW-NB12G-HMYO6",
   "code": "unauthorized",
   "message": "Credential could not be verified."
}
```

#### Answer

To prevent possible brute force attacks, Sumo Logic throttles the number of authentication requests that can be made per minute to the service and APIs. The error message above may occur if you have exceeded the number of logins allowed over a one minute period.

The best practice for accessing the Sumo Logic APIs is to store and provide a session cookie with each follow up request during your session to the API, which will prevent the authentication throttling from occurring. A simple example for storing and providing a session cookie with cURL is shown below. This command (`-c <file>`) will store the session cookie within a text file called cookies.txt. This will also then pass the contents of the existing cookie file (`-b <file>`) with follow up request to the API.

```bash
curl -b cookies.txt -c cookies.txt -u '<username>:<password>' -X GET https://api.sumologic.com/api/v1/collectors
</password></username>
```

## API - 403 Error - This operation is not allowed for your account type

#### Question

When running an API query for the Sumo Logic [Search Job API](/docs/api/search-job), I'm receiving the following error message back from the requests. What does this mean?

```json
{
   "status": 403,
   "id": "PGS9M-CLBT3-VUJ0T",
   "code": "forbidden",
   "message": "This operation is not allowed for your account type."
}
```

#### Answer

The API- 403 error occurs when you do not have access to the Search Job API, which is only available for Enterprise-level accounts. If you're currently on a Sumo Logic Professional account, you'll receive this error message if you try to access these APIs.

If you need access to these APIs, reach out to your Sumo Logic sales representative or [contact us](https://www.sumologic.com/contact-us/) for more information on upgrading your existing account.


## Receiving 500 errors when using the Search Job API

#### Question

After making the initial call to the Search Job API, any follow up calls I make to query the status or results of the search job return a "500 Internal Server Error" or "Job ID is invalid". Is there an issue occurring with the service or job?

#### Answer

When making a request to the Search Job API, the original job query creates a session cookie, which must be stored and passed with any follow-up calls to the search job created. Sumo Logic routes the API requests to the server processing the search job based on the cookie provided with the request; if no cookie is provided the request may be passed to an incorrect server, resulting in a 500 error.

For example, when using cURL, we capture, store, and then pass the cookie back on the query request using the commands shown below:

#### Create the job

```bash
curl -b cookies.txt -c cookies.txt -H 'Content-type: application/json' -H 'Accept: application/json' -X POST -T createSearchJob.json --user <ACCESSID>:<ACCESSKEY> https://api.sumologic.com/api/v1/search/jobs
```

#### Query the Job

```bash
curl -v --trace-ascii - -b cookies.txt -c cookies.txt -H 'Accept: application/json' --user <ACCESSID>:<ACCESSKEY> https://api.sumologic.com/api/v1/search/jobs/<SEARCH_JOB_ID>
```

The [Search Job API documentation](/docs/api/search-job) provides an example of how to use the API (and does specify that cookies are to be supplied). Better error messaging around this type of error is under review and should be provided in a future release.


## Search Job API results into formatted JSON file

When getting current [Search Job API](/docs/api/search-job) results, you can format them cleanly into a JSON file.

Using an open source Python tool called mjson that comes with the standard Python libraries, you can put your results in an easier to read format. You can reference the tool at the following links:
* [https://pypi.python.org/pypi/mjson](https://pypi.python.org/pypi/mjson)
* [https://github.com/kjirou/python-mjson](https://github.com/kjirou/python-mjson)

When running your command to get the results, simply add the following. Note the **> results.txt** which is saving the results to a file named **results.txt**.

```sql
| grep "\"_raw\":" | sed 's/^[ \t]*"_raw": "//g' | sed 's/",[ \t]*$//g' > results.txt
```

A full example command is as follows, note you must input your accessid and accesskey, as well as ensure the correct endpoint is set and set the search job ID given when creating the search job:

```bash
curl -sS -b cookies.txt -c cookies.txt -H "Accept: application/json" --user ACCESSID:ACCESSKEY "https://api.sumologic.com/api/v1/sea...=0&limit=10000" | grep "\"_raw\":" | sed 's/^[ \t]*"_raw": "//g' | sed 's/",[ \t]*$//g' > results.txt
```

Now that the results on in the file **results.txt** you can use the **mjson.tool** on the file to make it easier to read as follows:

```bash
cat results.txt | python -mjson.tool >> results.json
```

Now you have a new file **results.json** that will be much easier to read.
