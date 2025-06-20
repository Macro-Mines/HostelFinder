// Firebase configuration and initialization
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
console.log("Firebase initialized successfully in hostel-details.js!");
console.log("Firestore DB object:", db);

document.addEventListener('DOMContentLoaded', async () => {
    const hostelDetailContent = document.getElementById('hostel-detail-content');

    // Function to get URL parameters
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const hostelId = getUrlParameter('id');
    console.log("Hostel ID from URL:", hostelId); // Debugging: Check if ID is captured

    if (hostelId) {
        try {
            hostelDetailContent.innerHTML = '<img src="images/loading.gif" alt="loading" width="100px"><p class="loading-message">Loading hostel details...</p>';
            hostelDetailContent.classList.add('loading-state');

            // Fetch the specific hostel document from Firestore 'hostels'
            const docRef = db.collection('testHostels').doc(hostelId);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
                const foundHostel = { id: docSnap.id, ...docSnap.data() };
                console.log("Hostel details fetched from Firestore:", foundHostel); // Debugging: Inspect fetched data

                // Populate the details
                hostelDetailContent.innerHTML = `
                    <div class="hostel-detail-card">
                        <img src="${foundHostel.image}" alt="${foundHostel.name}" class="detail-image">
                        <div class="detail-content">
                            <h1>${foundHostel.name}</h1>
                            <p class="detail-location"><img src="images/location-pin.gif" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 0px;"> ${foundHostel.location}</p>
                            
                            <p class="detail-description">${foundHostel.description}</p>

                            <div class="detail-grid">
                            
                                <div class="detail-item">
                                
                                    <img src="images/scooter.gif" style="width: 40px; height: 40px; vertical-align: bottom; padding-bottom: 0px; margin-bottom: 0px";>
                                    <strong>Distance from College: </strong>
                                    <span>${foundHostel.distance || 'N/A'} km</span>
                                </div>
                                
                                
                                <div class="detail-item">
                                <img src="images/gender-logo.gif" style="width: 40px; height: 40px; vertical-align: bottom; padding-bottom: 0px; margin-bottom: 0px";>
                                    <strong>Gender Specific:</strong>
                                    <span>${foundHostel.gender || 'N/A'}</span>
                                </div>
                                
                                <div class="detail-item">
                                <img src="images/rent.gif" style="width: 40px; height: 40px; vertical-align: bottom; padding-bottom: 0px; margin-bottom: 0px";>
                                    <strong>Room Rent:</strong>
                                    <span>₹${foundHostel.roomRent ? foundHostel.roomRent.min : 'N/A'} - ₹${foundHostel.roomRent ? foundHostel.roomRent.max : 'N/A'} per month</span>
                                </div>
            
                                <div class="detail-item">
                                <img src="images/group.gif" style="width: 40px; height: 40px; vertical-align: bottom; padding-bottom: 0px; margin-bottom: 0px";>
                                    <strong>Room Capacity:</strong>
                                    <span>${foundHostel.roomCapacity && Array.isArray(foundHostel.roomCapacity) && foundHostel.roomCapacity.length > 0 ? foundHostel.roomCapacity.join(', ') : 'N/A'}</span>
                                </div>

                            </div>

                            <div class="detail-section">
                                <h3>Hostel Facilities</h3>
                                <ul class="facilities-list">
                                    ${foundHostel.facilities && Array.isArray(foundHostel.facilities) && foundHostel.facilities.length > 0 ?
                                        foundHostel.facilities.map(facility => `<li>${facility}</li>`).join('') :
                                        '<li>No specific facilities listed.</li>'
                                    }
                                </ul>
                            </div>

                            <div class="detail-section">
                                <h3>Contact Details</h3>
                                <p><strong>Owner Name:</strong> ${foundHostel.ownerContactName || 'N/A'}</p>
                                <p><strong>Phone:</strong> <a href="tel:${foundHostel.ownerPhone}">${foundHostel.ownerPhone || 'N/A'}</a></p>
                                <p><strong>Email:</strong> <a href="mailto:${foundHostel.ownerEmail}">${foundHostel.ownerEmail || 'N/A'}</a></p>
                            </div>

                            <a href="home-page.html#find-hostel" class="btn-primary back-btn">Back to Hostels</a>
                        </div>
                    </div>
                `;
                hostelDetailContent.classList.remove('loading-state');

            } else {
                hostelDetailContent.innerHTML = `<p class="error-message">Hostel not found.</p>`;
                hostelDetailContent.classList.remove('loading-state');
            }
        } catch (error) {
            console.error("Error fetching hostel details:", error);
            // Log full error details to help debug if it's a field access issue
            console.error("Full error details:", error.name, error.message, error.stack);
            hostelDetailContent.innerHTML = `<p class="error-message">Error loading hostel details. Please try again later.</p>`;
            hostelDetailContent.classList.remove('loading-state');
        }
    } else {
        hostelDetailContent.innerHTML = `<p class="error-message">No hostel ID provided. Please go back to the <a href="home-page.html">home page</a> to select a hostel.</p>`;
        hostelDetailContent.classList.remove('loading-state');
    }
});
