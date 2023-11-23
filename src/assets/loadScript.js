(
    async () => {
        const src = chrome.runtime.getURL("assets/js/script.js");
        await import(src);
        // const {CreatePopup} = await import("./script");
    }
)()