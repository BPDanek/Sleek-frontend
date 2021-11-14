console.log("content")
chrome.tabs.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("content", request)
    }
);