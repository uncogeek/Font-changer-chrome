let isActive = false;

chrome.action.onClicked.addListener((tab) => {
    isActive = !isActive;
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });

    // Change the extension icon
    const newIconPath = isActive ? 'icons/icon_active.png' : 'icons/icon.png';
    chrome.action.setIcon({ path: newIconPath, tabId: tab.id });
});
