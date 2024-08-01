(() => {
    chrome.storage.sync.get(['selectedFont'], (result) => {
        const selectedFont = result.selectedFont || 'vazirmatn'; // Default to vazirmatn
        const styleId = 'custom-font-style';
        const styleUrl = chrome.runtime.getURL(`fonts/${selectedFont}.woff2`);
        const styleContent = `
            @font-face {
                font-family: '${selectedFont}';
                src: url('${styleUrl}') format('woff2');
            }
            * {
                font-family: '${selectedFont}' !important;
            }
        `;

        // Check if the style element already exists
        let existingStyle = document.getElementById(styleId);

        if (existingStyle) {
            // Remove the existing style element
            existingStyle.parentNode.removeChild(existingStyle);
        } else {
            // Create a style element
            let style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = styleContent;

            // Handle errors
            style.onerror = function() {
                console.error('Error loading the stylesheet.');
            };

            // Append the style element to the head
            document.head.appendChild(style);
        }
    });
})();
