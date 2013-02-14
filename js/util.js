/*!
 * util.js - some minor utility classes
 *
 * Copyright 2013, Jacob Dalton
 *
 */

define(function(){
	randomInt: function (low,hi) {
		return Math.floor(Math.random()*(hi - low)) + low;
	}

	getSeconds: function(){
		var d = new Date();
		return d.getTime() * .001;
	}

	getMilliseconds: function(){
		var d = new Date();
		return d.getTime();
	}
});
