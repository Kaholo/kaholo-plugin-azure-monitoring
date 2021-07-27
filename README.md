# kaholo-plugin-azure-monitoring
Kaholo plugin for integration with Azure Monitoring Service.

## Settings
1. Client or App ID (String) **Required**
2. Secret or Password (Vault) **Required**
3. Domain or Tenant ID (String) **Required**
4. Subscription ID (String) **Required** 

## Method: List Alert Rules
List alert rules.

### Parameters
1. Subscription (Autocomplete) **Optional** - If specified, show resource groups only from the selected subscription.
2. Resource Group (Autocomplete) **Optional** - If specified, list alert rules only on the selected resource group.

## Method: List Alert Rule Status
Get the status over time of the specified alert rule.

### Parameters
1. Subscription (Autocomplete) **Optional** - If specified, show resource groups only from the selected subscription.
2. Resource Group (Autocomplete) **Required** - The resource group of the alert rule.
3. Alert Rule (Autocomplete) **Required** - The alert rule to get back it's status data.
