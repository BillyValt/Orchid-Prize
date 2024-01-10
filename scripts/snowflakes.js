export default function runSnowflakes() {
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    document.body.appendChild(snowflake);

    const size = Math.random() * 4 + 1.6; // Random size between 5 and 15
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;
    snowflake.style.left = `${left}px`;
    snowflake.style.top = `-10vh`;

    const delay = Math.random() * 11; // Random delay between 0 and 5 seconds
    snowflake.style.animationDelay = `-${delay}s`;

    snowflake.addEventListener('animationiteration', () => {
      document.body.removeChild(snowflake);
      createSnowflake();
    });
  }

  function createSnowflakes() {
    const numberOfSnowflakes = 300; // Adjust the number of initial snowflakes
    for (let i = 0; i < numberOfSnowflakes; i++) {
      createSnowflake();
    }
  }

  createSnowflakes();

  // window.addEventListener('resize', createSnowflakes);

  // setInterval(() => { 
  //   createSnowflakes();
  // }, 5000)
}