
    const questions = [
      {
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "Delhi"
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "2"],
        answer: "4"
      },
      {
        question: "Which language is used for web apps?",
        options: ["Python", "JavaScript", "Java", "C++"],
        answer: "JavaScript"
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;

    function startQuiz() {
      const username = document.getElementById("username").value.trim();
      if (username === "") {
        alert("Please enter your name!");
        return;
      }
      document.getElementById("start-screen").classList.add("hide");
      document.getElementById("quiz-box").classList.remove("hide");
      loadQuestion();
    }

    function loadQuestion() {
      clearInterval(timer);
      timeLeft = 15;
      document.getElementById("timer").innerText = timeLeft;
      timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft === 0) {
          clearInterval(timer);
          nextQuestion();
        }
      }, 1000);

      let q = questions[currentQuestion];
      document.getElementById("question").innerText = q.question;

      let optionsHTML = "";
      q.options.forEach(option => {
        optionsHTML += `<button onclick="checkAnswer(this)">${option}</button>`;
      });
      document.getElementById("options").innerHTML = optionsHTML;
    }

    function checkAnswer(selected) {
      clearInterval(timer);
      const selectedText = selected.innerText;
      const correctAnswer = questions[currentQuestion].answer;
      if (selectedText === correctAnswer) {
        selected.classList.add("correct");
        score++;
      } else {
        selected.classList.add("wrong");
        Array.from(document.getElementById("options").children).forEach(btn => {
          if (btn.innerText === correctAnswer) {
            btn.classList.add("correct");
          }
        });
      }
      setTimeout(nextQuestion, 1500);
    }

    function nextQuestion() {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }

    function showResult() {
      document.getElementById("quiz-box").classList.add("hide");
      document.getElementById("result-screen").classList.remove("hide");
      document.getElementById("final-score").innerText = `Your score: ${score} / ${questions.length}`;
    }

    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      document.getElementById("result-screen").classList.add("hide");
      document.getElementById("start-screen").classList.remove("hide");
    }
  