const saveTabs = "save-window-tabs";

// Add compatibility between Chromium & Firefox
let b;
try {
    b = browser;
} catch (_) {
    b = chrome;
}

// Add actions to context menus
b.contextMenus.create({
    id: saveTabs,
    title: "Save tabs to a file",
    contexts: ["page"]
});

// Listen for events
b.contextMenus.onClicked.addListener((info, _) => {
    switch (info.menuItemId) {
        case saveTabs:
            // Get list of URLs from tabs
            b.tabs.query({currentWindow: true}, tabs => {
                let urls = tabs.map(tab => tab.url);

                // Create JSON blob and open in new window for saving
                let blob = new Blob([JSON.stringify(urls)], {type: "application/json"});
                b.tabs.create({
                    active: true,
                    url: URL.createObjectURL(blob)
                });
            });
            break;
    }
});


