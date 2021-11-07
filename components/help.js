let fs= require("fs");

let path= require("path");

function helpfn(){
    console.log(`list of all the command:
                        node input.js tree "directoryPath"
                        node input.js organize  "directoryPath"
                        node input.js help
    `);
}

module.exports={
    helpKey: helpfn
}