	

var Input = (function(module, global, $)
{
	var keyState = {}; //persistent across frames

	$(global).keydown(keyDown);
	$(global).keyup(keyUp);
	
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
	
	module = {
		getActiveKeys : getActiveKeys,
		SPACE_KEY : 32,
		LEFT_KEY : 37,
		UP_KEY : 38,
		RIGHT_KEY : 39,
		DOWN_KEY : 40
	};
	
	return module;
	
}(Input || {}, this, jQuery));  //TODO: it would probably be optimal to take the keyUp and keyDown functions rather than window and jQuery...