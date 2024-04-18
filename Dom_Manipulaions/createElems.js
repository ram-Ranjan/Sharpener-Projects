const headerDiv = document.getElementById('header');
const subHeading = document.createElement('h3');
subHeading.textContent = 'Buy high quality organic fruits online';
headerDiv.appendChild(subHeading);

subHeading.style.fontStyle = 'italic';

const secondDiv = document.querySelector('#basket-heading');
const fruitsList = secondDiv.querySelector('.fruits');
const totalFruitsP = document.createElement('p');
totalFruitsP.textContent = 'Total fruits: 4';

//  On this paragraph tag set an id of "fruits-total".
totalFruitsP.id = 'fruits-total';

secondDiv.insertBefore(totalFruitsP, fruitsList);