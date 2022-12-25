const { input8 } = require("./puzzleInputs");
let testTrees = `30373
25512
65332
33549
35390`.split("\n");
let trees = input8.split("\n");
let len = trees[1].length;
let rows = trees.length;
let visible = new Set();
console.log({ rows, len });
// from left
for(let i=0;i<len;i++){
    let minHeight=-1
    for(let j=0;j<rows;j++){
        let height=parseInt(trees[j][i])
        if(height>minHeight){
            minHeight=height
            visible.add('i'+i+'j'+j)
        }
        if(height===9){
            break
        }
    }
}
// from right
for(let i=0;i<len;i++){
    let minHeight=-1
    for(let j=rows-1;j>=0;j--){
        let height=parseInt(trees[j][i])
        if(height>minHeight){
            minHeight=height
            visible.add('i'+i+'j'+j)
        }
        if(height===9){
            break
        }
    }
}
// from bottom
for(let j=0;j<len;j++){
    let minHeight=-1
    for(let i=rows-1;i>=0;i--){
        let height=parseInt(trees[j][i])
        if(height>minHeight){
            minHeight=height
            visible.add('i'+i+'j'+j)
        }
        if(height===9){
            break
        }
    }
}
// from top
for(let j=0;j<len;j++){
    let minHeight=-1
    for(let i=0;i<len;i++){
        let height=parseInt(trees[j][i])
        if(height>minHeight){
            minHeight=height
            visible.add('i'+i+'j'+j)
        }
        if(height===9){
            break
        }
    }
}
// console.log( Array.from(visible));
console.log(visible.size);

let maxScore = 0;
let highScoring = 0;
function highScore(trees) {
  let rows = trees.length;
  let len = trees[0].length;
  for (let i = 1; i < len - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      let height = parseInt(trees[i][j]);
      let up = 1;
      let down = 1;
      let right = 1;
      let left = 1;
      // console.log({up,height,nextHeight:parseInt(trees[i-up][j])});
      while ( i - up > 0 &&parseInt(trees[i - up][j]) < height) {
        up++
      }
      while ( j- left > 0 &&parseInt(trees[i][j-left]) < height) {
        left++
      }
      while ( i + down < rows-1 &&parseInt(trees[i + down][j]) < height) {
        down++
      }
      while ( j + right < rows-1&&parseInt(trees[i][j + right]) < height) {
        right++
      }
      let score = up * left * right * down;
      // console.log({i,j,up,down,left,right,score});
      if (score > maxScore) {
        maxScore = score;
        highScoring = { i, j };
      }
    }
  }
}
highScore(trees);
console.log(maxScore);
console.log(highScoring);
