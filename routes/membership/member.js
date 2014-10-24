var express = require('express');
var router = express.Router();

//파일 업로드를 위한 require
var formidable = require('formidable');
var fs =require('fs-extra');




/* GET home page. */
router.get('/', function(req, res) {
  


});

/*
#맴버 리스트를 받아온다.
#doamin : manage.daumtools.com
#path : POST /member/member/show_member
#req : N/A
#res : Member Information
*/
router.get('/show_member',function(req,res){

var query = dbcon.query('SELECT * FROM member_members ORDER BY createdate DESC',function(err,rows){
	console.log(rows);
	res.json(rows);
	});




});



/*
#Member INFO
#doamin : manage.daumtools.com
#path : POST /member/member/calcul_point_grade
#req : N/A
#res : Member Information
*/
router.get('/calcul_point_grade',function(req,res){






});


/*
#Member INFO
#doamin : manage.daumtools.com
#path : POST /member/member/insert_from_api
#req : N/A
#res : Member Information
*/
router.get('/insert_from_api',function(req,res){






});
module.exports = router;
