/*!
 * input.js - input handler for canvas library
 *
 * Copyright 2013, Jacob Dalton
 *
 */

define(['jquery'], function($){

	var keyState = {}; //persistent across frames

	$(window).keydown(keyDown);
	$(window).keyup(keyUp);
	
	function keyDown(e)
	{
		var key = e.which;
		if(keyState[key] != true){
			keyState[key] = true;
		}
	}

	function keyUp(e)
	{
		var key = e.which;
		delete keyState[key]; // is delete evil, are there alternatives?
	}

	var getActiveKeys = function()
	{
		var activeKeys = [];
		for(key in keyState){
			if(keyState.hasOwnProperty(key)){
				if(keyState[key] === true){
					activeKeys.push(parseInt(key));
				}
			}
		}
		return activeKeys;
	}

	return {
		getActiveKeys : getActiveKeys,
		SPACE_KEY : 32,
		LEFT_KEY : 37,
		UP_KEY : 38,
		RIGHT_KEY : 39,
		DOWN_KEY : 40
	}
});
