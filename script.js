let canvas = document.querySelector('#canvas')
canvas.style.position ="fixed";
canvas.style.zIndex="1";
canvas.style.top="0";
canvas.style.left="0";
canvas.style.width="100%";
canvas.style.height="100%";
let ctx = canvas.getContext('2d')
let w, h, balls = []
let mouse = {
    x: undefined,
    y: undefined
}
let rgb = [
    [26, 188, 156],
    [46, 204, 113],
    [52, 152, 219],
    [155, 89, 182],
    [241, 196, 15],
    [230, 126, 34],
    [231,76,60]
]
function init() {
    resizeReset();
    animationLoop();
}
function animationLoop() {
    ctx.clearRect(0, 0, w, h);
    if (mouse.x !== undefined && mouse.y !== undefined) {
        balls.push(new Ball())
    }
    if (balls.length > 200) {
        balls=balls.slice(1)
    }
    drawBalls();
    requestAnimationFrame(animationLoop)
}
function drawBalls() {
    for (let i = 0; i < balls.length; i++){
        balls[i].update();
        balls[i].draw();
    }
}
function mousemove(e) {
  mouse.x=e.x  
  mouse.y=e.y  
}
function mouseout() {
    mouse.x=undefined
    mouse.y=undefined
}
function resizeReset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
function getRandomInt(min,max) {
    return Math.round(Math.random() * (max - min)) + min;
}
class Ball{
    constructor() {
        this.x = mouse.x+getRandomInt(-15,15);
        this.y = mouse.y+getRandomInt(-15,15);
        this.size = getRandomInt(7, 12);
        this.rgb=rgb[getRandomInt(0,rgb.length-1)]
        this.style = "rgba("+this.rgb[0]+","+this.rgb[1]+","+this.rgb[2]+"1)";
        // "+this.rgb[0]+","+this.rgb[1]+","+this.rgb[2]+"
    }
    draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        if (this.size>0) {
            let s = this.size - 0.3;
            this.size = (s <= 0) ? 0 : s;
        }
    }
}
window.addEventListener('DOMContentLoaded', init)
window.addEventListener('mousemove', mousemove)
window.addEventListener('resize',resizeReset)
window.addEventListener('mouseout',mouseout)
