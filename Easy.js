const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const audio = document.getElementById("audio");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let shuffledQuestions = [];

let questions = [
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/age--_gb_1.mp3",
    choice1: "cage",
    choice2: "age",
    choice3: "rage",
    choice4: "page",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/clock--_gb_1.mp3",
    choice1: "clock",
    choice2: "lock",
    choice3: "knock",
    choice4: "log",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/leave--_gb_1.mp3",
    choice1: "leaf",
    choice2: "live",
    choice3: "lift",
    choice4: "leave",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/lose--_gb_1.mp3",
    choice1: "loose",
    choice2: "loos",
    choice3: "lose",
    choice4: "lus",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/piece--_gb_1.mp3",
    choice1: "peace",
    choice2: "pis",
    choice3: "piece",
    choice4: "pice",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/wrong--_gb_1.mp3",
    choice1: "wrong",
    choice2: "round",
    choice3: "wronk",
    choice4: "rong",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/scratch--_gb_1.mp3",
    choice1: "stretch",
    choice2: "scrag",
    choice3: "scratch",
    choice4: "scetch",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/curl--_gb_1.mp3",
    choice1: "crow",
    choice2: "crawl",
    choice3: "craw",
    choice4: "curl",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/few--_gb_1.mp3",
    choice1: "view",
    choice2: "few",
    choice3: "fiew",
    choice4: "vew",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/soil--_gb_1.mp3",
    choice1: "oil",
    choice2: "boil",
    choice3: "voile",
    choice4: "soil",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/weight--_gb_1.mp3",
    choice1: "height",
    choice2: "weight",
    choice3: "wait",
    choice4: "weigh",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/message--_gb_1.mp3",
    choice1: "messages",
    choice2: "mesage",
    choice3: "massage",
    choice4: "message",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/rising--_gb_1.mp3",
    choice1: "risen",
    choice2: "raisin",
    choice3: "rising",
    choice4: "raising",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/back--_gb_1.mp3",
    choice1: "back",
    choice2: "bat",
    choice3: "bag",
    choice4: "bath",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/pool--_gb_1.mp3",
    choice1: "pools",
    choice2: "pool",
    choice3: "pull",
    choice4: "pulls",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/but--_gb_1.mp3",
    choice1: "bat",
    choice2: "bath",
    choice3: "but",
    choice4: "bats",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/alone--_gb_1.mp3",
    choice1: "clown",
    choice2: "alone",
    choice3: "clone",
    choice4: "cone",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/flour--_gb_1.mp3",
    choice1: "flaw",
    choice2: "flower",
    choice3: "floor",
    choice4: "flour",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/pet--_gb_1.mp3",
    choice1: "pets",
    choice2: "pet",
    choice3: "path",
    choice4: "patch",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/day--_gb_1.mp3",
    choice1: "day",
    choice2: "days",
    choice3: "dye",
    choice4: "die",
    answer: 1,
  }
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  shuffledQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (shuffledQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("End Game.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * shuffledQuestions.length);
  currentQuestion = shuffledQuestions[questionsIndex];
  // question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  audio.src = currentQuestion["question"];

  shuffledQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

function playAudio() {
  audio.play();
}

startGame();
