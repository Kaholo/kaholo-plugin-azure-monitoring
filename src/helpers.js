const armMonitor = require("@azure/arm-monitor");
const msRest = require('@azure/ms-rest-nodeauth');

/**
 * @param {*} settings 
 * @returns {Promise<msRest.ApplicationTokenCredentials>} Azure Monitor Client
 */
async function getCreds(settings){
	if (!settings.clientId || !settings.secret || !settings.domain){
		throw "Not all settings were provided!";
	}
	return msRest.loginWithServicePrincipalSecret(settings.clientId, settings.secret, settings.domain);
}

/**
 * Internal function for handling authentication and generation of compute mamagement client
 * @param {*} settings 
 * @param {*} params 
 * @returns {Promise<armMonitor.MonitorManagementClient>} Azure Monitor Client
 */
async function getMonitorClient(settings, params){
	const subscriptionId = parseAutocomplete(params.subscription) || settings.subscriptionId;
	if (!subscriptionId){
		throw "Subscription ID was not provided!";
	}
	return new armMonitor.MonitorManagementClient(await getCreds(settings), subscriptionId);
}

async function listAlertRulesByParams(params, settings){
	const monitorClient = getMonitorClient(settings, params);
	const resourceGroup = parseAutocomplete(params.resourceGroup);
	if (resourceGroup) return monitorClient.metricAlerts.listByResourceGroup(resourceGroup);
	return monitorClient.metricAlerts.listBySubscription();
}

async function parseAutocomplete(param){
	return param.id ? param.id : param;
}

module.exports = {
	getMonitorClient,
	listAlertRulesByParams,
	parseAutocomplete,
	getCreds
}

