<?php
require_once 'config.php';

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in output
ini_set('log_errors', 1);

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

try {
    $conn = getDBConnection();
    
    switch($action) {
        case 'get_items':
            $type = $_GET['type'] ?? '';
            $search = $_GET['search'] ?? '';
            $category = $_GET['category'] ?? 'all';
            
            $sql = "SELECT * FROM items WHERE 1=1";
            $params = [];
            
            if ($type && $type !== 'all') {
                $sql .= " AND type = :type";
                $params[':type'] = $type;
            }
            
            if ($search) {
                $sql .= " AND (name LIKE :search OR description LIKE :search)";
                $params[':search'] = "%$search%";
            }
            
            if ($category && $category !== 'all') {
                $sql .= " AND category = :category";
                $params[':category'] = $category;
            }
            
            $sql .= " ORDER BY created_at DESC";
            
            $stmt = $conn->prepare($sql);
            $stmt->execute($params);
            $items = $stmt->fetchAll();
            
            echo json_encode(['success' => true, 'items' => $items]);
            break;
            
        case 'add_item':
            // Check if it's a JSON POST request
            $contentType = $_SERVER["CONTENT_TYPE"] ?? '';
            
            if (strpos($contentType, 'application/json') !== false) {
                $rawData = file_get_contents('php://input');
                $data = json_decode($rawData, true);
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    echo json_encode([
                        'success' => false, 
                        'message' => 'Invalid JSON: ' . json_last_error_msg()
                    ]);
                    exit;
                }
            } else {
                $data = $_POST;
            }
            
            // Validate required fields
            $required = ['type', 'name', 'description', 'category', 'contactName', 'contactEmail', 'contactPhone', 'locationName'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    echo json_encode([
                        'success' => false, 
                        'message' => "Missing required field: $field"
                    ]);
                    exit;
                }
            }
            
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
            $result = $stmt->execute([
                ':type' => $data['type'],
                ':name' => $data['name'],
                ':description' => $data['description'],
                ':category' => $data['category'],
                ':contact_name' => $data['contactName'],
                ':contact_email' => $data['contactEmail'],
                ':contact_phone' => $data['contactPhone'],
                ':location_name' => $data['locationName'],
                ':location_lat' => $data['locationLat'] ?? null,
                ':location_lng' => $data['locationLng'] ?? null,
                ':image' => $data['image'] ?? null
            ]);
            
            if ($result) {
                echo json_encode(['success' => true, 'id' => $conn->lastInsertId()]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Database insert failed']);
            }
            break;
            
        case 'get_recent':
            $limit = $_GET['limit'] ?? 10;
            
            $sql = "SELECT * FROM items ORDER BY created_at DESC LIMIT :limit";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->execute();
            $items = $stmt->fetchAll();
            
            echo json_encode(['success' => true, 'items' => $items]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }
    
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>