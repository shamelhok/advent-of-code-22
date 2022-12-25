const {input7}= require('./puzzleInputs')


const lines= input7.split('\n')
const test = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`.split('\n')
const home ={}
let path = 'home'
let current= eval(path)
for(const line of lines){
    // console.log(line);
    let command  = line.split(' ')
    if(command[0]==='$'){
        if(command[1]==='cd'){
            if(command[2]=='..'){
                let i=0
                let len= path.length
                while(true){
                    if(path[len-i]==='['){
                        path = path.slice(0,len-i)
                        current= eval(path)
                        break;
                    }
                    i++
                    if(i===10000000){
                        throw new Error()
                    }
                }
            }else{
                if(!current.hasOwnProperty(command[2])){
                    current[command[2]]={}
                }
                path+='["'+command[2]+'"]'
                current= eval(path)
            }
        }
        if(command[1]==='ls'){

        }
    }else if(command[0]==='dir'){
        if(!current.hasOwnProperty(command[1])){
            current[command[1]]={}
        }
    }else{
            current[command[1]]=parseInt(command[0])
    }
}
console.log(home)

let totals={}
function findTotals(name,parent){
    let sum =0
    for(let i in parent){
        if(typeof(parent[i])==='object'){
            findTotals(name+i,parent[i])
            sum+=totals[name+i]
        }else{
            sum+=parent[i]
        }
    }
    totals[name]=sum
}
findTotals('home',home)
let directorySum=0
let coutedDirs={}
let uncoutedDirs={}
for(let key in totals){
    if(totals[key]<=100000){
        directorySum+=totals[key]
        coutedDirs[key]=totals[key]
    }else {
        uncoutedDirs[key]=totals[key]
    }
}
// console.log(directorySum);
// console.log(totals)
let spaceNeeded= totals.home-40000000
let smallest= 40000000
console.log(spaceNeeded);
for(let key in totals){
    if(totals[key]>=spaceNeeded&&totals[key]<smallest){
        smallest= totals[key]
    }
}
// console.log(smallest);
