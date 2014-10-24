var express = require('express');
var router = express.Router();

//파일 업로드를 위한 require
var formidable = require('formidable');
var fs =require('fs-extra')