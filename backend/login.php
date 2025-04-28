<?php
header("Access-Control-Allow-Origin: *"); // allow all origins for dev
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include("db.php");


// Get JSON input
$data = json_decode(file_get_contents("php://input"));
$user_name = $data->user_name ?? '';
$pwd = $data->pwd ?? '';
$user_type = $data->user_type ?? '';

// Prepare & run SQL
$sql = "SELECT * FROM user_login WHERE user_name = ? AND pwd = ? AND user_type = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $user_name, $pwd, $user_type);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
  "login_id" => $user["login_id"],
  "user_name" => $user["user_name"],
  "user_type" => $user["user_type"]
]
  ]);
} else {
  echo json_encode([
    "success" => false,
    "message" => "Invalid username or password or user type"
  ]);
}
?>
