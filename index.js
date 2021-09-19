#!/usr/bin/env node

const seedrandom = require("seedrandom");
const yargs = require("yargs");

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "number", describe: "list length", type: "number", demandOption: true })
    .option("s", { alias: "seed", describe: "random generator seed for reproducability", type: "string" })
    .argv;

function seedRandList(n,seed){
    const num = +n;
    if (isNaN(num)) {
        throw "n parameter is not a number"
    }
    if (typeof seed === 'undefined') {
        const arr = Array(num).fill().map((d,i)=>{
            return Math.floor(Math.random() * 1000);
        });
        return arr;
    } else {
        const arr = Array(num).fill().map((d,i)=>{
            const gen = new seedrandom(`${seed}${i}`);
            return Math.round(gen() * 1000);
        });
        return arr;
    }    
}    

const randList = seedRandList(options.number,options.seed)

randList.map(d=>console.log(d));

