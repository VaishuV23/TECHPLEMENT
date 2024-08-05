const api = "https://api.quotable.io/random";
const searchApi = "https://api.quotable.io/quotes?author=";

const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const btn = document.getElementById("btn");
const searchBtn = document.getElementById("search-btn");
const authorInput = document.getElementById("author-input");
const quotesTableContainer = document.getElementById("quotes-table-container");
const quotesTable = document.getElementById("quotes-table").getElementsByTagName('tbody')[0];

btn.addEventListener("click", getQuote);
searchBtn.addEventListener("click", searchQuoteByAuthor);

function getQuote() {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = data.content;
      quoteAuthor.innerHTML = `- ${data.author}`;
    })
    .catch((error) => {
      quote.innerHTML = "An error occurred. Please try again later.";
      quoteAuthor.innerHTML = "";
      console.error('Error fetching the quote:', error);
    });
}

function searchQuoteByAuthor() {
  const authorName = authorInput.value.trim();
  if (!authorName) {
    quote.innerHTML = "Please enter an author name.";
    quoteAuthor.innerHTML = "";
    return;
  }

  fetch(`${searchApi}${encodeURIComponent(authorName)}`)
    .then((res) => res.json())
    .then((data) => {
      quotesTable.innerHTML = '';  // Clear previous search results
      if (data.results && data.results.length > 0) {
        data.results.forEach((quoteObj) => {
          const row = quotesTable.insertRow();
          const cell = row.insertCell(0);
          cell.textContent = quoteObj.content;
        });
        quotesTableContainer.style.display = 'block';  // Show the table container
        const randomQuote = data.results[Math.floor(Math.random() * data.results.length)];
        quote.innerHTML = randomQuote.content;
        quoteAuthor.innerHTML = `- ${randomQuote.author}`;
      } else {
        quote.innerHTML = "No quotes found for this author.";
        quoteAuthor.innerHTML = "";
        quotesTableContainer.style.display = 'none';  // Hide the table container if no results
      }
    })
    .catch((error) => {
      quote.innerHTML = "An error occurred. Please try again later.";
      quoteAuthor.innerHTML = "";
      quotesTableContainer.style.display = 'none';  // Hide the table container on error
      console.error('Error fetching the quote:', error);
    });
}
