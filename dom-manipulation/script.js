// ✅ 1. Array of quotes with text and category
let quotes = [
  { text: "Believe in yourself.", category: "inspiration" },
  { text: "Every moment matters.", category: "life" },
  { text: "Failure is success in progress.", category: "motivation" }
];

// ✅ 2. Get references to DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const categorySelect = document.getElementById("categorySelect");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// ✅ 3. Function to show a random quote
function showRandomQuote() {
  const selectedCategory = categorySelect.value;

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes found in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}"`;
}

// ✅ 4. Function to add a new quote and update the DOM
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim().toLowerCase();

  if (text === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add to quotes array
  quotes.push({ text, category });

  // Clear input fields
  newQuoteText.value = "";
  newQuoteCategory.value = "";

  alert("Quote added successfully!");

  // Update the category dropdown with new categories
  populateCategories();
}

// ✅ 5. Populate dropdown with unique categories
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];

  // Clear existing options
  categorySelect.innerHTML = '<option value="all">All</option>';

  // Add each unique category
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

// ✅ 6. Event listeners for buttons
newQuoteBtn.addEventListener("click", showRandomQuote); // Show quote
addQuoteBtn.addEventListener("click", addQuote);        // Add quote
categorySelect.addEventListener("change", showRandomQuote); // Filter quote

// ✅ 7. Initialize the category dropdown
populateCategories();
