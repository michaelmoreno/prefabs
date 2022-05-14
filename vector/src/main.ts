import Vector from "./Vector";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// set origin to center of canvas
ctx.translate(canvas.width / 2, canvas.height / 2);
// flip y axis
ctx.scale(1, -1);

const drawPoint = (point: Vector, color: string) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
};

const drawLine = (point1: Vector, point2: Vector, color: string) => {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.strokeStyle = color;
    ctx.stroke();
};


const frameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const point1 = new Vector(0, 0);
    console.log('created point1: ', point1);
    
    const point2 = new Vector(100, -100);
    console.log('created point2: ', point2);
    
    const desired = Vector.subtract(point2, point1);

    
    // requestAnimationFrame(frameLoop);
}

frameLoop();

