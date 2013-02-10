'use strict'; // test with and without this, but nice to keep it to warn us if we're polluting the global scope

var draw_text ="Test Text";
var drift;

var zepplin;
var whale;

var angleSign = 1;

function init() {
    setInterval(draw, 25);
	drift = 0;
	zepplin = Sprite.createSprite('zepplin.png');
	zepplin.setPos(zepplin.cx, zepplin.cy);
	whale = Sprite.createSprite('whale.png');
	whale.setPos(-whale.cx,365);
}

function draw()
{
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
		deltaWorld();
		translateKeysToAction();
		whale.px = whale.px < canvas.width + whale.cx/2 ? whale.px + 3 : -whale.cx; 
		whale.angle += .015 * angleSign;
		if(whale.angle > .1){
			angleSign = -1;
		} else if(whale.angle < -.5){
			angleSign = 1;
		}
		
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
	var ship_delta = .07;
	zepplin.py += ship_delta*flip;
	offset += ship_delta*flip;
	if(Math.abs(offset)>6){
		flip *= -1;
	}
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