class Line {
    constructor(x, y, width, height, editor, characters) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.editor = editor;
        this.characters = characters || '';
        this.caret = 4;
    }
    render(ctx, editor) {
        if (editor.selectedLine === this) {
            ctx.fillStyle = editor.selColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }


        let xOffset = 0
        let wrapCount = 0
        let originalHeight = this.height
        let lastWrap = 0
        let charPixelWidths = 0;
        ctx.font = `${editor.fontSize}px ${editor.fontFamily}`;
        for (let i = 0; i < this.characters.length; i++) {
            const charPixelWidth = ctx.measureText(this.characters[i]).width
            charPixelWidths += charPixelWidth
            ctx.fillStyle = editor.fontColor
            ctx.fillText(this.characters[i], this.x + xOffset, this.y + this.height)
            xOffset += charPixelWidth
            wrapCount = Math.floor(charPixelWidths / this.width)
            this.height = (wrapCount+1) * originalHeight
            if (wrapCount > lastWrap) {
                xOffset = 0
                lastWrap = wrapCount
            }
            if (i === this.caret && editor.selectedLine === this) {
                ctx.fillStyle = 'purple'
                ctx.fillRect(this.x + xOffset, this.y, 1, this.height)
            }
        }
    }
}


export { Line };