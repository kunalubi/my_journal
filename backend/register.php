<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $salutation     = $_POST['Salutation'] ?? '';
    $name           = $_POST['Name'] ?? '';
    $email          = $_POST['Email'] ?? '';
    $phone          = $_POST['Phone'] ?? '';
    $password       = $_POST['Password'] ?? '';
    $qualification  = $_POST['Qualification'] ?? '';
    $orc_id         = $_POST['Orc_id'] ?? '';
    $user_type      = $_POST['User_Type'] ?? '';
    $country        = $_POST['Country'] ?? '';
    $state          = $_POST['State'] ?? '';
    $address        = $_POST['Address'] ?? '';

    // Derived/auto fields
    $status         = 1;
    $type           = $user_type;
    $user_name      = $email;
    $created_date   = date("Y-m-d H:i:s");

    $conn = new mysqli("localhost", "root", "", "my_journal");

    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO user_login 
        (user_name, Email, pwd, status, Type, Salutation, First_Name, Qualification, Address, State, Country, Mobile, org_id, created_date, user_type, orcid) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    // You can use org_id as static for now or fetch dynamically
    $org_id = 1;

    $stmt->bind_param(
        "sssissssssssisss", 
        $user_name, 
        $email, 
        $password, 
        $status, 
        $type, 
        $salutation, 
        $name, 
        $qualification, 
        $address, 
        $state, 
        $country, 
        $phone, 
        $org_id, 
        $created_date, 
        $user_type, 
        $orc_id
    );

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}
