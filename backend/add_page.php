<?php
// backend/api/add_page.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // GET is not strictly needed for POST, but harmless
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php'; // Adjust path if db.php is elsewhere (e.g., backend/db.php)

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]); // Added error message
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pageTitle = htmlspecialchars(strip_tags($_POST['pageTitle'] ?? ''));
    $metaTitle = htmlspecialchars(strip_tags($_POST['metaTitle'] ?? ''));
    $metaDescription = htmlspecialchars(strip_tags($_POST['metaDescription'] ?? ''));
    // Ensure pageContent is not strip_tags if you want HTML content
    $pageContent = $_POST['pageContent'] ?? ''; // Keep HTML if intended, but ensure proper display/sanitization on frontend when rendering

    $metaKey = 1;
    $leftComponent = 1;
    $rightComponent = 1;
    $pageSts = 1;
    $pageSort = 0;
    $orgId = 1;
    $currentDateTime = date('Y-m-d H:i:s');

    $sql = "INSERT INTO page_master (
        page_title, created_date, modified_date, meta_title, meta_desc, meta_key,
        left_component, right_component, page_sts, page_content, page_sort, org_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "SQL prepare failed: " . $conn->error]); // Added error message
        $conn->close();
        exit();
    }

    $stmt->bind_param(
        "sssssiiiisii",
        $pageTitle,
        $currentDateTime,
        $currentDateTime,
        $metaTitle,
        $metaDescription,
        $metaKey,
        $leftComponent,
        $rightComponent,
        $pageSts,
        $pageContent,
        $pageSort,
        $orgId
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Page added successfully", "page_id" => $conn->insert_id]);
    } else {
        echo json_encode(["success" => false, "message" => "Error adding page: " . $stmt->error]); // Added error message
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

$conn->close();
?>