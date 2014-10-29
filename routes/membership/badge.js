var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  
	res.jsonp("welcom to Membership JSON");

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
	res.jsonp(rows);
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

	//1000일 사이에서 api를 발급받은 횟수를 통해 뱃지를 발급한다.
	//아래 질의는 시간 사이에 발급받은 API수와 ID를 출력한다.
	
	/*
	var query = dbcon.query("SELECT id, count from membership_members as k natural join (SELECT distinct userid, count(*)  as count  FROM api_key  WHERE issuedate BETWEEN DATE_ADD(CURDATE(), INTERVAL -1000 day) AND CURDATE() group by userid) as t",function(err,rows){
	*/
	
	var userid, count;
	var query = dbcon.query("SELECT id from membership_members",function(err,rows){
		if(err) throw err;
		else
		{
			rows.forEach(function(element, index, array){
				userid = rows[index].id;
				dbcon.query("SELECT count(*) as count, userid from api_key where userid= ?", [userid], function(err,rows){
					if(err) throw err;
					else{
						count = rows[0].count;
						userid = rows[0].userid;
						if(count!=0){
							console.log(count+"/"+userid);
							if(count>=1)
								granted_helper(userid,2)
							if(count>=3)
								granted_helper(userid,3)
							if(count>=5)
								granted_helper(userid,4)
						}
					}
				});
			});
			res.jsonp({"id":userid, "count":count});
		}
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
		res.jsonp(rows);
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
	res.jsonp(rows);
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

function granted_helper(member_id, badgeNumber) //지금 부여하려는 벳지가 유저가 보유하고 있는지 확인한다
{
	var temp = [member_id, badgeNumber];
	var nestedTemp = [badgeNumber,getDateTime(),member_id];
	var query = dbcon.query("SELECT member_id from membership_badge_grant where member_id=? and badge_id=?", temp, function(err,rows){
		if(err) throw err;
		else{
			if(rows.length == 0){
				var query = dbcon.query("INSERT INTO membership_badge_grant(badge_id,grantdate,member_id) VALUES(?,?,?)", nestedTemp, function(err,rows){
					if(err) throw err;
					if(rows.affectedRows==0) throw err;
				});
			}
		}
	});
}

/*
function count_frequency_helper(userid, table) //특정 테이블의 유저가 활동한 빈번도 확인 헬퍼 
{
	var query = dbcon.query("SELECT count(*) as count, userid from "+table+" where userid= ?", [userid], function(err,rows){
		console.log(rows);
		if(err) throw err;
		return rows[0].count;
	});
}


function has_granted_helper(member_id,badge) //지금 부여하려는 벳지가 유저가 보유하고 있는지 확인한다
{
	console.log("-0");
	var temp = [member_id,badge];
	var query = dbcon.query("SELECT member_id from membership_badge_grant where member_id=? and badge_id=?", temp, function(err,rows){
		if(err) throw err;
		else{
			console.log("-1");
			if(rows.length == 0)
				return false;
			else 
				return true;
		}
	});
	console.log("-2");
}

function badge_grant_helper(badgeNumber,userid)//뱃지 부여 통합 헬퍼 함수 
{
	console.log("--0");
	var temp = [badgeNumber,getDateTime(),userid];

	var query = dbcon.query("INSERT INTO membership_badge_grant(badge_id,grantdate,member_id) VALUES(?,?,?,)", temp, function(err,rows){
		if(err) throw err;
		else{
			console.log("--1");
			//.log("badge_grant_helper");
			return row.affectedRows;
		}
	});
}*/
module.exports = router;