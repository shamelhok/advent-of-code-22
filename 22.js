const { input22, test22 } = require("./inputs20+");

function getMap(input){
    return input.split('\n').slice(0,-2)
}
function getPath(input){
    let str= input.split('\n\n')[1]
    let arr=[]
    let nums=str.match(/\d+/g).map(num=>parseInt(num))
    let dirs=str.match(/[rRlL]/g)
    let len = dirs.length
    for(let i =0;i<len;i++){
        arr.push(nums[i])
        arr.push(dirs[i])
    }
    arr.push(nums[len])
    return arr
}
// Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^).
function nextCoords(location,instruction,map){
    // console.log(instruction);
    if(instruction=='R'){
        location.facing=(location.facing+5)%4
        return location
    }
    if(instruction=='L'){
        location.facing=(location.facing+3)%4
        return location
    }
    let {i,j,facing}= location
    // const next={i,j,facing}
    let move;
    let dir='>'
    if(facing==0){
        move=()=>{j++
            if(!['.','#','>','<','V','^'].includes(map[i][j])){
                j=0
            }
            while(!['.','#','>','<','V','^'].includes(map[i][j])){
                j++
            }
        }
    }
    if(facing==1){
        dir='V'
        move=()=>{
            i++
            if(i>=map.length||!['.','#','>','<','V','^'].includes(map[i][j])){
                i=0
            }
            while(!['.','#','>','<','V','^'].includes(map[i][j])){
                i++
            }
        }
    }
    
    if(facing==2){
        dir='<'
        move=()=>{j--
            if(!['.','#','>','<','V','^'].includes(map[i][j])){
                j=map[i].length
            }
            while(!['.','#','>','<','V','^'].includes(map[i][j])){
                j--
            }}
    }
    if(facing==3){
        dir='^'
        move=()=>{i--
            if(i<0||!['.','#','>','<','V','^'].includes(map[i][j])){
                i=map.length-1
            }
            while(!['.','#','>','<','V','^'].includes(map[i][j])){
                i--
            }}
    }
    while(
        instruction>0
        ){
            move()
            if(map[i][j]=='#'){break}
                // console.log(location);
            location.i=i
            location.j=j  
            map[i]=map[i].slice(0,j)+dir+map[i].slice(j+1)
            instruction--
    }
    return location
}
function solve(input){
    let map = getMap(input)
    let path= getPath(input)
    let len=path.length 
    let j=map[0].indexOf('.')
    let i=0,facing=0
    let location={i,j,facing}
    for(let index=0;index<len;index++){
        nextCoords(location,path[index],map)
    }
    let row = location.i+1
    let column = location.j+1
    console.log(location);
    // console.log(map)
    return 1000*row+4*column+location.facing
}

class Cube {
    constructor(input){
        let map = getMap(input)
        let chars= input.split('').filter(char=>char=='.'||char=='#')
        let sideLength=Math.sqrt(chars.length/6)
        let start= Math.min(input.indexOf('.'),input.indexOf('#'))
        let front = [],back=[],right=[],left=[],bottom=[]
        let top= new Array(50).fill([''])
        for(let i=0;i<sideLength;i++){
            front.push(map[i].slice(start,sideLength+start))
            right.push(map[i].slice(sideLength+start))
            bottom.push(map[i+sideLength].slice(start,sideLength+start))
            back.push(map[i+2*sideLength].slice(start,sideLength+start))
            left.push(map[3*sideLength-i-1].slice(0,sideLength).split('').reverse().join(''))
            for(let j=0;j<sideLength;j++){
                top[i]+=map[3*sideLength+j][sideLength-i-1]
            }
        }
        this.front = front
        this.back=back
        this.right=right
        this.left=left
        this.bottom=bottom
        this.face='front'
        this.facing=0
        this.i=0
        this.j=0
        this.sideLength=sideLength
    }
    rotateR(){
        this.facing=(this.facing+1)%4
    }
    rotateL(){
        this.facing=(this.facing+3)%4
    }
    getFacing(){
        switch(this.face){
            case 'front':
                return this.facing;
            case 'right':
                return this.facing;
            case 'bottom':
                return this.facing;
            case 'back':
                return this.facing;
            case 'left':
                return this.facing+2%4;
            case 'top':
                return this.facing+3%4;
            
        }
    }
    move(instruction){
        if(instruction=='R'){return this.rotateR()}
        if(instruction=='L'){return this.rotateL()}
        while(instruction>0){
            if(!this.move1()){break}
            instruction--
        }
    }
    move1(){
        let i=this.i
        let j= this.j
        switch(this.facing){
            case 0:j++;break
            case 1:i++;break
            case 2: j--;break
            case 3:i--;break
        }
        if(this[this.face][i]){
            if(this[this.face][i][j]=='.'){
                this.i=i
                this.j=j
                console.log({j,updated:this.j});
                return true
            }
            if(this[this.face][i][j]=='#'){
                return false
            }
        }

    }
}

function solve2(input){
    let cube = new Cube(input)
    let path= getPath(input)
    let len=path.length 
    // console.log(cube.getFacing());
    cube.move(100)
    let { i,j,facing,face}=cube
    console.log({i,j,face,facing});
    // let i=0,j=0,facing=0,dir=0
    // dir 5,6 = z axis right,left
    let location={face,i,j,facing}
    // for(let index=0;index<len;index++){
    //     cube.move()
    // }
    let row = location.i+1
    let column = location.j+1
    console.log(location);
    // console.log(map)
    return 1000*row+4*column+location.facing
}


// let x= solve(input22)
// console.log(x);

let y = solve2(input22)
console.log(y);

