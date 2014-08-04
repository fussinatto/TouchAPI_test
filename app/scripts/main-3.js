
// TODO: make some physic for canlulating trajectory and slowing boxs after throw

var drag = .98;
var bounce = .85;


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var isDraging = false;
var bsize = 50;
var stageWidth = window.innerWidth;
var stageHeight = window.innerHeight;


var box, bx, by, ox, oy, xval, yval;


window.onload = function() {

    box = document.querySelector('.box');
    box.style['-webkit-transform'] = 'translate3d(' + stageWidth/2 + 'px,' + stageHeight/2 + 'px, 0)';

    box.addEventListener('touchstart', onTouchStart, false);
    document.addEventListener('touchmove', onMove);
    box.addEventListener('touchend', onTouchEnd, false);
    
    requestAnimationFrame(rafa);
}


function onTouchStart(e) {

    e.preventDefault();
    isDraging = true;

}

function onMove(e) {

    if (isDraging) {
        bx = e.touches[0].pageX;
        by = e.touches[0].pageY;

        box.style['-webkit-transform'] = 'translate3d(' + bx + 'px,' + by + 'px, 0)';
    }
}

function onTouchEnd(e) {
    isDraging = false;
}



function rafa() {

    if (isDraging) {

        xval = bx - ox;
        yval = by - oy;
        ox = bx;
        oy = by

        box.style['-webkit-transform'] = 'translate3d(' + bx + 'px,' + by + 'px, 0)';

    } else {

        bx += xval;
        by += yval;

        box.style['-webkit-transform'] = 'translate3d(' + bx + 'px,' + by + 'px, 0)';

        if ((bx + bsize) > stageWidth) {
            bx = stageWidth - bsize;
            xval = -xval * bounce;
        } else if ((bx - bsize) < 0) {
            bx = 0 + bsize;
            xval = -xval * bounce;
        }

        if ((by + bsize) > stageHeight) {
            by = stageHeight - bsize;
            yval = -yval * bounce;
        } else if ((by - bsize) < 0) {
            by = 0 + bsize;
            yval = -yval * bounce;
        }

        xval = xval * drag;
        yval = yval * drag;
    }

    requestAnimationFrame(rafa);

}

