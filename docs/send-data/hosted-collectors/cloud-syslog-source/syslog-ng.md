---
id: syslog-ng
title: syslog-ng
description: Learn how to configure your server to send syslog data with syslog-ng.
---



Sumo Logic supports syslog clients such as syslog-ng. This document has instructions on how to configure your server to send syslog data. If syslog data does not appear in Sumo Logic, refer to the Troubleshooting section in [Cloud Syslog Source](/docs/send-data/hosted-collectors/cloud-syslog-source).

## Set up TLS

Set up Transport Layer Security (TLS). 

Download the DigiCert and AWS Certificate Manager (ACM) certificates from https://cacerts.digicert.com/DigiCertHighAssuranceEVRootCA.crt and 
https://www.amazontrust.com/repository/AmazonRootCA1.cer. 

### syslog-ng

For syslog-ng, place both certificates in the configuration directory, allowing the syslog-ng client to automatically select the appropriate certificate.

To set up your DigiCert and AWS Certificate Manager (AWS) certificates, follow these steps:

1. Check if you have the directory `/etc/syslog-ng/ca.d`.
1. If you don’t, create it with this command:
    ```bash
    $ sudo mkdir -pv /etc/syslog-ng/ca.d
    ```
1. Then run:
    ```bash
    $ cd /etc/syslog-ng/ca.d
    $ sudo wget -O digicert_ca.der https://www.digicert.com/CACerts/DigiCertHighAssuranceEVRootCA.crt
    $ sudo openssl x509 -inform der -in digicert_ca.der -out digicert_ca.crt
    $ sudo ln -s digicert_ca.crt `openssl x509 -noout -hash -in digicert_ca.crt`.0
    $ wget -O acm_ca.der https://www.amazontrust.com/repository/AmazonRootCA1.cer
    $ openssl x509 -inform der -in acm_ca.der -out acm_ca.crt
    $ ln -s acm_ca.crt `openssl x509 -noout -hash -in acm_ca.crt`.0
    $ sudo /etc/init.d/syslog-ng restart
    ```

### Send data to a Cloud Syslog Source with syslog-ng

If you are new to syslog-ng, follow this [link to install syslog-ng](/docs/send-data/hosted-collectors/cloud-syslog-source/install-syslog-ng). 

This section shows how to configure a syslog client using syslog-ng that will send the syslog message to be received by the Sumo Logic cloud syslog service. You must specify a template, a destination, and a source.

Edit the syslog-ng config file:  

```bash
$ sudo vim /etc/syslog-ng/syslog-ng.conf
```

Define a template with the correct format for Sumo Logic. Messages must be in this format to be accepted, and the ordering of the $ fields must be as shown.

```bash
template t_sumo_syslog {
    template("<$PRI>1 $ISODATE $HOST $PROGRAM $PID $MSGID [E5kTyaEcth45/DU81M236oU4vM8j1ZaqTpWgjXB6lod7cFTeq09zzMn5ErmM0O/3@41123] $MSG\n"); template_escape(no);
 };
```

Replace the sample token, `E5kTyaEcth45/DU81M236oU4vM8j1ZaqTpWgjXB6lod7cFTeq09zzMn5ErmM0O/3@41123,`  with your token.

Define a destination to use the Sumo Logic endpoint. The following TCP destination option example specifies the endpoint (`syslog.collection.YOUR_DEPLOYMENT.sumologic.com`) and TCP TLS port 651. It also includes the ca-dir for your CA certificate. Finally, it specifies that only trusted certificates will be accepted for connectivity to the remote endpoint.

```bash
destination d_sumo_tls {
    syslog("syslog.collection.YOUR_DEPLOYMENT.sumologic.com"
        port("6514")
        template(t_sumo_syslog)
        transport(tls)
        tls(
            ca-dir("/etc/syslog-ng/ca.d")
            peer_verify("required-trusted")
        )
    );
};
```

If you choose to use the syslog destination option, the following example applies. For reference, see [syslog destination options](https://www.syslog-ng.com/technical-documents/doc/syslog-ng-open-source-edition/3.18/administration-guide/47#TOPIC-1044061) in the syslog-ng open source documentation. You must include the token in
the message body instead of in the structured data field for the syslog destination.

```bash
destination d_sumo_tls {
    syslog("syslog.collection.YOUR_DEPLOYMENT.sumologic.com"
        port("6514")
        template(t_sumo_syslog)
        transport(tls)
        tls(
            ca-dir("/etc/syslog-ng/ca.d")
            peer_verify("required-trusted")
        )
    );
};
```

Specify which logs will be sent to the Sumo Logic destination. This example specifies an existing syslog-ng source (`s_sys`), applies a syslog-ng filter (`f_default`), and specifies the use of the Sumo Logic endpoint (`d_sumo_tls`).

```bash
log {
    source(s_sys);
    filter(f_default);
    destination(d_sumo_tls);
};
```

Once you are done with syslog-ng.conf file update, restart the syslog-ng server:  

```bash
$ sudo /etc/init.d/syslog-ng restart
```

Check the status of the syslog-ng server after it restarts. All of the following commands should return success messages.
   
```bash
$ service syslog-ng status
$ systemctl status syslog-ng.service
$ journalctl -xe
```

## Troubleshooting

If you receive errors while restarting the syslog-ng server you can troubleshoot by viewing logs at **/var/log/syslog**.

```bash
$ tail /var/log/syslog
```

or   

```bash
$ vi /var/log/syslog
```
