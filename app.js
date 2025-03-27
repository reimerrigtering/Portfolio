elementHome = {"intro": 0, "design": 75, "coding": 175, "contact": 275}
let containerPos = 0;
let startTime = Date.now()
let hasScrolled = false
let instruction = null
let lastTouchPosition = null
instructionTimer = 5000
maxScroll = 400


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
    document.getElementById("container").style.left = containerPos + 'vw';
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

function swipeElements(event) {
    let touchPosistion = event.touches[0].pageX
    if (lastTouchPosition !== null) {
        let distance = lastTouchPosition - touchPosistion
        if (containerPos <= -maxScroll && distance > 0) { return }
        containerPos = Math.min(containerPos - distance / 10, 0)
        setElements()
    }
    lastTouchPosition = touchPosistion
}

function swipeEnd() {
    lastTouchPosition = null
}

document.addEventListener("wheel", scrollElements);
document.addEventListener("touchmove", swipeElements);
document.addEventListener("touchend", swipeEnd);
