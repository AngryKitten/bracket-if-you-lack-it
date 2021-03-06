let bracketTextSize;
let bracketNameList = [];
let bracketName;
let roundNumber = 1;
let resetNumber = 0;
let carsList = [];
let carsListBackup = [];
let winnersList = [];

(function() {
  initalizeBracketNameList();
  bracketTextSize = localStorage.getItem('textSize')
  if (bracketTextSize === null) {
    bracketTextSize = '36';
  }
})();

function initalizeBracketNameList() {
  if (localStorage.getItem('bracketNameList') === null) {
    document.getElementById('bracket-name-list').innerHTML = 'No brackets exist to run';
  } else {
    bracketNameList = JSON.parse(localStorage.getItem('bracketNameList'));
    document.getElementById('bracket-header-name').innerHTML = '';
    document.getElementById('bracket-name-list').innerHTML = '';
    document.getElementById('bracket-main-group').innerHTML = '';
    document.getElementById('bracket-main-group').style.display = 'flex';
    document.getElementById('bracket-winner-group').innerHTML = '';
    document.getElementById('bracket-winner-group').style.display = 'flex';
    document.getElementById('bracket-next-round').innerHTML = '';
    document.getElementById('bracket-next-round').style.display = 'flex';
    if (document.getElementById('bracket-results')) {
      document.getElementById('bracket-results').remove();
    }
    document.getElementById('bracket-return').innerHTML = '';
    bracketNameList.map(bracketName => {
      document.getElementById('bracket-name-list').innerHTML += `
        <div><span class="clickable" onclick="selectBracket('${bracketName}')">${bracketName}</span></div>
      `;
    });
  }
}

function changeTextSize(changeMode) {
  if (changeMode === '-') {
    bracketTextSize = bracketTextSize - 2;
    localStorage.setItem('textSize', bracketTextSize);
  } else if (changeMode === '+') {
    bracketTextSize = JSON.parse(bracketTextSize) + 2;
    localStorage.setItem('textSize', bracketTextSize);
  }
  [...document.getElementsByClassName('bracket-item')].map(bracketItem => bracketItem.style.fontSize = bracketTextSize + 'px');
}

function selectBracket(bracketEditName) {
  bracketName = bracketEditName;
  document.getElementById('bracket-header-name').innerHTML = bracketName;
  carsList = JSON.parse(localStorage.getItem(bracketName));
  carsListBackup = [...carsList];
  if (localStorage.getItem('safeMode') === 'true') {
    document.getElementById('back-button').remove();
    document.getElementById('text-size-change').remove();
    document.getElementById('page-header').innerHTML = `
      <span class="spacer"></span>${document.getElementById('page-header').innerHTML}<span class="spacer"></span>
    `;
    document.getElementById('bracket-name-list').remove();
  } else {
    document.getElementById('bracket-name-list').innerHTML = `
      <div><span class="clickable" onclick="initalizeBracketNameList()">< Back to bracket list</span></div>
    `;
  }
  if (carsList[0].bracketGroup === null) {
    initializeBracket();
  } else {

  }
}

function initializeBracket() {
  randomize(carsList);
  let carIndex = carsList.length;
  let activeBracketGroupNumber = 1;
  let extraCarsAmount = carsList.length % 4;
  while (carIndex !== 0) {
    if (extraCarsAmount === 0 || carIndex > 9) {
      carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 4);
      activeBracketGroupNumber++;
    } else {
      if (carIndex % 3 === 0) {
        for (let i = 0; i < carIndex / 3; i++) {
          carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 3);
          activeBracketGroupNumber++;
        }
      } else {
        switch(carIndex) {
          case 7:
            carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 4);
            activeBracketGroupNumber++;
            carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 3);
            activeBracketGroupNumber++;
            break;
          case 5:
            carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 3);
            activeBracketGroupNumber++;
            carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 2);
            activeBracketGroupNumber++;
            break;
          case 4:
            carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 4);
            activeBracketGroupNumber++;
            break;
          case 2:
            carIndex = setBracketGroups(carIndex, activeBracketGroupNumber, 2);
            activeBracketGroupNumber++;
            break;
          default:
            break;
        }
      }
    }
  }
  activeBracketGroupNumber = 0;
  carsList.reverse();
  document.getElementById('bracket-main-group').innerHTML = '';
  document.getElementById('bracket-winner-group').innerHTML = '';
  for (let i = 0; i < carsList.length; i++) {
    if (carsList[i].bracketGroup === activeBracketGroupNumber) {
      document.getElementById('bracket-group-' + activeBracketGroupNumber).innerHTML += `
        <a href="#bracket-group-${activeBracketGroupNumber}" id="car-${i}" class="bracket-group-car" onclick="selectWinner(${i})">
          <span class="bracket-item bracket-group-car-number">${carsList[i].carNumber} |</span>
          <span class="bracket-item">${carsList[i].carName}</span>
        </a>
      `;
    } else {
      activeBracketGroupNumber++;
      document.getElementById('bracket-main-group').innerHTML += `
        <div id="bracket-group-${activeBracketGroupNumber}" class="bracket-group">
          <div class="bracket-group-number">${activeBracketGroupNumber}</div>
          <a href="#bracket-group-${activeBracketGroupNumber}" id="car-${i}" class="bracket-group-car" onclick="selectWinner(${i})">
            <span class="bracket-item bracket-group-car-number">${carsList[i].carNumber} |</span>
            <span class="bracket-item">${carsList[i].carName}</span>
          </a>
        </div>
      `;
      document.getElementById('bracket-winner-group').innerHTML += `
        <div id="bracket-winner-${activeBracketGroupNumber}" class="bracket-winner"></div>
      `;
    }
  }
  changeTextSize(null);
}

function setBracketGroups(carIndex, activeBracketGroupNumber, setAmount) {
  for (let i = 0; i < setAmount; i++) {
    carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
    carIndex--;
  }
  return carIndex;
}

function selectWinner(winnerIndex) {
  let activeBracketGroupNumber = carsList[winnerIndex].bracketGroup;
  carsList[winnerIndex].bracketGroupStatus = 'winner';
  document.getElementById('car-' + winnerIndex).classList.remove('loser');
  document.getElementById('car-' + winnerIndex).classList.add('winner');
  for (let i = 0; i < carsList.length; i++) {
    if (carsList[i].bracketGroup === activeBracketGroupNumber && i !== winnerIndex) {
      carsList[i].bracketGroupStatus = 'run';
      document.getElementById('car-' + i).classList.remove('winner');
      document.getElementById('car-' + i).classList.add('loser');
    }
  }
  document.getElementById('bracket-winner-' + activeBracketGroupNumber).innerHTML = `
    <div id="bracket-winner-car-${winnerIndex}" class="bracket-winner-car">
      <span class="bracket-item bracket-winner-car-number">${carsList[winnerIndex].carNumber} |</span>
      <span class="bracket-item">${carsList[winnerIndex].carName}</span>
    </div>
  `;
  if (activeBracketGroupNumber === Math.ceil(carsList.length / 4)) {
    if (carsList.filter(car => car.bracketGroupStatus === 'winner').length !== 1) {
      document.getElementById('bracket-next-round').innerHTML = `
        <div class="clickable" onclick="proceedToNextRound()">Proceed to Round ${roundNumber + 1} ></div>
      `;
    } else {
      let placeNumber = resetNumber + 2 + (resetNumber + 2 === 2 ? 'nd' : resetNumber + 2 === 3 ? 'rd' : 'th');
      document.getElementById('bracket-next-round').innerHTML = `
        <div class="clickable" onclick="showResults()">Show Results ></div>
        <div class="clickable" onclick="resetRound()">Race for ${placeNumber} ></div>
      `;
    }
  }
  changeTextSize(null);
}

function proceedToNextRound() {
  document.getElementById('bracket-next-round').innerHTML = '';
  roundNumber++;
  carsList = carsList.filter(car => car.bracketGroupStatus === 'winner');
  initializeBracket();
}

function showResults() {
  let tempCarsList = carsList.filter(car => car.bracketGroupStatus === 'winner');
  if (winnersList.length === resetNumber) {
    winnersList.push(tempCarsList[0]);
  }
  document.getElementById('bracket-main-group').style.display = 'none';
  document.getElementById('bracket-winner-group').style.display = 'none';
  document.getElementById('bracket-next-round').style.display = 'none';
  document.getElementById('bracket-main-container').innerHTML += `
    <div id="bracket-results"></div>
  `;
  for (let i = 0; i < winnersList.length; i++) {
    let lastNum = (i + 1).toString()[(i + 1).toString().length - 1];
    document.getElementById('bracket-results').innerHTML += `
      <div class="results-group">
        <span class="bracket-item results-place">${
          lastNum === '1' ? i + 1 + 'st' : lastNum === '2' ? i + 1 + 'nd' : lastNum === '3' ? i + 1 + 'rd' : i + 1 + 'th'
        }:</span>
        <span class="bracket-item results-number">${winnersList[i].carNumber} |</span>
        <span class="bracket-item results-name">${winnersList[i].carName}</span>
      </div>
    `;
  }
  document.getElementById('bracket-return').innerHTML = `
    <div class="clickable" onclick="returnToBracket()">< Back to bracket</div>
  `;
  changeTextSize(null);
}

function returnToBracket() {
  document.getElementById('bracket-main-group').style.display = 'flex';
  document.getElementById('bracket-winner-group').style.display = 'flex';
  document.getElementById('bracket-next-round').style.display = 'flex';
  document.getElementById('bracket-results').remove();
  document.getElementById('bracket-return').innerHTML = '';
}

function resetRound() {
  carsList = carsList.filter(car => car.bracketGroupStatus === 'winner');
  let winnerIndex = carsListBackup.findIndex(car => car.carNumber === carsList[0].carNumber && car.carName === carsList[0].carName);
  carsListBackup.splice(winnerIndex, 1);
  carsList = [...carsListBackup];
  resetNumber++;
  roundNumber = 1;
  initializeBracket();
}

function randomize(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
