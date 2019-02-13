var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

var fileModel = require('./jsonmodel');
var info = null;

var empresaInfo={
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


router.post('/new', function(req,res,next){
    var _empresaInfo = Object.assign({},empresaInfo,req.body);
    _empresaInfo._id = uuidv4();

    if(!info){
        info =[];
    }
    info.push(_empresaInfo);
    fileModel.write(info, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'It´s Dead'});
        }
        return res.status(200).json(_empresaInfo);
    });
});


fileModel.read(function(err , fileinfo){
    if(err){
      console.log(err);
    } else{
      info = JSON.parse(fileinfo);
    }
  });
  
module.exports = router;