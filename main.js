// Firebase configuration and initialization (ADD THIS AT THE VERY TOP OF MAIN.JS)
const firebaseConfig = {
  apiKey: "AIzaSyBmfu8M8jAGMTw-Y9munlvZDYIjnxfpbyg",
  authDomain: "hostelfinder-99ba5.firebaseapp.com",
  projectId: "hostelfinder-99ba5",
  storageBucket: "hostelfinder-99ba5.firebasestorage.app",
  messagingSenderId: "327861201482",
  appId: "1:327861201482:web:b5905432820f8a536e54b3",
  measurementId: "G-ED9MGNXPCG",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Get a reference to the Firestore database
// END Firebase initialization
console.log("Firebase initialized successfully in main.js!");
console.log("Firestore DB object:", db);

document.addEventListener("DOMContentLoaded", async () => {
  const universitySelect = document.getElementById("university-select");
  const hostelListing = document.getElementById("hostel-listing"); // Changed from hostel-grid to hostel-listing
  const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
  const minRentInput = document.getElementById("min-rent");
  const maxRentInput = document.getElementById("max-rent");
  const distanceSlider = document.getElementById("distance-slider");
  const distanceValueSpan = document.getElementById("distance-value");
  const applyFiltersBtn = document.getElementById("apply-filters-btn");
  const clearFiltersBtn = document.getElementById("clear-filters-btn");
  const facilitiesCheckboxes = document.querySelectorAll(".facility-checkbox");
  const findHostelsButton = document.getElementById("find-hostels-btn"); // New button variable

  // Store all hostels fetched from Firestore
  let allHostels = [];

  // Initialize distance value display
  if (distanceValueSpan && distanceSlider) {
    distanceValueSpan.textContent = `${distanceSlider.value} km`;
  }

  // --- Fetch Hostels from Firestore ---
  async function fetchHostels() {
    try {
      // Only show loading if we are actually fetching data for the first time or refreshing
      if (
        allHostels.length === 0 ||
        hostelListing.classList.contains("initial-state")
      ) {
        hostelListing.innerHTML =
          '<p class="loading-messege">Loading hostels...</p>';
        hostelListing.classList.add("loading-state");
      }

      // hazaribagh db 'hazaribagh-hostels'
      const snapshot = await db.collection("hostels").get();
      allHostels = snapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(),
      }));
      console.log("Hostels fetched from Firestore:", allHostels); // Debugging

      hostelListing.classList.remove("initial-state"); // Remove initial state after fetching
      hostelListing.classList.remove("loading-state"); // Remove loading state here
    } catch (error) {
      console.error("Error fetching hostels:", error);
      // More specific logging of the error itself:
      console.error(
        "Full error details:",
        error.name,
        error.message,
        error.stack
      );
      hostelListing.innerHTML =
        '<p class="error-message">Error loading hostels. Please try again later.</p>';
      hostelListing.classList.remove("loading-state");
    }
  }

  // --- Filter and Display Hostels ---
  function filterAndDisplayHostels() {
    const selectedUniversityId = universitySelect.value;
    const selectedGenders = Array.from(genderCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    const minRent = parseInt(minRentInput.value) || 0;
    const maxRent = parseInt(maxRentInput.value) || Infinity;
    const maxDistance = parseFloat(distanceSlider.value);
    const selectedFacilities = Array.from(facilitiesCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let filteredHostels = allHostels.filter((hostel) => {
      // Filter by University
      // Only apply university filter if a specific university is selected AND it's not the default "Select Your University" option
      if (
        selectedUniversityId &&
        selectedUniversityId !== "" &&
        hostel.universityId !== selectedUniversityId
      ) {
        return false;
      }

      // Filter by Gender
      if (
        selectedGenders.length > 0 &&
        !selectedGenders.includes(hostel.gender)
      ) {
        return false;
      }

      // Filter by Rent
      // Ensure hostel.roomRent exists and has min/max properties
      if (
        hostel.roomRent &&
        (hostel.roomRent.min > maxRent || hostel.roomRent.max < minRent)
      ) {
        return false;
      }

      // Filter by Distance
      if (hostel.distance > maxDistance) {
        return false;
      }

      // Filter by Facilities
      if (selectedFacilities.length > 0) {
        const hasAllFacilities = selectedFacilities.every(
          (facility) =>
            hostel.facilities &&
            Array.isArray(hostel.facilities) &&
            hostel.facilities.includes(facility)
        );
        if (!hasAllFacilities) {
          return false;
        }
      }

      return true;
    });

    // Sort by distance (optional, but good for user experience)
    filteredHostels.sort((a, b) => a.distance - b.distance);

    hostelListing.innerHTML = ""; // Clear previous listings

    // If no university is selected AND there are no other filters applied,
    // show the initial placeholder
    if (
      !selectedUniversityId &&
      selectedGenders.length === 0 &&
      minRent === 0 &&
      maxRent === Infinity &&
      maxDistance === parseFloat(distanceSlider.max) &&
      selectedFacilities.length === 0
    ) {
      hostelListing.innerHTML =
        '<p class="placeholder-text">Please select a university to see available hostels.</p>';
      return; // Stop here if no filters/university
    }

    if (filteredHostels.length === 0) {
      hostelListing.innerHTML =
        '<p class="placeholder-text">No hostels found matching your criteria.</p>';
    } else {
      filteredHostels.forEach((hostel) => {
        const hostelCard = document.createElement("div");
        hostelCard.classList.add("hostel-card");

        hostelCard.innerHTML = `
                    <img src="${hostel.image}" alt="${hostel.name}">
                    <div class="card-content">
                        <h3>${hostel.name}</h3>
                        
                        <p class="detail-location"><i class="icon-location"></i>${hostel.location}</p>

                        <p class="distance"><strong>Distance:</strong> ${hostel.distance} km</p>
                        <p class="rent"><strong>Rent:</strong> ₹${hostel.roomRent.min} - ₹${hostel.roomRent.max}</p>
                        <p class="gender"><strong>Gender:</strong> ${hostel.gender}</p>
                    
                        <a href="hostel-details.html?id=${hostel.id}" class="btn-secondary">View Details</a>
                    </div>
                `;
        hostelListing.appendChild(hostelCard);
      });
    }
  }

  // --- Event Listeners ---
  // NO change event listener for universitySelect here

  if (findHostelsButton) {
    findHostelsButton.addEventListener("click", async () => {
      const selectedUniversityId = universitySelect.value;
      if (
        selectedUniversityId === "" ||
        selectedUniversityId === null ||
        selectedUniversityId === "Select Your University"
      ) {
        hostelListing.innerHTML =
          '<p class="placeholder-text">Please select a university first.</p>';
        return; // Stop if no university selected
      }

      // If allHostels is empty, fetch them, then filter. Otherwise, just filter.
      if (allHostels.length === 0) {
        await fetchHostels(); // Fetches all hostels and updates allHostels array
      }
      filterAndDisplayHostels(); // Filters from the (now possibly fetched) allHostels
    });
  }

  applyFiltersBtn.addEventListener("click", filterAndDisplayHostels);

  clearFiltersBtn.addEventListener("click", () => {
    // Reset filters
    genderCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    minRentInput.value = "";
    maxRentInput.value = "";
    distanceSlider.value = distanceSlider.max; // Set to max distance
    distanceValueSpan.textContent = `${distanceSlider.max} km`;
    facilitiesCheckboxes.forEach((checkbox) => (checkbox.checked = false));

    // After clearing, re-display based on the new (empty) filter state
    filterAndDisplayHostels();
  });

  distanceSlider.addEventListener("input", () => {
    distanceValueSpan.textContent = `${distanceSlider.value} km`;
  });

  // Initial state: Display placeholder text
  hostelListing.innerHTML =
    '<p class="placeholder-text">Please select a university to see available hostels.</p>';
  hostelListing.classList.add("initial-state"); // Add a class to manage initial state if needed

  // Pre-fetch hostels in the background if preferred, but don't display until button click
  // Uncomment the line below if you want data to be ready faster, but it will still
  // be filtered/displayed only on "Find Hostels" button click.
  //fetchHostels();

  document
    .getElementById("find-hostels-btn")
    .addEventListener("click", function () {
      document
        .getElementById("move-to-hostel-listing")
        .scrollIntoView({ behavior: "smooth" });
    });

  document
    .getElementById("apply-filters-btn")
    .addEventListener("click", function () {
      document
        .getElementById("move-to-hostel-listing")
        .scrollIntoView({ behavior: "smooth" });
    });
});

// Service Worker registration for PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("ServiceWorker registered:", registration);
    })
    .catch(function (error) {
      console.log("ServiceWorker registration failed:", error);
    });
}

// Example hostel data (10 random hostels near major universities)
const hostels = [
  // Vinoba Bhave University (Hazaribagh, Jharkhand) - Shifted around 24.026092, 85.377436
  {
    name: "VBU Hostel 1",
    lat: 24.026,
    lng: 85.377,
    address: "Near VBU Main Gate, Merawal, Hazaribagh",
  },
  {
    name: "VBU Hostel 2",
    lat: 24.027,
    lng: 85.379,
    address: "Sindur Road, Merawal, Hazaribagh",
  },
  {
    name: "VBU Hostel 3",
    lat: 24.025,
    lng: 85.375,
    address: "Merawal Bypass, Hazaribagh",
  },
  {
    name: "VBU Hostel 4",
    lat: 24.028,
    lng: 85.378,
    address: "Sindur Village, Hazaribagh",
  },
  {
    name: "VBU Hostel 5",
    lat: 24.024,
    lng: 85.376,
    address: "Near Merawal Market, Hazaribagh",
  },
  {
    name: "VBU Hostel 6",
    lat: 24.026,
    lng: 85.38,
    address: "Sindur Main Road, Hazaribagh",
  },
  {
    name: "VBU Hostel 7",
    lat: 24.029,
    lng: 85.374,
    address: "Merawal Colony, Hazaribagh",
  },

  // University of Delhi (Delhi)
  {
    name: "DU Hostel 1",
    lat: 28.686,
    lng: 77.211,
    address: "North Campus, Delhi",
  },
  {
    name: "DU Hostel 2",
    lat: 28.688,
    lng: 77.215,
    address: "Kamla Nagar, Delhi",
  },
  {
    name: "DU Hostel 3",
    lat: 28.684,
    lng: 77.213,
    address: "GTB Nagar, Delhi",
  },
  {
    name: "DU Hostel 4",
    lat: 28.687,
    lng: 77.217,
    address: "Vishwavidyalaya, Delhi",
  },
  {
    name: "DU Hostel 5",
    lat: 28.689,
    lng: 77.21,
    address: "Model Town, Delhi",
  },
  {
    name: "DU Hostel 6",
    lat: 28.685,
    lng: 77.212,
    address: "Hudson Lane, Delhi",
  },
  {
    name: "DU Hostel 7",
    lat: 28.69,
    lng: 77.214,
    address: "Malka Ganj, Delhi",
  },

  // University of Mumbai (Mumbai)
  { name: "MU Hostel 1", lat: 19.073, lng: 72.899, address: "Kalina, Mumbai" },
  {
    name: "MU Hostel 2",
    lat: 19.075,
    lng: 72.902,
    address: "Santacruz East, Mumbai",
  },
  { name: "MU Hostel 3", lat: 19.072, lng: 72.9, address: "Kurla, Mumbai" },
  {
    name: "MU Hostel 4",
    lat: 19.074,
    lng: 72.898,
    address: "Vidyavihar, Mumbai",
  },
  { name: "MU Hostel 5", lat: 19.076, lng: 72.901, address: "Sion, Mumbai" },
  { name: "MU Hostel 6", lat: 19.071, lng: 72.903, address: "Chembur, Mumbai" },
  {
    name: "MU Hostel 7",
    lat: 19.077,
    lng: 72.897,
    address: "Ghatkopar, Mumbai",
  },

  // Anna University (Chennai) - Randomized
  { name: "AU Hostel 1", lat: 13.013, lng: 80.238, address: "Guindy, Chennai" },
  {
    name: "AU Hostel 2",
    lat: 13.016,
    lng: 80.244,
    address: "Saidapet, Chennai",
  },
  { name: "AU Hostel 3", lat: 13.011, lng: 80.241, address: "Adyar, Chennai" },
  {
    name: "AU Hostel 4",
    lat: 13.014,
    lng: 80.239,
    address: "Velachery, Chennai",
  },
  {
    name: "AU Hostel 5",
    lat: 13.012,
    lng: 80.243,
    address: "Taramani, Chennai",
  },
  {
    name: "AU Hostel 6",
    lat: 13.015,
    lng: 80.237,
    address: "Kotturpuram, Chennai",
  },
  {
    name: "AU Hostel 7",
    lat: 13.017,
    lng: 80.242,
    address: "Besant Nagar, Chennai",
  },

  // University of Calcutta (Kolkata) - Randomized
  {
    name: "CU Hostel 1",
    lat: 22.573,
    lng: 88.362,
    address: "College Street, Kolkata",
  },
  {
    name: "CU Hostel 2",
    lat: 22.575,
    lng: 88.367,
    address: "Bowbazar, Kolkata",
  },
  { name: "CU Hostel 3", lat: 22.57, lng: 88.364, address: "Sealdah, Kolkata" },
  {
    name: "CU Hostel 4",
    lat: 22.576,
    lng: 88.361,
    address: "Park Circus, Kolkata",
  },
  {
    name: "CU Hostel 5",
    lat: 22.572,
    lng: 88.366,
    address: "Ballygunge, Kolkata",
  },
  {
    name: "CU Hostel 6",
    lat: 22.574,
    lng: 88.363,
    address: "Salt Lake, Kolkata",
  },
  { name: "CU Hostel 7", lat: 22.571, lng: 88.365, address: "Howrah, Kolkata" },
];

// --- University Coordinates for Map Centering ---
const universityLocations = {
  "university-v": { lat: 24.026, lng: 85.377, zoom: 15 }, // Vinoba Bhave University
  "university-a": { lat: 28.686, lng: 77.211, zoom: 14 }, // University of Delhi
  "university-b": { lat: 19.073, lng: 72.899, zoom: 14 }, // University of Mumbai
  "university-c": { lat: 13.012, lng: 80.24, zoom: 14 }, // Anna University
  "university-d": { lat: 22.572, lng: 88.363, zoom: 14 }, // University of Calcutta
};

let mapInstance = null;
let userMarker = null;
let hostelMarkers = [];

function showMap(centerLat, centerLng, zoomLevel) {
  // If map already exists, just set view
  if (mapInstance) {
    mapInstance.setView(
      [centerLat, centerLng],
      zoomLevel || mapInstance.getZoom()
    );
    return;
  }

  // Helper: fallback to default university if geolocation fails
  function fallbackToDefault() {
    // Default to Vinoba Bhave University if nothing else
    const def = universityLocations["university-v"];
    mapInstance = L.map("hostel-map").setView([def.lat, def.lng], def.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapInstance
    );
    // Custom hostel icon
    const hostelIcon = L.icon({
      iconUrl: "images/hostel-map.png",
      iconSize: [38, 38],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
    hostelMarkers = hostels.map((hostel) =>
      L.marker([hostel.lat, hostel.lng], { icon: hostelIcon })
        .addTo(mapInstance)
        .bindPopup(`<b>${hostel.name}</b><br>${hostel.address}`)
    );
  }

  // Try to get geolocation with better compatibility
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const userLat = centerLat || position.coords.latitude;
        const userLng = centerLng || position.coords.longitude;
        mapInstance = L.map("hostel-map").setView(
          [userLat, userLng],
          zoomLevel || 15
        );

        // Add current location button
        const locateBtn = L.control({ position: "topleft" });
        locateBtn.onAdd = function (map) {
          const btn = L.DomUtil.create(
            "button",
            "leaflet-bar leaflet-control leaflet-control-custom"
          );
          btn.innerHTML = "📍";
          btn.title = "Go to my location";
          btn.style.background = "#fff";
          btn.style.width = "36px";
          btn.style.height = "36px";
          btn.style.fontSize = "1.5em";
          btn.style.cursor = "pointer";
          btn.style.display = "flex";
          btn.style.alignItems = "center";
          btn.style.justifyContent = "center";
          btn.onclick = function (e) {
            e.stopPropagation();
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                function (pos) {
                  map.setView([pos.coords.latitude, pos.coords.longitude], 15);
                },
                function () {
                  alert(
                    "Location access denied. Please enable location permissions in your browser settings."
                  );
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
              );
            }
          };
          return btn;
        };
        locateBtn.addTo(mapInstance);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          mapInstance
        );

        // User marker
        userMarker = L.marker([userLat, userLng])
          .addTo(mapInstance)
          .bindPopup("You are here")
          .openPopup();

        // Custom hostel icon
        const hostelIcon = L.icon({
          iconUrl: "images/hostel-map.png",
          iconSize: [38, 38],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        // Hostel markers with custom icon
        hostelMarkers = hostels.map((hostel) =>
          L.marker([hostel.lat, hostel.lng], { icon: hostelIcon })
            .addTo(mapInstance)
            .bindPopup(`<b>${hostel.name}</b><br>${hostel.address}`)
        );
      },
      function (error) {
        // Mobile browsers may block location by default or require HTTPS
        if (window.location.protocol !== "https:") {
          alert(
            "Location access requires HTTPS. Please use https:// for full functionality."
          );
        } else if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location access denied. Please enable location permissions in your browser settings."
          );
        } else {
          alert("Unable to retrieve your location. Showing default map.");
        }
        fallbackToDefault();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    fallbackToDefault();
  }
}

window.onload = function () {
  showMap();
  // Add event listener for university select
  const universitySelect = document.getElementById("university-select");
  if (universitySelect) {
    universitySelect.addEventListener("change", function () {
      const selected = universitySelect.value;
      if (universityLocations[selected]) {
        const { lat, lng, zoom } = universityLocations[selected];
        showMap(lat, lng, zoom);
      }
    });
  }
};
