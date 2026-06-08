const carousel = document.querySelector('.carousel');
const cardsContainer = document.querySelector('.cards');
const arrows = document.querySelectorAll('.arrow');
const cards = document.querySelectorAll('.card');
let currentPosition = 0;

function createDots() {
  const container = document.querySelector('.carousel-container');
  const oldDots = container.querySelector('.carousel-dots');
  if (oldDots) oldDots.remove();
  
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  
  const totalPositions = cards.length - 2;
  
  for (let i = 0; i < totalPositions; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Position ${i + 1}`);
    
    if (i === 0) {
      dot.classList.add('active');
    }
    
    dot.addEventListener('click', () => {
      currentPosition = i;
      updateCarousel();
    });
    
    dotsContainer.appendChild(dot);
  }
  
  container.appendChild(dotsContainer);
}

function calculateCardWidth() {
  const card = document.querySelector('.card');
  return card.offsetWidth + 20;
}

function updateCarousel() {
  const maxPosition = cards.length - 3;
  
  if (currentPosition > maxPosition) currentPosition = maxPosition;
  if (currentPosition < 0) currentPosition = 0;
  
  const cardWidth = calculateCardWidth();
  const translateX = currentPosition * cardWidth;
  
  cardsContainer.style.transform = `translateX(-${translateX}px)`;
  
  arrows[0].classList.toggle('disabled', currentPosition === 0);
  arrows[1].classList.toggle('disabled', currentPosition >= maxPosition);
  
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPosition);
  });
}

function initCarousel() {
  arrows[0].classList.add('prev');
  arrows[1].classList.add('next');
  
  createDots();
  
  arrows[0].addEventListener('click', () => {
    if (!arrows[0].classList.contains('disabled')) {
      currentPosition--;
      updateCarousel();
    }
  });

  arrows[1].addEventListener('click', () => {
    if (!arrows[1].classList.contains('disabled')) {
      currentPosition++;
      updateCarousel();
    }
  });

  window.addEventListener('resize', () => {
    setTimeout(() => {
      createDots();
      updateCarousel();
    }, 100);
  });

  updateCarousel();
}

document.addEventListener('DOMContentLoaded', initCarousel);