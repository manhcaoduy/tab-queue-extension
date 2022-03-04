async function moveTabToFirst(tabId) {
    try {
        await chrome.tabs.move(tabId, { index: 0 });
    } catch (error) {
        if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
            setTimeout(() => moveTabToFirst(tabId), 50);
        }
    }
}

async function activatedListener(activeInfo) {
    await moveTabToFirst(activeInfo.tabId);
}

function enableFunction() {
    chrome.tabs.onActivated.addListener(activatedListener);
}

function disableFunction() {
    chrome.tabs.onActivated.removeListener(activatedListener);
}

module.exports = {
    activatedListener,
    enableFunction,
    disableFunction,
}
