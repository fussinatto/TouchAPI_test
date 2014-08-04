
var cl1,cl2,cl3,arr=[],touchL =0;
window.onload = function() {
	cl1 = document.getElementById('cl1');
	cl2 = document.getElementById('cl2');
	cl3 = document.getElementById('cl3');
	cl4 = document.getElementById('cl4');
	document.addEventListener('touchstart',onTouchStart, false);
	document.addEventListener('touchend',onTouchEnd, false);
	document.addEventListener('touchmove',onMove); 
	

}
function onTouchStart (e) {
	e.preventDefault(); // prevent page to be moved arround

	if(e.touches.length>3){
		return false;
	}

	var i = e.touches.length - touchL;
	while(i--){

		var bx = makeBox();
		bx.style.left = e.touches[0].clientX + 'px';
		bx.style.top = e.touches[0].clientY + 'px';

		arr.push(bx);
	}

	touchL = e.touches.length;
	

}

function onMove (e) {
	var box;
	var i = arr.length;
	if(e.touches.length === i && e.touches.length > 0 ){
		while(i--){
			box = arr[i];
			box.style.left = e.touches[i].clientX + 'px';
			box.style.top = e.touches[i].clientY + 'px';
		}
	}
}

function onTouchEnd (e) {

	for(var i = touchL - e.touches.length; i--;) {
		var xel = arr.pop();
		document.body.removeChild(xel);
		
	}
	touchL = e.touches.length;

	cl4.innerHTML = touchL;
	cl1.textContent = cl2.textContent =cl3.textContent ='\n';
}



function makeBox () {
	var box = document.createElement('div');
	box.classList.add('box');
	document.body.appendChild(box);
	return box;
}