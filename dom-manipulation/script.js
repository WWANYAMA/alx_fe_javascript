// Simulated server fetch
function fetchQuotesFromServer() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const serverQuotes = [
                { id: 1, text: "Stay hungry, stay foolish." },
                { id: 2, text: "Talk is cheap. Show me the code." }
            ];
            resolve(serverQuotes);
        }, 1000);
    });
}

// Show quotes in the list
function renderQuotes(quotes) {
    const list = document.getElementById("quote-list");
    list.innerHTML = "";
    quotes.forEach(q => {
        const li = document.createElement("li");
        li.textContent = q.text;
        list.appendChild(li);
    });
}

// Get quotes from localStorage
function getLocalQuotes() {
    return JSON.parse(localStorage.getItem("quotes")) || [];
}

// Save to localStorage
function saveLocalQuotes(quotes) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Add a new quote
function addQuote() {
    const input = document.getElementById("quote-input");
    const text = input.value.trim();
    if (!text) return;

    const quotes = getLocalQuotes();
    quotes.push({ id: Date.now(), text });
    saveLocalQuotes(quotes);
    input.value = "";
    renderQuotes(quotes);
}

// Sync with server
function syncWithServer() {
    fetchQuotesFromServer().then(serverQuotes => {
        const localQuotes = getLocalQuotes();
        let conflict = false;

        // Compare each server quote with local quote
        const mergedQuotes = serverQuotes.map(serverQuote => {
            const match = localQuotes.find(lq => lq.id === serverQuote.id);
            if (!match || match.text !== serverQuote.text) {
                conflict = true;
                return serverQuote; // Server wins
            }
            return match;
        });

        if (conflict) {
            saveLocalQuotes(mergedQuotes);
            showConflictNotice();
            renderQuotes(mergedQuotes);
        }
    });
}

// Show notice of conflict
function showConflictNotice() {
    const notice = document.getElementById("conflict-notification");
    notice.style.display = "block";
    setTimeout(() => {
        notice.style.display = "none";
    }, 6000);
}

// Manually view server data
function resolveManually() {
    alert("Server data replaced your local quotes.");
}

// Initial load
window.onload = () => {
    renderQuotes(getLocalQuotes());
    syncWithServer();
};

// Auto sync every 10 seconds
setInterval(syncWithServer, 10000);


