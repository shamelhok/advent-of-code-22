const { input12, test12 } = require("./puzzleInputs");

function splitLines(input){
    return input.split('\n')
}

exports.splitLines=splitLines

function solution(input){
    let lines = splitLines(input)
    let height= lines.length
    let width= lines[0].length
    let start;
    let end;
    // console.log({lines});
    for(let i=0; i<height;i++){
        for(let j=0;j<width;j++){
            if(lines[i][j]=='S'){
                start= i+' '+j
                lines[i]=lines[i].slice(0,j)+'a'+lines[i].slice(j+1)
            }
            if(lines[i][j]=='E'){
                end=i+' '+j
                lines[i]=lines[i].slice(0,j)+'z'+lines[i].slice(j+1)
            }
        }
    }
    // console.log({lines});
    // console.log({start,end});
    let steps=0
    let visited = new Set([start])
    function nextStep(){
        steps ++
        let viable=[]
        for(const square of visited){
            let [i,j] = square.split(' ')
            i=parseInt(i)
            j=parseInt(j)
            let value= lines[i].charCodeAt(j)
            try{
            if(lines[i].charCodeAt(j+1)<=value+1){
                let x= j+1
                viable.push(i+' '+x)
            }
        }catch{}
            try{
            if(lines[i].charCodeAt(j-1)<=value+1){
                let x= j-1
                viable.push(i+' '+x)
            }
        }catch{}
            try{
            if(lines[i-1].charCodeAt(j)<=value+1){
                viable.push(i-1+' '+j)
            }
        }catch{}
            try{
            if(lines[i+1].charCodeAt(j)<=value+1){
                viable.push(i+1+' '+j)
            }
        }catch{}
        }
        viable.forEach(element => {
            visited.add(element)
        }); 
    }
    
    for(let count=0; count<10000;count++){

        function display(){let string=''
        for(let i=0; i<height;i++){
            for(let j=0;j<width;j++){
                if(visited.has(i+' '+j)){
                    string+='#'
                } else{
                    string+=lines[i][j]
                }
            }
            string+='\n'
        }
        console.log(string);
        }
        nextStep()
        if(visited.has(end)){break}
        if(steps==10000){
            break
        }
    }
    // console.log({visited});
    return steps
}
// console.log({ANSWER:solution(input12)})

function solution2(input){
    let lines = splitLines(input)
    let height= lines.length
    let width= lines[0].length
    let start;
    let end;
    // console.log({lines});
    for(let i=0; i<height;i++){
        for(let j=0;j<width;j++){
            if(lines[i][j]=='S'){
                start= i+' '+j
                lines[i]=lines[i].slice(0,j)+'a'+lines[i].slice(j+1)
            }
            if(lines[i][j]=='E'){
                end=i+' '+j
                lines[i]=lines[i].slice(0,j)+'z'+lines[i].slice(j+1)
            }
        }
    }
    // console.log({lines});
    // console.log({start,end});
    let steps=0
    let visited = new Set([end])
    function nextStep(){
        let result = false
        steps ++
        let viable=[]
        for(const square of visited){
            let [i,j] = square.split(' ')
            i=parseInt(i)
            j=parseInt(j)
            let value= lines[i].charCodeAt(j)
            try{
            if(lines[i].charCodeAt(j+1)>=value-1){
                let x= j+1
                viable.push(i+' '+x)
            }
        }catch{}
            try{
            if(lines[i].charCodeAt(j-1)>=value-1){
                let x= j-1
                viable.push(i+' '+x)
            }
        }catch{}
            try{
            if(lines[i-1].charCodeAt(j)>=value-1){
                viable.push(i-1+' '+j)
            }
        }catch{}
            try{
            if(lines[i+1].charCodeAt(j)>=value-1){
                viable.push(i+1+' '+j)
            }
        }catch{}
        }
        viable.forEach(element => {
            
            let [i,j]= element.split(' ')
            if(!visited.has(element)){
                // console.log([i,j]);
                // console.log(lines[i][j]);
            }
            visited.add(element)
            if(lines[i][j]=='a'){
                result =true
            }
        });
        return result
    }
    
    for(let count=0; count<10000;count++){

        function display(){let string=''
        for(let i=0; i<height;i++){
            for(let j=0;j<width;j++){
                if(visited.has(i+' '+j)){
                    string+='#'
                } else{
                    string+=lines[i][j]
                }
            }
            string+='\n'
        }
        console.log(string);
        }
        // display()
        if(nextStep()) break
        if(visited.has(start)){break}
        if(steps==10000){
            break
        }
    }
    // console.log({visited});
    return steps
}

console.log(solution2(input12));
