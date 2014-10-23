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

var userid= req.query.userid;	
var contactName= req.query.contactName;
var contactLevel= req.query.contactLevel;
var contactEmail= req.query.contactEmail;
var contactPhone= req.query.contactPhone;
var companyname=req.query.companyname;


var post=[contactName,contactEmail,contactPhone,companyname];

var query = dbcon.query('INSERT INTO api_affiliates(company_contact_name,company_contact_email,company_contact_phone,company_name) VALUES(?,?,?,?)',post, function(err,rows){
        console.log(rows);
        console.log(err);
        console.log(query);
        res.json(rows);
    });





//ON SUCCESS OF SETTING COMPANY send 1
//res.json({"success": "1"});


});





//제휴기능 신청 목록
router.get('/:userId/feature',function(req,res){
var userId = req.params.userId;	


	var query = dbcon.query('select service_url,service_desc,status from api_affiliates where company_contact_name= ?',userId, function(err,rows){
        console.log(rows);
        res.json(rows);
    });



/*res.json({"app": app, "feature":feature, "featureState":featureState });*/


});





//제휴기능 신청
router.get('/affiliate/:userId/feature/:featureId',function(req,res){
var userId = req.params.userId;	
var featureId = req.params.featureId;
var reason=req.query.reason;




var post=[userId,featureId,reason];

var query = dbcon.query('INSERT INTO api_affiliates(company_contact_name,company_contact_email,company_contact_phone,company_name) VALUES(?,?,?,?)',post, function(err,rows){
        console.log(rows);
        console.log(err);
        console.log(query);
        res.json(rows);
    });




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


res.json({"level": level, "badges":badges});
});




module.exports = router;