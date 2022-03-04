chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let result = {}
        if (request.type === "enable") {
            enableFunction();
            sendResponse(result);
        }

        if (request.type === "disable") {
            disableFunction();
            sendResponse(result);
        }

        if (request.type === "getEnableKey") {
            getEnableKey().then(value => {
                result = {
                    "isEnable": value,
                }
                sendResponse(result);
            });

        }
        return true
    }
);

function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            const storageCache = {}
            Object.assign(storageCache, items);
            resolve(storageCache);
        });
    });
}

async function getEnableKey() {
    const storageCache = await getAllStorageSyncData().catch(err => {
        console.error(`error when init storage cache: ${err}`);
    });
    let isEnable;
    if (typeof storageCache.isEnableKey === "undefined") {
        isEnable = true;
        chrome.storage.sync.set({"isEnableKey": true}, function () {
            console.log("Initialize isEnableKey to true");
        });
    } else {
        isEnable = storageCache.isEnableKey;
    }
    return isEnable
}

function enableFunction() {
    chrome.storage.sync.set({"isEnableKey": true}, function () {
        console.log("Initialize isEnableKey to true");
    });
    chrome.tabs.onActivated.addListener(activatedListener);
}

function disableFunction() {
    chrome.storage.sync.set({"isEnableKey": false}, function () {
        console.log("Initialize isEnableKey to false");
    });
    chrome.tabs.onActivated.removeListener(activatedListener);
}

async function moveTabToFirst(tabId) {
    try {
        await chrome.tabs.move(tabId, { index: 0 });
        console.log(`Success move tabId ${tabId}`);
    } catch (error) {
        if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
            setTimeout(() => moveTabToFirst(tabId), 50);
        }
    }
}

async function activatedListener(activeInfo) {
    await moveTabToFirst(activeInfo.tabId);
}

async function initEnableStatus() {
    try {
        let isEnable = await getEnableKey();
        if (isEnable === true) {
            chrome.tabs.onActivated.addListener(activatedListener);
        }
    }  catch (e) {
        // Handle error that occurred during storage initialization.
        console.log(`error when initialize popup logic file: ${e}`);
    }
}

initEnableStatus()