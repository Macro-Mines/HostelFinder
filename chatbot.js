document.addEventListener('DOMContentLoaded', () => {
    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeButton = document.querySelector('#chatbot-modal .close-button');
    const chatMessagesContainer = document.querySelector('.chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // --- Knowledge Base ---
    const knowledgeBase = [
        {
            questions: ["hi", "hello", "hey"],
            answer: "Hello! How can I help you today?"
        },
        {
            questions: ["search","how to search", "find hostel", "search for accommodation"],
            answer: "To search for a hostel, go to the 'Home' page and use the search bar. You can filter by location, price, and amenities!"
        },
        {
            questions: ["what is this website", "what is hostel finder", "about you"],
            answer: "HostelFinder helps students and travelers find suitable hostel accommodations near universities."
        },
        {
            questions: ["how to list my hostel", "add my hostel", "owner portal"],
            answer: "If you are a hostel owner, you can list your property by visiting the 'Owner' page and filling out the details there."
        },
        {
            questions: ["what is expense calculator", "calculate cost", "hostel cost"],
            answer: "Our expenses calculator helps you estimate the potential costs of staying in a hostel, including rent and other utilities."
        },
        {
            questions: ["how to contact", "contact support", "get in touch"],
            answer: "You can reach us through the 'Contact Us' page on our website, where you'll find our email and phone number."
        },
        {
            questions: ["can I leave a review", "how to review hostel", "write review"],
            answer: "Yes, you can leave a review! Visit the 'Reviews' section to share your experience."
        },
        {
            questions: ["thank you", "thanks", "ok", "cool"],
            answer: "You're welcome! Feel free to ask if you have more questions."
        },

    {
        questions: ["select university", "choose university", "university search"],
        answer: "On the Home page, simply use the 'Select Your University' dropdown to choose your institution and find nearby hostels."
    },
    {
        questions: ["what universities", "list universities", "available universities"],
        answer: "We currently support searching for hostels near Vinoba Bhave University, University of Delhi, University of Mumbai, Anna University, and University of Calcutta."
    },
    {
        questions: ["filter by gender", "gender specific hostel", "boys only", "girls only", "unisex hostel"],
        answer: "Yes, you can filter hostels by gender specificity! Look for the 'Gender Specific' filter group to choose 'Boys Only', 'Girls Only', or 'Unisex' options."
    },
    {
        questions: ["room rent filter", "price range", "min rent", "max rent", "budget for hostel"],
        answer: "Under 'Filter Hostels', you'll find 'Room Rent (₹)'. You can enter your desired minimum and maximum rent to narrow down options within your budget."
    },
    {
        questions: ["filter by distance", "distance from university"],
        answer: "Use the 'Distance from University' slider in the filters section to set your preferred maximum distance from the university campus."
    },
    {
        questions: ["basic services", "amenities filter", "ac", "wi-fi", "mess food", "laundry", "laundry service"],
        answer: "Absolutely! You can filter by 'Basic Services' like AC, Wi-Fi, Mess Food, and Laundry Service to find hostels with the amenities you need."
    },
    {
        questions: ["apply filters", "clear filters"],
        answer: "After selecting your filters, click 'Apply Filters' to see updated results. If you want to start fresh, hit 'Clear Filters'."
    },
    {
        questions: ["what is 3d model", "hostel model", "3d hostel", "interactive hostel", "threejs"],
        answer: "That's our 3D visualizer! It's a cool feature where you can interact with a 3D model of a typical hostel layout to get a feel for the space."
    },
    {
        questions: ["what amenities", "hostel features"],
        answer: "Hostel listings typically include details on amenities like Wi-Fi, AC, mess food, laundry service, security, and more. Check the 'Basic Services' filter for common options."
    },
    {
        questions: ["what is owner portal", "list my hostel", "hostel owner"],
        answer: "If you're a hostel owner, you can list your property on HostelFinder by visiting the 'Owner' page. It's a great way to connect with students!"
    },
    {
        questions: ["expenses estimator", "budget tool", "cost planner"],
        answer: "The Hostel Expense Estimator helps you plan your budget. You can input one-time setup costs and monthly recurring costs like rent, food, and utilities."
    },
    {
        questions: ["bargain rent", "negotiate rent", "discount on hostel"],
        answer: "I'm just a chatbot, not a master negotiator! You'd have to talk directly with the hostel management for any rent bargaining. Good luck!"
    },
    {
        questions: ["will you find my lost sock", "lost sock"],
        answer: "I'm great at finding hostels, but lost socks are beyond my current capabilities. Maybe check under your bed in your new hostel? 😉"
    },
    {
        questions: ["what problem does hostel finder solve", "problem solved", "why hostel finder exists"],
        answer: "HostelFinder solves the problem of scattered listings, limited transparency, time constraints, and distance barriers in finding student hostels."
    },
    {
        questions: ["why use hostel finder", "benefits of hostel finder", "how hostel finder helps"],
        answer: "HostelFinder offers comprehensive search and filters, detailed and transparent listings, a user-friendly experience, a focus on student needs, and verified reviews."
    },
    {
        questions: ["what information is in hostel listings", "hostel details", "listing transparency"],
        answer: "Each hostel profile provides in-depth information including location, room types, amenities, and direct contact details for owners."
    },
    {
        questions: ["is hostel finder easy to use", "user friendly experience"],
        answer: "Yes, HostelFinder has an intuitive interface designed with students in mind, making the search process straightforward and stress-free."
    },
    {
        questions: ["does hostel finder focus on students", "student needs", "for students"],
        answer: "Yes, our platform prioritizes factors crucial for academic success and comfortable living, understanding the unique requirements of students."
    },
    {
        questions: ["can hostel owners list easily", "effortless listing for owners"],
        answer: "Hostel owners can easily list and manage their properties through a dedicated dashboard with a simplified submission process."
    },
    {
        questions: ["are there reviews on hostel finder", "verified reviews", "community insights"],
        answer: "Yes, the platform features genuine reviews and ratings from past and current residents to help you make informed decisions."
    },
    {
        questions: ["what is hostel finder's mission", "mission statement"],
        answer: "Our mission is to empower students and their families with the tools and information to make confident decisions about accommodation, supporting a successful academic journey."
    },
    {
        questions: ["what is the problem with finding hostels", "challenges in finding hostels"],
        answer: "Common challenges include a lack of centralized information, limited transparency, time constraints during admissions, and distance barriers for research."
    },
    {
        questions: ["how do i search for a hostel", "search a hostel", "how to find a hostel"],
        answer: "To search for a hostel, select your university on the homepage and click 'Find Hostels'. You can then use filters for gender, rent, distance, and facilities to narrow your search."
    },
    {
        questions: ["is hostel finder free to use", "cost of hostel finder", "do i pay to use hostel finder"],
        answer: "Yes, HostelFinder is completely free for students to use. There are no hidden charges or subscription fees."
    },
    {
        questions: ["how can hostel owners list property", "list my hostel", "hostel owner listing process"],
        answer: "Hostel owners can easily list properties by visiting the 'Owner' section from the homepage, filling a simple form. It will be added after verification."
    },
    {
        questions: ["what info is in hostel listing", "hostel listing details", "what details are provided"],
        answer: "Each listing includes name, location, distance from university, gender specific, rent range, room capacities (Single, Double, Triple), facilities (AC, Wi-Fi, Mess, Laundry), and direct owner contact."
    },
    {
        questions: ["how accurate is distance", "distance accuracy", "is distance exact"],
        answer: "The distances are approximate, meant to give a general idea. We recommend verifying the exact distance and commute time directly with the hostel owner."
    },
    {
        questions: ["can i contact hostel owner directly", "direct contact to owner", "owner contact details"],
        answer: "Yes, every hostel listing provides the owner's contact name, phone number, and email address for direct inquiries and bookings."
    },
    {
        questions: ["outdated information", "incorrect listing details", "report outdated info"],
        answer: "If you find outdated or incorrect information, please report it via the 'Contact Us' page, and we will rectify it promptly."
    },
    {
        questions: ["hostels for boys and girls", "gender specific hostels", "unisex hostels"],
        answer: "Yes, our platform includes 'Boys Only', 'Girls Only', and 'Unisex' hostels. You can filter your search based on gender specificity."
    },
    {
        questions: ["how often new hostels added", "new listings frequency"],
        answer: "We continuously expand our network. New hostels are added regularly as owners register and pass our verification process."
    },
    {
        questions: ["how to update my hostel details", "owner update details", "change hostel info"],
        answer: "Currently, for updates to existing listings, please contact our support team directly via the 'Contact Us' page, providing your hostel's name and the details you wish to change. We are working on an owner dashboard."
    },
    {
        questions: ["developer", "who made this website", "kisne banaya ye"],
        answer: "ABHINAV RAJ student of BCA,Vinoba Bhave University."
    },
    
    

    {
        questions: ["namaste", "ram ram", "kya haal hai"],
        answer: "Hello there! How can I help you find your perfect hostel today?"
    },
    {
        questions: ["hostel kaise dhundhu", "hostel search kaise karu", "rehne ki jagah kaise khojein", "hostel mil jayega kya"],
        answer: "To search for a hostel, just head to the 'Home' page and use the search bar. You can refine your options with filters for location, price, and amenities!"
    },
    {
        questions: ["ye website kya hai", "hostel finder kya kaam karta hai", "aap kaun ho", "kya karte ho"],
        answer: "HostelFinder is your friendly guide to finding suitable and affordable hostel accommodations, especially great for students and travelers!"
    },
    {
        questions: ["mera hostel add karna hai", "hostel owner kaise list karein", "apni property kaise dalu", "hostel register kaise karte hain"],
        answer: "If you're a hostel owner, fantastic! You can list your property by visiting the 'Owner' page and providing your details there."
    },
    {
        questions: ["kharcha kitna hoga", "expenses calculate kaise karein", "budget planner kya hai", "hostel ka estimate"],
        answer: "Our handy expense calculator helps you estimate the potential costs of your hostel stay, so you can budget like a pro!"
    },
    {
        questions: ["contact kaise karein", "support se baat karni hai", "madad chahiye"],
        answer: "You can reach our team through the 'Contact Us' page on our website. We're here to help!"
    },
    {
        questions: ["review de sakta hu kya", "hostel pe review kaise likhu", "apna experience share karna hai"],
        answer: "Absolutely! Your feedback is valuable. You can leave a review on the 'Reviews' page or directly on a specific hostel's detail page."
    },
    {
        questions: ["shukriya", "dhanyawad", "theek hai", "badhiya"],
        answer: "You're most welcome! Glad I could assist. Is there anything else you need?"
    },
    {
        questions: ["filter kaise lagau", "options kya hain filter ke", "search kaise refine karein"],
        answer: "After searching, you'll see filter options for price range, amenities (like Wi-Fi or AC), room type, and more to narrow down your results."
    },
    {
        questions: ["photos hain kya", "pictures dekh sakta hu kya", "hostel ki images"],
        answer: "Yes! Each hostel listing includes a gallery of photos so you can see what it looks like before you decide."
    },
    {
        questions: ["hostel finder free hai kya", "paisa lagega kya", "kitna charge hai"],
        answer: "Using HostelFinder to search for and discover hostels is completely free for users!"
    },
    {
        questions: ["direct booking hogi kya", "hostel book kaise karein", "reservation kaise banayein"],
        answer: "HostelFinder connects you with hostels. While you can view details here, bookings are typically finalized directly with the hostel or their booking partner."
    },
    {
        questions: ["search kaise badalna hai", "dobara search kaise karein", "naye सिरे se search"],
        answer: "You can easily modify your search criteria directly in the search bar on the 'Home' page and click search again."
    },
    {
        questions: ["university kaise select karu", "kaun si university choose karu", "university search kaise hoti hai"],
        answer: "On the Home page, simply use the 'Select Your University' dropdown to choose your institution and find nearby hostels."
    },
    {
        questions: ["kaun kaun si universities hain", "universities ki list batao", "konsi universities available hain"],
        answer: "We currently support searching for hostels near Vinoba Bhave University, University of Delhi, University of Mumbai, Anna University, and University of Calcutta."
    },
    {
        questions: ["gender ke hisaab se filter kaise karu", "ladka ladkiyon ke liye filter hai kya", "unisex hostel milenge kya"],
        answer: "Yes, you can filter hostels by gender specificity! Look for the 'Gender Specific' filter group to choose 'Boys Only', 'Girls Only', or 'Unisex' options."
    },
    {
        questions: ["rent ke hisaab se kaise filter karu", "price range kya hai", "kitne tak ka hostel milega"],
        answer: "Under 'Filter Hostels', you'll find 'Room Rent (₹)'. You can enter your desired minimum and maximum rent to narrow down options within your budget."
    },
    {
        questions: ["university se kitni dur ka filter laga sakta hu", "distance filter kaise use karein"],
        answer: "Use the 'Distance from University' slider in the filters section to set your preferred maximum distance from the university campus."
    },
    {
        questions: ["kya kya facilities filter kar sakta hu", "AC, Wi-Fi mil jayega kya", "mess food, laundry ka filter hai"],
        answer: "Absolutely! You can filter by 'Basic Services' like AC, Wi-Fi, Mess Food, and Laundry Service to find hostels with the amenities you need."
    },
    {
        questions: ["filter apply kaise karu", "filter hatana hai, kaise hoga"],
        answer: "After selecting your filters, click 'Apply Filters' to see updated results. If you want to start fresh, hit 'Clear Filters'."
    },
    {
        questions: ["ye 3D model kya hai", "hostel ka 3D view hai kya", "threejs model kya karta hai"],
        answer: "That's our 3D visualizer! It's a cool feature where you can interact with a 3D model of a typical hostel layout to get a feel for the space."
    },
    {
        questions: ["hostel mein kya kya facilities milengi", "kya kya features hote hain hostels mein"],
        answer: "Hostel listings typically include details on amenities like Wi-Fi, AC, mess food, laundry service, security, and more. Check the 'Basic Services' filter for common options."
    },
    {
        questions: ["owner portal kya hai", "mera hostel list karna hai", "hostel owner kaise banein"],
        answer: "If you're a hostel owner, you can list your property on HostelFinder by visiting the 'Owner' page. It's a great way to connect with students!"
    },
    {
        questions: ["expense estimator kya hai", "budget tool kaise use karu", "kharcha kitna hoga, kaise pata chale"],
        answer: "The Hostel Expense Estimator helps you plan your budget. You can input one-time setup costs and monthly recurring costs like rent, food, and utilities."
    },
    {
        questions: ["hostel finder kis problem ko solve karta hai", "iska faida kya hai", "hostel finder kyu banaya hai"],
        answer: "HostelFinder solves the problem of scattered listings, limited transparency, time constraints, and distance barriers in finding student hostels."
    },
    {
        questions: ["hostel finder use karne ke kya faide hain", "ye kaise help karta hai", "kya benefits hain"],
        answer: "HostelFinder offers comprehensive search and filters, detailed and transparent listings, a user-friendly experience, a focus on student needs, and verified reviews."
    },
    {
        questions: ["hostel ki listing mein kya information milti hai", "details transparent hain kya"],
        answer: "Each hostel profile provides in-depth information including location, room types, amenities, and direct contact details for owners."
    },
    {
        questions: ["hostel finder easy hai kya use karna", "user friendly hai kya"],
        answer: "Yes, HostelFinder has an intuitive interface designed with students in mind, making the search process straightforward and stress-free."
    },
    {
        questions: ["ye students ke liye hi hai kya", "students ki needs pe focus karta hai kya"],
        answer: "Yes, our platform prioritizes factors crucial for academic success and comfortable living, understanding the unique requirements of students."
    },
    {
        questions: ["hostel owners easily list kar sakte hain kya", "listing karna aasan hai kya"],
        answer: "Hostel owners can easily list and manage their properties through a dedicated dashboard with a simplified submission process."
    },
    {
        questions: ["hostel finder pe reviews hain kya", "verified reviews milenge kya", "reviews dekh sakte hain kya"],
        answer: "Yes, the platform features genuine reviews and ratings from past and current residents to help you make informed decisions."
    },
    {
        questions: ["hostel finder ka mission kya hai", "inka maksad kya hai"],
        answer: "Our mission is to empower students and their families with the tools and information to make confident decisions about accommodation, supporting a successful academic journey."
    },
    {
        questions: ["hostel dhundhne mein kya problem aati hai", "kya mushkilein hain hostel find karne mein"],
        answer: "Common challenges include a lack of centralized information, limited transparency, time constraints during admissions, and distance barriers for research."
    },
    {
        questions: ["info galat hai toh kya karu", "details purani lag rahi hain, kaise bataun", "outdated information report kaise karein"],
        answer: "If you find outdated or incorrect information, please report it via the 'Contact Us' page, and we will rectify it promptly."
    },
    {
        questions: ["boys aur girls ke liye alag hostel hain kya", "ladke ladkiyon ke liye hostel milenge kya", "unisex hostel bhi hain kya"],
        answer: "Yes, our platform includes 'Boys Only', 'Girls Only', and 'Unisex' hostels. You can filter your search based on gender specificity."
    },
    {
        questions: ["naye hostel kitne time mein add hote hain", "kitne naye hostel aate rehte hain", "nayi listings kab aati hain"],
        answer: "We continuously expand our network. New hostels are added regularly as owners register and pass our verification process."
    },
    {
        questions: ["mera hostel ka detail update kaise karu", "owner ko details change karni hain kaise hoga", "hostel ki info badalni hai"],
        answer: "Currently, for updates to existing listings, please contact our support team directly via the 'Contact Us' page, providing your hostel's name and the details you wish to change. We are working on an owner dashboard."
    }

    ];

    // --- Initially hide the modal ---
    if (chatbotModal) {
        chatbotModal.style.display = 'none';
    }

    // --- Event Listeners ---
    if (chatbotFab && chatbotModal && closeButton && chatMessagesContainer && userInput && sendButton) {
        chatbotFab.addEventListener('click', () => {
            chatbotModal.style.display = 'flex'; // Use 'flex' to enable centering
            userInput.focus(); // Focus on input when opened
            scrollToBottom();
        });

        closeButton.addEventListener('click', () => {
            chatbotModal.style.display = 'none';
        });

        // Close modal if clicked outside content
        chatbotModal.addEventListener('click', (event) => {
            if (event.target === chatbotModal) {
                chatbotModal.style.display = 'none';
            }
        });

        // Send message on button click
        sendButton.addEventListener('click', sendMessage);

        // Send message on Enter key press in input field
        userInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error("One or more chatbot elements not found. Check IDs and classes.");
    }

    // --- Chatbot Functions ---
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatMessagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let botResponse = "I'm sorry, I don't understand that question. Can you please rephrase it or ask something else related to HostelFinder?";

        for (const entry of knowledgeBase) {
            if (entry.questions.some(q => lowerCaseMessage.includes(q))) {
                botResponse = entry.answer;
                break;
            }
        }
        return botResponse;
    }

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        displayMessage(userMessage, 'user');
        userInput.value = ''; // Clear input

        // Simulate bot typing/thinking time
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            displayMessage(botResponse, 'bot');
        }, 500); // 0.5 second delay
    }

    function scrollToBottom() {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
});