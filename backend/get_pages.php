<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

$sql = "SELECT page_id, page_title, created_date, meta_desc, meta_title, page_content FROM page_master ORDER BY page_id ASC";
$result = $conn->query($sql);

$pages = [];

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $pages[] = $row;
        }
        echo json_encode(["success" => true, "data" => $pages]);
    } else {
        echo json_encode(["success" => true, "data" => [], "message" => "No pages found."]);
    }
    $result->free();
} else {
    echo json_encode(["success" => false, "message" => "Error fetching pages: " . $conn->error]);
}

$conn->close();
?>
