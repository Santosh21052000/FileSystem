let fs= require("fs");

let path= require("path");

function treefn(dirPath){
    if(dirPath===undefined){
        //  process.cwd();//jha par bhi script chalega usko process karne ke(jha run karnege wha ka path pick kar lega)
         tree_helper(process.cwd(),"");
        return;
    }else{
      let doesexist =  fs.existsSync(dirPath);
      if(doesexist){
        tree_helper(dirPath,"");
        
      }else{
        console.log("Kindly Enter The Correct Path...");
        return;
      }
    }
    
}
function tree_helper(dirpath,indentation){
    let isfile=fs.lstatSync(dirpath).isFile();
    if(isfile===true){
       let filename= path.basename(dirpath);
       console.log(indentation + "├──" + filename);
    }else{
        let dirName = path.basename(dirpath)
        console.log(indentation + "└──" + dirName);
        let childrens = fs.readdirSync(dirpath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirpath, childrens[i]);
            tree_helper(childPath, indentation+"\t");
        }
    }
}

module.exports = {
    treeKey: treefn
}