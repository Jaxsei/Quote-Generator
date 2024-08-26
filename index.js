async function getQuote() {
    const url = `https://api.api-ninjas.com/v1/quotes`;
    const options = {
        method: "GET",
        headers: {
            "X-Api-Key": "2e3qcbaEyC6ccWLDXLwEOw==rXfqVavhhEAeNVwd", // Replace with your API key
            "Content-Type": "application/json",
        },
    };

    let fetchedQuote = null;

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(
                `Network response was not ok: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        if (data.length === 0) {
            throw new Error("No quote found.");
        }

        fetchedQuote = data[0];
    } catch (error) {
        console.error("Failed to fetch the quote:", error.message);
        fetchedQuote = { quote: "Error fetching quote", author: "N/A" };
    }

    return fetchedQuote;
}

function updateQuoteText(quote) {
    const quoteTextElement = document.getElementById("quote-text");
    const quoteAuthorElement = document.getElementById("quote-author");

    quoteTextElement.textContent = `"${quote.quote}"`;
    quoteAuthorElement.textContent = `- ${quote.author}`;
}

async function loadQuoteAndSetupCopy() {
    const quote = await getQuote();
    updateQuoteText(quote);

    const copyButton = document.getElementById("copy-button");
    copyButton.addEventListener("click", () => {
        const textToCopy = `${quote.quote} - ${quote.author}`;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                alert("Quote copied to clipboard!");
            })
            .catch((err) => {
                console.error("Could not copy text: ", err);
            });
    });
}

// Add event listener for the button to load a new quote
const quoteBtn = document.getElementById("quoteBtn");
quoteBtn.addEventListener("click", async () => {
    const quote = await getQuote();
    updateQuoteText(quote);
});

// Load a quote and setup the copy button on page load
document.addEventListener("DOMContentLoaded", loadQuoteAndSetupCopy);
