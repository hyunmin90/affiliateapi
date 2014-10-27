var express = require('express');
var router = express.Router();


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

	//getDateTime()
	var query = dbcon.query("SELECT id from member_members as k natural join (SELECT distinct userid, count(*)  as count  FROM api_key  WHERE issuedate BETWEEN DATE_ADD(CURDATE(), INTERVAL -1000 day) AND CURDATE() group by userid) as t",function(err,rows){
		console.log(rows);
		if(err) throw err;
		rows.forEach(function(element, index, array){

			var userid = rows[index].id;
			var count = ount_frequency_helper(userid, "api_key");

			if(count>=1)
				if(has_granted_helper(userid,2)==false)
					if(badge_grant_helper(2,userid)==0) res.json({"Error": "Insert Error" });

			if(count>=3)
				if(has_granted_helper(userid,3)==false)
					if(badge_grant_helper(3,userid)) res.json({"Error": "Insert Error" });
			if(count>=5)
				if(has_granted_helper(userid,5)==false)
					if(badge_grant_helper(4,userid)==0) res.json({"Error": "Insert Error" });
	    });

	    res.json({"success": "Insert success"});
	});
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

	var badge_info={'name' : name, 'description' : description, 'getprocess' : getprocess};
	var query = dbcon.query('INSERT INTO membership_badges set ?', badge_info, function(err,rows){
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
router.get('/calcul_badge_scarcity',function(req,res){

	var query = dbcon.query('UPDATE membership_badges'
	  	 		  +'SET scarcity = (SELECT round( count(badge_id)/? * 100 ,2) FROM membership_badge_grant WHERE badge_id = ?),'
				  +'used = (SELECT if(count(badge_id)=0,0,1) FROM member_badge_grant WHERE badge_id = ?)'
				  +'WHERE id = ?', function(err,rows){
		console.log(rows);
		res.json(rows);
		});
});

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

function count_frequency_helper(userid, table) //특정 테이블의 유저가 활동한 빈번도 확인 헬퍼 
{
	var temp = [userid,table];
	var query = dbcon.query("SELECT count(*) as count, userid from ? where userid=? group by userid order by count desc", temp, function(err,rows){
		console.log(rows);
		if(err) throw err;
		return rows[0].count;
	});
}

function has_granted_helper(member_id,badge) //지금 부여하려는 벳지가 유저가 보유하고 있는지 확인한다
{
	var temp = [member_id,badge];
	var query = dbcon.query("SELECT member_id from member_badge_grant where member_id=? and badge_id=?", temp, function(err,rows){
		console.log(rows);
		if(err) throw err;
		if(rows.length == 0)
			return false;
		else 
			return true;
	});
}

function badge_grant_helper(badgeNumber,userid) //뱃지 부여 통합 헬퍼 함수 
{
	var temp = [badgeNumber,getDateTime(),userid];

	var query = dbcon.query("INSERT INTO member_badge_grant(badge_id,grantdate,member_id) VALUES(?,?,?,)", temp, function(err,rows){
		console.log(rows);
		if(err) throw err;
		return row.affectedRows;
	});
}

module.exports = router;