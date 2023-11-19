// script.js

// Fetch and process JSON data
fetch('production_jobs_data.json')
  .then(response => response.json())
  .then(data => {
    console.log('JSON Data:', data);

    // Perform client-side manipulation with JSON data

    const jobTitles = data.production_jobs.map(job => job.job_title);
    console.log('Job Titles:', jobTitles);
  })
  .catch(error => console.error('Error fetching JSON:', error));

// Fetch and process XML data
fetch('employee_data.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    console.log('XML Data:', xmlDoc);

    // Perform client-side manipulation with XML data
    // For example, extract employee names from XML
    const employeeNameElements = xmlDoc.getElementsByTagName('name');
    const employeeNamesFromXML = Array.from(employeeNameElements).map(nameElement => nameElement.textContent);
    console.log('Employee Names from XML:', employeeNamesFromXML);
  })
  .catch(error => console.error('Error fetching XML:', error));
