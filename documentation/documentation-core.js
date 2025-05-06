var activeDocumentation = null;

function changeHash(hash) {
    location.hash = hash;
}


function onHashChange() {
    const hash = location.hash.substring(1);
    fetchDocumentation(hash);
}

window.addEventListener("hashchange", onHashChange);

function fetchDocumentation(name) {
    if (activeDocumentation) {
        activeDocumentation.classList.remove("active");
    }
    try {
        activeDocumentation = document.getElementById("b-" + name);
        activeDocumentation.classList.add("active");
    
        fetch("/documentation/json/" + name + ".json")
            .then((response) => response.json())
            .then((data) => showDocumentation(data)).catch((e) => {
                console.error(e);
                changeHash("what-is-python");
            });

    } catch {
        changeHash("what-is-python");
    }
}

function showDocumentation(data) {
    document.title = data.title;

    const content = document.getElementById("documentation-content");
    content.innerHTML = "";

    // Helper: create a styled small <hr>
    function createSmallHr() {
        const hr = document.createElement("hr");
        hr.style.width = "96%";
        hr.style.margin = "1rem auto";
        hr.style.opacity = "0.3";
        return hr;
    }

    // Helper: create a styled large <hr>
    function createLargeHr() {
        const hr = document.createElement("hr");
        hr.style.margin = "2rem auto";
        hr.style.opacity = "0.6";
        return hr;
    }

    // Title
    const title = document.createElement("h1");
    title.innerHTML = data.title;
    content.appendChild(title);

    // Syntax
    if (data.syntax != null) {
        const header = document.createElement("h2");
        header.innerHTML = "Syntax";
        content.appendChild(header);

        const syntaxCode = document.createElement("div");
        syntaxCode.innerHTML = data.syntax.code;
        content.appendChild(syntaxCode);

        const syntaxDescription = document.createElement("p");
        syntaxDescription.innerHTML = data.syntax.description;
        content.appendChild(syntaxDescription);

        content.appendChild(createLargeHr());
    }

    // Content section
    if (data.content) {
        data.content.forEach((item, index) => {
            const header = document.createElement("h2");
            header.innerHTML = item.header;
            content.appendChild(header);

            const p = document.createElement("p");
            p.innerHTML = item.content;
            content.appendChild(p);

            if (index < data.content.length - 1) {
                content.appendChild(createSmallHr());
            }
        });

        content.appendChild(createLargeHr());
    }

    // Examples
    const examplesData = data.examples;
    if (examplesData) {
        const container = document.createElement("div");
        const header = document.createElement("h2");
        header.textContent = examplesData.header;
        container.appendChild(header);

        examplesData.content.forEach((example, index) => {
            const exampleDiv = document.createElement("div");
            exampleDiv.classList.add("example-block");

            const description = document.createElement("p");
            description.classList.add("example-description");
            description.textContent = example.description;
            exampleDiv.appendChild(description);

            const code = document.createElement("pre");
            code.classList.add("example-code");
            code.innerHTML = example.code;
            exampleDiv.appendChild(code);

            const result = document.createElement("div");
            result.classList.add("example-result");
            result.innerHTML = `<strong>Output:</strong> ${example.result}`;
            exampleDiv.appendChild(result);

            container.appendChild(exampleDiv);

            if (index < examplesData.content.length - 1) {
                container.appendChild(createSmallHr());
            }
        });

        content.appendChild(container);
        content.appendChild(createLargeHr());
    }

    // Notes
    if (data.note && data.note.content) {
        const noteHeader = document.createElement("h2");
        noteHeader.innerHTML = "Note";
        content.appendChild(noteHeader);

        data.note.content.forEach((item, index) => {
            const noteItemHeader = document.createElement("h3");
            noteItemHeader.innerHTML = item.header;
            content.appendChild(noteItemHeader);

            const noteItemP = document.createElement("p");
            noteItemP.innerHTML = item.content;
            content.appendChild(noteItemP);

            if (index < data.note.content.length - 1) {
                content.appendChild(createSmallHr());
            }
        });
    }
}


function smallHr() {
        const smallHr = document.createElement("hr");
        smallHr.style.opacity = "0.3";
        smallHr.style.margin = "1rem 0";
        return smallHr;
}



window.addEventListener("DOMContentLoaded", () => {
    if (!location.hash) {

        changeHash("what-is-python");
    }
    else {
        onHashChange();
    }
});
