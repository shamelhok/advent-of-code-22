const { test23, input23 } = require("./inputs20+");

const smallTest=`.....
..##.
.#...
....#
.....
..#..`

function getElves(input){
    let lines= input.split('\n')
    let elves=[]
    lines.forEach((str,i)=>{
        for(let j=0;j<str.length;j++){
            if(lines[i][j]=='#'){
                elves.push([i,j])
            }
        }
    })
    return elves
}

function rotateArray(array){  
    array.push(array[0])
    array.splice(0,1)
}

function solve(input,rounds=10){
    const elves= getElves(input)
    let currentCoords=elves.map(([i,j])=>i+','+j)
    let directionArray= ['n','s','w','e']
    function elfAtCoord(coord){return currentCoords.includes(coord)}
    function nextRound(){
        let nextCoords=[]
        // console.log(directionArray);
        elves.forEach((elf,index)=>{
            let [i,j]=elf
            let n= (i-1)+','+j
            let NE= (i-1)+','+(j+1)
            let NW= (i-1)+','+(j-1)
            let e= (i)+','+(j+1)
            let s= (i+1)+','+j
            let SE= (i+1)+','+(j+1)
            let SW= (i+1)+','+(j-1)
            let w= (i)+','+(j-1)
            let coord={n,e,s,w}
            let next={}
            next.n = !(elfAtCoord(NE)||elfAtCoord(n)||elfAtCoord(NW))
            next.s = !(elfAtCoord(SE)||elfAtCoord(s)||elfAtCoord(SW))
            next.e = !(elfAtCoord(NE)||elfAtCoord(e)||elfAtCoord(SE))
            next.w = !(elfAtCoord(SW)||elfAtCoord(w)||elfAtCoord(NW))
            if(next.n&&next.s&&next.e&&next.w){
                nextCoords.push([i,j].toString())
            }else if(!next.n&&!next.s&&!next.e&&!next.w){
                nextCoords.push([i,j].toString())
            }else{
                for( const dir of directionArray){
                    if(next[dir]){
                        nextCoords.push(coord[dir])
                        break
                    }
                }
            }
        })
        // console.log({currentCoords ,nextCoords});
        let repeated=[]
        nextCoords.forEach((coord,i)=>{
            if(nextCoords.indexOf(coord)!=i){
                nextCoords[i]=currentCoords[i]
                repeated.push(nextCoords.indexOf(coord))
            }
        })
        repeated.forEach(repeatedIndex=>{
            nextCoords[repeatedIndex]= currentCoords[repeatedIndex]
        })
        let noneMoved=true
        for(let i=0;i<currentCoords.length;i++){
            if(currentCoords[i]!==nextCoords[i]){
                noneMoved=false
                break
            }
        }
        currentCoords= nextCoords
        nextCoords.forEach((str,elfIndex)=>{
            elves[elfIndex]=str.split(',').map(string=>parseFloat(string))
        })
        rotateArray(directionArray)
        return noneMoved
    }
    let minRounds=0
    for(let round=0;round<rounds;round++){
        console.log(round);
        if(nextRound()){
            minRounds= round+1
            break
        }
        console.log(currentCoords);
    }
    let left = Math.min(...elves.map(([i,j])=>j))
    let right = Math.max(...elves.map(([i,j])=>j))
    let top = Math.min(...elves.map(([i,j])=>i))
    let bottom = Math.max(...elves.map(([i,j])=>i))
    let area = (1+bottom-top)*(1+right-left)
    console.log({currentCoords,left,top});
    return {soil:area- elves.length,minRounds}
}

let x= (solve(input23,1000))

console.log(x);


