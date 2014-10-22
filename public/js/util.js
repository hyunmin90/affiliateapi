String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) == 0;
};
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

Date.prototype.toDateString = function() {
	var curr_date = this.getDate();
	if(curr_date < 10)
		curr_date = "0" + curr_date;

	var curr_month = this.getMonth() + 1; //Months are zero based
	if(curr_month < 10)
		curr_month = "0" + curr_month;
	
	var curr_year = this.getFullYear();

	return curr_year + "-" + curr_month + "-" + curr_date;
};

Date.prototype.toMonthString = function() {
	var curr_month = this.getMonth() + 1; //Months are zero based
	if(curr_month < 10)
		curr_month = "0" + curr_month;
	
	var curr_year = this.getFullYear();

	return curr_year + "-" + curr_month;
};

Date.prototype.nextDate = function(diff) {
	if(!diff) diff = 1;
	var copiedDate = new Date(this.getTime());
	copiedDate.setDate(copiedDate.getDate() + diff);
	return copiedDate;
};

Date.prototype.preDate = function(diff) {
	if(!diff) diff = 1;
	var copiedDate = new Date(this.getTime());
	copiedDate.setDate(copiedDate.getDate() - diff);
	return copiedDate;
};

Date.prototype.nextMonth = function(diff) {
	if(!diff) diff = 1;
	var copiedDate = new Date(this.getTime());
	copiedDate.setMonth(copiedDate.getMonth() + diff);
	return copiedDate;
};

Date.prototype.preMonth = function(diff) {
	if(!diff) diff = 1;
	var copiedDate = new Date(this.getTime());
	copiedDate.setMonth(copiedDate.getMonth() - diff);
	return copiedDate;
};

// Date 이쁘게 보여주기
String.prototype.beautifyDate = function() {
	return this.substring(0, 4) + "/" + this.substring(4, 6) + "/" + this.substring(6, 8);
}

// Time 이쁘게 보여주기
var beautifyTime = function(str) {
	return str.substring(0, 2) + ":" + str.substring(2, 4);
}

// DateTime 이쁘게 보여주기
var beautifyDatetime = function(str) {
	var date = beauatifyDate(str.substring(0, 8));
	var time = beauatifyTime(str.substring(8, 12));
	
	return date + " " + time;
}

var timestampToDate = function(timestamp) {
	var d =  new Date(timestamp);
	var time = d.format("yyyy/mm/dd HH:MM:ss");
	return time;
}

Number.prototype.format = function(){     
	 if(this==0) return 0;       
	 var reg = /(^[+-]?\d+)(\d{3})/;     var n = (this + '');       
	 while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');       
	 return n; 
}; 