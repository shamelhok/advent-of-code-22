const { test14, input14 } = require("./inputs14+");

function solve1(input) {
  const rockPathStrings = lineSplit(input);
  let{rocks, lowestRock}=getRocks(rockPathStrings)
  const solid= new Set(rocks)
  let sandCoord=[500,0]
  let sandCount=0
  while(sandCoord[1]<=lowestRock){
    let down= [sandCoord[0],sandCoord[1]+1]
    let downLeft= [sandCoord[0]-1,sandCoord[1]+1]
    let downRight= [sandCoord[0]+1,sandCoord[1]+1]
    if(!solid.has(down.toString())){
        sandCoord= down
        continue
    }
    if(!solid.has(downLeft.toString())){
        sandCoord= downLeft
        continue
    }
    if(!solid.has(downRight.toString())){
        sandCoord= downRight
        continue
    }
    sandCount++
    solid.add(sandCoord.toString())
    sandCoord=[500,0]
  }
  return sandCount
}
function lineSplit(input) {
  return input.split("\n");
}

function getRocks(rockPathStrings){
    const rocks = new Set();
    let lowestRock =0
    for (const rockPath of rockPathStrings) {
      addRockPath(rockPath)
    }
    function addRockPath(rockPath) {
      const coordsAsStrings = rockPath.split("->");
      const coords = coordsAsStrings.map((str) => eval("[" + str + "]"));
      let current= coords[0]
      rocks.add(current.toString())
      for(const coord of coords){
          let horDir=Math.sign(coord[0]-current[0])
          let vertDir=Math.sign(coord[1]-current[1])
          let next = coord.toString()
          while(current.toString()!==next){
              current[0]+=horDir
              current[1]+=vertDir
              rocks.add(current.toString())
              if(current[1]>lowestRock){
                  lowestRock= current[1]
              }
          }
      }
    }
    return {rocks,lowestRock}
}
console.log(solve1(input14));
function solve2(input) {
    const rockPathStrings = lineSplit(input);
    let{rocks, lowestRock}=getRocks(rockPathStrings)
    lowestRock= lowestRock+2
    const solid= new Set(rocks)
    let sandCoord=[500,0]
    let sandCount=0
    while(!solid.has([500,0].toString())){
      let down= [sandCoord[0],sandCoord[1]+1]
      let downLeft= [sandCoord[0]-1,sandCoord[1]+1]
      let downRight= [sandCoord[0]+1,sandCoord[1]+1]
      if(sandCoord[1]>=lowestRock-1){
        sandCount++
      solid.add(sandCoord.toString())
      sandCoord=[500,0]
      continue
      }
      if(!solid.has(down.toString())){
          sandCoord= down
          continue
      }
      if(!solid.has(downLeft.toString())){
          sandCoord= downLeft
          continue
      }
      if(!solid.has(downRight.toString())){
          sandCoord= downRight
          continue
      }
      sandCount++
      solid.add(sandCoord.toString())
      sandCoord=[500,0]
    }
    return sandCount
  }

  console.log(solve2(input14));

