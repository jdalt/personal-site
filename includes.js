// Includes

function include_files(include_libraries, callback)
{
	if(typeof(include_libraries) === "string"){
		include_libraries = [include_libraries];
	}
	var libraries_loaded = 0;
	for(var i=0; i<include_libraries.length; i++){
		dynamicallyLoadJSFile(include_libraries[i], function(){
			libraries_loaded++;
			if(libraries_loaded === include_libraries.length){
				callback();
			}
		});
	}
}

// This function loads js files in such a way that debug errors are visible unlike the jQuery function
// from: http://www.lockencreations.com/2011/07/02/cant-debug-imported-js-files-when-using-jquery-getscript/
function dynamicallyLoadJSFile(url, callback){            
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.src = url;
		
	// Handle Script loading               
	var done = false;
			
	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function(){
		if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
			done = true;
			if (callback){
				callback();
			}               
			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
		}
	};             
	head.appendChild(script);
			
	// We handle everything using the script element injection
	return undefined;             
}; 