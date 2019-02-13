var express = require('express');
var router = express.Router();
var apiEmpresa = require('./api/empresa');

router.use('/empresa',apiEmpresa);

module.exports = router;