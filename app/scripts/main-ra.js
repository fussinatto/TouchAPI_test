/*var testEl;

window.onload = function() {
	testEl = $('testElement');
	testEl.onmousedown = testEl.ontouchstart = testEl.onmspointerdown = startDrag;
	testEl2 = $('testElement2');
	testEl2.onmousedown = testEl2.ontouchstart = testEl2.onmspointerdown = startDrag;
	testEl3 = $('testElement3');
	testEl3.onmousedown = testEl3.ontouchstart = testEl3.onmspointerdown = startDrag;
	document.ongesturechange = function() {
		return false;
	}

	testEl.style.msTouchAction = 'none';
	testEl2.style.msTouchAction = 'none';
	testEl3.style.msTouchAction = 'none';

}

function startDrag(e) {

	if (e.type !== 'mousedown') {
		this.onmousedown = null;
		this.ontouchmove = this.onmspointermove = moveDrag;
		this.ontouchend = this.onmspointerup = function() {
			this.ontouchmove = this.onmspointermove = null;
			this.ontouchend = this.onmspointerup = null;
			//			this.ontouchstart = startDrag; // Dolfin
		}
	} else {
		return;
		document.onmousemove = moveDrag;
		document.onmouseup = function() {
			this.innerHTML = 'mouseup';
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}

	var pos = [this.offsetLeft, this.offsetTop];
	var that = this;
	var origin = getCoors(e);

	function moveDrag(e) {
		var currentPos = getCoors(e);
		var deltaX = currentPos[0] - origin[0];
		var deltaY = currentPos[1] - origin[1];
		this.style.left = (pos[0] + deltaX) + 'px';
		this.style.top = (pos[1] + deltaY) + 'px';
		return false; // cancels scrolling

	}

	function getCoors(e) {
		var coors = [];
		if (e.targetTouches && e.targetTouches.length) {
			var thisTouch = e.targetTouches[0];
			coors[0] = thisTouch.clientX;
			coors[1] = thisTouch.clientY;
		} else {
			coors[0] = e.clientX;
			coors[1] = e.clientY;
		}
		return coors;
	}
}

function $(id) {
	return document.getElementById(id);
}
*/
window.requestAnimationFrame = 	window.requestAnimationFrame || 
								window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || 
                              	window.msRequestAnimationFrame;

var cl1,cl2,cl3,bg,arr=[],touchL =0,allTouches={};

window.onload = function() {
	bg = document.querySelector('.bg');
	cl1 = document.getElementById('cl1');
	cl2 = document.getElementById('cl2');
	cl3 = document.getElementById('cl3');
	cl4 = document.getElementById('cl4');
	bg.addEventListener('touchstart',onTouchStart, false);
	bg.addEventListener('touchend',onTouchEnd, false);
	// bg.addEventListener('touchmove',onMove); 
	
	// requestAnimationFrame(rafMove);
}
function onTouchStart (e) {
	console.log(window);

	cl1=  window.Touch.length;
	cl2=  window.TouchEvent.length;
	cl3=  window.TouchList.length;

	e.preventDefault(); // prevent page to be moved arround

	if(e.touches.length>3){
		return false;
	}

	var i = e.touches.length - touchL;
	while(i--){

		var bx = makeBox();
		bx.style.left = e.touches[0].pageX + 'px';
		bx.style.top = e.touches[0].pageY + 'px';

		arr.push(bx);
	}

	touchL = e.touches.length;
	allTouches = e.touches;
	

}

function rafMove () {
	console.log(window.event);
	// cl1=  window.Touch.length;
	// cl2=  window.TouchEvent.length;
	// cl3=  window.TouchList.length;
	// if(allTouches.length) console.log( allTouches[0].clientX);

	// var box;
	// var i = arr.length;
	// if( i && touchL === i && touchL > 0 ){
	// 	while(i--){
	// 		box = arr[i];
	// 		box.style.left = allTouches[i].clientX + 'px';
	// 		box.style.top = allTouches[i].clientY + 'px';
	// 	}
	// }
	requestAnimationFrame(rafMove);

}

// function onMove (e) {
// 	var box;
// 	var i = arr.length;
// 	if(e.touches.length === i && e.touches.length > 0 ){
// 		while(i--){
// 			box = arr[i];
// 			box.style.left = e.touches[i].clientX + 'px';
// 			box.style.top = e.touches[i].clientY + 'px';
// 		}
// 	}
// }

function onTouchEnd (e) {

	for(var i = touchL - e.touches.length; i--;) {
		var xel = arr.pop();
		bg.removeChild(xel);
		
	}
	touchL = e.touches.length;
	allTouches = e.touches;

	cl4.innerHTML = touchL;
	cl1.textContent = cl2.textContent =cl3.textContent ='\n';
}



function makeBox () {
	var box = document.createElement('div');
	box.classList.add('box');
	bg.appendChild(box);
	return box;
}