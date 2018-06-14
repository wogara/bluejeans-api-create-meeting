//this package is made to do GET/POST requests
var auth = require("./auth.js");

var fs = require("fs");//this package reads from files
var path = require("path");//this package is used to get the directory

var fn = "config.json";//this file has our client ID and secret credentials to get the access token
var fnMeeting = "meeting.json";//this file has the details of the meeting
var oauthRec = {};
var meetingRec = {};
var uri = "api.bluejeans.com";
var authPath = "/oauth2/token?Client";

var userId = process.argv[2];//the parameters must be entered in this order when running this script
var start = process.argv[3];//start of the meeting
var duration = process.argv[4];//duration of the meeting

var jssrc = path.dirname(process.argv[1]);//name of the file directory 

fs.readFile(jssrc + "\\" + fn, (err,data)=> { //reading the file with the client ID and secret credentials
	if(err) {
		console.log("Error reading file: " + fn +"\n"+err);
		process.exit();
	}

	oauthRec = JSON.parse(data.toString());//putting the file into the correct format for our auth function

	auth.post( uri, authPath,oauthRec).then(function(results){
	  var meetingPath = '/v1/user/' + userId + 
	  '/scheduled_meeting?access_token=' + results.access_token + '&email=false'; //creating the path for the meeting
	  //console.log(meetingPath);
	  fs.readFile(jssrc + "\\" + fnMeeting, (err,data)=> {//reading the file with the details of the meeting
		if(err) {
			console.log("Error reading file: " + fn +"\n"+err);
			process.exit();
	    }

	  meetingRec = JSON.parse(data.toString());//putting the meeting details into the correct format
	  meetingRec.start = start;//the start of the meeting is an input 
	  meetingRec.end = +meetingRec.start + +duration;//calculating the end of the meeting, the "+" in front of each variable
		  //transforms them from strings to integers so that the end of the meeting can be calculated by adding the start
		  //and duration together

	  auth.post(uri,meetingPath,meetingRec).then(function(results){

	    console.log("Meeting ID: " + results.numericMeetingId);
	    var startDate = new Date(+meetingRec.start); 
            var endDate = new Date(meetingRec.end);
	    console.log("Start: " + startDate);
	    console.log("End: " + endDate);

	  },function(errors){

	  	var errorMessage = errors.replace(/\n/g,"\n  ");
	  	console.log("Error when trying to create meeting:\n  " + errorMessage);
	  	process.exit();

	  });
	});

	},function(errors){
		var errorMessage = errors.replace(/\n/g,"\n  ");
		console.log("Error when trying to create access token:\n  " + errorMessage);
		process.exit();
	});
});
