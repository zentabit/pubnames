let words = [];

// Function to fetch the word list once when the page loads
function fetchWordList() {
    fetch('words.txt')
        .then(response => response.text())
        .then(data => {
            words = data.split('\n');
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
}

// Function to display a random word from the fetched list
function displayRandomWord() {
    if (words.length > 0) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById('randomWord').textContent = randomWord.trim();
    } else {
        document.getElementById('randomWord').textContent = "Word list not loaded.";
    }
}

// Load the word list when the page loads
window.onload = fetchWordList;
