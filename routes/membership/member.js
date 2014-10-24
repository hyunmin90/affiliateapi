var express = require('express');
var router = express.Router();

//파일 업로드를 위한 require
var formidable = require('formidable');
var fs =require('fs-extra');




/* GET home page. */
router.get('/', function(req, res) {
  
	var query = dbcon.query('select * from api_affiliates LIMIT 0,1000',function(err,rows){
        console.log(rows);
        res.json(rows);
    });

});


router.get('/show_member',function(req,res){

var query = dbcon.query('SELECT * FROM member_members ORDER BY createdate DESC',function(err,rows){
	console.log(rows);
	res.json(rows);
	});




});

router.get('/calcul_point_grade',function(req,res){






});

router.get('/insert_from_api',function(req,res){






});
module.exports = router;
