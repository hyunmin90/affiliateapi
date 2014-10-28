var express = require('express');
var router = express.Router();

//파일 업로드를 위한 require
var formidable = require('formidable');
var fs =require('fs-extra');


/* GET home page. */
router.get('/', function(req, res) {
  
	res.json("welcom to Membership JSON");

});




/*
#벳지를 가진 맴버들을 받아온다
#doamin : manage.daumtools.com
#path : GET /member/badge/show_member_badge
#req : N/A
#res : 뱃지를 보유한 맴버들 데이터베이스 리턴 
*/

router.get('/show_member_badge',function(req,res){

var query = dbcon.query('SELECT * FROM membership_members JOIN member_badge_grant AS m ON (member_members.id = m.member_id) JOIN member_badges ON (m.badge_id = member_badges.id) ORDER BY m.member_id DESC',function(err,rows){
	console.log(rows);
	res.json(rows);
	});
	




});


/*
#Member INFO
#doamin : manage.daumtools.com
#path : GET /member/badge/grant_badge_based_api
#req : N/A
#res : Member Information
*/
router.get('/grant_badge_based_api',function(req,res){



});

/*
#젯지의 종류를 보여준다 
#doamin : manage.daumtools.com
#path : GET /member/badge/show_badgelist
#req : N/A
#res : 벳지의 정보를 보여준다 
*/

router.get('/show_badgelist',function(req,res){



var query = dbcon.query('SELECT id, name, getprocess, description, status, scarcity FROM membership_badges',function(err,rows){
	console.log(rows);
	res.json(rows);
	});


});

/*
#Member INFO
#doamin : manage.daumtools.com
#path : GET /member/badge/insert_badge
#req : N/A
#res : Member Information
*/
router.get('/insert_badge',function(req,res){




var name= req.query.name;
var description = req.query.description;
var getprocess = req.query.getprocess; 

var badge_info=[name,description,getprocess];



var query = dbcon.query('INSERT INTO membership_badges(name, description, getprocess) VALUES(?,?,?)',badge_info,function(err,rows){
	console.log(rows);
	res.json(rows);
	});



});
/*
#Member INFO
#doamin : manage.daumtools.com
#path : GET /member/badge/calcul_badge_scarcity
#req : N/A
#res : Member Information
*/
router.get('/calcul_badge_scarcity',function(err,res){
var count;
var numb = dbcon.query('SELECT count(userid) as cnt FROM membership_members', function(err,rows){
	console.log(rows);
	count=rows[0].cnt;
	console.log(count);


var query = dbcon.query('UPDATE membership_badges SET scarcity = (SELECT round(count(2)/?*100 ,2) FROM membership_badge_grant WHERE badge_id = 2) WHERE id =2',count,function(err,rows){
	console.log(rows);
	console.log(err);
	});
	
});
	
	
});





module.exports = router;