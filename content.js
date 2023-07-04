function injectCSS() {
  const existingStyle = document.getElementById("customWandBStyle");

  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "customWandBStyle";
    fetch(chrome.runtime.getURL("/styles.css"))
      .then((response) => response.text())
      .then((text) => {
        style.textContent = text;
        document.head.appendChild(style);
      });
  }
}

function removeCSS() {
  const existingStyle = document.getElementById("customWandBStyle");
  if (existingStyle) {
    existingStyle.remove();
  }
}
chrome.storage.local.get("cssToggled", (data) => {
  if (data.cssToggled) {
    injectCSS();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.toggleCSS) {
    injectCSS();
  } else {
    removeCSS();
  }
});
