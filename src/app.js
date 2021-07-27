const {getMonitorClient, listAlertRulesByParams, parseAutocomplete} = require("./helpers");

async function listAlertRules(action, settings){
	return listAlertRulesByParams(action.params, settings);
}

async function listAlertRuleStatus(action, settings){
	const monitorClient = getMonitorClient(settings, action.params);
	const resourceGroup = parseAutocomplete(action.params.resourceGroup);
	const alertRule = parseAutocomplete(action.params.alertRule);
	return monitorClient.metricAlertsStatus.list(resourceGroup, alertRule);
}

module.exports = {
	listAlertRules,
	listAlertRuleStatus,
	...require("./autocomplete")
}

