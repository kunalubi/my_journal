<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include('db.php');

// Handle POST request for profile update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['action']) && $data['action'] === 'update_profile') {
        $login_id = $data['login_id'];
        $user_name = $data['user_name'];
        $email = $data['Email'];
        $mobile = $data['Mobile'];
        $address = $data['Address'];
        $city = $data['City'];
        $state = $data['State'];

        $stmt = $conn->prepare("UPDATE user_login SET 
            user_name = ?, 
            Email = ?, 
            Mobile = ?, 
            Address = ?, 
            City = ?, 
            State = ? 
            WHERE login_id = ? AND status = 1");

        $stmt->bind_param("ssssssi", $user_name, $email, $mobile, $address, $city, $state, $login_id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update profile"]);
        }
        exit;
    }
}

// Handle GET request for fetching user data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = isset($_GET['login_id']) ? intval($_GET['login_id']) : 0;

    if($userId > 0){
        $stmt = $conn->prepare("SELECT login_id, user_name, Email, Mobile, Address, City, State FROM user_login WHERE login_id = ? AND status = 1");
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();

        if ($userData) {
            echo json_encode(["success" => true, "user" => $userData]);
        } else {
            echo json_encode(["success" => false, "message" => "User not found"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid user ID"]);
    }
}

$conn->close();
?>