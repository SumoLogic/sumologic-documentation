---
id: close-cancel-sumo-account
---

# Close or Cancel a Sumo Logic Account

This topic covers how to delete your organization from a Sumo Logic Free or Trial account and permanently close the account. It also provides instructions for cancelling a Sumo Logic licensed account. 

## Close a Sumo Logic Free or Trial account

The owner of a Sumo Logic Free or Trial account can delete their organization from Sumo Logic, which will close the account permanently. When you delete your organization, you delete all users and data from Sumo Logic, close the account, and log yourself out as a user.

:::important
This task deletes your Sumo Logic Organization, all users and data. **This action cannot be undone.** 
:::

To delete a Sumo Logic organization and close the account:

1. In the Sumo Logic left navigation bar, go to **Administration \> Account**.
1. At the bottom of the page, under the section **Delete this Organization from Sumo Logic?**, click **Delete Org**.
1. In the dialog **Delete This Organization from Sumo Logic?**, enter **DELETE** to confirm.
1. Click **Delete Org**.

The Sumo Logic Organization, all users and data are deleted.

:::note
If you have a self service trial account, at the end of the trial, typically 30 days, if you do not upgrade to a paid subscription, your account reverts to a free plan. 
:::

## Internal Only Information

Deleting the data from an account is two-step process:

1. **Mark the data to be deleted.** Once marked, the data cannot be searched. Data is marked to be deleted within one hour after the Org is disabled.
1. **Physically delete the data.** There is no hard guarantee for this, but StorageGC does not lag by more than few hours. 

## Cancel a Sumo Logic licensed account

If you'd like to cancel your organization's Sumo Logic account, please open a ticket with [Sumo Logic Support.](https://support.sumologic.com/hc/en-us/requests/news) Our Support Team will process your request in a timely manner.
