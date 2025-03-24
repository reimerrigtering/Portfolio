elementHome = {"intro": 0, "design": 150, "coding": 350, "contact": 550}
let containerPos = 0;
let startTime = Date.now()
let hasScrolled = false
let instruction = null
instructionTimer = 10000
maxScroll = 900


function init() {
    setElements()
    showScrollInstruction()
}

function showScrollInstruction() {
    instruction = setTimeout(showScrollInstruction, 1000)
    if (Date.now() - startTime > instructionTimer) {
        if (!hasScrolled) {
            document.getElementById("scrollInstructionBox").classList.add("fade-in")
        }
        clearTimeout(instruction)
    }
}

function setElements() {
    document.getElementById("container").style.left = containerPos + 'vh';
}

function setElementsTo(scrollPosition) {
    if (Object.keys(elementHome).includes(scrollPosition)) {
        scrollPosition = Math.max(elementHome[scrollPosition] - 5, 0);
    } else {
        return
    }
    containerPos = Math.min(-Math.min(scrollPosition, maxScroll), 0);
    setElements()
}

function scrollElements(event) {
    if (!hasScrolled) {
        hasScrolled = true
        if (Date.now() - startTime > instructionTimer) {
            document.getElementById("scrollInstructionBox").classList.add("fade-out")
        }
    }
    let direction = event.deltaY;
    if (containerPos <= -maxScroll && direction > 0) { return }
    containerPos = Math.min(containerPos - direction / 10, 0)
    setElements()
}

document.addEventListener("wheel", scrollElements);
