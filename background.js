// Event listener that runs when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item that appears when right-clicking on a link
    chrome.contextMenus.create({
      id: "saveLink",
      title: "Save Link",
      contexts: ["link"]
    });
  });
  
  // Event listener for context menu item clicks
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveLink") {
      const link = info.linkUrl;  // Get the URL of the clicked link
      // Retrieve saved links from Chrome's storage
      chrome.storage.sync.get(['links'], function (result) {
        const links = result.links ? result.links : [];
        links.push(link);  // Add the new link to the list
        // Save the updated list back to storage
        chrome.storage.sync.set({ links: links }, function () {
          alert('Link saved!');
        });
      });
    }
  });
  