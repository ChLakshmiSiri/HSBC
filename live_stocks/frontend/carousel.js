// WITHOUT CAROUSEL EFFECT - CUTE


// document.querySelectorAll('.card').forEach(card => {
//     card.addEventListener('click', () => {
//       document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
//       card.classList.add('active');
//     });
//   });


// WITH CAROUSEL EFFECT - LESS GIRLY


document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.carousel .card');
    let activeIndex = 0;
  
    function updateCarousel() {
      cards.forEach((card, i) => {
        card.classList.remove('active', 'next', 'prev');
      });
  
      cards[activeIndex].classList.add('active');
      cards[(activeIndex + 1) % cards.length].classList.add('next');
      cards[(activeIndex + cards.length - 1) % cards.length].classList.add('prev');
    }
  
    updateCarousel();
  
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (index === activeIndex) return;
        activeIndex = index;
        updateCarousel();
      });
    });
  });
  