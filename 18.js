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
//   for (const cube of cubes) {
//     if (!cubes.includes(cube - 10000)) {
//       if (!isEnclosed(cube - 10000, cubes, dimensions)) {
//         surfaceArea++;
//       }
//     }
//     if (!cubes.includes(cube + 10000)) {
//       if (!isEnclosed(cube + 10000, cubes, dimensions)) {
//         surfaceArea++;
//       }
//     }
//     if (!cubes.includes(cube - 100)) {
//       if (!isEnclosed(cube - 100, cubes, dimensions)) {
//         surfaceArea++;
//       }
//     }
//     if (!cubes.includes(cube + 100)) {
//       if (!isEnclosed(cube + 100, cubes, dimensions)) {
//         surfaceArea++;
//       }
//     }
//     if (!cubes.includes(cube - 1)) {
//       if (!isEnclosed(cube - 1, cubes, dimensions)) {
//         surfaceArea++;
//       }
//     }
//     if (!cubes.includes(cube + 1)) {
//       if (!isEnclosed(cube + 1, cubes, dimensions)) {
//         surfaceArea++;
//       }
//     }
//   }
    const pocket =getPocket(0,cubes,dimensions)
    console.log(pocket);
  return surfaceArea;
}
function getPocket(coord, cubes, dimensions) {
  const { width, height, depth } = dimensions;
  const max = width * height * depth;
  let pocket = [coord];
  function next(coordinate){
    for( const touching of getTouching(coordinate)){
        if(!cubes.includes(touching)&& !pocket.includes(touching)){
            pocket.push(touching)
            next(touching)
        }
    }
  }
  next(coord)
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

const x=solve2(test18)
console.log(x);
