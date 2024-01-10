export default function createStars() {

  const numberOfStars = 220; // Adjust the number of stars
  // const container = document.body;
  const container = document.querySelector('.general');

  function updateStarPosition(star) {
    const size = Math.random() * 2.3 + 0.9; // Random size between 1 and 4
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    const opacity = Math.random() * 0.7 + 0.9; // Random opacity between 0.3 and 1
    star.style.opacity = opacity;

    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;
    star.style.left = `${left}px`;
    star.style.top = `${top}px`;
  }

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    container.appendChild(star);
    updateStarPosition(star);

    const delay = Math.random() * 2; // Adjust the maximum delay as needed
    star.style.animationDelay = `${delay}s`;
  }


  window.addEventListener('resize', () => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(updateStarPosition);
  });
}
