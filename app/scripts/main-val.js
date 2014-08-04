/*
Distance:
x = Vg * t
---
Vg = Vgi + mi*g*t

Vg - current valocity
Vgi - initial valocity
m - friction
g - gravity
t - time

*/

// TODO: make some physic for canlulating trajectory and slowing balls after throw

var mi = 0.1;
var g = 9.81;
var t = 0;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var box, beginE, ttime, ballX, ballY;
var xvalocity, xdictance, yvalocity, ydictance;


window.onload = function() {

	cl1 = document.getElementById('cl1');
	cl2 = document.getElementById('cl2');
	cl3 = document.getElementById('cl3');
	cl4 = document.getElementById('cl4');

	document.addEventListener('touchstart',onTouchStart, false);
	document.addEventListener('touchmove',onMove); 
	document.addEventListener('touchend',onTouchEnd, false);
	

}
function onTouchStart (e) {
	if(e.touches.length>1){
		return false;
	}

	e.preventDefault();

	beginE = {
		timestamp : e.timeStamp,
		posX : e.touches[0].pageX,
		posY : e.touches[0].pageY
	}

	

	box = makeBox();
	box.style.left = e.touches[0].clientX + 'px';
	box.style.top = e.touches[0].clientY + 'px';
	
}

function onMove (e) {
	box.style.left = e.touches[0].clientX + 'px';
	box.style.top = e.touches[0].clientY + 'px';
}

function onTouchEnd (e) {
	ttime =   e.timeStamp - beginE.timestamp;

	xdictance = e.changedTouches[0].pageX - beginE.posX;
	xvalocity = (xdictance/ttime).toFixed(8);
	console.log(xvalocity);

	ydictance = e.changedTouches[0].pageY - beginE.posY
	yvalocity = (ydictance/ttime).toFixed(8);
	console.log(yvalocity);
	

	// document.body.removeChild(box);
	// cl4.innerHTML = xvalocity;
	ballX = e.changedTouches[0].pageX;
	ballY = e.changedTouches[0].pageY;
	console.log('Start x ' + ballX);
	console.log('Start y ' + ballY);
	t = 0;
	requestAnimationFrame(rafa);
}





function rafa () {

	

	t++;

	//Calculate X
	var prevBX = ballX;
	ballX = (xvalocity - mi*g*t) * t;
	if(prevBX !== ballX){
		console.log('ballX ' + ballX);
	}


	//Calculate Y
	var prevBY = ballY;
	ballY = (yvalocity - mi*g*t) * t;
	if(prevBY !== ballY){
		console.log('ballY ' + ballY);
	}
	
	 if(ballX>0 && ballY>0){
		// box.style.left = ballX + 'px';
		// box.style.top = ballY + 'px';
		requestAnimationFrame(rafa);
	 }

}


function makeBox () {
	var _box = document.createElement('div');
	_box.classList.add('box');
	document.body.appendChild(_box);
	return _box;
}


