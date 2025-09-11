const designProjectNames = ["project-bar", "project-fns", "project-rover", "project-mower"];
const codingProjectNames = ["project-QE", "project-pUI", "project-game", "project-poem"];

function showImages(project) {
    let imageContainer = document.getElementById(`${project}-gallery`);
    let imageGallery = imageContainer.lastElementChild;
    let imageGalleryAmount = imageGallery.children.length
    let openButtonImage = imageContainer.firstElementChild.firstElementChild;

    const screenOrientationLandscape = window.matchMedia("(orientation: landscape)").matches;

    // Resetting animation
    imageContainer.style.animation = 'none';
    imageContainer.offsetHeight;

    // Closing
    if (openButtonImage.style.transform === "rotate(180deg)") {
        openButtonImage.style.transform = "rotate(0deg)";
        imageGallery.style.display = "none";

        if (screenOrientationLandscape) {
            imageContainer.style.animation = "close-project-gallery 0.5s forwards"
        }
        else {
            imageContainer.style.animation = "close-project-gallery 0.5s forwards"
        }
    }
    // Opening
    else {
        openButtonImage.style.transform = "rotate(180deg)";
        imageGallery.style.display = "flex";

        if (screenOrientationLandscape) {
            if (imageGalleryAmount <= 3) {
                imageContainer.style.animation = "open-project-gallery-landscape 0.5s forwards"
            }
            else {
                imageContainer.style.animation = "open-project-gallery-landscape-large 0.5s forwards"
            }
        }
        else {
            imageContainer.style.animation = "open-project-gallery-portrait 0.5s forwards"
        }
    }
}

function resetDesignText() {
    let generalDesignText = document.getElementById("general-design-text");
    generalDesignText.style.display = "flex";
}

function resetCodingText() {
    let generalCodingText = document.getElementById("general-coding-text");
    generalCodingText.style.display = "flex";
}

function deselectDesignProjects(enableGeneral = true) {
    designProjectNames.forEach((project) =>
    {
        let projectText = document.getElementById(`${project}-text`);
        projectText.style.display = "none";
    });

    if (enableGeneral) {
        resetDesignText();
    }
}

function deselectCodingProjects(enableGeneral = true) {
    codingProjectNames.forEach((project) =>
    {
        let projectText = document.getElementById(`${project}-text`);
        projectText.style.display = "none";
    });

    if (enableGeneral) {
        resetCodingText();
    }
}

function selectProject(project, section) {
    let generalText = document.getElementById(`general-${section}-text`);
    generalText.style.display = "none";

    deselectDesignProjects(section !== 'design');
    deselectCodingProjects(section !== 'coding');

    let projectText = document.getElementById(`${project}-text`);
    projectText.style.display = "flex";
}

function popupBubble(id) {
    if (id.includes(window.location.hash.substring(1)) &&
    window.location.hash.substring(1) !== "") {
        return;
    }
    let bubble = document.getElementById(id);
    bubble.style.animation = "read-more-bubble-popup 0.8s forwards";
}

function removePopupBubble(id) {
    let bubble = document.getElementById(id);
    bubble.style.animation = null;
}

window.onhashchange = function () {
    if (!designProjectNames.includes(window.location.hash.substring(1))) {
        deselectDesignProjects();
    }
    if (!codingProjectNames.includes(window.location.hash.substring(1))) {
        deselectCodingProjects();
    }
}