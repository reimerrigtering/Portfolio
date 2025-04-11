elementHome = {"intro": 0, "design": 75, "gallery": 100, "coding": 175, "contact": 275}
let containerPos = 0;
let startTime = Date.now()
let hasMoved = false
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
        if (!hasMoved) {
            let instruction = document.getElementById("moveInstructionBox");
            instruction.style.display = "block";
            instruction.classList.add("fade-in");
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

function processMove() {
    if (!hasMoved) {
        hasMoved = true
        if (Date.now() - startTime > instructionTimer) {
            let instruction = document.getElementById("moveInstructionBox");
            instruction.classList.add("fade-out");
            setTimeout(function () {
                instruction.style.display = "none";
            }, 500)
        }
    }
}

function scrollElements(event) {
    processMove()
    let direction
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        direction = event.deltaY;
    }
    else {
        direction = event.deltaX;
    }
    if (containerPos <= -maxScroll && direction > 0) { return }
    containerPos = Math.min(containerPos - direction / 10, 0)
    setElements()
}

function swipeElements(event) {
    processMove()
    let touchPosistion = event.touches[0].pageX
    if (lastTouchPosition !== null) {
        let distance = lastTouchPosition - touchPosistion
        if (containerPos <= -maxScroll && distance > 0) { return }
        containerPos = Math.min(containerPos - distance / 5, 0)
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
