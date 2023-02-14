const { test20, input20 } = require("./inputs20+");

function parse(input){
    return input.split('\n')
    .map(parseFloat)
}

const testValues= parse(test20)
const values= parse(input20)

function mix(array){
    let arr =[...array]
    let len = array.length
    let movedIndeces=[]
    let i =0
    while(movedIndeces.length<len){
        if(movedIndeces.includes(i)){
            i++
            continue
        }
        let value = arr[i]
        arr.splice(i,1)
        let newIndex=(i+value)%(len-1)
        if( newIndex==0){
            newIndex= len-1
        } else{
            newIndex= (newIndex+len-1)%(len-1)
        }
        arr.splice(newIndex,0,value)
        movedIndeces= movedIndeces.map(x=>{
            if(i>x&&newIndex<=x){
                return x+1
            }
            if(i<x&&newIndex>=x){
                return x-1
            }
            return x
        })
        movedIndeces.push(newIndex)
        if(newIndex<i){i++}
        // console.log(arr);
    }
    return arr
}

function solve(array){
    let mixed= mix(array)
    let len = array.length
    let zero= mixed.indexOf(0)
    const i= num=>mixed[(zero +num)%len]
    console.log(i(1000),i(2000),i(3000));
    return i(1000)+i(2000)+i(3000)

}

// let ans = solve(values)
// console.log(ans);



function objectify(array){
    let len = array.length
    let arr = array.map(num=>{
        return {value:num,moved:0}
    })
    arr.forEach((obj,i)=>{
        obj.prev = arr[(len+i-1)%len]
        obj.next= arr[(len+i+1)%len]
    })
    return arr
}
function moveForward(obj){
    // p1 obj n1 n2 
    // -> p1 n1 obj n2
    let n1 =obj.next
    let p1=obj.prev
    let n2= n1.next
    p1.next=n1
    n1.prev=p1
    n1.next=obj
    obj.prev=n1
    obj.next=n2
    n2.prev=obj
}
function moveBack(obj){
    // p2 p1 obj n1 
    // -> p2 obj p1 n1
    let n1 =obj.next
    let p1=obj.prev
    let p2 =p1.prev
    p1.next=n1
    p1.prev=obj
    n1.prev=p1
    obj.prev=p2
    obj.next=p1
    p2.next=obj
}

function newNumArray(objArr){
    let len = objArr.length-1
    let newarr=[objArr[0]]
    let i=0
    while(i<len){
        newarr.push(newarr[i].next)
        i++
    }
    return newarr.map(x=>x.value)
}

function mixObjArr(objArr){
    let len = objArr.length-1
    objArr.forEach(obj=>{
        for(let i=0;i<obj.value%len;i++){
            moveForward(obj)
        }
        for(let i=0;i>obj.value%len;i--){
            moveBack(obj)
        }
    })
}

function solve2(input){
    let numArr= parse(input)
    let decryptedNumArr= numArr.map(num=>811589153*num)
    let objArr= objectify(decryptedNumArr)
    for(let i=0;i<10;i++){
        mixObjArr(objArr)
    }
    let mixed=newNumArray(objArr)
    let len = mixed.length
    let zero= mixed.indexOf(0)
    const i= num=>mixed[(zero +num)%len]
    console.log(i(1000),i(2000),i(3000));
    return i(1000)+i(2000)+i(3000)
}

console.log(solve2(input20));

// let testObjs= objectify(testValues)
// mixObjArr(testObjs)
// mixObjArr(testObjs)
// mixObjArr(testObjs)
// // moveForward(testObjs[0])
// console.log(newNumArray(testObjs));
