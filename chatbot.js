document.addEventListener('DOMContentLoaded', () => {
  const chatbotFab = document.getElementById('chatbot-fab');
  const chatbotModal = document.getElementById('chatbot-modal');
  const closeButton = document.querySelector('#chatbot-modal .close-button');
  const chatMessagesContainer = document.querySelector('.chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const clearChatButton = document.getElementById('clear-chat');
  
  const knowledgeBase = [
    // GREETINGS
    {
        questions: [
            "hi", "hello", "hey", "namaste", "namaskar", "ram ram", "good morning", "good evening", "good night",
            "kaise ho", "kya haal hai", "salaam", "pranam", "haanji", "helo", "heloo", "helloo", "heloo", "hii", "hyy", "namste", "namasthe", "namestey"
        ],
        answer: "Namaste! Welcome to HostelFinder. How can I help you today?"
    },

    // YES/NO responses
    {
        questions: [
            "yes", "haan", "ha", "hanji", "haanji", "sahi hai", "ok", "theek hai", "sure", "bilkul", "thik hai", "ho jayega", "kar do", "done", "yes please", "yep", "ya"
        ],
        answer: "Great! Let me know if you need any more help or information."
    },
    {
        questions: [
            "no", "nahi", "nahin", "nhi", "nope", "not now", "chhodo", "chhod do", "cancel", "not interested", "abhi nahi", "nopes", "nah"
        ],
        answer: "No problem! If you need anything else, just ask."
    },

    // THANK YOU & POLITE
    {
        questions: [
            "thank you", "thanks", "shukriya", "dhanyawad", "bahut dhanyavaad", "thanks alot", "thanku", "thankyou", "thanku so much", "bahut shukriya", "bahut accha"
        ],
        answer: "You're welcome! If you have more questions, just ask."
    },

    // SEARCH HOSTEL
    {
        questions: [
            "how to search", "how do i search", "search hostel", "find hostel", "hostel kaise dhundhu", "kaise search karein",
            "hostel kaise milega", "accommodation kaise dhoondein", "hostel kaise find kare", "mujhe hostel chahiye",
            "hostel chaiye", "room chahiye", "hostel search karna hai", "hostel ka pata kaise chalega",
            "hostel dhoondh do", "hostel search", "hostal kaise dhundhu", "hostel kaise dhundho", "hostel kaise dhoonde"
        ],
        answer: "To search for a hostel, go to the Home page and use the search bar. You can filter by city, location, price, and facilities. Agar aapko madad chahiye filtering mein, bataiye!"
    },
    {
        questions: [
        "about", "about you", "about hostel finder", "about this site", "about this website", "about this app",
        "tum kaun ho", "aap kaun ho", "yeh kaunsi site hai", "yeh app kya hai", "yeh site kisliye hai", "why this website",
        "hostel finder ke bare me batao", "hostel finder kya hai", "hostel finder ke baare mein"
        ],
        answer: "Main ek chatbot hoon jo HostelFinder par aapki madad karta hoon. HostelFinder ek platform hai jo students aur travellers ke liye hostels dhoondhna bahut aasan bana deta hai—yahan aap compare, review, aur details dekh sakte hain, sab kuch ek jagah par."
    },

    // ABOUT WEBSITE
    {
        questions: [
            "website", "hostel finder kya hai", "what is hostel finder", "about hostel finder", "ye website kya hai",
            "hostel finder kya karta hai", "aap kaun ho", "what do you do", "kya karte ho", "aap kya karte ho", "hostelfinder kya hai",
            "hostel finder site ka kya kaam hai", "ye kisliye hai", "is site ka fayda kya hai"
        ],
        answer: "HostelFinder helps students and travellers find, compare, and review hostels easily. Sabhi info ek jagah milti hai!"
    },

    // LIST HOSTEL (OWNER)
    {
        questions: [
            "list my hostel", "add hostel", "apna hostel kaise dale", "owner portal kaise use kare",
            "list my property", "apni property kaise dale", "hostel owner kaise banein", "hostel register kaise kare",
            "mera hostel add karna hai", "hostel kaise register karein", "hostel owner kaise bane", "hostal add karna hai", "hostel add karna hai"
        ],
        answer: "Agar aap owner hain, toh 'Owner' page par jaakar hostel details fill karein, bas! Verification ke baad listing live ho jayegi."
    },

    // EXPENSE CALCULATOR
    {
        questions: [
            "expense calculator", "calculate cost", "hostel ka kharcha", "kharcha kitna hoga", "budget planner",
            "expenses calculator", "budget kaise banaye", "cost estimate", "hostel estimate", "kitna kharcha aayega", "expence calculator", "kharcha calculator", "hostel ka kharcha batao"
        ],
        answer: "Use our expense calculator on the website to estimate rent, food, and other hostel expenses. Aap apne hisaab se sab details dal sakte hain."
    },

    // CONTACT SUPPORT
    {
        questions: [
            "how to contact", "contact support", "get in touch", "contact number", "support kaise milega", "phone number", "kaise sampark kare",
            "madad chahiye", "support", "help chahiye", "contact us", "kaise baat kare", "kaise contact karein", "support number", "contact details", "help desk"
        ],
        answer: "Contact karne ke liye website ke 'Contact Us' page pe jao, wahan email aur phone number mil jayega. Hum jaldi reply karte hain!"
    },

    // LEAVE REVIEW
    {
        questions: [
            "leave a review", "review kaise du", "feedback kaise de", "review likhna hai", "apna review dalna hai",
            "hostel pe review kaise likhu", "review dena hai", "rate karna hai", "experience share karna hai", "feedback dena hai"
        ],
        answer: "Bilkul! 'Reviews' section ya hostel detail page par jaake review likh sakte hain."
    },

    // UNIVERSITY SELECTION & LIST
    {
        questions: [
            "select university", "choose university", "university kaise select kare", "university search", "university kaise dhoonde", "universities list", "universities available", "universities ki list", "konsi universities", "kaun si university hai"
        ],
        answer: "Home page pe 'Select Your University' dropdown se apni university choose karo. Hum currently Vinoba Bhave University, DU, Mumbai University, Anna University, aur Calcutta University support karte hain."
    },

    // GENDER FILTER
    {
        questions: [
            "filter by gender", "gender hostel", "boys hostel", "girls hostel", "unisex hostel", "ladko ke liye hostel", "ladkiyo ke liye hostel", "gender specific hostel", "ladkiyon ka hostel", "ladko ka hostel"
        ],
        answer: "Filters mein 'Gender' select karo: Boys Only, Girls Only, ya Unisex. Apne hisaab se hostel mil jayega."
    },

    // RENT FILTER
    {
        questions: [
            "room rent filter", "price range", "min rent", "max rent", "hostel rent", "budget hostel", "kam daam ka hostel", "sasta hostel", "rent kitna hai", "kitne ka hostel hai", "hostel rent batao"
        ],
        answer: "Rent ke hisaab se filter lagane ke liye 'Room Rent (₹)' option use karo. Minimum aur maximum rent daal sakte ho."
    },

    // DISTANCE FILTER
    {
        questions: [
            "filter by distance", "distance from university", "university se kitne door", "distance filter", "hostel kitni door hai", "kitna distance hai", "kitni duri hai", "university distance"
        ],
        answer: "Filters mein 'Distance from University' slider use karo, jitna door chahiye set kar lo."
    },

    // AMENITIES
    {
        questions: [
            "basic services", "amenities filter", "ac hostel", "wifi hostel", "mess food", "laundry", "laundry service", "facilities", "hostel mein kya kya hai", "hostel mein kya milta hai", "hostel facilities", "kya amenities hain"
        ],
        answer: "Filter by amenities like AC, Wi-Fi, Mess Food, Laundry etc. Listings mein sab detail mil jayega."
    },

    // APPLY/CLEAR FILTERS
    {
        questions: [
            "apply filters", "clear filters", "filter kaise lagaye", "filter hatana hai", "filters ka use kaise kare", "filter lagane ka tarika", "filter remove kaise kare"
        ],
        answer: "Filters select karke 'Apply Filters' dabao. Sab remove karna hai toh 'Clear Filters' use karo."
    },

    // 3D MODEL
    {
        questions: [
            "3d model", "hostel 3d model", "3d hostel", "interactive hostel", "threejs", "hostel ka 3d view", "hostel ka naksha", "3d dekhna hai", "hostel ka 3d map", "hostel ka 3d layout"
        ],
        answer: "3D visualizer feature mein aap typical hostel ka layout dekh sakte hain, explore kar sakte hain."
    },

    // INFORMATION IN LISTING
    {
        questions: [
            "hostel amenities", "hostel features", "hostel mein kya milta hai", "listing mein kya details hain", "hostel mein kya diya hai", "listing transparency", "hostel ki details", "hostel ki jankari"
        ],
        answer: "Har listing mein amenities (AC, Wi-Fi, Mess, Laundry), room type, rent, distance, photos, aur owner contact diya hota hai."
    },

    // OWNER DASHBOARD & UPDATES
    {
        questions: [
            "owner portal", "owner dashboard", "list my hostel", "hostel owner", "property owner", "apna hostel list kare", "owner page", "hostel owner kaise bane", "update hostel details", "owner update details", "change hostel info", "hostel info update karni hai"
        ],
        answer: "Owner ke liye 'Owner' page par jao. Update ke liye abhi support team ko contact karo, jaldi hi owner dashboard aayega."
    },

    // EXPENSES ESTIMATOR
    {
        questions: [
            "expenses estimator", "budget tool", "cost planner", "budget estimate", "kharcha calculator", "hostel ka budget tool", "expense estimator"
        ],
        answer: "Hostel Expense Estimator se rent, food, aur monthly kharche ka estimate nikal sakte ho."
    },

    // BARGAINING
    {
        questions: [
            "bargain rent", "negotiate rent", "discount hostel", "kya rent kam ho sakta hai", "rent kam karwa sakte hai", "rent mein discount", "hostel mein negotiation", "rent negotiate"
        ],
        answer: "Aap directly hostel owner se baat karke negotiation try kar sakte hain. HostelFinder rent fix nahi karta."
    },

    // LOST AND FOUND (FUN)
    {
        questions: [
            "lost sock", "i lost my sock", "kya aap lost and found dekhte ho", "kuch kho gaya", "mera bag kho gaya", "mera phone kho gaya"
        ],
        answer: "Sorry, main sirf hostel dhoondh sakta hoon, lost and found mein help nahi kar sakta. Hostel mein staff se poocho!"
    },

    // PROBLEM STATEMENT / WHY HOSTELFINDER
    {
        questions: [
            "hostel finder ka fayda", "problem solved", "why hostel finder exists", "problem solved by hostel finder", "hostel finder kyun", "fayda kya hai", "kya problem solve karta hai"
        ],
        answer: "HostelFinder sabhi hostel ki info ek jagah deta hai, search aur compare easy banaata hai, verified reviews milte hain."
    },

    // EASE OF USE
    {
        questions: [
            "is hostel finder easy", "user friendly", "kya easy hai", "use karne mein aasan hai kya", "hostel finder use karna easy hai kya", "kya ye easy hai"
        ],
        answer: "Bilkul! HostelFinder students ke liye bana hai, use karna bahut simple hai."
    },

    // STUDENT FOCUSED
    {
        questions: [
            "student focus", "student ke liye hai", "student needs", "for students", "ye students ke liye hai kya", "student friendly hai kya"
        ],
        answer: "Haan, HostelFinder specially students ke liye hi design kiya gaya hai."
    },

    // OWNER LISTING EASY
    {
        questions: [
            "owner listing easy", "owner listing process", "hostel owner ka process", "hostel owner listing", "owner listing kaise kare"
        ],
        answer: "Owner ke liye listing process bahut aasan hai, sirf ek form fill karo aur verification ke baad live ho jayega."
    },

    // REVIEWS
    {
        questions: [
            "reviews", "reviews on hostel finder", "verified reviews", "community insights", "kya review milte hain", "hostel review", "review kaise dekhen"
        ],
        answer: "Haan, aap genuine reviews dekh aur likh sakte hain. Har hostel page par review section hota hai."
    },

    // MISSION
    {
        questions: [
            "hostel finder mission", "mission statement", "hostel finder ka mission", "aapka mission", "mission kya hai"
        ],
        answer: "Mission hai ki har student ko sahi aur safe hostel mil sake, bina tension ke."
    },

    // FINDING HOSTELS PROBLEMS
    {
        questions: [
            "finding hostels problem", "hostel dhoondne mein dikkat", "challenges in finding hostels", "kya problem aati hai", "hostel dhoondhna mushkil hai", "problem in finding hostel"
        ],
        answer: "Jyada info nahi milti, transparency nahi hoti, time kam hota hai. Hum yeh sab solve karte hain."
    },

    // IS IT FREE
    {
        questions: [
            "is hostel finder free", "cost of hostel finder", "kya paise lagte hai", "free hai kya", "charge lagta hai", "hostel finder charges", "payment lagta hai"
        ],
        answer: "HostelFinder students ke liye bilkul free hai. Koi hidden charges nahi hain."
    },

    // OWNER LISTING PROCESS
    {
        questions: [
            "owner listing", "hostel owner listing", "hostel owner kaise list kare", "property listing", "owner listing process", "hostel listing process"
        ],
        answer: "Owner 'Owner' page par listing form bharein, verification ke baad property list ho jayegi."
    },

    // HOSTEL LISTING DETAILS
    {
        questions: [
            "hostel listing details", "listing details", "hostel mein kya milta hai", "hostel ke details", "hostel ki jankari"
        ],
        answer: "Listing mein name, location, distance, gender, rent, room type, amenities, owner contact sab hota hai."
    },

    // DISTANCE ACCURACY
    {
        questions: [
            "distance accuracy", "kitni door hai", "distance kitna hai", "distance exact hai kya", "kitna door hai", "distance kaise pata chalega"
        ],
        answer: "Website pe jo distance hai wo approximate hai, exact distance ke liye owner se confirm kar lo."
    },

    // CONTACT OWNER
    {
        questions: [
            "contact owner", "owner se baat kar sakte hai", "owner contact details", "hostel owner contact", "owner se baat karna hai", "owner ka number"
        ],
        answer: "Har listing mein owner ka naam, phone aur email diya hota hai. Directly contact kar sakte ho."
    },

    // OUTDATED INFO
    {
        questions: [
            "outdated info", "incorrect info", "galat information", "report outdated info", "galat details report kare", "wrong listing", "info galat hai"
        ],
        answer: "Agar info galat ho toh 'Contact Us' page se report karo. Hum jaldi update karenge."
    },

    // GENDER HOSTELS
    {
        questions: [
            "hostels for boys and girls", "gender specific hostels", "boys hostel", "girls hostel", "unisex hostel", "ladkiyon ke hostel", "ladko ke hostel"
        ],
        answer: "Aapko boys, girls ya unisex hostel mil jayenge. Gender filter use karo."
    },

    // NEW HOSTELS
    {
        questions: [
            "new hostels", "new listings", "naye hostel", "naye hostels add hote hai kya", "latest hostels", "newly added hostel"
        ],
        answer: "Naye hostels regular basis pe add hote hain jab owners register karte hain."
    },

    // UPDATE HOSTEL DETAILS
    {
        questions: [
            "update hostel details", "owner update details", "change hostel info", "hostel info update karni hai", "hostel update", "listing update", "hostel detail change karna hai"
        ],
        answer: "Update ke liye abhi contact support team. Jaldi hi owner dashboard aayega jahan aap khud update kar sakte hain."
    },

    // DEVELOPER INFO
    {
        questions: [
            "developer", "who made this website", "kisne banaya", "developer kaun hai", "banane wale kaun hain", "is site ko kisne banaya"
        ],
        answer: "HostelFinder banaya hai Abhinav Raj ne, BCA student, Vinoba Bhave University."
    },

    // BAD LANGUAGE / ABUSE
    {
        questions: [
            "bad language", "gali", "abusive", "slang", "sala", "kutta", "mc bc", "harami", "tum bekar hai", "bakwas", "bakwaas", "faltu"
        ],
        answer: "Apne sanskaar mat bhulo. Achhe se baat karo! 😡"
    },

    // PHOTOS
    {
        questions: [
            "photos", "pictures", "hostel images", "photos dekhna hai", "pictures dekh sakte hai", "hostel ki images", "photos available", "kya photo hai", "pics", "hostel ki pics"
        ],
        answer: "Har hostel listing mein photos ka gallery hai, aap dekh sakte hain."
    },

    // DIRECT BOOKING
    {
        questions: [
            "direct booking", "book hostel", "booking kaise kare", "reservation kaise kare", "kya yahan se booking hoti hai", "booking process"
        ],
        answer: "Booking usually directly hostel owner ke through hoti hai. Website pe details mil jayenge."
    }
    
    ]
  
  // --- Utility: Clean text for robust matching ---
  function cleanText(text) {
    return text
      .toLowerCase()
      .replace(/[\p{P}$+<=>^`|~]/gu, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Collapse whitespace
      .trim();
  }
  
  // --- Improved Matching Logic ---
  function getBotResponse(userMessage) {
    const cleanedInput = cleanText(userMessage);
    let bestMatch = null;
    let bestScore = 0;
    
    for (const entry of knowledgeBase) {
      for (const q of entry.questions) {
        const cleanedQ = cleanText(q);
        // Exact match
        if (cleanedInput === cleanedQ) {
          return entry.answer;
        }
        // Partial (word overlap) match
        const inputWords = cleanedInput.split(' ');
        const qWords = cleanedQ.split(' ');
        const overlap = inputWords.filter(word => qWords.includes(word)).length;
        if (overlap > bestScore) {
          bestScore = overlap;
          bestMatch = entry.answer;
        }
      }
    }
    if (bestScore > 0) return bestMatch;
    // Fallback
    return "I'm not sure I understand. Could you try rephrasing your question, or ask about another aspect of HostelFinder? If you need human help, please visit our <a href='contact-us.html' target='_blank'>Contact Us</a> page.";
  }
  
  // --- Typing Indicator Helpers ---
  function showTypingIndicator() {
    removeTypingIndicator();
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'message bot-message';
    indicator.style.fontStyle = 'italic';
    indicator.style.color = '#888';
    indicator.textContent = 'Bot is typing...';
    chatMessagesContainer.appendChild(indicator);
    scrollToBottom();
  }
  
  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }
  
  // --- Chat History Persistence ---
  function saveChatHistory() {
    const messages = Array.from(chatMessagesContainer.querySelectorAll('.message')).map(div => ({
      text: div.innerHTML,
      sender: div.classList.contains('user-message') ? 'user' : 'bot'
    }));
    localStorage.setItem('chatbotHistory', JSON.stringify(messages));
  }
  
  function loadChatHistory() {
    chatMessagesContainer.innerHTML = '';
    const history = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
    history.forEach(msg => displayMessage(msg.text, msg.sender, true));
  }
  
  // --- Display Message (supports HTML for fallback links) ---
  function displayMessage(message, sender, skipHistory) {
    removeTypingIndicator(); // Always remove any existing typing indicator before showing new message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = message;
    chatMessagesContainer.appendChild(messageDiv);
    scrollToBottom();
    if (!skipHistory) saveChatHistory();
  }
  
  function scrollToBottom() {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }
  
  // --- Send Message with Typing Indicator ---
  function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;
    
    displayMessage(userMessage, 'user');
    userInput.value = '';
    showTypingIndicator();
    
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      displayMessage(botResponse, 'bot');
    }, 700);
  }
  
  // --- Modal Show/Hide and Chatbot UI Events ---
  if (chatbotFab && chatbotModal && closeButton && chatMessagesContainer && userInput && sendButton) {
    chatbotModal.style.display = 'none';
    
    chatbotFab.addEventListener('click', () => {
      chatbotModal.style.display = 'flex';
      loadChatHistory();
      // Only show welcome message if chat is empty
      if (chatMessagesContainer.querySelectorAll('.message').length === 0) {
        displayMessage('Welcome! How can I help you', 'bot');
      }
      userInput.focus();
      scrollToBottom();
    });
    
    closeButton.addEventListener('click', () => {
      chatbotModal.style.display = 'none';
    });
    
    chatbotModal.addEventListener('click', (event) => {
      if (event.target === chatbotModal) {
        chatbotModal.style.display = 'none';
      }
    });
    
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
    
    if (clearChatButton) {
      clearChatButton.addEventListener('click', () => {
        localStorage.removeItem('chatbotHistory');
        chatMessagesContainer.innerHTML = '';
        displayMessage('Welcome! How can I help you', 'bot');
      });
    }
    
  } else {
    console.error("One or more chatbot elements not found. Check IDs and classes.");
  }
});