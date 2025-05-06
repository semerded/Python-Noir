const textarea = document.getElementById("editor");
const highlighted = document.getElementById("highlighted");

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function highlightPython(code) {
    // Step 1: Escape HTML first
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  
    const markers = [];
    let markerId = 0;
  
    function protect(regex, className) {
      code = code.replace(regex, (match) => {
        const marker = `__MARKER__${markerId}__`;
        markers.push(`<span class="token-${className}">${match}</span>`);
        markerId++;
        return marker;
      });
    }
  
    // Step 2: Protect code parts
    protect(/#.*$/gm, 'comment'); // comments
    protect(/(["'])(?:(?!\1)[^\\]|\\.)*\1/g, 'string'); // strings
    protect(/\b\d+(\.\d+)?\b/g, 'number'); // numbers
    protect(/\b(def|class|if|else|elif|return|for|while|import|from|as|True|False|None|and|or|not|in|is|with|break|continue|pass|print)\b/g, 'keyword'); // keywords
    // protect(/\b([a-zA-Z_][\w]*)\s*(?=\()/g, 'func'); // function calls
  
    // Step 3: Replace markers with HTML
    markers.forEach((html, i) => {
      code = code.replace(`__MARKER__${i}__`, html);
    });
  
    return code;
  }
  
  
  

function updateHighlighting() {
    const code = escapeHTML(textarea.value);
    highlighted.innerHTML = highlightPython(code);
}

textarea.addEventListener("input", updateHighlighting);

// Keep scroll in sync
textarea.addEventListener("scroll", () => {
    highlighted.parentElement.scrollTop = textarea.scrollTop;
    highlighted.parentElement.scrollLeft = textarea.scrollLeft;
});

// Initial call
updateHighlighting();
