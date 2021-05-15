var head = document.getElementsByTagName("head")[0]; 
var link = document.createElement("link");
link.rel = "stylesheet";     
link.type = "text/css"; 
link.href = chrome.extension.getURL("style.css"); 
head.appendChild(link); 

function addPopup(authorElement) {
    var tooltiptext = document.createElement("span");
    tooltiptext.classList.add("tooltiptext");
    var request = new Request(authorElement.href);
    var totalEntry;
    var lastActive;

    fetch(request).then(function(response) {
        return response.text();
    }).then(function(text) {
        var myDoc = document.implementation.createHTMLDocument("My Doc");
        var myBody = myDoc.body;
        myBody.innerHTML = text;
        totalEntry = parseInt(myDoc.getElementById("entry-count-total").innerText);
        lastActive = myDoc.getElementById("last-entry-time").innerText;
        tooltiptext.innerHTML = "Toplam " + totalEntry + " entry, en son " + lastActive;
        authorElement.appendChild(tooltiptext);
    });

    
      
}

function updateInfo() {
    loadEntriesButtons = document.getElementsByClassName("load-more-entries");

    if (loadEntriesButtons.length > 0) {
        loadEntriesButtons[0].onclick = function() {setTimeout(updateInfo, 3000);};
    }

    authors = document.getElementsByClassName("entry-author");

    for (var i = 0; i < authors.length; i++) {
        authors[i].classList.add("tooltip");
        var tooltiptexts = authors[i].getElementsByClassName("tooltiptext");
        if (tooltiptexts.length > 0)
            continue;
        
        addPopup(authors[i]);
    }
}

updateInfo();