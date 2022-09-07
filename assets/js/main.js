const typingText = document.querySelector(".typing-text");
const inputField = document.querySelector(".input-field");
const mistakesTag = document.querySelector(".mistakes span");
const timerTag = document.querySelector(".timer span");
const cpmTag = document.querySelector(".cpm span");
const restartBtn = document.querySelector(".restart-btn");

let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let timer;
let maxTime = 60;
let timeLeft = maxTime;

function randomParaghraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
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

    if (charIndex < characters.length - 1 && timeLeft > 0) {
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
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randomParaghraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    isTyping = false;
    timerTag.innerText = timeLeft;
    mistakesTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParaghraph();
inputField.addEventListener("input", initTyping);
restartBtn.addEventListener("click", resetGame);
