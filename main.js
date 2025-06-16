document.addEventListener('DOMContentLoaded', () => {

    // --- Data for Hostels ---
    // Expanded hostel data with more entries and varied details for filtering.
    const hostelsData = {
        'university-a': [
            {
                id: 'ua-h001',
                name: "North Campus Abode",
                location: "Kamla Nagar, Delhi",
                image: "room.jpg",
                distance: 2.5, // Distance in km (numeric for slider)
                gender: "Unisex",
                roomRent: { min: 8000, max: 12000 }, // Price range for slider
                roomCapacity: "Single, Double, Triple",
                facilities: ["Wi-Fi", "Laundry Service", "Mess Food", "24/7 Security", "Study Room", "Gym Access", "AC"],
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
                distance: 1.8,
                gender: "Girls Only",
                roomRent: { min: 7500, max: 10000 },
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
                distance: 0.5,
                gender: "Boys Only",
                roomRent: { min: 9000, max: 13000 },
                roomCapacity: "Single, Double",
                facilities: ["High-speed Wi-Fi", "Attached Bathroom", "AC Rooms (optional)", "Medical Assistance", "Sports Area", "Mess Food"],
                ownerContactName: "Mr. Kumar",
                ownerPhone: "+91-9012345678",
                ownerEmail: "kumar.hostels@example.com",
                description: "Premium boys' hostel with modern amenities, ideal for students seeking convenience and a focused study environment."
            },
            {
                id: 'ua-h004',
                name: "Model Town Residences",
                location: "Model Town, Delhi",
                image: "room.jpg",
                distance: 3.1,
                gender: "Unisex",
                roomRent: { min: 8500, max: 11500 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Common Lounge", "Laundry Facilities", "24/7 Security"],
                ownerContactName: "Mrs. Verma",
                ownerPhone: "+91-7890123456",
                ownerEmail: "verma.res@example.com",
                description: "Comfortable and spacious living for students, easily accessible from campus."
            },
            {
                id: 'ua-h005',
                name: "Shastri Nagar PG",
                location: "Shastri Nagar, Delhi",
                image: "room.jpg",
                distance: 4.0,
                gender: "Girls Only",
                roomRent: { min: 7000, max: 9500 },
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Mess Food", "Power Backup", "Housekeeping"],
                ownerContactName: "Mr. Singh",
                ownerPhone: "+91-6789012345",
                ownerEmail: "singh.pg@example.com",
                description: "A friendly and affordable PG for girls, focusing on safety and student needs."
            },
            {
                id: 'ua-h006',
                name: "Delhi Student Hub",
                location: "Mukherjee Nagar, Delhi",
                image: "room.jpg",
                distance: 1.2,
                gender: "Boys Only",
                roomRent: { min: 9500, max: 14000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "AC", "Study Room", "Gym", "Mess Food", "Sports Area"],
                ownerContactName: "Mr. Rathore",
                ownerPhone: "+91-9900112233",
                ownerEmail: "rathore.hub@example.com",
                description: "Modern facilities with a focus on academic excellence and a lively student community."
            },
            {
                id: 'ua-h007',
                name: "Vasant Vihar Dorms",
                location: "Vasant Vihar, Delhi",
                image: "room.jpg",
                distance: 5.5,
                gender: "Unisex",
                roomRent: { min: 10000, max: 15000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "AC", "Attached Bathroom", "Lounge Area", "CCTV Surveillance"],
                ownerContactName: "Ms. Kaur",
                ownerPhone: "+91-9876500112",
                ownerEmail: "kaur.dorms@example.com",
                description: "Upscale dormitory experience in a quiet, residential neighborhood."
            },
            {
                id: 'ua-h008',
                name: "Old Rajinder Nagar Stays",
                location: "Old Rajinder Nagar, Delhi",
                image: "room.jpg",
                distance: 3.8,
                gender: "Boys Only",
                roomRent: { min: 8200, max: 11000 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Mess Food", "Power Backup", "Study Tables"],
                ownerContactName: "Mr. Agarwal",
                ownerPhone: "+91-9765432100",
                ownerEmail: "agarwal.stays@example.com",
                description: "A popular choice for male students due to its central location and essential amenities."
            }
        ],
        'university-b': [
            {
                id: 'ub-h001',
                name: "Sea Breeze Dorms",
                location: "Marine Lines, Mumbai",
                image:"room.jpg",
                distance: 4.0,
                gender: "Unisex",
                roomRent: { min: 10000, max: 15000 },
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Cafeteria", "Lounge Area", "24/7 Security", "Laundry", "AC"],
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
                distance: 2.2,
                gender: "Boys Only",
                roomRent: { min: 9500, max: 13000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Mess Food", "Study Zone", "Gym", "Power Backup"],
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
                distance: 3.5,
                gender: "Girls Only",
                roomRent: { min: 8800, max: 12500 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Laundry Service", "Daily Housekeeping", "CCTV", "Recreation Room", "AC"],
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
                distance: 5.1,
                gender: "Unisex",
                roomRent: { min: 11000, max: 16000 },
                roomCapacity: "Single, Double",
                facilities: ["Co-working Space", "High-speed Wi-Fi", "Kitchenette Access", "Secure Entry", "Common Area", "AC"],
                ownerContactName: "Ms. Patel",
                ownerPhone: "+91-9876512340",
                ownerEmail: "patel.hub@example.com",
                description: "Modern co-living space in Bandra, designed for students who value collaboration and independent living."
            },
            {
                id: 'ub-h005',
                name: "Dadar Youth Hostel",
                location: "Dadar, Mumbai",
                image: "room.jpg",
                distance: 6.2,
                gender: "Boys Only",
                roomRent: { min: 8000, max: 11000 },
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Mess Food", "Locker Facility", "24/7 Security"],
                ownerContactName: "Mr. Khan",
                ownerPhone: "+91-9090909090",
                ownerEmail: "khan.hostel@example.com",
                description: "A popular and lively hostel for boys in the heart of Dadar, with easy commute options."
            },
            {
                id: 'ub-h006',
                name: "Colaba Executive Stays",
                location: "Colaba, Mumbai",
                image: "room.jpg",
                distance: 7.5,
                gender: "Unisex",
                roomRent: { min: 12000, max: 18000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "AC", "Laundry Service", "Gym Access", "City View"],
                ownerContactName: "Mrs. Rao",
                ownerPhone: "+91-8787878787",
                ownerEmail: "rao.stays@example.com",
                description: "Premium executive stays with modern amenities, perfect for discerning students or young professionals."
            },
            {
                id: 'ub-h007',
                name: "Goregaon Girls PG",
                location: "Goregaon East, Mumbai",
                image: "room.jpg",
                distance: 3.0,
                gender: "Girls Only",
                roomRent: { min: 7800, max: 10500 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Homely Food", "Housekeeping", "Power Backup"],
                ownerContactName: "Ms. Reddy",
                ownerPhone: "+91-7676767676",
                ownerEmail: "reddy.pg@example.com",
                description: "A secure and comfortable PG for female students in Goregaon, with a focus on safety and well-being."
            },
            {
                id: 'ub-h008',
                name: "Malad Student Homes",
                location: "Malad West, Mumbai",
                image: "room.jpg",
                distance: 4.8,
                gender: "Boys Only",
                roomRent: { min: 9200, max: 12800 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Mess Food", "Study Lounge", "CCTV", "Laundry"],
                ownerContactName: "Mr. Tendulkar",
                ownerPhone: "+91-9898989898",
                ownerEmail: "tendulkar.homes@example.com",
                description: "Well-maintained student homes in a prime residential area, offering peace and quiet."
            }
        ],
        'university-c': [
            {
                id: 'uc-h001',
                name: "Tech Park Hostel",
                location: "Guindy, Chennai",
                image:"room.jpg",
                distance: 1.0,
                gender: "Boys Only",
                roomRent: { min: 7000, max: 10000 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Mess Food", "Sports Facilities", "Medical Support", "Security", "AC"],
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
                distance: 3.2,
                gender: "Girls Only",
                roomRent: { min: 6500, max: 9500 },
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
                distance: 2.8,
                gender: "Unisex",
                roomRent: { min: 7800, max: 11000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Attached Bath", "AC", "Gym", "Common Lounge", "Mess Food"],
                ownerContactName: "Mr. Karthik",
                ownerPhone: "+91-7000444555",
                ownerEmail: "karthik.view@example.com",
                description: "Enjoy scenic views and a relaxed atmosphere, suitable for all students seeking modern amenities."
            },
            {
                id: 'uc-h004',
                name: "Anna Nagar Dormitory",
                location: "Anna Nagar, Chennai",
                image: "room.jpg",
                distance: 4.5,
                gender: "Boys Only",
                roomRent: { min: 8500, max: 12000 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Mess Food", "Sports Ground", "24/7 Security", "Power Backup"],
                ownerContactName: "Mr. Suresh",
                ownerPhone: "+91-9123456789",
                ownerEmail: "suresh.dorms@example.com",
                description: "Modern dormitory for boys with excellent facilities and a vibrant student community."
            },
            {
                id: 'uc-h005',
                name: "Nungambakkam PG",
                location: "Nungambakkam, Chennai",
                image: "room.jpg",
                distance: 3.8,
                gender: "Girls Only",
                roomRent: { min: 7200, max: 10500 },
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Homemade Food", "Laundry Service", "CCTV", "Reading Room"],
                ownerContactName: "Ms. Priya",
                ownerPhone: "+91-9876543211",
                ownerEmail: "priya.pg@example.com",
                description: "A secure and cozy PG for female students, offering a homely environment and delicious food."
            },
            {
                id: 'uc-h006',
                name: "Mylapore Hostel",
                location: "Mylapore, Chennai",
                image: "room.jpg",
                distance: 5.0,
                gender: "Unisex",
                roomRent: { min: 9000, max: 13000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "AC", "Attached Bathroom", "Lounge Area", "Terrace Garden"],
                ownerContactName: "Mr. Anand",
                ownerPhone: "+91-9988776654",
                ownerEmail: "anand.hostel@example.com",
                description: "Centrally located hostel with premium amenities, perfect for students seeking comfort and convenience."
            },
            {
                id: 'uc-h007',
                name: "Velachery Student Home",
                location: "Velachery, Chennai",
                image: "room.jpg",
                distance: 2.1,
                gender: "Boys Only",
                roomRent: { min: 7500, max: 10500 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Mess Food", "Study Zone", "Gym", "Power Backup"],
                ownerContactName: "Mr. Gopi",
                ownerPhone: "+91-7777788888",
                ownerEmail: "gopi.home@example.com",
                description: "A modern and well-equipped student home, ideal for focused studies and healthy living."
            },
            {
                id: 'uc-h008',
                name: "T. Nagar Girls Dorm",
                location: "T. Nagar, Chennai",
                image: "room.jpg",
                distance: 4.2,
                gender: "Girls Only",
                roomRent: { min: 8200, max: 11500 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Daily Housekeeping", "Laundry Service", "CCTV", "Recreation Room", "AC"],
                ownerContactName: "Ms. Devi",
                ownerPhone: "+91-9345678901",
                ownerEmail: "devi.dorm@example.com",
                description: "Safe, spacious, and comfortable dormitory for female students in a bustling area."
            }
        ],
        'university-d': [
            {
                id: 'ud-h001',
                name: "College Street Quarters",
                location: "College Street, Kolkata",
                image:"room.jpg",
                distance: 0.8,
                gender: "Unisex",
                roomRent: { min: 6000, max: 9000 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Basic Mess Food", "Study Area", "24/7 Security"],
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
                distance: 4.5,
                gender: "Girls Only",
                roomRent: { min: 7500, max: 11000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "Daily Meals", "Laundry", "Gym Access", "Transport Facility", "AC"],
                ownerContactName: "Mrs. Banerjee",
                ownerPhone: "+91-9234567890",
                ownerEmail: "banerjee.inn@example.com",
                description: "A peaceful and well-maintained hostel for female students, offering easy access to the Salt Lake area."
            },
            {
                id: 'ud-h003',
                name: "Park Street Hostels",
                location: "Park Street, Kolkata",
                image: "room.jpg",
                distance: 3.0,
                gender: "Boys Only",
                roomRent: { min: 8500, max: 12000 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Mess Food", "Recreation Room", "24/7 Security"],
                ownerContactName: "Mr. Das",
                ownerPhone: "+91-7890123450",
                ownerEmail: "das.hostel@example.com",
                description: "Lively hostel near Park Street, offering a balanced student life."
            },
            {
                id: 'ud-h004',
                name: "South Kolkata Student Living",
                location: "Gariahat, Kolkata",
                image: "room.jpg",
                distance: 6.0,
                gender: "Unisex",
                roomRent: { min: 9000, max: 13000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "AC", "Common Lounge", "Laundry Service", "Power Backup"],
                ownerContactName: "Ms. Mitra",
                ownerPhone: "+91-6789012340",
                ownerEmail: "mitra.living@example.com",
                description: "Modern co-living space in South Kolkata, ideal for students seeking a comfortable stay."
            },
            {
                id: 'ud-h005',
                name: "Howrah Bridge Dorms",
                location: "Howrah, Kolkata",
                image: "room.jpg",
                distance: 2.5,
                gender: "Boys Only",
                roomRent: { min: 6800, max: 9500 },
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Basic Mess Food", "Study Area", "CCTV"],
                ownerContactName: "Mr. Ghosh",
                ownerPhone: "+91-9900113344",
                ownerEmail: "ghosh.dorms@example.com",
                description: "Economical and convenient dorms with good connectivity."
            },
            {
                id: 'ud-h006',
                name: "New Town Student Lodge",
                location: "New Town, Kolkata",
                image: "room.jpg",
                distance: 8.0,
                gender: "Unisex",
                roomRent: { min: 10000, max: 15000 },
                roomCapacity: "Single, Double",
                facilities: ["Wi-Fi", "AC", "Gym", "Cafeteria", "Swimming Pool (seasonal)"],
                ownerContactName: "Mr. Roy",
                ownerPhone: "+91-9876500334",
                ownerEmail: "roy.lodge@example.com",
                description: "Luxury student lodge with comprehensive amenities in a developing area."
            },
            {
                id: 'ud-h007',
                name: "Dum Dum Girls Hostel",
                location: "Dum Dum, Kolkata",
                image: "room.jpg",
                distance: 5.5,
                gender: "Girls Only",
                roomRent: { min: 7000, max: 10000 },
                roomCapacity: "Double, Triple",
                facilities: ["Wi-Fi", "Homemade Food", "Housekeeping", "Power Backup"],
                ownerContactName: "Ms. Dasgupta",
                ownerPhone: "+91-9765400112",
                ownerEmail: "dasgupta.hostel@example.com",
                description: "Safe and homely environment for female students, well-connected to public transport."
            },
            {
                id: 'ud-h008',
                name: "Kidderpore Boys PG",
                location: "Kidderpore, Kolkata",
                image: "room.jpg",
                distance: 7.2,
                gender: "Boys Only",
                roomRent: { min: 6500, max: 9000 },
                roomCapacity: "Triple, Quad",
                facilities: ["Wi-Fi", "Basic Mess Food", "Study Tables", "Locker Facility"],
                ownerContactName: "Mr. Mondal",
                ownerPhone: "+91-9012345000",
                ownerEmail: "mondal.pg@example.com",
                description: "Affordable PG for boys with essential amenities and a friendly atmosphere."
            }
        ]
    };

    // --- DOM Elements ---
    const universitySelect = document.getElementById('university-select');
    const hostelGrid = document.getElementById('hostel-grid');
    const findButton = document.querySelector('.btn-primary');

    // Filter elements
    const genderFilters = document.querySelectorAll('input[name="gender"]');
    const minRentInput = document.getElementById('min-rent');
    const maxRentInput = document.getElementById('max-rent');
    const distanceSlider = document.getElementById('distance-slider');
    const distanceValueSpan = document.getElementById('distance-value');
    const serviceFilters = document.querySelectorAll('input[name="service"]');
    const applyFiltersButton = document.getElementById('apply-filters-btn');
    const clearFiltersButton = document.getElementById('clear-filters-btn');

    let currentSelectedUniversityId = ''; // To keep track of the currently selected university

    // --- Function to Filter and Display Hostels ---
    const filterAndDisplayHostels = () => {
        const selectedUniversityId = currentSelectedUniversityId; // Use the stored ID

        if (!selectedUniversityId) {
            hostelGrid.innerHTML = `<p class="placeholder-text">Please select a university first.</p>`;
            return;
        }

        let filteredHostels = hostelsData[selectedUniversityId] || [];

        // 1. Filter by Gender
        const selectedGenders = Array.from(genderFilters)
                                     .filter(checkbox => checkbox.checked)
                                     .map(checkbox => checkbox.value);

        if (selectedGenders.length > 0) {
            filteredHostels = filteredHostels.filter(hostel => selectedGenders.includes(hostel.gender));
        }

        // 2. Filter by Rent Price
        const minRent = parseInt(minRentInput.value) || 0;
        const maxRent = parseInt(maxRentInput.value) || Infinity;

        filteredHostels = filteredHostels.filter(hostel =>
            hostel.roomRent.min >= minRent && hostel.roomRent.max <= maxRent
        );

        // 3. Filter by Distance
        const maxDistance = parseFloat(distanceSlider.value);
        if (maxDistance > 0) { // Only apply if slider is moved from 0
            filteredHostels = filteredHostels.filter(hostel => hostel.distance <= maxDistance);
        }

        // 4. Filter by Services (AC/WiFi/Mess)
        const selectedServices = Array.from(serviceFilters)
                                      .filter(checkbox => checkbox.checked)
                                      .map(checkbox => checkbox.value);

        if (selectedServices.length > 0) {
            filteredHostels = filteredHostels.filter(hostel =>
                selectedServices.every(service => hostel.facilities.includes(service))
            );
        }

        // Clear the grid before displaying filtered results
        hostelGrid.innerHTML = '';

        if (filteredHostels.length === 0) {
            hostelGrid.innerHTML = `<p class="placeholder-text">No hostels found matching your criteria for this university.</p>`;
            return;
        }

        // Display the filtered hostels
        filteredHostels.forEach(hostel => {
            const card = document.createElement('div');
            card.className = 'hostel-card';

            card.innerHTML = `
                <img src="${hostel.image}" alt="${hostel.name}">
                <div class="card-content">
                    <h3>${hostel.name}</h3>
                    <p class="location">${hostel.location}</p>
                    <p class="card-info">Distance: ${hostel.distance} km</p>
                    <p class="card-info">Rent: ₹${hostel.roomRent.min} - ₹${hostel.roomRent.max}</p>
                    <p class="card-info">Gender: ${hostel.gender}</p>
                    <a href="hostel-details.html?id=${hostel.id}" class="btn-secondary">View Details</a>
                </div>
            `;
            hostelGrid.appendChild(card);
        });
    };

    // --- Initial setup for distance slider ---
    if (distanceValueSpan && distanceSlider) {
        distanceValueSpan.textContent = `${distanceSlider.value} km`; // Set initial display
        distanceSlider.addEventListener('input', () => {
            distanceValueSpan.textContent = `${distanceSlider.value} km`;
        });
    }


    // --- Event Listeners ---

    // Find Hostels Button (initial selection)
    findButton.addEventListener('click', () => {
        const selectedUniversity = universitySelect.value;
        if (selectedUniversity) {
            currentSelectedUniversityId = selectedUniversity; // Store the selected university
            // Reset filters when a new university is selected
            resetFilters();
            filterAndDisplayHostels(); // Display all hostels for the selected university initially
            document.querySelector('.filters-section').style.display = 'block'; // Show filters
        } else {
            hostelGrid.innerHTML = `<p class="placeholder-text">Please select a university first.</p>`;
            document.querySelector('.filters-section').style.display = 'none'; // Hide filters
        }
    });

    // Apply Filters Button
    applyFiltersButton.addEventListener('click', filterAndDisplayHostels);

    // Clear Filters Button
    clearFiltersButton.addEventListener('click', () => {
        resetFilters();
        filterAndDisplayHostels(); // Redisplay hostels without filters
    });

    // Function to reset all filter controls
    const resetFilters = () => {
        // Reset gender checkboxes
        genderFilters.forEach(checkbox => checkbox.checked = false);

        // Reset rent inputs to default (or common range)
        minRentInput.value = ''; // Or set a reasonable min like 5000
        maxRentInput.value = ''; // Or set a reasonable max like 20000

        // Reset distance slider
        distanceSlider.value = distanceSlider.max; // Set to max distance initially
        distanceValueSpan.textContent = `${distanceSlider.max} km`; // Update display

        // Reset service checkboxes
        serviceFilters.forEach(checkbox => checkbox.checked = false);
    };

    // Hide filters section by default
    document.querySelector('.filters-section').style.display = 'none';

    // Optional: Auto-filter on change for some elements (e.g., slider)
    // distanceSlider.addEventListener('change', filterAndDisplayHostels);
    // genderFilters.forEach(checkbox => checkbox.addEventListener('change', filterAndDisplayHostels));
    // serviceFilters.forEach(checkbox => checkbox.addEventListener('change', filterAndDisplayHostels));

});
