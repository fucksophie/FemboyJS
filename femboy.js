const fs = require("fs");
const readline = require('readline');

if(process.argv.length == 3) {
    eval(parse(fs.readFileSync(process.argv[2]).toString()))
} else {
    console.log("FemboyJS REPL!")

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.prompt()

    rl.on('line', (input) => {
        try {
            eval(parse(input))
        } catch (error) {
            console.log(`Experienced "${error}" on trying to run`)
            console.log(parse(input))            
        }
        
        rl.prompt()
    });
}

function parse(result) {
    // parse thigh's uwu, to function
    result = result.replace(/thigh (.*)\((.*)\) {\n/gm, "async function $1($2) {\n");

    // parse go's (arrow functions)
    result = result.replace(/ go /gm, `=>`)

    // parse fems uwu, to let variable
    result = result.replace(/fem (.*) = /gm, "let $1 = ");
    
    // parse heels, to foreach
    result = result.replace(/\.heels\(/gm, ".forEach(");

    // parse nyaa's, to console.log
    result = result.replace(/nyaa (.*)$/gm, `console.log($1)`);
    
    // parse huff, to push
    result = result.replace(/\.huff\(/gm, ".push(");

    // parse thigh requires
    result = result.replace(/om (.*\.thigh.)/gm, `eval(parse(fs.readFileSync($1).toString()))`);
    
    // parse normal requires
    result = result.replace(/om (((?!\.thigh).)*)$/gm,  `require($1)`);

    return result;
}
