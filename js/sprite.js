/*
 * sprite.js
 */

var Sprite = (function(module)
{
	function createSprite(imgFile)
	{
		var sprite = new Image();
		sprite.src = 'sprite/' +imgFile; // ** fallback for failed image loading !!
		
		sprite.onload = function(){
			this.setSize(this.width, this.height); // recalculate the center
			// assign real paint function here
			this.paint = function(ctx){
				ctx.drawImage(this, 0, 0, this.width, this.height);
			}
		}
		
		sprite.onerror = function(){
			// this required for drawing stand in object
			this.height = 100;
			this.width = 100;
			console.log('Unable to load: '+ imgFile);
		}

		sprite.onabort = function(){
			console.log('Abort');
		}
		
		// temporary paint function until onload fires and overrides/overwrites it with drawImage
		sprite.paint = function(ctx){
			ctx.fillStyle = 'rgb('+ randomInt(0,255) + ','+ randomInt(0,255) +  ','+ randomInt(0,255) +')';
			ctx.fillRect(0, 0, this.width, this.height);
		}
		
		sprite.setSize = function(w,h){
			this.width = w;
			this.height = h;
			this.cx = w/2; // recaulculate image center...**relative positioning cancelled**
			this.cy = h/2;
		}
		
		makeTransObj(sprite, sprite.width/2, sprite.height/2);

		return sprite;
	}         

	// data members and draw function added on to translatable object
	//!!! sprites have height and width from Image proto but standard objects are undefined this way -->is this okay?
	function makeTransObj(obj, c_x, c_y)
	{
		obj.px = 0.0;
		obj.py = 0.0;
		obj.cx = c_x;
		obj.cy = c_y;
		obj.angle = 0.0;
		obj.super = false;
		obj.draw = function(ctx){
			ctx.save();
			ctx.translate(obj.px, obj.py);
			ctx.rotate(obj.angle);
			ctx.translate(-obj.cx,-obj.cy); // by default we rotate around the center of an object, changing center will result in different rotation properties
			this.paint(ctx); // method defined creating object, different for rect, image, path...
			drawExtents(ctx, obj); //TODO: make this a debug flag
			ctx.restore();
		}
		
		obj.setPos = function(x,y){
			obj.px = x;
			obj.py = y;
		}
	}

	// TODO: write debug text for all TransObj properties
	function drawExtents(ctx, obj)
	{
		ctx.strokeStyle = 'rgb(0,0,255)';

		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(0,obj.height);
		ctx.lineTo(obj.width,obj.height);
		ctx.lineTo(obj.width,0);
		ctx.lineTo(0,0);
		
		ctx.moveTo(obj.cx,obj.cy);
		ctx.arc(obj.cx, obj.cy, 10, 0, Math.PI * 2);
		ctx.closePath();
		ctx.stroke();
	}
	
	module = {
		createSprite: createSprite
	};
	
	return module;
	
}(Sprite || {}));
