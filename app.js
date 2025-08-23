let designProjectNames = ["project-bar", "project-fns", "project-rover", "project-mower"];


function resetDesignText() {
    let generalDesignText = document.getElementById("general-design-text");
    generalDesignText.style.display = "flex";
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

function selectProject(project) {
    deselectDesignProjects(false)
    let projectText = document.getElementById(`${project}-text`);
    projectText.style.display = "flex";
}

function selectDesignProject(project) {
    let generalText = document.getElementById("general-design-text");
    generalText.style.display = "none";
    selectProject(project);
}

window.onhashchange = function () {
    if (!designProjectNames.includes(window.location.hash.substring(1))) {
        deselectDesignProjects()
    }
}