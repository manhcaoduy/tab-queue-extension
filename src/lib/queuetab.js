async function moveTabToFirst(tabId) {
    try {
        await chrome.tabs.move(tabId, { index: 0 });
        console.log(`Success move tabId ${tabId}`);
    } catch (error) {
        if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
            setTimeout(() => move(tabId), 50);
        }
    }
}

async function activatedListener(activeInfo) {
    await moveTabToFirst(activeInfo.tabId);
}

module.exports = {
    activatedListener,
}
