

localStorage.setItem("pressure",80)
//localStorage.removeItem("pressure")


sessionStorage.setItem('Name','Ranjan')
//sessionStorage.removeItem('Name')
//Diffrent from session in general which is stored in server like database or cache
//they have more memory and have greater accessibility

document.cookie="Name=Anu;expires="+ new Date(9999,1,5).getUTCDate();