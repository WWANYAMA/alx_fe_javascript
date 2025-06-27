let quotes = [];

// Load quotes from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  quotes = storedQuotes ? JSON.parse(storedQuotes) : [
    { text: "Believe in yourself.", category: "inspiration" },
    { text: "Every moment matters.", category: "life" },
    { text: "Failure is success in progress.", category: "motivation" }
  ];
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Save last viewed quote in sessionStorage
function saveLastViewedQuote(quote) {
  sessionStorage.setItem("lastViewedQuote", quote);
}

// Get last viewed quote (optional use)
function getLastViewedQuote() {
  return sessionStorage.getItem("lastViewedQuote");
}

// Display a random quote
function showRandomQuote() {
  const category = document.getElementById("categorySelect").value;

  const filteredQuotes = category === "all"
    ? quotes
    : quotes.filter(q => q.category === category);

  const display = document.getElementById("quoteDisplay");

  if (filteredQuotes.length === 0) {
    display.textContent = "No quotes in this category.";
    return;
  }

  const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  display.textContent = `"${random.text}"`;

  saveLastViewedQuote(random.text);
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim().toLowerCase();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

// Create the form dynamically
function createAddQuoteForm() {
  const container = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  container.appendChild(quoteInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);

  document.body.appendChild(container);
}

// Populate the category dropdown
function populateCategories() {
  const select = document.getElementById("categorySelect");
  const categories = [...new Set(quotes.map(q => q.category))];

  select.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });
}

// Export quotes as JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  downloadLink.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Failed to import file.");
    }
  };

  reader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("categorySelect").addEventListener("change", showRandomQuote);

// Initialize app
loadQuotes();
populateCategories();
createAddQuoteForm();



