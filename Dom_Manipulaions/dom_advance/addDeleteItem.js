
// 1. In each "li" after the delete button add an edit button with class 'edit-btn'. Once you do this the output on the screen will look like this:



// 2. Now, implement the add and delete functionality just the way it is done in the video. There is only one difference that now the new 'li' element that you will create will have two buttons (delete and edit) instead of one button.



// Note:

// You have to just add the edit button. You do not have to implement the edit functionality.
// Do not touch the html file.
// To listen for form submission event use addEventListener.

let form = document.querySelector("form");


let fruitList=document.querySelector(".fruits");


form.addEventListener('submit',function(event){

    event.preventDefault();
    const fruitToAdd=document.getElementById("fruit-to-add");

//Creating the new List
    let newLi = document.createElement("li");
    // const newLiText = document.createTextNode(fruitToAdd.value);
    // newLi.appendChild(newLiText)
    // newLi.className="fruit"
    // const dltButton = document.createElement("button")
    // dltButton.className=`delete-btn`
    // const dltText=document.createTextNode(`X`);
    // dltButton.appendChild(dltText)
    // newLi.appendChild(dltButton)

//Adding new Li as last element of ul
    newLi.innerHTML=fruitToAdd.value +`<button class='delete-btn'>X</button> `
    fruitList.appendChild(newLi)   
})

fruitList.addEventListener("click",function(event){

    if(event.target.classList.contains("delete-btn"))
    {
       const  fruitToDelete = event.target.parentElement;
       fruitList.removeChild(fruitToDelete)
    }

})




function addEditButton(){

    let fruits=document.querySelectorAll(".fruit");
    
    
    for(let i=0;i<fruits.length;i++)
    {
        let editBtn=document.createElement("button");
        editBtn.className="edit-btn";
        let editText = document.createTextNode(`Edit`)
        editBtn.appendChild(editText)
        fruits[i].appendChild(editBtn)
    }

}

addEditButton()

