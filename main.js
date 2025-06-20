// Firebase configuration and initialization (ADD THIS AT THE VERY TOP OF MAIN.JS)
const firebaseConfig = {
    apiKey: "AIzaSyBmfu8M8jAGMTw-Y9munlvZDYIjnxfpbyg",
    authDomain: "hostelfinder-99ba5.firebaseapp.com",
    projectId: "hostelfinder-99ba5",
    storageBucket: "hostelfinder-99ba5.firebasestorage.app",
    messagingSenderId: "327861201482",
    appId: "1:327861201482:web:b5905432820f8a536e54b3",
    measurementId: "G-ED9MGNXPCG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Get a reference to the Firestore database
// END Firebase initialization
console.log("Firebase initialized successfully in main.js!");
console.log("Firestore DB object:", db);

document.addEventListener('DOMContentLoaded', async () => {
    const universitySelect = document.getElementById('university-select');
    const hostelListing = document.getElementById('hostel-listing'); // Changed from hostel-grid to hostel-listing
    const genderCheckboxes = document.querySelectorAll('input[name="gender"]');
    const minRentInput = document.getElementById('min-rent');
    const maxRentInput = document.getElementById('max-rent');
    const distanceSlider = document.getElementById('distance-slider');
    const distanceValueSpan = document.getElementById('distance-value');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const facilitiesCheckboxes = document.querySelectorAll('.facility-checkbox');
    const findHostelsButton = document.getElementById('find-hostels-btn'); // New button variable

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
            if (allHostels.length === 0 || hostelListing.classList.contains('initial-state')) {
                hostelListing.innerHTML = '<p class="loading-messege">Loading hostels...</p>';
                hostelListing.classList.add('loading-state');
            }

            // initial db 'hostels'
            const snapshot = await db.collection('testHostels').get();
            allHostels = snapshot.docs.map(doc => ({
                id: doc.id, // Firestore document ID
                ...doc.data()
            }));
            console.log("Hostels fetched from Firestore:", allHostels); // Debugging
            
            hostelListing.classList.remove('initial-state'); // Remove initial state after fetching
            hostelListing.classList.remove('loading-state'); // Remove loading state here

        } catch (error) {
            console.error("Error fetching hostels:", error);
            // More specific logging of the error itself:
            console.error("Full error details:", error.name, error.message, error.stack);
            hostelListing.innerHTML = '<p class="error-message">Error loading hostels. Please try again later.</p>';
            hostelListing.classList.remove('loading-state');
        }
    }

    // --- Filter and Display Hostels ---
    function filterAndDisplayHostels() {
        const selectedUniversityId = universitySelect.value;
        const selectedGenders = Array.from(genderCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        const minRent = parseInt(minRentInput.value) || 0;
        const maxRent = parseInt(maxRentInput.value) || Infinity;
        const maxDistance = parseFloat(distanceSlider.value);
        const selectedFacilities = Array.from(facilitiesCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let filteredHostels = allHostels.filter(hostel => {
            // Filter by University
            // Only apply university filter if a specific university is selected AND it's not the default "Select Your University" option
            if (selectedUniversityId && selectedUniversityId !== "" && hostel.universityId !== selectedUniversityId) {
                return false;
            }

            // Filter by Gender
            if (selectedGenders.length > 0 && !selectedGenders.includes(hostel.gender)) {
                return false;
            }

            // Filter by Rent
            // Ensure hostel.roomRent exists and has min/max properties
            if (hostel.roomRent && (hostel.roomRent.min > maxRent || hostel.roomRent.max < minRent)) {
                return false;
            }

            // Filter by Distance
            if (hostel.distance > maxDistance) {
                return false;
            }

            // Filter by Facilities
            if (selectedFacilities.length > 0) {
                const hasAllFacilities = selectedFacilities.every(facility =>
                    hostel.facilities && Array.isArray(hostel.facilities) && hostel.facilities.includes(facility)
                );
                if (!hasAllFacilities) {
                    return false;
                }
            }

            return true;
        });

        // Sort by distance (optional, but good for user experience)
        filteredHostels.sort((a, b) => a.distance - b.distance);

        hostelListing.innerHTML = ''; // Clear previous listings

        // If no university is selected AND there are no other filters applied,
        // show the initial placeholder
        if (!selectedUniversityId && selectedGenders.length === 0 && minRent === 0 && maxRent === Infinity && maxDistance === parseFloat(distanceSlider.max) && selectedFacilities.length === 0) {
             hostelListing.innerHTML = '<p class="placeholder-text">Please select a university to see available hostels.</p>';
             return; // Stop here if no filters/university
        }

        if (filteredHostels.length === 0) {
            hostelListing.innerHTML = '<p class="placeholder-text">No hostels found matching your criteria.</p>';
        } else {
            filteredHostels.forEach(hostel => {
                const hostelCard = document.createElement('div');
                hostelCard.classList.add('hostel-card');


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
        findHostelsButton.addEventListener('click', async () => {
            const selectedUniversityId = universitySelect.value;
            if (selectedUniversityId === "" || selectedUniversityId === null || selectedUniversityId === "Select Your University") {
                hostelListing.innerHTML = '<p class="placeholder-text">Please select a university first.</p>';
                return; // Stop if no university selected
            }
            
            // If allHostels is empty, fetch them, then filter. Otherwise, just filter.
            if (allHostels.length === 0) {
                await fetchHostels(); // Fetches all hostels and updates allHostels array
            }
            filterAndDisplayHostels(); // Filters from the (now possibly fetched) allHostels
        });
    }

    applyFiltersBtn.addEventListener('click', filterAndDisplayHostels);

    clearFiltersBtn.addEventListener('click', () => {
        // Reset filters
        genderCheckboxes.forEach(checkbox => checkbox.checked = false);
        minRentInput.value = '';
        maxRentInput.value = '';
        distanceSlider.value = distanceSlider.max; // Set to max distance
        distanceValueSpan.textContent = `${distanceSlider.max} km`;
        facilitiesCheckboxes.forEach(checkbox => checkbox.checked = false);
        
        // After clearing, re-display based on the new (empty) filter state
        filterAndDisplayHostels(); 
    });

    distanceSlider.addEventListener('input', () => {
        distanceValueSpan.textContent = `${distanceSlider.value} km`;
    });

    // Initial state: Display placeholder text
    hostelListing.innerHTML = '<p class="placeholder-text">Please select a university to see available hostels.</p>';
    hostelListing.classList.add('initial-state'); // Add a class to manage initial state if needed

    // Pre-fetch hostels in the background if preferred, but don't display until button click
    // Uncomment the line below if you want data to be ready faster, but it will still
    // be filtered/displayed only on "Find Hostels" button click.
    //fetchHostels();
    
    document.getElementById('find-hostels-btn').addEventListener('click', function() {
    document.getElementById('move-to-hostel-listing').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('apply-filters-btn').addEventListener('click', function() {
    document.getElementById('move-to-hostel-listing').scrollIntoView({ behavior: 'smooth' });
    });
    
    
});