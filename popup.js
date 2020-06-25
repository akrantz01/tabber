document.getElementById("load").onclick = async () => {
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
        await browser.tabs.create({
            active: false,
            url: url
        })
    }

    setStatus("Successfully loaded tabs", "green");
};

function setStatus(status, color) {
    let s = document.getElementById("status");
    s.innerText = status;
    s.style.color = color;
    s.style.marginTop = "1em";
    s.style.marginBottom = "1em";
}