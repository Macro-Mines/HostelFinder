document.addEventListener('DOMContentLoaded', () => {

    // --- Data for Hostels ---
    // We store hostel data in an object where keys match the university dropdown values.
    const hostelsData = {
        'university-a': [
            {
                name: "North Campus Abode",
                location: "Kamla Nagar, Delhi",
                image: "room.jpg"
            },
            {
                name: "Student's Corner PG",
                location: "Vijay Nagar, Delhi",
                image: "room.jpg"
            },
            {
                name: "Hudson Lines Hostel",
                location: "GTB Nagar, Delhi",
                image:"room.jpg"
            }
        ],
        'university-b': [
            {
                name: "Sea Breeze Dorms",
                location: "Marine Lines, Mumbai",
                image:"room.jpg"
            },
            {
                name: "Andheri Student Living",
                location: "Andheri West, Mumbai",
                image:"room.jpg"
            },
            {
                name: "Vile Parle Residences",
                location: "Vile Parle, Mumbai",
                image:"room.jpg"
            },
            {
                name: "Bandra Study Hub",
                location: "Bandra, Mumbai",
                image:"room.jpg"
            }
        ],
        'university-c': [
            {
                name: "Tech Park Hostel",
                location: "Guindy, Chennai",
                image:"room.jpg"
            },
            {
                name: "Kotturpuram Stays",
                location: "Kotturpuram, Chennai",
                image:"room.jpg"
            },
            {
                name: "Adyar River View",
                location: "Adyar, Chennai",
                image:"room.jpg"
            }
        ],
        'university-d': [
            {
                name: "College Street Quarters",
                location: "College Street, Kolkata",
                image:"room.jpg"
            },
            {
                name: "Salt Lake Student Inn",
                location: "Salt Lake, Kolkata",
                image:"room.jpg"
            }
        ]
    };

    // --- DOM Elements ---
    // We get references to the HTML elements we need to interact with.
    const universitySelect = document.getElementById('university-select');
    const hostelGrid = document.getElementById('hostel-grid');
    const findButton = document.querySelector('.btn-primary');


    // --- Function to Display Hostels ---
    // This function generates and displays the hostel cards.
    const displayHostels = (universityId) => {
        // Clear the grid first
        hostelGrid.innerHTML = '';

        const selectedHostels = hostelsData[universityId];

        if (!selectedHostels || selectedHostels.length === 0) {
            hostelGrid.innerHTML = `<p class="placeholder-text">No hostels found for the selected university.</p>`;
            return;
        }

        selectedHostels.forEach(hostel => {
            // Create a div element for the card
            const card = document.createElement('div');
            card.className = 'hostel-card'; // Use the CSS class for styling

            // Set the inner HTML of the card using a template literal
            card.innerHTML = `
                <img src="${hostel.image}" alt="${hostel.name}">
                <div class="card-content">
                    <h3>${hostel.name}</h3>
                    <p class="location">${hostel.location}</p>
                    <a href="#" class="btn-secondary">View Details</a>
                </div>
            `;

            // Append the new card to the grid
            hostelGrid.appendChild(card);
        });
    };

    // --- Event Listener ---
    // We listen for the 'click' event on the "Find Hostels" button.
    findButton.addEventListener('click', () => {
        const selectedUniversity = universitySelect.value;
        if (selectedUniversity) {
            displayHostels(selectedUniversity);
        } else {
            // If no university is selected, show a prompt
            hostelGrid.innerHTML = `<p class="placeholder-text">Please select a university first.</p>`;
        }
    });

});
