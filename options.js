document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const saveButton = document.getElementById('saveButton');

    // Load saved font option
    chrome.storage.sync.get(['selectedFont'], (result) => {
        if (result.selectedFont) {
            fontSelect.value = result.selectedFont;
        }
    });

    // Save font option
    saveButton.addEventListener('click', () => {
        const selectedFont = fontSelect.value;
        chrome.storage.sync.set({ selectedFont }, () => {
            alert('Font choice saved!');
        });
    });
});
