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

async function getEnabledKey() {
    getAllStorageSyncData().then(storageCache => {
        let isEnable;
        if (typeof storageCache.isEnableKey === "undefined") {
            isEnable = true;
            chrome.storage.sync.set({isEnableKey: true}, function () {
                console.log("Initialize isEnableKey failed");
            });
        } else {
            isEnable = storageCache.isEnableKey;
        }
        return isEnable
    });
}

module.exports = {
    getAllStorageSyncData,
    getEnabledKey
}