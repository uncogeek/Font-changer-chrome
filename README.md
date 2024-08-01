# Custom Font Injector Chrome Extension

## Overview

The Custom Font Injector is a simple and efficient Chrome extension designed to enhance the readability of Persian texts across the web. This extension allows users to switch between different Persian fonts with a single click, ensuring a better reading experience. Users can choose from a list of popular Persian fonts and easily toggle the selected font on and off on any webpage.

## Features

- **Toggle Font Injection**: Easily inject or remove the chosen font on the current webpage by clicking the extension icon.
- **Font Options**: Choose from a list of popular Persian fonts:
  - Vazir matn
  - Iran Sans
  - Iran Yekan
- **Persistent Preferences**: The selected font is saved and used for future sessions.
- **User-Friendly Interface**: Simple and intuitive options page for selecting the desired font.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory where you downloaded or cloned this repository.

## Usage

1. Click on the extension icon to inject the chosen font into the current webpage.
2. Click the icon again to remove the font and revert to the original webpage style.
3. To change the font:
   - Right-click the extension icon and select "Options".
   - Choose your preferred font from the dropdown menu.
   - Click "Save".

## Files and Structure

```
myFontExtension/
├── fonts/
│   ├── vazirmatn.woff2
│   ├── iransans.woff2
│   └── iranyekan.woff2
├── icons/
│   ├── icon.png
│   └── icon_active.png
├── background.js
├── content.js
├── manifest.json
├── options.html
├── options.js
└── README.md
```

- **fonts/**: Directory containing the Persian font files.
- **icons/**: Directory containing the extension icons for different states.
- **background.js**: Script for handling background tasks and icon toggling.
- **content.js**: Script for injecting and removing the CSS styles on the current page.
- **manifest.json**: Configuration file for the Chrome extension.
- **options.html**: HTML file for the extension's options page.
- **options.js**: Script for handling the options page logic.
 (Don't need CSS file for defining the font-face and styles because already generated dynamically in `content.js`)

## Development

To make changes to the extension:

1. Modify the relevant files in the directory.
2. Reload the extension from `chrome://extensions/` by clicking the "Reload" button.

## Contribution

Feel free to fork this repository, make changes, and submit pull requests. Any contributions that improve the functionality, performance, or usability of the extension are welcome.
If you want to add-up some new features notice me!

It would be nice to add later:
- font weight option
- add font by user
- save prefecence for next website visiting
- font size option

## License

This project is licensed under the MIT License.

---

Enhance your reading experience of Persian texts on the web with the Custom Font Injector Chrome Extension. Simple, efficient, and customizable to your font preferences. Enjoy better readability with a single click!
