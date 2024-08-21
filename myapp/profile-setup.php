<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Access denied");
}

$host = 'localhost';
$db = 'ziknet';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if (empty($_POST['phone']) || empty($_POST['nationality']) || empty($_POST['country']) || empty($_POST['city']) || empty($_POST['username'])) {
    die("All fields are required.");
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION['user_id'];
    $phone = $_POST['phone'];
    $nationality = $_POST['nationality'];
    $country = $_POST['country'];
    $city = $_POST['city'];
    $birthday = $_POST['birthday'];
    $bio = $_POST['bio'];
    $username = $_POST['username'];
    $contactMethod = $_POST['contactMethod'];
    $gender = $_POST['gender'];
    $cv = ''; // Ajouter la logique pour gérer l'upload de fichier si nécessaire

    // Gestion de l'upload de la photo de profil
    $profilePhoto = '';
    if (isset($_FILES['profilePhoto']) && $_FILES['profilePhoto']['error'] == UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = uniqid() . '-' . basename($_FILES['profilePhoto']['name']);
        $uploadFile = $uploadDir . $fileName;

        $imageFileType = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($imageFileType, $allowedTypes)) {
            die("Error : only JPG, JPEG, PNG and GIF files are approved.");
        }

        if (move_uploaded_file($_FILES['profilePhoto']['tmp_name'], $uploadFile)) {
            $profilePhoto = $uploadFile;
        } else {
            die("Error : Failure to load the image.");
        }
    }

    // Préparation de la requête SQL
    $stmt = $conn->prepare("UPDATE users SET phone=?, nationality=?, country=?, city=?, birthday=?, bio=?, username=?, contactMethod=?, gender=?, cv=?, profilePhoto=? WHERE id=?");
    $stmt->bind_param("sssssssssssi", $phone, $nationality, $country, $city, $birthday, $bio, $username, $contactMethod, $gender, $cv, $profilePhoto, $user_id);

    if ($stmt->execute()) {
        echo "Profile updated successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>