import { Editor } from './editor.js';
import { Line } from './line.js';
import { userInput } from './events.js';

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

function size() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
size()
canvas.style.backgroundColor = '#fff'
document.body.style.margin = '0'
document.body.style.cssText = 'margin: 0; overflow: hidden;'
document.addEventListener('resize', size)



const editor = new Editor(0, 0, canvas.width * .8, canvas.height * .8, userInput)

editor.addLine('hello wo')
editor.addLine('hello world')
editor.addLine('hello rld')

let count = 0
function renderLoop() {
    count+=1
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    editor.update()
    editor.render(ctx)
    userInput.key = null
    // if (count < 1)
    requestAnimationFrame(renderLoop)
}

renderLoop()