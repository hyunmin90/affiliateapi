var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	var query = dbcon.query('select * from api_key limit 2',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
	//res.json({ message: 'hooray! welcome to our api!' });
});

//Getting the list of vm
router.get('/vmlist/:account/:domainid',function(req,res){
	var requrl ="http://172.27.101.98:7979/client/api?command=listVirtualMachines&response=json&account="+req.params.account+"&domain="+req.params.domainid+"&listAll=true";

	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})
});


router.get('/vmstart/:vmid',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=startVirtualMachine&id="+req.params.vmid+"&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);
  		}
	})
});

router.get('/vmstop/:vmid',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=stopVirtualMachine&id="+req.params.vmid+"&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);
  		}
	})
});

router.get('/vmdestroy/:vmid',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=destroyVirtualMachine&id="+req.params.vmid+"&expunge=true&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})


});

router.get('/templateslist',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=listTemplates&response=json&listAll=true&templatefilter=all&account=admin";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body.listtemplatesresponse.count) ;// Print the body of response.
    		
    		var count =body.listtemplatesresponse.count;
    		var jsonret = [];
    		for(i=0;i<count;i++){
    			jsonret[i]=({id:body.listtemplatesresponse.template[i].id,name:body.listtemplatesresponse.template[i].name,ostypename:body.listtemplatesresponse.template[i].ostypename});
    		}
    		console.log(jsonret);
    		res.send(jsonret);
  		}
	})


});

router.get('/vmstatus/:jobid',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=queryAsyncJobResult&jobid="+req.params.jobid+"&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})


});


router.get('/accountinfo/:vmname',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=listAccounts&listAll=true&name="+req.params.vmname+"&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})


});




router.get('/serviceofferinglist',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=listServiceOffering&listAll=true&issystem=false&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})


});





router.get('/listvolumes/:account/:domainid',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=listVolumes&account="+req.params.account+"&domainid="+req.params.domainid+"&response=json";
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})


});



router.get('/vmdeploy/:zoneid/:account/:domainid/:templateid/:hypervisor/:serviceofferingid/:diskofferingid/:vmname',function(req,res){
	var requrl="http://172.27.101.98:7979/client/api?command=deployVirtualMachine&response=json&zoneid="+req.params.zoneid+
	"&account="+req.params.account+
	"&domainid="+req.params.domainid+
	"&templateid="+req.params.templateid+
	"&hypervisor="+req.params.hypervisor+
	"&serviceofferingid="+req.params.serviceofferingid+
	"&diskofferingid="+req.params.diskofferingid+
	"&name="+req.params.vmname;
	var request = require('request');
	request({url:requrl,json: true}, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		console.log(body) ;// Print the body of response.
    		res.json(body);

  		}
	})


});

module.exports = router;