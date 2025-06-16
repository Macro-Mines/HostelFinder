document.addEventListener('DOMContentLoaded', () => {

    // IMPORTANT: Duplicate your hostelsData object here.
    // In a real application, you'd fetch this data from a server or a single source.
    // For this client-side example, we're replicating it.
    const hostelsData = {
        'university-a': [
            {
                id: 'ua-h001', // Unique ID for this hostel
                name: "North Campus Abode",
                location: "Kamla Nagar, Delhi",
                image: "room.jpg",
                distance: "2.5 km from University",
                gender: "Unisex",
                roomRent: "₹ 8,000 - ₹ 12,000 per month",
                roomCapacity: "Single, Double, Triple",
                facilities: ["Wi-Fi", "Laundry Service", "Mess Food", "24/7 Security", "Study Room", "Gym Access"],
                ownerContactName: "Mr. Sharma",
                ownerPhone: "+91-9876543210",
                ownerEmail: "sharma.hostels@example.com",
                description: "A comfortable and secure living space for students near North Campus, offering a vibrant community atmosphere."
            },
            {
                id: 'ua-h002',
                name: "Student's Corner PG",
                location: "Vijay Nagar, Delhi",
                image: "room.jpg",
                distance: "1.8 km from University",
                gender: "Girls Only",
                roomRent: "₹ 7,500 - ₹ 10,000 per month",
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Homely Food", "Housekeeping", "Power Backup", "CCTV Surveillance"],
                ownerContactName: "Ms. Gupta",
                ownerPhone: "+91-9988776655",
                ownerEmail: "gupta.pg@example.com",
                description: "A safe and welcoming PG for female students, known for its homely environment and nutritious meals."
            },
            {
                id: 'ua-h003',
                name: "Hudson Lines Hostel",
                location: "GTB Nagar, Delhi",
                image:"room.jpg",
                distance: "0.5 km from University (walking distance)",
                gender: "Boys Only",
                roomRent: "₹ 9,000 - ₹ 13,000 per month",
                roomCapacity: "Single, Double",
                facilities: ["High-speed Wi-Fi", "Attached Bathroom", "AC Rooms (optional)", "Medical Assistance", "Sports Area"],
                ownerContactName: "Mr. Kumar",
                ownerPhone: "+91-9012345678",
                ownerEmail: "kumar.hostels@example.com",
                description: "Premium boys' hostel with modern amenities, ideal for students seeking convenience and a focused study environment."
            }
        ],
        'university-b': [
            {
                id: 'ub-h001',
                name: "Sea Breeze Dorms",
                location: "Marine Lines, Mumbai",
                image:"room.jpg",
                distance: "4.0 km from University",
                gender: "Unisex",
                roomRent: "₹ 10,000 - ₹ 15,000 per month",
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Cafeteria", "Lounge Area", "24/7 Security", "Laundry"],
                ownerContactName: "Mr. Desai",
                ownerPhone: "+91-8765432109",
                ownerEmail: "desai.dorms@example.com",
                description: "Experience coastal living with comfortable dorms, perfect for students who enjoy city life and accessibility."
            },
            {
                id: 'ub-h002',
                name: "Andheri Student Living",
                location: "Andheri West, Mumbai",
                image:"room.jpg",
                distance: "2.2 km from University",
                gender: "Boys Only",
                roomRent: "₹ 9,500 - ₹ 13,000 per month",
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Mess", "Study Zone", "Gym", "Power Backup"],
                ownerContactName: "Mrs. Singh",
                ownerPhone: "+91-7654321098",
                ownerEmail: "singh.hostel@example.com",
                description: "A well-connected hostel in Andheri, providing a focused environment with all essential student amenities."
            },
            {
                id: 'ub-h003',
                name: "Vile Parle Residences",
                location: "Vile Parle, Mumbai",
                image:"room.jpg",
                distance: "3.5 km from University",
                gender: "Girls Only",
                roomRent: "₹ 8,800 - ₹ 12,500 per month",
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Laundry Service", "Daily Housekeeping", "CCTV", "Recreation Room"],
                ownerContactName: "Mr. Joshi",
                ownerPhone: "+91-6543210987",
                ownerEmail: "joshi.residence@example.com",
                description: "Safe and spacious residences for female students, offering a peaceful and supportive living environment."
            },
            {
                id: 'ub-h004',
                name: "Bandra Study Hub",
                location: "Bandra, Mumbai",
                image:"room.jpg",
                distance: "5.1 km from University",
                gender: "Unisex",
                roomRent: "₹ 11,000 - ₹ 16,000 per month",
                roomCapacity: "Single, Double",
                facilities: ["Co-working Space", "High-speed Wi-Fi", "Kitchenette Access", "Secure Entry", "Common Area"],
                ownerContactName: "Ms. Patel",
                ownerPhone: "+91-9876512340",
                ownerEmail: "patel.hub@example.com",
                description: "Modern co-living space in Bandra, designed for students who value collaboration and independent living."
            }
        ],
        'university-c': [
            {
                id: 'uc-h001',
                name: "Tech Park Hostel",
                location: "Guindy, Chennai",
                image:"room.jpg",
                distance: "1.0 km from University",
                gender: "Boys Only",
                roomRent: "₹ 7,000 - ₹ 10,000 per month",
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Mess (South Indian Cuisine)", "Sports Facilities", "Medical Support", "Security"],
                ownerContactName: "Mr. Rajan",
                ownerPhone: "+91-9000111222",
                ownerEmail: "rajan.techhostel@example.com",
                description: "Located ideally for engineering students, offering a conducive environment for studies and recreation."
            },
            {
                id: 'uc-h002',
                name: "Kotturpuram Stays",
                location: "Kotturpuram, Chennai",
                image:"room.jpg",
                distance: "3.2 km from University",
                gender: "Girls Only",
                roomRent: "₹ 6,500 - ₹ 9,500 per month",
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Homemade Food", "Laundry Service", "CCTV", "Reading Room"],
                ownerContactName: "Mrs. Lakshmi",
                ownerPhone: "+91-8000222333",
                ownerEmail: "lakshmi.stays@example.com",
                description: "A peaceful and secure haven for female students, with a focus on comfortable and homely living."
            },
            {
                id: 'uc-h003',
                name: "Adyar River View",
                location: "Adyar, Chennai",
                image:"room.jpg",
                distance: "2.8 km from University",
                gender: "Unisex",
                roomRent: "₹ 7,800 - ₹ 11,000 per month",
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Attached Bath", "AC Rooms (selected)", "Gym", "Common Lounge"],
                ownerContactName: "Mr. Karthik",
                ownerPhone: "+91-7000444555",
                ownerEmail: "karthik.view@example.com",
                description: "Enjoy scenic views and a relaxed atmosphere, suitable for all students seeking modern amenities."
            }
        ],
        'university-d': [
            {
                id: 'ud-h001',
                name: "College Street Quarters",
                location: "College Street, Kolkata",
                image:"room.jpg",
                distance: "0.8 km from University",
                gender: "Unisex",
                roomRent: "₹ 6,000 - ₹ 9,000 per month",
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Basic Mess", "Study Area", "24/7 Security"],
                ownerContactName: "Mr. Basu",
                ownerPhone: "+91-9123456789",
                ownerEmail: "basu.quarters@example.com",
                description: "A budget-friendly option right in the heart of the academic district, ideal for focused studies."
            },
            {
                id: 'ud-h002',
                name: "Salt Lake Student Inn",
                location: "Salt Lake, Kolkata",
                image:"room.jpg",
                distance: "4.5 km from University",
                gender: "Girls Only",
                roomRent: "₹ 7,500 - ₹ 11,000 per month",
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Daily Meals", "Laundry", "Gym Access", "Transport Facility"],
                ownerContactName: "Mrs. Banerjee",
                ownerPhone: "+91-9234567890",
                ownerEmail: "banerjee.inn@example.com",
                description: "A peaceful and well-maintained hostel for female students, offering easy access to the Salt Lake area."
            }
        ]
    };

    const hostelDetailContent = document.getElementById('hostel-detail-content');

    // Function to get URL parameters
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const hostelId = getUrlParameter('id');

    if (hostelId) {
        // Find the hostel by ID across all universities
        let foundHostel = null;
        for (const universityKey in hostelsData) {
            foundHostel = hostelsData[universityKey].find(hostel => hostel.id === hostelId);
            if (foundHostel) {
                break; // Found the hostel, stop searching
            }
        }

        if (foundHostel) {
            // Populate the details
            hostelDetailContent.innerHTML = `
                <div class="hostel-detail-card">
                    <img src="${foundHostel.image}" alt="${foundHostel.name}" class="detail-image">
                    <div class="detail-content">
                        <h1>${foundHostel.name}</h1>
                        <p class="detail-location"><i class="icon-location"></i> ${foundHostel.location}</p>
                        <p class="detail-description">${foundHostel.description}</p>

                        <div class="detail-grid">
                            <div class="detail-item">
                                <strong>Distance from College:</strong>
                                <span>${foundHostel.distance}</span>
                            </div>
                            <div class="detail-item">
                                <strong>Gender Specific:</strong>
                                <span>${foundHostel.gender}</span>
                            </div>
                            <div class="detail-item">
                                <strong>Room Rent:</strong>
                                <span>${foundHostel.roomRent}</span>
                            </div>
                            <div class="detail-item">
                                <strong>Room Capacity:</strong>
                                <span>${foundHostel.roomCapacity}</span>
                            </div>
                        </div>

                        <div class="detail-section">
                            <h3>Hostel Facilities</h3>
                            <ul class="facilities-list">
                                ${foundHostel.facilities.map(facility => `<li>${facility}</li>`).join('')}
                            </ul>
                        </div>

                        <div class="detail-section">
                            <h3>Contact Details</h3>
                            <p><strong>Owner Name:</strong> ${foundHostel.ownerContactName}</p>
                            <p><strong>Phone:</strong> <a href="tel:${foundHostel.ownerPhone}">${foundHostel.ownerPhone}</a></p>
                            <p><strong>Email:</strong> <a href="mailto:${foundHostel.ownerEmail}">${foundHostel.ownerEmail}</a></p>
                        </div>

                        <a href="index.html" class="btn-primary back-btn">Back to Hostels</a>
                    </div>
                </div>
            `;
            hostelDetailContent.classList.remove('loading-state');
        } else {
            hostelDetailContent.innerHTML = `<p class="error-message">Hostel not found.</p>`;
            hostelDetailContent.classList.remove('loading-state');
        }
    } else {
        hostelDetailContent.innerHTML = `<p class="error-message">No hostel ID provided. Please go back to the <a href="index.html">home page</a> to select a hostel.</p>`;
        hostelDetailContent.classList.remove('loading-state');
    }

});
