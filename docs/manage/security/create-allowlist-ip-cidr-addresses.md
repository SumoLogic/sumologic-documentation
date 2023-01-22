---
id: create-allowlist-ip-cidr-addresses
title: Create an Allowlist for IP or CIDR Addresses
description: Service Allowlist Settings let you explicitly grant access to specific IP or CIDR addresses.
---

Service Allowlist Settings allow you to explicitly grant access to specific IP addresses and/or CIDR notations for logins, APIs, and dashboard access.

Once the feature is enabled, the IP address or [CIDR](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) of each user in an account must be added to the allowlist in order to log in to Sumo Logic UI or make any requests via the Sumo Logic APIs. The allowlist does not cover the Collector IP (Server IP) to connect to Sumo Logic.

You can also share dashboards with users connecting from IP addresses or CIDRs in this allowlist. That way they can see the dashboard without logging in, but the dashboard remains private to your allowlist. The public cannot see it.

Allowlist settings take effect after users have logged out of their Sumo Logic accounts. If a user is logged in when you make the allow setting, they will stay logged in. Any IP or CIDR addresses must be associated with your company in order to add them to the allow. Wildcards are not supported; don't use them to specify an IP or CIDR address range.

:::note
The IP is generally your host IP address. But if your request is coming through a proxy, an x-forwarded-for header is included in the HTTP requests to Sumo Logic, which is used as the IP when evaluating the allowlist.
:::

## Enable allowlist for login and APIs

1. Go to **Administration > Security**.
1. Select the **Service Allowlist Settings** tab.
1. Under** Service Allowlist Settings**, select the **Enable Login / API Allowlist** check box.

    ![service-allow-list-1.png](/img/security/service-allow-list-1.png)

1. Copy and paste your entry into the **IP Address or CIDR** text box, a **Description** is optional, then click **Add**.
1. Type additional IP and/or CIDR addresses in the text box, and click **Add**. Repeat this step until you've added all the addresses you'd like to add to the allowlist.
1. Click **Save**.

## Enable dashboard allowlist

1. Go to **Administration > Security**.
1. Select the **Service Allowlist Settings** tab.
1. Under** Service Allowlist Settings**, select the **Enable Dashboard Allowlist** check box.

    ![service-allow-list-2.png](/img/security/service-allow-list-2.png)

1. Copy and paste your IP address in the **IP Address or CIDR** text box, a **Description** is optional, then click **Add**.
1. Type additional IP and/or CIDR addresses in the text box, and click **Add**. Repeat this step until you've added all the addresses you'd like to allowlist.
vClick **Save**.

### Disable allowlist settings

1. Go to **Administration > Security**.
1. Select the **Service Allowlist Settings** tab.
1. Under **Service Allowlist Settings**, deselect **Enable Login / API Allowlist** or **Enable Dashboard Allowlist** or both options.
1. Click **Save**. You will be prompted to confirm that you want to disable your allowlist settings.
1. Click **OK**.

### Edit allowlisted addresses

After an IP or CIDR address has been allowlisted you can edit the address. Note that any edits are immediately put into effect.

1. Click an address, then make any edits in the text box.
1. Click **Update**.
1. Click **Save**.

Changes are applied immediately.

### Delete an allowlisted address

After an IP or CIDR address has been allowlisted you delete the address. Deletions are immediate and cannot be undone.

1. Hover over the address you want to delete.
1. Click **x**. You'll see a confirmation notice that your address has been removed.
