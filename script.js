console.log('Script is running...');

// Function to fetch and process JSON data
function fetchAndProcessJSON() {
    // Fetching and processing JSON data
    fetch('production_jobs_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON Data:', data); // JSON data is logged

            if (data && data.production_jobs && data.production_jobs.length > 0) {
                const jobTitles = data.production_jobs.map(job => job.title);
                console.log('Job Titles:', jobTitles); // Job titles from JSON data are logged

                const jobTitlesOutput = document.getElementById('jobTitles');
                jobTitlesOutput.textContent = 'Job Titles: ' + jobTitles.join(', ');
            } else {
                console.error('Invalid JSON format or empty production_jobs array.');
            }
        })
        .catch(error => console.error('Error fetching or parsing JSON:', error));
}

// Function to fetch and process XML data
function fetchAndProcessXML() {
    // Fetching and processing XML data
    fetch('employee_data.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Check if XML parsing was successful
            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error('Error parsing XML');
            }

            console.log('XML Data:', xmlDoc); // XML data is logged

            const employeeNameElements = xmlDoc.getElementsByTagName('name');
            const employeeNamesFromXML = Array.from(employeeNameElements).map(nameElement => nameElement.textContent);
            console.log('Employee Names from XML:', employeeNamesFromXML); // Employee names from XML data are logged

            // Display employee names on the webpage
            const employeeNamesOutput = document.getElementById('employeeNames');
            employeeNamesOutput.textContent = 'Employee Names: ' + employeeNamesFromXML.join(', ');
        })
        .catch(error => console.error('Error fetching or parsing XML:', error));
}

// Function to fetch and process both JSON and XML data
function fetchAndProcessData() {
    // Calling both JSON and XML data fetching functions
    fetchAndProcessJSON();
    fetchAndProcessXML();
}

// Call the combined function
fetchAndProcessData();
