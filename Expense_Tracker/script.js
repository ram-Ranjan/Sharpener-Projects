// Get references to the necessary elements
const expenseForm = document.getElementById('form');
const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const descInput = document.getElementById('desc');
const balanceDisplay = document.getElementById('balance');
const historyList = document.getElementById('history');

// Initialize expenses array from localStorage or create a new empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Update the balance display
function updateBalance() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  balanceDisplay.textContent = total;
}

// Render the expense history
function renderHistory() {
  historyList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${expense.desc} - ${expense.category} - $${expense.amount}
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    historyList.appendChild(listItem);
  });
  updateBalance();
}

// Add a new expense
function addExpense(event) {
  event.preventDefault();
  const category = categorySelect.value;
  const amount = parseFloat(amountInput.value);
  const desc = descInput.value;

  if (category && amount && desc) {
    const newExpense = { category, amount, desc };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderHistory();
    expenseForm.reset();
  }
}

// Edit an expense
function editExpense(index) {
  const expense = expenses[index];
  categorySelect.value = expense.category;
  amountInput.value = expense.amount;
  descInput.value = expense.desc;

  // Remove the expense from the array
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderHistory();
}

// Delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderHistory();
}

// Event listeners
historyList.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const index = event.target.dataset.index;
    editExpense(index);
  } else if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    deleteExpense(index);
  }
});

// Render the expense history on page load
renderHistory();