const questions = [
    {
        question: "Which of these is an interesting mourning practice of Orthodox jews?",
        answers: [
            {text: "Dying your hair black", correct: false},
            {text: "Covering all mirrors in the home", correct: true},
            {text: "Shaving your eyebrows", correct: false},
            {text: "Drinking kombucha", correct: false}


        ]
    },
    {
        question: "What percentage of pandas are owned by China? (At least they claim to...)",
        answers: [
            {text: "100", correct: true},
            {text: "69", correct: false},
            {text: "37", correct: false},
            {text: "86", correct: false}


        ]
    },
    {
        question: "Which US president was nicknamed 'The Short Sir'?",
        answers: [
            {text: "Andrew Johnson", correct: false},
            {text: "Grover Cleveland", correct: false},
            {text: "Teddy Roosevelt", correct: false},
            {text: "James Madison", correct: true}


        ]
    },
    {
        question: "For which rare gemstone is Chile a home?",
        answers: [
            {text: "Emerald", correct: false},
            {text: "Blue lapis stone", correct: true},
            {text: "Tungsten", correct: false},
            {text: "Rose gold", correct: false}


        ]
    },
    {
        question: "Which volcano is famous for its unique color, given by sulfur and salt crystals?",
        answers: [
            {text: "Serengeti", correct: false},
            {text: "Etna", correct: false},
            {text: "Dallol", correct: true},
            {text: "Tuvalu", correct: false}


        ]
    },
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of 5`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();