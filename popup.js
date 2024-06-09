// Run the following code when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.getElementById('saveLink');
    const linkInput = document.getElementById('linkInput');
    const linkList = document.getElementById('linkList');

    // Event listener for the save button click
    saveButton.addEventListener('click', function () {
        const link = linkInput.value;
        if (link) {
            // Retrieve saved links from Chrome's storage
            chrome.storage.sync.get(['links'], function (result) {
                const links = result.links ? result.links : [];
                links.push(link);  // Add the new link to the list
                // Save the updated list back to storage
                chrome.storage.sync.set({ links: links }, function () {
                    displayLinks(links);  // Display the updated list of links
                    linkInput.value = '';  // Clear the input field
                });
            });
        }
    });

    // Function to display the list of links
    function displayLinks(links) {
        linkList.innerHTML = '';  // Clear the current list
        links.forEach(function (link, index) {
            const listItem = document.createElement('li');
            listItem.textContent = link;
            // Event listener for list item click to copy link to clipboard
            listItem.addEventListener('click', function () {
                copyToClipboard(link);
            });
            linkList.appendChild(listItem);
        });
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard');
    }

    // Retrieve and display saved links on popup load
    chrome.storage.sync.get(['links'], function (result) {
        if (result.links) {
            displayLinks(result.links);
        }
    });
});

