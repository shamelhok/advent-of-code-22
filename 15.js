const { test15, input15 } = require("./inputs14+");

function allNoBeacons(input){
    const allSensorCoords= lineSplit(input).map(x=>getCoords(x))
    const noBeaconsTotal=new Set()
    for(const sensorCoords of allSensorCoords){
       const noBeacons=findNoBeaconLocations(sensorCoords)
       for(const coord of noBeacons){
        noBeaconsTotal.add(coord)
       }
    }
   return noBeaconsTotal
}
function solve(input,row){
    const allSensorCoords= lineSplit(input).map(x=>getCoords(x))
    // console.log({allSensorCoords});
    const noBeacons=new Set()
    for(const sensorCoords of allSensorCoords){
       const noBeaconsForThisSensor=findNoBeaconsInRow(sensorCoords,row)
    //    console.log({noBeaconsForThisSensor});
    //    console.log({sensorCoords});
       for(const coord of noBeaconsForThisSensor){
        // if(y==row){
        //     noBeacons.add(coord)
        // }
        noBeacons.add(coord)
       }
    }
   return noBeacons
}
function lineSplit(input){
    return input.split('\n')
}
function getCoords(inputLine){
    return inputLine.match(/[-\d]+/g).map(x=>parseInt(x))
}
function findBeaconDistance([sx,sy,bx,by]){
    return Math.abs(sx-bx)+Math.abs(sy-by)
}
function findNoBeaconLocations([sx,sy,bx,by]){
    let beaconDistance= findBeaconDistance([sx,sy,bx,by])
    let noBeacons= new Set()
    for(let i =0;i<=beaconDistance;i++ ){
        for(let j=0;j<=beaconDistance-i;j++){
            let upLeft=[sx-i,sy-j]
            let upRight=[sx+i,sy-j]
            let downLeft=[sx-i,sy+j]
            let downRight=[sx+i,sy+j]
            noBeacons.add(upLeft.toString())
            noBeacons.add(upRight.toString())
            noBeacons.add(downRight.toString())
            noBeacons.add(downLeft.toString())
        }
    }
    noBeacons.delete([bx,by].toString())
    return noBeacons
}
function findNoBeaconsInRow([sx,sy,bx,by],row){
    let beaconDistance= findBeaconDistance([sx,sy,bx,by])
    let noBeacons= new Set()
    let distanceToRow= Math.abs(row - sy)
    if(distanceToRow>=beaconDistance){
        return noBeacons
    }
    let width = beaconDistance- distanceToRow
    for(let i=-width;i<=width;i++){
        noBeacons.add([parseInt(sx)+i,row].toString())
    }
    noBeacons.delete([bx,by].toString())
    return noBeacons
}
// console.log(solve(input15,2000000).size);

function solve2(input,maxXandY){
    const allCoords= lineSplit(input).map(x=>getCoords(x))
    let sensorsWithReach= allCoords.map(([x,y,bx,by])=>{
        const reach = findBeaconDistance([x,y,bx,by])
        return [x,y,reach]
    })
    console.log(sensorsWithReach);
    // for(let i=0; i<=maxXandY;i++){
    //     console.log({row:i});
    //     for(let j=0; j<=maxXandY;j++){
    //         let inReach=false
    //         for(const sensor of sensorsWithReach){
    //             if(findBeaconDistance([sensor[0],sensor[1],i,j])<=sensor[2]){
    //                 inReach=true
    //                 break;
    //             }
    //         }
    //         if(!inReach){
    //             console.log({i,j});
    //             return 4000000*i+j
    //         }
    //     }
    // }
    let equation=''
    for(const sensor of sensorsWithReach){
        equation+='\\left|x-'+sensor[0]+'\\right|+\\left|y-'+sensor[1]+'\\right|<='+sensor[2]+'\n'
        // equation+='|x-'+sensor[0]+'|+|y-'+sensor[1]+'|<='+sensor[2]+'&&'
    } 
    return equation
}
console.log(solve2(test15,20));
console.log(solve2(input15,4000000))
console.log(3403960*4000000+3289729);