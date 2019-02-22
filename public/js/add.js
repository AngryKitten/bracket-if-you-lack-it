let carsList = [];

document.getElementById('cars-form').addEventListener('submit', (event) => {
  event.preventDefault();
  let carNumber = document.getElementById('car-number').value;
  let carName = document.getElementById('car-name').value;
  if (carNumber !== '' && carName !== '') {
    carsList.push({ carNumber, carName });
    document.getElementById('cars-list').innerHTML += `
      <div>${carNumber} | ${carName}</div>
    `;
    document.getElementById('car-number').value = '';
    document.getElementById('car-name').value = '';
  }
});

document.getElementById('save-cars-list').addEventListener('click', () => {
  let bracketName = document.getElementById('bracket-name').value;
  if (bracketName !== '') {
    if (localStorage.getItem(bracketName) === null) {
      localStorage.setItem(bracketName, JSON.stringify(carsList));
      window.location.href = '../';
    } else {
      alert('Bracket name cannot be the same as existing bracket.');
    }
  } else {
    alert('Bracket name is required.');
  }
});
