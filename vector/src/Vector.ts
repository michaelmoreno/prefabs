export default class Vector {
    x: number;
    y: number;
    magnitude: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.magnitude = this.calcMagnitude();
    }
    calcMagnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    setMagnitude(magnitude: number): Vector {
        const ratio = magnitude / this.magnitude;
        return this.multiply(ratio);
    }
    limitMagnitude(max: number): Vector {
        if (this.magnitude > max) {
            return this.setMagnitude(max);
        }
        return this;
    }
    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar);
    }
    
}