// script.js
document.getElementById('getRate').addEventListener('click', function () {
    const baseCurrency = document.getElementById('baseCurrency').value.toUpperCase();
    const targetCurrency = document.getElementById('targetCurrency').value;

    // Regular expression to check if the base currency is a valid format (e.g., 3 uppercase letters)
    const currencyPattern = /^[A-Z]{3}$/;

    // Validate base currency input
    if (!currencyPattern.test(baseCurrency)) {
        alert("Please enter a valid 3-letter currency code (e.g., USD, EUR).");
        document.getElementById('rateDisplay').textContent = ""; // Clear previous display
        return; // Stop further execution
    }

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${baseCurrency}`);
            }
            return response.json();
        })
        .then(data => {
            const rate = data.rates[targetCurrency];
            if (rate) {
                document.getElementById('rateDisplay').textContent = `1 ${baseCurrency} = ${rate} ${targetCurrency}`;
            } else {
                document.getElementById('rateDisplay').textContent = `Rate not available for ${targetCurrency}`;
            }
        })
        .catch(error => {
            document.getElementById('rateDisplay').textContent = error.message;
        });
});
