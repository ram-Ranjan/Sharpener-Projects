document.addEventListener('DOMContentLoaded', function() {
  loadAppointments();
});

function handleFormData(event) {
  event.preventDefault();
  const form = event.target;
  const appointId = form.appointId.value;
  const userDetails = {
      username: form.username.value,
      email: form.email.value,
      phone: form.phone.value,
  };

  if (appointId) {
      updateAppointment(appointId, userDetails);
  } else {
      createAppointment(userDetails);
  }
}

function createAppointment(userDetails) {
  axios.post('/appointments', userDetails)
      .then(response => {
          displayUserOnScreen(response.data);
          clearForm();
      })
      .catch(error => {
          console.error('Error creating appointment:', error);
          alert('Failed to create appointment: ' + error.response.data.error);
      });
}

function updateAppointment(appointId, userDetails) {
  console.log('Updating appointment:', appointId, userDetails);
  axios.put(`/appointments/${appointId}`, userDetails)
      .then(response => {
        console.log('Update response:', response.data);
          const updatedAppointment = response.data;
          const listItem = document.querySelector(`li[data-id="${appointId}"]`);
          if (listItem) {
              listItem.innerHTML = createAppointmentHTML(updatedAppointment);
          }
          clearForm();
      })
      .catch(error => {
        console.error('Error updating appointment:', error.response);
          console.error('Error updating appointment:', error);
          alert('Failed to update appointment: ' + error.response.data.error);
      });
}

function loadAppointments() {
  axios.get('/appointments')
      .then(response => {
          const appointments = response.data;
          const appointmentList = document.getElementById('appointmentList');
          appointmentList.innerHTML = '';
          appointments.forEach(appointment => {
              displayUserOnScreen(appointment);
          });
      })
      .catch(error => {
          console.error('Error loading appointments:', error);
          alert('Failed to load appointments: ' + error.response.data.error);
      });
}
 
function displayUserOnScreen(appointment) {
  const appointmentList = document.getElementById('appointmentList');
  const listItem = document.createElement('li');
  listItem.setAttribute('data-id', appointment.id);//data-id is set explicitly by the appointmentId
  listItem.innerHTML = createAppointmentHTML(appointment);
  appointmentList.appendChild(listItem);
}

function createAppointmentHTML(appointment) {
  return `
      ${appointment.username} - ${appointment.email} - ${appointment.phone}
      <button onclick="editAppointment(${appointment.id})">Edit</button>
      <button onclick="deleteAppointment(${appointment.id})">Delete</button>
  `;
}

function editAppointment(appointId) {
  axios.get(`/appointments/${appointId}`)
      .then(response => {
          const appointment = response.data;
          document.getElementById('appointId').value = appointment.id;
          document.getElementById('username').value = appointment.username;
          document.getElementById('email').value = appointment.email;
          document.getElementById('phone').value = appointment.phone;
          document.getElementById('submitBtn').textContent = 'Update';
      })
      .catch(error => {
          console.error('Error fetching appointment for edit:', error);
          alert('Failed to fetch appointment details: ' + error.response.data.error);
      });
}

function deleteAppointment(appointId) {
  if (confirm('Are you sure you want to delete this appointment?')) {
      axios.delete(`/appointments/${appointId}`)
          .then(() => {
              const listItem = document.querySelector(`li[data-id="${appointId}"]`);
              if (listItem) {
                  listItem.remove();
              }
          })
          .catch(error => {
              console.error('Error deleting appointment:', error);
              alert('Failed to delete appointment: ' + error.response.data.error);
          });
  }
}

function clearForm() {
  document.getElementById('appointmentForm').reset();
  document.getElementById('appointId').value = '';
  document.getElementById('submitBtn').textContent = 'Submit';
}