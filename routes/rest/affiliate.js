var express = require('express');
var router = express.Router();

//파일 업로드를 위한 require
var formidable = require('formidable');
var fs =require('fs-extra')

/* GET home page. */
router.get('/', function(req, res) {
  
	var query = dbcon.query('select * from api_affiliates LIMIT 0,1000',function(err,rows){
        console.log(rows);
        res.jsonp(rows);
    });

});


/*
#제휴 회사 및 담당자 정보 추가
#doamin : manage.daumtools.com
#path : POST /rest/affiliate/company?userid={userid}&link={link}&contactName={contactName}&contactLevel={contactLevel}&contactEmail={contactEmail}&contactPhone={contactPhone}
#req : userId,link,contactName,contactLevel,contactEmail,contactPhone
#res : changed company info 
*/
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
        res.jsonp(rows);
    });





//ON SUCCESS OF SETTING COMPANY send 1
//res.jsonp({"success": "1"});


});


/*
#제휴기능 신청 목록
#doamin : manage.daumtools.comh/affiliate/{userId}/feature
#req : userId
#res : list[app, feature, featureState]
*/

router.get('/:userId/feature',function(req,res){
var userId = req.params.userId;	

	var query = dbcon.query('select company_contact_name,company_contact_email,affiliate_type,company_number,service_url,service_desc,status from api_affiliates where userId= ?',userId, function(err,rows){
        console.log(rows);
        res.jsonp(rows);
    });

/*res.jsonp({"app": app, "feature":feature, "featureState":featureState });*/

});


/*
#제휴기능 신청
#doamin : manage.daumtools.com
#path : POST /rest/affiliate/affiliate/{userId}/feature/{featureId}?reason={reason}
#req : userId, featureId, reason
#res : list[app, feature, featureState]
*/
router.post('/affiliate/:userId/feature/:featureId',function(req,res){
    var userId = req.params.userId;	
    var featureId = req.params.featureId;
    var reason=req.body.reason;
    var post=[userId,featureId,reason];

    var query = dbcon.query('INSERT INTO api_affiliates(company_contact_name,company_contact_email,company_contact_phone,company_name) VALUES(?,?,?,?)',post, function(err,rows){
            console.log(rows);
            console.log(err);
            console.log(query);
            res.jsonp({"app": app, "feature":feature, "featureState":featureState });
        });
});

/*
#제휴관련 대화 조회(최근 30개만 보임)
#doamin : manage.daumtools.com
#path : GET /rest/affiliate/{userId}/chat
#req : userId
#res : list[Sender, message, messageType, created]
*/
//TODO : Sender - 보낸 사람,  messageType - 메세지가 시스템적인 메세지인지, 개인이 입력 메세지 인지 
router.get('/:userId/chat',function(req,res){
    var userId = req.params.userId;
    console.log(userId);
    var query = dbcon.query('select comment, level, updatedate from api_affiliates_comment where userid = ? limit 30',[userId] ,function(err,rows){
        console.log(rows);
        res.jsonp({"userId": userId, "data" : rows});
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

    fileUpload(req);//병령로 수행되며, 파일저장이름은 본파일 이름과 같고 덮어쓰기 된다.
    var userId = req.body.userId;
    var message = req.body.message;
    var attachFile = req.body.attachFile;
    console.log(userId+"/"+message+"/"+attachFile);
    var query = dbcon.query('insert userid, message, attachFile from api_affiliates_comment', function(err,rows){
        query = dbcon.query('select Sender, message, messageType, created from api_affiliates_comment where member_id = ? order by badge_id;', function(err,rows){
            res.jsonp({"Sender": rows[0].Sender, "message": rows[0].message,"messageType": rows[0].messageType,"created": rows[0].created});
        });
    });
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
	var query = dbcon.query('select grade, id from membership_members where userid = ?', [userId], function(err,rows){
        
        if(err) throw err;
        if(rows.length == 0){
            res.jsonp({"Error": "No such a User" });
            return;
        }
        console.log("grade : "+rows[0].grade);
        console.log("id : "+rows[0].id);
        level = rows[0].grade;
        query = dbcon.query('select badge_id from membership_badge_grant where member_id = ? order by badge_id;', [rows[0].id], function(err,rows){
	        rows.forEach(function(element, index, array){
	        	badges.push(rows[index].badge_id);
	        	console.log(rows[index].badge_id);
	        });
	        res.jsonp({"level": level,"badges":badges});
    	});
    });
});

function fileUpload(req) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./attachFiles";
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        console.log("file size: "+JSON.stringify(files.fileUploaded.size));
        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

        //Formidable은 파일 이름을 바꾸기 때문에, 원래의 이름으로 돌리는 작업을 아래에서 수행한다.
        fs.rename(files.fileUploaded.path, './attachFiles/'+files.fileUploaded.name, function(err) {
        if (err) throw err;
        console.log('renamed complete');
        });
    });
}

module.exports = router;