const questions = [
    {
        question: "Who is known as the father of computers?",
        answers: [
            { text: "Charles Babbage", correct: true },
            { text: "Alan Turing", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "O₂", correct: false },
            { text: "H₂O", correct: true },
            { text: "CO₂", correct: false },
            { text: "HO₂", correct: false },
        ]
    },
    {
        question: "What is the largest land animal in the world?",
        answers: [
            { text: "Elephant", correct: true },
            { text: "Rhino", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Hippopotamus", correct: false },
        ]
    },
    {
        question: "What is the main gas found in the air we breathe?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Carbon Dioxide", correct: false },
            { text: "Nitrogen", correct: true },
            { text: "Hydrogen", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
            { text: "Australia", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const startButton = document.getElementById("startQuiz");
const homePage = document.getElementById("homePage");
const quizPage = document.getElementById("quizPage");
const time = document.getElementById("time");

quizPage.style.display = "none"

let currentQuestionIndex = 0;
let score = 0;
let timeInterval;
let timeLeft = 20;

function startQuiz() {
    timefunc();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    });
}



function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        clearInterval(timeInterval);
    } else {
        selectedBtn.classList.add("incorrect");
        clearInterval(timeInterval);
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    document.getElementById("time").textContent = ``;
    clearInterval(timeInterval)
}

function handleNextButton() {
    timefunc();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

function timefunc() {
    clearInterval(timeInterval);
    timeLeft = 20;
    updateTimer();

    timeInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
            nextButton.style.display = "block"
            document.getElementById("time").textContent = `Time's up!`;
        }
        
    }, 1000);
}

function updateTimer() {
    time.textContent = `Time Left: ${timeLeft} seconds`;
    if(timeLeft <= 5){
        time.style.color = "red";
        time.classList.add("timeClass");

    }else{
        time.style.color = "black";
        time.classList.remove("timeClass");
    }
    if(timeLeft <= 0) {
        time.classList.remove("timeClass");
    }
}

startButton.addEventListener("click", () => {
    homePage.style.display = "none"
    quizPage.style.display = "block"
    startQuiz();
})

