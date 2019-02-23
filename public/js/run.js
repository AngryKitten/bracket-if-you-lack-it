let bracketNameList = [];
let bracketName;
let carsList = [];

(function() {
  initalizeBracketNameList();
})();

function initalizeBracketNameList() {
  if (localStorage.getItem('bracketNameList') === null) {
    document.getElementById('bracket-name-list').innerHTML = 'No brackets exist to edit';
  } else {
    bracketNameList = JSON.parse(localStorage.getItem('bracketNameList'));
    document.getElementById('bracket-header-name').innerHTML = '';
    document.getElementById('bracket-name-list').innerHTML = '';
    document.getElementById('bracket-main-container').innerHTML = '';
    bracketNameList.map(bracketName => {
      document.getElementById('bracket-name-list').innerHTML += `
        <div><span onclick="selectBracket('${bracketName}')">${bracketName}</span></div>
      `;
    });
  }
}

function selectBracket(bracketEditName) {
  bracketName = bracketEditName;
  document.getElementById('bracket-header-name').innerHTML = bracketName;
  carsList = JSON.parse(localStorage.getItem(bracketName));
  document.getElementById('bracket-name-list').innerHTML = `
    <div><span onclick="initalizeBracketNameList()">< Back to bracket list</span></div>
  `;
  if (carsList[0].bracketGroup === null) {
    initializeUninitializedBracket();
    initalizeBracketGroupsDisplay();
  } else {

  }
}

function initializeUninitializedBracket() { // Please rewrite this atrocity.
  randomize(carsList);
  let carIndex = carsList.length;
  let activeBracketGroupNumber = 1;
  let extraCarsAmount = carsList.length % 4;
  while (carIndex !== 0) {
    if (extraCarsAmount === 0 || carIndex > 9) {
      carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
      carIndex--;
      carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
      carIndex--;
      carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
      carIndex--;
      carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
      carIndex--;
      activeBracketGroupNumber++;
    } else {
      if (extraCarsAmount === 1) {
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
      } else if (extraCarsAmount === 2) {
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
      } else {
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        carsList[carIndex - 1].bracketGroup = activeBracketGroupNumber;
        carIndex--;
        activeBracketGroupNumber++;
      }
    }
  }
}

function initalizeBracketGroupsDisplay() {
  let activeBracketGroupNumber = 0;
  carsList.reverse();
  for (let i = 0; i < carsList.length; i++) {
    if (carsList[i].bracketGroup === activeBracketGroupNumber) {
      document.getElementById('bracket-group-' + activeBracketGroupNumber).innerHTML += `
        <div id="car-${i}" onclick="selectWinner(${i})">${carsList[i].carNumber} | ${carsList[i].carName}</div>
      `;
    } else {
      activeBracketGroupNumber++;
      document.getElementById('bracket-main-container').innerHTML += `
        <div id="bracket-group-${activeBracketGroupNumber}">
          <div id="bracket-group-number">${activeBracketGroupNumber}</div>
          <div id="car-${i}" onclick="selectWinner(${i})">${carsList[i].carNumber} | ${carsList[i].carName}</div>
        </div>
      `;
    }
  }
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
