//  **********************
//  * Print, Debug, Util *
//  **********************

function randomInt(low,hi)
{
	return Math.floor(Math.random()*(hi - low)) + low;
}

function getSeconds()
{cput("nList Content:");
	for(i=0; i<this.nameList.leng(); i++)
	{
		cput(nList.getId(i) + " " + nList.path(i) + " " + nList.getName(i));
	} 

	var d = new Date();
	return d.getTime() * .001;
}

function getMilliseconds()
{
	var d = new Date();
	return d.getTime();
}

