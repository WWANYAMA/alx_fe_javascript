let quotes = [];
let selectedCategory = "all";

// Load quotes from localStorage or use default
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      { text: "Be bold.", category: "inspiration" },
      { text: "Never give up.", category: "motivation" },
    ];
  }

  // Restore selected category
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    selectedCategory = savedCategory;
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Save selected category
function saveSelectedCategory(category) {
  localStorage.setItem("selectedCategory", category);
}

// Populate category dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Get unique categories
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Set selected value from stored data
  categoryFilter.value = selectedCategory;
}

// Filter and display quotes
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  selectedCategory = categoryFilter.value;
  saveSelectedCategory(selectedCategory);

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = "";

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    display.textContent = "No quotes in this category.";
    return;
  }

  filteredQuotes.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `"${q.text}" - ${q.category}`;
    display.appendChild(p);
  });
}

// Show one random quote from the selected category
function showRandomQuote() {
  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  const display = document.getElementById("quoteDisplay");

  if (filteredQuotes.length === 0) {
    display.textContent = "No quotes to show.";
    return;
  }

  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  display.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText").value.trim();
  const categoryInput = document.getElementById("newQuoteCategory").value.trim().toLowerCase();

  if (!textInput || !categoryInput) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: textInput, category: categoryInput });
  saveQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Export to JSON file
function exportToJsonFile() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// Import from JSON file
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        filterQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch {
      alert("Failed to import quotes.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

// Event listener for new quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initialize app
loadQuotes();
populateCategories();
filterQuotes();





