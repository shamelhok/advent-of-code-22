
const { test25, input25 } = require("./puzzleInputs");

function findSum(input){
    const lines= input.split('\n')
    let sum =0
    let parse={
        '-':-1,
        "=":-2,
        "1":1,
        "0":0,
        '2':2
    }
    for(const line of lines){
        let len = line.length
        let value=0
        for(let i=0;i<len;i++){
            const digit =parse[line[len-i-1]]
            const power = Math.pow(5,i)
            // console.log({digit,power});
            value += digit* power
        }
        sum+=value
    }
    return sum
}
function numToSanfu(num){
    let result =''
    let base5= num.toString(5)
    let carry =0
    for(let i=base5.length-1;i>=0; i--){
        let digit= parseInt(base5[i])+carry
        // console.log({base5,digit,carry});
        carry= digit>2?1:0
        switch( digit){
            case 3: result= '='+result; break;
            case 4: result= '-'+result; break;
            case 5: result= '0'+result; break;
            default: result= digit+result; break;
        }
    }
    return result
}
function solve(input){
    return numToSanfu(findSum(input))
}
// console.log({ans:findSum(test25)});
// console.log(numToSanfu(4890));
console.log({ans:solve(input25)});