const { test24, input24 } = require("./inputs20+");

class Blizzard{
    constructor(i,j,dir,width,height){
        this.i=i
        this.dir=dir
        this.j=j
        if(dir=='>'){
        this.move=()=>{
            this.j++
            if(this.j>width){this.j=1}
        }}
        if(dir=='^'){
        this.move=()=>{
            this.i--
            if(this.i<1){this.i=height}
        }}
        if(dir=='v'){
        this.move=()=>{
            this.i++
            if(this.i>height){this.i=1}
        }}
        if(dir=='<'){
        this.move=()=>{
            this.j--
            if(this.j<1){this.j=width}
        }}
    }
}
class Blizzards{
    blizzards=[]
    getCoords(){
        return this.blizzards.map(blizzard=>{
            return [blizzard.i,blizzard.j].toString()
        })
    }
    move(){
        this.blizzards.forEach(blizzard=>{blizzard.move()})
    }
}

function parseInput(input){
    let lines = input.split('\n')
    let height= lines.length-2
    let width = lines[0].length-2
    let blizzards = new Blizzards()
    let walls=[]
    for(let i=0;i<=height+1;i++){
        for (let j=0;j<=width+1;j++){
            if(lines[i][j]=='.'){
                continue
            }
            if(lines[i][j]=='#'){
                walls.push([i,j].toString())
                continue
            }
            blizzards.blizzards.push(new Blizzard(i,j,lines[i][j],width,height))
        }
    }
    return {blizzards,end:[height+1,width],height,width,walls}
}

function solve(input,limit=10000){
    let {blizzards,end,width,height,walls}= parseInput(input)
    let [i,j]=end
    let secondLast= [i-1,j].toString()
    let coords= new Set([[0,1]])
    let visited= new Set()
    visited.add([0,1].toString())
    let minutes=1
    while(!visited.has(secondLast)&& minutes<=limit){
        blizzards.move()
        let blizzCoords= blizzards.getCoords()
        let allNextCoords=new Set()
        for(const coord of coords){
            // console.log({coord});
            let nextCoords=[coord]
            let [i,j]= coord
            if(i>1){nextCoords.push([i-1,j])}
            if(i<height){nextCoords.push([i+1,j])}
            if(j>1){nextCoords.push([i,j-1])}
            if(j<width){nextCoords.push([i,j+1])}
            nextCoords= nextCoords.filter(newcoord=>{
                return !blizzCoords.includes(newcoord.toString())&& !walls.includes(newcoord.toString())
            })
            // console.log(nextCoords);
            nextCoords.forEach(nextCoord=>allNextCoords.add(nextCoord.toString()))
        }
        coords= new Set()
        for(const nextCoord of allNextCoords){
            coords.add(nextCoord.split(',').map(parseFloat))
        }
        coords.forEach(coord=>visited.add(coord.toString()))
        console.log(visited);
        minutes++
    }
    return minutes
}

// console.log(solve(input24))

function solve2(input,limit=10000){
    let {blizzards,end,width,height,walls}= parseInput(input)
    let [i,j]=end
    let secondLast= [i-1,j].toString()
    let coords= new Set([[0,1]])
    let visited= new Set()
    visited.add([0,1].toString())
    let minutes=0
    while(!visited.has(secondLast)&& minutes<=limit){
        blizzards.move()
        let blizzCoords= blizzards.getCoords()
        let allNextCoords=new Set()
        for(const coord of coords){
            // console.log({coord});
            let nextCoords=[coord]
            let [i,j]= coord
            if(i>1){nextCoords.push([i-1,j])}
            if(i<height){nextCoords.push([i+1,j])}
            if(j>1){nextCoords.push([i,j-1])}
            if(j<width){nextCoords.push([i,j+1])}
            nextCoords= nextCoords.filter(newcoord=>{
                return !blizzCoords.includes(newcoord.toString())&& !walls.includes(newcoord.toString())
            })
            // console.log(nextCoords);
            nextCoords.forEach(nextCoord=>allNextCoords.add(nextCoord.toString()))
        }
        coords= new Set()
        for(const nextCoord of allNextCoords){
            coords.add(nextCoord.split(',').map(parseFloat))
        }
        coords.forEach(coord=>visited.add(coord.toString()))
        console.log(visited);
        minutes++
    }
    minutes++
    blizzards.move()
    coords= new Set([end])
    visited= new Set()
    while(!visited.has([1,1].toString())&& minutes<=limit){
        blizzards.move()
        let blizzCoords= blizzards.getCoords()
        let allNextCoords=new Set()
        for(const coord of coords){
            // console.log({coord});
            let nextCoords=[coord]
            let [i,j]= coord
            if(i>1){nextCoords.push([i-1,j])}
            if(i<height){nextCoords.push([i+1,j])}
            if(j>1){nextCoords.push([i,j-1])}
            if(j<width){nextCoords.push([i,j+1])}
            nextCoords= nextCoords.filter(newcoord=>{
                return !blizzCoords.includes(newcoord.toString())&& !walls.includes(newcoord.toString())
            })
            // console.log(nextCoords);
            nextCoords.forEach(nextCoord=>allNextCoords.add(nextCoord.toString()))
        }
        coords= new Set()
        for(const nextCoord of allNextCoords){
            coords.add(nextCoord.split(',').map(parseFloat))
        }
        coords.forEach(coord=>visited.add(coord.toString()))
        console.log(visited);
        minutes++
    }
    minutes++
    blizzards.move()
    coords= new Set([[0,1]])
    visited= new Set()
    while(!visited.has(secondLast)&& minutes<=limit){
        blizzards.move()
        let blizzCoords= blizzards.getCoords()
        let allNextCoords=new Set()
        for(const coord of coords){
            // console.log({coord});
            let nextCoords=[coord]
            let [i,j]= coord
            if(i>1){nextCoords.push([i-1,j])}
            if(i<height){nextCoords.push([i+1,j])}
            if(j>1){nextCoords.push([i,j-1])}
            if(j<width){nextCoords.push([i,j+1])}
            nextCoords= nextCoords.filter(newcoord=>{
                return !blizzCoords.includes(newcoord.toString())&& !walls.includes(newcoord.toString())
            })
            // console.log(nextCoords);
            nextCoords.forEach(nextCoord=>allNextCoords.add(nextCoord.toString()))
        }
        coords= new Set()
        for(const nextCoord of allNextCoords){
            coords.add(nextCoord.split(',').map(parseFloat))
        }
        coords.forEach(coord=>visited.add(coord.toString()))
        console.log(visited);
        minutes++
    }
    minutes++
    return minutes
}

// console.log(solve2(input24));