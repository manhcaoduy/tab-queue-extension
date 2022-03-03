import {getEnabledKey} from '../lib/getStorage';

let enableButton = document.getElementById("enable");

async function init() {
    try {
        let isEnable = false
        getEnabledKey().then(value => {
            isEnable = value;
        })
        if (isEnable === true) {
            enableButton.checked = true;
        } else {
            enableButton.checked = false;
        }
    }  catch (e) {
        // Handle error that occurred during storage initialization.
        console.log(`error when initialize popup logic file: ${e}`);
    }
}

init()
