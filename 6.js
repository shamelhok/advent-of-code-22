const {input6}= require('./puzzleInputs')

function firstMarker(input){
    let len= input.length
    let current=input.slice(0,4)
    for (let i=4;i<len;i++){
        current= current.slice(1)
        current+=input[i]
        let set = new Set(current)
        if (set.size===4){
            return i
        }
    }
}
function firstMessage(input){
    let len= input.length
    let current=input.slice(0,14)
    for (let i=4;i<len;i++){
        current= current.slice(1)
        current+=input[i]
        let set = new Set(current)
        if (set.size===14){
            return i
        }
    }
}
console.log(firstMarker(input6));
console.log(firstMessage(input6));