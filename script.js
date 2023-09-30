const questions = [
    {
        question : "Word lenght of a Personal Computer is ______ ?",
        answers : [
            {text: "4 bits", correct: false},
            {text: "8 bits", correct: true},
            {text: "16 bits", correct: false},
            {text: "64 bits", correct: false},
        ]
    },
    {
        question : "Which is not a font style ?",
        answers : [
            {text: "Bold", correct: false},
            {text: "Regular", correct: false},
            {text: "Superscript", correct: true},
            {text: "Italic", correct: false},
        ]
    },
    {
        question : "Ms-power point is a ______ language",
        answers : [
            {text: "Presentation", correct: true},
            {text: "Document", correct: false},
            {text: "Spreadsheet", correct: false},
            {text: "Progammatic", correct: false}
        ]
    },
    {
        question : "The combination of a row and column is called ___",
        answers : [
            {text: "Line", correct: false},
            {text: "Row", correct: false},
            {text: "Column", correct: false},
            {text: "Cell", correct: true},
        ]
    },
    {
        question : "____ are software which is used to do particular task",
        answers : [
            {text: "Program", correct: false},
            {text: "Operating System", correct: true},
            {text: "Data", correct: false},
            {text: "Software", correct: false},
        ]
    }
];

const qstnElement = document.getElementById("qstn");
const answrButton = document.getElementById("options");
const nxtbutton = document.getElementById("nxt-btn");


let currentQstnIndex = 0;
let score = 0;

function startQuiz(){
    currentQstnIndex = 0;
    score=0;
    nxtbutton.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentqstn = questions[currentQstnIndex];
    let qstnNo = currentQstnIndex + 1;
    qstnElement.innerHTML = qstnNo + "." + currentqstn.question;


    currentqstn.answers.forEach(answers => {
        const button =document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn")
        answrButton.appendChild(button)
        if(answers.correct){
            button.dataset.correct = answers.correct
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nxtbutton.style.display="none";
    while(answrButton.firstChild){
        answrButton.removeChild(answrButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct")
        score++;
    }else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(answrButton.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nxtbutton.style.display ="block"
}

function showScore(){
    resetState()
    qstnElement.innerHTML =`You scored ${score} out of ${questions.length}!`
    nxtbutton.innerHTML ="Play Again"
    nxtbutton.style.display="block"
}


function handleNextButton(){
    currentQstnIndex++;
    if(currentQstnIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nxtbutton.addEventListener("click",()=>{
    if(currentQstnIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz()

