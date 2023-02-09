const { test16, input16 } = require("./inputs14+");

function parseValves(input) {
  let lines = input.split("\n");
  let valves = {};
  lines.forEach((str) => {
    let name = getValve(str);
    let flow = getNums(str);
    let valve = { flow, name };
    valve.leadsToNames = getLeadsToNames(str);
    valve.leadsTo = []
    valve.distance = [valve];
    valve.open = false;
    valves[name] = valve;
  });
  for (const valveName in valves) {
    let valve = valves[valveName];
    for (const name of valve.leadsToNames) {
      valve.leadsTo.push(valves[name]);
    }
    valve.distance.push(valve.leadsTo);
  }
  for (const valveName in valves) {
    addValvesAtNextDistance(valves);
  }
  return valves;
}
function addValvesAtNextDistance(valves) {
  for (const valveName in valves) {
    let currentValve = valves[valveName];
    let valvesAtCurrentDistance = [];
    for (const valve of currentValve.distance.at(-1)) {
      for (let nextValve of valve.leadsTo) {
        if(!valvesAtCurrentDistance.includes(nextValve)){
        valvesAtCurrentDistance.push(nextValve);
        }
      }
    }
    currentValve.distance.push(valvesAtCurrentDistance);
  }
}
function getNums(str) {
  return parseInt(str.match(/\d+/g)[0]);
}
function getValve(str) {
  return str.split("Valve ")[1].split(" ")[0];
}
function getLeadsToNames(str) {
  let valveNames = str.split("valve")[1];
  if (valveNames[0] == "s") {
    valveNames = valveNames.slice(1);
  }
  return valveNames.match(/[a-z]+/gi);
}
function solve(input, minutes = 30) {
  const valves = parseValves(input);
  // let currentValve = valves.AA;
  let releasedArray = [];
  function next(
    currentValve = valves.AA,
    minute = 0,
    flow = 0,
    released = 0,
    path = [currentValve.name],
    open = ["AA"]
  ) {
    // console.log({ name: currentValve.name, minute, flow, released, path });
    released += flow;
    function finish() {
      // console.log("done");
      // console.log(path);
      if (released > Math.max(...releasedArray)) {
        console.log(path, open);
        releasedArray.push(released);
      }
      return;
    }
    if (path.length > 6 && !path.slice(-8).includes("open")) {
      // console.log('no open for too long');
      return finish();
    }
    if (
      (minute > 10 && flow < 30)
      || (minute > 16 && flow < 60)
      // || (minute > 20 && flow < 100)
    ) {
      return finish();
    }
    if (minute >= minutes) {
      return finish();
    }

    for (const nextValve of currentValve.leadsTo) {
      // console.log(nextValve.name, minute);
      next(
        nextValve,
        minute + 1,
        flow,
        released,
        [...path, nextValve.name],
        open
      );
    }
    if (!open.includes(currentValve.name)) {
      flow += currentValve.flow;
      next(
        currentValve,
        minute + 1,
        flow,
        released,
        [...path, "open"],
        [...open, currentValve.name]
      );
    }
  }
  next();
  console.log(releasedArray);
  console.log(Math.max(...releasedArray));
  return Math.max(...releasedArray);
}

// solve(test16, 29);

function solve2(input, minutes = 30) {
  const valves = parseValves(input);
  let valveCount = 0;
  for (const valve in valves) {
    if (valve.flow>0)valveCount++;
  }
  let currentValve = valves.AA;
  let releasedArray = [];
  let earliestAllOpen = minutes
  let minFlow= {
    0:0,
    1:0
  }
  function next(
    currentValve = valves.AA,
    minute = 0,
    flow = 0,
    released = 0,
    path = ['AA'],
    open = ["AA"],
    elephantValve = valves.AA,
    elephantPath = ["AA"]
  ) {
    // console.log({
    //   name: currentValve.name,
    //   minute,
    //   flow,
    //   released,
    //   path,
    //   elephant: elephantValve.name,
    //   elephantPath,
    // });

    // released += flow;
    flow=0
    for(const name of open){
      released+= valves[name].flow
      flow+= valves[name].flow
    }

    function finish() {
      // console.log("done");
      // console.log(path,elephantPath);
      if (released > Math.max(...releasedArray)) {
        console.log(path,elephantPath, open,flow,released, earliestAllOpen
          ,released+(flow*(25-earliestAllOpen))
          );
        releasedArray.push(released);
      }
      return;
    }
    // if (path.length > 6&&!path.slice(-10).includes("open")) {
    //   // console.log('no open for too long');
    //   return finish();
    // }
    if(flow<minFlow[minute]){
      return finish()
    }

    if ( (minute >4 && flow<30)
      // ||(minute>3&&flow<41)||(minute > 7 && flow < 76) || (minute > 16 && flow < 60)
      // || minute>9 && flow< 78
      // || minute>12 && flow< 81
    ) {
      return finish();
    }
    
    if (minute >= minutes) {
      return finish();
    }
    if (valveCount === open.length) {
      // console.log("all open");
      if(minute<earliestAllOpen){
        earliestAllOpen = minute
      }
      return next(
        currentValve,
        minute + 1,
        flow,
        released,
        path,
        open,
        elephantValve,
        elephantPath
      );
    }

    if( minute> earliestAllOpen+1 ){
      return finish()
    }

    for (let i = currentValve.leadsTo.length-1 ; i >=-1; i--) {
      for (let j = elephantValve.leadsTo.length-1; j >=-1; j--) {
        let newOpen = [...open];
        let newPath = [...path];
        let newElPath = [...elephantPath];
        let badLoop=false
        if(path.at(-2)==currentValve.leadsTo[i]
        ||elephantPath.at(-2)==elephantValve.leadsTo[i]){
          continue
        }
        for(let x = path.length-1;path[x]!='open'&&x>=0;x--){
          if(path[x]==currentValve.leadsTo[i]){
            badLoop= true
            break
          }
        }
        if(badLoop){
          continue
        }
        for(let x = elephantPath.length-1;path[x]!='open'&&x>=0;x--){
          if(elephantPath[x]==elephantValve.leadsTo[j]){
            badLoop= true
            break
          }
        }
        if(badLoop){
          continue
        }

        const nextValve = currentValve.leadsTo[i] || currentValve;
        const elNext = elephantValve.leadsTo[j] || elephantValve;
        if (i == -1) {
          if (!newOpen.includes(currentValve.name)&&currentValve.flow>0) {
            // flow += currentValve.flow;
            newOpen.push(currentValve.name);
            newPath.push("open");
          } else {
            continue
          }
        } else {
          newPath.push(nextValve.name);
        }
        if (j == -1) {
          if (!newOpen.includes(elephantValve.name)&&elephantValve.flow>0) {
            // flow += elephantValve.flow;
            newOpen.push(elephantValve.name);
            newElPath.push("open");
          } else {
           continue
          }
        } else {
          newElPath.push(elNext.name);
        }
        next(
          nextValve,
          minute + 1,
          flow,
          released,
          newPath,
          newOpen,
          elNext,
          newElPath
        );
      }
    }
    // if (!open.includes(currentValve.name)&&!open.includes(elephantValve.name)) {
    //   flow += currentValve.flow+elephantValve.flow;
    //   next(currentValve, minute + 1, flow, released, [...path, "open"],[...open,currentValve.name],elephantValve,[...elephantPath,'open']);
    // }
  }
  next();
  console.log({releasedArray, valveCount});
  console.log({ans:Math.max(...releasedArray)});
  return Math.max(...releasedArray);
}
// solve2(input16, 11);


let v = parseValves(test16)
console.log(v)
