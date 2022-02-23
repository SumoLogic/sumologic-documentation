---
id: cidr
---

# CIDR

Sumo Logic's three CIDR operators work with CIDR (Classless Inter-Domain
Routing, sometimes pronounced "cider") notation to narrow the analysis
of IPv4 networks to specific subnets. CIDR notations specify the routing
prefix of IP addresses. Using the CIDR operators, you can determine the
amount of traffic between network segments, review events from hosts
within a specified network segment, or even use a **not** operator to
find addresses that didn't originate from a particular network segment.

CIDR operators can be used to compare the network segment of two IPv4
addresses, or just identify the network segment involved in particular
messages.

IPv6 addresses (e.g., "2001:db8::ff00:42:8329") combine a 64-bit network
address with a 64-bit host address, so identifying the network segment
is easy. The network is the high-order 64 bits in the value.

IPv4 addresses use a variable number of bits to describe the
network. The first 24 bits, for example, might represent the subnetwork,
and the remaining 8 bits identify individual hosts on that network. The
portion of the address representing the network segment is called the
prefix, and the number of bits allocated to the prefix is the
prefix_length.

The familiar "dotted quad" notation for IPv4 addresses can be difficult
to compare if the number of bits assigned to the network is not 16 or
24. The CIDR operators are designed to help.

For general information about Classless Inter-Domain Routing, see
this [online
article](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

### getCIDRPrefix

Extracts the network prefix from an IPv4 address. 

**Syntax**

* `getCIDRPrefix(\<ip_add\>", \<prefix_lengt\>") as\<fiel\>`

`ip_addr` is a string representation (such as "10.10.1.35")

`prefix_length` is an integer value in string/text format (0-32)

**Examples**

`getCIDRPrefix("10.10.1.35", "24") as net`     returns `10.10.1.0`

`getCIDRPrefix("10.10.1.35", "27") as net`     returns `10.10.1.32`

`getCIDRPrefix("10.10.1.35", "29") as net`     returns `10.10.1.32`

### compareCIDRPrefix

Compares two IPv4 addresses and returns true if the network prefixes
match.

**Syntax**

* `compareCIDRPrefix(\<ip_addr\>", \<ip_addr\>", \<prefix_lengt\>") as\<fiel\>`

`ip_add1` and `ip_addr2` are string representations (such as
"10.10.1.35")

`prefix_length` is an integer value in string/text format (0-32)

**Boolean expression syntax**

* `compareCIDRPrefix\<ip_addr\>,\<ip_addr\>, \<prefix_lengt\>")`

**Examples**

**To review events from a specific network segment**

1.  Search for the events. For example, let's say we'd like to review
    firewall logs:  
    `(denied OR rejected AND _sourcecategory=firewall | ...`
2.  Parse the IP addresses. For example:  
    `... | parse "ip=*," as ip_address ...`
3.  Compare to the full CIDR notation you requested. For example,
    10.10.1.32/27:  
    `... | where compareCIDRPrefix("10.10.1.32", ip_address, "27") | ...`
4.  Keep matching records, and drop non-matching records from search
    results:  
    `... | count by ip_address`

**To review events not from a specific network segment**

1.  Search for the events. For example, let's say we'd like to review
    firewall logs:  
    `(denied OR rejected AND _sourcecategory=firewall | ...`
2.  Parse the IP addresses. For example:  
    `... | parse "ip=*," as ip_address ...`
3.  Compare to the full CIDR notation you requested, and drop matching
    records. For example, 10.10.1.32/27:  
    `... | where !compareCIDRPrefix("10.10.1.32", ip_address, "27") | ...`

## maskFromCIDR

A utility function that returns a subnet mask for boolean operations
with IPv4 addresses.

**Syntax**

* `maskFromCIDR(\<prefix_lengt\>") as\<fiel\>`

`prefix_length` is an integer value in string/text format (0-32)

|          |                 |
|----------|-----------------|
| **CIDR** | **Mask**        |
| 32       | 255.255.255.255 |
| 31       | 255.255.255.254 |
| 30       | 255.255.255.252 |
| 29       | 255.255.255.248 |
| ...      | ...             |

 
