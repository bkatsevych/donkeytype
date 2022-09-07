const typingText = document.querySelector(".typing-text");
const inputField = document.querySelector(".input-field");
const mistakesTag = document.querySelector(".mistakes span");
const timerTag = document.querySelector(".timer span");

let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let timer;
let maxTime = 60;
let timeLeft = maxTime;

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

    if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }

    if (typedChar == null) {
        charIndex--;

        if (characters[charIndex].classList.contains("incorrect-char")) {
            mistakes--;
        }

        characters[charIndex].classList.remove(
            "correct-char",
            "incorrect-char"
        );
    } else {
        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("correct-char");
        } else {
            mistakes++;
            characters[charIndex].classList.add("incorrect-char");
        }
        charIndex++;
    }

    characters.forEach((span) => span.classList.remove("cursor"));
    characters[charIndex].classList.add("cursor");

    mistakesTag.innerText = mistakes;
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

randomParahraph();
inputField.addEventListener("input", initTyping);
