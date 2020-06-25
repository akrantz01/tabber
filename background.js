const saveTabs = "save-window-tabs";

// Add actions to context menus
browser.menus.create({
    id: saveTabs,
    title: "Save tabs to a file",
    contexts: ["tab"]
});

// Listen for events
browser.menus.onClicked.addListener(async (info, _) => {
    switch (info.menuItemId) {
        case saveTabs:
            // Get list of URLs from tabs
            let tabs = await browser.tabs.query({currentWindow: true});
            let urls = tabs.map(tab => tab.url);

            // Create JSON blob and open in new window for saving
            let blob = new Blob([JSON.stringify(urls)], {type: "application/json"});
            await browser.tabs.create({
                active: true,
                url: URL.createObjectURL(blob)
            });
            break;
    }
});
