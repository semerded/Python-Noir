var activeDocumentation = null;

function fetchDocumentation(name) {
    if (activeDocumentation) {
        activeDocumentation.classList.remove("active");
    }
    activeDocumentation = document.getElementById(name);
    activeDocumentation.classList.add("active");

    fetch("/documentation/json/" + name + ".json")
        .then((response) => response.json())
        .then((data) => showDocumentation(data));
}

function showDocumentation(data) {
    document.title = data.title;

    const content = document.getElementById("documentation-content");
    content.innerHTML = "";

    const title = document.createElement("h1");
    title.innerHTML = data.title;
    content.appendChild(title);

    if (data.syntax != null) {
        const header = document.createElement("h2");
        header.innerHTML = "Syntax";
        content.appendChild(header);

        const syntaxCode = document.createElement("div");
        syntaxCode.innerHTML = data.syntax["code"];
        const syntaxDescription = document.createElement("p");
        syntaxDescription.innerHTML += data.syntax["description"];
        content.appendChild(syntaxCode);
        content.appendChild(syntaxDescription);
    }

    for (let i = 0; i < data.content.length; i++) {
        const item = data.content[i];
        const header = document.createElement("h2");
        header.innerHTML = item.header;
        content.appendChild(header);
        const p = document.createElement("p");
        p.innerHTML = item.content;
        content.appendChild(p);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchDocumentation("what-is-python");
});
