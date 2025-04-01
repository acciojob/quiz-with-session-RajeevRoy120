//your JS code here.
const questions = [
    { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
    { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
    { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
    { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" },
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

function loadProgress() {
    return JSON.parse(sessionStorage.getItem("progress")) || {};
}

function saveProgress(progress) {
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadScore() {
    const score = localStorage.getItem("score");
    scoreDisplay.textContent = score !== null ? `Your last score: ${score} out of ${questions.length}` : "No previous score recorded.";
}

function renderQuestions() {
    const progress = loadProgress();
    questionsContainer.innerHTML = "";  // Clear existing questions to prevent duplicates

    questions.forEach((question, i) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionBlock.appendChild(questionText);

        question.choices.forEach(choice => {
            const label = document.createElement("label");
            const choiceElement = document.createElement("input");

            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);

            if (progress[i] === choice) {
                choiceElement.checked = true;
            }

            choiceElement.addEventListener("change", () => {
                progress[i] = choice;
                saveProgress(progress);
            });

            label.appendChild(choiceElement);
            label.appendChild(document.createTextNode(choice));
            questionBlock.appendChild(label);
            questionBlock.appendChild(document.createElement("br"));
        });

        questionsContainer.appendChild(questionBlock);
    });
}

function calculateScore() {
    const progress = loadProgress();
    return questions.reduce((score, question, i) => score + (progress[i] === question.answer ? 1 : 0), 0);
}

submitButton.addEventListener("click", () => {
    const finalScore = calculateScore();
    scoreDisplay.textContent = `Your score is ${finalScore} out of ${questions.length}`;
    localStorage.setItem("score", finalScore);
});

renderQuestions();
loadScore();

