
  
  let savedCards = {};

window.onload = function () {
  const savedCardsData = localStorage.getItem('savedCardsData');
  if (savedCardsData) {
    savedCards = JSON.parse(savedCardsData);
    renderSavedCards();
  }
};

function saveCards() {
  let title = prompt('Palun sisesta pealkiri kaardidele:');
  if (title) {
    if (savedCards.hasOwnProperty(title)) {
      const confirmOverwrite = confirm('Pealkiri on juba olemas. Kas soovite seda üle kirjutada?');
      if (confirmOverwrite) {
        savedCards[title] = document.getElementById('divContainer').innerHTML;
        alert('Kaardid on üle kirjutatud pealkirjaga: ' + title);
      } else {
        title = prompt('Palun sisesta uus pealkiri kaardidele:');
        if (title) {
          savedCards[title] = document.getElementById('divContainer').innerHTML;
          createSavedButton(title);
          clearDivContainer();
        }
      }
    } else {
      savedCards[title] = document.getElementById('divContainer').innerHTML;
      createSavedButton(title);
      clearDivContainer();
    }
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem('savedCardsData', JSON.stringify(savedCards));
}

function renderSavedCards() {
  Object.keys(savedCards).forEach(title => {
    createSavedButton(title);
  });
}

function clearDivContainer() {
  const divContainer = document.getElementById('divContainer');
  divContainer.innerHTML = '';
}
  function createDiv() {
    const questionInput = document.getElementById('questionInput');
    const answerInput = document.getElementById('answerInput');
    const divContainer = document.getElementById('divContainer');

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.addEventListener('click', rotateCard);

    const frontDiv = document.createElement('div');
    frontDiv.classList.add('card', 'front');
    frontDiv.innerText = questionInput.value;

    const backDiv = document.createElement('div');
    backDiv.classList.add('card', 'back');
    backDiv.innerText = answerInput.value;

    cardContainer.appendChild(frontDiv);
    cardContainer.appendChild(backDiv);

    containerDiv.appendChild(cardContainer);
    divContainer.appendChild(containerDiv);

    clearInputs();

    savedCards[title] = document.getElementById('divContainer').innerHTML;
  createSavedButton(title);
  clearDivContainer();
  saveToLocalStorage();

  }

function editCards() {
const cardContainers = document.querySelectorAll('.card-container');

cardContainers.forEach(cardContainer => {
  const frontCard = cardContainer.querySelector('.front');
  const backCard = cardContainer.querySelector('.back');

  const editQuestionInput = document.createElement('input');
  editQuestionInput.type = 'text';
  editQuestionInput.value = frontCard.innerText;
  const editAnswerInput = document.createElement('input');
  editAnswerInput.type = 'text';
  editAnswerInput.value = backCard.innerText;
  const saveChangesBtn = document.createElement('button');
  saveChangesBtn.textContent = 'Salvesta muudatused';

  saveChangesBtn.onclick = function () {
    frontCard.innerText = editQuestionInput.value;
    backCard.innerText = editAnswerInput.value;
    this.remove();
  };

  frontCard.innerHTML = '';
  frontCard.appendChild(editQuestionInput);
  backCard.innerHTML = '';
  backCard.appendChild(editAnswerInput);

  editQuestionInput.addEventListener('click', function (event) {
    event.stopPropagation(); 
  });

  editAnswerInput.addEventListener('click', function (event) {
    event.stopPropagation(); 
  });


  cardContainer.appendChild(saveChangesBtn); 
});
saveToLocalStorage();
}

function saveEdits() {
const editedCards = document.querySelectorAll('.card-container');

editedCards.forEach(cardContainer => {
  const frontCard = cardContainer.querySelector('.front');
  const backCard = cardContainer.querySelector('.back');

  frontCard.innerText = frontCard.querySelector('input').value;
  backCard.innerText = backCard.querySelector('input').value;
});
saveToLocalStorage();
}

  
  function rotateCard(event) {
    const cardContainer = event.currentTarget;
    cardContainer.style.transform = 'rotateY(180deg)';
    cardContainer.removeEventListener('click', rotateCard);
    cardContainer.addEventListener('click', rotateBack);
  }

  function rotateBack(event) {
    const cardContainer = event.currentTarget;
    cardContainer.style.transform = 'rotateY(0)';
    cardContainer.removeEventListener('click', rotateBack);
    cardContainer.addEventListener('click', rotateCard);
  }

  function clearInputs() {
    document.getElementById('questionInput').value = '';
    document.getElementById('answerInput').value = '';
  }

  function saveCards() {
  let title = prompt('Palun sisesta pealkiri kaardidele:');
  if (title) {
    if (savedCards.hasOwnProperty(title)) {
      const confirmOverwrite = confirm('Pealkiri on juba olemas. Kas soovite seda üle kirjutada?');
      if (confirmOverwrite) {
        savedCards[title] = document.getElementById('divContainer').innerHTML;
        alert('Kaardid on üle kirjutatud pealkirjaga: ' + title);
      } else {
        title = prompt('Palun sisesta uus pealkiri kaardidele:');
        if (title) {
          savedCards[title] = document.getElementById('divContainer').innerHTML;
          createSavedButton(title);
          document.getElementById('divContainer').innerHTML = '';
        }
      }
    } else {
      savedCards[title] = document.getElementById('divContainer').innerHTML;
      createSavedButton(title);
      document.getElementById('divContainer').innerHTML = '';
    }
  }
  saveToLocalStorage();
}


  function createSavedButton(title) {
    const savedCardsBtns = document.getElementById('savedCardsContainer');
    const newButton = document.createElement('button');
    newButton.classList.add('savedCard');
    newButton.textContent = title;
    newButton.onclick = function () {
      showSavedCards(title);
    };
    savedCardsBtns.appendChild(newButton);
    saveToLocalStorage();
  }
  function saveToLocalStorage() {
  localStorage.setItem('savedCardsData', JSON.stringify(savedCards));
}

  function showSavedCards(title) {
    document.querySelectorAll('.container').forEach(container => container.style.display = 'none');
    document.getElementById('divContainer').innerHTML = savedCards[title];
    document.querySelectorAll('.container')[0].style.display = 'block';
    document.querySelectorAll('.container .card-container').forEach(cardContainer => {
      cardContainer.addEventListener('click', rotateCard);
    });
  }
  function deleteAllCards() {
  const divContainer = document.getElementById('divContainer');
  divContainer.innerHTML = '';
}

function deleteSaved() {
const titleToDelete = prompt('Palun sisesta salvestatud kaartide pealkiri, mida soovid kustutada:');

if (titleToDelete) {
  if (savedCards.hasOwnProperty(titleToDelete)) {
    const confirmDelete = confirm('Kas olete kindel, et soovite kustutada kaardid pealkirjaga: ' + titleToDelete + '?');

    if (confirmDelete) {
      delete savedCards[titleToDelete];
      saveToLocalStorage();
      alert('Kaardid pealkirjaga ' + titleToDelete + ' on edukalt kustutatud.');
      removeSavedButton(titleToDelete); 
    } else {
      alert('Kustutamine tühistatud.');
    }
  } else {
    alert('Sellise pealkirjaga kaarte ei leitud.');
  }
} else {
  alert('Palun sisestage pealkiri!');
}
}

function removeSavedButton(title) {
const savedButtons = document.querySelectorAll('.savedCard'); 

savedButtons.forEach(button => {
  if (button.textContent === title) { 
    button.remove(); 
  }
});
}

