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
console.log("Firebase initialized successfully in reviews.js!");
console.log("Firestore DB object:", db);

document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewerNameInput = document.getElementById('reviewer-name');
    const universityInput = document.getElementById('university-of-study');
    const ratingInput = document.getElementById('rating');
    const reviewTextInput = document.getElementById('review-text');
    const reviewMessage = document.getElementById('review-message');
    const reviewCardsContainer = document.getElementById('review-cards-container');

    const db = firebase.firestore();
    const reviewsCollection = db.collection('reviews');
    const REVIEWS_LIMIT = 10; // Max number of reviews to display

    // Function to render stars based on rating number
    function renderStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fas fa-star"></i>'; // Filled star (Font Awesome solid star)
            } else {
                stars += '<i class="far fa-star"></i>'; // Empty star (Font Awesome regular star)
            }
        }
        return stars;
    }

    // Function to display reviews from Firestore
    async function displayReviews() {
        reviewCardsContainer.innerHTML = '<p class="loading-message">Loading reviews...</p>'; // Show loading message

        try {
            const snapshot = await reviewsCollection
                .orderBy('timestamp', 'desc') // Order by most recent
                .limit(REVIEWS_LIMIT) // Get only the latest 10
                .get();

            reviewCardsContainer.innerHTML = ''; // Clear loading message

            if (snapshot.empty) {
                reviewCardsContainer.innerHTML = '<p style="text-align: center; color: #666;">No reviews yet. Be the first to share your experience!</p>';
                return;
            }

            snapshot.forEach(doc => {
                const review = doc.data();
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review-card');

                reviewCard.innerHTML = `
                    <div class="rating-stars">${renderStars(review.rating)}</div>
                    <h3>${review.name}</h3>
                    <p class="university">${review.university}</p>
                    <p>${review.reviewText}</p>
                `;
                reviewCardsContainer.appendChild(reviewCard);
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
            reviewCardsContainer.innerHTML = '<p class="form-message" style="color: red; text-align: center;">Error loading reviews. Please try again later.</p>';
        }
    }

    // Handle review form submission
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        reviewMessage.textContent = ''; // Clear previous messages
        reviewMessage.style.color = '';

        const name = reviewerNameInput.value.trim();
        const university = universityInput.value.trim();
        const rating = parseInt(ratingInput.value, 10); // Parse as integer
        const reviewText = reviewTextInput.value.trim();

        // Basic validation
        if (!name || !university || !rating || !reviewText) {
            reviewMessage.textContent = 'Please fill in all fields.';
            reviewMessage.style.color = 'red';
            return;
        }
        if (rating < 1 || rating > 5) {
            reviewMessage.textContent = 'Rating must be between 1 and 5.';
            reviewMessage.style.color = 'red';
            return;
        }

        try {
            await reviewsCollection.add({
                name: name,
                university: university,
                rating: rating,
                reviewText: reviewText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Firestore timestamp
            });

            reviewMessage.innerHTML = `<img src="images/success.gif" alt="Success" style="width: 40px; height: 40px; vertical-align: middle; margin-right: 8px;"> Your review has been submitted successfully!`;
            reviewMessage.style.color = 'green';
            reviewForm.reset(); // Clear the form

            // Refresh reviews display after successful submission
            displayReviews();

        } catch (error) {
            console.error('Error submitting review:', error);
            reviewMessage.textContent = 'Error submitting review. Please try again.';
            reviewMessage.style.color = 'red';
        }
    });

    // Initial display of reviews when the page loads
    displayReviews();
});
