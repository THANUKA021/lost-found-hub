-- Lost & Found Hub - Database Schema
-- Reconstructed from api.php and test.php table/column usage
-- Run this in phpMyAdmin (SQL tab) to create the required database structure

CREATE DATABASE IF NOT EXISTS lost_found_hub;
USE lost_found_hub;

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('lost', 'found') NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    location_lat DECIMAL(10, 8) DEFAULT NULL,
    location_lng DECIMAL(11, 8) DEFAULT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
