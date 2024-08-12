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

    $stmt = $conn->prepare("UPDATE users SET phone=?, nationality=?, country=?, city=?, birthday=?, bio=?, username=?, contactMethod=?, gender=?, cv=? WHERE id=?");
    $stmt->bind_param("ssssssssssi", $phone, $nationality, $country, $city, $birthday, $bio, $username, $contactMethod, $gender, $cv, $user_id);

    if ($stmt->execute()) {
        echo "Profile updated successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
