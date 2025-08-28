let designProjectNames = ["project-bar", "project-fns", "project-rover", "project-mower"];
let codingProjectNames = ["project-QE", "project-pUI", "project-game", "project-poem"];


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

    deselectDesignProjects(section !== 'design')
    deselectCodingProjects(section !== 'coding')

    let projectText = document.getElementById(`${project}-text`);
    projectText.style.display = "flex";
}

window.onhashchange = function () {
    if (!designProjectNames.includes(window.location.hash.substring(1))) {
        deselectDesignProjects()
    }
    if (!codingProjectNames.includes(window.location.hash.substring(1))) {
        deselectCodingProjects()
    }
}