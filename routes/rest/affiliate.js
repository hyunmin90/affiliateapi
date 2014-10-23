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





/*
#제휴기능 신청
#doamin : manage.daumtools.com
#path : POST /rest/affiliate/affiliate/{userId}/feature/{featureId}?reason={reason}
#req : userId, featureId, reason
#res : list[app, feature, featureState]
*/
router.post('/affiliate/:userId/feature/:featureId',function(req,res){
    var userId = req.body.userId;	
    var featureId = req.body.featureId;
    var reason=req.body.reason;

    var query = dbcon.query('INSERT INTO api_affiliates(company_contact_name,company_contact_email,company_contact_phone,company_name) VALUES(?,?,?,?)',post, function(err,rows){
            console.log(rows);
            console.log(err);
            console.log(query);
            res.json(rows);
        });
    res.json({"app": app, "feature":feature, "featureState":featureState });
});

/*
#제휴관련 대화 조회(최근 30개만 보임)
#doamin : manage.daumtools.com
#path : GET /rest/affiliate/{userId}/chat
#req : userId
#res : list[Sender, message, messageType, created]
*/

//TODO : Sender 가 누구를 말하는지 messageType과 차이점? 
router.get('/:userId/chat',function(req,res){
    var userId = req.params.userId;
    console.log(userId);
    var query = dbcon.query('select comment, level, updatedate from api_affiliates_comment where userid = ? limit 30',[userId] ,function(err,rows){
        console.log(rows);
        res.json({"Sender": userId, "data" : rows});
    });
});

/*
#제휴관련 대화 전송
#doamin : manage.daumtools.com
#path : POST /rest/affiliate/chat?userId={userId}&message={message}&attachFile={attachFile}
#req : userId, message, attachFile
#res : list[Sender, message, messageType, created]
*/
router.post('/chat',function(req,res){
    var userId = req.body.userId;
    var message = req.body.message;
    var attachFile = req.body.attachFile;
    var query = dbcon.query('insert userid, message, attachFile from api_affiliates_comment', function(err,rows){
        query = dbcon.query('select Sender, message, messageType, created from api_affiliates_comment where member_id = ? order by badge_id;', function(err,rows){
            res.json({"Sender": rows[0].Sender, "message": rows[0].message,"messageType": rows[0].messageType,"created": rows[0].created});
        });
    });

    res.json({"Sender": sender, "message":message, "messageType":messageType, "created":created });
});

/*
#사용자 멤버쉽 정보
#doamin : manage.daumtools.com
#path : GET /rest/membership/{userId}
#req : userId
#res : level, badges
*/
router.get('/membership/:userId',function(req,res){
	var userId = req.params.userId;
    var badges = new Array();
	var level;
	var query = dbcon.query('select grade, id from member_members where userid = ?', [userId], function(err,rows){
        console.log("grade : "+rows[0].grade);
        console.log("id : "+rows[0].id);
        level = rows[0].grade;
        query = dbcon.query('select badge_id from member_badge_grant where member_id = ? order by badge_id;', [rows[0].id], function(err,rows){
	        console.log(rows);
	        rows.forEach(function(element, index, array){
	        	badges.push(rows[index].badge_id);
	        	console.log(rows[index].badge_id);
	        });
	        console.log(badges);
	        res.json({"level": level,"badges":badges});
    	});
    });
});

module.exports = router;