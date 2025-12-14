// 1.define variables to reference the DOM elements
const quoteInput = document.getElementById('quote-text');
const authorInput = document.getElementById('quote-author');
const addQuoteButton = document.getElementById('add-quote-btn');
const quotesList = document.getElementById('quotes-list');

// 2.Implement the add quote functionality

function addQuote() {
    // get the input values
    const quoteText = quoteInput.value.trim();
    const quoteAuthor = authorInput.value.trim() || 'Unknown';

    // validate input
    if (quoteText ==='') {
        alert('Please enter a quote.');
        return; // stop the function if input is invalid
    }

    // If the list currently has the "No quotes added yet" text, remove it
    // We check if the first child is a paragraph text (the placeholder)
    if (quotesList.querySelector('p')) {
    quotesList.innerHTML = '';
    }
   



    // Create the container div for the new quote card
    const quoteCard = document.createElement('div');
    quoteCard.classList.add('quote-card'); // use the class from your CSS

    // Create the blockquote text element
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteText;

    // Create the author element
    const authorText = document.createElement('div');
    authorText.classList.add('author');  //use the class from your CSS
     // If author is empty, default to "Unknown", otherwise use the input
    authorText.textContent = quoteAuthor === "" ? "Unknown" : quoteAuthor;

    // Append the blockquote and author to the quote card
    quoteCard.appendChild(blockquote);
    quoteCard.appendChild(authorText);

    // Append the quote card to the display section
    // (Using prepend allows the newest quote to show at the top)
    quotesList.prepend(quoteCard);

    // Clear the input fields for the next entry
    quoteInput.value = '';
    authorInput.value = '';

}

// 3. Attach event listener to the button
addQuoteButton.addEventListener('click', addQuote);

// Optional: Allow pressing "Enter" inside the author field to trigger the add button
authorInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addQuote();
    }

});

