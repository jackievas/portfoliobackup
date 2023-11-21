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
                const jobDetails = data.production_jobs
                    .map(job => `<tr><td>${job.title}</td><td>${job.salary}</td><td>${job.qualifications.join(', ')}</td></tr>`);
                console.log('Job Details from JSON:', jobDetails); // Job details from JSON data are logged

                const jobDetailsOutput = document.getElementById('jobTableBody');
                if (jobDetailsOutput) {
                    jobDetailsOutput.innerHTML = jobDetails.join('');
                } else {
                    console.error('Element with ID "jobTableBody" not found.');
                }
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

            const employeeElements = xmlDoc.getElementsByTagName('employee');
            const employeeDetails = Array.from(employeeElements)
                .map(employee => {
                    const id = employee.querySelector('id').textContent;
                    const name = employee.querySelector('name').textContent;
                    const position = employee.querySelector('position').textContent;
                    return `<tr><td>${id}</td><td>${name}</td><td>${position}</td></tr>`;
                });

            console.log('Employee Details from XML:', employeeDetails); // Employee details from XML data are logged

            const employeeTableBody = document.getElementById('employeeTableBody');
            if (employeeTableBody) {
                employeeTableBody.innerHTML = employeeDetails.join('');
            } else {
                console.error('Element with ID "employeeTableBody" not found.');
            }
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
document.addEventListener('DOMContentLoaded', fetchAndProcessData);
