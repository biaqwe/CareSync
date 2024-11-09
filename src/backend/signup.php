<?php
    session_start();

    $servername = "localhost"; 
    $username = "root"; 
    $password = ""; 
    $dbname = "CareSync"; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error){
        die("Connection failed: " . $conn->connect_error);
    }

    // Get user input
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    $phoneNumber = $_POST['phoneNumber']; // Optional
    $birthDate = $_POST['birthDate']; // Optional
    $gender = $_POST['gender']; // Optional
    $address = $_POST['address']; // Optional

    // Check if passwords match
    if($password !== $confirmPassword){
        header("location: ../html/signup.html?error=dontMatch");
        exit();
    }

    // Check if the email already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($emailCount);
    $stmt->fetch();
    $stmt->close();

    if($emailCount > 0){
        header("location: ../html/signup.html?error=emailExists");
        exit();
    }

    // Check if the username already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($usernameCount);
    $stmt->fetch();
    $stmt->close();

    if($usernameCount > 0){
        header("location: ../html/signup.html?error=usernameExists");
        exit();
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password_hash, phone_number, birth_date, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $firstName, $lastName, $email, $hashedPassword, $phoneNumber, $birthDate, $gender, $address);

    if($stmt->execute()){
        header("location: ../html/login.html");
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
?>
