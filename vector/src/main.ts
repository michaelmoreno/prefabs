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

const drawLine = (point1: Vector, point2: Vector, thickness: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.stroke();
};


const frameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxForce = 30
    const maxSpeed = 60
    const point1 = new Vector(10, -10);
    let point1Velocity = new Vector(30, 40);
    drawPoint(point1, "red");
    console.log('created point1: ', point1);
    drawLine(point1, point1.add(point1Velocity), 1, "red");
    console.log('point1Velocity: ', point1Velocity);
    
    
    const target = new Vector(100, -100);
    drawPoint(target, "blue");
    console.log('created target: ', target);

    let desired = target.subtract(point1);
    console.log('desired: ', desired);
    drawLine(point1, point1.add(desired), 1, "blue");

    desired = desired.limitMagnitude(maxSpeed);
    drawLine(point1, point1.add(desired), 3, "blue");


    let steering = desired.subtract(point1Velocity);
    console.log('steering: ', steering);
    drawLine(point1, point1.add(steering), 1, "green");
    steering = steering.limitMagnitude(maxForce);
    drawLine(point1, point1.add(steering), 3, "green");
    point1Velocity = point1Velocity.add(steering);
    drawLine(point1, point1.add(point1Velocity), 3, "green");


    // requestAnimationFrame(frameLoop);
}

frameLoop();

