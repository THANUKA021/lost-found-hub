<?php
header('Content-Type: application/json');

// Create uploads directory if it doesn't exist
$uploadDir = 'uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle base64 image upload
    if (isset($_POST['image']) && !empty($_POST['image'])) {
        $imageData = $_POST['image'];
        
        // Extract base64 data
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
            $imageData = substr($imageData, strpos($imageData, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif
            
            // Validate file type
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                echo json_encode(['success' => false, 'message' => 'Invalid image type']);
                exit;
            }
            
            $imageData = base64_decode($imageData);
            
            if ($imageData === false) {
                echo json_encode(['success' => false, 'message' => 'Base64 decode failed']);
                exit;
            }
            
            // Generate unique filename
            $filename = uniqid('img_', true) . '.' . $type;
            $filepath = $uploadDir . $filename;
            
            // Save file
            if (file_put_contents($filepath, $imageData)) {
                echo json_encode([
                    'success' => true, 
                    'filename' => $filename,
                    'path' => $filepath
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to save image']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid image format']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No image data received']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>