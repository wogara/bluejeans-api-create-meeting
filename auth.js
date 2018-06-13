var http = require("http");
var https = require("https");

var authToken = "";


var post = function(host,path,body){
	var postPromise = new Promise(function(resolve,reject){
		var postContent = JSON.stringify(body);
		if( (authToken != "") ){
			path += "?access_token=" + authToken;
		}
		
		var opt = {
			hostname : host,
			port : 443,
			path : path,
			method: "POST",
			headers : {
				'content-type' : 'application/json',
				'content-length' : Buffer.byteLength(postContent)
			    }
		    };
		var req = https.request(opt, function (res) {
			var respBody = "";
			res.setEncoding('utf8');
			res.on('data',function(chunk){
				respBody += chunk;
			});
			res.on('end',function(){
				if(res.statusCode===200 || res.statusCode===201){
					resolve(JSON.parse(respBody));
				} else {
					reject(respBody);
				}
			});
		});

		req.on('error', function(e){
			reject(e.message);
		});
		req.write(postContent);
		req.end();
	});
	return postPromise;	
}


var get = function(host,path){
	var getPromise = new Promise(function(resolve,reject){
		if( (authToken != "") ){
			path += "?access_token=" + authToken;
		}

		var opt = {
			hostname : host,
			port : 443,
			path : path,
			method: "GET",
		    };
		
		var req = https.request(opt, function (res) {
			var respBody = "";
			res.setEncoding('utf8');
			res.on('data',function(chunk){
				respBody += chunk;
			});
			res.on('end',function(){
				console.log(res.statusCode);
				var stat = res.statusCode;
				if(stat===200 || stat===201){
					resolve(JSON.parse(respBody));
				} else {
					reject(respBody);
				}
			});
		});

		req.on('error', function(e){
			reject(e.message);
		});
		req.end();
	});
	return getPromise;	
}

authorize = function(token){
	authToken = token;
}


module.exports.post = post;
module.exports.get = get;
module.exports.authorize = authorize;
