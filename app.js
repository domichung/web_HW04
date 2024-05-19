document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch gas prices for the selected date
    function fetchGasPrices(selectedDate) {
        fetch('/show_prices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selected_date: selectedDate })
        })
        .then(response => response.json())
        .then(data => {
            displayGasPrices(data);
        })
        .catch(error => console.error('Error fetching gas prices:', error));
    }

    // Function to display gas prices on the page
    function displayGasPrices(gasPrices) {
        const gasPricesDiv = document.getElementById('gasPrices');
        gasPricesDiv.innerHTML = ''; // Clear previous content

        gasPrices.forEach(entry => {
            const gasPriceHtml = `
                <h3>調價日期: ${entry.調價日期}</h3>
                <ul>
                    <li>家用液化石油氣氣 (經銷商) 每公斤元: ${entry.家用液化石油氣氣_經銷商_每公斤元}</li>
                    <li>工業用丙烷 每公斤元: ${entry.工業用丙烷_每公斤元}</li>
                    <li>工業用丙丁烷 每公斤元: ${entry.工業用丙丁烷_每公斤元}</li>
                    <li>工業用丁烷 每公斤元: ${entry.工業用丁烷_每公斤元}</li>
                    <li>車輛用 (民營加氣站) 每公斤元: ${entry.車輛用_民營加氣站_每公斤元}</li>
                    <li>車輛用 (一般民眾) 每公升元: ${entry.車輛用_一般民眾_每公升元}</li>
                </ul>
            `;
            gasPricesDiv.innerHTML += gasPriceHtml;
        });
    }

    // Event listener for form submission
    document.getElementById('dateForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        const selectedDate = document.getElementById('selectedDate').value;
        fetchGasPrices(selectedDate);
    });

    // Function to populate dates dropdown
    function populateDatesDropdown(dates) {
        const dropdown = document.getElementById('selectedDate');
        dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            dropdown.appendChild(option);
        });
    }

    // Fetch dates and populate dropdown on page load
    fetch('/')
    .then(response => response.json())
    .then(data => {
        populateDatesDropdown(data.dates);
    })
    .catch(error => console.error('Error fetching dates:', error));
});
