chrome.action.onClicked.addListener((tab) => {
    // Verificamos que el usuario esté en la página correcta
    if (tab.url.includes("unicom.com.uy")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scraper.js']
        });
    } else {
        // Si hace clic en otra página, le avisamos
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => alert("Debes estar en la página de Unicom (www.unicom.com.uy) para usar el scraper.")
        });
    }
});
