import {getEnabledKey} from "../lib/getStorage";
import {activatedListener} from "../lib/queuetab";

async function initEnabledStatus() {
    try {
        let isEnable = false
        getEnabledKey().then(value => {
            isEnable = value;
        })
        if (isEnable === true) {
            chrome.tabs.onActivated.addListener(activatedListener);
        }
    }  catch (e) {
        // Handle error that occurred during storage initialization.
        console.log(`error when initialize popup logic file: ${e}`);
    }
}

initEnabledStatus()