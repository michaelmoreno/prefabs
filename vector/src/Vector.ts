export default class Vector {
    protected _x: number;
    protected _y: number;
    protected _magnitude: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
        this._magnitude = this.calcMagnitude();
    }

    get magnitude(): number {
        return this._magnitude;
    }
    set magnitude(magnitude) {
        const ratio = magnitude / this.magnitude;
        this.multiply(ratio);
    }
    calcMagnitude(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }
    get x(): number {
        return this._x;
    }
    set x(x: number) {
        this._x = x;
        this.magnitude = this.calcMagnitude();
    }
    get y(): number {
        return this._y;
    }
    set y(y: number) {
        this._y = y;
        this.magnitude = this.calcMagnitude();
    }
    
    static subtract(...quantities: (Vector|number)[]): number {
        console.log('vectors passed: ', quantities);
        return 3
    }
    static multiply(...quantities: (Vector|number)[]): Vector {
        let x = 0;
        let y = 0;
        for (const quantity of quantities) {
            x *= quantity instanceof Vector ? quantity._x : quantity;
            y *= quantity instanceof Vector ? quantity._y : quantity;
        }
        return new Vector(x, y);
    }
    static divide(...quantities: (Vector|number)[]): Vector {
        let x = 0;
        let y = 0;
        for (const quantity of quantities) {
            x /= quantity instanceof Vector ? quantity.x : quantity;
            y /= quantity instanceof Vector ? quantity.y : quantity;
        }
        return new Vector(x, y);
    }

    add(quantity: Vector | number): void {
        console.log('fire add');
        this._x += quantity instanceof Vector ? quantity._x : quantity;
        this._y += quantity instanceof Vector ? quantity._y : quantity;
    }
    subtract(quantity: Vector | number): void {
        console.log('fire subtract');
        
        this._x -= quantity instanceof Vector ? quantity._x : quantity;
        this._y -= quantity instanceof Vector ? quantity._y : quantity;
    }
    multiply(quantity: Vector | number): void {
        console.log('fire multiply');
        
        this._x *= quantity instanceof Vector ? quantity._x : quantity;
        this._y *= quantity instanceof Vector ? quantity._y : quantity;
    }
    divide(quantity: Vector | number): void {
        console.log('fire divide');
        this._x /= quantity instanceof Vector ? quantity._x : quantity;
        this._y /= quantity instanceof Vector ? quantity._y : quantity;
    }
}