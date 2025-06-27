document.addEventListener("DOMContentLoaded", () => {
  // Get references to the button and panel elements
  const calculatorFab = document.getElementById("calculator-fab");
  const calculatorPanel = document.getElementById("calculator-panel");
  const closeCalculatorBtn = document.getElementById("close-calculator-panel");

  // Get references to all input fields
  const initialSetupInput = document.getElementById("initial-setup");
  const roomEssentialsInput = document.getElementById("room-essentials");
  const monthlyRentInput = document.getElementById("monthly-rent");
  const foodBudgetInput = document.getElementById("food-budget");
  const electricityInput = document.getElementById("electricity");
  const internetInput = document.getElementById("internet");
  const transportInput = document.getElementById("transport");
  const personalCareInput = document.getElementById("personal-care");
  const academicSuppliesInput = document.getElementById("academic-supplies");
  const entertainmentInput = document.getElementById("entertainment");
  const miscFundInput = document.getElementById("misc-fund");

  // Get references to the result display elements
  const oneTimeTotalSpan = document.getElementById("one-time-total");
  const monthlyTotalSpan = document.getElementById("monthly-total");
  const grandTotalSpan = document.getElementById("grand-total");

  // Function to calculate and update expenses
  function calculateExpenses() {
    // Helper function to safely get a number from an input field
    // Returns 0 if the input is empty or not a valid number
    const getNum = (input) => parseFloat(input.value) || 0;

    // Calculate One-Time Costs
    const initialSetup = getNum(initialSetupInput);
    const roomEssentials = getNum(roomEssentialsInput);
    const oneTimeTotal = initialSetup + roomEssentials;

    // Calculate Monthly Recurring Costs
    const monthlyRent = getNum(monthlyRentInput);
    const foodBudget = getNum(foodBudgetInput);
    const electricity = getNum(electricityInput);
    const internet = getNum(internetInput);
    const transport = getNum(transportInput);
    const personalCare = getNum(personalCareInput);
    const academicSupplies = getNum(academicSuppliesInput);
    const entertainment = getNum(entertainmentInput);
    const miscFund = getNum(miscFundInput);

    const monthlyTotal =
      monthlyRent +
      foodBudget +
      electricity +
      internet +
      transport +
      personalCare +
      academicSupplies +
      entertainment +
      miscFund;

    // Calculate Grand Total (One-Time Costs + First Month's Recurring Costs)
    const grandTotal = oneTimeTotal + monthlyTotal;

    // Update the display with calculated values, formatted as currency
    // .toLocaleString() helps format numbers with commas (e.g., 20,000)
    oneTimeTotalSpan.textContent = `${oneTimeTotal.toLocaleString()} INR`;
    monthlyTotalSpan.textContent = `${monthlyTotal.toLocaleString()} INR`;
    grandTotalSpan.textContent = `${grandTotal.toLocaleString()} INR`;
  }

  // Attach 'input' event listener to all number input fields
  // This makes the calculation update in real-time as the user types
  const allInputs = [
    initialSetupInput,
    roomEssentialsInput,
    monthlyRentInput,
    foodBudgetInput,
    electricityInput,
    internetInput,
    transportInput,
    personalCareInput,
    academicSuppliesInput,
    entertainmentInput,
    miscFundInput,
  ];

  allInputs.forEach((input) => {
    input.addEventListener("input", calculateExpenses);
  });

  // Event listener for the floating action button to toggle the calculator panel
  calculatorFab.addEventListener("click", () => {
    calculatorPanel.classList.toggle("active"); // Add or remove 'active' class
    // If the panel just became active, perform an initial calculation
    if (calculatorPanel.classList.contains("active")) {
      calculateExpenses();
    }
  });

  // Event listener for the close button inside the panel
  closeCalculatorBtn.addEventListener("click", () => {
    calculatorPanel.classList.remove("active"); // Hide the panel
  });

  // Optional: Close panel if user clicks outside of it
  document.addEventListener("click", (event) => {
    // Check if the click was outside the panel AND outside the FAB
    // AND if the panel is currently active
    if (
      !calculatorPanel.contains(event.target) &&
      !calculatorFab.contains(event.target) &&
      calculatorPanel.classList.contains("active")
    ) {
      calculatorPanel.classList.remove("active");
    }
  });

  // Perform an initial calculation when the page loads
  // This ensures totals are displayed correctly even if inputs have default values
  calculateExpenses();
});
