import { move } from '../queuetab/queuetab';

const isEnableKey = "isEnabled";

let enableButton = document.getElementById("enable");

// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.
function getAllStorageSyncData() {
    // Immediately return a promise and start asynchronous work
    return new Promise((resolve, reject) => {
        // Asynchronously fetch all data from storage.sync.
        chrome.storage.sync.get(null, (items) => {
            // Pass any observed errors down the promise chain.
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            // Pass the data retrieved from storage down the promise chain.
            resolve(items);
        });
    });
}

// Where we will expose all the data we retrieve from storage.sync.
const storageCache = {};
// Asynchronously retrieve data from storage.sync, then cache it.
const initStorageCache = getAllStorageSyncData().then(items => {
    // Copy the data retrieved from storage into storageCache.
    Object.assign(storageCache, items);
    let isEnable;
    if (typeof storageCache.isEnableKey === "undefined") {
        isEnable = false;
        chrome.storage.sync.set({ isEnableKey: false }, function() {
            console.log("Initialize isEnableKey false");
        });
    } else {
        isEnable = storageCache.isEnableKey;
    }

    if (isEnable === true) {
        chrome.tabs.onActivated.addListener(activeInfo => move(activeInfo));
        enableButton.checked = true;
    } else {
        enableButton.checked = false;
    }
});

chrome.action.onClicked.addListener(async(tab) => {
    try {
        await initStorageCache;
    } catch (e) {
        // Handle error that occurred during storage initialization.
        console.log(`error when init storage cache: ${e}`);
    }
});

enableButton.addEventListener('change', e => {
    if (e.target.checked) {
        chrome.storage.sync.set({ isEnableKey: true }, function() {
            console.log("Enable!");
        });
        chrome.tabs.onActivated.addListener(activeInfo => move(activeInfo));
    } else {
        chrome.storage.sync.set({ isEnableKey: false }, function() {
            console.log("Disable!");
        });
        // chrome.tabs.onActivated.removeListener();
    }
});