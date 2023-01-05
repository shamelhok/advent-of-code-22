const { test13 } = require("./puzzleInputs");

function solution(input){
    const pairsAsString = input.split('\n\n')
    const pairs= pairsAsString.map(str=>str.split('\n'))
    let sum =0
    pairs.forEach((pair,index)=>{
        // console.log(pair);
        if( pairInRightOrder(pair)){
            sum+= index
        }
    })
    return sum
}
function pairInRightOrder(pair){
    const [left, right]= pair.map(data=>{
        // return data.split(/[\[,\]]/)
        return data.match(/\d/g)||data
    })
    // console.log({left});
    try{
        left.forEach((value,i)=>{
        if(parseInt(value)< parseInt(right[i])) return true
        if(parseInt(value)> parseInt(right[i])) return false
    })}catch{
        if(parseInt(left)< parseInt(right)) return true
        if(parseInt(left)> parseInt(right)) return false
    }

}

console.log(solution(test13));
console.log(pairInRightOrder(['1','2']));
if([]){
    console.log('truthy');
}else{
    console.log('falsy');
}