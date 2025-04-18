<?php
header("Access-Control-Allow-Origin: *"); // allow all origins for dev
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include("db.php");


// Get JSON input
$data = json_decode(file_get_contents("php://input"));
$username = $data->username ?? '';
$password = md5($data->password ?? ''); // MD5 just for demo

// Prepare & run SQL
$sql = "SELECT * FROM users WHERE username = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $user = $result->fetch_assoc();
  echo json_encode([
    "success" => true,
    "message" => "Login successful",
    "user" => [
      "id" => $user["id"],
      "username" => $user["username"],
      "role" => $user["role"]
    ]
  ]);
} else {
  echo json_encode([
    "success" => false,
    "message" => "Invalid username or password"
  ]);
}
?>
