// Store active states for each tab
let activeTabStates = new Map();

// Function to delete a domain from the saved list
function deleteDomain(index) {
 chrome.storage.sync.get(['savedDomains'], (result) => {
 let savedDomains = result.savedDomains || [];
 if (index >= 0 && index < savedDomains.length) {
 savedDomains.splice(index, 1);
 chrome.storage.sync.set({ savedDomains }, () => {
 console.log('Domain deleted successfully.');
 });
 }
 });
}

// Function to remove custom font (this will be injected into content scripts)
function removeCustomFont() {
 const styleId = 'custom-font-style';
 const existingStyle = document.getElementById(styleId);
 if (existingStyle) {
 existingStyle.remove();
 }
}

// Function to check and apply font for a domain
function checkAndApplyFont(tabId, domain) {
 chrome.storage.sync.get(['savedDomains'], (result) => {
 let savedDomains = result.savedDomains || [];
 if (savedDomains.includes(domain)) {
 activeTabStates.set(tabId, true);
 
 // Inject the content script
 chrome.scripting.executeScript({
 target: { tabId: tabId },
 files: ['content.js']
 }).catch(err => console.error('Auto-injection failed:', err));
 
 // Update icon to active state
 chrome.action.setIcon({ 
 path: 'icons/icon_active.png', 
 tabId: tabId 
 }).catch(err => console.error('Icon update failed:', err));
 } else {
 activeTabStates.set(tabId, false);
 
 // Update icon to inactive state
 chrome.action.setIcon({ 
 path: 'icons/icon.png', 
 tabId: tabId 
 }).catch(err => console.error('Icon update failed:', err));
 }
 });
}

// Main click handler for the extension icon
chrome.action.onClicked.addListener((tab) => {
 const url = new URL(tab.url);
 const domain = url.hostname;
 
 // Get current state for this tab
 const isActive = !activeTabStates.get(tab.id);
 activeTabStates.set(tab.id, isActive);

 // Update storage
 chrome.storage.sync.get(['savedDomains'], (result) => {
 let savedDomains = result.savedDomains || [];
 
 if (isActive) {
 if (!savedDomains.includes(domain)) {
 savedDomains.push(domain);
 }
 } else {
 savedDomains = savedDomains.filter(d => d !== domain);
 }
 
 chrome.storage.sync.set({ savedDomains }, () => {
 console.log(`Domain ${isActive ? 'added to' : 'removed from'} saved domains:`, domain);
 });
 });

 // Execute or remove the font
 if (isActive) {
 chrome.scripting.executeScript({
 target: { tabId: tab.id },
 files: ['content.js']
 }).catch(err => console.error('Script injection failed:', err));
 } else {
 chrome.scripting.executeScript({
 target: { tabId: tab.id },
 function: removeCustomFont
 }).catch(err => console.error('Font removal failed:', err));
 }

 // Update icon
 const newIconPath = isActive ? 'icons/icon_active.png' : 'icons/icon.png';
 chrome.action.setIcon({ 
 path: newIconPath, 
 tabId: tab.id 
 }).catch(err => console.error('Icon update failed:', err));
});

// Handle tab updates - when page loads or refreshes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
 if (changeInfo.status === 'complete' && tab.url) {
 try {
 const url = new URL(tab.url);
 const domain = url.hostname;
 checkAndApplyFont(tabId, domain);
 } catch (error) {
 // Handle invalid URLs (like chrome:// pages)
 console.log('Skipping invalid URL:', tab.url);
 }
 }
});

// Handle tab activation - when you switch to an existing tab
chrome.tabs.onActivated.addListener((activeInfo) => {
 chrome.tabs.get(activeInfo.tabId, (tab) => {
 if (tab.url) {
 try {
 const url = new URL(tab.url);
 const domain = url.hostname;
 checkAndApplyFont(activeInfo.tabId, domain);
 } catch (error) {
 console.log('Skipping invalid URL:', tab.url);
 }
 }
 });
});

// Handle when URL changes in the same tab (navigation without page reload)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
 if (changeInfo.url && tab.url) {
 try {
 const url = new URL(tab.url);
 const domain = url.hostname;
 checkAndApplyFont(tabId, domain);
 } catch (error) {
 console.log('Skipping invalid URL:', tab.url);
 }
 }
});

// Cleanup when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
 activeTabStates.delete(tabId);
});

// Handle extension installation or update
chrome.runtime.onInstalled.addListener(() => {
 console.log('Extension installed/updated');
});

// Error handling for storage operations
chrome.storage.onChanged.addListener((changes, namespace) => {
 for (let key in changes) {
 console.log(
 `Storage key "${key}" in namespace "${namespace}" changed:`,
 `Old value: ${JSON.stringify(changes[key].oldValue)}`,
 `New value: ${JSON.stringify(changes[key].newValue)}`
 );
 }
});
