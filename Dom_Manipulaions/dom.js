

// Write your code below:
// const body = document.body;

// body.append("Hello World!!")

// const div =body.createElement("div")
// body.append(div)

// div.innerText="Hello There";

let mainHead= document.getElementById("main-heading");
mainHead.textContent="Fruit World"

mainHead.style.color="orange"

let head=document.getElementById("header");
head.style.backgroundColor="green"
head.style.borderBottom="solid 2px green"

let basketHead=document.getElementById("basket-heading");
basketHead.style.color="green"


//let newElem = `<div id="thanks"><p>Please visit us again</p><div>`
let thanks=document.getElementById("thanks");
thanks.innerHTML=`<p>Please visit us again</p>`;


