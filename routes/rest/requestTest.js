(function() {

	var express = require('express');
	var router = express.Router();
	var request = require('request');
	var url = require('url');
	var userId, message, attachFile;

	var formidable = require('formidable');
	var fs =require('fs-extra')

	router.get('/', function(req, res) {
		//res.render('/test');
		request( {
			method: 'POST',
			url: 'http://172.16.11.2:3001/rest/affiliate/chat',
			form: {
				userId: "12",
				message: "123",
				attachFile: "1234",
			}
		}, function(err, response) {
			var value = {"response":response};
			res.send(JSON.stringify(value));
		});
	});

	router.get('/uploadFile', function(req, res) {
		res.render('test', {title: 'upload'});
	});

	router.post('/upload', function(req, res) {
		var form = new formidable.IncomingForm();
	    form.uploadDir = "./attachFiles";
	    form.keepExtensions = true;

	    form.parse(req, function(err, fields, files) {
	        //TESTING
	        console.log("file size: "+JSON.stringify(files.fileUploaded.size));
	        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
	        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
	        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
	        console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

	        //Formidable은 파일 이름을 바꾸기 때문에, 원래의 이름으로 돌리는 작업을 아래에서 수행한다.
	        fs.rename(files.fileUploaded.path, './attachFiles/'+files.fileUploaded.name, function(err) {
	        if (err)
	            throw err;
	          console.log('renamed complete');
	        });
	        res.jsonp({"fileName":files.fileUploaded.name});
	    });
	});
	module.exports = router;
}).call(this);