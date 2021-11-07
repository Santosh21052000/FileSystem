let fs= require("fs");

let path= require("path");

function organizefn(dirPath){
    let destpath;
    if(dirPath===undefined){
        destpath=process.cwd();
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
module.exports = {
    organizeKey: organizefn
}