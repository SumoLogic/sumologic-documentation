import-module ActiveDirectory

# find forest and domains with AD module
function GetAllDomainsOfCurrentForest() {
	$forest = Get-ADForest
	$domainNameList = @()
	$forest.Domains | foreach {$domainNameList += $_}
	
	$domainList = @()
	$domainNameList | foreach { $domainList += Get-ADDomain $_}
	$domainList
}

# find all domain controllers 
function GetAllDomainControllers {
	$dcList = @()
	GetAllDomainsOfCurrentForest | foreach { $dcListTag=$_.DistinguishedName+"-Name"; $dcList[$_.DistinguishedName] += Get-ADDomainController -Discover -DomainName $_.Name ; $dcLIst[$dcListTag]=$_.NetBIOSName; }
	$dcList
}


# output for sumo 
function PrintAllDomainControllers([bool] $outObject=$false) {
	<#
		.SYNOPSIS
			This function prints out all domain controllers and their IP addresses
		.DESCRIPTION
			This PrintAllDomainControllers prints out all domain controllers and their IP addresses. In case a controller has
		multiple IPs, only one is returned (by nature of the involved cmdlet)
		.Example
			PrintAllDomainControllers 
			Just print out the results to the screen
		.Example
			PrintAllDomainControllers -outObject $true
			Print out the results to the screen, also send down the pipeline
	#>
	$dcList = @{}
	GetAllDomainsOfCurrentForest | foreach { 
		$domainString = "DomainController DName==`""+$_.DistinguishedName+"`" DomainName==`""+$_.Name+"`" Forest==`""+$_.Forest+"`" NetBIOSName==`""+$_.NetBIOSName+"`"";
		Get-ADDomainController -Filter { Name -like "*" } | foreach { $dmControllerString = "ControllerHostName==`""+$_.HostName+"`" IP==`""+$_.IPv4Address + "`" Site==`""+$_.Site+"`"";
			Write-Host $domainString $dmControllerString
			if ($outObject)  {
				$outputString = $domainString+" "+$dmControllerString
				Write-Output $outputString
			}
		}
	}
}

function PrintAllUsers([String] $searchPath,[bool] $outObject=$false, [String[]] $extraProp=@()) {
	<#
		.SYNOPSIS
			This function prints out all users, under a given search base.
		.DESCRIPTION
			This PrintAllUsers prints out all users under a given AD search base.
		.Example
			PrintAllUsers -searchPath "dc=example,dc=com" 
			Print out all users under the domain "example.com" to the screen
		.Example
			PrintAllUsers -searchPath "dc=example,dc=com" -outObject $true
			Print out all users under the domain "example.com" to the screen and send down the pipeline
		.Example
			PrintAllUsers -searchPath "dc=example,dc=com" -outObject $true -extraProp SamAccountName 
			Print out all users under the domain "example.com" and their SamAccountNames to the screen, also send down the pipeline
	#>

	# Use splatting technique here to get extra properties for the underlying cmdlet
	$inputParam = @{
		"filter" ="*"
		"SearchBase" =$searchPath
	}

	# Properties to be printed out
	$outPropStr = "DistinguishedName,Name,ObjectGUID"

	if ($extraProp.count -gt 0) {
		$inputParam["Property"] = $extraProp	
		foreach ($prop in $extraProp) {$outPropStr+= ","+$prop;}
	} 

	$outputString= "User SearchBase==`""+$searchPath+"`""; 
	
	Get-ADUser @inputParam | foreach { 
		$outputString= "User SearchBase==`""+$searchPath+"`""; 
		foreach ($prop in $outPropStr.split(",")) {
			if (($_.$prop.GetType().BaseType.Name -ne "Array") -and 
			    ($_.$prop.GetType().BaseType.Name -ne "CollectionBase")) { 
				$outputString +=" "+$prop+"==`""+ $_.$prop+"`""
			} else {
				$parents = $_.$prop -join ", ";
				$outputString +=" "+$prop+"==`""+ $parents+"`"";
			}
		}
		Write-Host $outputString
		if ($outObject) { Write-Output $outputSTring }
	}

}


function PrintAllComputers {
	<#
		.SYNOPSIS
			This function prints out all computers under a given search base.
		.DESCRIPTION
			This PrintAllComputers prints out all computers under a given AD search base.
		.Example
			PrintAllComputers -searchPath "dc=example,dc=com" 
			Print out all computers under the domain "example.com" to the screen
		.Example
			PrintAllComputers -searchPath "dc=example,dc=com" -outObject $true
			Print out all computers under the domain "example.com" to the screen and send down the pipeline
		.Example
			PrintAllComputers -searchPath "dc=example,dc=com" -outObject $true -extraProp OperatingSystems,IPv4Address
			Print out all computers under the domain "example.com" and their OperatingSystem, IP address information to the screen and send down the pipeline
	#>
	Param ([String] $searchPath,
		[bool] $outObject=$false,
		[String[]] $extraProp=@()
	    )
	# Use splatting technique here to get extra properties for the underlying cmdlet
	$inputParam = @{
		"filter" ="*"
		"SearchBase" =$searchPath
	}
	# Properties to be printed out
	$outPropStr = "DistinguishedName,Name,ObjectGUID,DNSHostName"
	if ($extraProp.count -gt 0) {
		$inputParam["Property"] = $extraProp
		foreach ($prop in $extraProp) { $outPropStr +=","+$prop}
	} 
	
	Get-ADComputer @inputParam | foreach { 
		$outputString= "Computer SearchBase==`""+$searchPath+"`""
		foreach ($prop in $outPropStr.split(",")) {
			if (($_.$prop.GetType().BaseType.Name -ne "Array") -and 
			    ($_.$prop.GetType().BaseType.Name -ne "CollectionBase")) { 
				$outputString +=" "+$prop+"==`""+ $_.$prop+"`""
			} else {
				$parents = $_.$prop -join ", ";
				$outputString +=" "+$prop+"==`""+ $parents+"`"";
			}
		}
		Write-Host $outputString
		if ($outObject) { Write-Output $outputSTring }
		
	}
}

function PrintAllOUs([String] $searchPath,[bool] $outObject=$false, [String[]] $extraProp=@()) {
	<#
		.SYNOPSIS
			This function prints out all organizational units under a given search base.
		.DESCRIPTION
			This PrintAllOUs prints out all organizational units under a given AD search base.
		.Example
			PrintAllOUs -searchPath "dc=example,dc=com" 
			Print out all organizational units under the domain "example.com" to the screen
		.Example
			PrintAllOUs -searchPath "dc=example,dc=com" -outObject $true
			Print out all organizational units under the domain "example.com" to the screen and send down the pipeline
		.Example
			PrintAllOUs -searchPath "dc=example,dc=com" -outObject $true -extraProp ManagedBy
			Print out all organizational units under the domain "example.com" and their manager persons information to the screen, also send down the pipeline
	#>
	# Use splatting technique here to get extra properties for the underlying cmdlet
	$inputParam = @{
		"filter" ="*"
		"SearchBase" =$searchPath
	}

	# Properties to be printed out
	$outPropStr = "DistinguishedName,Name,ObjectGUID"
	if ($extraProp.count -gt 0) {
		$inputParam["Property"] = $extraProp
		foreach ($prop in $extraProp) {	$outPropStr +=","+$prop; }
	} 
	Get-ADOrganizationalUnit @inputParam | foreach { 
		$outputString= "OU SearchBase==`""+$searchPath+"`"";
		foreach ($prop in $outPropStr.split(",")) {
			if (($_.$prop.GetType().BaseType.Name -ne "Array") -and 
			    ($_.$prop.GetType().BaseType.Name -ne "CollectionBase")) { 
				$outputString +=" "+$prop+"==`""+ $_.$prop+"`""
			} else {
				$parents = $_.$prop -join ", ";
				$outputString +=" "+$prop+"==`""+ $parents+"`"";
			}
		}
		Write-Host $outputString
		if ($outObject) { Write-Output $outputSTring }
	}
}

function PrintAllGroups([String] $searchPath, [String] $groupType,[bool] $outObject=$false, [String[]] $extraProp=@()) {
	<#
		.SYNOPSIS
			This function prints out all groups under a given search base.
		.DESCRIPTION
			This PrintAllGroups prints out all organizational units under a given AD search base.
		.Example
			PrintAllGroups -searchPath "dc=example,dc=com" 
			Print out all groups under the domain "example.com" to the screen
		.Example
			PrintAllGroups -searchPath "dc=example,dc=com" -outObject $true
			Print out all groups under the domain "example.com" to the screen and send down the pipeline
		.Example
			PrintAllGroups -searchPath "dc=example,dc=com" -outObject $true -extraProp GroupScope
			Print out all groups under the domain "example.com" and their scope information to the screen and send down the pipeline
		.Example
			PrintAllGroups -searchPath "dc=example,dc=com" -groupType Security -outObject $true -extraProp GroupScope
			Print out all security groups under the domain "example.com" and their scope information to the screen, also send down the pipeline
	#>
	# Use splatting technique here to get extra properties for the underlying cmdlet
	$inputParam = @{
		"filter" ="*"
		"SearchBase" =$searchPath
	}

	# Properties to be printed out
	$outPropStr = "DistinguishedName,Name,ObjectGUID"
	
	if ($extraProp.count -gt 0) {
		$inputParam["Property"] = $extraProp
		foreach ($prop in $extraProp) { $outPropStr +=","+$prop}
	} 

	if ($groupType -eq "")  { 
		$filterString ="*"
	} else {
		$filterString = "GroupCategory -eq `"$groupType`""
	}
	Get-ADGroup @inputParam | foreach { 
		$outputString= "Group SearchBase==`""+$searchPath+"`""
		foreach ($prop in $outPropStr.split(",")) { 
			if (($_.$prop.GetType().BaseType.Name -ne "Array") -and 
			    ($_.$prop.GetType().BaseType.Name -ne "CollectionBase")) { 
				$outputString +=" "+$prop+"==`""+ $_.$prop+"`""
			} else {
				$parents = $_.$prop -join ", ";
				$outputString +=" "+$prop+"==`""+ $parents+"`"";
			}	
		}
		Write-Host $outputString
		if ($outObject) { Write-Output $outputSTring }
	}
}

function PrintAllGroupMembership([String] $searchPath, [String] $groupType,[bool] $outObject=$false, [String[]] $extraProp=@()) {
	<#
		.SYNOPSIS
			This function prints out all groups under a given search base.
		.DESCRIPTION
			This PrintAllGroupMembership prints out all organizational units under a given AD search base.
		.Example
			PrintAllGroupMembership -searchPath "dc=example,dc=com" 
			Print out all groups under the domain "example.com" to the screen
		.Example
			PrintAllGroupMembership -searchPath "dc=example,dc=com" -outObject $true
			Print out all group relationships under the domain "example.com" to the screen and send down the pipeline
		.Example
			PrintAllGroupMembership -searchPath "dc=example,dc=com" -outObject $true -extraProp GroupScope
			Print out all groups relationships under the domain "example.com" and their scope information to the screen and send down the pipeline
		.Example
			PrintAllGroupMembership -searchPath "dc=example,dc=com" -groupType Security -outObject $true -extraProp GroupScope
			Print out all security groups relationships under the domain "example.com" and their scope information to the screen, also send down the pipeline
	#>
	# Use splatting technique here to get extra properties for the underlying cmdlet
	$inputParam = @{
		"filter" ="*"
		"SearchBase" =$searchPath		
	}

	# Properties to be printed out
	$outPropStr = "DistinguishedName,Name,ObjectGUID"
	
	if ($extraProp.count -gt 0) {
		if ($extraProp[-1] -ne "Members") { $extraProp += "Members"}
	} else {
		$extraProp += "Members"
	}

	$inputParam["Property"] = $extraProp
	foreach ($prop in $extraProp) { $outPropStr +=","+$prop}
	
	if ($groupType -eq "")  { 
		$filterString ="*"
	} else {
		$filterString = "GroupCategory -eq `"$groupType`""
	}

	Get-ADGroup @inputParam | foreach { 
		$outputString= "GroupMembership SearchBase==`""+$searchPath+"`""	
		foreach ($prop in $outPropStr.split(",")) { 
			if ($prop -ne "Members") {$outputString +=" "+$prop+"==`""+ $_.$prop+"`"" }
		}
		# Now print out members
		$memberList = $_.Members -split ", "
		if ($memberList[0].length -gt 0) {
			foreach ($member in $memberList) {	
				$outputStringAll = $outputSTring+" Child==`""+$member+"`""
				Write-Host $outputStringAll
				if ($outObject) { Write-Output $outputSTringAll }
			}
		}
	}
}

function PrintAllUserMembership([String] $searchPath,[bool] $outObject=$false, [String[]] $extraProp=@()) {
	<#
		.SYNOPSIS
			This function prints out all users, under a given search base.
		.DESCRIPTION
			This PrintAllUserMembership prints out all users and their parent groups or OUs under a given AD search base.
		.Example
			PrintAllUserMembership -searchPath "dc=example,dc=com" 
			Print out all users and their parent groups or OUs  under the domain "example.com" to the screen
		.Example
			PrintAllUserMembership -searchPath "dc=example,dc=com" -outObject $true
			Print out all users and their parent groups or OUs under the domain "example.com" to the screen and send down the pipeline
		.Example
			PrintAllUserMembership -searchPath "dc=example,dc=com" -outObject $true -extraProp SamAccountName 
			Print out all users and their parent groups or OUs under the domain "example.com" and their SamAccountNames to the screen, also send down the pipeline
	#>
	# Use splatting technique here to get extra properties for the underlying cmdlet
	$inputParam = @{
		"filter" ="*"
		"SearchBase" =$searchPath
	}

	# Properties to be printed out
	$outPropStr = "DistinguishedName,Name,ObjectGUID"

	if ($extraProp.count -gt 0) {
		if ($extraProp[-1] -ne "MemberOf") { $extraProp += "MemberOf"}
	} else {
		$extraProp += "MemberOf"
	}

	$inputParam["Property"] = $extraProp	
	foreach ($prop in $extraProp) {$outPropStr+= ","+$prop;}
	 
	Get-ADUser @inputParam | foreach { 
		$outputString= "UserMembership SearchBase==`""+$searchPath+"`""; 
		foreach ($prop in $outPropStr.split(",")) {
			if ($prop -ne "MemberOf") {$outputString +=" "+$prop+"==`""+ $_.$prop+"`"" }
		}
		# Now print out members
		$memberList = $_.MemberOf -split ", "
		if ($memberList[0].length -gt 0) {
			foreach ($member in $memberList) {
				$outputStringAll = $outputSTring+" Parent==`""+$member+"`""	
				Write-Host $outputStringAll
				if ($outObject) { Write-Output $outputSTringAll }
			}
		}
	}
}

#$siteArr=getSites


#$domainArr=getDomains

## Example: 
#PrintAllGroups -searchPath "DC=peaksum,dc=org" -groupType "Security"
#PrintAllUsers -searchPath "DC=peaksum,dc=org"
#PrintAllComputers -searchPath "DC=peaksum,dc=org"
#PrintAllOUs -searchPath "DC=peaksum,dc=org"
#Get-ADForest | foreach {$arr+=$_.Sites}
