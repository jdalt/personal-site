/*!
 * demo.js - main entrypoint for canvas library
 *
 * Copyright 2013, Jacob Dalton
 *
 */

// TODO: all libraries should use 'use strict' to catch any global scope pollution
// ...probably also use a build process with jshint and uglify too...
'use strict'; 

define(['input', 'sprite', 'jquery' ], function(Input, Sprite, $){
	var drift;
	var zepplin;
	var whale;

	var angleSign = 1;
	var drawIntervalHandle = undefined;

	var mIsRunning = false;

	function init() {
		drift = 0;
		zepplin = Sprite.createSprite('zepplin.png');
		$(zepplin).bind('load', function(){
			this.setPos(this.cx + 10, this.cy + 50);
		});
		whale = Sprite.createSprite('whale.png');
		$(whale).bind('load', function(){
			whale.setPos(-whale.cx,395);
		});
	}
	
	function scaleSprites(percent){
    if( whale.loaded ) {
      whale.setSize(whale.orig_width * percent, whale.orig_height * percent);
    } 
    if( zepplin.loaded ) {
      zepplin.setSize(zepplin.orig_width * percent, zepplin.orig_height * percent);
    }
    if( !whale.loaded || !zepplin.loaded) {
      setTimeout( function(){ scaleSprites(percent) }, 100 );
    }
  }

	function start(){
		if(drawIntervalHandle === undefined){
			drawIntervalHandle = setInterval(draw, 25);
			mIsRunning = true;
		}
	}

	function pause(){
		clearInterval(drawIntervalHandle);	
		drawIntervalHandle = undefined;
		mIsRunning = false;
	}

	function isRunning(){
		return mIsRunning;
	}

	function draw()
	{
		var canvas = document.getElementById('canvas');
		if (canvas.getContext) {
			deltaWorld();
			translateKeysToAction();
			
			var ctx = canvas.getContext('2d');
			//Clear screen, get ready to draw
			ctx.clearRect(0,0,canvas.width, canvas.height);
			
			//draw stuff; when things get sufficintly complex we'll create a scene manager
			drawWater(ctx);
			zepplin.draw(ctx);
			whale.draw(ctx);
		} 
	}

	var offset = 0;
	var flip = 1;
	function deltaWorld()
	{
		//	var ship_delta = .07;
		var period = 100;
		zepplin.py += Math.sin((drift * Math.PI)/period) * 15/period; //ship_delta*flip;
		/*offset += ship_delta*flip;
		if(Math.abs(offset)>6){
			flip *= -1;
		}*/

		
		
		whale.px = whale.px < canvas.width + whale.cx/2 ? whale.px + 3 : -whale.cx; 
		whale.py += Math.cos((drift * Math.PI)/period) * 275/period; //ship_delta*flip;
		//console.log(Math.acos(Math.cos((drift * Math.PI)/period)));
		whale.angle = Math.atan(Math.cos((drift * Math.PI)/period)) ; //+ 7*Math.PI/4; 
	/*	whale.py = whale.py + angleSign;
		whale.angle += .01 * angleSign;
		if(whale.angle > .2){
			angleSign = -1;
		} else if(whale.angle < -.35){
			angleSign = 1;
		}
		*/
	}

	// Consider moving this into Input and having objects bind functions to events  ... Input.bindActiveKey('StringKeyName', function() {}): 
	function translateKeysToAction()
	{
		var keys = Input.getActiveKeys();
		for(var index in keys){
			switch(keys[index]){
			case Input.LEFT_KEY:
				zepplin.px -= 3;
				break;
			case Input.UP_KEY:
				zepplin.py -= 3;
				break;
			case Input.RIGHT_KEY:
				zepplin.px += 3;
				break;
			case Input.DOWN_KEY:
				zepplin.py += 3;
				break;
			case Input.SPACE_KEY:
				console.log(whale.px);
			}
		}
	}

	function drawWater(ctx)
	{
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.beginPath();
		ctx.moveTo(0,0);
		for(var i=0; i < ctx.canvas.width; i += 3){
			var h1 = Math.sin(i/20.5 + drift/5) * 6;
			var h2 = Math.sin(i/30.5 - drift/2) * 5;
			var h3 = Math.sin(i/35.5 - drift/3) * 12 * Math.sin(drift/20);
			var h4 = Math.sin(i/25.5 + drift/20) * 5;
			var height_delta = Math.max(h1, h2, h3, h4);
			ctx.lineTo(i,370 + height_delta);
		}
		ctx.lineTo(ctx.canvas.width +1, 370); // TODO: Improve - calculate final wave distance; move to separate class...
		ctx.lineTo(ctx.canvas.width,0);
		ctx.lineTo(0,0);
		ctx.closePath();
		ctx.fill();
		drift++;
	}

	return {
		init : init,
		draw : draw,
		start  : start,
		pause : pause,
		isRunning : isRunning,
    scaleSprites : scaleSprites
	}
});
