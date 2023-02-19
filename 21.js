const { test21, input21 } = require("./inputs20+");

function solve(input,num=6){
    let lines = input.split('\n')
    let declareNames= lines.map(str=>{
        return 'let '+ str.split(':')[0]
    }).join(';')+';'
    let equals= input.replace(/:/g,'=')
    let lineBreak= equals.replace(/\n/g,';\n')+';'
    let ans;
    // console.log(declareNames+';\n'+lineBreak+';\n ans= root')
    let evalStr= declareNames+lineBreak.repeat(num)+'; ans= root;'
    eval(evalStr)
    return ans
}

// console.log(solve(input21,100));

function solve2(input){
    let lines=input.split('\n')
    let rootLine= lines[0]
    let equation = input.replace(/:/g,'=').replace(/\n/g,',')

    let declareNames= lines.map(str=>{
        return 'let '+ str.split(':')[0]
    }).join(';')+';'
    let equals= input.replace(/:/g,'=')
    let rootEquality= equals.replace(/\+(?<=root.+)/,'==')
    // console.log(rootEquality);
    let lineBreak= rootEquality.replace(/\n/g,';\n')+';'
    lineBreak= lineBreak.replace(/humn=.+/,'')
    // console.log(lineBreak);
    let val= lineBreak.match(/.+(?<=root.+)/g)
    // console.log(val);
    let ans;
    // eval(declareNames+
    //     'console.log({humn})')
    // console.log(declareNames+';\n'+lineBreak+';\n ans= root')
    let evalStr= declareNames+`;
        humn=3678125407170;console.log(humn);
        while(
        (rpjn>=ghjl)
        ||!rpjn>0
        ){`+lineBreak+`;
        console.log({humn,root,rpjn,ghjl});
        if(rpjn)humn+=1
        ;}
        ; ans= humn;`
    eval(evalStr)
    return ans
}

function solve2v2(input,num=6){
    let lines = input.split('\n')
    let declareNames= lines.map(str=>{
        return 'let '+ str.split(':')[0]
    }).join(';')+';'
    let equals= input.replace(/:/g,'=')
    let lineBreak= equals.replace(/\n/g,';\n')+';'
    lineBreak= lineBreak.replace(/humn=.+/,'')
    let ans;
    let x;
    let y;
    // console.log(declareNames+';\n'+lineBreak+';\n ans= root')
    let evalStr= declareNames+'humn=3678125408017;'+lineBreak.repeat(num)+'; ans= root;x=rpjn;y=ghjl;'
    eval(evalStr)
    return {x,y,diff:x-y}
}

console.log(solve2v2(input21,100));