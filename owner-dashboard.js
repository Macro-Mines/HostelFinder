const firebaseConfig = {
  apiKey: "AIzaSyBmfu8M8jAGMTw-Y9munlvZDYIjnxfpbyg",
  authDomain: "hostelfinder-99ba5.firebaseapp.com",
  projectId: "hostelfinder-99ba5",
  storageBucket: "hostelfinder-99ba5.appspot.com",
  messagingSenderId: "327861201482",
  appId: "1:327861201482:web:b5905432820f8a536e54b3",
  measurementId: "G-ED9MGNXPCG"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const welcomeMessage = document.getElementById('welcome-message');
const hostelList = document.getElementById('hostel-list');
const dashboardMessage = document.getElementById('dashboard-message');
const signOutBtn = document.getElementById('sign-out-btn');
const listNewBtn = document.getElementById('list-new-btn');

// Authentication check
firebase.auth().onAuthStateChanged(async user => {
  if (!user) {
    window.location.href = "owner-auth.html";
    return;
  }
  

  if (welcomeMessage) { // Add a check to ensure the element exists
      welcomeMessage.innerHTML = `<strong>Welcome</strong>, <span class="user-email">${user.email}</span>`;
  }

  
  
  
  //welcomeMessage.textContent = `Welcome, ${user.email}`;
  loadOwnerHostels(user.uid);
});

// List New Hostel button
listNewBtn.onclick = () => window.location.href = "owner.html";

// Sign Out button
signOutBtn.onclick = () => firebase.auth().signOut();

// Load hostels belonging to the current owner
function loadOwnerHostels(ownerUID) {
  hostelList.innerHTML = '<div>Loading your hostels...</div>';
  db.collection('ownerHostelsSubmission').where('ownerUID', '==', ownerUID)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        hostelList.innerHTML = '<div style="color:#888;font-size:1.07rem;">No hostels listed yet. Click "List New Hostel" to add one!</div>';
        return;
      }
      hostelList.innerHTML = '';
      snapshot.forEach(doc => {
        const hostel = doc.data();
        hostelList.innerHTML += `
                    <div class="hostel-card">
                        <div class="hostel-title">${hostel.name}</div>
                        <div class="hostel-meta"><b>Location:</b> ${hostel.location}</div>
                        <div class="hostel-meta"><b>Gender:</b> ${hostel.gender || 'N/A'}</div>
                        <div class="hostel-meta"><b>Distance:</b> ${hostel.distance} km</div>
                        
                        <div class="hostel-meta"><b>Min-Rent:</b> ${hostel.minRent}  | <b>Max-Rent:</b> ${hostel.maxRent}</div>
                        <div class="hostel-meta"><b>Contact:</b> ${hostel.ownerContactName || ''} (${hostel.ownerPhone || ''})</div>
                        <div class="hostel-meta"><b>Description:</b> ${hostel.description}</div>
                        
                        <div class="hostel-actions">
                            <button class="hostel-btn edit" onclick="editHostel('${doc.id}')">Edit</button>
                            <button class="hostel-btn delete" onclick="deleteHostel('${doc.id}', '${hostel.name}')">Delete</button>
                        </div>
                    </div>
                `;
      });
    })
    .catch(err => {
      dashboardMessage.textContent = "Could not load hostels: " + err.message;
    });
}

// Edit Hostel (optional: implement modal or redirect)
window.editHostel = function(docId) {
  // For now, redirect to owner.html with ?edit=docId (you can handle editing there)
  window.location.href = `owner.html?edit=${docId}`;
}

// Delete Hostel
window.deleteHostel = function(docId, hostelName) {
  if (confirm(`Delete hostel "${hostelName}"? This cannot be undone.`)) {
    db.collection('ownerHostelsSubmission').doc(docId).delete()
      .then(() => {
        dashboardMessage.style.color = "green";
        dashboardMessage.textContent = `Hostel "${hostelName}" deleted.`;
        firebase.auth().onAuthStateChanged(user => {
          if (user) loadOwnerHostels(user.uid);
        });
      })
      .catch(err => {
        dashboardMessage.style.color = "red";
        dashboardMessage.textContent = "Delete failed: " + err.message;
      });
  }
}