//your JS code here.
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
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
    if (score !== null) {
        scoreDisplay.textContent = `Your last score: ${score} out of 5`;
    }
}

function renderQuestions() {
    const progress = loadProgress();
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            if (progress[i] === choice) {
                choiceElement.setAttribute("checked", true);
            }
            choiceElement.addEventListener("change", () => {
                progress[i] = choice;
                saveProgress(progress);
            });
            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
        }
        questionsContainer.appendChild(questionElement);
    }
}

function calculateScore() {
    const progress = loadProgress();
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (progress[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

submitButton.addEventListener("click", () => {
    const finalScore = calculateScore();
    scoreDisplay.textContent = `Your score is ${finalScore} out of 5`;
    localStorage.setItem("score", finalScore);
});

renderQuestions();
loadScore();


