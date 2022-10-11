###########################################################
# Parameters for main work horse scripts
###########################################################
$SCRIPTPATH = "C:\PSScripts"
. $SCRIPTPATH\adQueryDS.ps1

$domain = Get-AdDomain
$domain = $domain.DistinguishedName

###########################################################
# Main scripts
###########################################################

PrintAllUsers -searchPath $domain -extraProp SamAccountName,MemberOf 

PrintAllGroups -searchPath $domain  -extraProp GroupCategory,Members 

PrintAllComputers -searchPath $domain -extraProp OperatingSystem,IPv4Address

PrintAllOUs -searchPath $domain 

PrintAllGroupMembership -searchPath $domain  

PrintAllUserMembership -searchPath $domain  
