
// when a tab updates, query
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.get(tabId, function(tab) {
        if (tab.status == 'complete') {
            console.log("complete updated ", tab.url)
        }
    })
});

// when a tab listens, query
chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        console.log("active", tab.url);
    })
});