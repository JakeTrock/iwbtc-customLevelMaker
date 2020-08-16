var http = require('http');
const fs = require('fs');
var express = require('express');
var app = express();
var path=require('path');
var bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
var jsonParser = bodyParser.json();
var fnm=1;
var out;
app.post("/submit", jsonParser, function(req, res){
out="var lob={startPosition: "+req.body.strt+",objects : [";
if(req.body.sblk){
out+="{image: 1,blocking: true,position: [ "+cmb(req.body.sblk)+"]},";
}
if(req.body.blk){
out+="{image: 3,blocking: true,position: ["+cmb(req.body.blk)+"]},";
}
if(req.body.srt){
out+="{image: 'spikeRight',killing: false,position: ["+cmb(req.body.srt)+"]},";
}
if(req.body.slft){
out+="{image: 'spikeLeft',killing: true,position: ["+cmb(req.body.slft)+"]},";
}
if(req.body.sd){
out+="{image: 'spikeDown',killing: true,position: ["+cmb(req.body.sd)+"]},";
}
if(req.body.su){
out+="{trigger: spawnSpike,shape: new Line(0, 0, 32, 0),position: ["+cmb(req.body.su)+"]},";
}
if(req.body.enem){
out+="{id: 'bottomApple',image: 'apple',killing: true,position: ["+cmb(req.body.enem)+"]},";
}
out+="{id: 'saveState1',trigger: nextLevel,position: "+req.body.end+",image: 'blueOrb',}]}";
  fs.readdir("./public/levels/tf/", (err, files) => {
      files.forEach(file => {
        if(file.substring(0,file.length-3)>fnm)fnm=file.substring(0,file.length-3);
      });
    fwr();
  });
  res.send("s");
});
function fwr(){
  fs.createWriteStream("./public/levels/tf/"+(Number(fnm)+1)+".js");
  fs.writeFile("./public/levels/tf/"+(Number(fnm)+1)+".js", out, function(err) {if(err){return console.log(err);}});
}
function cmb(tar){
  var tm="";
    for(var i=0;i<tar.length;i++){
      tm=tm+(tar[i]+", ");
    }
  return tm;
}
app.listen(6060);
