var https = require("https");

function mywallet(params) {
	this.params = params;

	this.guid = params.guid;
	this.password = params.password;

	if((!(this.guid) || !(this.password))) {
		throw "guid or password missing";
	}
};

mywallet.prototype.apiCall = function(path, callback) {
	var options = {
		hostname: ((this.params.hostname) ? this.params.hostname : "blockchain.info"),
		port: ((this.params.port) ? this.params.port : 443),
		path: path,
		method: ((this.params.method) ? this.params.method : "GET")
	};

	var req = https.request(options, function(res) {
		var data = "";

		res.on("data", function(chunk) {
			data += chunk;
		});

		res.on("end", function() {
			callback(null, JSON.parse(data));
		});
	});

	req.end();

	req.on("error", function(err) {
		callback(err, null);
	});
};

mywallet.prototype.payment = function(params, callback) {
	if(!(params))
		throw "params missing";

	if(!(params.hasOwnProperty("to")))
		throw "to missing";
	if(!(params.hasOwnProperty("amount")))
		throw "amount missing";

	var path = "/de/merchant/" + this.guid + "/payment?password=" + this.password + "&to=" + params.to + "&amount=" + params.amount;
	if(params.hasOwnProperty("second_password"))
		path += "&second_password=" + params.second_password;
	if(params.hasOwnProperty("from"))
		path += "&from=" + params.from;
	if(params.hasOwnProperty("shared"))
		path += "&shared=" + params.shared;
	if(params.hasOwnProperty("fee"))
		path += "&fee=" + params.fee;
	if(params.hasOwnProperty("note"))
		path += "&note=" + params.note;

	this.apiCall(path, callback);
};

mywallet.prototype.multiplePayments = function(params, callback) {
	if(!(params))
		throw "params missing";

	if(!(params.hasOwnProperty("recipients")))
		throw "recipients missing";

	var path = "/de/merchant/" + this.guid + "/sendmany?password=" + this.password + "&recipients=" + params.recipients;
	if(params.hasOwnProperty("second_password"))
		path += "&second_password=" + params.second_password;
	if(params.hasOwnProperty("from"))
		path += "&from=" + params.from;
	if(params.hasOwnProperty("shared"))
		path += "&shared=" + params.shared;
	if(params.hasOwnProperty("fee"))
		path += "&fee=" + params.fee;
	if(params.hasOwnProperty("note"))
		path += "&note=" + params.note;

	this.apiCall(path, callback);
};

mywallet.prototype.getBalance = function(callback) {
	var path = "/de/merchant/" + this.guid + "/balance?password=" + this.password;
	this.apiCall(path, callback);
};

mywallet.prototype.getAddresses = function(params, callback) {
	var path = "/de/merchant/" + this.guid + "/list?password=" + this.password;
	if(params) {
		if(params.hasOwnProperty("confirmations"))
			path += "?confirmations=" + params.confirmations;
	}

	this.apiCall(path, callback);
};

mywallet.prototype.getAddressBalance = function(params, callback) {
	if(!(params))
		throw "params missing";

	if(!(params.hasOwnProperty("address")))
		throw "address missing";
	if(!(params.hasOwnProperty("confirmations")))
		throw "confirmations missing";

	var path = "/de/merchant/" + this.guid + "/address_balance?password=" + this.password + "&address=" + params.address + "&confirmations=" + params.confirmations;
	this.apiCall(path, callback);
};

mywallet.prototype.generateAddress = function(params, callback) {
	var path = "/de/merchant/" + this.guid + "/new_address?password=" + this.password;
	if(params) {
		if(params.hasOwnProperty("second_password"))
			path += "&second_password=" + params.second_password;
		if(params.hasOwnProperty("label"))
			path += "&label=" + params.label;
	}

	this.apiCall(path, callback);
};

mywallet.prototype.archiveAddress = function(params, callback) {
	if(!(params))
		throw "params missing";

	if(!(params.hasOwnProperty("address")))
		throw "address missing";

	var path = "/de/merchant/" + this.guid + "/archive_address?password=" + this.password + "&address=" + params.address;
	if(params) {
		if(params.hasOwnProperty("second_password"))
			path += "&second_password=" + params.second_password;
	}

	this.apiCall(path, callback);
};

mywallet.prototype.unarchiveAddress = function(params, callback) {
	if(!(params))
		throw "params missing";

	if(!(params.hasOwnProperty("address")))
		throw "address missing";

	var path = "/de/merchant/" + this.guid + "/unarchive_address?password=" + this.password + "&address=" + params.address;
	if(params) {
		if(params.hasOwnProperty("second_password"))
			path += "&second_password=" + params.second_password;
	}
	
	this.apiCall(path, callback);
};

mywallet.prototype.consolidate = function(params, callback) {
	if(!(params))
		throw "params missing";

	if(!(params.hasOwnProperty("days")))
		throw "days missing";

	var path = "/de/merchant/" + this.guid + "/auto_consolidate?password=" + this.password + "&days=" + params.days;
	if(params) {
		if(params.hasOwnProperty("second_password"))
			path += "&second_password=" + params.second_password;
	}

	this.apiCall(path, callback);
};

module.exports = mywallet;