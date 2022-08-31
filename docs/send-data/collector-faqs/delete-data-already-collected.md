---
id: delete-data-already-collected
title: Delete data already collected to Sumo Logic
---

## Question:

Is it possible to delete data already collected into Sumo Logic? I've ingested some private information into my Sumo Logic account by mistake and I want to remove it so that search results don't show this data. Is this possible?

## Answer:

It is not possible for users to delete specific message data already ingested into Sumo Logic. All data sent to Sumo Logic is indexed together and stored in a Write Once Read Many (WORM) storage, which you cannot modify. You may request data be deleted from your account. If you have Views and Partitions set up, Sumo Logic can delete data from that specific View or Partition. Otherwise, the deletion will cover ALL data delivered into the account within a specified time range. Any request for data deletion should be sent to [Sumo Logic Support](mailto:support@sumologic.com) through your account administrator.

An alternative to requesting Sumo Logic to delete your message data is to create Role filters that will hide the unwanted data so it is not searchable within the account. To do this, you can apply a role filter query string matching this data to the user roles for whom the unwanted data should not be visible.

It is also important to note that deleting data has no effect on the log ingestion rate that is displayed on the Accounts Page. Once data has been received by Sumo Logic it is counted against your account limits. However, on-demand charges are based on a daily average across the entire billing cycle and most daily spikes can be absorbed over a billing period. 
