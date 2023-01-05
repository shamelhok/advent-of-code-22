const { test13, input13 } = require("./puzzleInputs");

function solution(input) {
  const pairsAsString = input.split("\n\n");
  const pairs = pairsAsString.map((str) => str.split("\n").map(x=>eval(x)));
  // console.log({ pairs});
  let sum = 0;
  pairs.forEach((pair, index) => {
    // console.log({pair});
    const pairInOrder= inOrder(pair)
    // console.log({pairInOrder});
    // const left = eval(pair[0]);
    // const right = eval(pair[1]);
    // if (!pairInWrongOrder(pair)) {
    //   sum += index;
    // }
    if(pairInOrder){
      sum+=index+1
    }
  });
  return sum;
}
function inOrder([left,right]){
  for(let i=0; i<left.length;i++){
    const item = left[i]
    const compare = right[i]
    // console.log({item,compare});
    if(item===compare){
      // console.log(undefined);
      continue
    }else if(Array.isArray(item)&&Array.isArray(right[i])){
      const recurse =inOrder([item,right[i]])
      // console.log({recurse});
      if(recurse!==undefined){
        return recurse
      }
    }else if(typeof(item)=='number'){
      // console.log('left num');
      if(Array.isArray(compare)){
        // console.log('left num right arr');
        const recurse =inOrder([[item],right[i]])
        // console.log({recurse});
        if(recurse!==undefined){return recurse}
      } else if(compare==undefined){
        // console.log(false);
        return false
      } else if(typeof(compare)=='number'){
        // console.log(item < compare)
        return item < compare
      }
    }else if(typeof(compare)=='number'){
      if(Array.isArray(item)){
        const recurse =inOrder([item,[right[i]]])
        // console.log({recurse});
        if(recurse!==undefined){return recurse}
      } else if(item==undefined){
        // console.log(false);
        return false
      } else if(typeof(item)=='number'){
        // console.log(item < compare)
        return item < compare
      }
    }else if(compare==undefined){
      return false
    }else if(item==undefined){
      return true
    }
  }
  if(right.length> left.length){
    // console.log(true);
    return true
  }
}

function putAllInOrder(input){
  const packets = input.split('\n').filter(x=>x!=='').map(x=>eval(x))
  packets.push([[2]])
  packets.push([[6]])
  packets.sort((x,y)=>{return inOrder([x,y])?-1:1})
  return packets
}
// console.log({ANSWER:solution(input13)});
const ordered = putAllInOrder(input13)
let product=1
for( let i =0; i<ordered.length;i++){
  if( 
    ordered[i].length==1&&
    ordered[i][0].length==1&&
    (ordered[i][0][0]===2||
      ordered[i][0][0]===6)
    ){
      console.log({i,packet:ordered[i]});
    product*=i+1
  }
}
console.log({product});