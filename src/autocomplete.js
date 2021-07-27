const { listAlertRulesByParams, parseAutocomplete, getCreds } = require('./helpers');
const armSubscriptions = require("@azure/arm-subscriptions");
const armResource = require("@azure/arm-resources");

// helpers

function autoMapper(params){
    const mapped = {};
    if (params && params.length > 0) {
        params.forEach(param=>{
            mapped[param.name] = param.value;
        })
    }
    return mapped;
}

function filterByQuery(items, query){
    if (!query) return items;
    const keyWords = query.trim().toLowerCase().split(" ");
    return items.filter(item => keyWords.every(keyWord => item.id.toLowerCase().includes(keyWord) || 
                                                          item.value.toLowerCase().includes(keyWord)));
}

// main methods

async function getAlertRules(query, pluginSettings, actionParams){
    const params = autoMapper(actionParams), settings = autoMapper(pluginSettings);
    let alertRules = await listAlertRulesByParams(params, settings);
    alertRules = alertRules.map(alertRule => ({id: alertRule.name, value: alertRule.name}));
    return filterByQuery(alertRules, query);
}

async function getSubscriptions(query, pluginSettings, actionParams){
    const settings = autoMapper(pluginSettings);
    const subClient = new armSubscriptions.SubscriptionClient(await getCreds(settings));
    let subs = await subClient.subscriptions.list();
    subs = subs.map(sub => ({id: sub.subscriptionId, value: sub.displayName ? sub.displayName : sub.subscriptionId}));
    return filterByQuery(subs, query);
}

async function getResourceGroups(query, pluginSettings, actionParams){
    const params = autoMapper(actionParams), settings = autoMapper(pluginSettings);
    const subscriptionId = parseAutocomplete(params.subscription) || settings.subscriptionId;
    const resourceClient = new armResource.ResourceManagementClient(await getCreds(settings), subscriptionId);
    let resourceGroups = await resourceClient.resourceGroups.list();
    resourceGroups = resourceGroups.map(group => ({id: group.name, value: group.name}));
    return filterByQuery(resourceGroups, query);
}

module.exports = { 
    getAlertRules, 
    getSubscriptions, 
    getResourceGroups
}