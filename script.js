console.log('Script is running...');

// Function to fetch and process JSON data
function fetchAndProcessJSON() {
    fetch('production_jobs_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('JSON Data:', data);

            if (data && data.production_jobs && data.production_jobs.length > 0) {
                const jobTitles = data.production_jobs.map(job => job.title);
                console.log('Job Titles from JSON:', jobTitles);

                const jobTitlesOutput = document.getElementById('jobTitles');
                if (jobTitlesOutput) {
                    jobTitlesOutput.textContent = 'Job Titles from JSON: ' + jobTitles.join(', ');
                } else {
                    console.error('Element with ID "jobTitles" not found.');
                }
            } else {
                console.error('Invalid JSON format or empty production_jobs array.');
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error.message);
        });
}

// Function to fetch and process XML data
function fetchAndProcessXML() {
    fetch('employee_data.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error('Error parsing XML');
            }

            console.log('XML Data:', xmlDoc);

            const employeeNameElements = xmlDoc.getElementsByTagName('name');
            const employeeNamesFromXML = Array.from(employeeNameElements).map(nameElement => nameElement.textContent);
            console.log('Employee Names from XML:', employeeNamesFromXML);

            const employeeNamesOutput = document.getElementById('employeeNames');
            if (employeeNamesOutput) {
                employeeNamesOutput.textContent = 'Employee Names from XML: ' + employeeNamesFromXML.join(', ');
            } else {
                console.error('Element with ID "employeeNames" not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing XML:', error.message);
        });
}

// Function to fetch and process both JSON and XML data
function fetchAndProcessData() {
    fetchAndProcessJSON();
    fetchAndProcessXML();
}

// Call the combined function after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', fetchAndProcessData);
