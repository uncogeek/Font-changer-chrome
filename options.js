document.addEventListener('DOMContentLoaded', () => {
    const fontSelect = document.getElementById('fontSelect');
    const saveButton = document.getElementById('saveButton');
    const domainListContainer = document.getElementById('domainList');

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

    // Function to render saved domains
    function renderSavedDomains() {
        chrome.storage.sync.get(['savedDomains'], (result) => {
            const savedDomains = result.savedDomains || [];
            domainListContainer.innerHTML = '';

            savedDomains.forEach((domain, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = domain;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteDomain(index));

                listItem.appendChild(deleteButton);
                domainListContainer.appendChild(listItem);
            });
        });
    }

    // Function to delete a domain
    function deleteDomain(index) {
        chrome.storage.sync.get(['savedDomains'], (result) => {
            let savedDomains = result.savedDomains || [];
            if (index >= 0 && index < savedDomains.length) {
                savedDomains.splice(index, 1);
                chrome.storage.sync.set({ savedDomains }, renderSavedDomains);
            }
        });
    }

    // Initial render of saved domains
    renderSavedDomains();
});
