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
    document.getElementById('cars-edit-list').innerHTML = '';
    document.getElementById('cars-form-container').innerHTML = '';
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
  document.getElementById('cars-edit-list').innerHTML += `
    <div><input type="text" id="bracket-name" placeholder="Bracket Name" value="${bracketName}"></div>
  `;
  buildCarsList();
  document.getElementById('cars-form-container').innerHTML = `
    <form id="cars-form">
      <input type="text" id="car-number" placeholder="Car Number">
      <input type="text" id="car-name" placeholder="Name">
      <input type="submit" value="Add"></input>
    </form>
    <button id="save-cars-list" onclick="saveBracket()">Save Bracket</button>
  `;
  initalizeCarsFormEventListener();
}

function buildCarsList() {
  document.getElementById('cars-edit-list').innerHTML = '';
  for (let i = 0; i < carsList.length; i++) {
    document.getElementById('cars-edit-list').innerHTML += `
      <div id="car-${i}">
        <input type="text" id="${carsList[i].carNumber}" placeholder="Car Number" value="${carsList[i].carNumber}">
        <input type="text" id="${carsList[i].carName}" placeholder="Name" value="${carsList[i].carName}">
        <button onclick="deleteCar(${i})">Delete</button>
      </div>
    `;
  }
}

function initalizeCarsFormEventListener() {
  document.getElementById('cars-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let carNumber = document.getElementById('car-number').value;
    let carName = document.getElementById('car-name').value;
    if (carNumber !== '' && carName !== '') {
      carsList.push({
        carNumber,
        carName,
        bracketGroup: null,
        bracketGroupStatus: null
      });
      document.getElementById('cars-edit-list').innerHTML += `
        <div id="car-${carsList.length - 1}">
          <input type="text" id="${carsList[carsList.length - 1].carNumber}" placeholder="Car Number" value="${carsList[carsList.length - 1].carNumber}">
          <input type="text" id="${carsList[carsList.length - 1].carName}" placeholder="Name" value="${carsList[carsList.length - 1].carName}">
          <button onclick="deleteCar(${carsList.length - 1})">Delete</button>
        </div>
      `;
      document.getElementById('car-number').value = '';
      document.getElementById('car-name').value = '';
      document.getElementById('car-number').focus();
    }
  });
}

function deleteCar(carIndex) {
  carsList.splice(carIndex, 1);
  buildCarsList();
}

function saveBracket() {
  localStorage.setItem(bracketName, JSON.stringify(carsList));
  window.location.href = 'index.html';
}
