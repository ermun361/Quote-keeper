// ================================
// 1. DOM ELEMENT REFERENCES
// ================================
const quoteInput = document.getElementById('quote-text');
const authorInput = document.getElementById('quote-author');
const addQuoteButton = document.getElementById('add-quote-btn');
const quotesList = document.getElementById('quotes-list');

// ================================
// 2. SAVE QUOTE TO LOCAL STORAGE
// ================================
function saveQuoteToLocalStorage(quoteText, quoteAuthor) {
    const quoteObject = {
        text: quoteText,
        author: quoteAuthor
    };

    const quoteJSON = JSON.stringify(quoteObject);
    const uniqueKey = 'quote_' + Date.now();

    localStorage.setItem(uniqueKey, quoteJSON);
}

// ================================
// 3. DISPLAY STORED QUOTES
// ================================
function displayStoredQuotes() {
    quotesList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith('quote_')) {
            const storedQuote = JSON.parse(localStorage.getItem(key));
            createQuoteCard(storedQuote.text, storedQuote.author, key);
        }
    }

    // Placeholder if no quotes exist
    if (quotesList.children.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'No quotes added yet.';
        quotesList.appendChild(p);
    }
}

// ================================
// 4. CREATE QUOTE CARD
// ================================
function createQuoteCard(text, author, key) {
    const quoteCard = document.createElement('div');
    quoteCard.classList.add('quote-card');

    const blockquote = document.createElement('blockquote');
    blockquote.textContent = text;

    const authorText = document.createElement('div');
    authorText.classList.add('author');
    authorText.textContent = author;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    removeBtn.addEventListener('click', function () {
        removeQuote(key);
    });

    quoteCard.append(blockquote, authorText, removeBtn);
    quotesList.prepend(quoteCard);
}

// ================================
// 5. REMOVE QUOTE
// ================================
function removeQuote(key) {
    localStorage.removeItem(key);
    displayStoredQuotes();
}

// ================================
// 6. ADD QUOTE (MAIN ACTION)
// ================================
function addQuote() {
    const quoteText = quoteInput.value.trim();
    const quoteAuthor = authorInput.value.trim() || 'Unknown';

    if (quoteText === '') {
        alert('Please enter a quote.');
        return;
    }

    saveQuoteToLocalStorage(quoteText, quoteAuthor);
    displayStoredQuotes();

    quoteInput.value = '';
    authorInput.value = '';
}

// ================================
// 7. EVENT LISTENERS
// ================================
addQuoteButton.addEventListener('click', addQuote);

authorInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addQuote();
    }
});

document.addEventListener('DOMContentLoaded', displayStoredQuotes);
