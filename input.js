#!/usr/bin/env node

//global karne ke liye shebang syntax for node js(koi bhi chiz command line ke andar daaln ke liye matlab help, tree ko cmd prompt mein bhi run kar sakte hai)

// we an run in commmand prompt
//  peppy help
//  peppy tree


let ip=process.argv.slice(2);

let fs= require("fs");

let path= require("path");

let helpObj = require("./components/help");
let treeObj = require("./components/tree");
let organizeObj = require("./components/organize");

console.log(ip);

let command=ip[0];

let types = {
    media: ["mp4", "mkv","iso",'wav','odt','plt'],
    archives: ['zip','c','py', '7z', 'rar', 'tar', 'gz', 'ar', , "xz",'asm','gif','java','cpp'],
    documents: ['docx','csv','jpg','jpeg','png', 'doc', 'pptx','pdf', 'xlsx', 'xls', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex','m'],
    app: ['exe', 'dmg', 'pkg', "deb",'jar']
}

switch(command){
    case "tree":
        treeObj.treeKey(ip[1]);
        break;
    case "organize":
        organizeObj.organizeKey(ip[1]);
        break;
        
    case "help":
        helpObj.helpKey();
        break;        
    default:
        console.log("please input right command :)🙏");
        break;
}








