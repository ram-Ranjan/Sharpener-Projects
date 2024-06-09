function handleFormData(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    fetch('/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
    .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error('Error submitting the form');
        }
      })
      .then((data) => displayUserOnScreen(data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
  }
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement('li');
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    userItem.appendChild(deleteBtn);
    const editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    userItem.appendChild(editBtn);
    const userList = document.querySelector('ul');
    userList.appendChild(userItem);
    deleteBtn.addEventListener('click', function (event) {
      fetch(`/appointments/${userDetails.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          userList.removeChild(event.target.parentElement);
        })
        .catch((error) => console.log(error));
    });
    editBtn.addEventListener('click', function (event) {
      userList.removeChild(event.target.parentElement);
      document.getElementById('username').value = userDetails.username;
      document.getElementById('email').value = userDetails.email;
      document.getElementById('phone').value = userDetails.phone;
    });
  }