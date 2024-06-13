const expenseForm = document.getElementById('form');
const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const descInput = document.querySelector('input[name="desc"]');
const balanceDisplay = document.getElementById('balance');
const historyList = document.getElementById('history');

let expenses = [];
let editMode = false;
let editId = null;
let isSubmitting=false;

document.addEventListener('DOMContentLoaded', fetchExpenses); // Ensure fetchExpenses is called when the DOM is fully loaded
expenseForm.addEventListener('submit', addOrEditExpense);


// Fetch and display expenses from the server
function fetchExpenses() {
  axios.get('http://localhost:3000/api/expenses')
    .then((response) => {
      expenses = response.data;
      renderHistory(expenses);
      updateBalance(expenses);
    })
    .catch(err => console.log(err));
}

// Update the balance display
function updateBalance(expenses) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  balanceDisplay.textContent = total;
}

// Render the history list
function renderHistory(expenses) {
  historyList.innerHTML = '';
  expenses.forEach((expense) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${expense.desc} - ${expense.category} - Rs${expense.amount}
      <button class="edit-btn" data-id="${expense.id}">Edit</button>
      <button class="delete-btn" data-id="${expense.id}">Delete</button>
    `;
    historyList.appendChild(listItem);
  });
}

// Add or edit an expense
function addOrEditExpense(event) {
  event.preventDefault();
  if(isSubmitting)return;
  isSubmitting=true;
  console.log("Form Submitted"); // Debug log to check how many times this is triggered
  const category = categorySelect.value;
  const amount = parseFloat(amountInput.value);
  const desc = descInput.value;
  const newExpense = { category, amount, desc };

  if (editMode) {
    // Edit mode
    axios.put(`http://localhost:3000/api/expenses/${editId}`, newExpense)
      .then(() => {
        fetchExpenses();
        expenseForm.reset();
        editMode = false;
        editId = null;
        isSubmitting=false;
      })
      .catch(err => {
        console.log(err)
        isSubmitting=false;
      })
  } else {
    // Add mode
    axios.post('http://localhost:3000/api/expenses', newExpense)
      .then(() => {
        fetchExpenses();
        expenseForm.reset();
        isSubmitting=false;

      })
      .catch(err => {
        console.log(err)
        isSubmitting=false;
      })  }
}

// Edit an existing expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === parseInt(id));
  categorySelect.value = expense.category;
  amountInput.value = expense.amount;
  descInput.value = expense.desc;
  editMode = true;
  editId = id;
}

// Delete an expense
function deleteExpense(id) {
  axios.delete(`http://localhost:3000/api/expenses/${id}`)
    .then(() => fetchExpenses())
    .catch(err => console.log(err));
}

// Event delegation for edit and delete buttons
historyList.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (event.target.classList.contains('edit-btn')) {
    editExpense(id);
  } else if (event.target.classList.contains('delete-btn')) {
    deleteExpense(id);
  }
});

