let items = [];
let currentType = 'lost';
let selectedLocation = null;
let map;
let marker;
let uploadedImage = null;

// Load items from server
async function loadItems() {
  try {
    const response = await fetch('api.php?action=get_recent&limit=10');
    const data = await response.json();
    if (data.success) {
      items = data.items;
      renderHomeItems();
    }
  } catch (error) {
    console.error('Error loading items:', error);
  }
}

// Page navigation
function showHome() {
  document.getElementById('home-page').classList.remove('hidden');
  document.getElementById('add-item-page').classList.add('hidden');
  document.getElementById('items-list-page').classList.add('hidden');
  loadItems();
}

function showAddLostItem() {
  currentType = 'lost';
  document.getElementById('form-title').textContent = 'Report Lost Item';
  document.getElementById('form-title').style.color = '#dc2626';
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('add-item-page').classList.remove('hidden');
  document.getElementById('items-list-page').classList.add('hidden');
  resetForm();
  updateFormColors('lost');
}

function showAddFoundItem() {
  currentType = 'found';
  document.getElementById('form-title').textContent = 'Report Found Item';
  document.getElementById('form-title').style.color = '#22c55e';
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('add-item-page').classList.remove('hidden');
  document.getElementById('items-list-page').classList.add('hidden');
  resetForm();
  updateFormColors('found');
}

function showLostItems() {
  currentType = 'lost';
  document.getElementById('list-title').textContent = 'Lost Items';
  document.getElementById('list-title').style.color = '#dc2626';
  document.getElementById('list-subtitle').textContent = 'Browse all reported lost items';
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('add-item-page').classList.add('hidden');
  document.getElementById('items-list-page').classList.remove('hidden');
  updateBrowseColors('lost');
  renderItemsList();
}

function showFoundItems() {
  currentType = 'found';
  document.getElementById('list-title').textContent = 'Found Items';
  document.getElementById('list-title').style.color = '#22c55e';
  document.getElementById('list-subtitle').textContent = 'Browse all reported found items';
  document.getElementById('home-page').classList.add('hidden');
  document.getElementById('add-item-page').classList.add('hidden');
  document.getElementById('items-list-page').classList.remove('hidden');
  updateBrowseColors('found');
  renderItemsList();
}

// Form handling
function resetForm() {
  document.getElementById('item-form').reset();
  selectedLocation = null;
  uploadedImage = null;
  document.getElementById('location-success').classList.add('hidden');
  
  const uploadArea = document.getElementById('image-upload-area');
  const color = currentType === 'lost' ? '#dc2626' : '#22c55e';
  uploadArea.innerHTML = `
    <svg class="icon" style="width: 48px; height: 48px; margin: 0 auto 1rem; color: ${color};" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
    <p style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem;">Click to upload image</p>
    <p style="color: rgba(209, 213, 219, 0.7); font-size: 0.875rem;">PNG, JPG, JPEG up to 5MB</p>
  `;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImage = e.target.result;
      
      const uploadArea = document.getElementById('image-upload-area');
      const color = currentType === 'lost' ? '#dc2626' : '#22c55e';
      uploadArea.innerHTML = `
        <svg class="icon" style="width: 48px; height: 48px; margin: 0 auto 1rem; color: ${color};" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <p style="color: ${color}; font-weight: 600; margin-bottom: 0.5rem;">Image uploaded successfully!</p>
        <p style="color: rgba(209, 213, 219, 0.7); font-size: 0.875rem;">Click to change image</p>
      `;
    };
    reader.readAsDataURL(file);
  }
}

function updateFormColors(type) {
  const color = type === 'lost' ? '#dc2626' : '#22c55e';
  const colorDark = type === 'lost' ? '#991b1b' : '#16a34a';
  const labels = document.querySelectorAll('.form-label');
  const backBtn = document.querySelector('.back-btn');
  const successMsg = document.getElementById('location-success');
  const primaryBtns = document.querySelectorAll('.btn-primary');
  const formInputs = document.querySelectorAll('#add-item-page .form-input, #add-item-page .form-textarea, #add-item-page .form-select');
  const imageUploadArea = document.getElementById('image-upload-area');
  
  labels.forEach(label => label.style.color = color);
  if (backBtn) backBtn.style.color = color;
  if (successMsg) successMsg.style.color = color;

  primaryBtns.forEach(btn => {
    btn.style.background = `linear-gradient(to right, ${color}, ${colorDark})`;
    if (type === 'lost') {
      btn.classList.add('lost-style');
    } else {
      btn.classList.remove('lost-style');
    }
  });

  formInputs.forEach(input => {
    if (type === 'lost') {
      input.classList.add('lost-style');
    } else {
      input.classList.remove('lost-style');
    }
  });

  if (imageUploadArea) {
    if (type === 'lost') {
      imageUploadArea.classList.add('lost-style');
    } else {
      imageUploadArea.classList.remove('lost-style');
    }
  }
}

function updateBrowseColors(type) {
  const color = type === 'lost' ? '#dc2626' : '#22c55e';
  const backBtn = document.querySelectorAll('.back-btn');
  const searchIcon = document.querySelector('.search-icon');
  const searchInput = document.getElementById('search-input');
  const filterCategory = document.getElementById('filter-category');
  
  backBtn.forEach(btn => btn.style.color = color);
  if (searchIcon) searchIcon.style.color = color;

  if (searchInput) {
    if (type === 'lost') {
      searchInput.classList.add('lost-style');
    } else {
      searchInput.classList.remove('lost-style');
    }
  }

  if (filterCategory) {
    if (type === 'lost') {
      filterCategory.classList.add('lost-style');
    } else {
      filterCategory.classList.remove('lost-style');
    }
  }
}

document.getElementById('item-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  let imageFilename = null;

  // Upload image first if one exists
  if (uploadedImage) {
    try {
      const uploadResponse = await fetch('upload.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'image=' + encodeURIComponent(uploadedImage)
      });

      const uploadData = await uploadResponse.json();
      
      if (uploadData.success) {
        imageFilename = uploadData.filename;
      } else {
        alert('Image upload failed: ' + uploadData.message);
        return;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      return;
    }
  }

  const newItem = {
    type: currentType,
    name: document.getElementById('item-name').value,
    description: document.getElementById('item-description').value,
    category: document.getElementById('item-category').value,
    contactName: document.getElementById('contact-name').value,
    contactEmail: document.getElementById('contact-email').value,
    contactPhone: document.getElementById('contact-phone').value,
    locationName: document.getElementById('location-name').value,
    locationLat: selectedLocation ? selectedLocation.lat : null,
    locationLng: selectedLocation ? selectedLocation.lng : null,
    image: imageFilename
  };

  try {
    const response = await fetch('api.php?action=add_item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Item reported successfully!');
      showHome();
    } else {
      alert('Error: ' + (data.message || 'Unknown error occurred'));
      console.error('Server error:', data);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit item. Error: ' + error.message + '\nCheck browser console for details.');
  }
});

// Location modal
function openMapModal() {
  document.getElementById('location-modal').classList.add('active');
  updateModalColors();
  setTimeout(() => initMap(), 100);
}

function closeMapModal() {
  document.getElementById('location-modal').classList.remove('active');
}

function updateModalColors() {
  const isLost = currentType === 'lost';
  const modalTitle = document.querySelector('.modal-title');
  const closeBtn = document.querySelector('.close-btn');
  const mapElement = document.getElementById('map');
  const mapInfo = document.querySelector('.map-info');
  const mapInfoTitle = document.querySelector('.map-info-title');
  const selectedLocationInfo = document.getElementById('selected-location-info');
  const locationInfoTitle = document.getElementById('location-info-title');
  
  if (isLost) {
    modalTitle.classList.add('lost-style');
    closeBtn.classList.add('lost-style');
    mapElement.classList.add('lost-style');
    mapInfo.classList.add('lost-style');
    mapInfoTitle.classList.add('lost-style');
    if (selectedLocationInfo) {
      selectedLocationInfo.style.background = 'rgba(220, 38, 38, 0.1)';
      selectedLocationInfo.style.borderColor = 'rgba(220, 38, 38, 0.3)';
    }
    if (locationInfoTitle) locationInfoTitle.style.color = '#dc2626';
  } else {
    modalTitle.classList.remove('lost-style');
    closeBtn.classList.remove('lost-style');
    mapElement.classList.remove('lost-style');
    mapInfo.classList.remove('lost-style');
    mapInfoTitle.classList.remove('lost-style');
    if (selectedLocationInfo) {
      selectedLocationInfo.style.background = 'rgba(34, 197, 94, 0.1)';
      selectedLocationInfo.style.borderColor = 'rgba(34, 197, 94, 0.3)';
    }
    if (locationInfoTitle) locationInfoTitle.style.color = '#22c55e';
  }
}

function initMap() {
  const defaultCenter = [40.7589, -73.9851];

  if (map) {
    map.remove();
  }

  map = L.map('map').setView(defaultCenter, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  map.on('click', function(e) {
    placeMarker(e.latlng);
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude];
        map.setView(userLocation, 15);
      },
      () => {
        console.log('Location access denied, using default location');
      }
    );
  }
}

function placeMarker(latlng) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker(latlng).addTo(map);

  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
    .then(response => response.json())
    .then(data => {
      const address = data.display_name || `Location at ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`;
      
      selectedLocation = {
        name: address,
        lat: latlng.lat,
        lng: latlng.lng
      };

      document.getElementById('location-display').textContent = 
        `${address}\n\nCoordinates: ${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
      document.getElementById('selected-location-info').classList.remove('hidden');
      document.getElementById('confirm-location-btn').disabled = false;
    })
    .catch(error => {
      selectedLocation = {
        name: `Location at ${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`,
        lat: latlng.lat,
        lng: latlng.lng
      };

      document.getElementById('location-display').textContent = 
        `Coordinates: ${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
      document.getElementById('selected-location-info').classList.remove('hidden');
      document.getElementById('confirm-location-btn').disabled = false;
    });
}

function confirmLocation() {
  if (selectedLocation) {
    document.getElementById('location-name').value = selectedLocation.name;
    document.getElementById('location-success').textContent = 
      `✓ Location selected: ${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`;
    document.getElementById('location-success').classList.remove('hidden');
    
    document.getElementById('location-modal').classList.remove('active');
    
    setTimeout(() => {
      document.getElementById('selected-location-info').classList.add('hidden');
      document.getElementById('confirm-location-btn').disabled = true;
      if (marker) {
        map.removeLayer(marker);
        marker = null;
      }
    }, 300);
  }
}

// Render functions
function renderHomeItems() {
  const container = document.getElementById('home-items');
  
  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon icon" viewBox="0 0 24 24">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
        <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">No items reported yet</p>
        <p style="color: rgba(209, 213, 219, 0.7);">Be the first to report an item</p>
      </div>
    `;
  } else {
    container.innerHTML = `<div class="items-grid">${items.map(item => renderHomeItemCard(item)).join('')}</div>`;
  }
}

async function renderItemsList() {
  const searchTerm = document.getElementById('search-input').value;
  const filterCategory = document.getElementById('filter-category').value;

  try {
    const response = await fetch(`api.php?action=get_items&type=${currentType}&search=${encodeURIComponent(searchTerm)}&category=${filterCategory}`);
    const data = await response.json();
    
    if (data.success) {
      const container = document.getElementById('items-list');

      if (data.items.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <svg class="empty-icon icon" viewBox="0 0 24 24">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">No ${currentType} items found</p>
            <p style="color: rgba(209, 213, 219, 0.7);">Try adjusting your search or filters</p>
          </div>
        `;
      } else {
        container.innerHTML = `<div class="items-grid">${data.items.map(item => renderDetailItemCard(item)).join('')}</div>`;
      }
    }
  } catch (error) {
    console.error('Error loading items:', error);
  }
}

function renderHomeItemCard(item) {
  const badgeClass = item.type === 'lost' ? 'lost' : 'found';
  const badgeText = item.type === 'lost' ? 'Lost' : 'Found';
  const imageSrc = item.image ? `uploads/${item.image}` : '';

  return `
    <div class="item-card">
      ${imageSrc ? `<img src="${imageSrc}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">` : ''}
      <div class="item-header">
        <h3 class="item-title">${item.name}</h3>
        <span class="item-badge ${badgeClass}">${badgeText}</span>
      </div>
      <p class="item-description">${item.description}</p>
      <div class="item-details">
        <div class="item-detail" style="color: #22c55e;">
          <svg class="icon icon-sm" viewBox="0 0 24 24">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          <span>${item.category}</span>
        </div>
        <div class="item-detail" style="color: #22c55e;">
          <svg class="icon icon-sm" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${item.location_name || 'Location specified'}</span>
        </div>
        <div class="item-detail" style="color: #22c55e;">
          <svg class="icon icon-sm" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>${new Date(item.created_at).toLocaleDateString()}</span>
        </div>
        ${item.contact_email ? `
          <div class="item-detail" style="color: #22c55e; padding-top: 0.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <svg class="icon icon-sm" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span style="font-size: 0.75rem;">${item.contact_email}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function renderDetailItemCard(item) {
  const badgeClass = item.type === 'lost' ? 'lost' : 'found';
  const badgeText = item.type === 'lost' ? 'Lost' : 'Found';
  const imageSrc = item.image ? `uploads/${item.image}` : '';

  return `
    <div class="item-card">
      ${imageSrc ? `<img src="${imageSrc}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">` : ''}
      <div class="item-header">
        <h3 class="item-title">${item.name}</h3>
        <span class="item-badge ${badgeClass}">${badgeText}</span>
      </div>
      <p class="item-description">${item.description}</p>
      <div class="item-details">
        <div class="item-detail" style="color: #22c55e;">
          <svg class="icon icon-sm" viewBox="0 0 24 24">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          <span>${item.category}</span>
        </div>
        <div class="item-detail" style="color: #22c55e;">
          <svg class="icon icon-sm" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${item.location_name || 'Location specified'}</span>
        </div>
        <div class="item-detail" style="color: #22c55e;">
          <svg class="icon icon-sm" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>${new Date(item.created_at).toLocaleDateString()}</span>
        </div>
        <div style="padding-top: 0.75rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <p style="color: #22c55e; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.875rem;">Contact Information:</p>
          ${item.contact_name ? `<p style="font-size: 0.75rem; margin-bottom: 0.25rem;">Name: ${item.contact_name}</p>` : ''}
          ${item.contact_email ? `
            <div class="item-detail" style="color: #22c55e; margin-bottom: 0.25rem;">
              <svg class="icon icon-sm" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span style="font-size: 0.75rem;">${item.contact_email}</span>
            </div>
          ` : ''}
          ${item.contact_phone ? `
            <div class="item-detail" style="color: #22c55e;">
              <svg class="icon icon-sm" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span style="font-size: 0.75rem;">${item.contact_phone}</span>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('search-input').addEventListener('input', renderItemsList);
document.getElementById('filter-category').addEventListener('change', renderItemsList);

// Initialize
loadItems();