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

const authForm = document.getElementById('auth-form');
const authMessage = document.getElementById('auth-message');
const signInBtn = document.getElementById('sign-in-btn');
const signUpBtn = document.getElementById('sign-up-btn');

authForm.onsubmit = e => {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'owner-dashboard.html';
    })
    .catch(error => {
      authMessage.textContent = error.message;
    });
};

signUpBtn.onclick = () => {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'owner-dashboard.html';
    })
    .catch(error => {
      authMessage.textContent = error.message;
    });
};

// If already signed in, redirect to dashboard
firebase.auth().onAuthStateChanged(user => {
  if (user) window.location.href = 'owner-dashboard.html';
});