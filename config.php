<?php
// Database configuration
define('DB_HOST', 'sql111.infinityfree.com');
define('DB_USER', 'if0_42683610');
define('DB_PASS', 'your_mysql_password'); // the one you set when creating this DB
define('DB_NAME', 'if0_42683610_lost_found_hub');

// Create database connection
function getDBConnection() {
    try {
        $conn = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $conn;
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Set timezone
date_default_timezone_set('UTC');

// Start session
session_start();
?>
