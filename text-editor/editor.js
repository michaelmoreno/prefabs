import { Line } from './line.js';

class Editor {
    constructor(x, y, width, height, userInput, fontSize, lines) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.userInput = userInput;
        this.fontSize = fontSize || 20;
        this.fontFamily = 'arial'
        this.fontColor = 'black';
        this.bgColor = '#292d3e';
        this.selColor = '#212432';
        this.lines = lines || [];
        this.selectedLine = null;
        this.aboveLine = null;
        this.belowLine = null;
        
    }
    addLine(characters) {
        const y = this.fontSize * this.lines.length + this.y;
        const line = new Line(this.x, y, this.width, this.fontSize, this, characters);
        this.lines.push(line);
        line.aboveLine = this.lines[this.lines.indexOf(line) - 1];
        if (line.aboveLine) {
            line.aboveLine.belowLine = line;
        }
    }
    detectKeypress() {
        if (this.selectedLine === null)
            return;

        switch (this.userInput.key) {
            case 'ArrowRight':
                if (this.selectedLine.caret < this.selectedLine.characters.length-1) {
                    this.selectedLine.caret += 1;
                } else {
                    if (this.selectedLine.belowLine) {
                        this.selectedLine.belowLine.caret = 0;
                        this.selectedLine = this.selectedLine.belowLine;
                    }


                } 
                break;
            case 'ArrowLeft':
                if (this.selectedLine.caret > 0) {
                    this.selectedLine.caret -= 1;
                } else {
                    if (this.selectedLine.aboveLine) {
                        this.selectedLine.aboveLine.caret = this.selectedLine.aboveLine.characters.length-1; 
                        this.selectedLine = this.selectedLine.aboveLine;
                    }
                }
                break;
            case 'ArrowDown':
                if (!this.selectedLine.belowLine)
                    return;
                this.selectedLine.belowLine.caret = this.selectedLine.caret > this.selectedLine.belowLine.characters.length ? this.selectedLine.belowLine.characters.length-1 : this.selectedLine.caret;
                this.selectedLine = this.selectedLine.belowLine;
                break;
            case 'ArrowUp':
                if (!this.selectedLine.aboveLine)
                    return;
                this.selectedLine.aboveLine.caret = this.selectedLine.caret > this.selectedLine.aboveLine.characters.length ? this.selectedLine.aboveLine.characters.length-1: this.selectedLine.caret;
                this.selectedLine = this.selectedLine.aboveLine;
                break;
        }
    }
    detectCursor() {
        this.lines.forEach(line => {
            if (this.userInput.x > line.x && this.userInput.x < line.x + line.width && this.userInput.y > line.y && this.userInput.y < line.y + line.height && this.userInput.click) {
                this.selectedLine = line;
            }
        })
    }
    update() {
        this.detectKeypress();
        this.detectCursor();
    }
    render(ctx) {
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.renderLines(ctx);
        this.lines.forEach(line => line.render(ctx, this));
    }
}


export { Editor };