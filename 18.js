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
  let width = Math.floor(Math.max(...cubes)/10000)
  let xIgnored = cubes.map((coord) => coord % 10000);
  let yIgnored = xIgnored.map((coord) => coord % 100);
  let height = Math.floor(
    (Math.max(...xIgnored)) / 100
  );
  let depth = Math.floor(Math.max(...yIgnored));
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
  console.log(dimensions);
  const pocket = getPocket(0, cubes, dimensions);
  const enclosed = [];
  for (const cube of cubes) {
    for (const touching of getTouching(cube)) {
      if (!cubes.includes(touching)) {
        if (pocket.includes(touching)) {
          surfaceArea++;
        } else {
          if (!enclosed.includes(touching)) {
            const newPocket = getPocket(touching, cubes, dimensions);
            for (const enclosedCoord of newPocket) {
              if (!enclosed.includes(enclosedCoord)) {
                enclosed.push(enclosedCoord);
              }
            }
          }
        }
      }
    }
  }
  let empty = [];
  for (let i = 0; i < width + 2; i++) {
    for (let j = 0; j < height + 2; j++) {
      for (let k = 0; k < depth + 2; k++) {
        const newCoord = i * 10000 + j * 100 + k;
        if (!cubes.includes(newCoord)
        // &&!pocket.includes(newCoord)
        ) {
          empty.push(newCoord);
        }
      }
    }
  }
  // console.log(pocket,cubes)
  const max = (width + 2) * (height +2) * (depth + 3);
  const sizes={
    max,
    empty: empty.length,
    enclosed: enclosed.length,
    pocket: pocket.length,
    cubes: cubes.length,
    calc: enclosed.length + pocket.length + cubes.length,
  };
  console.log(sizes);
  let difference=[]
  for (const coord of [...enclosed,...pocket]){
    if(!empty.includes(coord)){
      difference.push(coord)
    }
  }
  console.log(difference);
  // console.log(empty);
  cubes.sort((a,b)=>b-a)
  // console.log(cubes);

  return surfaceArea;
}

function getPocket(coord, cubes, dimensions) {
  const { width, height, depth } = dimensions;
  console.log(dimensions);
  // const [ width, height, depth ] =[10,10,10]
  // const max = width * height * depth;
  let pocket = [coord];
  function next(coordinate) {
    for (const touching of getTouching(coordinate)) {
      if (!cubes.includes(touching) && !pocket.includes(touching)) {
        let x = Math.floor(touching / 10000);
        let y = Math.floor((touching % 10000) / 100);
        let z = touching % 100;
        if (
          x < width + 2 &&
          y < height + 2 &&
          z < depth + 2 &&
          x >= 0 &&
          y >= 0 &&
          z >= 0
        ) {
          pocket.push(touching);
          next(touching);
        }
      }
    }
  }
  next(coord);
  return pocket;
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
function getTouching(coord) {
  return [
    coord + 1,
    coord - 1,
    coord + 100,
    coord - 100,
    coord + 10000,
    coord - 10000,
  ];
}

const x = solve2(input18);
console.log(x);
