import { participants, chosenWinner, threeWinners } from './dataParticipants.js';

const startButton = document.querySelector('.js-start__btn');
const resetButton = document.querySelector('.js-reset__btn');
const winnerNameEl = document.querySelector('.js-winner-name');
const winnerContainerEl = document.querySelector('.winner__container');
const resultEl = document.querySelector('.result__container');
const resultImage = document.querySelector('.container__img');
const imageContainer = document.querySelector('.container__element');
const dotsWrapper = document.querySelector('.js-dots-wrapper')

let savedDemoIsOn = JSON.parse(localStorage.getItem('setting'));
let savedThreeWinners = JSON.parse(localStorage.getItem('setting1'));
console.log(localStorage)

let winner;
let wishWinner = chosenWinner[0].personName;

// ======== Index Javascrpt ========
let threeWinnersNum = 0; //Array index of the three winners
function pickWinner() {
  let personTotalNumber = participants.length;
  const randomPerson = Math.floor(Math.random() * personTotalNumber);
  let intervalId1;

  resultEl.innerHTML =
    `
    <div class="winner__incription">Подарок:</div>
    <div class="container__element">
      <img class="container__img" id="img-id-0" src="images/mystery__box1.png">
    </div>
  `;

  winnerContainerEl.style.backgroundColor = 'rgb(227, 227, 227)';

  intervalId1 = setInterval(() => {
    const randomPerson2 = Math.floor(Math.random() * personTotalNumber);;

    let randomName = participants[randomPerson2].personName;

    winnerNameEl.classList.add('winner-name-animation');

    winnerNameEl.innerHTML = `${randomName}`;

  }, 70);

  // console.log(threeWinners[4].personName);


  console.log(threeWinnersNum);
  setTimeout(() => {
    clearInterval(intervalId1);

    if (savedDemoIsOn) {
      winner = participants[randomPerson].personName;
    } else if (savedThreeWinners) {
      winner = threeWinners[threeWinnersNum].personName;

      if (threeWinnersNum > 1) { threeWinnersNum = 0; } else {
        threeWinnersNum++;
      }

    } else { winner = wishWinner; }

    winnerContainerEl.style.backgroundColor = 'rgb(170, 255, 0)';

    winnerNameEl.innerHTML = `🎉${winner}`;

    winnerNameEl.classList.remove('winner-name-animation');

    dotsWrapper.classList.add('dots-wrapper')

  }, 3400)

  dotsWrapper.classList.remove('dots-wrapper')
  winnerNameEl.classList.remove('winner-name-animation');
  winnerContainerEl.classList.remove('winner__container__animation');
};

let prizeNum = 0;
function pickPrize() {
  let randomPrizeNum = Math.floor(Math.random() * 10); //<==Prizes quantity adjustment

  resultImage.style.opacity = '0';

  setTimeout(() => {
    const copyResultImage = document.querySelector('.container__img');

    copyResultImage.classList.add('prize-animation-disappearing');
  }, 3400);


  setTimeout(() => {
    if (savedDemoIsOn) {
      resultEl.innerHTML = `
      <div class="winner__incription">Подарок:</div>
        <div class="container__element">
        <img class="container__img" id="img-id-0" src="images/randomPrize${randomPrizeNum}.png">
      </div>
      `;
    } else if (savedThreeWinners) {
      resultEl.innerHTML = ` 
      <div class="winner__incription">Подарок:</div>
        <div class="container__element">
        <img class="container__img" id="img-id-0" src="images/prizesForThree/sPrize${prizeNum}.png">
      </div>
     `;

      if (prizeNum > 1) {
        prizeNum = 0;
      } else { prizeNum++; }
    } else {
      resultEl.innerHTML = ` 
      <div class="winner__incription">Подарок:</div>
        <div class="container__element">
        <img class="container__img" id="img-id-0" src="images/randomPrize6.png">
      </div>
     `;
    }

    winnerContainerEl.classList.add('winner__container__animation');

    const copyResultImage = document.querySelector('.container__img');

    copyResultImage.classList.add('prize-animation');

    console.log(copyResultImage.classList.contains('prize-animation'));

    startButton.style.display = 'none'

    resetButton.style.display = 'block';
  }, 4400);

}

resultImage.classList.add('prize-animation');

function resetPrize() {
  winnerNameEl.innerHTML = '&#10053;&#10053;&#10053;&#10053;&#10053; &#10053;&#10053;&#10053;&#10053;&#10053;';

  resultEl.innerHTML =
    `
    <div class="winner__incription">Подарок:</div>
    <div class="container__element">
      <img class="container__img js-prize-animation-disappearing" id="img-id-0" src="images/mystery__box1.png">
    </div>
  `;
  winnerContainerEl.style.backgroundColor = 'rgb(227, 227, 227)';

  const copyResultImage = document.querySelector('.container__img');
  copyResultImage.classList.add('prize-animation');
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  startButton.style.opacity = '0.6';
  pickWinner();
  pickPrize();
});

resetButton.addEventListener('click', () => {
  //buttons styles
  startButton.disabled = false;
  startButton.style.opacity = '1';
  startButton.style.display = 'block';
  resetButton.style.display = 'none';

  resetPrize();
});


//===STARS BACKGROUND===
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  document.body.appendChild(snowflake);

  const size = Math.random() * 4 + 3; // Random size between 5 and 15
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
  const numberOfSnowflakes = 110; // Adjust the number of initial snowflakes
  for (let i = 0; i < numberOfSnowflakes; i++) {
    createSnowflake();
  }
}

createSnowflakes();

window.addEventListener('resize', createSnowflakes);

// setInterval(() => { 
//   createSnowflakes();
// }, 5000)









