const { test19, input19 } = require("./inputs14+");

function sum(array){
    return array.reduce((a,b)=>a+b,0)
}

function parseBlueptins(input){
    const blueprintStrings = input.split('Blueprint')
    const nums = blueprintStrings.map(line=>{
        return line.match(/\d+/g)
    }).filter(x=>x)
    const blueprints= nums.map((numsAsStrings)=>{
        let [num,ore_ore,clay_ore,obs_ore,obs_clay,geo_ore,geo_obs]= numsAsStrings.map(str=>parseInt(str))
        return {
            oreBot:{ore:ore_ore,clay:0,obs:0,geo:0}
            ,clayBot:{ore:clay_ore,clay:0,obs:0,geo:0}
            ,obsBot:{ore:obs_ore,clay:obs_clay,obs:0,geo:0}
            ,geoBot:{ore:geo_ore,clay:0,obs:geo_obs,geo:0}
        }
    })
    return blueprints
}

const blueprints= parseBlueptins(input19)
const testBlueprints= parseBlueptins(test19)
// console.log(testBlueprints);

function createBotOuter(oreType,blueprint,bots,ores){
        let oresCopy={...ores}
        let costs = blueprint[oreType+'Bot']
        for( const key in ores){
            oresCopy[key]-=costs[key]
            if (oresCopy[key]<0){
                return false
            }
        }
        for( const key in ores){
            ores[key]= oresCopy[key]
        }
        bots[oreType]++
        return true
}

function findNumOfGeodes(blueprint,minutes=24){
    let bots={ore:1,clay:0,obs:0,geo:0}
    let ores={ore:0,clay:0,obs:0,geo:0}
    function createBot(oreType){
        return createBotOuter(oreType,blueprint,bots,ores)
    }
    
    function nextMin(){
        for(const orename in ores){
            ores[orename]+= bots[orename]
        }
        createBot('geo')
        for(const orename in ores){if(bots[orename]<1){createBot(orename)}}
    }
    while(minutes>0){
        nextMin()
        minutes--
        // console.log({bots,ores});
    }
    
    return ores.geo
}

function solve(blueprints,minutes){
    let sum =0
    blueprints.forEach((blueprint,i) => {
        let quality= findNumOfGeodes(blueprint,minutes)*(i+1)
        sum+=quality
    });
    return sum
}

const num = findNumOfGeodes(testBlueprints[0])
console.log(num);

// let result = solve(testBlueprints,5)

// console.log(result);


/////////////////////////////
/*

const RE = /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./;

// prettier-ignore
const parseBlueprints = input =>
  input
    .split("\n")
    .map(line => RE.exec(line))
    .map(([, ...num]) => num.map(Number))
    .map(
      ([ , ore, clay, obs_ore, obs_clay, geode_ore, geode_obs,
      ]) =>
        [
          [ore, 0, 0, 0],
          [clay, 0, 0, 0],
          [obs_ore, obs_clay, 0, 0],
          [geode_ore, 0, geode_obs, 0],
        ].map(cost => cost.reduce((r, u, k) => r | (u << (k * 6))))
    );

const newBlueprint= parseBlueprints(input19) 
// console.log( newBlueprint);
const [ORE, CLAY, OBSIDIAN, GEODE] = [0, 1, 2, 3];
const TYPES = [ORE, CLAY, OBSIDIAN, GEODE];
const ROBOT = TYPES.map(v => 1 << (v * 6));
const MASKS = TYPES.map(i => 0x3f << (i * 6));
const [MASK_ORE, MASK_CLAY, MASK_OBS, MASK_GEODE] = MASKS;
console.log( {MASKS,
ROBOT});

*/
