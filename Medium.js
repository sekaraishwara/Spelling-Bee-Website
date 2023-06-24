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
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/accept--_gb_1.mp3",
    choice1: "accent",
    choice2: "accept",
    choice3: "among",
    choice4: "attend",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/canary--_gb_1.mp3",
    choice1: "canary",
    choice2: "carrot",
    choice3: "canned",
    choice4: "candle",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/dancer--_gb_1.mp3",
    choice1: "dangker",
    choice2: "danger",
    choice3: "dancer",
    choice4: "dapper",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hacker--_gb_1.mp3",
    choice1: "hacker",
    choice2: "baker",
    choice3: "maker",
    choice4: "hailer",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/table--_gb_1.mp3",
    choice1: "tacket",
    choice2: "ticket",
    choice3: "tablet",
    choice4: "table",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/caramel--_gb_1.mp3",
    choice1: "caramel",
    choice2: "camel",
    choice3: "travel",
    choice4: "caracal",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/dance--_gb_1.mp3",
    choice1: "lance",
    choice2: "dancing",
    choice3: "dance",
    choice4: "dash",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/habitat--_gb_1.mp3",
    choice1: "haircut",
    choice2: "headset",
    choice3: "hangout",
    choice4: "habitat",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/tablet--_gb_1.mp3",
    choice1: "tabloid",
    choice2: "tablet",
    choice3: "orbit",
    choice4: "tabored",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/owner--_gb_1.mp3",
    choice1: "younger",
    choice2: "owl",
    choice3: "own",
    choice4: "owner",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/acting--_gb_1.mp3",
    choice1: "adding",
    choice2: "acting",
    choice3: "putting",
    choice4: "making",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/know--_gb_1.mp3",
    choice1: "no",
    choice2: "go",
    choice3: "row",
    choice4: "know",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/eating--_gb_1.mp3",
    choice1: "easing",
    choice2: "edging",
    choice3: "eating",
    choice4: "ending",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/jungle--_gb_1.mp3",
    choice1: "jungle",
    choice2: "uncle",
    choice3: "pineapple",
    choice4: "jungler",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/gesture--_gb_1.mp3",
    choice1: "mature",
    choice2: "gesture",
    choice3: "accure",
    choice4: "gladder",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/padding--_gb_1.mp3",
    choice1: "pudding",
    choice2: "painting",
    choice3: "padding",
    choice4: "packing",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/younger--_gb_1.mp3",
    choice1: "stronger",
    choice2: "younger",
    choice3: "bigger",
    choice4: "digger",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/glove--_gb_1.mp3",
    choice1: "shove",
    choice2: "glove",
    choice3: "laugh",
    choice4: "love",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/pause--_gb_1.mp3",
    choice1: "cause",
    choice2: "because",
    choice3: "pause",
    choice4: "paralyze",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/vaccine--_gb_1.mp3",
    choice1: "vaccine",
    choice2: "valvate",
    choice3: "valuate",
    choice4: "violence",
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
