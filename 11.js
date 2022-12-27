const { test11, input11 } = require("./puzzleInputs");

function extractMonkeys(input){
    let monkeyTexts= input.split('\n\n')
    let monkeys={}
    for(let text of monkeyTexts){
        let lines = text.split('\n')
        let monkey =monkeys[lines[0].match(/\d/)[0]]={}
        monkey.items=[]
        eval( 'monkey.items.push('+lines[1].slice(15)+')')
        monkey.op=eval(`(old)=>{return Math.round(`+lines[2].split('=')[1]+`)}`)
        let divisor=parseInt(lines[3].split('by')[1])
        let ifTrue= parseInt(lines[4].split('monkey')[1])
        let ifFalse=parseInt( lines[5].split('monkey')[1])
        monkey.divisor=divisor
        monkey.test=(num)=>{return Math.round(num)%divisor===0?ifTrue:ifFalse}
        monkey.count=0
    }
    return monkeys
} 
let monkeys= extractMonkeys(input11)
// console.log(monkeys)
function round(monkeys){
    for(let key in monkeys){
        let monkey =monkeys[key]
        while(monkey.items.length>0){
            monkey.count++
            let item= monkey.items.shift()
            item=monkey.op(item)
            item= Math.floor(item/3)
            let target = monkey.test(item)
            monkeys[target].items.push(item)
        }
    }
}
// for(let i=0;i<20;i++){
// round(monkeys)
// }
// console.log(monkeys)
// let arr =[]
// for(let key in monkeys){
//     arr.push(monkeys[key].count)
// }
// console.log(arr);
// console.log(228*237);

let monkeys2= extractMonkeys(test11)
// console.log({monkeys2});
function round2(monkeys){
    let key =0
    let divisor= findDivisor(monkeys)
    while(monkeys[key]){
        let monkey =monkeys[key]
        while(monkey.items.length>0){
            let item= monkey.items.shift()%divisor
            // if(key==1)console.log({itembefore:item});
            item=monkey.op(item)
            // if(key==1)console.log({item});
            monkey.count++
            let target = monkey.test(item)
            monkeys[target].items.push(item)
        }
        key ++
    }
}
function findDivisor(monkeys){
    let divisor=1
    for( let key in monkeys){
        divisor*= monkeys[key].divisor
    }
    return divisor
}
for(let i=0;i<1000;i++){
    round2(monkeys2)
    if(i===0||i===19||i===999){
        console.log({
            0:monkeys2[0].count,
            1:monkeys2[1].count,
            2:monkeys2[2].count,
            3:monkeys2[3].count,
        });
    }
}
console.log(findDivisor(monkeys2));
let counts=[]
for(let key in monkeys2){
    counts.push(monkeys2[key].count)
}
// console.log({counts,monkeys2});
// let max= Math.max(...counts)
// counts.filter((x,i)=>i!==counts.indexOf(max))
// let second= Math.max(...counts)
// console.log(max*second)

let x=5.3
console.log(x<<1);
