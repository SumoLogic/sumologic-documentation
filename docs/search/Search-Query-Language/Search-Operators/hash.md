---
id: hash
---

# hash

The hash operator uses a cryptographic hash algorithm to obscure data
into a random string value. The operator supports MD5, SHA1, SHA2, and
MurmurHash3 algorithms. The default is MD5 if no algorithm is specified.

This is helpful when working with sensitive data such as email
addresses, usernames, credit cards, and social security numbers. Each
unique value will have a unique hash code allowing you to maintain
anonymity.

#### Syntax 

As a [Search operator](hash/...md "Search Operators"), hash processes
the provided field against the specified algorithm to change the current
values into random unique values.

* `hash\<fiel\>\<algorithm]) [as\<fiel\>]`

| Parameter     | Description                                                                      | Default value |
|---------------|----------------------------------------------------------------------------------|---------------|
| \<algorith\>` | Define the algorithm type as either `md5`, `sha1`, `sha2_256`, or `murmur3_128`. | `md5`         |

#### Examples

##### Email address

Hash a field of email addresses.

`_sourceCategory=myLogs | parse "email=*" as email_address | hash("email_address", "md5") as hashed_email`

##### Username

Find a hashed username with the help of the [where](where.md "where")
and [matches](matches.md "matches") operators.

`_sourceCategory=myLogs | parse "username=*" as username | where username matches hash("username", "md5")`

##### Source IP

Get the source IP addresses by user hashes.

`_sourceCategory=myLogs | parse "username=*" as username | parse "src_ip=*" as src_ip | hash(username, "sha_256") as user_hash | count by src_ip, user_hash`

##### Unique identifier

Create a unique identifier for each log message by concatenating the
[built-in metadata
fields](../../Get-Started-with-Search/search-basics/built-in-metadata.md "Built-in Metadata") `_messagetime` and `_messageid`.

`| hash(concat(_messagetime, _messageid), "sha1") as guid`
