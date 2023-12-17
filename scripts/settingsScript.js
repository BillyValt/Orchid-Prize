import { participants, chosenWinner } from './dataParticipants.js';
const checkboxesContainerEl = document.querySelector('.checkboxes-container');

const saveButton = document.querySelector('.save-button-js');
const savedNotif = document.querySelector('.saved_notification');
const listContainerEl = document.querySelector('.js-list-container');

//=====Checkbox Elements======
let settingsCheckboxEl = document.querySelector('.settings-checkbox-js');
let threeWinnersCheckboxEl = document.querySelector('.three-winners-checkbox-js');

settingsCheckboxEl.addEventListener('click', () => {
  addListOpacity();
  threeWinnersCheckboxEl.checked = false;
});

threeWinnersCheckboxEl.addEventListener('click', () => {
  addListOpacity();
  settingsCheckboxEl.checked = false;
});

export let savedDemoIsOn = JSON.parse(localStorage.getItem('setting'));
export let savedThreeWinners = JSON.parse(localStorage.getItem('setting1'));


let timerId;
let timerId1;

let checkboxStatement = settingsCheckboxEl.checked = savedDemoIsOn;

export { checkboxStatement };

let threeCheckboxStatement = threeWinnersCheckboxEl.checked = savedThreeWinners;

// console.log(threeCheckboxStatement.checked)
// console.log(settingsCheckboxEl.checked)

function addListOpacity() {
  if (settingsCheckboxEl.checked || threeWinnersCheckboxEl.checked) {
    listContainerEl.style.opacity = '0.3';
    listContainerEl.pointerEvents = 'none';
  } else {
    listContainerEl.style.opacity = '1';
  }
}

addListOpacity();


//====SAVE BUTTON ACTIONS=====
let saveButtonListener = saveButton.addEventListener('click', () => {
  if (settingsCheckboxEl.checked) {
    localStorage.setItem('setting', settingsCheckboxEl.checked);
    localStorage.removeItem('setting1', threeWinnersCheckboxEl.checked);
  } else if (threeWinnersCheckboxEl.checked) {
    localStorage.setItem('setting1', threeWinnersCheckboxEl.checked);
    localStorage.removeItem('setting', settingsCheckboxEl.checked);
  } else if (!settingsCheckboxEl.checked && !threeWinnersCheckboxEl.checked) {
    localStorage.removeItem('setting', settingsCheckboxEl.checked);
    localStorage.removeItem('setting1', threeWinnersCheckboxEl.checked);
  }

  console.log(threeWinnersCheckboxEl.checked);


  localStorage.setItem('chosenWinner', chosenWinner[0].personName);

  savedNotif.style.visibility = 'visible';
  savedNotif.innerHTML = 'Сохранено ✅';

  timerId = setTimeout(() => {
    clearTimeout(timerId);

    savedNotif.innerHTML = '';
    savedNotif.style.visibility = 'hidden';
  }, 1200);
})

console.log(localStorage);

function generatingCards() {

  participants.forEach(participant => {
    const name = participant.personName;

    const isChecked = name === chosenWinner[0].personName;

    listContainerEl.innerHTML += `
      <div class="card js-card" data-person-name="${participant.personName}">
        <div class="participant-name">
          ${name}
        </div>
        <input class="js-radio" data-person-name="${participant.personName}" type="radio" name="radio1" ${isChecked ? 'checked' : ''}>
      </div>
   `;

  })

  const radioEl = document.querySelectorAll('.js-radio');



  radioEl.forEach(radioBtn => {
    radioBtn.addEventListener('click', () => {
      // console.log(radioBtn.dataset.personName);

      if (radioBtn.checked) {
        chosenWinner[0].personName = radioBtn.dataset.personName;
      }

      console.log(chosenWinner[0].personName);
    })
  })
}

// console.log(isChecked);



generatingCards();

function markRed(card, index) {
  if (card.classList.contains('is-card-marked')) {
    card.classList.remove('is-card-marked')

    localStorage.removeItem(`cardColor${index}`);
  } else {
    card.classList.add('is-card-marked')

    localStorage.setItem(`cardColor${index}`, 'is-card-marked');
  }
}



const cardEl = document.querySelectorAll('.js-card');

cardEl.forEach((card, index) => {
  const storedClass = localStorage.getItem(`cardColor${index}`);

  if (storedClass) { card.classList.add(storedClass) };

  //====Mouse Click====
  card.addEventListener('mousedown', () => {
    timerId1 = setTimeout(() => {
      markRed(card, index);
    }, 1000);
  });

  card.addEventListener('mouseup', () => {
    clearTimeout(timerId1)
    console.log(index);
  })

  //====Touch====
  card.addEventListener('touchstart', (event) => {
    timerId1 = setTimeout(() => {
      markRed(card, index);
      event.preventDefault();
    }, 1000);
  });

  card.addEventListener('touchend', () => {
    clearTimeout(timerId1)
    console.log(index);
  })
});












