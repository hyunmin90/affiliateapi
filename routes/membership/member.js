(function() {
	var express = require('express');
	var router = express.Router();

	router.get('/', function(req, res) {
		res.json("welcom to Membership JSON");
	});

	/*
	#맴버 리스트를 받아온다.
	#doamin : manage.daumtools.com
	#path : POST /member/member/show_member
	#req : N/A
	#res : Member Information
	*/
	router.get('/show_member',function(req,res){

	var query = dbcon.query('SELECT * FROM membership_members ORDER BY createdate DESC',function(err,rows){
		console.log(rows);
		res.json(rows);
		});

<<<<<<< HEAD

});


=======
	});



	/*
	#Member INFO
	#doamin : manage.daumtools.com
	#path : POST /member/member/calcul_point_grade
	#req : N/A
	#res : Member Information
	*/
	router.get('/calcul_point_grade',function(req,res){

		/*
			$userlist = $this->model_load_model("dnaver/member_model")->show_member()->result();

			    foreach($userlist as $u)
			    {
			      $id = $u->id;
			      $yesterday = date("Y-m-d",strtotime("-1 days"));

			      $Query = "UPDATE member_members SET point=point+
			                      (SELECT ifnull(SUM(total),0)
			                       FROM
			                        (SELECT

			                          (SELECT COUNT(board_id)*member_boards.weight
			                           FROM member_board_activity
			                           WHERE member_board_activity.board_id = member_boards.id
			                           AND member_id = ?
			                           AND date_format(writedate,'%Y-%m-%d') >= ?
			                          ) as total

			                         FROM member_boards
			                        ) AS M
			                      )
			               WHERE id = ?";

			               //duraboys 라는 회원이 게시한 글을 boardid로 나누어 가중치를 주어 계산하는 질의
			               /*
			              SELECT

			              (SELECT COUNT(boardid)*member_boards.weight
			                FROM member_board_activity
			                WHERE member_board_activity.boardid = member_boards.boardid
			                AND userid = 'duraboys'
			              ) as total,
			              member_boards.boardid as id

			              FROM member_boards
							*//*
               

			      $array = array($id,$yesterday,$id);
			      $this->openapi_db->query($Query,$array);
			    }
		*/

	});
>>>>>>> d47f51319f9f99da99848fc498ffd6784e8e286f


	/*
	#Member INFO
	#doamin : manage.daumtools.com
	#path : POST /member/member/insert_from_api
	#req : N/A
	#res : Member Information
	*/
	router.get('/insert_from_api',function(req,res){

var query = dbcon.query('INSERT INTO membership_members(userid,createdate,joinpath,point) SELECT DISTINCT userid,(SELECT issuedate FROM api_key AS B WHERE B.userid = api_key.userid ORDER BY issuedate LIMIT 1) AS createdate,"openapi",10 FROM api_key WHERE issuedate > ifnull((SELECT createdate FROM membership_members WHERE joinpath = "openapi" ORDER BY createdate DESC LIMIT 1),date(0000-00-00))AND userid NOT IN (SELECT userid FROM membership_members )',function(err,rows){
	console.log(rows);
	console.log(err);
	res.json(rows);
	});




	});
	module.exports = router;
}).call(this);
