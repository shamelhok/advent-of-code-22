const { test18, input18 } = require("./inputs14+");

function getCubes(input) {
  const lines = input.split("\n");
  const cubes = [];
  lines.forEach((line) => {
    addCubeToSet(getCoords(line), cubes);
  });
  return cubes;
}
function getCoords(line) {
  const coords = line.split(",").map(parseFloat);
  return coords;
}
function addCubeToSet(coords, set) {
  const [x, y, z] = coords;
  set.push(10000 * x + 100 * y + z);
}
function solve(input) {
  let surfaceArea = 0;
  const cubes = getCubes(input);
  for (const cube of cubes) {
    if (!cubes.includes(cube - 10000)) {
      surfaceArea++;
    }
    if (!cubes.includes(cube + 10000)) {
      surfaceArea++;
    }
    if (!cubes.includes(cube - 100)) {
      surfaceArea++;
    }
    if (!cubes.includes(cube + 100)) {
      surfaceArea++;
    }
    if (!cubes.includes(cube - 1)) {
      surfaceArea++;
    }
    if (!cubes.includes(cube + 1)) {
      surfaceArea++;
    }
  }
  return surfaceArea;
}
function getDimensions(cubes) {
  let width = Math.floor((Math.max(...cubes) - Math.min(...cubes)) / 10000);
  let xIgnored = cubes.map((coord) => coord % 10000);
  let yIgnored = xIgnored.map((coord) => coord % 100);
  let height = Math.floor(
    (Math.max(...xIgnored) - Math.min(...xIgnored)) / 100
  );
  let depth = Math.floor(Math.max(...yIgnored) - Math.min(...yIgnored));
  return { width, height, depth };
}
function isEnclosed(coord, cubes, dimensions) {
  let xNeg = false;
  let yNeg = false;
  let zNeg = false;
  let zPlus = false;
  let xPlus = false;
  let yPlus = false;
  for (let i = 1; i < dimensions.width + 1; i++) {
    if (cubes.includes(coord + 10000 * i)) {
      xPlus = true;
      break;
    }
  }
  for (let i = 1; i < dimensions.width + 1; i++) {
    if (cubes.includes(coord - 10000 * i)) {
      xNeg = true;
      break;
    }
  }
  for (let i = 1; i < dimensions.height + 1; i++) {
    if (cubes.includes(coord + 100 * i)) {
      yPlus = true;
      break;
    }
  }
  for (let i = 1; i < dimensions.height + 1; i++) {
    if (cubes.includes(coord - 100 * i)) {
      yNeg = true;
      break;
    }
  }
  for (let i = 1; i < dimensions.depth + 1; i++) {
    if (cubes.includes(coord + i)) {
      zPlus = true;
      break;
    }
  }
  for (let i = 1; i < dimensions.depth + 1; i++) {
    if (cubes.includes(coord - i)) {
      zNeg = true;
      break;
    }
  }
  return xNeg && xPlus && yNeg && yPlus && zNeg && zPlus;
}
function solve2(input) {
  let surfaceArea = 0;
  const cubes = getCubes(input);
  const dimensions = getDimensions(cubes);
  const { width, height, depth } = dimensions;
  const max = (width+3) * (height+3) * (3+depth);
  const pocket =getPocket(0,cubes,dimensions)
  let enclosed = new Set()
  for (const cube of cubes) {
    for(const touching of getTouching(cube) ){
      if(!cubes.includes(touching)){
        if(pocket.includes(touching)){
          surfaceArea++
        }else{
          enclosed.add(touching)
        }
      }
    }
  }
  console.log(pocket,cubes)
  console.log(max- pocket.length-enclosed.size);
  
  return surfaceArea;
}
function getPocket(coord, cubes, dimensions) {
  const { width, height, depth } = dimensions;
  // const [ width, height, depth ] =[10,10,10]
  const max = width * height * depth;
  let pocket = [coord];
  function next(coordinate){
    for( const touching of getTouching(coordinate)){
        if(!cubes.includes(touching)&& !pocket.includes(touching)){
            let x = Math.floor(touching/10000)
            let y = Math.floor(touching%10000/100)
            let z = touching%100
            if(x<width+3&&y<height+3&&z<depth+3&&x>=-3&&y>=-3&&z>=-3){
              pocket.push(touching)
              next(touching)
            }
            
        }
    }
  }
  next(coord)
  return pocket
}
function areTouching(coord1, coord2) {
  return (
    coord1 == coord2 + 10000 ||
    coord1 == coord2 - 10000 ||
    coord1 == coord2 + 100 ||
    coord1 == coord2 - 100 ||
    coord1 == coord2 + 1 ||
    coord1 == coord2 - 1
  );
}
function getTouching(coord){
    return[coord+1,coord-1,coord+100,coord-100,coord+10000,coord-10000]
}

const x=solve2(input18)
console.log(x);
