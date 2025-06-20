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
const db = firebase.firestore();
console.log("Firebase initialized successfully in owner.js!");
console.log("Firestore DB object:", db);

document.addEventListener('DOMContentLoaded', () => {
    const addHostelForm = document.getElementById('add-hostel-form');
    const addHostelMessage = document.getElementById('add-hostel-message');
    const ownerFacilityCheckboxes = document.querySelectorAll('.owner-facility-checkbox');
    // NEW: Select all room capacity checkboxes by their class
    const ownerRoomCapacityCheckboxes = document.querySelectorAll('.owner-room-capacity-checkbox');


    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        addHostelMessage.textContent = "Firebase is not initialized. Please check your Firebase configuration.";
        addHostelMessage.style.color = 'red';
        return;
    }

    addHostelForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        addHostelMessage.textContent = 'Adding hostel...';
        addHostelMessage.style.color = 'blue';

        // Get values from form fields
        const hostelName = document.getElementById('owner-hostel-name').value;
        const universityId = document.getElementById('owner-university-id').value;
        const location = document.getElementById('owner-location').value;
        const image = document.getElementById('owner-image').value;
        const distance = parseFloat(document.getElementById('owner-distance').value);
        const gender = document.getElementById('owner-gender').value;
        const minRent = parseInt(document.getElementById('owner-min-rent').value);
        const maxRent = parseInt(document.getElementById('owner-max-rent').value);
        // OLD: const roomCapacity = document.getElementById('owner-room-capacity').value;
        const facilitiesRaw = document.getElementById('owner-facilities') ? document.getElementById('owner-facilities').value : ''; // Defensive if element removed
        const ownerContactName = document.getElementById('owner-contact-name').value;
        const ownerPhone = document.getElementById('owner-phone').value;
        const ownerEmail = document.getElementById('owner-email').value;
        const description = document.getElementById('owner-description').value;

        // Collect selected facilities from checkboxes
        const facilities = Array.from(ownerFacilityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // NEW: Collect selected room capacities from checkboxes
        const roomCapacity = Array.from(ownerRoomCapacityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Basic validation updated for array fields
        if (!hostelName || !universityId || !location || !image || isNaN(distance) || !gender || isNaN(minRent) || isNaN(maxRent) || roomCapacity.length === 0 || facilities.length === 0 || !ownerContactName || !ownerPhone || !ownerEmail || !description) {
            addHostelMessage.textContent = 'Please fill in all required fields and select at least one facility and room capacity.';
            addHostelMessage.style.color = 'red';
            return;
        }
        
        


        const newHostelData = {
            name: hostelName,
            universityId: universityId,
            location: location,
            image: image,
            distance: distance,
            gender: gender,
            roomRent: { min: minRent, max: maxRent },
            roomCapacity: roomCapacity,
            facilities: facilities,
            ownerContactName: ownerContactName,
            ownerPhone: ownerPhone,
            ownerEmail: ownerEmail,
            description: description
        };

        try {
            //initial db 'hostels'
            const docRef = await db.collection('testHostels').add(newHostelData);
            addHostelMessage.innerHTML = `<img src="images/success.gif" alt="Success" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 8px;"> Hostel "${hostelName}" added successfully!`;

            addHostelMessage.style.color = 'green';
            addHostelForm.reset(); // Clear text inputs
            ownerFacilityCheckboxes.forEach(checkbox => checkbox.checked = false);
            // NEW: Uncheck all room capacity checkboxes
            ownerRoomCapacityCheckboxes.forEach(checkbox => checkbox.checked = false);
        } catch (error) {
            console.error("Error adding document: ", error);
            addHostelMessage.textContent = `Error adding hostel: ${error.message}`;
            addHostelMessage.style.color = 'red';
        }
    });
});
