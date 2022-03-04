let enableButton = document.getElementById("enable");

async function init() {
    try {
        chrome.runtime.sendMessage({type: "getEnableKey"}, function(response) {
            if (response.isEnable === true) {
                enableButton.checked = true;
            } else {
                enableButton.checked = false;
            }
        });
        enableButton.addEventListener('change', e => {
            if (e.target.checked) {
                chrome.runtime.sendMessage({type: "enable"}, function(response) {});
            } else {
                chrome.runtime.sendMessage({type: "disable"}, function(response) {});
            }
        });
    }  catch (e) {
        // Handle error that occurred during storage initialization.
        console.log(`error when initialize popup logic file: ${e}`);
    }
}

init()
