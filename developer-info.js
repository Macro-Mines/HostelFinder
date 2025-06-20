const fab = document.getElementById('dev-fab');
const modal = document.getElementById('dev-card-modal');
const closeBtn = modal.querySelector('.card-close');

fab.addEventListener('click', () => {
    modal.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

// Close modal when clicking outside the card
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});

// ESC key closes modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open'))
        modal.classList.remove('open');
});