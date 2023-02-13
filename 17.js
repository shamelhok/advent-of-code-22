const { test17, input17, rocks17 } = require("./inputs14+");

function parseRocks(rocksString){
    let rockStrings= rocksString.split('\n\n')
    let rocksAsChars= rockStrings.map(x=>x.split(''))
    let parsedRocks=rocksAsChars.map(chars=>{
        let coords=[]
        let x=0
        let y= chars.filter(x=>x=='\n').length
        chars.forEach(char => {
            if(char==='\n'){
                y--
                x=0
            } else {
                if(char==='#'){
                    coords.push([x,y])
                }
                x++
            }
        });
        return coords
    })
    return parsedRocks
}

function solve(windPattern,maxRocks=2022){
    const rocks=parseRocks(rocks17)
    let patternLen= windPattern.length
    let rockCount= rocks.length
    const landedRocksCoordsAsStrings=[]
    let height=0
    let countOfLandedRocks=0
    let windCount=0
    while(countOfLandedRocks<maxRocks){
        let currentRock= rocks[countOfLandedRocks%rockCount]
        .map(([x,y])=>[x+2,y+height+3])
        let limit=100000
        while(limit>0){
            let windDir=1
            if(windPattern[windCount%patternLen]=='<'){
                windDir=-1
            }
            let nextCoords = currentRock
            .map(([x,y])=>[x+windDir,y])
            if(movementPossible(nextCoords,landedRocksCoordsAsStrings)){
                currentRock= nextCoords
            }
            windCount= (windCount+1)%patternLen
            let droppedCoords=currentRock.map(([x,y])=>[x,y-1])
            if(movementPossible(droppedCoords,landedRocksCoordsAsStrings)){
                currentRock= droppedCoords
            }else{
                currentRock.forEach(coord=>{
                landedRocksCoordsAsStrings.push(coord.toString())
                })
                break
            }
            
            limit--
        }
        let landedHeight= Math.max(...currentRock.map(([x,y])=>y))
        if(landedHeight+1>=height){
            height= landedHeight+1
        }
        countOfLandedRocks++
    }
    return height
}

function movementPossible(fallingRock,landedRocks){
    for(let i=0;i<fallingRock.length;i++){
        let [x,y]=fallingRock[i]
        if(
            landedRocks.includes([x,y].toString())
            ||x<0
            ||x>6
            ||y<0
            ){
                return false
            }
        }
        return true
}
    
    // const ans1=solve(input17)
    // console.log({ans1});
    
function solve2(windPattern,maxRocks=1000000000000){
            const rocks=parseRocks(rocks17)
            let patternLen= windPattern.length
            // console.log(patternLen);
            let rockCount= rocks.length
            const landedRocksCoordsAsStrings=[]
            let height=0
            let countOfLandedRocks=0
            let windCount=0
            //for part 2
            let heightatRepeat=0
            let rockCountAtRepeat=0
            let hDiff;
            let cDiff;
            let repeatFound=false
            //
            while(countOfLandedRocks<maxRocks){
                
                let currentRock= rocks[countOfLandedRocks%rockCount]
                .map(([x,y])=>[x+2,y+height+3])
                let limit=100000
                // console.log(currentRock);
                while(limit>0){
                    // FOR PART 2
                    if(windCount==0){
                        if(hDiff==height-heightatRepeat&&cDiff==countOfLandedRocks-rockCountAtRepeat){
                            repeatFound=true
                            break
                        }
                        hDiff=height-heightatRepeat
                        cDiff=countOfLandedRocks-rockCountAtRepeat
                        console.log({height,countOfLandedRocks,hDiff,cDiff});
                        heightatRepeat= height
                        rockCountAtRepeat=countOfLandedRocks
                    }
                    //
                    let windDir=1
                    if(windPattern[windCount%patternLen]=='<'){
                        windDir=-1
                    }
                    let nextCoords = currentRock
                    .map(([x,y])=>[x+windDir,y])
                    if(movementPossible(nextCoords,landedRocksCoordsAsStrings)){
                        currentRock= nextCoords
                    }
                    // console.log(currentRock);
                    windCount= (windCount+1)%patternLen
                    let droppedCoords=currentRock.map(([x,y])=>[x,y-1])
                    if(movementPossible(droppedCoords,landedRocksCoordsAsStrings)){
                        currentRock= droppedCoords
                        // console.log(currentRock);
                    }else{
                        currentRock.forEach(coord=>{
                        landedRocksCoordsAsStrings.push(coord.toString())
                        })
                        break
                    }
                    
                    limit--
                }
                if(repeatFound){
                    break
                }
                let landedHeight= Math.max(...currentRock.map(([x,y])=>y))
                // console.log( {landedHeight,height});
                if(landedHeight+1>=height){
                    height= landedHeight+1
                }
                // console.log(landedRocksCoordsAsStrings);
                countOfLandedRocks++
            }
            let remaining= maxRocks-countOfLandedRocks
            let loops= Math.floor(remaining/cDiff)
            remaining=remaining%cDiff
            let leftoverHeight= solve(windPattern,countOfLandedRocks+remaining)-height
            let ans = height+loops*hDiff+ leftoverHeight
            return {height,hDiff,cDiff, countOfLandedRocks, loops, remaining, ans}
}

const ans2= solve2(input17)
console.log(ans2);
        
        
        