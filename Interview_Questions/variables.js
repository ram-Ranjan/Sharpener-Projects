// function x(){

//     let a = 10;
    
//     function y(){
    
//     console.log(a);
    
//     }
    
//     y()
    
//     }
    
    
    
//     x();


// let rows = arr.length
// let cols = arr[0].length

// let max = Number.MIN_SAFE_INTEGER
// for (let i = 0; i < rows; i++)
// {
//     for (let j = 0; j < cols; j++)
//     {
//         if (arr[i][j] > max)
//         {
//             max=arr[i][j]
//         }

//     }
// }
// return max;


// let arr=[9,5,3,2,1]

// let res=[]

// for(let  i=0;i<arr.length;i++){
//     let count=0
//     for(let j=0;j<arr.length;j++){
//         if(arr[j]>arr[i])
//         {
//             count++
//         }
        

//     }
//     res.push(count)
// }
// return res

let rule1 = true;
for (let i = 0; i < word.length; i++) {
    if (!(word[i] >= 'A' && word[i] <= 'Z')) {
        rule1 = false;
        break;
    }
}

let rule2 = true;
for (let i = 0; i < word.length; i++) {
    if (!(word[i] >= 'a' && word[i] <= 'z')) {
        rule2 = false;
        break;
    }
}

let rule3 = word[0] >= 'A' && word[0] <= 'Z';
for (let i = 1; i < word.length; i++) {
    if (word[i] >= 'A' && word[i] <= 'Z') {
        rule3 = false;
        break;
    }
}

return rule1 || rule2 || rule3;
