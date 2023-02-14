//ADVANCE: have multiple vehicles
//ADVANCE: complex paths (at least one 'copter must be a circle)
//ADVANCE: cool looking (showed to family and friends, they said it looks like rangoli design[an indian style of art])
//ADVANCE: interaction- the copters stop moving on mouse click. 
//         They again start moving on mouse click. 
//         Day changes to night when motion stops and vice-versa.
//          On mouse enter, copters change the direction of motion. on mouse leave they again move in original directions.


// @ts-check
export {};

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

//
/**
 * @param {DOMHighResTimeStamp} timestamp 
 * @param {number} angle
 */

//this is for advance points
let click = 0;
canvas.onmousedown = function(){
    if(click){
        click = 0;
    }
    else{
        click = 1;
    }
};
let enter = 0;
canvas.onmouseenter = function(){
    enter = 1;
}
canvas.onmouseleave = function(){
    enter = 0;
}

function drawCopter(x,y, fillColor="#eb5694"){

    context.strokeStyle = "green";
    context.fillStyle = fillColor;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(x+90,y);
    context.lineTo(x,y+90);
    context.lineTo(x-90,y);
    context.lineTo(x,y-90);
    context.lineTo(x+90,y);
    context.fill();
    context.stroke();
    context.closePath();

    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(x+90,y);
    context.lineTo(x-90,y);
    context.moveTo(x,y-90);
    context.lineTo(x,y+90);
    context.stroke();
    context.closePath();

    context.fillStyle = "#DAA52080";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(x,y,25,2*Math.PI,0);
    context.fill();
    context.stroke();
    context.closePath();

    context.fillStyle = "goldenrod";
    context.beginPath();
    context.arc(x,y,10,2*Math.PI,0);
    context.fill();
    context.closePath();
}

function drawQuadCopterFace(angle,x,y) {
    context.save();
    context.translate(x,y);
    context.scale(0.5,0.5);
    context.rotate(angle*Math.PI/2);
    context.translate(x,y);

    drawCopter(0,0,"#7a64b7");

    context.restore();
}

function drawQuadCopterArms(angle,x,y){
    context.save();
    context.translate(x,y);
    context.scale(0.5,0.5);
    context.rotate(angle*Math.PI/2);
    context.save();
    context.translate(x,y);

    context.save();
    context.scale(0.5,0.5);
    context.translate(x,0);
    context.rotate(angle*Math.PI);
    drawCopter(0,0);
    context.restore();

    context.save();
    context.scale(0.5,0.5);
    context.translate(-x,0);
    context.rotate(angle*Math.PI);
    drawCopter(0,0);
    context.restore();

    context.save();
    context.scale(0.5,0.5);
    context.translate(0,y);
    context.rotate(angle*Math.PI);
    drawCopter(0,0);
    context.restore();

    context.save();
    context.scale(0.5,0.5);
    context.translate(0,-y);
    context.rotate(angle*Math.PI);
    drawCopter(0,0);
    context.restore();

    context.restore();
    context.restore();
}


function drawCopter2(x,y, fillColor="#FF000080"){
    context.save();

    context.strokeStyle = "green";
    context.fillStyle = fillColor;
    context.lineWidth = 5;
    context.beginPath();
    context.arc(x,y,90,2*Math.PI,0);
    context.fill();
    context.stroke();
    context.closePath();

    context.lineWidth = 10;
    context.beginPath();
    context.moveTo(x+90,y);
    context.lineTo(x-90,y);
    context.moveTo(x,y-90);
    context.lineTo(x,y+90);
    context.stroke();
    context.closePath();

    context.fillStyle = "#DAA52080";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(x,y,25,2*Math.PI,0);
    context.fill();
    context.stroke();
    context.closePath();

    context.fillStyle = "goldenrod";
    context.beginPath();
    context.arc(x,y,10,2*Math.PI,0);
    context.fill();
    context.closePath();

    context.restore();

}

function drawCopter2Face(angle,x,y){
    context.save();
    context.translate(x,y);
    context.scale(0.5,0.5);
    context.rotate(angle*Math.PI/2);
    context.translate(x,y);

    drawCopter2(0,0,"blue");

    context.restore();
}

function drawCopter2Arms(angle,x,y){
    context.save();
    context.translate(x,y);
    context.scale(0.5,0.5);
    context.rotate(angle*Math.PI/2);
    context.save();
    context.translate(x,y);

    context.save();
    context.scale(0.5,0.5);
    context.translate(x,0);
    context.rotate(angle*Math.PI*2);
    drawCopter2(0,0);
    context.restore();

    context.save();
    context.scale(0.5,0.5);
    context.translate(-x,0);
    context.rotate(angle*Math.PI*2);
    drawCopter2(0,0);
    context.restore();

    context.save();
    context.scale(0.5,0.5);
    context.translate(0,y);
    context.rotate(angle*Math.PI*2);
    drawCopter2(0,0);
    context.restore();

    context.save();
    context.scale(0.5,0.5);
    context.translate(0,-y);
    context.rotate(angle*Math.PI*2);
    drawCopter2(0,0);
    context.restore();

    context.restore();
    context.restore();
}


function animate(timestamp){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    let a;
    if(click){
        a = 0;
        context.fillStyle = "black";
        context.fillRect(0,0, canvas.width, canvas.height);
    }
    else{
        a = performance.now()/1500;
        context.fillStyle = "#6fa8dc";
        context.fillRect(0,0, canvas.width, canvas.height);
    }
    if(enter){
        a *= -1;
    }
    drawQuadCopterFace(a,200,200);
    drawQuadCopterArms(a,200,200);

    context.save();
    context.scale(0.5,0.5);
    drawCopter2Face(-a,200,200);
    drawCopter2Arms(-a,200,200);
    context.restore();
    window.requestAnimationFrame(animate);
}

animate();