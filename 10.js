const { input10, test10 } = require("./puzzleInputs")

let smalltest=`noop
addx 3
addx -5`

function execute(input){
    let current =1
    let x=1
    let signal=0
    function cycle(){
        
        if((current-20)%40===0){
            signal+= x*current
        }
        current++
    }
    
    let lines = input.split('\n')
    for(let line of lines){
        if(line==='noop'){
            cycle()
        } else{
            let value = parseInt(line.split(' ')[1])
            cycle()
            cycle()
            x+=value
        }
    }
    return signal
}

// console.log(execute(input10))
function draw(input){
    let current =0
    let x=1
    let image=''
    function cycle(){
        if(current%40===0) image+='\n'
        if(current%40<x+2&& current%40>x-2){
            image+='#'
        }else image+='.'
        current++
    }
    
    let lines = input.split('\n')
    for(let line of lines){
        if(line==='noop'){
            cycle()
        } else{
            let value = parseInt(line.split(' ')[1])
            cycle()
            cycle()
            x+=value
        }
    }
    console.log(image);
}
draw(input10)