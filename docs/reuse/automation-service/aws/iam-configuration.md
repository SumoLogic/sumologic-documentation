### AWS IAM Role-Based Access Guide

To enable AWS IAM Role-based authentication without sharing Access/Secret keys, follow the steps below.

---

#### User-Side Configuration

1. **[Create an IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html)** in your AWS account.
   Follow AWS’s guide to create a new IAM role that other accounts (such as Sumo Logic’s) can assume.
2. **[Attach Required Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html)** to the role depending on the AWS services you want to allow access to (e.g., `AmazonEC2ReadOnlyAccess`, `AWSWAFFullAccess`, etc.).
3. **[Update the Trust Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-custom.html)** to allow Sumo Logic’s AWS account to assume this role.
   This involves editing the trust relationship JSON to include Sumo’s AWS account ID as a trusted principal.

   Example Trust Policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": "arn:aws:iam::<sumo-account-id>:root"
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
  ```