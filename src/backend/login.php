<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Match your React app origin
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "CareSync";
$port = 8000; // Specify the port, commonly 3306 for MySQL

// Error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Create a new connection with all parameters including port
$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Capture and sanitize input
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Debugging: Log input values to PHP error log
error_log("Username: $username, Password: $password");

if (empty($username) || empty($password)) {
    echo json_encode(["error" => "Username or password not provided"]);
    exit();
}

// Prepare statement to fetch user by username
$stmt = $conn->prepare("SELECT user_id, password_hash FROM users WHERE username = ?");
if (!$stmt) {
    echo json_encode(["error" => "Statement preparation failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Check if user exists
if ($stmt->num_rows > 0) {
    $stmt->bind_result($userID, $hashedPassword);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
        $_SESSION['username'] = $username;  
        $_SESSION['userID'] = $userID;
        $_SESSION['logged_in'] = true;
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}

// Clean up
$stmt->close();
$conn->close();
?>
