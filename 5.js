const {input5}= require('./puzzleInputs')
const [startingStr,movesStr] = input5.split('\n\n')
const moves = movesStr.split('\n')

const inputStacks=['','ZPMHR',
'PCJB',
'SNHGLCD',
'FTMDQSRL',
'FSPQBTZM',
'TFSZBG',
'NRV',
'PGLTDVCM',
'WQNJFML']
const startAsArrays= inputStacks.map(x=>x.split(''))
function topOfStacks(stacks,moves){
    for (const step of moves){
        const arr= step.split(' ')
        const move =parseInt(arr[1])
        const from =parseInt(arr[3])
        const to =parseInt(arr[5])
        for(let i =0;i<move;i++){
            stacks[to].push(stacks[from].pop())
        }
    }

    return stacks.map(x=>{
        try{return x[x.length-1]

        }catch{
            return x
        }
    })
}
function version2TopOfStacks(stacks,moves){
    for (const step of moves){
        const arr= step.split(' ')
        const move =parseInt(arr[1])
        const from =parseInt(arr[3])
        const to =parseInt(arr[5])
        const stackFrom= stacks[from]
        console.log({stackFrom});
        const moving=stackFrom.splice(stackFrom.length- move)
        console.log({arr,moving,stackFrom});
        stacks[to].push(...moving)
        console.log({stacks});
    }

    return stacks.map(x=>{
        try{return x[x.length-1]

        }catch{
            return x
        }
    })
}
const testMoves =`move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`.split('\n')
const testStart= ['','ZN','MCD','P'].map(x=>x.split(''))
// console.log(topOfStacks(startAsArrays,moves));
console.log(version2TopOfStacks(startAsArrays,moves));
// console.log(version2TopOfStacks(testStart,testMoves));