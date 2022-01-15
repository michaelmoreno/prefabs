// get mouse position
const userInput = {}
document.onmousemove = e => [userInput.x, userInput.y] = [e.clientX, e.clientY]
document.onmousedown = e => userInput.click = true
document.onmouseup = e => userInput.click = false
document.onkeydown = e => userInput.key = e.key
document.onkeyup = e => userInput.key = null

export { userInput }