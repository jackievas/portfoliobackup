// script.js

console.log('Script is running...');

// Function to fetch and process JSON data
function fetchAndProcessJSON() {
    fetch('production_jobs_data.json')
        .then(response => response.json())
        .then(data => {
            console.log('JSON Data:', data);

            if (data.production_jobs) {
                const jobTitles = data.production_jobs.map(job => job.title);
                console.log('Job Titles:', jobTitles);

                const jobTitlesOutput = document.getElementById('jobTitles');
                jobTitlesOutput.textContent = 'Job Titles: ' + jobTitles.join(', ');
            } else {
                console.error('Invalid JSON format. Check the structure of production_jobs_data.json.');
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Function to fetch and process XML data
function fetchAndProcessXML() {
    fetch('employee_data.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            console.log('XML Data:', xmlDoc);

         
            const employeeNameElements = xmlDoc.getElementsByTagName('name');
            const employeeNamesFromXML = Array.from(employeeNameElements).map(nameElement => nameElement.textContent);
            console.log('Employee Names from XML:', employeeNamesFromXML);

            // Display employee names on the webpage
            const employeeNamesOutput = document.getElementById('employeeNames');
            employeeNamesOutput.textContent = 'Employee Names: ' + employeeNamesFromXML.join(', ');
        })
        .catch(error => console.error('Error fetching XML:', error));
}
