<?php
// Test database connection and table structure
require_once 'config.php';

echo "<h2>Database Connection Test</h2>";

try {
    $conn = getDBConnection();
    echo "<p style='color: green;'>✓ Database connection successful!</p>";
    
    // Check if table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'items'");
    if ($stmt->rowCount() > 0) {
        echo "<p style='color: green;'>✓ Table 'items' exists</p>";
        
        // Show table structure
        $stmt = $conn->query("DESCRIBE items");
        echo "<h3>Table Structure:</h3>";
        echo "<table border='1' style='border-collapse: collapse;'>";
        echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th></tr>";
        while ($row = $stmt->fetch()) {
            echo "<tr>";
            echo "<td>{$row['Field']}</td>";
            echo "<td>{$row['Type']}</td>";
            echo "<td>{$row['Null']}</td>";
            echo "<td>{$row['Key']}</td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Count items
        $stmt = $conn->query("SELECT COUNT(*) as count FROM items");
        $count = $stmt->fetch()['count'];
        echo "<p>Total items in database: <strong>$count</strong></p>";
        
    } else {
        echo "<p style='color: red;'>✗ Table 'items' does NOT exist!</p>";
        echo "<p>Please run the database.sql file in phpMyAdmin</p>";
    }
    
    // Test insert
    echo "<h3>Test Insert:</h3>";
    $testData = [
        ':type' => 'lost',
        ':name' => 'Test Item',
        ':description' => 'This is a test item',
        ':category' => 'Electronics',
        ':contact_name' => 'Test User',
        ':contact_email' => 'test@test.com',
        ':contact_phone' => '1234567890',
        ':location_name' => 'Test Location',
        ':location_lat' => null,
        ':location_lng' => null,
        ':image' => null
    ];
    
    $sql = "INSERT INTO items (
        type, name, description, category, 
        contact_name, contact_email, contact_phone,
        location_name, location_lat, location_lng, image
    ) VALUES (
        :type, :name, :description, :category,
        :contact_name, :contact_email, :contact_phone,
        :location_name, :location_lat, :location_lng, :image
    )";
    
    $stmt = $conn->prepare($sql);
    if ($stmt->execute($testData)) {
        $id = $conn->lastInsertId();
        echo "<p style='color: green;'>✓ Test insert successful! ID: $id</p>";
        
        // Delete test item
        $conn->exec("DELETE FROM items WHERE id = $id");
        echo "<p style='color: green;'>✓ Test item deleted</p>";
    } else {
        echo "<p style='color: red;'>✗ Test insert failed!</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<a href='index.php'>← Back to Home</a>";
?>