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


router.get('/show_member_badge',function(req,res){

var query = dbcon.query('SELECT * FROM member_members JOIN member_badge_grant AS m ON (member_members.id = m.member_id) JOIN member_badges ON (m.badge_id = member_badges.id) ORDER BY m.member_id DESC',function(err,rows){
	console.log(rows);
	res.json(rows);
	});
	




});

router.get('/grant_badge_based_api',function(req,res){



});



router.get('/show_badgelist',function(req,res){



var query = dbcon.query('SELECT id, name, getprocess, description, status, scarcity FROM member_badges',function(err,rows){
	console.log(rows);
	res.json(rows);
	});


});




router.get('/insert_badge_form',function(req,res){



});

router.get('/insert_badge',function(req,res){



});

router.get('/calcul_badge_scarcity',function(req,res){



});


module.exports = router;