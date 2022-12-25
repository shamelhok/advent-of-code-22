const { input9 } = require("./puzzleInputs");

let testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

let secondTest=`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

function getTailPositions(input) {
  let positions = new Set();
  let hor = 0;
  let vert = 0;
  let Hhor = 0;
  let Hvert = 0;
  positions.add("h" + hor + "v" + vert);
  let lines = input.split("\n");
  for (let line of lines) {
    let dir = line[0];
    let moves = parseInt(line.slice(2));
    // console.log({moves,dir});
    for (let i = 0; i < moves; i++) {
      switch (dir) {
        case "R":
          Hhor++;
          break;
        case "L":
          Hhor--;
          break;
        case "U":
          Hvert++;
          break;
        case "D":
          Hvert--;
          break;
      }
      let horDiff = Hhor - hor;
      let verDiff = Hvert - vert;
      let newPos = tailCatchUp(hor, vert, Hhor, Hvert);
      hor = newPos.hor;
      vert = newPos.vert;
      // // console.log('before',{ move:dir+moves,Hhor, Hvert, hor, vert ,horDiff,verDiff});
      //   if (horDiff === 0) {
      //     vert += Math.floor(Math.abs(verDiff)/ 2)*Math.sign(verDiff);
      //   } else if (verDiff === 0) {
      //     hor += Math.floor(Math.abs(horDiff) / 2)*Math.sign(horDiff);
      //   } else if (Math.abs(horDiff) + Math.abs(verDiff) >= 3) {
      //     vert += Math.sign(verDiff);
      //     hor += Math.sign(horDiff);
      //   }
      // //   console.log('after',{ move:dir+moves,Hhor, Hvert, hor, vert ,horDiff,verDiff});
      positions.add("h" + hor + "v" + vert);
    }
  }
  return positions;
}

function tailCatchUp(hor, vert, Hhor, Hvert) {
  let horDiff = Hhor - hor;
  let verDiff = Hvert - vert;
  //   console.log({ hor, vert, horDiff, verDiff });
  if (horDiff === 0) {
    vert += Math.floor(Math.abs(verDiff) / 2) * Math.sign(verDiff);
  } else if (verDiff === 0) {
    hor += Math.floor(Math.abs(horDiff) / 2) * Math.sign(horDiff);
  } else if (Math.abs(horDiff) + Math.abs(verDiff) >= 3) {
    vert += Math.sign(verDiff);
    hor += Math.sign(horDiff);
  }
  return { hor, vert };
}

console.log(getTailPositions(input9).size);

function getLongTailPositions(input, length = 1) {
  let tailPositions = new Set();
  let positions = [[0, 0]];
  for (let i = 0; i < length; i++) {
    positions.push([0, 0]);
  }
  console.log({positions});
  tailPositions.add("h" + positions[length][0] + "v" + positions[length][1]);
  let lines = input.split("\n");
  for (let line of lines) {
    let dir = line[0];
    let moves = parseInt(line.slice(2));
    // console.log({moves,dir});
    for (let i = 0; i < moves; i++) {
      switch (dir) {
        case "R":
            positions[0][0]++;
          break;
        case "L":
            positions[0][0]--;
          break;
        case "U":
            positions[0][1]++;
          break;
        case "D":
            positions[0][1]--;
          break;
      }
      for(let i=0;i<length;i++){
          let newPos = tailCatchUp(
            positions[i+1][0], positions[i+1][1],
            positions[i][0], positions[i][1]);
          positions[i+1][0] = newPos.hor;
          positions[i+1][1] = newPos.vert;

      }
      tailPositions.add("h" + positions[length][0] + "v" + positions[length][1]);
    }
  }
  return tailPositions;
}
console.log(getLongTailPositions(input9,9).size);
