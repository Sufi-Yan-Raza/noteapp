const notesContainer = document.querySelector(".notes__container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input__notes");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
};
showNotes();
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
};

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.setAttribute('contenteditable', "true");
    inputBox.className = 'input__notes';

    img.src = "/src/images/delete.png";

    inputBox.appendChild(img);
    notesContainer.insertBefore(inputBox, notesContainer.firstChild);
})

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input__notes");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }

        });
    }
})
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        
        const br = document.createElement("br");
        range.deleteContents();
        range.insertNode(br);

        // Move the caret to the new line
        range.setStartAfter(br);
        range.setEndAfter(br);

        event.preventDefault();
    }
});


