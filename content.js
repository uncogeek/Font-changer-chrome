// content.js
function applyCustomFont() {
 chrome.storage.sync.get(['selectedFont'], (result) => {
 const selectedFont = result.selectedFont || 'vazirmatn';
 const styleId = 'custom-font-style';
 
 // Remove existing style if present
 removeCustomFont();
 
 const styleUrl = chrome.runtime.getURL(`fonts/${selectedFont}.woff2`);
 const style = document.createElement('style');
 style.id = styleId;
 style.textContent = `
 @font-face {
 font-family: '${selectedFont}';
 src: url('${styleUrl}') format('woff2');
 font-display: swap;
 }
 * {
 font-family: '${selectedFont}' !important;
 }
 `;
 
 document.head.appendChild(style);
 console.log('Custom font applied:', selectedFont);
 });
}

function removeCustomFont() {
 const existingStyle = document.getElementById('custom-font-style');
 if (existingStyle) {
 existingStyle.remove();
 console.log('Custom font removed');
 }
}

// Wait for DOM to be ready before applying font
if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', applyCustomFont);
} else {
 applyCustomFont();
}
