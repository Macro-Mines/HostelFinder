// Live Chat System using Firebase Realtime Database
const firebaseConfig = {
  apiKey: "AIzaSyBmfu8M8jAGMTw-Y9munlvZDYIjnxfpbyg",
  authDomain: "hostelfinder-99ba5.firebaseapp.com",
  databaseURL:
    "https://hostelfinder-99ba5-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "hostelfinder-99ba5",
  storageBucket: "hostelfinder-99ba5.appspot.com",
  messagingSenderId: "327861201482",
  appId: "1:327861201482:web:b5905432820f8a536e54b3",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const emojiBtn = document.getElementById("emoji-btn");
const emojiPicker = document.getElementById("emoji-picker");

// Prompt for username
let username = localStorage.getItem("chat-username");
if (!username) {
  username =
    prompt("Enter your chat name:")?.trim() ||
    "Guest" + Math.floor(Math.random() * 10000);
  localStorage.setItem("chat-username", username);
}

// Assign a color to each user (based on username hash)
function getUserColor(name) {
  const colors = [
    "#007bff",
    "#6ec6ff",
    "#ff6e6e",
    "#81c784",
    "#ba68c8",
    "#ffd54f",
    "#f06292",
    "#4dd0e1",
    "#a1887f",
    "#90a4ae",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// Send message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (text) {
    db.ref("livechat").push({
      user: username,
      text,
      time: Date.now(),
    });
    chatInput.value = "";
  }
});

// Listen for new messages
function renderMessage({ user, text, time }) {
  const msg = document.createElement("div");
  msg.className = "chat-msg";
  const isMe = user === username;
  msg.style.alignSelf = isMe ? "flex-end" : "flex-start";
  msg.style.background = isMe
    ? "linear-gradient(90deg,#003366 0%,#0056b3 100%)"
    : "#232526";
  msg.style.color = isMe ? "#fff" : "#fff6d6";
  msg.innerHTML = `<span class="chat-user" style="color:${getUserColor(
    user
  )};">${user}</span> <span class="chat-text">${text}</span> <span class="chat-time">${new Date(
    time
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
db.ref("livechat")
  .limitToLast(100)
  .on("child_added", (snap) => {
    renderMessage(snap.val());
  });

// Emoji picker
const emojis = [
  "😀",
  "😂",
  "😍",
  "😎",
  "😢",
  "😡",
  "👍",
  "🙏",
  "🎉",
  "🔥",
  "💯",
  "🥳",
  "😅",
  "😇",
  "🤔",
  "😜",
  "😱",
  "😏",
  "😬",
  "🤩",
];
emojiBtn.addEventListener("click", () => {
  emojiPicker.innerHTML = emojis
    .map((e) => `<span class='emoji'>${e}</span>`)
    .join("");
  emojiPicker.style.display =
    emojiPicker.style.display === "block" ? "none" : "block";
});
emojiPicker.addEventListener("click", (e) => {
  if (e.target.classList.contains("emoji")) {
    chatInput.value += e.target.textContent;
    emojiPicker.style.display = "none";
    chatInput.focus();
  }
});

document.addEventListener("click", (e) => {
  if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
    emojiPicker.style.display = "none";
  }
});

document.getElementById("close-chat-tab").onclick = function () {
  window.close();
};
