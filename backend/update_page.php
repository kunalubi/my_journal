<?php
// backend/api/update_page.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Added Authorization just in case
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php'; // Adjust path

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pageId = $_POST['pageId'] ?? null;
    $pageTitle = htmlspecialchars(strip_tags($_POST['pageTitle'] ?? ''));
    $metaTitle = htmlspecialchars(strip_tags($_POST['metaTitle'] ?? ''));
    $metaDescription = htmlspecialchars(strip_tags($_POST['metaDescription'] ?? ''));
    // Ensure pageContent is not strip_tags if you want HTML content
    $pageContent = $_POST['pageContent'] ?? ''; // Keep HTML if intended

    if (!$pageId || !is_numeric($pageId)) { // Validate pageId
        echo json_encode(["success" => false, "message" => "Invalid or missing page ID for update."]);
        exit();
    }

    $currentDateTime = date('Y-m-d H:i:s'); // Get current timestamp for modified_date

    // Corrected 'content' to 'page_content' and added 'modified_date'
    $sql = "UPDATE page_master SET
                page_title = ?,
                meta_title = ?,
                meta_desc = ?,
                page_content = ?,
                modified_date = ?
            WHERE page_id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("sssssi", $pageTitle, $metaTitle, $metaDescription, $pageContent, $currentDateTime, $pageId); // 5 strings, 1 integer (pageId)
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                 echo json_encode(["success" => true, "message" => "Page updated successfully!", "page_id" => $pageId]);
            } else {
                 echo json_encode(["success" => false, "message" => "No changes made or page with ID {$pageId} not found."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "SQL prepare error: " . $conn->error]);
    }

    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>