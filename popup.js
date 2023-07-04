document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");

  // Set the initial state of the toggle switch
  chrome.storage.local.get("cssToggled", (data) => {
    toggleSwitch.checked = data.cssToggled || false;
  });

  // Listen for changes
  toggleSwitch.addEventListener("change", () => {
    const toggled = toggleSwitch.checked;
    chrome.storage.local.set({ cssToggled: toggled });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { toggleCSS: toggled });
    });
  });
});
