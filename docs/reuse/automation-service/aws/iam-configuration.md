### AWS IAM Role-Based Access Guide

To enable AWS IAM Role-based authentication without sharing their Access/Secret keys, follow the steps below.

---

#### Customer-Side Configuration

1. **Create an IAM Role** in AWS account.
2. **Attach Required Policies** to the role depending on the AWS services they want to allow access to (e.g., `AmazonEC2ReadOnlyAccess`, `AWSWAFFullAccess`, etc.).
3. **Update the Trust Policy** to allow your product's AWS account to assume this role.

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
