//  global variables
var startButton = document.getElementById('start-btn');
var homeHide = document.getElementById('home');
var showQuiz = document.getElementById('quiz');
var container = document.getElementById('container');
var questionText = document.getElementById('question');
var answerText = document.getElementById('answerId');
var correctAnswer = document.getElementById('inputCorrect');
var wrongAnswer = document.getElementById('inputWrong');
var timer = document.getElementById('time');
var userScore = document.getElementById('endgame');
var leaderBoard = document.getElementById('finalScore');
var finishScoreEL = document.getElementById('finish-score');
var addToScoreboard = document.getElementById('save-score')
var scoreBoard = document.getElementById('scoreboard');
var scoreList = document.getElementById('name-input');
var jumpLeaderboard = document.getElementById('jump-leaderboard');
var score = [];
var scoreIdCounter = 0;

let shuffledQuestions, currentQuestionIndex

// starts game
startButton.addEventListener('click', startGame);
answerText.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})
// start game function, shuffles questions
function startGame() {
    homeHide.classList.add('hide');
    showQuiz.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    setNextQuestion();
    countDown();
}

// moves to next question, if no more questions ends quiz and timer
function setNextQuestion() {
    reset();
    if (currentQuestionIndex < 4) {
        displayQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        userScore.classList.remove('hide');
        questionText.classList.add('hide');
        stopTime();
    }
}
// displays question and determines if answer wrong/right
function displayQuestion(question) {
    questionText.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } else if (answer.wrong) {
            button.dataset.wrong = answer.wrong;
        }
        button.addEventListener('click', answerInput);
        answerText.appendChild(button);
      })
};

function reset () {
    while(answerText.firstChild) {
        answerText.removeChild(answerText.firstChild);
    }
}
// creates quiz timer
var time;
timeLeft = 100;
function countDown() {
        time = setInterval(function(){
        timer.innerHTML='Time: ' + timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(time);
        }
    }, 1000);
}

// displays right/wrong, if wrong subtracts from timer
function answerInput(e) {
    var selectedAnswer = e.target;
    var correct = selectedAnswer.dataset.correct;
    var wrong = selectedAnswer.dataset.wrong;
    if (correct) {
        correctAnswer.classList.remove('hide');
        correctAnswer.classList.add('feedback');
        wrongAnswer.classList.add('hide');
    } else if (wrong) {
        wrongAnswer.classList.remove('hide');
        wrongAnswer.classList.add('feedback');
        correctAnswer.classList.add('hide');
        timeLeft = timeLeft - 10;
    };
}
//stops timer
function stopTime() {
    clearInterval(time);
    finishScoreEL.innerHTML = 'Your score is ' + (timeLeft + 1);
}

// gets value of user name input and pushes it to create function
var handleScore = function(event) {
    event.preventDefault();
    var userName = document.querySelector("input[name='saved-user']").value;
    var scoreData = {
        name:userName,
        value:timeLeft + 1
    }
    createScore(scoreData);
}

// creates list item with user score and name, sorts and pushes it to score array then saves it
var createScore = function(scoreData) {
    var createList = document.createElement("li");
    createList.classList.add('high-scores');
    createList.innerHTML = scoreData.name+ " - " + scoreData.value;
    scoreList.appendChild(createList);
    scoreData.id = scoreIdCounter;
    score.push(scoreData);
    score.sort((a, b) => b.value - a.value);
    saveScore();
    scoreIdCounter++;

}
// displays scoreboard
function showScore() {
    scoreBoard.classList.remove('hide');
    userScore.classList.add('hide');
    correctAnswer.classList.add('hide');
    wrongAnswer.classList.add('hide');
    timer.classList.add('hide');
    jumpLeaderboard.classList.add('hide');
}

addToScoreboard.addEventListener('click', showScore)


// save function
var saveScore = function() {
    localStorage.setItem("scoreHold", JSON.stringify(score));
}

//  load function
var loadScore = function() {
    var savedScore = localStorage.getItem("scoreHold");
    if (!savedScore) {
        return false;
    }
    savedScore = JSON.parse(savedScore);

    for (var i = 0; i < savedScore.length; i++) {
        createScore(savedScore[i]);
    }
}
loadScore();

addToScoreboard.addEventListener('click', handleScore);

// takes back to homepage
function resetQuiz() {
    history.go(0);
}
var resetQ = document.getElementById('reset-quiz');
resetQ.addEventListener('click', resetQuiz);

// clears local storage/scores
var clear = document.getElementById('clear');
function clearScores() {
    localStorage.clear();
    scoreList.classList.add('hide');
}
clear.addEventListener('click', clearScores);

// jumps to leaderboard
function jump() {
    homeHide.classList.add('hide');
    scoreBoard.classList.remove('hide');
    timer.classList.add('hide');
    jumpLeaderboard.classList.add('hide');
    showQuiz.classList.add('hide');
}
jumpLeaderboard.addEventListener('click', jump);

// questions
var questions = [
    {
        question: 'How do you create a div element using Javascript?', 
        answers: [
            {text: '1. document.createElement(‘div’)', correct: true},
            {text: '2. document.addElement(‘div’)', wrong: true},
            {text: '3. html.createElement(‘div’)', wrong: true},
            {text: '4. html.addElement(‘div’)', wrong: true}
        ]
    },
    {
        question: 'What are the two possible outcomes of a boolean type?', 
        answers: [
            {text: '1. Positive and Negative', wrong: true},
            {text: '2. Yes and No', wrong: true},
            {text: '3. True and False', correct: true},
            {text: '4. 1 and 2', wrong: true}
        ]
    },
    {
        question: 'What does CSS stand for?', 
        answers: [
            {text: '1. Colored Style Shaping', wrong: true},
            {text: '2. Cascading Style Sheets', correct: true},
            {text: '3. Complement Style Sheets', wrong: true},
            {text: '4. Cascading Style Shaping', wrong: true}
        ]
    },
    {
        question: 'Where should the reference to the CSS sheet be located?', 
        answers: [
            {text: '1. At the top of the body section', wrong: true},
            {text: '2. At the bottom of the page before the end html tag', wrong: true},
            {text: '3. At the top before the beginning html tag', wrong: true},
            {text: '4. In the head section', correct: true}
        ]
    },
    {
        question: 'What shortcut can be used in html to create the initial html code?', 
        answers: [
            {text: '1. html! then enter', wrong: true},
            {text: '2. ! then enter', correct: true},
            {text: '3. &shortcut then enter', wrong: true},
            {text: '4. <shortcut> then enter', wrong: true}
        ]
    }
]
