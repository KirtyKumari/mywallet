var https = require("https");

function myWallet(params) {
	this.params = params;

	this.guid = params.guid;
	this.password = params.password;

	if((!(this.guid) || !(this.password))) {
		throw "guid or password missing";
	}
};

myWallet.prototype.apiCall = function(path, callback) {
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

myWallet.prototype.getAddresses = function(params, callback) {
	var path = "/de/merchant/" + this.guid + "/list?password=" + this.password;
	if(params.confirmations)
		path += "?confirmations=" + params.confirmations;

	this.apiCall(path, function(err, res) {
		if(err)
			callback(err, null);
		else
			callback(null, res.addresses);
	});
};

myWallet.prototype.getAddressBalance = function(params, callback) {
	/*
	 * {
	 * 		"balance": balance in satoshi,
	 *		"address": bitcoin address,
	 *		"total_received": total satoshi received
	 *	}
	 */

	if(!(params.address))
		throw "address missing";
	if(!(params.confirmations))
		throw "confirmations missing";

	var path = "/de/merchant/" + this.guid + "/address_balance?password=" + this.password + "&address=" + params.address + "&confirmations=" + params.confirmations;
	this.apiCall(path, function(err, res) {
		if(err)
			callback(err, null);
		else
			callback(null, res);
	});
};

myWallet.prototype.generateAddress = function(params, callback) {
	/*
	 * {
	 *		"address": generated bitcoin address,
	 *		"label": address label
	 * }
	 */

	var path = "/de/merchant/" + this.guid + "/new_address?password=" + this.password;
	if(params.second_password)
		path += "&second_password=" + params.second_password;
	if(params.label)
		path += "&label=" + params.label;

	this.apiCall(path, function(err, res) {
		if(err)
			callback(err, null);
		else
			callback(null, res);
	});
};

myWallet.prototype.payment = function(params, callback) {
	var path = "/de/merchant/" + this.guid + "/payment?password=" + this.password + "&to=" + params.to + "&amount=" + params.amount;
	if(params.second_password)
		path += "&second_password=" + params.second_password;
	if(params.from)
		path += "&from=" + params.from;
	if(params.shared)
		path += "&shared=" + params.shared;
	if(params.fee)
		path += "&fee=" + params.fee;
	if(params.note)
		path += "&note=" + params.note;

	this.apiCall(path, function(err, res) {
		if(err)
			callback(err, null);
		else
			callback(null, res);
	});
};

myWallet.prototype.multiplePayments = function(params, callback) {
	var path = "/de/merchant/" + this.guid + "/sendmany?password=" + this.password + "&recipients=" + params.recipients;
	if(params.second_password)
		path += "&second_password=" + params.second_password;
	if(params.from)
		path += "&from=" + params.from;
	if(params.shared)
		path += "&shared=" + params.shared;
	if(params.fee)
		path += "&fee=" + params.fee;
	if(params.note)
		path += "&note=" + params.note;

	this.apiCall(path, function(err, res) {
		if(err)
			callback(err, null);
		else
			callback(null, res);
	});
};

myWallet.prototype.getBalance = function(callback) {
	var path = "/de/merchant/$guid/balance?password=" + this.password;
	this.apiCall(path, function(err, res) {
		if(err)
			callback(err, null);
		else
			callback(null, res);
	});
};

module.exports = myWallet;