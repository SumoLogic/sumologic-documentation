For Windows systems, the collected log files should be accessible by the SYSTEM group. Use the following set of PowerShell commands if the SYSTEM group does not have access.
		
```
$NewAcl = Get-Acl -Path "<PATH_TO_LOG_FILE>"
# Set properties
$identity = "NT AUTHORITY\SYSTEM"
$fileSystemRights = "ReadAndExecute"
$type = "Allow"
# Create a new rule
$fileSystemAccessRuleArgumentList = $identity, $fileSystemRights, $$fileSystemAccessRule = New-Object -TypeName System.Security.AccessControl.FileSystemAccessRule -ArgumentList $fileSystemAccessRuleArgumentList
# Apply new rule
$NewAcl.SetAccessRule($fileSystemAccessRule)
Set-Acl -Path "<PATH_TO_LOG_FILE>" -AclObject $NewAcl
```
