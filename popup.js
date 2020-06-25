// Add compatibility between Chromium & Firefox
let b;
try {
    b = browser;
} catch (_) {
    b = chrome;
}

document.getElementById("load").onclick = () => {
    // Attempt to decode array
    let decoded;
    try {
        decoded = JSON.parse(document.getElementById("input").value);
    } catch (e) {
        setStatus("ERROR: input is not JSON", "red");
        return;
    }

    // Ensure data is an array
    if (!Array.isArray(decoded)) {
        setStatus("ERROR: input must be an array", "red");
        return;
    }

    // Load tabs
    for (let url of decoded) {
        // Ensure its a string
        if (typeof url !== "string") {
            setStatus("ERROR: all elements must be strings", "red");
            return;
        }

        // Create the tab
        b.tabs.create({
            active: false,
            url: url
        })
    }

    setStatus("Successfully loaded tabs", "green");
};

document.getElementById("export").onclick = () => {
    // Get list of URLs from tabs
    b.tabs.query({currentWindow: true}, tabs => {
        let urls = tabs.map(tab => tab.url);

        // Create JSON blob and open in new window for saving
        let blob = new Blob([JSON.stringify(urls)], {type: "application/json"});
        b.tabs.create({
            active: true,
            url: URL.createObjectURL(blob)
        });

        setStatus("Successfully exported tabs", "green");
    });
}

function setStatus(status, color) {
    let s = document.getElementById("status");
    s.innerText = status;
    s.style.color = color;
    s.style.marginTop = "1em";
    s.style.marginBottom = "1em";
}
