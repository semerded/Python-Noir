// you have to request access to the proxy server with the following link:
// https://cors-anywhere.herokuapp.com/corsdemo

const apiUrl = "https://glot.io/api/run/python/latest";
const proxyUrl = "http://localhost:5000/proxy?url="; // Proxy URL
const url = proxyUrl + apiUrl;
let loadingAnimationActive = false;

const consoleContainer = document.getElementById("console");
const consolePrefix = "C:\\PythonNoir>";
let currentChapter = parseInt(localStorage.getItem("currentChapter")) ?? 0;
let savedCode = localStorage.getItem("savedCode");
let expectedOutput;
let expectedCode;
let currentHintIndex = 0;
let hints = [];
let magnifyingGlassConfirmCounter = 0;

let magnifyingGlassCount = localStorage.getItem("magnifyingGlassCount");
if (magnifyingGlassCount === null) {
    localStorage.setItem("magnifyingGlassCount", 3);
    magnifyingGlassCount = 0;
}

let mysteryData;

fetch("/mystery/mystery-data.json")
    .then((response) => response.json())
    .then((data) => {
        mysteryData = data;
        insertChapterData();
        if (savedCode !== null) {
            textarea.value = savedCode;
        }
        document.title = "Chapter " + (currentChapter + 1);
        updateHighlighting();
    });

function nextChapter() {
    currentChapter++;
    if (currentChapter == 3) {
        localStorage.setItem("magnifyingGlassCount", 4);
        magnifyingGlassCount = 4;
    }
    magnifyingGlassConfirmCounter = 0;
    document.title = "Chapter " + (currentChapter + 1);
    localStorage.setItem("currentChapter", currentChapter);
    localStorage.removeItem("savedCode");
    document.getElementById("popup").style.display = "none";
    insertChapterData();
    document.getElementById("console").innerHTML = "Montie&apos;s-terminal>";
    document.getElementById("hint").style.display = "none";
    localStorage.setItem("mg-used", false);
    updateHighlighting();
}

function submitCode() {
    const code = document.getElementById("editor").value;
    console.log("code being send to interpreter:", code);

    consoleContainer.innerHTML =
        consolePrefix +
        ' mystery-solver.exe running code<span id="loadingAnimation"></span>';
    loadingAnimationActive = true;
    loadingAnimation("loadingAnimation");

    const data = {
        files: [
            {
                name: "main.py",
                content: code,
            },
        ],
    };
    fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Token ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            loadingAnimationActive = false;

            console.log("Response:", data);
            if (data.stdout) {
                console.log("Output:", data.stdout);
                let output = data.stdout
                    .substring(data.stderr.indexOf(",") + 1)
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\n/g, "<br>") // Replace newlines with <br> tags
                    .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"); // Convert tabs to spaces
                consoleContainer.innerHTML =
                    consolePrefix +
                    " mystery solver.exe result:<br>" +
                    "<span style='color: yellowgreen;'>" +
                    output +
                    "</span>";

                console.log(output, expectedOutput, output === expectedOutput);

                if (data.stdout.replace(/\n/g, "") === expectedOutput) {
                    document.getElementById("popup").style.display = "flex";
                }
            }
            if (data.stderr) {
                console.error("Error:", data.stderr);
                let errOutput = data.stderr
                    .substring(data.stderr.indexOf(",") + 1)
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\n/g, "<br>") // Replace newlines with <br> tags
                    .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"); // Convert tabs to spaces
                consoleContainer.innerHTML =
                    consolePrefix +
                    " mystery solver.exe error:<br>" +
                    "<pre style='color: red;'>" +
                    errOutput +
                    "</pre>";
            }
        })
        .catch((error) => console.error("Error:", error));
}

function loadingAnimation(id) {
    var animation = document.getElementById(id);
    if (loadingAnimationActive) {
        if (animation.innerHTML.length >= 3) {
            animation.innerHTML = "";
        }
        animation.innerHTML = animation.innerHTML + ".";
        setTimeout(() => loadingAnimation(id), 250);
    } else {
        // idk what else
    }
}

function insertChapterData() {
    let chapterData = mysteryData[currentChapter];
    document.getElementById("story-title").innerHTML = chapterData["title"];
    document.getElementById("story-content").innerHTML = chapterData[
        "story"
    ].replaceAll("\n", "<br>");
    document.getElementById("story-challenge").innerHTML =
        chapterData["challenge"];
    document.getElementById("popup-text").innerHTML =
        chapterData["success_message"];
    if (localStorage.getItem("mg-used") === "true") {
        document.getElementById("editor").value = chapterData["expected_code"];
    } else {
        document.getElementById("editor").value =
            "# Magnifying glass used\n\n" + chapterData["starter_code"];
    }
    document.getElementById("story-type").innerHTML =
        "# type: " + chapterData["type"];
    let chapter = currentChapter + 1;
    document.getElementById("story-chapter").innerHTML =
        "# chapter: " + chapter;
    expectedOutput = chapterData["expected_output"];

    document.getElementById("relevant-docs").innerHTML = "";
    for (let i = 0; i < chapterData["relevant_docs"].length; i++) {
        let a = document.createElement("a");
        a.innerHTML = chapterData["relevant_docs"][i].replaceAll("-", " ");
        a.href =
            "/documentation/documentation.html#" +
            chapterData["relevant_docs"][i];
        a.target = "_blank";
        document.getElementById("relevant-docs").append(a);
    }

    const hintButton = document.getElementById("hint-button");
    if (chapterData["hint"] != null) {
        hintButton.style.display = "flex";
        hints = chapterData["hint"];

        updateHint();
    } else {
        hintButton.style.display = "none";
    }

    if (chapterData["mg"]) {
        document.getElementById("use-magnifying-glass").innerHTML =
            "Use magnifying glass, " + magnifyingGlassCount + " left";
    } else {
        document.getElementById("use-magnifying-glass").style.display = "none";
    }
}

function updateHint() {
    document.getElementById("hint").innerHTML = hints[currentHintIndex];
    document.getElementById("hints-available").innerHTML =
        currentHintIndex + 1 + "/" + hints.length;
}

function toggleHint() {
    const hint = document.getElementById("hint-popup");
    const hintButtonIcon = document.getElementById("hint-button").children[0];

    if (hint.style.display === "flex") {
        hint.style.display = "none";
        hintButtonIcon.classList.remove("fa-circle-xmark");
        hintButtonIcon.classList.add("fa-circle-question");
        magnifyingGlassConfirmCounter = 0;
        document.getElementById("use-magnifying-glass").innerHTML =
        "Use magnifying glass, " + magnifyingGlassCount + " left";
    } else {
        hint.style.display = "flex";
        hintButtonIcon.classList.remove("fa-circle-question");
        hintButtonIcon.classList.add("fa-circle-xmark");
    }
}

function nextHint() {
    if (currentHintIndex + 1 < hints.length) {
        currentHintIndex++;
        updateHint();
    }
}

function previousHint() {
    if (currentHintIndex - 1 >= 0) {
        currentHintIndex--;
        updateHint();
    }
}

function useMagnifyingGlass() {
    let magnifyingGlassButton = document.getElementById("use-magnifying-glass");
    if (magnifyingGlassCount === 0) {
        magnifyingGlassButton.innerHTML = "Out of magnifying glasses";
        return;
    }

    switch (magnifyingGlassConfirmCounter) {
        case 0:
            magnifyingGlassButton.innerHTML = "Are you sure?";
            break;
        case 1:
            magnifyingGlassCount--;
            localStorage.setItem("magnifyingGlassCount", magnifyingGlassCount);
            magnifyingGlassButton.innerHTML =
                "1 magnifying glass used, " + magnifyingGlassCount + " left";
            localStorage.setItem("mg-used", true);
            document.getElementById("editor").value =
                "# Magnifying glass used\n\n" + chapterData["starter_code"];

            break;
    }
    magnifyingGlassConfirmCounter++;
}

textarea.addEventListener("input", () => {
    localStorage.setItem("savedCode", textarea.value);
});

textarea.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Insert tab character
        this.value =
            this.value.substring(0, start) + "\t" + this.value.substring(end);

        // Move cursor after the tab
        this.selectionStart = this.selectionEnd = start + 1;
        updateHighlighting();
    }
});

function resetLevel() {
    localStorage.removeItem("savedCode");
    location.reload();
}

function setLevel(level) {
    localStorage.setItem("currentChapter", level);
    location.reload();
}

function reset() {
    localStorage.setItem("currentChapter", 0);
    resetLevel();
}
