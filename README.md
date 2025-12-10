# 🔍 Lost & Found Hub

[![PHP Version](https://img.shields.io/badge/PHP-7.4%2B-blue)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%2B-orange)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern web-based platform to report and track lost & found items with interactive maps, image uploads, and real-time search capabilities.

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo Screenshots](#-demo-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 🎯 Core Functionality
- 📝 **Report Lost Items** - Submit detailed reports with descriptions and images
- ✅ **Report Found Items** - Help return items to their owners
- 🔍 **Smart Search** - Keyword-based search across all items
- 🏷️ **Category Filtering** - Filter by Electronics, Clothing, Accessories, Keys, Documents, etc.
- 🗺️ **Interactive Maps** - Pin exact locations using Leaflet.js and OpenStreetMap
- 📸 **Image Upload** - Upload photos up to 5MB (JPG, PNG, JPEG)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 📞 **Direct Contact** - Display email and phone information for communication

### 🔒 Technical Features
- ⚡ Real-time search and filtering (AJAX - no page reload)
- 🛡️ SQL Injection prevention with PDO prepared statements
- 🎨 Modern glassmorphism UI with smooth animations
- 💾 File-based image storage system
- 📍 GPS location detection and reverse geocoding
- 🔄 RESTful API architecture
- ♿ Accessible and user-friendly interface
- 🎯 Color-coded system (Red: Lost, Green: Found)

---

## 📸 Demo Screenshots

### Home Page
Beautiful landing page with hero section and recent items display

### Report Item Form
Comprehensive form with validation, image upload, and map integration

### Interactive Map
Click-to-select location with GPS detection and address lookup

### Browse Items
Grid layout with search bar and category filters

*Note: Add actual screenshots to a `screenshots/` folder in your repository*

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript ES6+ |
| **Maps** | Leaflet.js, OpenStreetMap |
| **Backend** | PHP 7.4+ |
| **Database** | MySQL 5.7+ |
| **Server** | Apache (XAMPP) |
| **API** | RESTful JSON API |

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- ✅ [XAMPP](https://www.apachefriends.org/) (includes Apache, MySQL, PHP)
- ✅ Web browser (Chrome, Firefox, Safari, or Edge)
- ✅ Git (optional, for cloning)

### Quick Start

#### 1️⃣ Clone or Download

**Option A: Using Git**
```bash
git clone https://github.com/THANUKA021/lost-found-hub.git
```

**Option B: Download ZIP**
- Click "Code" → "Download ZIP"
- Extract to your computer

#### 2️⃣ Move to XAMPP Directory

Move the project folder to your XAMPP `htdocs` directory:

**Windows:**
```
C:\xampp\htdocs\lost-found-hub\
```

**macOS:**
```
/Applications/XAMPP/htdocs/lost-found-hub/
```

**Linux:**
```
/opt/lampp/htdocs/lost-found-hub/
```

#### 3️⃣ Start XAMPP

1. Open **XAMPP Control Panel**
2. Click **Start** on **Apache**
3. Click **Start** on **MySQL**

#### 4️⃣ Create Database

1. Open browser and go to: `http://localhost/phpmyadmin`
2. Click on **"SQL"** tab
3. Open the `database.sql` file from the project
4. Copy all content and paste into SQL tab
5. Click **"Go"** to execute
6. Verify database `lost_found_hub` is created

#### 5️⃣ Configure (Optional)

The default configuration works with XAMPP. If needed, edit `config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Leave empty for XAMPP
define('DB_NAME', 'lost_found_hub');
```

#### 6️⃣ Set Permissions

The `uploads/` folder will be created automatically. If you encounter issues:

**Windows:** Right-click `uploads` folder → Properties → Security → Edit → Allow "Full Control"

**macOS/Linux:**
```bash
chmod 755 uploads/
```

#### 7️⃣ Test Installation

Open: `http://localhost/lost-found-hub/test.php`

You should see:
- ✅ Database connection successful!
- ✅ Table 'items' exists
- ✅ Test insert successful!

#### 8️⃣ Access Application

🎉 **Open:** `http://localhost/lost-found-hub/`

---

## 🚀 Usage

### Reporting a Lost Item

1. Click the **"Report Lost Item"** red card on home page
2. Fill in the form:
   - Item name (e.g., "Black iPhone 13 Pro")
   - Detailed description
   - Select category
   - Your contact information (name, email, phone)
   - Location description
3. **Optional:** Click to upload an image (max 5MB)
4. Click **"Select Location on Map"** button
5. Click anywhere on the map to place a marker
6. Click **"Confirm Location"**
7. Review your information
8. Click **"Submit Report"**
9. You'll see a success message!

### Reporting a Found Item

1. Click the **"Report Found Item"** green card
2. Follow the same steps as lost item
3. Submit to help return the item to its owner

### Searching for Items

1. Click **"Browse Lost Items"** or **"Browse Found Items"**
2. Use the search box to find specific items by keyword
3. Use the category dropdown to filter by type
4. Results update in real-time
5. Click on any item to see full details and contact info

### Contacting Item Owners

- Each item card displays contact information
- Email addresses and phone numbers are visible
- Reach out directly to coordinate item return

---

## 📁 Project Structure

```
lost-found-hub/
├── index.php              # Main application page (UI)
├── config.php             # Database configuration
├── api.php                # REST API endpoints
├── upload.php             # Image upload handler
├── script.js              # Frontend JavaScript
├── styles.css             # Stylesheet (to be created)
├── test.php               # Database connection tester
├── database.sql           # Database schema
├── update_database.sql    # Database updates
├── README.md              # This file
├── LICENSE                # License file (MIT)
├── .gitignore             # Git ignore rules
└── uploads/               # Image storage (auto-created)
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost/lost-found-hub/api.php
```

### Endpoints

#### 1. Get Items
```http
GET /api.php?action=get_items&type={lost|found}&search={query}&category={category}
```

**Parameters:**
- `type` (optional): Filter by "lost" or "found"
- `search` (optional): Keyword search
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "id": 1,
      "type": "lost",
      "name": "iPhone 13",
      "description": "Black iPhone with cracked screen",
      "category": "Electronics",
      "contact_name": "John Doe",
      "contact_email": "john@example.com",
      "contact_phone": "+1234567890",
      "location_name": "Central Library",
      "location_lat": 40.758901,
      "location_lng": -73.985130,
      "image": "img_abc123.jpg",
      "created_at": "2025-12-10 14:30:00"
    }
  ]
}
```

#### 2. Get Recent Items
```http
GET /api.php?action=get_recent&limit={number}
```

**Parameters:**
- `limit` (optional): Number of items to return (default: 10)

**Response:** Same as Get Items

#### 3. Add Item
```http
POST /api.php?action=add_item
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "lost",
  "name": "iPhone 13",
  "description": "Black iPhone with cracked screen",
  "category": "Electronics",
  "contactName": "John Doe",
  "contactEmail": "john@example.com",
  "contactPhone": "+1234567890",
  "locationName": "Central Library",
  "locationLat": 40.758901,
  "locationLng": -73.985130,
  "image": "img_abc123.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "id": 1
}
```

#### 4. Upload Image
```http
POST /upload.php
Content-Type: application/x-www-form-urlencoded
```

**Request Body:**
```
image=data:image/jpeg;base64,/9j/4AAQSkZJRg...
```

**Response:**
```json
{
  "success": true,
  "filename": "img_673abc123.jpg",
  "path": "uploads/img_673abc123.jpg"
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow PSR-12 coding standards for PHP
- Use meaningful variable and function names
- Comment complex logic
- Test thoroughly before submitting PR
- Update documentation if needed

### Report Bugs

Found a bug? Please open an [issue](https://github.com/THANUKA021/lost-found-hub/issues) with:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

**[Your Name]**

- GitHub: [@your-username](https://github.com/THANUKA021)
- Email: thanukasachith1@gmail.com
- LinkedIn: [Your Name](https://linkedin.com/in/thanuka-sachith-33230b305)

---

## 🙏 Acknowledgments

- **Leaflet.js** - Open-source mapping library
- **OpenStreetMap** - Free geographic data
- **Nominatim** - Geocoding service
- **XAMPP** - Cross-platform web server solution
- **Font Awesome** (if used) - Icon library

---

## 📊 Project Status

✅ **Active Development**

Current Version: **1.0.0**

### Roadmap

- [ ] User authentication and profiles
- [ ] Email notifications
- [ ] Advanced search with date range
- [ ] Mobile application (React Native)
- [ ] Admin dashboard
- [ ] Item matching algorithm
- [ ] Multi-language support

---

## 💡 Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

## 📞 Contact

For questions or support, please open an issue or contact:

📧 Email: thanukasachith1@gmail.com  
🐙 GitHub: [@your-username](https://github.com/THANUKA021)

---

<div align="center">

**Made with ❤️ by [Thanuka sachith]**

[⬆ Back to Top](#-lost--found-hub)

</div>
