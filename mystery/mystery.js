// you have to request access to the proxy server with the following link:
// https://cors-anywhere.herokuapp.com/corsdemo

const apiUrl = "https://glot.io/api/run/python/latest";
const proxyUrl = "http://localhost:5000/proxy?url="; // Proxy URL
const url = proxyUrl + apiUrl;
var loadingAnimationActive = false;

const consoleContainer = document.getElementById("console");
const consolePrefix = "C:\\PythonNoir>";

function submitCode() {
    const code = document.getElementById("code-area").value;
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
                consoleContainer.innerHTML = consolePrefix + " mystery solver.exe result:<br>" + "<span style='color: green;'>" + data.stdout + "</span>";
            }
            if (data.stderr) {
                console.error("Error:", data.stderr);
                let errOutput = data.stderr.substring(data.stderr.indexOf(",") + 1).replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>') // Replace newlines with <br> tags
                .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // Convert tabs to spaces
                consoleContainer.innerHTML = consolePrefix + " mystery solver.exe error:<br>" + "<pre style='color: red;'>" + errOutput + "</pre>";
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
    }
}
