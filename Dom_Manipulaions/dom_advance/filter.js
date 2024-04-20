const filter =document.getElementById("filter")
//console.log(filter)
filter.addEventListener('keyup', function(event){// keyup means key release
                                                //keypress used for chars only
   const textEntered = event.target.value.toLowerCase()
 //  console.log(textEntered)

   const fruitItems = document.getElementsByClassName('fruit')
   for(let i=0;i<fruitItems.length;i++)
   {
    const currentFruitText = fruitItems[i].firstChild.textContent.toLowerCase();
    if(currentFruitText.indexOf(textEntered) === -1)
    {
        fruitItems[i].style.display="none"
    }
    else{
        fruitItems[i].style.display="flex"
   }
}

});

// Add input element inside form, before button, to take fruit description


// Show the fruit description in italics on the next line


// Create a filter that shows only those fruits whose either name or description or both matches the entered text

// 1. Adding another input element inside form, before the button
const form = document.querySelector('form');
const button = form.querySelector('button');
const descriptionInput = document.createElement('input');
descriptionInput.type = 'text';
descriptionInput.id = 'description';
descriptionInput.placeholder = 'Enter fruit description';
form.insertBefore(descriptionInput, button);

// 2. Showing the fruit description (in italics) on the next line
const fruits = document.querySelectorAll('.fruit');
fruits.forEach(fruit => {
  const description = fruit.querySelector('.description');
  if (!description) {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('description');
    descriptionParagraph.style.fontStyle = 'italic';
    fruit.appendChild(descriptionParagraph);
  }
});

// 3. Creating a filter that shows only matching fruits
const filterInput = document.getElementById('filter');
filterInput.addEventListener('input', filterFruits);

function filterFruits() {
  const filterText = filterInput.value.toLowerCase();
  const fruitItems = document.querySelectorAll('.fruit');
  fruitItems.forEach(fruitItem => {
    const fruitName = fruitItem.textContent.toLowerCase().replace(/\s*x\s*$/, '');
    const description = fruitItem.querySelector('.description');
    const fruitDescription = description ? description.textContent.toLowerCase() : '';
    if (fruitName.includes(filterText) || fruitDescription.includes(filterText)) {
      fruitItem.style.display = 'list-item';
    } else {
      fruitItem.style.display = 'none';
    }
  });
}

// Adding event listener to the form for adding new fruits
const fruitInput = document.getElementById('fruit-to-add');
const descriptionInput = document.getElementById('description');
const fruitsList = document.querySelector('.fruits');
form.addEventListener('submit', addFruit);

function addFruit(e) {
  e.preventDefault();
  const fruitName = fruitInput.value.trim();
  const fruitDescription = descriptionInput.value.trim();
  if (fruitName) {
    const fruitItem = document.createElement('li');
    fruitItem.classList.add('fruit');
    fruitItem.textContent = fruitName;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => fruitItem.remove());
    fruitItem.appendChild(deleteButton);
    if (fruitDescription) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.classList.add('description');
      descriptionParagraph.style.fontStyle = 'italic';
      descriptionParagraph.textContent = fruitDescription;
      fruitItem.appendChild(descriptionParagraph);
    }
    fruitsList.appendChild(fruitItem);
    fruitInput.value = '';
    descriptionInput.value = '';
  }
}