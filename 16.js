const { test16, input16 } = require("./inputs14+");

// class Valve{
//     constructor(flow,...leadsTo){
//         this.flow=flow
//         this.leadsTo= []
//         for(const valve of leadsTo){
//             this.leadsTo.push(valve)
//         }
//         this.open=false
//     }
//     addValves(...args){
//         for(const valve of args){
//             this.leadsTo.push(valve)
//         }
//     }
// }
function parseValves(input) {
  let lines = input.split("\n");
  let valves = {};
  lines.forEach((str) => {
    let name = getValve(str);
    let flow = getNums(str);
    let valve = { flow, name };
    valve.leadsToNames = getLeadsToNames(str);
    valve.leadsTo = new Set();
    valve.distance = [valve];
    valve.open = false;
    valves[name] = valve;
  });
  for (const valveName in valves) {
    let valve = valves[valveName];
    for (const name of valve.leadsToNames) {
      valve.leadsTo.add(valves[name]);
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
    let valvesAtCurrentDistance = new Set();
    for (const valve of currentValve.distance.at(-1)) {
      for (nextValve of valve.leadsTo) {
        valvesAtCurrentDistance.add(nextValve);
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
// function getMaxFlowValve(currentValve,timeRemaining){
//     let max=0
//     let nextValve= currentValve
//     for (let i = currentValve.distance.length-1;i>0;i--){
//         let valvesAtDistancei= currentValve.distance[i]
//         for(valve of valvesAtDistancei){
//             if(valve.flow*(timeRemaining-i)>max){
//                 max=valve.flow*(timeRemaining-i)>max
//                 nextValve= valve
//             }
//         }
//     }
//     return nextValve
// }
// function solve(input, minutes){
//     let valves = parseValves(input)
//     let current = valves.AA
//     current.open=true
//     let totalFlow=0
//     let released=0
//     for( let minute = 0 ;minute<minutes;minute++){
//         released+= totalFlow
//         if(current.open){
//             current= getMaxFlowValve(current,minutes-minute)|| current
//         }else{
//             current.open=true
//             totalFlow+= current.flow
//         }
//     }
//     return released
// }

// console.log(solve(test16,30));
function solve(input, minutes=30) {
  const valves = parseValves(input);
  let currentValve= valves.AA
  let flow =0
    let released =0
  function next(currentValve,minute=0){
    if(minute>=minutes){
        return
    }
    for (const nextValve of currentValve.leadsTo){
        console.log(nextValve.name, minute);
        next(nextValve, minute+1)
    }
  }
  next(currentValve)
}

solve(test16,10)

// let x = parseValves(test16);
// console.log(x);

// console.table(x.AA.distance);

// // let y = getLeadsToNames('Valve BB has flow rate=13; tunnels lead to valves CC, AA')
// console.log(y);
