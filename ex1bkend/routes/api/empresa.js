var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

var fileModel = require('./jsonmodel');
var info = null;

var videoInfo={
    '_id' : '',
    'rtn' : '',
    'empresa' : '',
    'rubro' : '',
    'direccion' : '',
    'telefono' : ''
};

router.get('/', function(req,res,next){
    if(!info){
        fileModel.read(function(err,fileinfo){
            if(err){
                console.log(err);
                info=[];
                return res.status(200).json(info);
            }
            info = JSON.parse(fileinfo);
            return res.status(200).json(info);
        });
    }else{
        return res.status(200).json(info);
    }
});



fileModel.read(function(err , fileinfo){
    if(err){
      console.log(err);
    } else{
      info = JSON.parse(fileinfo);
    }
  });
  
module.exports = router;