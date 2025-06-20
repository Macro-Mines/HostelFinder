// Firebase configuration (replace with your actual config if different)
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
console.log("Firebase initialized successfully in contact-us.js!");
console.log("Firestore DB object:", db);

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form'); // Use class selector since no ID on form
    const contactMessage = document.getElementById('contact-message');

    if (!contactForm || !contactMessage) {
        console.error("Contact form or message element not found!");
        return;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        contactMessage.textContent = 'Sending message...';
        contactMessage.style.color = 'blue';

        // Get values from form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic client-side validation
        if (!name || !email || !subject || !message) {
            contactMessage.textContent = 'Please fill in all fields.';
            contactMessage.style.color = 'red';
            return;
        }

        // Validate email format (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            contactMessage.textContent = 'Please enter a valid email address.';
            contactMessage.style.color = 'red';
            return;
        }

        const inquiryData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Adds server timestamp
        };

        try {
            // Add a new document to the 'contactInquiries' collection
            const docRef = await db.collection('contactInquiries').add(inquiryData);
            // contactMessage.textContent = 'Your message has been sent successfully!';
            
            contactMessage.innerHTML = `<img src="images/success.gif" alt="Success" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 8px;"> Your message has been sent successfully!`;
            
            contactMessage.style.color = 'green';
            contactForm.reset(); // Clear the form
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
            contactMessage.textContent = `Error sending message: ${error.message}`;
            contactMessage.style.color = 'red';
        }
    });
});
