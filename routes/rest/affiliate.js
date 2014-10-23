var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  
	var query = dbcon.query('select * from api_affiliates LIMIT 0,1000',function(err,rows){
        console.log(rows);
        res.json(rows);
    });

});



//제휴 회사 및 담당자 정보 추가
router.get('/company',function(req,res){
var userId= req.query.userId;	
var contactName= req.query.contactName;
var contactLevel= req.query.contactLevel;
var contactEmail= req.query.contactEmail;
var contactPhone= req.query.contactPhone;


//ON SUCCESS OF SETTING COMPANY send 1
res.json({"success": "1"});


});





//제휴기능 신청 목록
router.get('/:userId/feature',function(req,res){
var userId = req.params.userId;	


res.json({"app": app, "feature":feature, "featureState":featureState });


});





//제휴기능 신청
router.get('/affiliate/:userId/feature/:featureId',function(req,res){
var userId = req.params.userId;	
var featureId = req.params.featureId;
var reason=req.query.reason;



res.json({"app": app, "feature":feature, "featureState":featureState });

});






//제휴관련 대화 조회(최근 30개만 보임)
router.get('/:userId/chat',function(req,res){
var userId = req.params.userId;	


res.json({"Sender": sender, "message":message, "messageType":messageType, "created":created });


});





//제휴관련 대화 전송
router.get('/chat',function(req,res){
var userId = req.query.userId;	
var message = req.query.message;
var attachFile=req.query.attachFile;
	
res.json({"Sender": sender, "message":message, "messageType":messageType, "created":created });
});


//사용자 멤버쉽 정보
router.get('/membership/:userId',function(req,res){
	var userId = req.params.userId;
	var level, badges;
	
	var query = dbcon.query('select grade, id from member_members where userid = ?', [userId], function(err,rows){
        console.log("grade : "+rows[0].grade);
        console.log("id : "+rows[0].id);
        level = rows[0].grade;
        query = dbcon.query('select badge_id from member_badge_grant where member_id = ?', [rows[0].id], function(err,rows){
	        console.log(rows);
	        rows.forEach(function(element, index, array){
	        	badges = badges + rows[index].badge_id;
	        	console.log(rows[index].badge_id);
	        });
	        //console.log(badges);
	        res.json({"level": level,"badges":badges});
    	});
    });
});

module.exports = router;