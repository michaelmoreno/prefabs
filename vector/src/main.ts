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
    ctx.closePath();
};

const drawLine = (point1: Vector, point2: Vector, thickness: number, color: string) => {
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.stroke();
};

class Particle {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    maxSpeed: number;;
    maxForce: number;
    color: string;

    constructor(position: Vector, maxSpeed: number, maxForce: number, color: string) {
        this.position = position;
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;
        this.color = color;
    }
    applyForce(force: Vector) {
        this.acceleration = this.acceleration.add(force);
    }
    draw() {
        drawPoint(this.position, this.color);
    }
    update() {
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
        this.acceleration = new Vector(0, 0);
    }
    seek(target: Vector) {
        let desired = target.subtract(this.position);
        desired = desired.setMagnitude(this.maxSpeed);
        let steer = desired.subtract(this.velocity);
        steer = steer.setMagnitude(this.maxForce);
        this.applyForce(steer);
    }
}

const p1 = new Particle(new Vector(0, 0), 10, 0.5, "blue");
const p2 = new Particle(new Vector(100, -100), 10, 0.3, "red");

const frameLoop = () => {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    p1.draw();
    p2.draw()
    p1.seek(p2.position);
    p1.update();
    p2.seek(p1.position);
    p2.update();


    requestAnimationFrame(frameLoop);
}

frameLoop();

