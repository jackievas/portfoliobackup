function fetchAndProcessXML() {
    fetch('employee_data.xml')
        .then(response => response.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Check if XML parsing was successful
            if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                throw new Error('Error parsing XML');
            }

            console.log('XML Data:', xmlDoc);

            const employeeNameElements = xmlDoc.getElementsByTagName('name');
            const employeeNamesFromXML = Array.from(employeeNameElements).map(nameElement => nameElement.textContent);
            console.log('Employee Names from XML:', employeeNamesFromXML);

            // Display employee names on the webpage
            const employeeNamesOutput = document.getElementById('employeeNames');
            employeeNamesOutput.textContent = 'Employee Names: ' + employeeNamesFromXML.join(', ');
        })
        .catch(error => console.error('Error fetching or parsing XML:', error));
}
