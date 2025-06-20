document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const swapBtn = document.getElementById('swap');
    const convertBtn = document.getElementById('convert-btn');
    const resultContainer = document.querySelector('.result-container');
    const conversionResult = document.getElementById('conversion-result');
    const conversionRate = document.getElementById('conversion-rate');
    const lastUpdated = document.getElementById('last-updated');
    const loadingMessage = document.querySelector('.loading-message');
    const errorMessage = document.querySelector('.error-message');

    // Hardcoded exchange rates (fallback if API fails)
    const fallbackRates = {
        "USD": 1,
        "EUR": 0.92,
        "GBP": 0.79,
        "JPY": 151.55,
        "AUD": 1.51,
        "CAD": 1.37,
        "CHF": 0.89,
        "CNY": 7.23,
        "INR": 83.47,
        "MXN": 16.74,
        "RUB": 88.96,
        "ZAR": 18.22,
        "BRL": 5.04,
        "AED": 3.67,
        "SAR": 3.75,
        "SGD": 1.34,
        "NZD": 1.62
    };

    // Currency list (hardcoded to ensure availability)
    const currencies = {
        "AED": "United Arab Emirates Dirham",
        "AFN": "Afghan Afghani",
        "ALL": "Albanian Lek",
        "AMD": "Armenian Dram",
        "ANG": "Netherlands Antillean Guilder",
        "AOA": "Angolan Kwanza",
        "ARS": "Argentine Peso",
        "AUD": "Australian Dollar",
        "AWG": "Aruban Florin",
        "AZN": "Azerbaijani Manat",
        "BAM": "Bosnia-Herzegovina Convertible Mark",
        "BBD": "Barbadian Dollar",
        "BDT": "Bangladeshi Taka",
        "BGN": "Bulgarian Lev",
        "BHD": "Bahraini Dinar",
        "BIF": "Burundian Franc",
        "BMD": "Bermudan Dollar",
        "BND": "Brunei Dollar",
        "BOB": "Bolivian Boliviano",
        "BRL": "Brazilian Real",
        "BSD": "Bahamian Dollar",
        "BTN": "Bhutanese Ngultrum",
        "BWP": "Botswanan Pula",
        "BYN": "Belarusian Ruble",
        "BZD": "Belize Dollar",
        "CAD": "Canadian Dollar",
        "CDF": "Congolese Franc",
        "CHF": "Swiss Franc",
        "CLP": "Chilean Peso",
        "CNY": "Chinese Yuan",
        "COP": "Colombian Peso",
        "CRC": "Costa Rican Colón",
        "CUP": "Cuban Peso",
        "CVE": "Cape Verdean Escudo",
        "CZK": "Czech Republic Koruna",
        "DJF": "Djiboutian Franc",
        "DKK": "Danish Krone",
        "DOP": "Dominican Peso",
        "DZD": "Algerian Dinar",
        "EGP": "Egyptian Pound",
        "ERN": "Eritrean Nakfa",
        "ETB": "Ethiopian Birr",
        "EUR": "Euro",
        "FJD": "Fijian Dollar",
        "FKP": "Falkland Islands Pound",
        "FOK": "Faroese Króna",
        "GBP": "British Pound Sterling",
        "GEL": "Georgian Lari",
        "GGP": "Guernsey Pound",
        "GHS": "Ghanaian Cedi",
        "GIP": "Gibraltar Pound",
        "GMD": "Gambian Dalasi",
        "GNF": "Guinean Franc",
        "GTQ": "Guatemalan Quetzal",
        "GYD": "Guyanaese Dollar",
        "HKD": "Hong Kong Dollar",
        "HNL": "Honduran Lempira",
        "HRK": "Croatian Kuna",
        "HTG": "Haitian Gourde",
        "HUF": "Hungarian Forint",
        "IDR": "Indonesian Rupiah",
        "ILS": "Israeli New Shekel",
        "IMP": "Manx pound",
        "INR": "Indian Rupee",
        "IQD": "Iraqi Dinar",
        "IRR": "Iranian Rial",
        "ISK": "Icelandic Króna",
        "JEP": "Jersey Pound",
        "JMD": "Jamaican Dollar",
        "JOD": "Jordanian Dinar",
        "JPY": "Japanese Yen",
        "KES": "Kenyan Shilling",
        "KGS": "Kyrgystani Som",
        "KHR": "Cambodian Riel",
        "KID": "Kiribati Dollar",
        "KMF": "Comorian Franc",
        "KRW": "South Korean Won",
        "KWD": "Kuwaiti Dinar",
        "KYD": "Cayman Islands Dollar",
        "KZT": "Kazakhstani Tenge",
        "LAK": "Laotian Kip",
        "LBP": "Lebanese Pound",
        "LKR": "Sri Lankan Rupee",
        "LRD": "Liberian Dollar",
        "LSL": "Lesotho Loti",
        "LYD": "Libyan Dinar",
        "MAD": "Moroccan Dirham",
        "MDL": "Moldovan Leu",
        "MGA": "Malagasy Ariary",
        "MKD": "Macedonian Denar",
        "MMK": "Myanmar Kyat",
        "MNT": "Mongolian Tugrik",
        "MOP": "Macanese Pataca",
        "MRU": "Mauritanian Ouguiya",
        "MUR": "Mauritian Rupee",
        "MVR": "Maldivian Rufiyaa",
        "MWK": "Malawian Kwacha",
        "MXN": "Mexican Peso",
        "MYR": "Malaysian Ringgit",
        "MZN": "Mozambican Metical",
        "NAD": "Namibian Dollar",
        "NGN": "Nigerian Naira",
        "NIO": "Nicaraguan Córdoba",
        "NOK": "Norwegian Krone",
        "NPR": "Nepalese Rupee",
        "NZD": "New Zealand Dollar",
        "OMR": "Omani Rial",
        "PAB": "Panamanian Balboa",
        "PEN": "Peruvian Nuevo Sol",
        "PGK": "Papua New Guinean Kina",
        "PHP": "Philippine Peso",
        "PKR": "Pakistani Rupee",
        "PLN": "Polish Złoty",
        "PYG": "Paraguayan Guarani",
        "QAR": "Qatari Rial",
        "RON": "Romanian Leu",
        "RSD": "Serbian Dinar",
        "RUB": "Russian Ruble",
        "RWF": "Rwandan Franc",
        "SAR": "Saudi Riyal",
        "SBD": "Solomon Islands Dollar",
        "SCR": "Seychellois Rupee",
        "SDG": "Sudanese Pound",
        "SEK": "Swedish Krona",
        "SGD": "Singapore Dollar",
        "SHP": "Saint Helena Pound",
        "SLL": "Sierra Leonean Leone",
        "SOS": "Somali Shilling",
        "SRD": "Surinamese Dollar",
        "SSP": "South Sudanese Pound",
        "STN": "São Tomé and Príncipe Dobra",
        "SYP": "Syrian Pound",
        "SZL": "Swazi Lilangeni",
        "THB": "Thai Baht",
        "TJS": "Tajikistani Somoni",
        "TMT": "Turkmenistani Manat",
        "TND": "Tunisian Dinar",
        "TOP": "Tongan Pa'anga",
        "TRY": "Turkish Lira",
        "TTD": "Trinidad and Tobago Dollar",
        "TVD": "Tuvaluan Dollar",
        "TWD": "New Taiwan Dollar",
        "TZS": "Tanzanian Shilling",
        "UAH": "Ukrainian Hryvnia",
        "UGX": "Ugandan Shilling",
        "USD": "United States Dollar",
        "UYU": "Uruguayan Peso",
        "UZS": "Uzbekistan Som",
        "VES": "Venezuelan Bolívar Soberano",
        "VND": "Vietnamese Dong",
        "VUV": "Vanuatu Vatu",
        "WST": "Samoan Tala",
        "XAF": "CFA Franc BEAC",
        "XCD": "East Caribbean Dollar",
        "XOF": "CFA Franc BCEAO",
        "XPF": "CFP Franc",
        "YER": "Yemeni Rial",
        "ZAR": "South African Rand",
        "ZMW": "Zambian Kwacha",
        "ZWL": "Zimbabwean Dollar"
    };

    // Initialize the currency converter
    async function initCurrencyConverter() {
        showLoading();
        
        // Set currency data immediately to ensure dropdowns are populated
        populateCurrencyDropdowns();
        
        try {
            // Try to fetch actual exchange rates from API
            const response = await fetch('https://open.er-api.com/v6/latest/USD');
            const data = await response.json();
            
            if (data && data.rates) {
                exchangeRates = data.rates;
                const lastUpdatedDate = new Date();
                lastUpdated.textContent = `Last Updated: ${lastUpdatedDate.toLocaleDateString()} ${lastUpdatedDate.toLocaleTimeString()}`;
                hideLoading();
                showMessage('success', 'Exchange rates loaded successfully!');
            } else {
                throw new Error('Invalid API response');
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            
            // Fallback to hardcoded rates if API fails
            exchangeRates = fallbackRates;
            const lastUpdatedDate = new Date();
            lastUpdated.textContent = `Last Updated: ${lastUpdatedDate.toLocaleDateString()} (using backup rates)`;
            
            hideLoading();
            showMessage('warning', 'Using backup exchange rates. Some currencies might not be available.');
        }
        
        // Set default values - INR to USD as requested
        setTimeout(() => {
            if (fromCurrency.options.length > 0) {
                const inrOption = Array.from(fromCurrency.options).find(option => option.value === 'INR');
                if (inrOption) {
                    fromCurrency.value = 'INR';
                }
                
                const usdOption = Array.from(toCurrency.options).find(option => option.value === 'USD');
                if (usdOption) {
                    toCurrency.value = 'USD';
                }
                
                // Trigger initial conversion
                convertCurrency();
            }
        }, 100);
    }

    // Populate currency dropdowns
    function populateCurrencyDropdowns() {
        // Clear existing options
        fromCurrency.innerHTML = '';
        toCurrency.innerHTML = '';
        
        // Sort currencies by name for better UX
        const sortedCurrencies = Object.entries(currencies).sort((a, b) => {
            return a[1].localeCompare(b[1]);
        });

        // Create options for dropdown
        sortedCurrencies.forEach(([code, name]) => {
            const fromOption = document.createElement('option');
            fromOption.value = code;
            fromOption.textContent = `${code} - ${name}`;
            fromCurrency.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = code;
            toOption.textContent = `${code} - ${name}`;
            toCurrency.appendChild(toOption);
        });
    }

    // Convert currency
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        
        if (isNaN(amount) || amount <= 0) {
            showMessage('error', 'Please enter a valid amount greater than zero.');
            return;
        }
        
        // Check if currencies are available in our rates
        if (!exchangeRates || (!exchangeRates[from] && from !== 'USD') || (!exchangeRates[to] && to !== 'USD')) {
            showMessage('error', 'Exchange rate not available for the selected currencies.');
            return;
        }
        
        // Calculate conversion (handle USD as base case)
        let convertedAmount;
        let rate;
        
        if (from === 'USD') {
            rate = exchangeRates[to];
            convertedAmount = amount * rate;
        } else if (to === 'USD') {
            rate = 1 / exchangeRates[from];
            convertedAmount = amount * rate;
        } else {
            // Cross-rate calculation
            const fromRate = exchangeRates[from];
            const toRate = exchangeRates[to];
            rate = toRate / fromRate;
            convertedAmount = (amount / fromRate) * toRate;
        }
        
        // Display result
        resultContainer.classList.remove('hide');
        conversionResult.textContent = `${amount.toFixed(2)} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
        conversionRate.textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
        
        // Show success message
        showMessage('success', 'Conversion completed successfully!');
    }

    // Show message
    function showMessage(type, text) {
        const messageContainer = document.getElementById('message-container');
        if (!messageContainer) {
            const container = document.createElement('div');
            container.id = 'message-container';
            document.querySelector('.converter-card').appendChild(container);
        }
        
        // Clear existing messages of the same type
        const existingMessages = document.querySelectorAll(`.${type}-message`);
        existingMessages.forEach(msg => msg.remove());
        
        const message = document.createElement('div');
        message.className = `message ${type}-message`;
        message.textContent = text;
        
        document.getElementById('message-container').appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            message.classList.add('fade-out');
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 5000);
    }

    // Swap currencies
    function swapCurrencies() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        
        // Trigger conversion immediately after swap for better UX
        convertCurrency();
    }

    // Show loading state
    function showLoading() {
        loadingMessage.classList.remove('hide');
        resultContainer.classList.add('hide');
        errorMessage.classList.add('hide');
    }

    // Show error state
    function showError() {
        loadingMessage.classList.add('hide');
        resultContainer.classList.add('hide');
        errorMessage.classList.remove('hide');
    }

    // Hide loading state
    function hideLoading() {
        loadingMessage.classList.add('hide');
    }

    // Event listeners
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    
    // Convert on Enter key in amount input
    amountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });
    
    // Add currency symbol to amount input
    amountInput.addEventListener('focus', function() {
        const selectedCurrency = fromCurrency.value;
        document.querySelector('.currency-symbol').textContent = getCurrencySymbol(selectedCurrency);
    });
    
    fromCurrency.addEventListener('change', function() {
        const selectedCurrency = fromCurrency.value;
        document.querySelector('.currency-symbol').textContent = getCurrencySymbol(selectedCurrency);
    });
    
    // Get currency symbol
    function getCurrencySymbol(currencyCode) {
        const symbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥',
            'INR': '₹',
            'CNY': '¥',
            'RUB': '₽',
            'BRL': 'R$',
            'KRW': '₩',
            'AUD': 'A$',
            'CAD': 'C$'
        };
        
        return symbols[currencyCode] || currencyCode;
    }
    
    // Initialize on page load
    initCurrencyConverter();
});


























// document.addEventListener('DOMContentLoaded', () => {
//     // DOM Elements
//     const amountInput = document.getElementById('amount');
//     const fromCurrency = document.getElementById('from-currency');
//     const toCurrency = document.getElementById('to-currency');
//     const swapBtn = document.getElementById('swap');
//     const convertBtn = document.getElementById('convert-btn');
//     const resultContainer = document.querySelector('.result-container');
//     const conversionResult = document.getElementById('conversion-result');
//     const conversionRate = document.getElementById('conversion-rate');
//     const lastUpdated = document.getElementById('last-updated');
//     const loadingMessage = document.querySelector('.loading-message');
//     const errorMessage = document.querySelector('.error-message');

//     // Hardcoded exchange rates (fallback if API fails)
//     const fallbackRates = {
//         "USD": 1,
//         "EUR": 0.92,
//         "GBP": 0.79,
//         "JPY": 151.55,
//         "AUD": 1.51,
//         "CAD": 1.37,
//         "CHF": 0.89,
//         "CNY": 7.23,
//         "INR": 83.47,
//         "MXN": 16.74,
//         "RUB": 88.96,
//         "ZAR": 18.22,
//         "BRL": 5.04,
//         "AED": 3.67,
//         "SAR": 3.75,
//         "SGD": 1.34,
//         "NZD": 1.62
//     };

//     // Currency list (hardcoded to ensure availability)
//     const currencies = {
//         "AED": "United Arab Emirates Dirham",
//         "AFN": "Afghan Afghani",
//         "ALL": "Albanian Lek",
//         "AMD": "Armenian Dram",
//         "ANG": "Netherlands Antillean Guilder",
//         "AOA": "Angolan Kwanza",
//         "ARS": "Argentine Peso",
//         "AUD": "Australian Dollar",
//         "AWG": "Aruban Florin",
//         "AZN": "Azerbaijani Manat",
//         "BAM": "Bosnia-Herzegovina Convertible Mark",
//         "BBD": "Barbadian Dollar",
//         "BDT": "Bangladeshi Taka",
//         "BGN": "Bulgarian Lev",
//         "BHD": "Bahraini Dinar",
//         "BIF": "Burundian Franc",
//         "BMD": "Bermudan Dollar",
//         "BND": "Brunei Dollar",
//         "BOB": "Bolivian Boliviano",
//         "BRL": "Brazilian Real",
//         "BSD": "Bahamian Dollar",
//         "BTN": "Bhutanese Ngultrum",
//         "BWP": "Botswanan Pula",
//         "BYN": "Belarusian Ruble",
//         "BZD": "Belize Dollar",
//         "CAD": "Canadian Dollar",
//         "CDF": "Congolese Franc",
//         "CHF": "Swiss Franc",
//         "CLP": "Chilean Peso",
//         "CNY": "Chinese Yuan",
//         "COP": "Colombian Peso",
//         "CRC": "Costa Rican Colón",
//         "CUP": "Cuban Peso",
//         "CVE": "Cape Verdean Escudo",
//         "CZK": "Czech Republic Koruna",
//         "DJF": "Djiboutian Franc",
//         "DKK": "Danish Krone",
//         "DOP": "Dominican Peso",
//         "DZD": "Algerian Dinar",
//         "EGP": "Egyptian Pound",
//         "ERN": "Eritrean Nakfa",
//         "ETB": "Ethiopian Birr",
//         "EUR": "Euro",
//         "FJD": "Fijian Dollar",
//         "FKP": "Falkland Islands Pound",
//         "FOK": "Faroese Króna",
//         "GBP": "British Pound Sterling",
//         "GEL": "Georgian Lari",
//         "GGP": "Guernsey Pound",
//         "GHS": "Ghanaian Cedi",
//         "GIP": "Gibraltar Pound",
//         "GMD": "Gambian Dalasi",
//         "GNF": "Guinean Franc",
//         "GTQ": "Guatemalan Quetzal",
//         "GYD": "Guyanaese Dollar",
//         "HKD": "Hong Kong Dollar",
//         "HNL": "Honduran Lempira",
//         "HRK": "Croatian Kuna",
//         "HTG": "Haitian Gourde",
//         "HUF": "Hungarian Forint",
//         "IDR": "Indonesian Rupiah",
//         "ILS": "Israeli New Shekel",
//         "IMP": "Manx pound",
//         "INR": "Indian Rupee",
//         "IQD": "Iraqi Dinar",
//         "IRR": "Iranian Rial",
//         "ISK": "Icelandic Króna",
//         "JEP": "Jersey Pound",
//         "JMD": "Jamaican Dollar",
//         "JOD": "Jordanian Dinar",
//         "JPY": "Japanese Yen",
//         "KES": "Kenyan Shilling",
//         "KGS": "Kyrgystani Som",
//         "KHR": "Cambodian Riel",
//         "KID": "Kiribati Dollar",
//         "KMF": "Comorian Franc",
//         "KRW": "South Korean Won",
//         "KWD": "Kuwaiti Dinar",
//         "KYD": "Cayman Islands Dollar",
//         "KZT": "Kazakhstani Tenge",
//         "LAK": "Laotian Kip",
//         "LBP": "Lebanese Pound",
//         "LKR": "Sri Lankan Rupee",
//         "LRD": "Liberian Dollar",
//         "LSL": "Lesotho Loti",
//         "LYD": "Libyan Dinar",
//         "MAD": "Moroccan Dirham",
//         "MDL": "Moldovan Leu",
//         "MGA": "Malagasy Ariary",
//         "MKD": "Macedonian Denar",
//         "MMK": "Myanmar Kyat",
//         "MNT": "Mongolian Tugrik",
//         "MOP": "Macanese Pataca",
//         "MRU": "Mauritanian Ouguiya",
//         "MUR": "Mauritian Rupee",
//         "MVR": "Maldivian Rufiyaa",
//         "MWK": "Malawian Kwacha",
//         "MXN": "Mexican Peso",
//         "MYR": "Malaysian Ringgit",
//         "MZN": "Mozambican Metical",
//         "NAD": "Namibian Dollar",
//         "NGN": "Nigerian Naira",
//         "NIO": "Nicaraguan Córdoba",
//         "NOK": "Norwegian Krone",
//         "NPR": "Nepalese Rupee",
//         "NZD": "New Zealand Dollar",
//         "OMR": "Omani Rial",
//         "PAB": "Panamanian Balboa",
//         "PEN": "Peruvian Nuevo Sol",
//         "PGK": "Papua New Guinean Kina",
//         "PHP": "Philippine Peso",
//         "PKR": "Pakistani Rupee",
//         "PLN": "Polish Złoty",
//         "PYG": "Paraguayan Guarani",
//         "QAR": "Qatari Rial",
//         "RON": "Romanian Leu",
//         "RSD": "Serbian Dinar",
//         "RUB": "Russian Ruble",
//         "RWF": "Rwandan Franc",
//         "SAR": "Saudi Riyal",
//         "SBD": "Solomon Islands Dollar",
//         "SCR": "Seychellois Rupee",
//         "SDG": "Sudanese Pound",
//         "SEK": "Swedish Krona",
//         "SGD": "Singapore Dollar",
//         "SHP": "Saint Helena Pound",
//         "SLL": "Sierra Leonean Leone",
//         "SOS": "Somali Shilling",
//         "SRD": "Surinamese Dollar",
//         "SSP": "South Sudanese Pound",
//         "STN": "São Tomé and Príncipe Dobra",
//         "SYP": "Syrian Pound",
//         "SZL": "Swazi Lilangeni",
//         "THB": "Thai Baht",
//         "TJS": "Tajikistani Somoni",
//         "TMT": "Turkmenistani Manat",
//         "TND": "Tunisian Dinar",
//         "TOP": "Tongan Pa'anga",
//         "TRY": "Turkish Lira",
//         "TTD": "Trinidad and Tobago Dollar",
//         "TVD": "Tuvaluan Dollar",
//         "TWD": "New Taiwan Dollar",
//         "TZS": "Tanzanian Shilling",
//         "UAH": "Ukrainian Hryvnia",
//         "UGX": "Ugandan Shilling",
//         "USD": "United States Dollar",
//         "UYU": "Uruguayan Peso",
//         "UZS": "Uzbekistan Som",
//         "VES": "Venezuelan Bolívar Soberano",
//         "VND": "Vietnamese Dong",
//         "VUV": "Vanuatu Vatu",
//         "WST": "Samoan Tala",
//         "XAF": "CFA Franc BEAC",
//         "XCD": "East Caribbean Dollar",
//         "XOF": "CFA Franc BCEAO",
//         "XPF": "CFP Franc",
//         "YER": "Yemeni Rial",
//         "ZAR": "South African Rand",
//         "ZMW": "Zambian Kwacha",
//         "ZWL": "Zimbabwean Dollar"
//     };

//     // Initialize the currency converter
//     async function initCurrencyConverter() {
//         showLoading();
        
//         // Set currency data immediately to ensure dropdowns are populated
//         populateCurrencyDropdowns();
        
//         try {
//             // Try to fetch actual exchange rates from API
//             const response = await fetch('https://open.er-api.com/v6/latest/USD');
//             const data = await response.json();
            
//             if (data && data.rates) {
//                 exchangeRates = data.rates;
//                 const lastUpdatedDate = new Date();
//                 lastUpdated.textContent = `Last Updated: ${lastUpdatedDate.toLocaleDateString()} ${lastUpdatedDate.toLocaleTimeString()}`;
//                 hideLoading();
//                 showMessage('success', 'Exchange rates loaded successfully!');
//             } else {
//                 throw new Error('Invalid API response');
//             }
//         } catch (error) {
//             console.error('Error fetching exchange rates:', error);
            
//             // Fallback to hardcoded rates if API fails
//             exchangeRates = fallbackRates;
//             const lastUpdatedDate = new Date();
//             lastUpdated.textContent = `Last Updated: ${lastUpdatedDate.toLocaleDateString()} (using backup rates)`;
            
//             hideLoading();
//             showMessage('warning', 'Using backup exchange rates. Some currencies might not be available.');
//         }
        
//         // Set default values - INR to USD as requested
//         setTimeout(() => {
//             if (fromCurrency.options.length > 0) {
//                 const inrOption = Array.from(fromCurrency.options).find(option => option.value === 'INR');
//                 if (inrOption) {
//                     fromCurrency.value = 'INR';
//                 }
                
//                 const usdOption = Array.from(toCurrency.options).find(option => option.value === 'USD');
//                 if (usdOption) {
//                     toCurrency.value = 'USD';
//                 }
                
//                 // Trigger initial conversion
//                 convertCurrency();
//             }
//         }, 100);
//     }

//     // Populate currency dropdowns
//     function populateCurrencyDropdowns() {
//         // Clear existing options
//         fromCurrency.innerHTML = '';
//         toCurrency.innerHTML = '';
        
//         // Sort currencies by name for better UX
//         const sortedCurrencies = Object.entries(currencies).sort((a, b) => {
//             return a[1].localeCompare(b[1]);
//         });

//         // Create options for dropdown
//         sortedCurrencies.forEach(([code, name]) => {
//             const fromOption = document.createElement('option');
//             fromOption.value = code;
//             fromOption.textContent = `${code} - ${name}`;
//             fromCurrency.appendChild(fromOption);
            
//             const toOption = document.createElement('option');
//             toOption.value = code;
//             toOption.textContent = `${code} - ${name}`;
//             toCurrency.appendChild(toOption);
//         });
//     }

//     // Convert currency
//     function convertCurrency() {
//         const amount = parseFloat(amountInput.value);
//         const from = fromCurrency.value;
//         const to = toCurrency.value;
        
//         if (isNaN(amount) || amount <= 0) {
//             showMessage('error', 'Please enter a valid amount greater than zero.');
//             return;
//         }
        
//         // Check if currencies are available in our rates
//         if (!exchangeRates || (!exchangeRates[from] && from !== 'USD') || (!exchangeRates[to] && to !== 'USD')) {
//             showMessage('error', 'Exchange rate not available for the selected currencies.');
//             return;
//         }
        
//         // Calculate conversion (handle USD as base case)
//         let convertedAmount;
//         let rate;
        
//         if (from === 'USD') {
//             rate = exchangeRates[to];
//             convertedAmount = amount * rate;
//         } else if (to === 'USD') {
//             rate = 1 / exchangeRates[from];
//             convertedAmount = amount * rate;
//         } else {
//             // Cross-rate calculation
//             const fromRate = exchangeRates[from];
//             const toRate = exchangeRates[to];
//             rate = toRate / fromRate;
//             convertedAmount = (amount / fromRate) * toRate;
//         }
        
//         // Display result
//         resultContainer.classList.remove('hide');
//         conversionResult.textContent = `${amount.toFixed(2)} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
//         conversionRate.textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
        
//         // Show success message
//         showMessage('success', 'Conversion completed successfully!');
//     }

//     // Show message
//     function showMessage(type, text) {
//         const messageContainer = document.getElementById('message-container');
//         if (!messageContainer) {
//             const container = document.createElement('div');
//             container.id = 'message-container';
//             document.querySelector('.converter-card').appendChild(container);
//         }
        
//         // Clear existing messages of the same type
//         const existingMessages = document.querySelectorAll(`.${type}-message`);
//         existingMessages.forEach(msg => msg.remove());
        
//         const message = document.createElement('div');
//         message.className = `message ${type}-message`;
//         message.textContent = text;
        
//         document.getElementById('message-container').appendChild(message);
        
//         // Auto-remove after 5 seconds
//         setTimeout(() => {
//             message.classList.add('fade-out');
//             setTimeout(() => {
//                 message.remove();
//             }, 500);
//         }, 5000);
//     }

//     // Swap currencies
//     function swapCurrencies() {
//         const temp = fromCurrency.value;
//         fromCurrency.value = toCurrency.value;
//         toCurrency.value = temp;
        
//         // Trigger conversion immediately after swap for better UX
//         convertCurrency();
//     }

//     // Show loading state
//     function showLoading() {
//         loadingMessage.classList.remove('hide');
//         resultContainer.classList.add('hide');
//         errorMessage.classList.add('hide');
//     }

//     // Show error state
//     function showError() {
//         loadingMessage.classList.add('hide');
//         resultContainer.classList.add('hide');
//         errorMessage.classList.remove('hide');
//     }

//     // Hide loading state
//     function hideLoading() {
//         loadingMessage.classList.add('hide');
//     }

//     // Event listeners
//     convertBtn.addEventListener('click', convertCurrency);
//     swapBtn.addEventListener('click', swapCurrencies);
    
//     // Convert on Enter key in amount input
//     amountInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             convertCurrency();
//         }
//     });
    
//     // Add currency symbol to amount input
//     amountInput.addEventListener('focus', function() {
//         const selectedCurrency = fromCurrency.value;
//         document.querySelector('.currency-symbol').textContent = getCurrencySymbol(selectedCurrency);
//     });
    
//     fromCurrency.addEventListener('change', function() {
//         const selectedCurrency = fromCurrency.value;
//         document.querySelector('.currency-symbol').textContent = getCurrencySymbol(selectedCurrency);
//     });
    
//     // Get currency symbol
//     function getCurrencySymbol(currencyCode) {
//         const symbols = {
//             'USD': '$',
//             'EUR': '€',
//             'GBP': '£',
//             'JPY': '¥',
//             'INR': '₹',
//             'CNY': '¥',
//             'RUB': '₽',
//             'BRL': 'R$',
//             'KRW': '₩',
//             'AUD': 'A$',
//             'CAD': 'C$'
//         };
        
//         return symbols[currencyCode] || currencyCode;
//     }
    
//     // Initialize on page load
//     initCurrencyConverter();
// });
