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

PrintAllDomainControllers 
