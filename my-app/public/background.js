
// keep a local version of the data
let deals = []

// when the popup script renders it will update our local storage of deal urls
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        deals = request.data
        sendResponse(200) // not sure if this is the thing we need here, but some response seems prudent

        console.log(request.data)
    }
);

// when a tab updates, query the list of sites which have deals for a match
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.get(tabId, function(tab) {
        if (tab.status == 'complete') {

            // would have to run the whole loop each time, with a traditional for loop we return early
            // dealUrls.map(dealUrl => {tab.url.includes(dealUrl) ? true : false})

            for (let dealIndex = 0; dealIndex < deals.length; dealIndex++) {
                const dealDomains = deals[dealIndex].retailer_domains
                for (let dealDomainIndex = 0; dealDomainIndex < dealDomains.length; dealDomainIndex++) {
                    if (tab.url.includes(dealDomains[dealDomainIndex])) {

                        // open the popup
                        chrome.runtime.sendMessage({dealData: deals[dealIndex], source: "updates"});
                        console.log("its a match!", dealDomains[dealDomainIndex])
                    }
                }
            }
        }
    })
});

// when a tab listens, query the list of sites which have deals for a match
chrome.tabs.onActivated.addListener(function(activeInfo) {
    // how to fetch tab url using activeInfo.tabid
    chrome.tabs.get(activeInfo.tabId, function (tab) {

        for (let dealIndex = 0; dealIndex < deals.length; dealIndex++) {
            const dealDomains = deals[dealIndex].retailer_domains
            for (let dealDomainIndex = 0; dealDomainIndex < dealDomains.length; dealDomainIndex++) {
                if (tab.url.includes(dealDomains[dealDomainIndex])) {

                    // open the popup
                    chrome.runtime.sendMessage({dealData: deals[dealIndex], source: "activty"});
                    console.log("its a match!", dealDomains[dealDomainIndex])
                }
            }
        }
    })
});