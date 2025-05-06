// you have to request access to the proxy server with the following link:
// https://cors-anywhere.herokuapp.com/corsdemo

const apiUrl = "https://glot.io/api/run/python/latest";
const proxyUrl = "http://localhost:5000/proxy?url="; // Proxy URL
const url = proxyUrl + apiUrl;
var loadingAnimationActive = false;

const consoleContainer = document.getElementById("console");
const consolePrefix = "C:\\PythonNoir>";
let currentChapter = parseInt(localStorage.getItem("currentChapter")) ?? 0;
var expectedOutput;

let mysteryData;

fetch("/mystery/mystery-data.json")
.then((response) => response.json())
.then((data) => {
    mysteryData = data;
    insertChapterData();
    updateHighlighting();
});




function nextChapter() {
    currentChapter++;
    localStorage.setItem("currentChapter", currentChapter);
    document.getElementById("popup").style.display = "none";
    insertChapterData();
    document.getElementById("console").innerHTML = "Montie&apos;s-terminal>";
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
                consoleContainer.innerHTML =
                    consolePrefix +
                    " mystery solver.exe result:<br>" +
                    "<span style='color: yellowgreen;'>" +
                    data.stdout +
                    "</span>";

                console.log(data.stdout, expectedOutput, data.stdout === expectedOutput);
                
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
    console.log(mysteryData);
    
    let chapterData = mysteryData[currentChapter];
    document.getElementById("story-title").innerHTML = chapterData["title"];
    document.getElementById("story-content").innerHTML = chapterData["story"];
    document.getElementById("story-challenge").innerHTML =
        chapterData["challenge"];
    document.getElementById("popup-text").innerHTML =
        chapterData["success_message"];
    document.getElementById("editor").value = chapterData["starter_code"];
    document.getElementById("story-type").innerHTML = "# type: " + chapterData["type"];
    let chapter = currentChapter + 1;
    document.getElementById("story-chapter").innerHTML = "# chapter: " + chapter;
    expectedOutput = chapterData["expected_output"];

    document.getElementById("relevant-docs").innerHTML = "";
    for (let i = 0; i < chapterData["relevant_docs"].length; i++) {
        let a = document.createElement("a");
        a.innerHTML = chapterData["relevant_docs"][i].replaceAll("-", " ");
        a.href = "/documentation/documentation.html#" + chapterData["relevant_docs"][i];
        a.target = "_blank";
        document.getElementById("relevant-docs").append(a) ;
    }
}

function reset() {
    localStorage.setItem("currentChapter", 0);
    location.reload();
}