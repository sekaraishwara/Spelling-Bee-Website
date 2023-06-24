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
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/fairy--_gb_1.mp3",
    choice1: "very",
    choice2: "fairy",
    choice3: "ferry",
    choice4: "fiery",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/malady--_gb_1.mp3",
    choice1: "malady",
    choice2: "melody",
    choice3: "milady",
    choice4: "melodies",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/sieve--_gb_1.mp3",
    choice1: "siv",
    choice2: "shift",
    choice3: "sieve",
    choice4: "sift",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/pageant--_gb_1.mp3",
    choice1: "pageant",
    choice2: "pregnant",
    choice3: "pigeon",
    choice4: "pegon",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/dominance--_gb_1.mp3",
    choice1: "dominate",
    choice2: "dominan",
    choice3: "dominance",
    choice4: "dominant",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/leisure--_gb_1.mp3",
    choice1: "leisure",
    choice2: "lesser",
    choice3: "pressure",
    choice4: "lecture",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/precipice--_gb_1.mp3",
    choice1: "presage",
    choice2: "preceptive",
    choice3: "precipice",
    choice4: "precious",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/rampage--_gb_1.mp3",
    choice1: "rampart",
    choice2: "rampant",
    choice3: "ramping",
    choice4: "rampage",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/scheme--_gb_1.mp3",
    choice1: "skin",
    choice2: "scheme",
    choice3: "scale",
    choice4: "scam",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/villain--_gb_1.mp3",
    choice1: "villains",
    choice2: "fillet",
    choice3: "feeler",
    choice4: "villain",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/acclimate--_gb_1.mp3",
    choice1: "climate",
    choice2: "acclimate",
    choice3: "acetylise",
    choice4: "accretive",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/dormitory--_gb_1.mp3",
    choice1: "damnified",
    choice2: "dampnation",
    choice3: "damnatory",
    choice4: "dormitory",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/effective--_gb_1.mp3",
    choice1: "efference",
    choice2: "effluence",
    choice3: "effective",
    choice4: "educative",
    answer: 3,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/following--_gb_1.mp3",
    choice1: "following",
    choice2: "followings",
    choice3: "feelingly",
    choice4: "floating",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/hairstyle--_gb_1.mp3",
    choice1: "harry style",
    choice2: "hairstyle",
    choice3: "airstyle",
    choice4: "style",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/selection--_gb_1.mp3",
    choice1: "electives",
    choice2: "electrons",
    choice3: "elections",
    choice4: "selection",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/actress--_gb_1.mp3",
    choice1: "actress",
    choice2: "activates",
    choice3: "actuality",
    choice4: "virtuals",
    answer: 1,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/addictive--_gb_1.mp3",
    choice1: "additivies",
    choice2: "additions",
    choice3: "adjective",
    choice4: "addictive",
    answer: 4,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/caption--_gb_1.mp3",
    choice1: "captain",
    choice2: "caption",
    choice3: "option",
    choice4: "vision",
    answer: 2,
  },
  {
    question:
      "https://ssl.gstatic.com/dictionary/static/sounds/oxford/different--_gb_1.mp3",
    choice1: "different",
    choice2: "reference",
    choice3: "deficient",
    choice4: "difference",
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
