var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

var fileModel = require('./jsonmodel');
var info = null;

var empresaInfo={
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
    _empresaInfo.rtn = uuidv4();

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

router.put('/change/:rtn',function(req,res,next){
    var rtn = req.params.rtn;
    var _empresaChange= req.body;
    var _empresaUpdated = null;
    var newInfo = info.map(
        function(doc,i){
            if(doc.rtn == rtn){
                _empresaUpdated = Object.assign(
                    {},
                    doc,
                    _empresaChange
                );
                return _empresaUpdated
            }
            return doc;
        }
    );
    info = newInfo;
    fileModel.write(info, function(err){
        if(err){
            console.log(err);
            return res.status(500).json({'error':'It´s Dead'});
        }
        return res.status(200).json(_empresaUpdated);
    });
});

router.delete('/delete/:rtn', function(req,res,next){
        var rtn = req.params.rtn;
        var newInfo = info.filter(
            function(doc,i){
                if(doc.rtn == rtn){
                    return false;
                }
                return true;
            }
        );
        info = newInfo;
        fileModel.write(info, function(err){
            if(err){
                console.log(err);
                return res.status(500).json({'error':'It´s Dead'});
            }
            return res.status(200).json({'Se elimino':rtn});
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