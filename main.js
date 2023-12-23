let lists = {
    'animals.txt': [],
    'colours.txt': [],
    'abtpeople.txt': [],
    'objects.txt': [],
    'demonyms.txt': [],
    'abtfood.txt': []
};

function loadFiles() {
    const filePromises = Object.keys(lists).map(fileName => {
        return fetch(fileName)
            .then(response => response.text())
            .then(data => {
                lists[fileName] = data.split('\n');
            });
    });

    Promise.all(filePromises).then(() => {
        console.log("All files loaded successfully");
    }).catch(error => {
        console.error('Error loading files:', error);
    });
}

function randomAdjs() {
    const selectedLists = Array.from(document.querySelectorAll('input[name="adjs"]:checked'))
                                .map(checkbox => lists[checkbox.value])
                                .flat();

    if (selectedLists.length > 0) {
        const randomElement = selectedLists[Math.floor(Math.random() * selectedLists.length)];
        document.getElementById('adjout').textContent = randomElement.trim();
    } else {
        document.getElementById('adjout').textContent = "Please select at least one adjective list.";
    }
}

function randomSubs() {
    const selectedLists = Array.from(document.querySelectorAll('input[name="subs"]:checked'))
                                .map(checkbox => lists[checkbox.value])
                                .flat();

    if (selectedLists.length > 0) {
        const randomElement = selectedLists[Math.floor(Math.random() * selectedLists.length)];
        document.getElementById('subout').textContent = randomElement.trim();
    } else {
        document.getElementById('subout').textContent = "Please select at least one subjective list.";
    }
}

function checkAllCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}

function updateLink() {
    let adjText = document.getElementById('adjout').textContent.trim();
    let subText = document.getElementById('subout').textContent.trim();

    adjText = adjText.replace(/\s+/g, '+');
    subText = subText.replace(/\s+/g, '+');

    // Update the href attribute of the link
    const mapsLink = document.getElementById("maps");
    if (mapsLink) {
        mapsLink.href = `https://www.google.com/maps/search/The+${adjText}+${subText}`;
    }
}


function pubName() {
    randomAdjs();
    randomSubs();
    updateLink();
}

window.onload = function() {
    checkAllCheckboxes();
    loadFiles();
};
