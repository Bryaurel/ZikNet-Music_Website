<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = 'localhost';
$db = 'ziknet';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Supposons que vous ayez une variable de session pour l'utilisateur connecté
session_start();
$username = $_SESSION['username']; // Nom d'utilisateur de la session

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    echo "No user found";
    exit();
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile</title>
</head>
<body>
    <div>
        <img id="profile-photo" src="<?php echo $user['profile_photo'] ? 'uploads/' . $user['profile_photo'] : 'default.jpg'; ?>" alt="Profile Photo">
        <h2 id="username"><?php echo htmlspecialchars($user['username']); ?></h2>
        <p id="fullname"><?php echo htmlspecialchars($user['firstname'] . ' ' . $user['lastname']); ?></p>
        <p id="bio"><?php echo htmlspecialchars($user['bio']); ?></p>
        <div>
            <span>Posts: <span id="posts-count"><?php echo htmlspecialchars($user['posts_count']); ?></span></span>
            <span>Followers: <span id="followers-count"><?php echo htmlspecialchars($user['followers_count']); ?></span></span>
            <span>Following: <span id="following-count"><?php echo htmlspecialchars($user['following_count']); ?></span></span>
        </div>
    </div>
</body>
</html>
