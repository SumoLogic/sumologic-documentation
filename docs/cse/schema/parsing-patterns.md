---
id: parsing-patterns
title: Parsing Patterns
sidebar_label: Parsing Patterns
description: Parsing patterns are predefined named regular expressions used in regex-based parsers. 
---

This topic describes parsing patterns, predefined named regular expressions similar to [*Grok*](https://logz.io/blog/logstash-grok/), that simplify and speed the development of regex-based parsers. 

Patterns are stored in `patterns.conf` as `<Pattern Name> = <regex>` key value pairs, for example:

`IPV4 = \d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`

In parsers, you refer to a pattern as `%{<Pattern Name>}`. You can use a pattern anywhere that regex can be used.  You can assign patterns to a
named capture group like this:

`%{<Pattern Name>:<field_name>}`

## Patterns

### System port

This patterns identifies well-known ports from 1-1023. It covers 1|01|001|0001 to 1023, skipping 0, 00, 000, 0000 and > 1024. For example:

`SYSTEM_PORT = ^0*(?:[1-9]\d{0,3}|[0-2]\d{4}|3[01]\d{3}|32[0-6]\d{2}|327[0-5]\d|3276[0-7])(?:\s|$)`

```

# times and dates

year = 20\d\d|19\d\d|[901]\d
month = (0?[1-9]|1[012])
litmonth = (?P<_$litmonth>jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)[a-z,\.;]*
anymonth = %{litmonth:_$litmonth}|%{month:_$month}
day = 3[01]|[12]\d|0?[1-9]
usday = %{day:_$day}(?:st|nd|rd|th|[,\.;])?
hour = (?:[01]?[1-9]|[012][0-3])
minute = (?:[0-6]\d)
second = (?:[0-6]\d)
zone = ((?:(?:UT|UTC|(?:GMT)?[+-]\d\d?:?(?:\d\d)?)|GMT|CET|CEST|CETDST|MET|MEST|METDST|MEZ|MESZ|EET|EEST|EETDST|WET|WEST|WETDST|MSK|MSD|IST|JST|KST|HKT|AST|ADT|EST|EDT|CST|CDT|MST|MDT|PST|PDT|CAST|CADT|EAST|EADT|WAST|WADT|Z)|(?:GMT)?[+-]\d\d?:?(?:\d\d)?))?
ampm = ([ap]m|[\x{4E0A}\x{4E0B}]\x{5348})
time = (%{hour:_$hour}:%{minute:_$minute}:%{second:_$second}(?:(?: \d{4})?[:,\.](\d+))? {0,2}(%{ampm:ampm})? {0,2}%{zone:zone})
hmtime = (%{hour:_$hour}:%{minute:_$minute}(?: %{ampm})?)
dottime = (?P<hour>(?:[01]\d|2[0-3]))\.%{minute:_$minute}(?:\.?%{second:_$second}(?:[:,]\d+)?(?:\.(\d\d\d\d+))?) {0,2}%{zone:zone}
# combdatetime - 20151102-000012 GMT
combdatetime = (20\d\d)(0\d|1[012])([012]\d|3[01])[.-]?([01]\d|2[0123])([0-6]\d)([0-6]\d)(?:\.?(\d+))?( %{zone})?
# combdatetime2 - 2007-3-22 0:0:2 GMT
combdatetime2 = (20\d\d)(?P<sep>[-/])([01]?\d)\g<sep>([012]?\d|3[01])\s+([012]?\d):([0-6]?\d):([0-6]?\d)( %{zone})?
bsdsyslogdate = %{anymonth}(?P<sep>[/\- ]) {0,2}%{day:_$day}
usdate = %{anymonth}(?P<sep>[/\- ]) {0,2}%{day:_$day} {0,2}(?:\d\d:\d\d:\d\d(?:[\.\,]\d+)? {0,2}%{zone:zone})?((?:\g<sep>|,) {0,2}%{year:_$year})?
# Feb 19, 15
usdate1 = %{litmonth}(?P<sep>[/\- ]) {0,2}%{day:_$day} {0,2}(?:\d\d:\d\d:\d\d(?:[\.\,]\d+)? {0,2}%{zone:zone})?((?:\g<sep>|,) {0,2}%{year:_$year})?
# usdate2 - 11/02/15
usdate2 = %{month:_$month}(?P<sep>[/\-])%{day:_$day}((?:\g<sep>)%{year:_$year})?

# only one in use
isodate = %{year:_$year}([\./\- ])%{anymonth}(?:[\./\- ] {0,2})%{day:_$day}


eurodate1 = %{usday}(?P<sep>[\- /]) {0,2}%{anymonth}\g<sep> {0,2}%{year:_$year}
eurodate2 = %{usday}\.%{anymonth}\.%{year:_$year}
bareurlitdate = (\d\d?)\|\|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\|\|(20\d\d)
orddate = \s([01]\d)([0123]\d\d)\s
masheddate = (?:^|source::).*?(?:20)?([901]\d)(0\d|1[012])([012]\d|3[01])
masheddate2 = (?:^|source::).*?(0\d|1[012])([012]\d|3[01])(?:20)?([901]\d)
# utcepoch - changes in 2017


# more patterns

USERNAME = [a-zA-Z0-9._-]+
USER = %{USERNAME}
INT = (?:[+-]?(?:[0-9]+))
BASE10NUM = (?:[+-]?(?:(?:[0-9]+(?:\.[0-9]+)?)|(?:\.[0-9]+)))
NUMBER = (?:%{BASE10NUM})
BASE16NUM =   (?:[+-]?(?:0x)?(?:[0-9A-Fa-f]+))
BASE16FLOAT = (?:[+-]?(?:0x)?(?:(?:[0-9A-Fa-f]+(?:\.[0-9A-Fa-f]*)?)|(?:\.[0-9A-Fa-f]+)))

POSINT = (?:[1-9][0-9]*)
NONNEGINT = (?:[0-9]+)
WORD = \w+
DASHED_WORD = \w+(-\w+)*
NOTSPACE = \S+
SPACE = \s*
DATA = .*?
GREEDYDATA = .*
UUID = [A-Fa-f0-9]{8}-?(?:[A-Fa-f0-9]{4}-?){3}[A-Fa-f0-9]{12}

# Networking
CISCOMAC = (?:(?:[A-Fa-f0-9]{4}\.){2}[A-Fa-f0-9]{4})
WINDOWSMAC = (?:(?:[A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2})
COMMONMAC = (?:(?:[A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2})
BADMAC = (?:(?:[A-Fa-f0-9]:){5}[A-Fa-f0-9])
MAC = (?:%{CISCOMAC}|%{WINDOWSMAC}|%{COMMONMAC}|%{BADMAC})

# IPV6-1 = (([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))
# IPV6-2 = (([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}?))
# IPV6-3 = (([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))
# IPV6-4 = (([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))
# IPV6-5 = (([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))
# IPV6-6 = (([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))
# IPV6-7 = (([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))
# IPV6-8 = (:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))

IPV6 = ((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?

IPV4 = (?:(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})[.](?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2}))

IP = (?:%{IPV6}|%{IPV4})

IPPORT = (?:(?:\[%{IPV6}\]|%{IPV4}):%{POSINT})

HOSTNAME = (?:[0-9A-Za-z][0-9A-Za-z-]{0,62})(?:\.(?:[0-9A-Za-z][0-9A-Za-z-]{0,62}))*(\.?|\b)
HOST = %{HOSTNAME}
IPORHOST = (?:%{HOSTNAME}|%{IP})
HOSTPORT = (?:%{IPORHOST}:%{POSINT})|%{IPPORT}

# paths
TTY = (?:/dev/(pts|tty([pq])?)(\w+)?/?(?:[0-9]+))
UNIXPATH = (?:/(?:[\w_%!$@:.,-]+|\\.)*)+
WINPATH = (?:[A-Za-z]+:|\\)(?:\\[^\\?*]*)+
PATH = (?:%{UNIXPATH}|%{WINPATH})
URIPROTO = [A-Za-z]+(\+[A-Za-z+]+)?
URIHOST = %{IPORHOST}(?::%{POSINT:port})?
# uripath comes loosely from RFC1738, but mostly from what Firefox
# doesn't turn into %XX
URIPATH = (?:/[A-Za-z0-9$.+!*'(){},~:;=@#%_\-]*)+
#URIPARAM = \?(?:[A-Za-z0-9]+(?:=(?:[^&]*))?(?:&(?:[A-Za-z0-9]+(?:=(?:[^&]*))?)?)*)?
URIPARAM = \?[A-Za-z0-9$.+!*'|(){},~@#%&/=:;_?\-\[\]]*
URIPATHPARAM = %{URIPATH}(?:%{URIPARAM})?
URI = %{URIPROTO:protocol}://(?:%{USER:user}(?::[^@]*)?@)?(?:%{URIHOST:host})?(?:%{URIPATHPARAM:path})?

# Months: January, Feb, 3, 03, 12, December
MONTH = \b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\b
MONTHNUM = (?:0?[1-9]|1[0-2])
MONTHNUM2 = (?:0[1-9]|1[0-2])
MONTHDAY = (?:(?:0[1-9])|(?:[12][0-9])|(?:3[01])|[1-9])

# Days: Monday, Tue, Thu, etc...
DAY = (?:Mon(?:_day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:_day)?|Sat(?:urday)?|Sun(?:_day)?)

# Years?
YEAR = (?:\d\d){1,2}
HOUR = (?:2[0123]|[01]?[0-9])
MINUTE = (?:[0-5][0-9])
# '60' is a leap second in most time standards and thus is valid.
SECOND = (?:(?:[0-5]?[0-9]|60)(?:[:.,][0-9]+)?)
MILLISECOND = \d{3}
TIME = %{HOUR:_$hour}:%{MINUTE:_$minute}(?::%{SECOND:_$second})
# datestamp is YYYY/MM/DD-HH:MM:SS.UUUU (or something like it)
DATE_US = %{MONTHNUM:_$month}[/-]%{MONTHDAY:_$day}[/-]%{YEAR:_$year}
DATE_EU = %{MONTHDAY:_$day}[./-]%{MONTHNUM:_$month}[./-]%{YEAR:_$year}
ISO8601_TIMEZONE = (?:Z|[+-]%{HOUR:_$hour}(?::?%{MINUTE:_$minute}))
ISO8601_SECOND = (?:%{SECOND}|60)
TIMESTAMP_ISO8601 = %{YEAR:_$year}-%{MONTHNUM:_$month}-%{MONTHDAY:_$day}[T ]%{HOUR:_$hour}:?%{MINUTE:_$minute}(?::?%{SECOND:_$second})?(?:,%{MILLISECOND:_$millisecond})?%{ISO8601_TIMEZONE:zone}?
DATE = %{DATE_US}|%{DATE_EU}
DATESTAMP = %{DATE:date}[- ]%{TIME:time}
TZ = (?:[PMCE][SD]T|UTC)
DATESTAMP_RFC822 = %{DAY:_$dayname} %{MONTH:_$month} %{MONTHDAY:_$day} %{YEAR:_$year} %{TIME:time} %{TZ:zone}
DATESTAMP_RFC2822 = %{DAY:_$dayname}, %{MONTHDAY:_$day} %{MONTH:_$month} %{YEAR:_$year} %{TIME:time} %{ISO8601_TIMEZONE:zone}
DATESTAMP_OTHER = %{DAY:_$dayname} %{MONTH:_$month} %{MONTHDAY:_$day} %{TIME:time} %{TZ:zone} %{YEAR:_$year}
DATESTAMP_EVENTLOG = %{YEAR:_$year}%{MONTHNUM2:_$month}%{MONTHDAY:_$day}%{HOUR:_$hour}%{MINUTE:_$minute}%{SECOND:_$second}

# Syslog Dates: Month Day HH:MM:SS
SYSLOGTIMESTAMP = (?:%{MONTH:_$month} +%{MONTHDAY:_$day} %{TIME}( %{YEAR:_$year})?|%{TIMESTAMP_ISO8601})
PROG = (?:[\w._/%-]+)
SYSLOGPROG = %{PROG:program}(?:\[%{POSINT:pid}\])?
SYSLOGHOST = %{IPORHOST}
SYSLOGFACILITY = <%{NONNEGINT:syslog_facility}(?:.%{NONNEGINT:syslog_priority})?>
HTTPDATE = %{MONTHDAY}/%{MONTH}/%{YEAR}:%{TIME} %{INT}
SYSLOGPRIORITY = (?:%{WORD}\.)?(?:[0-7]|[Aa]lert|[Cc]ritical|[Ee]rror|[Ww]arning|[Nn]otice|[Ii]nformational|[Dd]ebug)

# FC Original
BSD_SYSLOG_HEADER = %{SYSLOGFACILITY}%{SYSLOGTIMESTAMP:syslog_timestamp}(?: %{SYSLOGPRIORITY:syslog_priority})? %{SYSLOGHOST:syslog_host}(?: %{DATA:process}(?:\[%{INT:process_id}\])?\:)?
BSD_SYSLOG_MSG = %{BSD_SYSLOG_HEADER} %{GREEDYDATA:_$log_entry}

DHCP_INTERFACE = (?:%{IP}|.+?)


# Log formats
SYSLOGBASE = %{SYSLOGTIMESTAMP:timestamp} (?:%{SYSLOGFACILITY} )?%{SYSLOGHOST:logsource} %{SYSLOGPROG}:
COMMONAPACHELOG = %{IPORHOST:clientip} %{USER:ident} %{USER:auth} \[%{HTTPDATE:timestamp}\] \"(?:%{WORD:verb} %{NOTSPACE:request}(?: HTTP/%{NUMBER:httpversion})?|%{DATA:rawrequest})\" %{NUMBER:response} (?:%{NUMBER:bytes}|-)

# Log Levels
LOGLEVEL = ([Aa]lert|ALERT|[Tt]race|TRACE|[Dd]ebug|DEBUG|[Nn]otice|NOTICE|[Ii]nfo|INFO|[Ww]arn?(?:ing)?|WARN?(?:ING)?|[Ee]rr?(?:or)?|ERR?(?:OR)?|[Cc]rit?(?:ical)?|CRIT?(?:ICAL)?|[Ff]atal|FATAL|[Ss]evere|SEVERE|EMERG(?:ENCY)?|[Ee]merg(?:ency)?)

# FC Original
ANYDATESTAMP = %{TIMESTAMP_ISO8601}|%{SYSLOGTIMESTAMP}|%{DATESTAMP_EVENTLOG}|%{DATESTAMP_OTHER}|%{DATESTAMP_RFC2822}|%{DATESTAMP_RFC822}|%{DATESTAMP}

[tests]
# Underscores at the beginning and ending of test strings will be replaced with a single space.

year-1 = 1920
year-2 = 2015
year-3 = 05
year-4 = 99
year-5 = 12

month-1 = 01
month-2 = 11

litmonth-1 = dec
litmonth-2 = december
litmonth-2 = decembrist

anymonth-1 = dec
anymonth-2 = 03

day-1 = 31
day-2 = 29
day-3 = 14
day-4 = 06

usday-1 = 1st
usday-2 = 2nd
usday-3 = 3rd
usday-4 = 21st

hour-1 = 01
hour-2 = 12
hour-3 = 23

minute-1 = 01
minute-2 = 14
# hmmm
minute-3 = 69

zone-1 = UTC
zone-2 = GMT-8
zone-3 = GMT+21
zone-4 = WADT

ampm-1 = am
ampm-2 = pm
ampm-3 = \x{4e0a}\x{5348}

time-1 = 12:14:32
time-2 = 01:02:03 1234,2.4444
time-3 = 01:02:03 1234,2.4444 am GMT

hmtime-1 = 13:52 pm
hmtime-2 = 18:00

dottime-1 = 01.56.33,333 GMT

combdatetime-1 = 20151102-000012 GMT

usdate-1 = 12 31 GMT 15

usdate1-1 = feb 19, 15

usdate2-1 = 11/02/15

isodate-1 = 2015-11-02
isodate-2 = 1975-09-12T

eurodate1-1 = 2nd nov, 2015
eurodate1-2 = 2 nov, 15
eurodate1-3 = 22-01-92

eurodate2-1 = 23.11.05

bareurlitdate-1 = 22||jan||2005

orddate-1 = _01012_

masheddate-1 = 20011014


utcepoch-1 = 1012345678.123456


anydate-1 = 05052001

# more patterns

USERNAME-1 = brendan

USER-1 = dave

INT-1 = -123
INT-2 = +123
INT-3 = 123

BASE10NUM-1 = +123.456
BASE10NUM-2 = +123
BASE10NUM-3 = -123.456
BASE10NUM-4 = -123
BASE10NUM-5 = -.123
BASE10NUM-6 = +.123
BASE10NUM-7 = .123

NUMBER-1 = +123.456

BASE16NUM-1 = +0xAe10
BASE16NUM-2 = Ae10
BASE16NUM-3 = -Ae10

BASE16FLOAT-1 = +0xAF1.01

POSINT-1 = 123

NONNEGINT-1 = 0
NONNEGINT-2 = 10

WORD-1 = foobar

NOTSPACE-1 = ?

SPACE-1 = _  _

DATA-1 = 123ABC
DATA-2 =

GREEDYDATA-1 = 122345


UUID-1 = 12345678-1234-5678-1234-567812345678
UUID-2 = 12345678123456781234567812345678

CISCOMAC-1 = 0123.4567.89ab

WINDOWSMAC-1 = 00-1B-2F-BB-4C-98

COMMONMAC-1 = 01:23:45:67:89:ab

MAC-1 = 0123.4567.89ab
MAC-2 = 00-1B-2F-BB-4C-98
MAC-3 = 01:23:45:67:89:ab

IPV6-1 = FE80:0000:0000:0000:0202:B3FF:FE1E:8329
IPV6-2 = FE80::0202:B3FF:FE1E:8329
IPV6-3 = 2001:db8:a0b:12f0::1
IPV6-4 = 2001:db8::1

IPV4-1 = 172.0.0.1

IP-1 = 2001:db8::1
IP-2 = 172.0.0.1

HOSTNAME-1 = fchq1
HOSTNAME-1 = fchq1.factorchain.com

HOST-1 = images
HOST-2 = images.google.com

IPORHOST-1 = fchq1.factorchain.com
IPORHOST-2 = 2001:db8::1

HOSTPORT-1 = fchq1.factorchain.com:80
HOSTPORT-2 = 172.0.0.1:8080
HOSTPORT-3 = [2001:db8:a0b:12f0::1]:21

```

