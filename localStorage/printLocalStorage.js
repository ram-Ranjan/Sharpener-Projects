// Write your code below:

function handleFormSubmit(event){
    event.preventDefault();
  
    let myObj={
      "username":event.target.username.value,
      "email":event.target.email.value,
      "phone": event.target.phone.value
    };
    localStorage.setItem(event.target.email.value,JSON.stringify(myObj));
    
    let users=document.querySelector("#users");
    let li = document.createElement("li")
    users.appendChild(li)
    li.innerHTML=event.target.username.value+" - "+event.target.email.value+" - "+event.target.phone.value
    
    
  }
  
  
  