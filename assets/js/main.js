const typingText = document.querySelector(".typing-text");
const inputField = document.querySelector(".input-field");

let charIndex = 0;

function randomParahraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").forEach((char) => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if (typedChar == null) {
        charIndex--;
        characters[charIndex].classList.remove(
            "correct-char",
            "incorrect-char"
        );
    } else {
        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("correct-char");
        } else {
            characters[charIndex].classList.add("incorrect-char");
        }
        charIndex++;
    }

    characters.forEach((span) => span.classList.remove("cursor"));
    characters[charIndex].classList.add("cursor");
}

randomParahraph();
inputField.addEventListener("input", initTyping);
