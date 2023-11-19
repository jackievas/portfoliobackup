<?php
// server-side.php

// Process JSON data
$jsonStringProduction = file_get_contents('production_jobs_data.json');
$jsonDataProduction = json_decode($jsonStringProduction, true);
echo 'Production Jobs Data:<pre>' . print_r($jsonDataProduction, true) . '</pre>';

// Process XML data
$xmlString = file_get_contents('employee_data.xml');
$xmlData = simplexml_load_string($xmlString);
echo 'Employee Data XML:<pre>' . print_r($xmlData, true) . '</pre>';
?>
