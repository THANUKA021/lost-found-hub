<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lost & Found Hub</title>
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="blob-container">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
  </div>

  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">
            <div class="logo-icon-bg"></div>
            <div class="logo-icon-main">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
          </div>
          <h1 class="logo-text">Lost & Found Hub</h1>
        </div>
        <nav>
          <button class="nav-btn" onclick="showHome()">Home</button>
          <button class="nav-btn" onclick="showLostItems()">Browse Lost Items</button>
          <button class="nav-btn" onclick="showFoundItems()">Browse Found Items</button>
        </nav>
      </div>
    </div>
  </header>

  <!-- Home Page -->
  <div id="home-page" class="container">
    <div class="hero-section">
      <h2 class="hero-title">
        Lost Something? <span class="highlight">We've Got You.</span>
      </h2>
      
      <div class="hero-features">
        <div class="hero-feature">
          <svg class="hero-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <h3 class="hero-feature-title">Quick & Easy</h3>
          <p class="hero-feature-text">Report lost or found items in seconds. No registration required.</p>
        </div>

        <div class="hero-feature">
          <svg class="hero-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h3 class="hero-feature-title">Location Tracking</h3>
          <p class="hero-feature-text">Pin exactly where you lost or found an item for faster reunions.</p>
        </div>

        <div class="hero-feature">
          <svg class="hero-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h3 class="hero-feature-title">Direct Contact</h3>
          <p class="hero-feature-text">Connect instantly with owners through email or phone.</p>
        </div>
      </div>
    </div>

    <div class="action-cards">
      <div class="action-card lost" onclick="showAddLostItem()">
        <div class="action-icon lost">
          <svg class="icon" style="width: 48px; height: 48px;" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2>Report Lost Item</h2>
        <p style="color: #fca5a5;">Lost something? Let us help you find it</p>
      </div>

      <div class="action-card found" onclick="showAddFoundItem()">
        <div class="action-icon found">
          <svg class="icon" style="width: 48px; height: 48px;" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>Report Found Item</h2>
        <p style="color: #22c55e;">Found something? Help return it</p>
      </div>
    </div>

    <div class="content-box">
      <div class="content-header">
        <h2>Recent Item Reports</h2>
      </div>
      <div id="home-items"></div>
    </div>
  </div>

  <!-- Add Item Page -->
  <div id="add-item-page" class="hidden">
    <div class="container form-container">
      <button class="back-btn" onclick="showHome()">
        <svg class="icon icon-sm" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </button>
      <h1 class="page-title" id="form-title">Report Lost Item</h1>
      <p class="page-subtitle">Fill in the details below. All fields are required.</p>

      <div class="content-box">
        <form id="item-form">
          <div class="form-group">
            <label class="form-label">Item Name *</label>
            <input type="text" class="form-input" id="item-name" placeholder="e.g., Black iPhone 13 Pro" required>
          </div>

          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea class="form-textarea" id="item-description" rows="4" placeholder="Provide a detailed description..." required></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Upload Picture of Item</label>
            <input type="file" id="item-image-input" accept="image/*" style="display: none;" onchange="handleImageUpload(event)">
            <div class="image-upload-area" id="image-upload-area" onclick="document.getElementById('item-image-input').click()">
              <svg class="icon" style="width: 48px; height: 48px; margin: 0 auto 1rem; color: #22c55e;" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p style="color: #22c55e; font-weight: 600; margin-bottom: 0.5rem;">Click to upload image</p>
              <p style="color: rgba(209, 213, 219, 0.7); font-size: 0.875rem;">PNG, JPG, JPEG up to 5MB</p>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Category *</label>
            <select class="form-select" id="item-category" required>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Accessories</option>
              <option>Documents</option>
              <option>Keys</option>
              <option>Bags</option>
              <option>Jewelry</option>
              <option>Sports Equipment</option>
              <option>Other</option>
            </select>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Contact Information</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Your Name *</label>
                <input type="text" class="form-input" id="contact-name" placeholder="John Doe" required>
              </div>

              <div class="form-group">
                <label class="form-label">Phone Number *</label>
                <input type="tel" class="form-input" id="contact-phone" placeholder="+1 234 567 8900" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address *</label>
              <input type="email" class="form-input" id="contact-email" placeholder="john@example.com" required>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Location</h3>
            
            <div class="form-group">
              <label class="form-label">Location Description *</label>
              <input type="text" class="form-input" id="location-name" placeholder="e.g., Central Library, 2nd Floor" required>
            </div>

            <button type="button" class="btn btn-primary btn-full" onclick="openMapModal()">
              <svg class="icon icon-sm" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Select Location on Map
            </button>
            <p class="success-message hidden" id="location-success"></p>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-secondary" onclick="showHome()">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Items List Page -->
  <div id="items-list-page" class="hidden">
    <div class="container">
      <button class="back-btn" onclick="showHome()">
        <svg class="icon icon-sm" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </button>
      <h1 class="page-title" id="list-title">Lost Items</h1>
      <p class="page-subtitle" id="list-subtitle">Browse all reported lost items</p>

      <div class="content-box">
        <div class="search-filters">
          <div class="search-wrapper">
            <svg class="icon icon-sm search-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="form-input search-input" id="search-input" placeholder="Search items...">
          </div>
          <select class="form-select" id="filter-category">
            <option value="all">All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Documents</option>
            <option>Keys</option>
            <option>Bags</option>
            <option>Jewelry</option>
            <option>Sports Equipment</option>
            <option>Other</option>
          </select>
        </div>

        <div id="items-list"></div>
      </div>
    </div>
  </div>

  <!-- Location Modal -->
  <div id="location-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Select Location</h2>
        <button class="close-btn" onclick="closeMapModal()">
          <svg class="icon" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="map-info">
        <div class="map-info-title">How to use:</div>
        <p>Click anywhere on the map to select your location. The marker will show your selected position.</p>
      </div>

      <div id="map"></div>

      <div id="selected-location-info" class="hidden" style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 0.75rem; padding: 1rem; margin-bottom: 1rem;">
        <div id="location-info-title" style="font-weight: 600; color: #22c55e; margin-bottom: 0.5rem;">Selected Location:</div>
        <div id="location-display" style="font-size: 0.875rem;"></div>
      </div>

      <div class="btn-group">
        <button class="btn btn-secondary" onclick="closeMapModal()">Cancel</button>
        <button class="btn btn-primary" id="confirm-location-btn" disabled onclick="confirmLocation()">Confirm Location</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>