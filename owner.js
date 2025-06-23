// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBmfu8M8jAGMTw-Y9munlvZDYIjnxfpbyg",
    authDomain: "hostelfinder-99ba5.firebaseapp.com",
    projectId: "hostelfinder-99ba5",
    storageBucket: "hostelfinder-99ba5.appspot.com",
    messagingSenderId: "327861201482",
    appId: "1:327861201482:web:b5905432820f8a536e54b3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM
const form = document.getElementById('hostel-form');
const message = document.getElementById('add-hostel-message');
const cancelBtn = document.getElementById('cancel-btn');

// Auth check
firebase.auth().onAuthStateChanged(user => {
    if (!user) window.location.href = "owner-auth.html";
    // Optionally, you can pre-fill owner email here if desired
});

form.onsubmit = async function(e) {
    e.preventDefault();
    message.textContent = "Saving...";
    message.style.color = "#333";
    
    const user = firebase.auth().currentUser;
    if (!user) {
        message.textContent = "Authentication error. Please sign in again.";
        message.style.color = "#e74c3c";
        return;
    }
    
    // Get field values
    const hostelName = document.getElementById('owner-hostel-name').value.trim();
    const universityId = document.getElementById('owner-university-id').value;
    const location = document.getElementById('owner-location').value.trim();
    const image = document.getElementById('owner-image').value; // default or URL
    const distance = parseFloat(document.getElementById('owner-distance').value);
    const gender = document.getElementById('owner-gender').value;
    const minRent = parseInt(document.getElementById('owner-min-rent').value, 10);
    const maxRent = parseInt(document.getElementById('owner-max-rent').value, 10);
    const ownerContactName = document.getElementById('owner-contact-name').value.trim();
    const ownerPhone = document.getElementById('owner-phone').value.trim();
    const description = document.getElementById('owner-description').value.trim();
    
    // Get checked values for room capacity and facilities
    const roomCapacity = Array.from(document.querySelectorAll('.owner-room-capacity-checkbox:checked')).map(cb => cb.value);
    const facilities = Array.from(document.querySelectorAll('.owner-facility-checkbox:checked')).map(cb => cb.value);
    
    // Basic validation (in addition to HTML5)
    if (!hostelName || !universityId || !location || isNaN(distance) || !gender || isNaN(minRent) || isNaN(maxRent) ||
        !ownerContactName || !ownerPhone || !description
    ) {
        message.textContent = "Please fill all required fields correctly.";
        message.style.color = "#e74c3c";
        return;
    }
    
    
    if (minRent > maxRent) {
        message.textContent = "Minimum rent cannot be greater than maximum rent.";
        message.style.color = "#e74c3c";
        return;
    }
    
    // Build data object
    const hostelData = {
        name: hostelName,
        universityId: universityId,
        location: location,
        image: image,
        distance: distance,
        gender: gender,
        minRent: minRent,
        maxRent: maxRent,
        roomCapacity: roomCapacity,
        facilities: facilities,
        ownerContactName: ownerContactName,
        ownerPhone: ownerPhone,
        ownerEmail: user.email,
        description: description,
        ownerUID: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('ownerHostelsSubmission').add(hostelData);
        message.textContent = "Hostel added successfully! Redirecting...";
        message.style.color = "green";
        setTimeout(() => window.location.href = "owner-dashboard.html", 1200);
    } catch (err) {
        message.textContent = "Error: " + err.message;
        message.style.color = "#e74c3c";
    }
};

cancelBtn.onclick = function() {
    window.location.href = "owner-dashboard.html";
};