document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close other open FAQ items if you want only one to be open at a time
      // faqItems.forEach(otherItem => {
      //     if (otherItem !== item && otherItem.classList.contains('active')) {
      //         otherItem.classList.remove('active');
      //     }
      // });

      // Toggle the 'active' class on the clicked item
      item.classList.toggle("active");

      // Adjust max-height for smooth transition
      const answer = item.querySelector(".faq-answer");
      if (item.classList.contains("active")) {
        // Set max-height to scrollHeight to allow smooth expansion
        // Add a small buffer (e.g., +20px) if content is dynamic or close to max-height
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0";
      }
    });
  });
});
