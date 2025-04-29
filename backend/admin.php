<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

include('db.php');

// Function to send JSON response
function sendJsonResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    if ($data !== null) {
        $response = array_merge($response, $data);
    }
    echo json_encode($response);
    exit;
}

// Handle POST request for profile update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (!isset($_POST['action']) || $_POST['action'] !== 'update_profile') {
            sendJsonResponse(false, 'Invalid action');
        }

        $login_id = $_POST['login_id'];
        $user_name = $_POST['user_name'];
        $email = $_POST['Email'];
        $mobile = $_POST['Mobile'];
        $address = $_POST['Address'];
        $city = $_POST['City'];
        $state = $_POST['State'];
        
        // Handle file upload if present
        $user_image = '';
        if (isset($_FILES['user_image']) && $_FILES['user_image']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = '../public/images/user/';
            
            $file_extension = strtolower(pathinfo($_FILES['user_image']['name'], PATHINFO_EXTENSION));
            $allowed_extensions = array('jpg', 'jpeg', 'png', 'gif');
            
            if (!in_array($file_extension, $allowed_extensions)) {
                sendJsonResponse(false, 'Invalid file type. Only JPG, JPEG, PNG & GIF files are allowed.');
            }

            $new_filename = 'user_' . $login_id . '_' . time() . '.' . $file_extension;
            $upload_path = $upload_dir . $new_filename;
            
            if (!move_uploaded_file($_FILES['user_image']['tmp_name'], $upload_path)) {
                sendJsonResponse(false, 'Failed to upload image');
            }

            $user_image = 'images/user/' . $new_filename;
        }

        // Update database
        $stmt = $conn->prepare("UPDATE user_login SET 
            user_name = ?, 
            Email = ?, 
            Mobile = ?, 
            Address = ?, 
            City = ?, 
            State = ?,
            user_image = CASE WHEN ? != '' THEN ? ELSE user_image END
            WHERE login_id = ? AND status = 1");

        if (!$stmt) {
            sendJsonResponse(false, 'Database error: ' . $conn->error);
        }

        $stmt->bind_param("ssssssssi", 
            $user_name, $email, $mobile, $address, $city, $state, 
            $user_image, $user_image, $login_id);
        
        if (!$stmt->execute()) {
            sendJsonResponse(false, 'Failed to update profile: ' . $stmt->error);
        }

        // Get updated user data
        $stmt = $conn->prepare("SELECT login_id, user_name, Email, Mobile, Address, City, State, user_image 
            FROM user_login WHERE login_id = ? AND status = 1");
        $stmt->bind_param("i", $login_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();

        sendJsonResponse(true, 'Profile updated successfully', ['user' => $userData]);

    } catch (Exception $e) {
        sendJsonResponse(false, 'An error occurred: ' . $e->getMessage());
    }
}

// Handle GET request for fetching user data
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $userId = isset($_GET['login_id']) ? intval($_GET['login_id']) : 0;

        if ($userId <= 0) {
            sendJsonResponse(false, 'Invalid user ID');
        }

        $stmt = $conn->prepare("SELECT login_id, user_name, Email, Mobile, Address, City, State, user_image 
            FROM user_login WHERE login_id = ? AND status = 1");
        
        if (!$stmt) {
            sendJsonResponse(false, 'Database error: ' . $conn->error);
        }

        $stmt->bind_param("i", $userId);
        
        if (!$stmt->execute()) {
            sendJsonResponse(false, 'Failed to fetch user data: ' . $stmt->error);
        }

        $result = $stmt->get_result();
        $userData = $result->fetch_assoc();

        if (!$userData) {
            sendJsonResponse(false, 'User not found');
        }

        sendJsonResponse(true, 'User data fetched successfully', ['user' => $userData]);

    } catch (Exception $e) {
        sendJsonResponse(false, 'An error occurred: ' . $e->getMessage());
    }
}

$conn->close();
?>