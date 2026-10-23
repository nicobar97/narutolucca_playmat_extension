# Playmat Autofill

A Chrome extension that autofills the Play System playmat reservation form (`https://www.play-system.eu/playmat*`) with the details you save, so you only have to complete the captcha.

## Installation (Load unpacked)

1. Get the extension folder on your computer (clone or download this repository and unzip it if needed). The folder must contain `manifest.json`.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked**.
5. Select the extension folder (the one containing `manifest.json`) and confirm.
6. The extension **Playmat Autofill** now appears in the list. Click the puzzle-piece icon in the Chrome toolbar and pin it for easy access.

Works in any Chromium-based browser (Edge, Brave, etc.) via `edge://extensions` / `brave://extensions`.

## Usage

1. Click the extension icon and save your details in the popup.
2. Open the reservation page: <https://www.play-system.eu/playmat>
3. The form is filled in automatically. Complete the captcha and submit.

## Updating

After changing any file, go to `chrome://extensions` and click the reload (circular arrow) icon on the extension card.

## Troubleshooting

- **"Manifest file is missing or unreadable"**: you selected the wrong folder. Pick the one that directly contains `manifest.json`.
- **Form not filled**: make sure the page URL starts with `https://www.play-system.eu/playmat`, then reload the page.
- **Load unpacked button missing**: enable Developer mode first.
