let ip=process.argv.slice(2);

let fs= require("fs");

let path= require("path");

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
        treefn(ip[1]);
        break;
    case "organize":
        organizefn(ip[1]);
        break;
        
    case "help":
        helpfn();
        break;        
    default:
        console.log("please input right command :)🙏");
        break;
}

function treefn(dirPath){
    let destpath;
    if(dirPath===undefined){
        console.log("Kindly Enter The Path...");
        return;
    }else{
      let doesexist =  fs.existsSync(dirPath);
      if(doesexist){
        tree_helper(dirPath);
        
      }else{
        console.log("Kindly Enter The Correct Path...");
        return;
      }
    }
    
}
function tree_helper(dirpath){
    
}


function organizefn(dirPath){
    let destpath;
    if(dirPath===undefined){
        console.log("Kindly Enter The Path...");
        return;
    }else{
      let doesexist =  fs.existsSync(dirPath);
      if(doesexist){
        destpath=  path.join(dirPath,"organized_files");
        if(fs.existsSync(destpath)===false){
            fs.mkdirSync(destpath);
        }
        
      }else{
        console.log("Kindly Enter The Correct Path...");
        return;
      }
    }
    organize_helper(dirPath,destpath);
}

function organize_helper(src,dest){
   let childname= fs.readdirSync(src);
//    console.log(childname);
   for(let i=0;i<childname.length ; i++){
     let childaddress =  path.join(src,childname[i]);
    let isfile= fs.lstatSync(childaddress).isFile();
    if(isfile){
        // console.log(childname[i]);
        let catagory=getCatagory(childname[i]);
        // console.log(childname[i]," --> belong to catagory ", catagory)
        sendFiles(childaddress,dest,catagory);

    }
   }

}
function sendFiles(srcfilePath,dest,catagory){
    let catagorypath = path.join(dest,catagory);
    if(fs.existsSync(catagorypath)===false){
        fs.mkdirSync(catagorypath);
    }
    let filename=path.basename(srcfilePath);
    let destfilepath=path.join(catagorypath,filename);
    fs.copyFileSync(srcfilePath,destfilepath);
    fs.unlinkSync(srcfilePath);
    console.log(filename," copied to ",catagory);

}

function getCatagory(name){
   let ext= path.extname(name);
   //console.log(ext);
   ext=ext.slice(1);
   for(let type in types){
       let ctypearr=types[type]; 
       for(let i=0;i<ctypearr.length;i++){
           if(ext===ctypearr[i]){
               return type;
           }
       }
   }
   return "others";
}


function helpfn(){
    console.log(`list of all the command:
                        node input.js tree "directoryPath"
                        node input.js organize  "directoryPath"
                        node input.js help
    `);
}




